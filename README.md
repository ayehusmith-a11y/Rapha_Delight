# Rapha Delight Enterprise

Static website for Rapha Delight Enterprise, ready to deploy on Vercel.

## Local Development

```bash
npm run open
```

The site runs at `http://127.0.0.1:4173/` by default.

## Project Structure

- `public/index.html` is the production entry point.
- Product images, logo, video and social icons live in `public/` and are referenced directly by the page.
- `setup_rapha.js` checks local assets and starts a small static server for testing.
- `vercel.json` tells Vercel to deploy the `public/` directory.

## Deploying On Vercel

1. Import this GitHub repository into Vercel.
2. Choose the default static site settings.
3. Build command: empty.
4. Output directory: `public`.
5. Deploy.
