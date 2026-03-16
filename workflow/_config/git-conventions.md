# Git Conventions

> Rules for how this workspace uses git. Every agent stage that writes output
> is expected to commit that output. Implementation stages commit in task-sized chunks.

---

## Branch strategy

Each feature lives on its own branch. **Never commit feature work to `main`.**

Branch naming:
```
feat/short-feature-name
```
Examples: `feat/user-auth`, `feat/offline-sync`, `feat/payment-modal`

The `setup.sh` script creates the branch automatically from the feature name.
If you are adding the workspace to an existing repo, create the branch manually before running any stage.

---

## When to commit

| Stage | Commit trigger | What to commit |
|-------|---------------|----------------|
| 01_ideate | After writing `problem-brief.md` | The output file |
| 02_design | After writing `design-spec.md` | The output file |
| 03_architect | After writing `arch-spec.md` | The output file |
| 04_implement | After completing **each task** from the task sequence | The scaffold file(s) for that task |
| 05_review | After writing `review-checklist.md` | The output file |

---

## Commit message format

Every commit uses a two-part format:

```
<type>(<scope>): <short summary>

<detailed description>
```

### Subject line (first line)
- `<type>`: one of `feat`, `design`, `arch`, `chore`, `fix`, `docs`, `test`
- `<scope>`: the stage or file affected, e.g. `ideate`, `design`, `implement`, `review`, or a specific filename
- `<short summary>`: imperative mood, ≤ 72 characters, no period at the end
- The subject line alone must be enough to understand what changed at a glance

### Body (everything after the blank line)
- **What**: what was added or changed and why
- **Decisions**: any explicit choices made during this stage (tradeoffs, scope calls, deferred items)
- **Next**: what the next stage or task picks up from here
- Wrap at 72 characters per line

### Examples

Stage commit (ideate):
```
docs(ideate): define problem brief for offline sync feature

What: Framed the core problem — users lose unsaved work when the app
goes offline mid-session. Success criteria: zero data loss on reconnect,
no manual user action required.

Decisions: Scoped to edit sessions only (not drafts). Real-time
collaboration deferred to v2.

Next: Design stage picks up from success criteria in problem-brief.md.
```

Implementation chunk commit:
```
feat(implement): add OfflineSync types and base hook scaffold

What: Created feature-name.types.ts with SyncState, SyncEvent, and
QueuedOperation types derived from arch-spec. Scaffolded useOfflineSync
hook with TODO bodies for queue management and reconnect logic.

Decisions: Using a discriminated union for SyncState to make exhaustive
checks easy at the component layer. Kept the hook interface minimal —
only exposes isSyncing, pendingCount, and flush().

Next: Task 3 — build the SyncStatusBar component that consumes this hook.
```

---

## Running git commands

The agent uses `git` CLI commands. All commands are run from the workspace root
(the folder containing `CLAUDE.md`).

```bash
# Stage any file
git add stages/01_ideate/output/problem-brief.md

# Commit with a full message (subject + body)
git commit -m "docs(ideate): define problem brief for offline sync" \
           -m "What: ..."

# Or write the message in a temp file for long bodies
git commit -F .git/COMMIT_EDITMSG
```

The agent should **never** use `git commit -m "update"` or similarly vague messages.
Every commit must have a body.

---

## What gets committed at each stage

### Stage 01 — ideate
```
stages/01_ideate/input/feature-request.md
stages/01_ideate/output/problem-brief.md
```

### Stage 02 — design
```
stages/02_design/output/design-spec.md
```

### Stage 03 — architect
```
stages/03_architect/output/arch-spec.md
```

### Stage 04 — implement (one commit per task)
```
# Task commit: only the files created or modified in that task
src/features/feature-name/feature-name.types.ts
# — then next commit —
src/features/feature-name/useFeatureName.ts
# — etc.
```

Also commit the implementation plan itself on first run:
```
stages/04_implement/output/implementation-plan.md
```

### Stage 05 — review
```
stages/05_review/output/review-checklist.md
```
