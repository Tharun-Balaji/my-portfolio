# Stage 4: Implement

**Job**: Produce a sequenced task list and code scaffolding ready to execute — and commit each task as it's completed.

---

## Inputs

| Layer | File | Purpose |
|-------|------|---------|
| L3 | `../../_config/conventions.md` | Code style, patterns, file structure |
| L3 | `../../_config/git-conventions.md` | Commit format — read before writing any scaffold |
| L4 | `../03_architect/output/arch-spec.md` | What to build and the technical contracts |
| L4 | `../02_design/output/design-spec.md` | States and edge cases to handle |

---

## Process

### Phase A — Plan (do this first, then commit once)

1. Read arch-spec and design-spec fully before writing anything
2. Break the work into sequenced, independently committable tasks
3. Order tasks so each is runnable and testable before the next starts
4. Estimate size: S (< 1hr), M (1–4hr), L (4hr+)
5. Write the full plan to `output/implementation-plan.md`
6. Commit the plan file

```bash
git add stages/04_implement/output/implementation-plan.md

git commit \
  -m "chore(implement): add implementation plan for <feature-name>" \
  -m "What: Sequenced <N> tasks from arch-spec into independently
committable scaffolds. Task order: types → hook → component → routing → tests.

Decisions: <any sequencing decisions, parallelization notes>

Next: Execute tasks in order, committing each scaffold as it's written."
```

### Phase B — Scaffold (one commit per task, immediately after writing it)

For each task in the sequence:

1. Write the scaffold file(s) for that task
   - Real file path, real exports, real type stubs, `// TODO` bodies
   - Correct imports already wired up
   - No actual implementation logic — only structure and stubs
2. **Commit immediately** — do not batch multiple tasks into one commit
3. Move to the next task

---

## Commit format for each task

```
<type>(implement): <what was scaffolded>

What: <specific files created, types defined, interfaces established>

Decisions: <any design choices made during scaffolding — naming, interface
shape, state location, anything that deviated from arch-spec and why>

Next: <what the immediately following task depends on from this one>
```

Types: `feat` for new feature files, `test` for test files, `chore` for config/routing/plumbing.

**Never use vague messages**: no `"update"`, `"wip"`, `"scaffold"`, `"add files"`.
Every commit body must be specific enough that someone reading git log understands
what shape the code is in without opening the files.

---

## Output

Write `output/implementation-plan.md`:

~~~markdown
# Implementation Plan: [Feature Name]

## Task sequence
| # | Task | Size | Depends on | Files |
|---|------|------|-----------|-------|
| 1 | Add types | S | — | `feature-name.types.ts` |
| 2 | Scaffold hook | M | #1 | `useFeatureName.ts` |
| 3 | Scaffold root component | M | #2 | `FeatureRoot.tsx` |
| 4 | Wire into routing | S | #3 | `app/routes.ts` |
| 5 | Write test stubs | M | #3 | `feature-name.test.ts` |

## Scaffolds

### Task 1: Types
**File**: `src/features/feature-name/feature-name.types.ts`
```ts
export type FeatureEntity = {
  id: string
  // TODO: fill remaining fields from arch-spec data model
}

export type FeatureState = {
  // TODO
}
```
**Commit subject**: `feat(implement): add <feature-name> type definitions`

---

### Task 2: Hook
**File**: `src/features/feature-name/useFeatureName.ts`
```ts
import type { FeatureEntity } from './feature-name.types'

export function useFeatureName() {
  // TODO: implement — see arch-spec state design and API contracts
  // Return shape: { data: FeatureEntity[] | undefined, isLoading: boolean, error: Error | null }
  return {}
}
```
**Commit subject**: `feat(implement): scaffold use<FeatureName> hook`

---

### Task 3: Root component
**File**: `src/features/feature-name/FeatureRoot.tsx`
```tsx
import { useFeatureName } from './useFeatureName'

export default function FeatureRoot() {
  const { data, isLoading, error } = useFeatureName()

  if (isLoading) return null    // TODO: loading state — see design-spec
  if (error) return null        // TODO: error state — see design-spec
  if (!data?.length) return null // TODO: empty state — see design-spec

  return (
    <div>
      {/* TODO: happy path — see design-spec user journey */}
    </div>
  )
}
```
**Commit subject**: `feat(implement): scaffold <FeatureName> root component`

---

### Task 4: Routing / entry point
**File**: `src/app/routes.ts`
```ts
// TODO: add route entry for FeatureRoot
// Import path: src/features/feature-name/FeatureRoot
```
**Commit subject**: `chore(implement): wire <feature-name> into routing`

---

### Task 5: Test stubs
**File**: `src/features/feature-name/feature-name.test.ts`
```ts
describe('FeatureRoot', () => {
  it('should <success criterion 1 from problem-brief>', async () => {
    // TODO
  })
  it('should show error state when API fails', () => {
    // TODO
  })
  it('should show empty state when no data', () => {
    // TODO
  })
})
```
**Commit subject**: `test(implement): add test stubs for <feature-name>`

---

## Definition of done
- [ ] All task scaffolds committed individually
- [ ] All design-spec states have a stub handler in the root component
- [ ] All types match arch-spec data model
- [ ] Test stubs cover: happy path, error, empty
- [ ] Follows conventions.md naming and file layout
- [ ] No actual implementation in scaffolds — TODOs only
~~~

---

## Expected commit sequence after this stage

```
chore(implement): add implementation plan for <feature-name>
feat(implement):  add <feature-name> type definitions
feat(implement):  scaffold use<FeatureName> hook
feat(implement):  scaffold <FeatureName> root component
chore(implement): wire <feature-name> into routing
test(implement):  add test stubs for <feature-name>
```

Run `git log --oneline` after finishing — you should see one commit per task.

---

## Review gate
Open `output/implementation-plan.md`. Adjust task order or scaffold signatures.
**This is your build ticket.** Copy scaffolds into your editor and fill in the TODOs.
Stage 5 reads this file to generate the QA checklist.
