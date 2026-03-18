# Stage 3: Architect

**Job**: Define the technical design — components, data model, API contracts, state shape, file layout.

---

## Inputs

| Layer | File | Purpose |
|-------|------|---------|
| L3 | `../../_config/project.md` | Stack, repo structure |
| L3 | `../../_config/conventions.md` | Naming and file conventions |
| L3 | `../../_config/git-conventions.md` | Commit format to use after writing output |
| L4 | `../02_design/output/design-spec.md` | What needs to be built |

---

## Process

1. Map each UI surface from Stage 2 to components (new vs reuse vs extend existing)
2. Define the data model: what shape does the data take at each layer (API → store → component props)
3. Define state: what lives where (local useState, feature store, server cache via React Query/SWR)
4. Define API contracts: endpoints needed, request/response shapes, error cases
5. Identify side effects: what else in the app changes when this feature runs
6. Flag technical risks, unknowns, or performance concerns
7. Write the file/folder layout for this feature following conventions.md

**Do not write actual implementation code in this stage.** Define contracts and shapes only.
Pseudocode or TypeScript type stubs are appropriate. Full function bodies are not.

---

## Output

Write `output/arch-spec.md`:

````markdown
# Architecture Spec: [Feature Name]

## Component tree
```
FeatureRoot
  ├── ComponentA         ← new
  ├── ComponentB         ← reuse from shared/components/
  │   └── ComponentC    ← extend with new prop
  └── ComponentD         ← new
```

## Data model
```ts
// Core types for this feature
type FeatureEntity = {
  id: string
  // ...
}

type FeatureState = {
  // ...
}
```

## State design
| State | Location | Type | Notes |
|-------|----------|------|-------|
| [name] | local / feature store / server cache | [type] | |

## API contracts
### GET /api/endpoint
- Auth: required / optional
- Query params: `{ param: string }`
- Response: `{ data: FeatureEntity[], total: number }`
- Error cases: 401 (unauth), 404 (not found), 500 (server error)

### POST /api/endpoint
- Body: `{ ... }`
- Response: `{ id: string }`

## File layout
```
features/feature-name/
  index.ts
  FeatureRoot.tsx
  useFeatureName.ts
  feature-name.types.ts
  feature-name.test.ts
  components/
    SubComponent.tsx
```

## Side effects
- [What else in the app needs updating: cache invalidation, navigation, analytics event, etc.]

## Technical risks
- [Unknown, external dependency, performance concern, browser API limitation]
````

---

## Commit

After writing `output/arch-spec.md`, commit it:

```bash
git add stages/03_architect/output/arch-spec.md

git commit \
  -m "arch(<feature-name>): define component tree, data model, and API contracts" \
  -m "What: <1–2 sentences on the key technical decisions>

Decisions: <state location choices, API design calls, anything deferred for tech reasons>

Next: Implement stage uses this spec to scaffold files and sequence tasks."
```

---

## Review gate
Open `output/arch-spec.md`. Adjust component boundaries and API contracts before Stage 4.
**No code has been written yet — changes here are still free.**
Stage 4 reads whatever you leave here.
