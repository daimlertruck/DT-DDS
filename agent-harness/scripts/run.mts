// The pipeline runner. Classifies the lane (lane.mts), then walks the lane's steps from the
// harness-neutral stage table (agent-harness/config/stages.json): each step is one session started through
// the harness adapter and recorded by run-stage.mts (run log Dispatches row, usage/ result), and each
// gate shows the stage's gate-summary.md (≤ 10 lines; never the full artifact) and waits for the human.
// Usage: node agent-harness/scripts/run.mts <N> [--dry] [--fresh] [--no-wait | --decide <reply>] [--lane 0|1|2|escalate]
//          [--issue-file <path>] [--harness claude] [--budget-usd <usd>] [--tool-calls <n>] [--record-out <path>]
//          [--root <repo>]
//   --dry         print lane, reasons, steps and caps; write nothing, call no model and no GitHub
//   --fresh       move .local/agent-harness/work/<N> aside (to <N>.<UTC>) and start a new run with a new run id
//   --lane        override the classifier, without its model call (recorded in lane.json)
//   --issue-file  a synthetic issue (fixtures): copied to .local/agent-harness/work/<N>/issue.json; skips the
//                 GitHub preflight
//   --budget-usd  hard token-dollar cap for the run. Every session gets --max-budget-usd = what is
//                 left of min(this, the lane cap), floored to the cent; enforced after the fact, so a
//                 session may end up to one request over
//   --tool-calls  raise the tool-call cap of every later session of this run to at least n (recorded in
//                 intake-decisions.md); each step's own cap is maxToolCalls in the stage table
//   --record-out  write a JSON summary of the run there when it ends or stops
//   --close       close-out after the PR merged: record-run.mts <N> --apply, then prune-work.mts <N> --apply,
//                 which refuses while the PR is open or the record is missing. Only for a handed-off
//                 run; nothing else runs. The human's call (ds-run-pipeline → Retention)
//   --no-wait     never read stdin: run to the next gate, print it and exit with it pending (no gate row
//                 until it is decided). How a session drives a run (ds-run-pipeline → Start a run).
//   --decide      the human's reply to the pending gate, passed on verbatim; then as --no-wait. Refused
//                 (exit 2, nothing recorded, the gate stays pending) when no gate is pending or the reply
//                 is not an acceptable decision. Not with --dry or --fresh.
// Order: active-run check → preflight → issue → lane (no model call with --lane) → Base line → steps.
// Gate replies: approve · revise: <instruction> (re-run this step) · loop: <instruction> (G4–G7: back
// to implement) · lane:<0|1|2|escalate> · stop. Only a `PASS` status can be approved. A Lane 0 or G1
// gate that names Ask-first paths needs `approve; consent: <path> (<name>, maintainer)` per path. Run
// it in a terminal: gates are interactive. A stop (or Ctrl-C) leaves the gate pending: a resume from
// .local/agent-harness/work/<N>/run-state.json skips approved steps and shows a pending gate again. A finished run
// is not rerun: start a new one with --fresh.
// While a step runs, a heartbeat line every minute shows its time, tool calls and spend so far (read from
// the session's transcript). Ctrl-C or SIGTERM during a step lets the session print its result first:
// its completed requests are counted and its id and transcript recorded.
// Exit: 0 done, stopped or pending at a gate · 1 a check or a stage failed (red flag, blocker, preflight,
// unknown spend) · 2 usage, or a refused --decide reply · 130 interrupted (SIGINT/SIGTERM)
// The logic is in pure modules under runner/: args (command line), gate-replies (what a reply
// decides), checks (readiness, budget, caps, red flags), state (run-state.json and its transitions),
// stage-outcome (a session's outcome) and texts (everything printed or written as text). The shell is
// runner/ too: start-run, walk (the steps), session, gate, decision, signals, run-record and their
// I/O (io, child-scripts, preflight, sandboxes); context holds the run's values. This file wires them.

import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { adapterFor } from './runner/adapter.mts';
import { parseArgs, type RunOptions } from './runner/args.mts';
import {
  createRunStore,
  pathsOf,
  type RunContext,
  type RunStore,
} from './runner/context.mts';
import { Stop } from './runner/errors.mts';
import { lineReader, type GateInput } from './runner/gate-input.mts';
import {
  appendDecision,
  harnessOf,
  messageOf,
  say,
  untrackedOf,
} from './runner/io.mts';
import { dryRun, planOf } from './runner/plan.mts';
import { closeOut } from './runner/run-record.mts';
import { sandboxesDirOf } from './runner/sandboxes.mts';
import { createRunSignals } from './runner/signals.mts';
import { loadTable, stepsOf } from './runner/stage-table.mts';
import { startRun } from './runner/start-run.mts';
import { interruptedNoticeOf } from './runner/texts.mts';
import { handOff, walkSteps } from './runner/walk.mts';

// Before the first step: the plan, a notice of an earlier interrupt, the untracked files the run
// started with, a raised tool-call cap. Returns an exit code when nothing runs (Escalate).
const introduce = (
  { options, adapter, table, paths }: RunContext,
  store: RunStore
): number | null => {
  const { root, id } = options;
  const { state, record, steps } = store.current();
  say(`run.mts ${id} (run ${state.runId})`);
  // A --decide run answers a gate whose run the human has seen: the plan is not repeated.
  if (options.decide === null) {
    planOf(id, record, steps, adapter, table).forEach((line) => say(line));
  }
  if (state.interrupted) {
    say(interruptedNoticeOf(state.interrupted));
    store.updateState((current) => ({ ...current, interrupted: null }));
  }
  if (!state.untrackedAtStart) {
    store.updateState((current) => ({
      ...current,
      untrackedAtStart: untrackedOf(root),
    }));
  }
  // The human raises the per-step tool-call cap here, never in lane.json; it holds for the rest of the run.
  if (options.toolCalls !== null) {
    const toolCallCap = options.toolCalls;
    store.updateState((current) => ({ ...current, toolCallCap }));
    appendDecision(
      paths.workDir,
      `tool-call cap per step raised to ${toolCallCap} (--tool-calls, human)`
    );
    say(
      `tool-call cap per step raised to ${toolCallCap} for the rest of run ${state.runId} (each step: at least its own cap)`
    );
  }
  store.save();
  if (steps.length) return null;
  store.updateState((current) => ({ ...current, outcome: 'escalated' }));
  store.save();
  store.finish('escalated');
  say('Escalate: nothing runs. Hand the issue and lane.json to a maintainer.');
  return 0;
};

export const run = async (
  options: RunOptions,
  ask: GateInput | null
): Promise<number> => {
  const { root, id } = options;
  const adapter = await adapterFor(options.harness);
  const table = loadTable(root);
  const paths = pathsOf(root, id);

  if (options.close) return closeOut(root, id, paths.statePath);
  if (options.dry) return dryRun(options, adapter, table, paths.agentsPath);

  const { state, record } = startRun(options, table, paths);
  const harness = harnessOf(root);
  const ctx: RunContext = {
    options,
    adapter,
    table,
    paths,
    sandboxesDir: sandboxesDirOf(root),
  };
  const store = createRunStore(ctx, {
    state,
    record,
    steps: stepsOf(table, record.lane),
    summary: {
      issue: id,
      runId: state.runId,
      harness: adapter.HARNESS,
      harness_commit: harness.commit,
      harness_dirty: harness.dirty,
      lane: record.lane,
      steps: [],
      outcome: null,
    },
  });
  const escalated = introduce(ctx, store);
  if (escalated !== null) return escalated;

  const signals = createRunSignals(ctx, store);
  signals.install();
  const walked = await (async () => {
    try {
      return await walkSteps(ctx, store, signals, ask);
    } finally {
      signals.uninstall();
    }
  })();
  return walked ?? handOff(ctx, store);
};

const main = async (): Promise<void> => {
  const parsed = parseArgs(process.argv.slice(2), process.cwd());
  if ('error' in parsed) {
    process.stderr.write(`run: ${parsed.error}\n`);
    process.exit(2);
  }
  // Only a run in a terminal reads stdin: --no-wait and --decide never do, so a session driving the run
  // never answers a gate by accident.
  const ask = parsed.noWait || parsed.dry || parsed.close ? null : lineReader();
  try {
    process.exit(await run(parsed, ask));
  } catch (error) {
    process.stderr.write(`run: ${messageOf(error)}\n`);
    process.exit(error instanceof Stop ? error.exitCode : 1);
  }
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
