const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..", "..");
const workflowDir = path.join(repoRoot, "feature-workflow");
const initScript = path.join(workflowDir, "scripts", "init.cjs");
const advanceScript = path.join(workflowDir, "scripts", "advance.cjs");
const finishScript = path.join(workflowDir, "scripts", "finish.cjs");
const workflowLib = require("./workflow-lib.cjs");

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: options.env ?? process.env,
  });
}

function git(cwd, args) {
  const result = run("git", args, { cwd });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function createTempRepo({ withRemote = false } = {}) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-test-"));
  fs.cpSync(workflowDir, path.join(tempRoot, "feature-workflow"), { recursive: true });

  git(tempRoot, ["init", "-b", "dev"]);
  git(tempRoot, ["config", "user.name", "Workflow Test"]);
  git(tempRoot, ["config", "user.email", "workflow-test@example.com"]);
  git(tempRoot, ["add", "feature-workflow"]);
  git(tempRoot, ["commit", "-m", "chore: add workflow"]);

  if (withRemote) {
    const bareRemote = path.join(os.tmpdir(), `workflow-remote-${Date.now()}.git`);
    git(repoRoot, ["init", "--bare", bareRemote]);
    git(tempRoot, ["remote", "add", "origin", bareRemote]);
    git(tempRoot, ["push", "-u", "origin", "dev"]);
  }

  return tempRoot;
}

function runNodeScript(scriptPath, args, cwd, envOverrides = {}) {
  return run(process.execPath, [scriptPath, ...args], {
    cwd,
    env: {
      ...process.env,
      ...envOverrides,
    },
  });
}

function createGhStubEnv(mode) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-gh-"));
  const logPath = path.join(tempRoot, "gh.log");
  return {
    env: {
      WORKFLOW_GH_STUB_MODE: mode,
      WORKFLOW_GH_STUB_LOG: logPath,
    },
    logPath,
  };
}

test("workflow:init creates a feature branch and stamps context", () => {
  const tempRepo = createTempRepo();
  const { env } = createGhStubEnv("ok");

  const result = runNodeScript(initScript, ["feature", "AI Case Studies"], tempRepo, env);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(git(tempRepo, ["branch", "--show-current"]), "feature/ai-case-studies");

  const state = workflowLib.readState(tempRepo);
  assert.equal(state.featureSlug, "ai-case-studies");
  assert.equal(state.branch, "feature/ai-case-studies");
  assert.equal(state.activeStage, "01_ideate");

  const request = fs.readFileSync(
    path.join(tempRepo, "feature-workflow", "stages", "01_ideate", "input", "feature-request.md"),
    "utf8",
  );
  assert.match(request, /Feature Request: Ai Case Studies/);
});

test("workflow:init fails cleanly when gh auth is unavailable", () => {
  const tempRepo = createTempRepo();
  const { env } = createGhStubEnv("auth-fail");

  const result = runNodeScript(initScript, ["feature", "broken nav"], tempRepo, env);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr || result.stdout, /gh auth failed/i);
});

test("workflow:advance only allows the next stage and preserves current output", () => {
  const tempRepo = createTempRepo();
  const { env } = createGhStubEnv("ok");

  const initResult = runNodeScript(initScript, ["feature", "timeline polish"], tempRepo, env);
  assert.equal(initResult.status, 0, initResult.stderr || initResult.stdout);

  const problemBriefPath = path.join(
    tempRepo,
    "feature-workflow",
    "stages",
    "01_ideate",
    "output",
    "problem-brief.md",
  );
  fs.writeFileSync(problemBriefPath, "# Problem Brief\n\nReady to move forward.\n");

  const invalidAdvance = runNodeScript(advanceScript, ["03_architect"], tempRepo, env);
  assert.notEqual(invalidAdvance.status, 0);
  assert.match(invalidAdvance.stderr || invalidAdvance.stdout, /Can only advance from 01_ideate to 02_design/);

  const validAdvance = runNodeScript(advanceScript, ["02_design"], tempRepo, env);
  assert.equal(validAdvance.status, 0, validAdvance.stderr || validAdvance.stdout);
  assert.equal(workflowLib.readState(tempRepo).activeStage, "02_design");
  assert.equal(fs.readFileSync(problemBriefPath, "utf8"), "# Problem Brief\n\nReady to move forward.\n");
});

test("workflow:finish fails when Stage 5 outputs are missing", () => {
  const tempRepo = createTempRepo({ withRemote: true });
  const { env } = createGhStubEnv("ok");

  const initResult = runNodeScript(initScript, ["feature", "hero refresh"], tempRepo, env);
  assert.equal(initResult.status, 0, initResult.stderr || initResult.stdout);

  git(tempRepo, ["add", "feature-workflow"]);
  git(tempRepo, ["commit", "-m", "docs: initialize workflow branch"]);

  const finishResult = runNodeScript(finishScript, [], tempRepo, env);
  assert.notEqual(finishResult.status, 0);
  assert.match(finishResult.stderr || finishResult.stdout, /pr-description\.md/i);
});

test("workflow:finish creates a PR against dev by default", () => {
  const tempRepo = createTempRepo({ withRemote: true });
  const { env, logPath } = createGhStubEnv("ok");

  const initResult = runNodeScript(initScript, ["feature", "skills spotlight"], tempRepo, env);
  assert.equal(initResult.status, 0, initResult.stderr || initResult.stdout);

  const reviewDir = path.join(tempRepo, "feature-workflow", "stages", "05_review", "output");
  fs.writeFileSync(
    path.join(reviewDir, "review-checklist.md"),
    "# Review Checklist\n\n## Acceptance criteria\n- [x] Checklist complete\n",
  );
  fs.writeFileSync(
    path.join(reviewDir, "pr-description.md"),
    "Skills spotlight: improve scan speed\n\n## What\nAdd a clearer skills summary.\n",
  );

  git(tempRepo, ["add", "feature-workflow"]);
  git(tempRepo, ["commit", "-m", "docs: prepare workflow outputs"]);

  const finishResult = runNodeScript(finishScript, [], tempRepo, env);
  assert.equal(finishResult.status, 0, finishResult.stderr || finishResult.stdout);
  assert.match(finishResult.stdout, /https:\/\/example.com\/pr\/1/);

  const loggedCommand = fs.readFileSync(logPath, "utf8");
  assert.match(loggedCommand, /--base dev/);
  assert.match(loggedCommand, /--head feature\/skills-spotlight/);
});
