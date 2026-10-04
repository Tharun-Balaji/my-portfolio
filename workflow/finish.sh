#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# finish.sh — open a pull request via gh CLI when a feature is complete
#
# Usage:
#   ./finish.sh              ← uses current branch, reads pr-description.md
#   ./finish.sh --draft      ← opens as draft PR
#   ./finish.sh --base main  ← target branch (default: main)
#
# Prerequisites:
#   - gh CLI installed and authenticated
#   - You are on the feature branch (feat/<name>)
#   - Stage 5 has been run and committed:
#       stages/05_review/output/pr-description.md   ← PR title + body
#       stages/05_review/output/review-checklist.md ← you've worked through it
#
# What this does:
#   1. Validates gh auth, branch, and required files
#   2. Pushes any unpushed commits on the current branch
#   3. Extracts the PR title from line 1 of pr-description.md
#   4. Uses lines 3+ as the PR body
#   5. Runs gh pr create with title, body, base branch, and reviewers (optional)
#   6. Prints the PR URL
# ─────────────────────────────────────────────────────────────────────────────

set -e

WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$WORKSPACE_ROOT"

# ── Helpers ───────────────────────────────────────────────────────────────────
ok()   { echo "  ✓ $1"; }
warn() { echo "  ⚠  $1"; }
fail() { echo ""; echo "  ✗ $1" >&2; echo ""; exit 1; }

# ── Parse flags ───────────────────────────────────────────────────────────────
DRAFT_FLAG=""
BASE_BRANCH="main"
REVIEWER_FLAG=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --draft)
      DRAFT_FLAG="--draft"
      shift ;;
    --base)
      BASE_BRANCH="$2"
      shift 2 ;;
    --reviewer)
      REVIEWER_FLAG="--reviewer $2"
      shift 2 ;;
    *)
      echo "Unknown flag: $1" >&2
      echo "Usage: ./finish.sh [--draft] [--base <branch>] [--reviewer <handle>]"
      exit 1 ;;
  esac
done

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo "┌─────────────────────────────────────────────────────┐"
echo "│           Feature Workspace — Open PR               │"
echo "└─────────────────────────────────────────────────────┘"
echo ""

# ── 1. Check gh ───────────────────────────────────────────────────────────────
command -v gh &> /dev/null || fail "gh CLI not found. Install: https://cli.github.com"
gh auth status &> /dev/null  || fail "gh not authenticated. Run: gh auth login"
ok "gh CLI authenticated"

# ── 2. Check we're on a feature branch ────────────────────────────────────────
CURRENT_BRANCH=$(git branch --show-current)

if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
  fail "You are on '$CURRENT_BRANCH'. Switch to your feature branch first."
fi

if [[ "$CURRENT_BRANCH" != feat/* ]]; then
  warn "Current branch '$CURRENT_BRANCH' does not follow feat/* convention"
  read -p "  Continue anyway? (y/N): " CONFIRM
  [[ "$CONFIRM" =~ ^[Yy]$ ]] || exit 1
fi

ok "On branch: $CURRENT_BRANCH"

# ── 3. Check pr-description.md exists ────────────────────────────────────────
PR_DESC_FILE="$WORKSPACE_ROOT/stages/05_review/output/pr-description.md"

if [[ ! -f "$PR_DESC_FILE" ]]; then
  fail "pr-description.md not found at:
       $PR_DESC_FILE

       Run Stage 5 with your agent first, then come back."
fi

ok "pr-description.md found"

# ── 4. Check review-checklist.md exists ──────────────────────────────────────
CHECKLIST_FILE="$WORKSPACE_ROOT/stages/05_review/output/review-checklist.md"

if [[ ! -f "$CHECKLIST_FILE" ]]; then
  warn "review-checklist.md not found — skipping checklist check"
else
  # Count unchecked items
  UNCHECKED=$(grep -c '^\- \[ \]' "$CHECKLIST_FILE" 2>/dev/null || echo "0")
  if [[ "$UNCHECKED" -gt 0 ]]; then
    warn "$UNCHECKED unchecked item(s) in review-checklist.md"
    read -p "  Open PR anyway? (y/N): " CONFIRM
    [[ "$CONFIRM" =~ ^[Yy]$ ]] || { echo "  Come back when the checklist is clean."; echo ""; exit 0; }
  else
    ok "Review checklist is clean"
  fi
fi

# ── 5. Push any unpushed commits ──────────────────────────────────────────────
echo ""
echo "  Checking for unpushed commits..."

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null || echo "")

if [[ "$LOCAL_SHA" != "$REMOTE_SHA" ]]; then
  echo "  Pushing $CURRENT_BRANCH to origin..."
  git push -u origin "$CURRENT_BRANCH"
  ok "Branch pushed"
else
  ok "Branch is up to date with remote"
fi

# ── 6. Extract PR title and body from pr-description.md ──────────────────────
# Line 1  = PR title (the "brief message")
# Lines 3+ = PR body (the "detailed description") — skip the blank line 2
PR_TITLE=$(head -n 1 "$PR_DESC_FILE")
PR_BODY=$(tail -n +3 "$PR_DESC_FILE")

if [[ -z "$PR_TITLE" ]]; then
  fail "pr-description.md is empty or the first line is blank.
       The first line must be the PR title."
fi

# Truncate title to 72 chars if too long (GitHub recommends this)
if [[ ${#PR_TITLE} -gt 72 ]]; then
  warn "PR title is ${#PR_TITLE} chars (recommended ≤ 72) — truncating"
  PR_TITLE="${PR_TITLE:0:72}"
fi

echo ""
echo "  PR title:   $PR_TITLE"
echo "  Base:       $BASE_BRANCH"
[[ -n "$DRAFT_FLAG" ]] && echo "  Mode:       draft"
[[ -n "$REVIEWER_FLAG" ]] && echo "  Reviewer:   ${REVIEWER_FLAG#--reviewer }"
echo ""

# ── 7. Write body to a temp file (handles multi-line safely) ──────────────────
BODY_FILE="$(mktemp /tmp/pr-body-XXXXXX.md)"
echo "$PR_BODY" > "$BODY_FILE"
trap "rm -f $BODY_FILE" EXIT

# ── 8. Create the PR via gh ───────────────────────────────────────────────────
echo "  Creating PR..."

# Build the command
GH_CMD=(gh pr create
  --title "$PR_TITLE"
  --body-file "$BODY_FILE"
  --base "$BASE_BRANCH"
  --head "$CURRENT_BRANCH"
)

[[ -n "$DRAFT_FLAG"    ]] && GH_CMD+=($DRAFT_FLAG)
[[ -n "$REVIEWER_FLAG" ]] && GH_CMD+=($REVIEWER_FLAG)

PR_URL=$("${GH_CMD[@]}")

# ── 9. Done ───────────────────────────────────────────────────────────────────
echo ""
echo "┌─────────────────────────────────────────────────────┐"
echo "│  ✓ PR opened                                        │"
echo "│                                                     │"
printf "│  %-51s │\n" "$PR_URL"
echo "│                                                     │"
echo "│  Next:                                              │"
echo "│  - Share the PR URL with your reviewer             │"
echo "│  - Address any review comments                      │"
echo "│  - Merge when approved                              │"
echo "└─────────────────────────────────────────────────────┘"
echo ""

# Open in browser if possible
if command -v open &> /dev/null; then
  open "$PR_URL"
elif command -v xdg-open &> /dev/null; then
  xdg-open "$PR_URL"
fi
