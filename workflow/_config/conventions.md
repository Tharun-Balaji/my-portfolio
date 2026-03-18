# Engineering Conventions

> Stable rules applied at every stage. Edit once, applies everywhere.

## Naming
- Components: PascalCase (`UserCard`, `PaymentModal`)
- Hooks: camelCase, `use` prefix (`useAuth`, `useFeatureFlag`)
- Files: kebab-case (`user-card.tsx`, `use-auth.ts`)
- Constants: SCREAMING_SNAKE (`MAX_RETRY_COUNT`)
- Types / Interfaces: PascalCase, no `I` prefix (`User`, `ApiResponse`)
- Event handlers: `handle` prefix (`handleSubmit`, `handleClose`)

## Component structure (React / React Native)
```tsx
// 1. Imports — external first, then internal
// 2. Types
// 3. Component function
// 4. Sub-components (only if tightly coupled and short)
// 5. Styles (if using StyleSheet / CSS-in-JS)

export default ComponentName
```

## Feature folder layout
```
features/feature-name/
  index.ts               ← public API (re-exports only)
  FeatureName.tsx        ← root component
  useFeatureName.ts      ← primary hook
  feature-name.types.ts  ← all types for this feature
  feature-name.test.ts   ← collocated tests
  components/            ← sub-components used only here
```

## State management rules
- Local UI state: `useState` / `useReducer`
- Shared feature state: store slice (Zustand, Redux, etc.)
- Server state: React Query / SWR — never copy into UI state
- Derived state: compute in render or useMemo, don't store it

## Async / error handling
- All async functions wrapped in try/catch
- User-facing errors use shared toast or ErrorBoundary
- Log to console in dev; send to monitoring in prod
- Never swallow errors silently

## Testing approach
- Unit: pure functions and hooks
- Integration: component + its hook together
- E2E: critical user flows only
- Test IDs: `data-testid="feature-name-element"` pattern

## PR conventions
- Branch: `feat/short-description`, `fix/short-description`
- Commits: conventional (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- Every PR: description, screenshots for UI changes, test note
- No PR merges with failing tests or lint errors
