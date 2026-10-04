const fs = require("node:fs");
const { spawnSync } = require("node:child_process");
const {
  createTempFile,
  ensureGhReady,
  ensureOnContextBranch,
  ensureOriginRemote,
  ensureSafeWorkingTree,
  fail,
  getCurrentBranch,
  parsePullRequestContent,
  readState,
  resolveRepoRoot,
  runGh,
} = require("./workflow-lib.cjs");

function parseArgs(rawArgs) {
  let draft = false;
  let base = "dev";

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--draft") {
      draft = true;
      continue;
    }

    if (arg === "--base") {
      base = rawArgs[index + 1];
      if (!base) {
        fail("Usage: npm run workflow:finish -- [--draft] [--base <branch>]");
      }
      index += 1;
      continue;
    }

    fail(`Unknown argument: ${arg}`);
  }

  return { draft, base };
}

function runChecked(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
  });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      fail(`Required command not found: ${command}`);
    }
    throw result.error;
  }

  if (result.status !== 0) {
    fail((result.stderr || result.stdout || `${command} ${args.join(" ")} failed`).trim());
  }

  return result.stdout.trim();
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const repoRoot = resolveRepoRoot();
  const state = readState(repoRoot);

  ensureGhReady(repoRoot);
  ensureOnContextBranch(repoRoot, state);
  ensureSafeWorkingTree(repoRoot);
  ensureOriginRemote(repoRoot);

  const currentBranch = getCurrentBranch(repoRoot);
  if (!/^(feature|fix)\/[a-z0-9-]+$/.test(currentBranch)) {
    fail(`Current branch must match feature/<name> or fix/<name>, received "${currentBranch}".`);
  }

  const { title, body } = parsePullRequestContent(repoRoot);

  runChecked("git", ["push", "-u", "origin", currentBranch], repoRoot);

  const bodyFile = createTempFile("workflow-pr-body", body);
  try {
    const args = [
      "pr",
      "create",
      "--title",
      title,
      "--body-file",
      bodyFile,
      "--base",
      options.base,
      "--head",
      currentBranch,
    ];

    if (options.draft) {
      args.push("--draft");
    }

    const prUrl = runGh(args, { cwd: repoRoot }).stdout.trim();
    console.log(`Pull request created: ${prUrl}`);
  } finally {
    if (fs.existsSync(bodyFile)) {
      fs.rmSync(bodyFile, { force: true });
    }
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(error.exitCode || 1);
}
