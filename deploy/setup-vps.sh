#!/usr/bin/env bash
# Installs (or updates) shrinivasramaprasad.site on an Ubuntu/Debian VPS.
#
# Safe to run more than once: the first run sets everything up, later runs
# pull the latest version of the site and rebuild it.
#
# It stops WITHOUT changing anything if another program (for example
# Docker, Traefik, Coolify or n8n) is already using the web ports 80/443.
set -euo pipefail

DOMAIN="shrinivasramaprasad.site"
SERVER_IP="72.60.100.108"
REPO="https://github.com/Shri-Phnx/Portfolio-site.git"
BRANCH="${BRANCH:-main}"
EMAIL="shrinivas.ramaprasad@gmail.com"   # Let's Encrypt certificate expiry notices
SRC_DIR="/opt/portfolio-site"
WEB_ROOT="/var/www/${DOMAIN}"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"

say()  { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m    OK: %s\033[0m\n' "$*"; }
stop() { printf '\n\033[1;31mSTOPPED: %s\033[0m\n' "$*"; exit 1; }

# ---------------------------------------------------------------- 1. checks
say "Step 1/6: Safety checks (nothing is changed yet)"
[ "$(id -u)" -eq 0 ] || stop "Please run as root (Hostinger's Browser terminal logs you in as root)."
command -v apt-get >/dev/null || stop "This script needs Ubuntu or Debian. Send Claude the output of: cat /etc/os-release"
. /etc/os-release && ok "Operating system: ${PRETTY_NAME}"

command -v ss >/dev/null || stop "The 'ss' tool is missing. Send Claude the output of: cat /etc/os-release"
busy="$(ss -tlnpH '( sport = :80 or sport = :443 )' 2>/dev/null | grep -v nginx || true)"
if [ -n "$busy" ]; then
  echo "$busy"
  stop "Something other than Nginx is already using port 80/443 (shown above). Nothing was changed. Send this output to Claude."
fi
ok "Web ports 80/443 are free (or already used by Nginx)"

# ---------------------------------------------------------- 2. install tools
say "Step 2/6: Installing Nginx, Git and HTTPS tools"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx git curl ca-certificates certbot python3-certbot-nginx >/dev/null
ok "Nginx, Git and Certbot installed"

node_major="$(node -v 2>/dev/null | sed -E 's/^v([0-9]+).*/\1/' || echo 0)"
if [ "${node_major:-0}" -lt 22 ]; then
  say "Installing Node.js 22 (needed to build the site)"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
ok "Node.js $(node -v)"

# ------------------------------------------------------ 3. download + build
say "Step 3/6: Downloading and building the site"
if [ -d "${SRC_DIR}/.git" ]; then
  git -C "$SRC_DIR" fetch -q --depth 1 origin "$BRANCH"
  git -C "$SRC_DIR" reset -q --hard FETCH_HEAD
else
  git clone -q --depth 1 --branch "$BRANCH" "$REPO" "$SRC_DIR"
fi
cd "$SRC_DIR"
npm ci --no-audit --no-fund --loglevel=error
npm run build >/dev/null
ok "Site built (version $(git rev-parse --short HEAD))"

mkdir -p "$WEB_ROOT"
cp -a dist/. "$WEB_ROOT/"
ok "Files copied to ${WEB_ROOT}"

# ---------------------------------------------------------- 4. web server
say "Step 4/6: Configuring Nginx"
if [ ! -f "$NGINX_CONF" ]; then
  # Only listen on IPv6 when the server supports it.
  ipv6_listen=""
  [ -f /proc/net/if_inet6 ] && ipv6_listen="listen [::]:80;"
  cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    ${ipv6_listen}
    server_name ${DOMAIN} www.${DOMAIN};

    root ${WEB_ROOT};
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;

    # Hashed build files never change, so browsers can keep them for a year.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
  ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}"
  ok "Nginx site created"
else
  ok "Nginx site already exists (left as is)"
fi
nginx -t -q
systemctl enable -q nginx
systemctl reload nginx || systemctl restart nginx
ok "Nginx running"

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow 'Nginx Full' >/dev/null
  ok "Server firewall (ufw) opened for web traffic"
fi

# ------------------------------------------------------------- 5. DNS check
say "Step 5/6: Checking the domain points to this server"
resolve() { curl -s "https://dns.google/resolve?name=$1&type=A" | grep -oE '"data":"[0-9.]+"' | cut -d'"' -f4 | head -1 || true; }
apex="$(resolve "$DOMAIN")"; www="$(resolve "www.$DOMAIN")"
echo "    ${DOMAIN}     -> ${apex:-not set yet}"
echo "    www.${DOMAIN} -> ${www:-not set yet}"

# ------------------------------------------------------------- 6. HTTPS
say "Step 6/6: HTTPS certificate"
if [ "$apex" = "$SERVER_IP" ] && [ "$www" = "$SERVER_IP" ]; then
  if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
    ok "Certificate already installed (renews automatically)"
  else
    certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect -q
    ok "HTTPS switched on; http:// now redirects to https://"
  fi
  printf '\n\033[1;32mDONE. Open https://%s\033[0m\n' "$DOMAIN"
else
  printf '\n\033[1;33mALMOST DONE. The site is installed, but the domain does not point here yet,\n'
  printf 'so HTTPS was skipped. Wait 15-30 minutes after the Namecheap change and run\n'
  printf 'this same command again. It will finish the HTTPS step.\033[0m\n'
fi
