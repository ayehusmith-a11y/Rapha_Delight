# Rapha Delight Enterprise

Static website for Rapha Delight Enterprise, ready to deploy on Vercel.

## Local Development

```bash
npm run open
```

The site runs at `http://127.0.0.1:4173/` by default.

## Project Structure

- `public/index.html` is the production entry point.
- `public/assets/css/styles.css` contains the site styles.
- `public/assets/js/main.js` contains gallery, product rendering and form interaction code.
- `public/assets/images/brand/` contains brand and hero images.
- `public/assets/images/products/` contains product photography.
- `public/assets/icons/` contains social media icons.
- `public/assets/videos/` contains local video assets.
- `setup_rapha.js` checks local assets and starts a small static server for testing.
- `vercel.json` tells Vercel to deploy the `public/` directory.

```text
.
├── public/
│   ├── index.html
│   └── assets/
│       ├── css/
│       ├── icons/
│       ├── images/
│       │   ├── brand/
│       │   └── products/
│       ├── js/
│       └── videos/
├── package.json
├── setup_rapha.js
└── vercel.json
```

## Deploying On Vercel

1. Import this GitHub repository into Vercel.
2. Choose the default static site settings.
3. Build command: empty.
4. Output directory: `public`.
5. Deploy.
