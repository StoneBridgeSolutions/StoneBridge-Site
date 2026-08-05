# StoneBridge-Site

Marketing site for StoneBridge Solutions — fast static website design for local businesses in the Triad area of North Carolina.

## Live Site
https://stonebridgesolutions.io

## What This Is
Single-file static HTML homepage. No build step, no dependencies, no framework.
Served via nginx on the StoneBridge VPS.

## Deploy
```bash
cp dist/index.html /root/stonebridge-marketing/dist/index.html
pm2 restart stonebridge-marketing && pm2 save
```

## Stack
- Pure HTML/CSS/JS (no framework)
- Playfair Display + Poppins (Google Fonts)
- Hosted on Hostinger VPS, served via nginx + PM2
