# Stage 2: Design

**Job**: Translate the problem brief into UX decisions and scoped product requirements.

---

## Inputs

| Layer | File | Purpose |
|-------|------|---------|
| L3 | `../../_config/project.md` | Stack and product context |
| L3 | `../../_config/git-conventions.md` | Commit format to use after writing output |
| L4 | `../01_ideate/output/problem-brief.md` | The problem to solve |

---

## Process

1. Re-read the success criteria from Stage 1 — these become your acceptance tests
2. Map the user journey for the happy path, step by step
3. Identify the UI surfaces needed (new screen, modal, inline change, drawer, toast, etc.)
4. Make explicit decisions for every state: loading, empty, error, success, and edge cases
5. Define the MVP: the minimum that satisfies the Stage 1 success criteria
6. List what is deferred to v2 — this is as important as what's in scope

**Stay at the product/UX layer.** No component names, no API shapes, no technical decisions yet.

---

## Output

Write `output/design-spec.md`:

```markdown
# Design Spec: [Feature Name]

## User journey (happy path)
1. User does X
2. System responds with Y
3. User sees/does Z
...

## UI surfaces
| Surface | Type | Notes |
|---------|------|-------|
| [name] | new screen / modal / inline / toast / drawer | [any known constraints] |

## States to handle
| State | What the user sees | Actionable? |
|-------|--------------------|-------------|
| Loading | | |
| Empty (no data) | | |
| Error | | Yes — [recovery action] |
| Success | | |
| [edge case] | | |

## MVP scope
[What ships in this PR / sprint — reference success criteria from Stage 1]

## Deferred to v2
- [Thing we want but are explicitly not building now]
- [Reason: complexity, dependency, low frequency]

## Open questions for engineering
- [Feasibility question, data availability, performance concern]
```

---

## Commit

After writing `output/design-spec.md`, commit it:

```bash
git add stages/02_design/output/design-spec.md

git commit \
  -m "design(<feature-name>): define UX spec and scoped requirements" \
  -m "What: <1–2 sentences on the key UX decisions made>

Decisions: <what was scoped in vs deferred to v2, any state handling choices>

Next: Arch stage maps these surfaces and states to components and data contracts."
```

---

## Review gate
Open `output/design-spec.md`. Edit user journeys and state handling before Stage 3.
**This is the last stage where product decisions are cheap to change.**
Stage 3 reads whatever you leave here.
