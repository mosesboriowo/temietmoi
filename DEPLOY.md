# Deploying this site

This is a static site built with Vite + React. The `dist/` folder in this
zip is already built and ready to upload as-is to any static host.

## Fastest options (drag-and-drop, no build needed)
- **Netlify**: go to app.netlify.com/drop and drag the `dist` folder in.
- **Vercel**: `npx vercel deploy dist --prod` (or drag `dist` into the Vercel dashboard).
- **GitHub Pages / Cloudflare Pages**: upload the contents of `dist/` as the site root.

## If you want to make further edits first
This needs Node.js 18+ installed.

```
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # rebuilds dist/ with your changes
```

All content lives in `src/data/` (story text, gallery images, bank
details, WhatsApp link, FAQ) and `public/images/` (photos) — edit those
without touching component code for most day-to-day changes.
