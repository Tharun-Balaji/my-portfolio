# Workflow Routing

<!-- workflow-state
{
  "featureName": null,
  "featureSlug": null,
  "changeType": null,
  "branch": null,
  "activeStage": "01_ideate"
}
-->

## Current change

Not initialized yet. Run `npm run workflow:init -- feature my-change` or `npm run workflow:init -- fix broken-nav`.

## Active stage

-> **01_ideate** - start here for a new feature or fix.

## Stage index

| Stage | Purpose | Required output |
| --- | --- | --- |
| `01_ideate` | Frame the problem, users, scope, and success criteria | `problem-brief.md` |
| `02_design` | Define user journey, UI states, MVP scope, and acceptance criteria | `design-spec.md` |
| `03_architect` | Map the design to repo structure, data flow, and test strategy | `arch-spec.md` |
| `04_implement` | Sequence code tasks and test tasks for implementation | `implementation-plan.md` |
| `05_review` | Generate QA checklist and PR description | `review-checklist.md`, `pr-description.md` |

## Shared inputs

- `_config/project.md`
- `_config/conventions.md`
- `_config/git-conventions.md`
- `_config/testing.md`
- `shared/glossary.md`
- `shared/product-notes.md`
- `shared/ui-inventory.md`

Advance stages with `npm run workflow:advance -- <stage>` after the current stage output exists and has been reviewed.
