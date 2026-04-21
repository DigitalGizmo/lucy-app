# Deployment update
I will be deploying this app on a droplet rathern than via the current deployment via the App Platform.
In a previous exchange with Claude on a separate chat, I recieved the following preview of the steps that will be involved.

Use this as a guide as I enter prompts and step through the process.

## On the Droplet
**One-time setup:**
- Install Node.js (via nvm recommended)
- Install PM2 globally (`npm install -g pm2`)
- Install nginx
- Point your domain DNS to the droplet IP
- Get an SSL cert via Certbot (Let's Encrypt)

**nginx config** — acts as a reverse proxy, handling HTTPS and forwarding traffic to Node:

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

**PM2** — keeps the Node process alive, restarts on crash, survives reboots:

```bash
pm2 start build/index.js --name lucy-app
pm2 save && pm2 startup
```

## Deployment Workflow (each release)

```bash
git pull
npm install
npm run build
pm2 restart lucy-app
```

Or automated via a GitHub Action that SSHs into the droplet and runs those commands.

## What's Different from App Platform

- You manage the server (OS updates, security patches)
- You handle SSL renewal (Certbot auto-renews, but you set it up)
- Cheaper at scale, more control
- Logs via `pm2 logs` instead of the App Platform dashboard

The `BUILD_PATH` environment variable may need to be set so SvelteKit's Node adapter knows where to listen — by default it uses port 3000, which you'd configure in PM2 or a `.env` file on the server.
