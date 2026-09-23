#!/usr/bin/env bash
# Installs (or updates) shrinivasramaprasad.site on a VPS where Docker +
# Traefik already own ports 80/443 (e.g. Hostinger's n8n template).
#
# It does NOT touch Traefik or n8n. It adds one small web-server container
# ("portfolio-site") and labels it so the existing Traefik routes the domain
# to it and fetches the HTTPS certificate automatically.
#
# Safe to run more than once: later runs pull and rebuild the latest site.
# To remove it completely:  docker rm -f portfolio-site
set -euo pipefail

DOMAIN="shrinivasramaprasad.site"
SERVER_IP="72.60.100.108"
REPO="https://github.com/Shri-Phnx/Portfolio-site.git"
BRANCH="${BRANCH:-claude/epic-hopper-chfsbs}"
SRC_DIR="/opt/portfolio-site"
WEB_ROOT="/opt/portfolio-site-www"
NAME="portfolio-site"

say()  { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m    OK: %s\033[0m\n' "$*"; }
stop() { printf '\n\033[1;31mSTOPPED: %s\033[0m\n' "$*"; exit 1; }

# ---------------------------------------------------- 1. read Traefik setup
say "Step 1/5: Reading the existing Traefik setup (nothing is changed yet)"
[ "$(id -u)" -eq 0 ] || stop "Please run as root."
command -v docker >/dev/null || stop "Docker is not installed. Send this output to Claude."

proxy_id="$(docker ps -q --filter publish=443 | head -1)"
[ -n "$proxy_id" ] || stop "No container is publishing port 443. Send this output to Claude."
proxy_name="$(docker inspect -f '{{.Name}}' "$proxy_id" | sed 's#^/##')"
proxy_image="$(docker inspect -f '{{.Config.Image}}' "$proxy_id")"
echo "    Port 443 is served by container '${proxy_name}' (${proxy_image})"
echo "$proxy_image" | grep -qi traefik || stop "That is not Traefik. Nothing was changed. Send this output to Claude."

args="$(docker inspect -f '{{join .Config.Cmd "\n"}}{{"\n"}}{{join .Args "\n"}}' "$proxy_id" || true)"
printf '%s\n' "$args" | grep -q -- '--providers.docker' \
  || stop "Traefik is not reading Docker labels (or is configured by file). Nothing was changed. Send this output to Claude."

ep_secure="$(printf '%s\n' "$args" | grep -oE -- '--entrypoints\.[A-Za-z0-9_-]+\.address=:443' | head -1 | cut -d. -f2 || true)"
ep_web="$(printf '%s\n' "$args" | grep -oE -- '--entrypoints\.[A-Za-z0-9_-]+\.address=:80' | head -1 | cut -d. -f2 || true)"
resolver="$(printf '%s\n' "$args" | grep -oE -- '--certificatesresolvers\.[A-Za-z0-9_-]+\.' | head -1 | cut -d. -f2 || true)"
network="$(docker inspect -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{"\n"}}{{end}}' "$proxy_id" | grep -v '^$' | head -1 || true)"

echo "    HTTPS entrypoint: ${ep_secure:-?}   HTTP entrypoint: ${ep_web:-?}"
echo "    Certificate resolver: ${resolver:-?}   Docker network: ${network:-?}"
[ -n "$ep_secure" ] && [ -n "$resolver" ] && [ -n "$network" ] \
  || stop "Could not read all Traefik settings (a '?' above). Nothing was changed. Send this output to Claude."
ok "Traefik found and readable"

# ------------------------------------------------------- 2. download + build
say "Step 2/5: Downloading and building the site"
command -v git >/dev/null || { apt-get update -qq && apt-get install -y -qq git >/dev/null; }
if [ -d "${SRC_DIR}/.git" ]; then
  git -C "$SRC_DIR" fetch -q --depth 1 origin "$BRANCH"
  git -C "$SRC_DIR" reset -q --hard FETCH_HEAD
else
  git clone -q --depth 1 --branch "$BRANCH" "$REPO" "$SRC_DIR"
fi
# Build inside a throwaway Node container, so nothing extra is installed on the server.
docker run --rm -v "${SRC_DIR}:/app" -w /app node:22-alpine \
  sh -c "npm ci --no-audit --no-fund --loglevel=error && npm run build >/dev/null"
ok "Site built (version $(git -C "$SRC_DIR" rev-parse --short HEAD))"

mkdir -p "$WEB_ROOT"
find "$WEB_ROOT" -mindepth 1 -delete
cp -a "${SRC_DIR}/dist/." "$WEB_ROOT/"
ok "Files ready in ${WEB_ROOT}"

# ----------------------------------------------------- 3. web container
say "Step 3/5: Starting the portfolio container"
if docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; then
  docker start "$NAME" >/dev/null
  ok "Container already existed; it now serves the new files"
else
  hosts="Host(\`${DOMAIN}\`) || Host(\`www.${DOMAIN}\`)"
  labels=(
    --label "traefik.enable=true"
    --label "traefik.docker.network=${network}"
    --label "traefik.http.routers.portfolio.rule=${hosts}"
    --label "traefik.http.routers.portfolio.entrypoints=${ep_secure}"
    --label "traefik.http.routers.portfolio.tls=true"
    --label "traefik.http.routers.portfolio.tls.certresolver=${resolver}"
    --label "traefik.http.services.portfolio.loadbalancer.server.port=80"
  )
  if [ -n "$ep_web" ]; then
    labels+=(
      --label "traefik.http.routers.portfolio-http.rule=${hosts}"
      --label "traefik.http.routers.portfolio-http.entrypoints=${ep_web}"
      --label "traefik.http.routers.portfolio-http.middlewares=portfolio-https"
      --label "traefik.http.middlewares.portfolio-https.redirectscheme.scheme=https"
    )
  fi
  docker run -d --name "$NAME" --restart unless-stopped --network "$network" \
    -v "${WEB_ROOT}:/usr/share/nginx/html:ro" "${labels[@]}" nginx:alpine >/dev/null
  ok "Container '${NAME}' started"
fi

# ---------------------------------------------------- 4. local routing test
say "Step 4/5: Testing that Traefik routes the domain to the site"
sleep 5
code="$(curl -sk -o /dev/null -w '%{http_code}' --resolve "${DOMAIN}:443:127.0.0.1" "https://${DOMAIN}/" || true)"
if [ "$code" = "200" ]; then
  ok "Traefik serves the portfolio for ${DOMAIN} (HTTP ${code})"
else
  stop "Traefik answered HTTP ${code:-none} instead of 200. n8n is unaffected. Send this output to Claude."
fi
docker ps --format '    running: {{.Names}} ({{.Image}})'

# --------------------------------------------------------- 5. DNS + HTTPS
say "Step 5/5: Checking the domain and HTTPS"
resolve() { curl -s "https://dns.google/resolve?name=$1&type=A" | grep -oE '"data":"[0-9.]+"' | cut -d'"' -f4 | head -1 || true; }
apex="$(resolve "$DOMAIN")"; www="$(resolve "www.$DOMAIN")"
echo "    ${DOMAIN}     -> ${apex:-not set yet}"
echo "    www.${DOMAIN} -> ${www:-not set yet}"
if [ "$apex" = "$SERVER_IP" ] && [ "$www" = "$SERVER_IP" ]; then
  printf '\n\033[1;32mDONE. Traefik is fetching the HTTPS certificate now (up to 2 minutes).\n'
  printf 'Then open https://%s\033[0m\n' "$DOMAIN"
else
  printf '\n\033[1;33mALMOST DONE. The site is running, but the domain does not point here yet.\n'
  printf 'Nothing else to run: once the Namecheap change spreads (15-30 min),\n'
  printf 'Traefik gets the HTTPS certificate by itself. Then open https://%s\033[0m\n' "$DOMAIN"
fi
