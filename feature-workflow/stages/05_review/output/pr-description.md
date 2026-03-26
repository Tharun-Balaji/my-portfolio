feat(home): redesign portfolio in a kinetic terminal direction

## What

Replace the current retro homepage presentation with a darker terminal-inspired portfolio shell, rewrite the core sections to match the new direction, and add the missing writing/archive and floating console surfaces.

## Why

The older theme still showed the content, but it no longer matched the more intentional, systems-minded portfolio direction this branch is aiming for. The redesign improves first-impression clarity, project curation, and room for future case-study storytelling.

## How

- rebuilt the global shell, loader, nav, hero, and section styling
- restructured homepage content flow around project logs, stack DNA, history, writing, and contact
- expanded skill data into richer grouped capabilities
- updated Playwright coverage for the new UI and interactions

## Testing done

- `npm run lint`
- `npm run type-check`
- `npm run build`
- `npm run test:e2e`

## Checklist

- [x] Scope is limited to the homepage redesign and workflow docs for this feature
- [x] Required checks passed locally
- [x] No backend or deployment config behavior changed
