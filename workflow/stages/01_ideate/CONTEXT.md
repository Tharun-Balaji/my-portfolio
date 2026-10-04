# Stage 1: Ideate

**Job**: Turn a raw feature idea into a clear problem brief. No solutions yet — only problem definition.

---

## Inputs

| Layer | File | Purpose |
|-------|------|---------|
| L3 | `../../_config/project.md` | Product context and constraints |
| L3 | `../../_config/git-conventions.md` | Commit format to use after writing output |
| L3 | `../../shared/glossary.md` | Use correct domain terms |
| L4 | `input/feature-request.md` | The raw idea or request to frame |

> **Before running**: Fill in `input/feature-request.md` with your feature idea. Even a rough sentence works.

---

## Process

1. Read the feature request
2. Identify the underlying user problem — not the stated solution
3. Define who is affected and what they are trying to do when they hit the problem
4. State what success looks like in observable, testable terms
5. List explicit non-goals to prevent scope creep
6. Surface open questions that must be answered before design starts
7. Rate effort vs impact (High / Med / Low) to inform prioritization

**Do not** propose UI designs, component names, or implementation approaches in this stage.

---

## Output

Write `output/problem-brief.md`:

```markdown
# Problem Brief: [Feature Name]

## The problem
[1–2 sentences: what breaks or is missing for the user today]

## Who is affected
[User type + what they're trying to accomplish when they hit this]

## Why it matters
[Business or product consequence of not solving it]

## Success looks like
- [ ] [Observable outcome 1 — something you can verify by watching a user]
- [ ] [Observable outcome 2]

## Non-goals (explicitly out of scope)
- [Thing we are not building in this iteration]

## Open questions
- [Question that must be answered before design can start]

## Effort vs impact estimate
| Dimension | Rating | Notes |
|-----------|--------|-------|
| User impact | High / Med / Low | |
| Engineering effort | High / Med / Low | |
| Risk / unknowns | High / Med / Low | |
```

---

## Commit

After writing `output/problem-brief.md`, commit it using the format in `../../_config/git-conventions.md`.

```bash
git add stages/01_ideate/input/feature-request.md \
        stages/01_ideate/output/problem-brief.md

git commit \
  -m "docs(ideate): define problem brief for <feature-name>" \
  -m "What: <1–2 sentences describing the core problem framed>

Decisions: <scope calls made, non-goals set, anything explicitly deferred>

Next: Design stage picks up from success criteria in problem-brief.md."
```

Fill in the angle-bracket placeholders with the actual content.
The body must be specific — never generic boilerplate.

---

## Review gate
Open `output/problem-brief.md`. Edit the success criteria and non-goals freely.
**This is the cheapest stage to change direction.** Stage 2 reads whatever you leave here.
