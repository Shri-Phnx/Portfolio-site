#!/usr/bin/env bash
# Installs (or updates) both sites on a VPS where Docker + Traefik already own
# ports 80/443 (e.g. Hostinger's n8n template):
#   shrinivasramaprasad.site             -> portfolio (repo root)
#   consultant.shrinivasramaprasad.site  -> consulting site (consulting/)
#
# It does NOT touch Traefik or n8n. Each site runs in its own small web-server
# container, labelled so the existing Traefik routes the domain to it and
# fetches the HTTPS certificate automatically.
#
# Safe to run more than once: later runs pull and rebuild the latest sites.
# To remove a site:  docker rm -f portfolio-site   (or consulting-site)
set -euo pipefail

DOMAIN="shrinivasramaprasad.site"
CONSULT_DOMAIN="consultant.${DOMAIN}"
SERVER_IP="72.60.100.108"
REPO="https://github.com/Shri-Phnx/Portfolio-site.git"
BRANCH="${BRANCH:-main}"
SRC_DIR="/opt/portfolio-site"
WEB_ROOT="/opt/portfolio-site-www"
NAME="portfolio-site"
CONSULT_WEB_ROOT="/opt/consulting-site-www"
CONSULT_NAME="consulting-site"

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
build() {  # $1 = folder inside the repo ("." or "consulting"), $2 = where to publish
  docker run --rm -v "${SRC_DIR}:/app" -w "/app/$1" node:22-alpine \
    sh -c "npm ci --no-audit --no-fund --loglevel=error && npm run build >/dev/null"
  mkdir -p "$2"
  find "$2" -mindepth 1 -delete
  cp -a "${SRC_DIR}/$1/dist/." "$2/"
}
build . "$WEB_ROOT"
ok "Portfolio built (version $(git -C "$SRC_DIR" rev-parse --short HEAD))"
build consulting "$CONSULT_WEB_ROOT"
ok "Consulting site built"

# ----------------------------------------------------- 3. web containers
say "Step 3/5: Starting the site containers"
start_site() {  # $1 = container, $2 = Traefik router name, $3 = Host rule, $4 = web root
  if docker ps -a --format '{{.Names}}' | grep -qx "$1"; then
    docker start "$1" >/dev/null
    ok "Container '$1' already existed; it now serves the new files"
    return
  fi
  local labels=(
    --label "traefik.enable=true"
    --label "traefik.docker.network=${network}"
    --label "traefik.http.routers.$2.rule=$3"
    --label "traefik.http.routers.$2.entrypoints=${ep_secure}"
    --label "traefik.http.routers.$2.tls=true"
    --label "traefik.http.routers.$2.tls.certresolver=${resolver}"
    --label "traefik.http.services.$2.loadbalancer.server.port=80"
  )
  if [ -n "$ep_web" ]; then
    labels+=(
      --label "traefik.http.routers.$2-http.rule=$3"
      --label "traefik.http.routers.$2-http.entrypoints=${ep_web}"
      --label "traefik.http.routers.$2-http.middlewares=$2-https"
      --label "traefik.http.middlewares.$2-https.redirectscheme.scheme=https"
    )
  fi
  docker run -d --name "$1" --restart unless-stopped --network "$network" \
    -v "$4:/usr/share/nginx/html:ro" "${labels[@]}" nginx:alpine >/dev/null
  ok "Container '$1' started"
}
start_site "$NAME" portfolio "Host(\`${DOMAIN}\`) || Host(\`www.${DOMAIN}\`)" "$WEB_ROOT"
start_site "$CONSULT_NAME" consulting "Host(\`${CONSULT_DOMAIN}\`)" "$CONSULT_WEB_ROOT"

# ---------------------------------------------------- 4. local routing test
say "Step 4/5: Testing that Traefik routes each domain to its site"
sleep 5
for host in "$DOMAIN" "$CONSULT_DOMAIN"; do
  code="$(curl -sk -o /dev/null -w '%{http_code}' --resolve "${host}:443:127.0.0.1" "https://${host}/" || true)"
  if [ "$code" = "200" ]; then
    ok "Traefik serves ${host} (HTTP ${code})"
  else
    stop "Traefik answered HTTP ${code:-none} for ${host} instead of 200. n8n is unaffected. Send this output to Claude."
  fi
done
docker ps --format '    running: {{.Names}} ({{.Image}})'

# --------------------------------------------------------- 5. DNS + HTTPS
say "Step 5/5: Checking the domains and HTTPS"
resolve() { curl -s "https://dns.google/resolve?name=$1&type=A" | grep -oE '"data":"[0-9.]+"' | cut -d'"' -f4 | head -1 || true; }
pending=""
for host in "$DOMAIN" "www.$DOMAIN" "$CONSULT_DOMAIN"; do
  ip="$(resolve "$host")"
  printf '    %-40s -> %s\n' "$host" "${ip:-not set yet}"
  [ "$ip" = "$SERVER_IP" ] || pending="${pending} ${host}"
done
if [ -z "$pending" ]; then
  printf '\n\033[1;32mDONE. Both sites are live (HTTPS certificates can take up to 2 minutes):\n'
  printf '  https://%s\n  https://%s\033[0m\n' "$DOMAIN" "$CONSULT_DOMAIN"
else
  printf '\n\033[1;33mALMOST DONE. The sites are running, but these names do not point here yet:%s\n' "$pending"
  printf 'Add or fix their A records in Namecheap (value %s). Nothing else to run:\n' "$SERVER_IP"
  printf 'Traefik gets the HTTPS certificates by itself once DNS has spread.\033[0m\n'
fi
