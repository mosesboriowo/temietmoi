# Temitope & Moses — Wedding Website

## Running locally (VS Code)

1. Install Node.js (v18 or later) from https://nodejs.org if you don't have it.
2. Open this folder in VS Code.
3. Open a terminal in VS Code (Terminal → New Terminal) and run:

   npm install
   npm run dev

4. Vite will print a local URL (usually http://localhost:5173) — open that
   in your browser. The site hot-reloads as you edit files.

To build a production-ready version:

   npm run build

This outputs static files to `dist/`, which you can deploy anywhere
(Vercel, Netlify, your own hosting, etc.).

## What still needs real content

- `public/images/story-beginning-0X.jpg`, `story-journey-0X.jpg`,
  `story-now.jpg` — throwback photos for the Our Story collages. Until
  these exist, those spots show a labeled placeholder instead of a broken
  image.
- `public/videos/proposal.mp4` — the real proposal video. Referenced from
  `src/data/media.ts`.
- Venue landmark/entrance guidance — `src/components/Venue.tsx`
  (`LANDMARK` constant).
- `src/data/cashGift.ts` — payment link (`paymentUrl`) once a Paystack,
  Flutterwave, or other payment gateway is wired up. Account details are
  already filled in.

## Project structure

- `src/components/` — one file per section (Hero, OurStory, WeddingDay,
  Venue, CashGift, Footer, Navbar), plus shared pieces (Monogram,
  SignatureName).
- `src/data/` — content kept separate from presentation (story moments,
  cash gift details, media paths).
- `src/styles.css` — all styling, organized by section with comments.
