# JavaScript to TypeScript Migration Plan

## Goal
Migrate this Astro portfolio project from JavaScript to TypeScript incrementally, with a clean commit history and validation at each step.

## Commit-by-Commit Plan

1. **Create a migration branch and capture baseline**
- Actions: create `feat/ts-migration`, run current build once to confirm baseline is green.
- Validation: `npm run build`.
- Commit: `chore: capture pre-typescript baseline` (optional marker commit; no code changes).

2. **Add TypeScript toolchain and project config**
- Actions:
  - Add `typescript`, `@types/react`, `@types/react-dom` as dev dependencies.
  - Add `tsconfig.json` extending Astro strict presets.
  - Add type-check script using `astro check`.
- Validation: `npm run astro check` (or `npx astro check`), `npm run build`.
- Commit: `chore: add typescript config and type-check tooling`.

3. **Migrate utility JS to TS**
- Actions:
  - Rename `src/utils/assets.js` to `src/utils/assets.ts`.
  - Add explicit function typing for `assetPath`.
  - Update all imports.
- Validation: `npm run astro check`, `npm run build`.
- Commit: `refactor: migrate assetPath utility to typescript`.

4. **Migrate React component to TSX**
- Actions:
  - Rename `src/components/Navbar/Navbar.jsx` to `src/components/Navbar/Navbar.tsx`.
  - Add explicit React typing where needed.
  - Update `src/pages/index.astro` import.
- Validation: `npm run astro check`, `npm run build`.
- Commit: `refactor: convert navbar component from jsx to tsx`.

5. **Add shared domain types for JSON-backed content**
- Actions:
  - Create `src/types/content.ts` with `Skill`, `Project`, and `HistoryItem` types.
  - Type JSON data usage in Astro components (`Skills.astro`, `Projects.astro`, `Experience.astro`, `ProjectCard.astro`).
  - Remove implicit `any` in map callbacks and prop usage.
- Validation: `npm run astro check`, `npm run build`.
- Commit: `refactor: introduce typed content models for portfolio data`.

6. **Type Astro props explicitly**
- Actions:
  - Add `Props` interfaces and `Astro.props` typing in components with props (`Layout.astro`, `ProjectCard.astro`).
  - Keep runtime behavior unchanged.
- Validation: `npm run astro check`, `npm run build`.
- Commit: `refactor: add explicit astro props typing`.

7. **Tighten and clean remaining TS issues**
- Actions:
  - Resolve strict-mode warnings/errors.
  - Ensure no remaining local `.js/.jsx` source files in `src` (except intended config files like `.mjs`).
- Validation:
  - `rg --files src | rg "\\.(js|jsx)$"` returns no matches.
  - `npm run astro check`
  - `npm run build`
- Commit: `chore: finalize javascript to typescript migration`.

8. **Final verification and migration summary**
- Actions: final check/build pass and behavior verification.
- Validation: `npm run astro check && npm run build`.
- Commit: `chore: verify typescript migration stability`.

## Safety Rules During Migration
- Keep behavior unchanged while adding types.
- Run checks before each commit.
- Keep commits small and focused on one concern.
- Do not mix formatting-only changes into migration commits unless required for passing checks.

## Professional Quality Strategy: ESLint + Prettier

### Objectives
- Enforce consistent code style automatically.
- Catch common bugs and type-related issues early.
- Keep pull requests small, readable, and reviewable.

### Recommended Rollout (After TypeScript Baseline Is Stable)

1. **Add ESLint stack for Astro + TypeScript + React**
- Install: `eslint`, `typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-config-prettier`.
- Add `eslint.config.js` (flat config) with:
  - Astro parser/config for `.astro`.
  - TypeScript-aware rules for `.ts`/`.tsx`.
  - React + hooks rules for `.tsx`.
  - Accessibility rules for JSX/TSX.
- Add scripts:
  - `lint`: run ESLint.
  - `lint:fix`: run ESLint with autofix.
- Commit: `chore: add eslint configuration for astro typescript and react`.

2. **Add Prettier with Astro support**
- Install: `prettier`, `prettier-plugin-astro`.
- Add `.prettierrc` and `.prettierignore`.
- Add script:
  - `format`: run Prettier across source files.
  - `format:check`: verify formatting in CI.
- Commit: `chore: add prettier formatting with astro plugin`.

3. **Integrate ESLint and Prettier cleanly**
- Ensure ESLint disables formatting conflicts via `eslint-config-prettier`.
- Keep stylistic formatting decisions in Prettier, code-quality decisions in ESLint.
- Run:
  - `npm run lint:fix`
  - `npm run format`
  - `npm run lint`
  - `npm run format:check`
- Commit: `chore: align eslint and prettier and apply autofixes`.

4. **Optional: Add pre-commit quality gate**
- Install: `husky`, `lint-staged`.
- Configure staged checks:
  - Prettier on staged files.
  - ESLint on staged JS/TS/TSX/Astro files.
- Commit: `chore: add pre-commit lint and format checks`.

5. **Optional: CI quality gate**
- Add pipeline step to run:
  - `npm run astro check`
  - `npm run lint`
  - `npm run format:check`
  - `npm run build`
- Commit: `chore: enforce lint format typecheck and build in ci`.

### Practical Standards to Keep It Professional
- Prefer warnings first, then promote key rules to errors after cleanup.
- Avoid enabling too many strict rules on day one; tighten incrementally.
- Keep rule exceptions localized and documented with short comments.
- Use consistent import ordering only if team agrees (avoid unnecessary churn).
- Include lint/format commands in `README.md` for contributor onboarding.

## CI Testing Strategy

### Objectives
- Prevent regressions on every pull request.
- Validate functionality, typing, linting, formatting, and production build in one pipeline.
- Enforce minimum coverage so tests remain meaningful over time.

### Recommended Test Stack
- Unit/Component: `vitest` + `@testing-library/react` + `jsdom`.
- Coverage: `@vitest/coverage-v8`.
- E2E smoke tests: `playwright` (critical user flows only).

### CI Pipeline Stages (PR + main branch)
1. **Install**
- `npm ci`

2. **Static Quality**
- `npm run lint`
- `npm run format:check`
- `npm run astro check`

3. **Tests + Coverage**
- `npm run test -- --coverage`

4. **E2E Smoke**
- `npm run build`
- `npm run preview` (background)
- `npm run test:e2e`

5. **Artifacts (optional but useful)**
- Upload coverage report and Playwright HTML report.

### What Needs To Be Added In Test Coverage

1. **Utility Tests (high value, low effort)**
- `src/utils/assets.ts`
  - handles empty path safely
  - normalizes leading/trailing slashes
  - resolves `BASE_URL` correctly for root and subpath deploys

2. **React Component Tests**
- `src/components/Navbar/Navbar.tsx`
  - renders title and nav links
  - toggles menu open/close on click
  - closes menu on menu item click
  - uses correct menu icon based on state

3. **Data Contract Tests**
- JSON structure checks for:
  - `src/data/projects.json`
  - `src/data/skills.json`
  - `src/data/history.json`
- Validate required fields and basic value types (title, imageSrc, links, arrays).

4. **Page/Integration Smoke**
- Home page renders key sections:
  - About
  - Experience
  - Skills
  - Projects
  - Contact
- Verify no runtime crash when rendering project/history lists.

5. **E2E Critical Flows**
- Landing page loads successfully.
- In-page navigation anchors work.
- External links include `target`/`rel` where expected.

### Coverage Targets (Start Practical, Then Raise)
- Initial gate:
  - Statements: `70%`
  - Branches: `60%`
  - Functions: `70%`
  - Lines: `70%`
- After stabilization, raise to:
  - Statements: `80%`
  - Branches: `70%`
  - Functions: `80%`
  - Lines: `80%`

### Rollout Plan for Tests (Commit Sequence)
1. `chore: add vitest testing setup and coverage configuration`
2. `test: add unit tests for assetPath utility`
3. `test: add navbar component interaction tests`
4. `test: add data contract tests for portfolio json files`
5. `test: add playwright smoke tests for landing page and navigation`
6. `chore: wire ci pipeline for lint typecheck test coverage and build`

### Governance Rules
- No PR merge if any CI stage fails.
- No coverage drop below baseline threshold on modified files.
- Keep flaky tests out of required checks until stabilized.
