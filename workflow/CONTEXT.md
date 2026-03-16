# Workspace Routing

## Active stage
→ **01_ideate** — start here for a new feature

> Change this line to point at the current stage as you move through the pipeline.

---

## Stage index
| # | Folder | Purpose | Key output |
|---|--------|---------|------------|
| 1 | `01_ideate` | Frame the problem, define goals & non-goals | `problem-brief.md` |
| 2 | `02_design` | UX decisions, user flows, scoped requirements | `design-spec.md` |
| 3 | `03_architect` | Tech design, data model, component tree | `arch-spec.md` |
| 4 | `04_implement` | Task list, file plan, code scaffolding | `implementation-plan.md` |
| 5 | `05_review` | Acceptance criteria, edge cases, QA checklist | `review-checklist.md` |

## Shared resources (Layer 3)
- `_config/project.md` — project context, stack, team conventions
- `_config/conventions.md` — code style, naming, patterns
- `shared/glossary.md` — domain terms used across stages

## Pipeline flow
```
[you] fill in 01_ideate/input/feature-request.md
  → Stage 1 → review problem-brief.md
  → Stage 2 → review design-spec.md
  → Stage 3 → review arch-spec.md
  → Stage 4 → review implementation-plan.md
  → Stage 5 → review review-checklist.md
  → ship
```

## Skipping stages
If output already exists for a stage (e.g. you have a design doc), place it in
the relevant `output/` folder and advance the active stage pointer above.
