# Stage 5: Review

## Job

Generate the QA checklist and PR description that close the loop on the earlier stages.

## Inputs

| Layer | File | Purpose |
| --- | --- | --- |
| L3 | `../../_config/git-conventions.md` | PR and commit expectations |
| L3 | `../../_config/testing.md` | Required checks to verify |
| L4 | `../01_ideate/output/problem-brief.md` | Original success criteria |
| L4 | `../02_design/output/design-spec.md` | UX states and acceptance criteria |
| L4 | `../03_architect/output/arch-spec.md` | Test strategy and integration points |
| L4 | `../04_implement/output/implementation-plan.md` | Task plan and definition of done |

## Process

1. Convert Stage 1 success criteria into reviewable acceptance checks.
2. Pull every state and acceptance criterion from Stage 2 into the checklist.
3. Carry forward the test strategy from Stage 3 and the validation tasks from Stage 4.
4. Add regressions and edge cases relevant to the portfolio.
5. Write a reviewer-friendly PR description from the user and technical perspectives.

## Output

Write both files:

- `output/review-checklist.md`
- `output/pr-description.md`

Use this shape:

```markdown
# Review Checklist: [Change name]

## Acceptance criteria
- [ ] ...

## State coverage
- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Success

## Validation completed
- [ ] Lint
- [ ] Type-check
- [ ] Build
- [ ] E2E or manual verification as required

## Regression checks
- [ ] Existing related sections still work
- [ ] Mobile layout still holds
- [ ] Accessibility or keyboard checks completed if interactive
```

`pr-description.md` should use:

```markdown
[Short PR title under 72 characters]

## What

## Why

## How

## Testing done

## Checklist
```

## Review gate

Work through the checklist before opening the PR. `workflow:finish` reads `pr-description.md` and expects the Stage 5 files to exist.
