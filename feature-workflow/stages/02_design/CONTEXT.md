# Stage 2: Design

## Job

Translate the problem brief into UX decisions, states, scope, and user-facing acceptance criteria. This is where testing starts from the product perspective.

## Inputs

| Layer | File | Purpose |
| --- | --- | --- |
| L3 | `../../_config/project.md` | Product and repo context |
| L3 | `../../_config/testing.md` | Testing expectations for this repo |
| L4 | `../01_ideate/output/problem-brief.md` | Problem, success criteria, and scope |
| L4 | `references/` | Optional design references for this change |

## Process

1. Re-read the Stage 1 success criteria and treat them as the baseline acceptance goals.
2. Define the happy path user journey step by step.
3. Identify the UI surfaces involved.
4. Define loading, empty, error, success, and feature-specific edge states.
5. State the MVP scope clearly and name what is deferred.
6. Translate success criteria into user-facing acceptance criteria that can later be tested.
7. Raise engineering questions without choosing technical solutions yet.

## Output

Write `output/design-spec.md` using this structure:

```markdown
# Design Spec: [Change name]

## User journey
1. ...
2. ...
3. ...

## UI surfaces
| Surface | Type | Notes |
| --- | --- | --- |
| [name] | section / card / modal / inline update / route | |

## States to handle
| State | What the user sees | Recovery or follow-up |
| --- | --- | --- |
| Loading | | |
| Empty | | |
| Error | | |
| Success | | |
| [Edge case] | | |

## Acceptance criteria
- [ ] [User-observable behavior 1]
- [ ] [User-observable behavior 2]

## MVP scope
[What ships in this iteration]

## Deferred to later
- [Deferred item and why]

## Open questions for engineering
- [Question]
```

## Review gate

Review the user journey, state handling, and acceptance criteria before Stage 3. Product changes are still cheap here.
