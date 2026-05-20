# Homeshopview Cloudflare Worker

Cloudflare Workers + D1 version of homeshopview.com.

## Deployment

```bash
npm ci
npm run deploy
```

## Daily schedule update

GitHub Actions runs every day at 00:00 KST and updates Cloudflare D1 from the public schedule API.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow can also be run manually from GitHub Actions.
