# Deployment Migration: App Platform → DigitalOcean Droplet

## Context
Moving from DigitalOcean App Platform to a self-managed droplet with nginx (reverse proxy) and PM2 (process manager). The app already uses `@sveltejs/adapter-node`, so no adapter changes are needed — the build output (`build/index.js`) is a standard Node.js HTTP server.

**Domain:** lucyterryprince.deerfield-ma.org  
**Port:** 3000 (default, proxied via nginx)

---

## One-Time Droplet Setup

```bash
# Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# PM2
npm install -g pm2

# nginx
apt update && apt install -y nginx

# Certbot (Let's Encrypt SSL)
apt install -y certbot python3-certbot-nginx
```

---

## App Deployment (First Time)

```bash
# Clone the repo on the droplet
git clone https://github.com/your-org/lucy-app.git /opt/lucy-app
cd /opt/lucy-app
npm install
npm run build

# Start with PM2 using ecosystem file
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup   # follow the printed command to enable auto-restart on reboot
```

---

## nginx Configuration

File: `/etc/nginx/sites-available/lucy-app`

```nginx
server {
    listen 80;
    server_name lucyterryprince.deerfield-ma.org;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name lucyterryprince.deerfield-ma.org;

    ssl_certificate /etc/letsencrypt/live/lucyterryprince.deerfield-ma.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lucyterryprince.deerfield-ma.org/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/lucy-app /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Get SSL cert (DNS must already point to droplet)
certbot --nginx -d lucyterryprince.deerfield-ma.org
```

---

## Ongoing Deployment Workflow

SSH into the droplet, then:

```bash
cd /opt/lucy-app
git pull
npm install
npm run build
pm2 restart lucy-app
```

---

## Verification Checklist

1. `pm2 status` — confirm `lucy-app` is online
2. `pm2 logs lucy-app` — check for startup errors
3. `curl http://localhost:3000` — confirm Node server responds
4. Visit `https://lucyterryprince.deerfield-ma.org` — confirm nginx proxy + SSL work
5. Navigate through the app (moments, map, people) — confirm API calls to `lucy-proto.deerfield-ma.org` still resolve

---

## What's Different from App Platform

- You manage the server (OS updates, security patches)
- SSL via Certbot/Let's Encrypt (auto-renews, but you set it up)
- Logs via `pm2 logs lucy-app` instead of the App Platform dashboard
- Cheaper at scale, more control
