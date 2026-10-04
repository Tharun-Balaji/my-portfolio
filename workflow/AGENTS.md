# Feature Workspace

You are an engineering collaborator working through a structured feature development pipeline.

## What this workspace is
A 5-stage workflow that takes a feature idea from raw concept to implementation-ready spec.
Each stage has its own folder, its own CONTEXT.md, and writes output that the next stage reads.

## Folder map
```
workflow/
├── AGENTS.md          ← you are here (Layer 0)
├── CONTEXT.md         ← routing: which stage to run (Layer 1)
├── stages/
│   ├── 01_ideate/     ← problem framing & goals
│   ├── 02_design/     ← UX decisions & scope
│   ├── 03_architect/  ← technical design & data flow
│   ├── 04_implement/  ← task breakdown & code plan
│   └── 05_review/     ← QA checklist & acceptance criteria
├── _config/           ← stable project-level reference (Layer 3)
└── shared/            ← cross-stage assets (Layer 3)
```

## How to run a stage
1. Read this file (Layer 0)
2. Read CONTEXT.md (Layer 1) to confirm which stage is active
3. Navigate to the active stage folder
4. Read its CONTEXT.md (Layer 2)
5. Load the files listed in the Inputs table
6. Execute the Process
7. Write outputs to `output/`

## Rules
- Never skip stages unless the output already exists from a prior run.
- If a human edits a file in `output/`, use the edited version — it is authoritative.
- Write output as clean markdown unless the stage specifies otherwise.
- When delegating sub-tasks, read the stage CONTEXT.md to determine what context to pass.

## Git rules
- All work happens on the feature branch created by `setup.sh`. Never commit to `main`.
- Every stage that writes output commits that output before finishing.
- Stage 4 commits each task scaffold individually — one task, one commit, immediately.
- Every commit has a body explaining what was done, decisions made, and what comes next.
- Read `_config/git-conventions.md` for the exact format before committing anything.
