# Homeshopview Cloudflare Worker

Cloudflare Workers + D1 version of homeshopview.com.

## Deployment

```bash
npm ci
npm run deploy
```

## Daily schedule update

Cloudflare Cron Triggers run the Worker every day at 00:00 KST and update Cloudflare D1 from the public schedule API.
