# AGENTS.md

## Workflow Rules

- Keep commits small and focused. Do not bundle unrelated changes in one commit.
- Write clear commit messages that explain what changed and why.
- Commit incrementally as work progresses so the history documents the process.
- Unless the user explicitly asks not to, agents should commit completed logical work before handing off.
- Agents should not leave finished implementation only in the working tree. If work is intentionally left uncommitted, the reason must be explicit in the handoff.
- Prefer one logical change per commit (for example: styling, animation, config, docs).
- `main` is the stable branch.
- `dev` is the shared integration branch for active development.
- Start new work from `dev` by default.
- If a task depends on another in-progress branch, create the child branch from that parent branch instead of branching directly from `dev`.
- Use branch names:
  - `feature/<short-description>` for features
  - `fix/<short-description>` for bug fixes
- Merge every branch back into its parent branch first.
- Use GitHub CLI (`gh`) to open pull requests for merges whenever possible.
- Typical merge flow:
  1. `main` -> `dev`
  2. `dev` -> `feature/...` or `fix/...`
  3. child branch -> parent branch by PR
  4. `dev` -> `main` by PR when ready
- Keep commits small and focused. Do not bundle unrelated changes in one commit.
- Write clear commit messages that explain what changed and why.
- Commit incrementally as work progresses so the history documents the process.
- Prefer one logical change per commit, for example: styling, animation, config, docs.
- Before each commit or PR, run the relevant checks for the scope of change.
- Confirm no unrelated files are staged before committing or opening a PR.
- Before ending a coding task, agents should verify whether there are completed staged or unstaged changes and either commit them or clearly explain why not.
- For staged feature work, use the agent-agnostic workflow in `feature-workflow/WORKFLOW.md`. This file still remains the source of truth for repo-level git and review rules.

## Notes

- Keep this file up to date when workflow preferences change.
- Unless explicitly requested otherwise, agents should read and follow this file on every prompt for this repository.
