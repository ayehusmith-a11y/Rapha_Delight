# Rapha Delight Enterprise

Static website for Rapha Delight Enterprise, ready to deploy on Vercel.

## Local Development

```bash
npm run open
```

The site runs at `http://127.0.0.1:4173/` by default.

## Project Structure

- `index.html` is the production entry point.
- Product images, logo, video and social icons live in the project root and are referenced directly by the page.
- `setup_rapha.js` checks local assets and starts a small static server for testing.

## Deploying On Vercel

1. Import this GitHub repository into Vercel.
2. Choose the default static site settings.
3. Leave the build command empty.
4. Leave the output directory empty.
5. Deploy.
