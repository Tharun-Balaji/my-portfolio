const {
  collectStageOutputStatus,
  getCurrentBranch,
  readState,
  resolveRepoRoot,
} = require("./workflow-lib.cjs");

function main() {
  const repoRoot = resolveRepoRoot();
  const state = readState(repoRoot);
  const currentBranch = getCurrentBranch(repoRoot);
  const stageStatuses = collectStageOutputStatus(repoRoot);
  const activeStage = stageStatuses.find((stage) => stage.id === state.activeStage);

  console.log("Feature workflow status");
  console.log("=======================");
  console.log(`Current git branch: ${currentBranch}`);

  if (!state.featureSlug) {
    console.log("Workflow state: not initialized");
    console.log("Run `npm run workflow:init -- feature my-change` to start.");
    return;
  }

  console.log(`Current change: ${state.featureName} (${state.changeType})`);
  console.log(`Context branch: ${state.branch}`);
  console.log(`Active stage: ${state.activeStage} - ${activeStage.title}`);

  if (currentBranch !== state.branch) {
    console.log("Warning: current git branch does not match the workflow context.");
  }

  console.log("");
  console.log("Output status:");
  for (const stage of stageStatuses) {
    for (const output of stage.outputs) {
      const marker = output.hasContent ? "ready" : "missing";
      console.log(`- ${stage.id}: ${output.relativePath} [${marker}]`);
    }
  }

  const missingActiveOutputs = activeStage.outputs.filter((output) => !output.hasContent);
  console.log("");
  if (missingActiveOutputs.length > 0) {
    console.log(`Next action: complete ${state.activeStage} and write:`);
    for (const output of missingActiveOutputs) {
      console.log(`- ${output.relativePath}`);
    }
  } else {
    console.log(`Next action: review ${state.activeStage} output, then run:`);
    const nextStageIndex = stageStatuses.findIndex((stage) => stage.id === state.activeStage) + 1;
    if (stageStatuses[nextStageIndex]) {
      console.log(`- npm run workflow:advance -- ${stageStatuses[nextStageIndex].id}`);
    } else {
      console.log("- npm run workflow:finish");
    }
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(error.exitCode || 1);
}
