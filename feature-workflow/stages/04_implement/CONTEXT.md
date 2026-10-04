# Stage 4: Implement

## Job

Turn the architecture spec into a sequenced implementation plan with explicit code tasks and validation tasks. Tests are planned and executed here, not left only for review.

## Inputs

| Layer | File | Purpose |
| --- | --- | --- |
| L3 | `../../_config/conventions.md` | Code and file conventions |
| L3 | `../../_config/git-conventions.md` | Commit expectations |
| L3 | `../../_config/testing.md` | Validation guidance |
| L4 | `../02_design/output/design-spec.md` | UX states and acceptance criteria |
| L4 | `../03_architect/output/arch-spec.md` | Technical plan and test strategy |

## Process

1. Read the design and architecture outputs fully.
2. Break the work into small, independently committable tasks.
3. Include both code tasks and matching validation tasks.
4. Order tasks so each step leaves the branch in a sensible state.
5. Tie every relevant acceptance criterion and state to at least one planned validation step.
6. Note the checks required before the branch is ready for review.

## Output

Write `output/implementation-plan.md` using this structure:

```markdown
# Implementation Plan: [Change name]

## Task sequence
| # | Task type | Task | Depends on | Files or checks |
| --- | --- | --- | --- | --- |
| 1 | code | [task] | - | `src/...` |
| 2 | code | [task] | #1 | `src/...` |
| 3 | test | [validation task] | #1, #2 | `npm run lint` |

## Code tasks
### Task 1
- Goal:
- Files:
- Commit subject:

## Validation tasks
### Validation 1
- Covers:
- Commands:
- Notes:

## Definition of done
- [ ] Acceptance criteria covered
- [ ] Required states implemented
- [ ] Required checks identified in Stage 3 are completed
- [ ] Manual verification notes captured for review
```

## Review gate

Review task order, commit boundaries, and the validation plan before writing code.
