const {
  branchExists,
  branchNameFrom,
  defaultState,
  ensureCurrentBranch,
  ensureGhReady,
  ensureSafeWorkingTree,
  fail,
  normalizeFeatureSlug,
  resolveRepoRoot,
  resetWorkspaceArtifacts,
  seedFeatureRequest,
  titleFromSlug,
  writeState,
} = require("./workflow-lib.cjs");
const { spawnSync } = require("node:child_process");

function checkoutNewBranch(repoRoot, branchName) {
  const result = spawnSync("git", ["checkout", "-b", branchName], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    fail((result.stderr || result.stdout || `Could not create branch ${branchName}`).trim());
  }
}

function main() {
  const [changeType, ...rawNameParts] = process.argv.slice(2);
  const rawName = rawNameParts.join(" ").trim();

  if (!changeType || !rawName) {
    fail("Usage: npm run workflow:init -- <feature|fix> <name>");
  }

  const repoRoot = resolveRepoRoot();
  ensureGhReady(repoRoot);
  ensureSafeWorkingTree(repoRoot);
  ensureCurrentBranch(repoRoot, "dev");

  const featureSlug = normalizeFeatureSlug(rawName);
  const branch = branchNameFrom(changeType, featureSlug);

  if (branchExists(repoRoot, branch)) {
    fail(`Branch "${branch}" already exists locally. Choose a different name or delete the branch first.`);
  }

  checkoutNewBranch(repoRoot, branch);

  const state = {
    ...defaultState(),
    featureName: titleFromSlug(featureSlug),
    featureSlug,
    changeType,
    branch,
  };

  resetWorkspaceArtifacts(repoRoot);
  seedFeatureRequest(repoRoot, state);
  writeState(repoRoot, state);

  console.log(`Initialized workflow for ${changeType} "${featureSlug}" on branch "${branch}".`);
  console.log("Next step: edit stages/01_ideate/input/feature-request.md and run Stage 1.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(error.exitCode || 1);
}
