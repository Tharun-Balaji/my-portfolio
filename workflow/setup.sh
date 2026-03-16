#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# setup.sh — initialize a feature workspace and create the remote branch via gh
#
# Usage:
#   ./setup.sh "user-auth"
#   ./setup.sh "offline-sync"
#   ./setup.sh          ← prompts for feature name
#
# Prerequisites:
#   - gh CLI installed and authenticated (gh auth login)
#   - Remote origin already set (git remote add origin <url>)
#     OR the repo was cloned from GitHub
#
# What this does:
#   1. Checks gh is installed and authenticated
#   2. Initializes a git repo if needed
#   3. Creates an initial commit with the workspace skeleton on main
#   4. Pushes main to remote (first-time only)
#   5. Creates the feature branch locally and pushes it via gh
#   6. Stamps CONTEXT.md and feature-request.md with the feature name
# ─────────────────────────────────────────────────────────────────────────────

set -e

WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$WORKSPACE_ROOT"

# ── Helpers ───────────────────────────────────────────────────────────────────
print_box() {
  echo ""
  echo "┌─────────────────────────────────────────────────────┐"
  printf "│  %-51s │\n" "$1"
  echo "└─────────────────────────────────────────────────────┘"
  echo ""
}

step() { echo "  $1"; }
ok()   { echo "  ✓ $1"; }
warn() { echo "  ⚠  $1"; }
fail() { echo "  ✗ $1" >&2; exit 1; }

# ── 1. Check gh is installed ──────────────────────────────────────────────────
echo ""
echo "┌─────────────────────────────────────────────────────┐"
echo "│           Feature Workspace Setup (gh)              │"
echo "└─────────────────────────────────────────────────────┘"
echo ""

if ! command -v gh &> /dev/null; then
  fail "gh CLI not found. Install it: https://cli.github.com"
fi

# ── 2. Check gh auth ──────────────────────────────────────────────────────────
if ! gh auth status &> /dev/null; then
  fail "gh is not authenticated. Run: gh auth login"
fi
ok "gh CLI authenticated"

# ── 3. Feature name ───────────────────────────────────────────────────────────
FEATURE_NAME="${1:-}"

if [[ -z "$FEATURE_NAME" ]]; then
  read -p "  Feature name (e.g. user-auth, offline-sync): " FEATURE_NAME
fi

# Normalize: lowercase, spaces → hyphens, strip special chars
FEATURE_NAME=$(echo "$FEATURE_NAME" \
  | tr '[:upper:]' '[:lower:]' \
  | tr ' ' '-' \
  | sed 's/[^a-z0-9-]//g')

[[ -z "$FEATURE_NAME" ]] && fail "Feature name cannot be empty."

BRANCH="feat/$FEATURE_NAME"

step "Feature:  $FEATURE_NAME"
step "Branch:   $BRANCH"
echo ""

# ── 4. Git init ───────────────────────────────────────────────────────────────
if git rev-parse --git-dir > /dev/null 2>&1; then
  ok "Git repo exists"
else
  git init -b main
  ok "Git repo initialized (main)"
fi

# ── 5. Git identity fallback ──────────────────────────────────────────────────
if ! git config user.email > /dev/null 2>&1; then
  # Pull identity from gh if available
  GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "")
  GH_EMAIL=$(gh api user/emails --jq '.[0].email' 2>/dev/null || echo "workspace@local")
  git config user.name  "${GH_USER:-workspace}"
  git config user.email "$GH_EMAIL"
  ok "Git identity set from gh (${GH_EMAIL})"
fi

# ── 6. .gitignore ─────────────────────────────────────────────────────────────
cat > .gitignore << 'GITIGNORE'
.DS_Store
Thumbs.db
*.swp
*.swo
node_modules/
.env
.env.local
GITIGNORE
ok ".gitignore written"

# ── 7. Stamp CONTEXT.md with feature name ─────────────────────────────────────
CONTEXT_FILE="$WORKSPACE_ROOT/CONTEXT.md"

if ! grep -q "## Feature" "$CONTEXT_FILE"; then
  TEMP="$(mktemp)"
  {
    echo "# Workspace Routing"
    echo ""
    echo "## Feature"
    echo "**$FEATURE_NAME** — branch: \`$BRANCH\`"
    echo ""
    tail -n +2 "$CONTEXT_FILE"
  } > "$TEMP"
  mv "$TEMP" "$CONTEXT_FILE"
  ok "CONTEXT.md stamped with feature name"
fi

# ── 8. Stamp feature-request.md ───────────────────────────────────────────────
FEATURE_REQUEST="$WORKSPACE_ROOT/stages/01_ideate/input/feature-request.md"
if grep -q "# Feature Request$" "$FEATURE_REQUEST"; then
  sed -i.bak "s/# Feature Request/# Feature Request: $FEATURE_NAME/" "$FEATURE_REQUEST"
  rm -f "${FEATURE_REQUEST}.bak"
  ok "feature-request.md stamped"
fi

# ── 9. Initial commit on main (first time only) ───────────────────────────────
if ! git log --oneline -1 > /dev/null 2>&1; then
  git add -A
  git commit \
    -m "chore(workspace): initialize feature workspace skeleton" \
    -m "What: Empty workspace scaffold committed as baseline for feature '$FEATURE_NAME'.
Includes all stage CONTEXT.md files, _config references, and shared assets.

Next: Fill in _config/project.md with project stack, then describe the
feature in stages/01_ideate/input/feature-request.md."
  ok "Initial commit created on main"
else
  # Uncommitted workspace changes (e.g. added to existing repo)
  git add -A
  if ! git diff --cached --quiet; then
    git commit \
      -m "chore(workspace): add feature workspace for $FEATURE_NAME" \
      -m "What: Feature workspace scaffold added to existing repo.

Next: Fill in _config/project.md, then describe the feature
in stages/01_ideate/input/feature-request.md."
    ok "Workspace files committed"
  else
    ok "No new files to commit"
  fi
fi

# ── 10. Push main to remote (first time only) ─────────────────────────────────
# Only push main if remote is configured and main hasn't been pushed yet
if git remote get-url origin > /dev/null 2>&1; then
  if ! git ls-remote --exit-code origin main > /dev/null 2>&1; then
    git push -u origin main
    ok "main pushed to remote"
  fi
fi

# ── 11. Create feature branch locally ─────────────────────────────────────────
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  warn "Branch $BRANCH already exists locally — checking it out"
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH"
  ok "Branch $BRANCH created locally"
fi

# ── 12. Push feature branch to remote via gh ──────────────────────────────────
if git remote get-url origin > /dev/null 2>&1; then
  if git push -u origin "$BRANCH" 2>/dev/null; then
    ok "Branch $BRANCH pushed to remote"

    # Print the branch URL from gh
    REPO=$(gh repo view --json nameWithOwner --jq '.nameWithOwner' 2>/dev/null || echo "")
    if [[ -n "$REPO" ]]; then
      step "Remote: https://github.com/$REPO/tree/$BRANCH"
    fi
  else
    warn "Could not push branch to remote — continuing locally"
    warn "Push manually with: git push -u origin $BRANCH"
  fi
else
  warn "No remote configured — branch is local only"
  warn "Add remote with: git remote add origin <url>"
  warn "Then push with:  git push -u origin $BRANCH"
fi

# ── 13. Done ──────────────────────────────────────────────────────────────────
echo ""
echo "┌─────────────────────────────────────────────────────┐"
echo "│  ✓ Ready                                            │"
echo "│                                                     │"
printf "│  Feature:  %-42s│\n" "$FEATURE_NAME"
printf "│  Branch:   %-42s│\n" "$BRANCH"
echo "│                                                     │"
echo "│  Next steps:                                        │"
echo "│  1. Fill in _config/project.md (once per project)  │"
echo "│  2. Edit stages/01_ideate/input/feature-request.md │"
echo "│  3. Run Stage 1 with your agent                    │"
echo "│  4. When done: ./finish.sh                         │"
echo "└─────────────────────────────────────────────────────┘"
echo ""
