const {
  ensureOnContextBranch,
  ensureStageOutputsExist,
  fail,
  getNextStage,
  readState,
  resolveRepoRoot,
  writeState,
} = require("./workflow-lib.cjs");

function main() {
  const [targetStage] = process.argv.slice(2);
  if (!targetStage) {
    fail("Usage: npm run workflow:advance -- <stage>");
  }

  const repoRoot = resolveRepoRoot();
  const state = readState(repoRoot);
  ensureOnContextBranch(repoRoot, state);

  const nextStage = getNextStage(state.activeStage);
  if (!nextStage) {
    fail("The workflow is already on the final stage.");
  }

  if (targetStage !== nextStage.id) {
    fail(`Can only advance from ${state.activeStage} to ${nextStage.id}.`);
  }

  ensureStageOutputsExist(repoRoot, state.activeStage);
  writeState(repoRoot, { ...state, activeStage: targetStage });

  console.log(`Advanced workflow from ${state.activeStage} to ${targetStage}.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(error.exitCode || 1);
}
