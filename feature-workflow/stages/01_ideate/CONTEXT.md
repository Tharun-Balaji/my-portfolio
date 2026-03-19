# Stage 1: Ideate

## Job

Turn a raw feature or fix request into a clear problem brief. Focus on the problem, users, success criteria, and scope boundaries. Do not design solutions yet.

## Inputs

| Layer | File | Purpose |
| --- | --- | --- |
| L3 | `../../_config/project.md` | Product context and repo constraints |
| L3 | `../../_config/git-conventions.md` | Commit expectations after writing output |
| L3 | `../../shared/glossary.md` | Shared domain terms |
| L3 | `../../shared/product-notes.md` | Product goals and audience context |
| L4 | `input/feature-request.md` | Raw request to frame |

## Process

1. Read the raw request carefully.
2. Identify the underlying user or product problem.
3. Define who is affected and what they are trying to accomplish.
4. Convert the request into observable success criteria.
5. Name non-goals to prevent scope creep.
6. Surface questions that block design work.
7. Estimate impact, effort, and uncertainty.

## Output

Write `output/problem-brief.md` using this structure:

```markdown
# Problem Brief: [Change name]

## Problem
[1-2 sentences on what is missing or broken]

## Who is affected
[User type and what they are trying to do]

## Why it matters
[Why solving this is worth the effort]

## Success criteria
- [ ] [Observable outcome 1]
- [ ] [Observable outcome 2]

## Non-goals
- [Explicitly out of scope item]

## Open questions
- [Question design needs answered]

## Effort and risk
| Dimension | Rating | Notes |
| --- | --- | --- |
| User impact | High / Medium / Low | |
| Engineering effort | High / Medium / Low | |
| Unknowns | High / Medium / Low | |
```

## Review gate

Human edits are authoritative. Review and refine the success criteria and non-goals before advancing to Stage 2.
