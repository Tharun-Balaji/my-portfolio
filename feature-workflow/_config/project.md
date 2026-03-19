# Project Context

## Product

- Repo: `my-portfolio`
- Type: personal portfolio website
- Audience: recruiters, hiring managers, collaborators, and prospective clients
- Primary goal: communicate technical breadth and engineering taste quickly

## Stack

- Astro 4 for the site shell and static rendering
- Minimal client-side interactivity where needed
- Tailwind CSS 4 plus local styling patterns already in the repo
- Playwright for end-to-end checks
- GitHub Actions CI

## Key directories

- `src/components/`: portfolio sections and reusable UI
- `src/pages/`: route entry points
- `src/data/`: structured content for sections
- `src/layouts/`: layout shells
- `src/utils/`: helpers
- `public/assets/`: images and static assets
- `tests/`: Playwright coverage

## Important commands

```bash
npm run dev
npm run build
npm run lint
npm run type-check
npm run test:e2e
npm run test:workflow
```

## Deployment

- Static output build via Astro
- GitHub Pages base path defaults to `/my-portfolio`
- Netlify and other static hosts can override the base path through env vars

## Working assumptions

- Prefer Astro-first changes unless interactivity clearly requires client-side code.
- Reuse existing portfolio sections and motion patterns before introducing new systems.
- Keep features lightweight and content-forward; avoid building admin-style complexity into the portfolio.
