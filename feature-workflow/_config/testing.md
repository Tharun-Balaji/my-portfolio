# Testing Guidance

## Testing layers in this repo

- `npm run lint`: baseline check for scripts, Astro files, and JS or TS files
- `npm run type-check`: Astro and TypeScript validation
- `npm run build`: confirms the portfolio still builds as a static site
- `npm run test:e2e`: Playwright smoke and behavior coverage for site-level changes
- `npm run test:workflow`: Node-based tests for the workflow helper scripts

## When each check matters

- Run `lint` for every code change in this repo.
- Run `type-check` when Astro, TS, props, data shapes, or imports change.
- Run `build` for any site or config change that could affect compilation or output.
- Run `test:e2e` when the homepage, navigation, scrolling, routes, or other user-visible behavior changes.
- Run `test:workflow` when helper scripts or workflow state handling changes.

## Expectations by stage

- Stage 2 should turn success criteria into user-facing acceptance criteria.
- Stage 3 should choose the test layers needed for the change.
- Stage 4 should sequence code tasks and matching validation tasks.
- Stage 5 should verify that the planned checks were actually completed.

## Typical acceptance coverage

- Happy path
- Empty state
- Error state
- Mobile layout if the feature changes layout
- Accessibility and keyboard behavior if the feature adds interaction
- Regression checks for reused sections or navigation flows
