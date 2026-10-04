const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const WORKFLOW_DIR = "feature-workflow";
const GENERATED_PREFIXES = [
  ".astro/",
  "dist/",
  "dev-dist/",
  "test-results/",
  "playwright-report/",
];

const STAGES = [
  {
    id: "01_ideate",
    title: "Ideate",
    purpose: "Frame the problem, users, scope, and success criteria.",
    outputs: ["stages/01_ideate/output/problem-brief.md"],
  },
  {
    id: "02_design",
    title: "Design",
    purpose: "Define user journey, UI states, MVP scope, and acceptance criteria.",
    outputs: ["stages/02_design/output/design-spec.md"],
  },
  {
    id: "03_architect",
    title: "Architect",
    purpose: "Map the design to repo structure, data flow, and test strategy.",
    outputs: ["stages/03_architect/output/arch-spec.md"],
  },
  {
    id: "04_implement",
    title: "Implement",
    purpose: "Sequence code tasks and matching validation tasks.",
    outputs: ["stages/04_implement/output/implementation-plan.md"],
  },
  {
    id: "05_review",
    title: "Review",
    purpose: "Generate the QA checklist and PR description.",
    outputs: [
      "stages/05_review/output/review-checklist.md",
      "stages/05_review/output/pr-description.md",
    ],
  },
];

function fail(message, exitCode = 1) {
  const error = new Error(message);
  error.exitCode = exitCode;
  throw error;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: options.env ?? process.env,
  });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      fail(`Required command not found: ${command}`);
    }
    throw result.error;
  }

  if (!options.allowFailure && result.status !== 0) {
    fail((result.stderr || result.stdout || `${command} ${args.join(" ")} failed`).trim());
  }

  return result;
}

function runGh(args, options = {}) {
  const stubMode = process.env.WORKFLOW_GH_STUB_MODE;
  const stubLog = process.env.WORKFLOW_GH_STUB_LOG;

  if (stubMode) {
    if (args[0] === "auth" && args[1] === "status") {
      if (stubMode === "auth-fail") {
        if (!options.allowFailure) {
          fail("gh auth failed");
        }
        return { status: 1, stdout: "", stderr: "gh auth failed" };
      }
      return { status: 0, stdout: "", stderr: "" };
    }

    if (args[0] === "pr" && args[1] === "create") {
      if (stubLog) {
        fs.writeFileSync(stubLog, args.join(" "));
      }
      return { status: 0, stdout: "https://example.com/pr/1", stderr: "" };
    }

    if (!options.allowFailure) {
      fail(`Unsupported gh invocation in stub mode: ${args.join(" ")}`);
    }
    return { status: 1, stdout: "", stderr: `Unsupported gh invocation in stub mode: ${args.join(" ")}` };
  }

  return run("gh", args, options);
}

function git(repoRoot, args, options = {}) {
  return run("git", args, { ...options, cwd: repoRoot });
}

function getStage(stageId) {
  const stage = STAGES.find((entry) => entry.id === stageId);
  if (!stage) {
    fail(`Unknown stage: ${stageId}`);
  }

  return stage;
}

function getNextStage(stageId) {
  const currentIndex = STAGES.findIndex((entry) => entry.id === stageId);
  if (currentIndex === -1) {
    fail(`Unknown stage: ${stageId}`);
  }

  return STAGES[currentIndex + 1] || null;
}

function normalizeFeatureSlug(input) {
  const slug = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  if (!slug) {
    fail("Feature or fix name cannot be empty after normalization.");
  }

  return slug;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function branchNameFrom(kind, slug) {
  if (!["feature", "fix"].includes(kind)) {
    fail(`Change type must be "feature" or "fix"; received "${kind}".`);
  }

  return `${kind}/${slug}`;
}

function resolveRepoRoot(startDir = process.cwd()) {
  const result = run("git", ["rev-parse", "--show-toplevel"], {
    cwd: startDir,
    allowFailure: true,
  });

  if (result.status !== 0) {
    fail("Run this command inside the git repository.");
  }

  const repoRoot = result.stdout.trim();
  ensureWorkflowPresent(repoRoot);
  return repoRoot;
}

function workflowRoot(repoRoot) {
  return path.join(repoRoot, WORKFLOW_DIR);
}

function workflowPath(repoRoot, ...segments) {
  return path.join(workflowRoot(repoRoot), ...segments);
}

function ensureWorkflowPresent(repoRoot) {
  const requiredFile = workflowPath(repoRoot, "WORKFLOW.md");
  if (!fs.existsSync(requiredFile)) {
    fail(`Could not find ${WORKFLOW_DIR}/WORKFLOW.md at ${repoRoot}.`);
  }
}

function ensureGhReady(repoRoot) {
  runGh(["auth", "status"], { cwd: repoRoot });
}

function getCurrentBranch(repoRoot) {
  return git(repoRoot, ["branch", "--show-current"]).stdout.trim();
}

function branchExists(repoRoot, branchName) {
  const result = git(repoRoot, ["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`], {
    allowFailure: true,
  });
  return result.status === 0;
}

function parseStatusLine(line) {
  const filePart = line.slice(3).trim();
  const normalized = filePart.includes(" -> ")
    ? filePart.split(" -> ").pop()
    : filePart;

  return normalized.replace(/\\/g, "/");
}

function getDirtyPaths(repoRoot) {
  const status = git(repoRoot, ["status", "--porcelain"]).stdout
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  return status.map(parseStatusLine);
}

function isGeneratedPath(filePath) {
  return GENERATED_PREFIXES.some((prefix) => filePath === prefix.slice(0, -1) || filePath.startsWith(prefix));
}

function getBlockingDirtyPaths(repoRoot) {
  return getDirtyPaths(repoRoot).filter((filePath) => !isGeneratedPath(filePath));
}

function ensureSafeWorkingTree(repoRoot) {
  const blocking = getBlockingDirtyPaths(repoRoot);
  if (blocking.length > 0) {
    fail(
      `Working tree has uncommitted non-generated changes:\n- ${blocking.join(
        "\n- ",
      )}\nCommit or stash them before using the workflow helpers.`,
    );
  }
}

function ensureCurrentBranch(repoRoot, expectedBranch) {
  const currentBranch = getCurrentBranch(repoRoot);
  if (currentBranch !== expectedBranch) {
    fail(`Expected to be on "${expectedBranch}", but found "${currentBranch}".`);
  }
}

function defaultState() {
  return {
    featureName: null,
    featureSlug: null,
    changeType: null,
    branch: null,
    activeStage: STAGES[0].id,
  };
}

function parseWorkflowState(content) {
  const match = content.match(/<!-- workflow-state\s*([\s\S]*?)-->/);
  if (!match) {
    fail("feature-workflow/CONTEXT.md is missing the workflow-state block.");
  }

  return JSON.parse(match[1].trim());
}

function readState(repoRoot) {
  const content = fs.readFileSync(workflowPath(repoRoot, "CONTEXT.md"), "utf8");
  return parseWorkflowState(content);
}

function renderContext(state) {
  const activeStage = getStage(state.activeStage);
  const stageRows = STAGES.map((stage) => {
    const label = stage.id === state.activeStage ? `${stage.id} (active)` : stage.id;
    return `| \`${label}\` | ${stage.purpose} | \`${stage.outputs
      .map((outputPath) => path.basename(outputPath))
      .join("`, `")}\` |`;
  }).join("\n");

  const currentChange = state.featureSlug
    ? [
        `- Name: ${state.featureName}`,
        `- Type: ${state.changeType}`,
        `- Branch: \`${state.branch}\``,
      ].join("\n")
    : "Not initialized yet. Run `npm run workflow:init -- feature my-change` or `npm run workflow:init -- fix broken-nav`.";

  const stateBlock = JSON.stringify(state, null, 2);

  return `# Workflow Routing

<!-- workflow-state
${stateBlock}
-->

## Current change

${currentChange}

## Active stage

-> **${activeStage.id}** - ${activeStage.purpose}

## Stage index

| Stage | Purpose | Required output |
| --- | --- | --- |
${stageRows}

## Shared inputs

- \`_config/project.md\`
- \`_config/conventions.md\`
- \`_config/git-conventions.md\`
- \`_config/testing.md\`
- \`shared/glossary.md\`
- \`shared/product-notes.md\`
- \`shared/ui-inventory.md\`

Advance stages with \`npm run workflow:advance -- <stage>\` after the current stage output exists and has been reviewed.
`;
}

function writeState(repoRoot, state) {
  fs.writeFileSync(workflowPath(repoRoot, "CONTEXT.md"), renderContext(state));
}

function ensureDirectoryReset(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  for (const entry of fs.readdirSync(dirPath)) {
    fs.rmSync(path.join(dirPath, entry), { recursive: true, force: true });
  }
  fs.writeFileSync(path.join(dirPath, ".gitkeep"), "");
}

function resetWorkspaceArtifacts(repoRoot) {
  for (const stage of STAGES) {
    ensureDirectoryReset(workflowPath(repoRoot, "stages", stage.id, "output"));
    ensureDirectoryReset(workflowPath(repoRoot, "stages", stage.id, "references"));
  }
}

function seedFeatureRequest(repoRoot, state) {
  const content = `# Feature Request: ${state.featureName}

## Change type

${state.changeType}

## Working title

Short name: ${state.featureSlug}

## Raw request

Describe the change in plain language. Include what should improve, who it helps, and any constraints or references that matter.

## Known constraints

- Branch target: ${state.branch}
- Deadline or milestone:
- Must reuse or avoid:
`;

  fs.writeFileSync(workflowPath(repoRoot, "stages", "01_ideate", "input", "feature-request.md"), content);
}

function collectStageOutputStatus(repoRoot) {
  return STAGES.map((stage) => ({
    ...stage,
    outputs: stage.outputs.map((relativePath) => {
      const absolutePath = workflowPath(repoRoot, relativePath);
      const exists = fs.existsSync(absolutePath);
      const hasContent = exists && fs.readFileSync(absolutePath, "utf8").trim().length > 0;

      return {
        relativePath,
        exists,
        hasContent,
      };
    }),
  }));
}

function ensureStageOutputsExist(repoRoot, stageId) {
  const stage = getStage(stageId);
  const missing = stage.outputs.filter((relativePath) => {
    const absolutePath = workflowPath(repoRoot, relativePath);
    return !fs.existsSync(absolutePath) || fs.readFileSync(absolutePath, "utf8").trim().length === 0;
  });

  if (missing.length > 0) {
    fail(
      `Cannot advance from ${stageId}. Missing required output files:\n- ${missing.join(
        "\n- ",
      )}`,
    );
  }
}

function ensureInitialized(state) {
  if (!state.featureSlug || !state.branch || !state.changeType) {
    fail("The workflow is not initialized yet. Run `npm run workflow:init -- feature my-change` first.");
  }
}

function ensureOnContextBranch(repoRoot, state) {
  ensureInitialized(state);
  const currentBranch = getCurrentBranch(repoRoot);
  if (currentBranch !== state.branch) {
    fail(`Current branch is "${currentBranch}", but workflow context expects "${state.branch}".`);
  }
}

function ensureOriginRemote(repoRoot) {
  const result = git(repoRoot, ["remote", "get-url", "origin"], { allowFailure: true });
  if (result.status !== 0) {
    fail("Remote `origin` is required for workflow:finish.");
  }
}

function parsePullRequestContent(repoRoot) {
  const prPath = workflowPath(repoRoot, "stages", "05_review", "output", "pr-description.md");
  const reviewPath = workflowPath(repoRoot, "stages", "05_review", "output", "review-checklist.md");

  if (!fs.existsSync(prPath) || fs.readFileSync(prPath, "utf8").trim().length === 0) {
    fail("Stage 5 output `pr-description.md` is required before opening a PR.");
  }

  if (!fs.existsSync(reviewPath) || fs.readFileSync(reviewPath, "utf8").trim().length === 0) {
    fail("Stage 5 output `review-checklist.md` is required before opening a PR.");
  }

  const checklist = fs.readFileSync(reviewPath, "utf8");
  const unchecked = checklist.match(/^- \[ \]/gm) || [];
  if (unchecked.length > 0) {
    fail(`Review checklist still has ${unchecked.length} unchecked item(s). Complete the checklist before opening the PR.`);
  }

  const content = fs.readFileSync(prPath, "utf8").replace(/\r\n/g, "\n");
  const lines = content.split("\n");
  const title = lines[0].trim();
  if (!title) {
    fail("The first line of pr-description.md must be the PR title.");
  }

  const body = lines.slice(1).join("\n").trimStart();
  return { title, body };
}

function createTempFile(prefix, body) {
  const filePath = path.join(os.tmpdir(), `${prefix}-${Date.now()}.md`);
  fs.writeFileSync(filePath, body);
  return filePath;
}

module.exports = {
  STAGES,
  branchExists,
  branchNameFrom,
  collectStageOutputStatus,
  createTempFile,
  defaultState,
  ensureCurrentBranch,
  ensureGhReady,
  ensureInitialized,
  ensureOnContextBranch,
  ensureOriginRemote,
  ensureSafeWorkingTree,
  ensureStageOutputsExist,
  fail,
  getCurrentBranch,
  getNextStage,
  getStage,
  normalizeFeatureSlug,
  parsePullRequestContent,
  readState,
  renderContext,
  resetWorkspaceArtifacts,
  resolveRepoRoot,
  runGh,
  seedFeatureRequest,
  titleFromSlug,
  workflowPath,
  writeState,
};
