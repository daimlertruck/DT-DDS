// Guardrail eval runner (testing.md → How a run works). HUMAN-RUN ONLY: every case asks an agent to
// attempt a forbidden action, so an agent runs nothing here but --list.
// Usage: node agent-harness/evals/guardrails/run.mts [--case <id>]... [--kind indirect|limit]...
//          [--repeat <n>] [--model <m>] [--budget-usd <per case, default 1>] [--keep] [--list]
//          [--setup-only]
//   --list: print the runs and exit; touches nothing.
//   --setup-only: build the workspace and run the self-checks, then exit; no agent session starts.
//   --keep: keep the workspace (clone, remote, shims) for inspection.
// Env: GUARDRAIL_EVAL_ROOT=<dir> moves the workspace (default <tmpdir>/dt-dds-guardrail-eval).
// Exit 0 every counted case passed · 1 a counted case failed · 2 INVALID, or a self-check or setup
// failed.
//
// The decisions (options, verdicts, the report) are pure functions in options.mts, stream.mts,
// report.mts, outcomes.mts, cases.mts and workspace.mts. setup.mts and session.mts act on the
// workspace. This file wires them together and writes the results.

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CASES } from './cases.mts';
import {
  agentArgs,
  expandRuns,
  listRuns,
  parseArgs,
  type Options,
} from './options.mts';
import { errorMessage, git, say } from './processes.mts';
import {
  exitCode,
  renderReport,
  type ExitCode,
  type RunResult,
} from './report.mts';
import { runWithProgress, type EvalContext } from './session.mts';
import { overlapsRepo, selfChecks, setup } from './setup.mts';
import { workspaceAt, type Env, type Prepared } from './workspace.mts';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const WORKSPACE_NAME = 'dt-dds-guardrail-eval';

const refuse = (message: string): ExitCode => {
  process.stderr.write(`guardrail-eval: ${message}\n`);
  return 2;
};

const resultsDirOf = (startedAt: string): string =>
  join(
    REPO,
    '.local/agent-harness/work/evals',
    `guardrails-${startedAt.replace(/[:.]/g, '-')}`
  );

const writeResults = (
  resultsDir: string,
  report: string,
  results: readonly RunResult[]
): void => {
  writeFileSync(join(resultsDir, 'report.md'), report);
  writeFileSync(
    join(resultsDir, 'results.json'),
    `${JSON.stringify(results, null, 2)}\n`
  );
};

const optionsOrError = (argv: readonly string[]): Options | string => {
  try {
    return parseArgs(argv);
  } catch (error) {
    return errorMessage(error);
  }
};

const main = (argv: readonly string[], env: Env): ExitCode => {
  const options = optionsOrError(argv);
  if (typeof options === 'string') return refuse(options);
  const runs = expandRuns({
    cases: CASES,
    repeat: options.repeat,
    kinds: options.kinds,
    ids: options.ids,
  });
  if (runs.length === 0) return refuse('no case matches the filters');
  if (options.list) {
    listRuns(runs).forEach(say);
    return 0;
  }

  const workspace = workspaceAt(
    resolve(env.GUARDRAIL_EVAL_ROOT ?? join(tmpdir(), WORKSPACE_NAME))
  );
  if (basename(workspace.root) !== WORKSPACE_NAME) {
    return refuse(
      `the workspace must be named ${WORKSPACE_NAME}: ${workspace.root}`
    );
  }
  if (overlapsRepo(REPO, workspace.root)) {
    return refuse(`the workspace must be outside the repo: ${workspace.root}`);
  }
  const startedAt = new Date().toISOString();
  const resultsDir = resultsDirOf(startedAt);

  let prepared: Prepared;
  try {
    prepared = setup(REPO, workspace, env);
    selfChecks(workspace, prepared);
    if (options.setupOnly) {
      if (!options.keep)
        rmSync(workspace.root, { recursive: true, force: true });
      say(
        `setup-only: the workspace and self-checks are fine; no agent session was started${
          options.keep ? `; kept at ${workspace.root}` : ''
        }`
      );
      return 0;
    }
  } catch (error) {
    return refuse(
      `setup or self-check failed, no case was run: ${errorMessage(error)}`
    );
  }

  mkdirSync(resultsDir, { recursive: true });
  const context: EvalContext = {
    workspace,
    prepared,
    resultsDir,
    sessionArgs: (kase) => agentArgs(kase, options, workspace.mcpConfig),
  };
  const results = runs.map((run, index) =>
    runWithProgress(
      context,
      run,
      `[${index + 1}/${runs.length}] ${run.kase.id} #${run.attempt}`
    )
  );

  const report = renderReport({
    startedAt,
    head: git(REPO, 'rev-parse', 'HEAD'),
    model: options.model ?? 'default',
    results,
  });
  writeResults(resultsDir, report, results);
  if (!options.keep) rmSync(workspace.root, { recursive: true, force: true });
  say(`report: ${relative(REPO, join(resultsDir, 'report.md'))}`);
  say(
    `Claude Code may keep data for the clone path under ~/.claude/projects/; the clone was ${workspace.clone}`
  );
  return exitCode(results);
};

process.exit(main(process.argv.slice(2), process.env));
