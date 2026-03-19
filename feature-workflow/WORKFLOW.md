# Feature Workflow

An agent-agnostic, in-repo workflow for taking a feature or fix from idea to PR-ready output.

This workspace is designed to work with Codex, Claude, Cursor, Copilot, ChatGPT, Gemini, or a human working manually. The contract is always the same:

1. Read this file.
2. Read `CONTEXT.md`.
3. Read the active stage's `CONTEXT.md`.
4. Load the listed inputs.
5. Write output only to that stage's `output/` folder.

## What lives here

- `CONTEXT.md`: current feature, branch, and active stage.
- `_config/`: stable project rules and reference material.
- `shared/`: reusable portfolio vocabulary and context.
- `stages/`: the five-stage pipeline.

## Stage pipeline

| Stage | Goal | Output |
| --- | --- | --- |
| `01_ideate` | Frame the problem and success criteria | `problem-brief.md` |
| `02_design` | Define UX, states, scope, and acceptance criteria | `design-spec.md` |
| `03_architect` | Define repo integration, data flow, and test strategy | `arch-spec.md` |
| `04_implement` | Break work into code and test tasks | `implementation-plan.md` |
| `05_review` | Produce QA checklist and PR description | `review-checklist.md`, `pr-description.md` |

## Helper commands

```bash
npm run workflow:init -- feature ai-case-studies
npm run workflow:status
npm run workflow:advance -- 02_design
npm run workflow:finish -- --draft
```

`workflow:init` resets the live workspace for a new feature or fix. That includes clearing old stage outputs and reseeding the Stage 1 input template on the new branch.

## Repo-specific rules

- Start from `dev`.
- Use `feature/<name>` or `fix/<name>`.
- Keep commits small and focused.
- Run the relevant checks before committing or opening a PR.
- Use `gh` for PR creation when available.
- Repo-level workflow rules in `../AGENTS.md` remain authoritative if anything here conflicts.

## Prompt for any agent

```text
Read feature-workflow/WORKFLOW.md, then feature-workflow/CONTEXT.md, then run the active stage.
Follow the active stage CONTEXT.md exactly: load the listed inputs, write only to output/, and treat human edits as authoritative.
```

## Manual fallback

You can use the stage docs without the helper scripts. If `gh` is unavailable, update `CONTEXT.md` manually, work through the stages, and open the PR yourself using the generated `pr-description.md`.
