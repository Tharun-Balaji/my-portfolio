# Stage 5: Review

**Job**: Generate the QA checklist and PR description that close out the feature.

---

## Inputs

| Layer | File | Purpose |
|-------|------|---------|
| L3 | `../../_config/git-conventions.md` | Commit format to use after writing output |
| L4 | `../01_ideate/output/problem-brief.md` | Original success criteria |
| L4 | `../02_design/output/design-spec.md` | States and edge cases |
| L4 | `../04_implement/output/implementation-plan.md` | Definition of done |

---

## Process

1. Pull each success criterion from Stage 1 — make each one a testable checkbox
2. Pull each state from Stage 2 (loading, empty, error, success, edge cases) — verify each has a check
3. Verify all items in the Stage 4 definition of done are represented
4. Add edge cases the earlier stages may have missed:
   - Network failure / timeout
   - Empty or null data
   - Single-item vs many-item lists
   - Permission / auth boundary
   - Mobile viewport (if applicable)
   - Keyboard / accessibility (if interactive)
5. Generate a pre-filled PR description using the earlier stage outputs as context

---

## Output

Write **two files**.

---

### File 1 — `output/review-checklist.md`

```markdown
# Review Checklist: [Feature Name]

## Acceptance criteria
> From problem-brief.md — each item is a testable user-observable outcome

- [ ] [Success criterion 1 — phrased as "user can X" or "system does Y when Z"]
- [ ] [Success criterion 2]

## State coverage
> From design-spec.md

- [ ] Loading state: [what the user sees]
- [ ] Empty state: [what the user sees]
- [ ] Error state: [what the user sees + recovery action]
- [ ] Success state: [what the user sees]
- [ ] [Any edge case state from design-spec]

## Edge cases
- [ ] Works with 0 items
- [ ] Works with 1 item
- [ ] Works with 50+ items (no overflow / layout break)
- [ ] Handles network timeout gracefully
- [ ] Handles API 500 gracefully
- [ ] Correct behaviour when user lacks required permissions
- [ ] No layout break on mobile viewport (if applicable)
- [ ] Keyboard navigable (if interactive)
- [ ] Focus management correct after modal open/close (if applicable)

## Code quality
- [ ] Follows conventions.md (naming, file structure, patterns)
- [ ] No hardcoded strings (uses constants or i18n keys)
- [ ] No `console.log` left in
- [ ] No `any` types
- [ ] Tests pass — unit + integration
- [ ] Tests cover: happy path, error state, empty state
- [ ] No regressions in related flows (manually verified)
```

---

### File 2 — `output/pr-description.md`

This file is read directly by `finish.sh` to populate `gh pr create`.
Write it in clean GitHub markdown — no wrapper headings, no meta-commentary.
The `finish.sh` script uses the first line as the PR title and the rest as the body.

```markdown
[Feature Name]: [one sentence — what this feature does and why it matters]

## What
[One paragraph. What the user can now do that they couldn't before. Written
from the user's perspective, not the engineer's.]

## Why
[The problem from problem-brief.md in 1–2 sentences. Why this was worth building.]

## How
[Technical summary: key component(s) built, hook(s) introduced, API endpoint(s)
used, state location. 3–5 sentences. Written for a reviewer who needs to know
where to look in the diff.]

## Changes
- [File or module 1] — [what it does]
- [File or module 2] — [what it does]
- [Test file] — [what's covered]

## Testing done
- [ ] Happy path: [what you ran / clicked through]
- [ ] Error state: [how you triggered it and what you verified]
- [ ] Edge case: [which one, what you checked]

## Screenshots
<!-- Add before/after screenshots or a screen recording if there is UI change -->

## Checklist
- [ ] All acceptance criteria from problem-brief met
- [ ] All design-spec states handled
- [ ] Tests pass
- [ ] No regressions
```

**Rules for writing pr-description.md:**
- First line = PR title: `[Feature Name]: [one sentence]` — concise, under 72 characters
- Leave a blank line after the first line before `## What`
- No triple-backtick wrappers around the file contents — write raw markdown
- Populate every section with real content from the prior stages, not placeholder text

---

## Commit

After writing both output files, commit them together:

```bash
git add stages/05_review/output/review-checklist.md \
        stages/05_review/output/pr-description.md

git commit \
  -m "docs(review): add QA checklist and PR description for <feature-name>" \
  -m "What: Review checklist generated from all prior stage outputs.
Covers acceptance criteria from ideate, state coverage from design,
and definition of done from implement. pr-description.md is ready
for finish.sh to pass directly to gh pr create.

Next: Work through review-checklist.md, then run ./finish.sh to open the PR."
```

---

## Review gate
Open `output/review-checklist.md` and work through every checkbox.
Open `output/pr-description.md` and verify the content is accurate — this
becomes the live PR description, so reviewers will read it.
When the checklist is clean, run `./finish.sh` to open the PR.
