# Feature Workspace Workflow

A 5-stage, agent-agnostic workflow for taking any feature from idea to implementation-ready.
Based on Model Workspace Protocol (MWP).

## Folder Structure

```
workflow/
├── AGENTS.md          ← Layer 0: workspace identity (read first)
├── CONTEXT.md         ← Layer 1: active stage pointer + routing
├── README.md          ← this file
│
├── _config/           ← Layer 3: stable project reference
│   ├── project.md     ← stack, team, repo structure
│   └── conventions.md ← naming, patterns, PR rules
│
├── shared/            ← Layer 3: cross-stage assets
│   └── glossary.md    ← domain terms
│
└── stages/            ← Layer 2: The 5 stages of development
```

## Quick Start

### 1. Set up the workspace
Fill in `workflow/_config/project.md` with your stack details.
Fill in `workflow/_config/conventions.md` with your code style rules.

### 2. Start a new feature
Use the `setup.sh` script (requires Bash environment like Git Bash or WSL):

```bash
cd workflow
./setup.sh "my-new-feature"
```

This will:
- Initialize the git structure if needed.
- Create a feature branch `feat/my-new-feature`.
- Update `workflow/CONTEXT.md` to point to the new feature.

### 3. Describe your feature
Fill in `workflow/stages/01_ideate/input/feature-request.md`.

### 4. Run each stage with your agent
Ask your AI agent (Gemini, Claude, etc.) to:

> "Read workflow/AGENTS.md, then workflow/CONTEXT.md, then run the active stage."

The agent will:
1. Read the current stage instructions.
2. Read the inputs.
3. Generate the outputs in `output/`.
4. Commit the changes.

You review the output, then update `workflow/CONTEXT.md` to point to the next stage.

### 5. Finish and PR
When all stages are complete, use `finish.sh`:

```bash
cd workflow
./finish.sh
```

## Stage Map

| Stage | You provide | Agent produces |
|-------|------------|----------------|
| `01_ideate` | Raw feature idea | `problem-brief.md` |
| `02_design` | Reviewed problem brief | `design-spec.md` |
| `03_architect` | Reviewed design spec | `arch-spec.md` |
| `04_implement` | Reviewed arch spec | `implementation-plan.md` |
| `05_review` | All prior outputs | `review-checklist.md` |
