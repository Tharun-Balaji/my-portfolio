# Git Conventions

## Branching

- Start feature work from `dev`.
- Use `feature/<short-description>` for features.
- Use `fix/<short-description>` for bug fixes.
- Merge child branches back into their parent branch first.
- Use `gh` to open PRs whenever possible.

## Commit expectations

- Keep each commit to one logical change.
- Write a clear subject and a body that explains what changed, decisions made, and what comes next.
- Confirm no unrelated files are staged before committing.
- Run the relevant checks for the scope of change before each commit.

## Suggested commit shape

```text
<type>(<scope>): <summary>

What: <specific change made>

Decisions: <tradeoffs, scope calls, or deviations from the plan>

Next: <next stage or dependency>
```

## Common scopes

- `ideate`
- `design`
- `architect`
- `implement`
- `review`
- `workflow`

## PR defaults

- Feature and fix branches should normally target `dev`.
- Keep the PR description aligned with `feature-workflow/stages/05_review/output/pr-description.md`.
- Mention the checks you ran and any manual verification that matters for reviewers.
