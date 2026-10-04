# Stage 3: Architect

## Job

Map the approved design to repo structure, data flow, integration points, and test strategy. This is the technical design handoff for implementation.

## Inputs

| Layer | File | Purpose |
| --- | --- | --- |
| L3 | `../../_config/project.md` | Repo layout and stack |
| L3 | `../../_config/conventions.md` | Code and naming conventions |
| L3 | `../../_config/testing.md` | Available validation layers |
| L3 | `../../shared/ui-inventory.md` | Existing components and reuse options |
| L4 | `../02_design/output/design-spec.md` | UX behavior, states, and acceptance criteria |
| L4 | `references/` | Optional technical references for this change |

## Process

1. Map each design surface to a new, reused, or extended repo component.
2. Identify the exact repo integration points for code, data, and assets.
3. Define the data model or content shape needed at each layer.
4. Define state ownership and side effects.
5. Call out file layout and responsibilities.
6. Choose the test strategy by layer: lint, type-check, build, workflow tests, e2e, and manual verification.
7. Flag technical risks and unknowns.

## Output

Write `output/arch-spec.md` using this structure:

````markdown
# Architecture Spec: [Change name]

## Repo integration points
- `src/...` - [role]
- `src/...` - [role]
- `public/assets/...` - [role if needed]

## Component and file plan
| Area | Action | Notes |
| --- | --- | --- |
| [component or file] | new / extend / reuse | |

## Data or content model
```ts
type ExampleShape = {
  id: string;
}
```

## State and side effects
| Concern | Location | Notes |
| --- | --- | --- |
| [state or effect] | local / Astro data / utility / page integration | |

## Test strategy
| Layer | Required | Why |
| --- | --- | --- |
| Lint | Yes / No | |
| Type-check | Yes / No | |
| Build | Yes / No | |
| E2E | Yes / No | |
| Manual verification | Yes / No | |

## Technical risks
- [Risk or unknown]
````

## Review gate

Review component boundaries, integration points, and the chosen test strategy before implementation begins.
