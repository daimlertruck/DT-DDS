// One step as one session: the budget and health checks before it, the session, the Red flag check
// and the snapshots the human judges. Leaves its gate pending in the run state.

import { randomUUID } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join, relative } from 'node:path';

import {
  budgetStopOf,
  callsIn,
  leftUsd,
  redFlags,
  stepKeyOf,
  toolCallCapOf,
} from './checks.mts';
import { autosquashRun, runStep } from './child-scripts.mts';
import { Interrupted, Stop } from './errors.mts';
import { isApprovable } from './gate-replies.mts';
import {
  branchLogOf,
  gateCount,
  git,
  gitState,
  now,
  say,
  sha16,
  subjectsBetween,
  writeJson,
} from './io.mts';
import { runHealthChecks } from './preflight.mts';
import {
  afterSession,
  summaryStepOf,
  withAttempt,
  type PendingGate,
} from './state.mts';
import {
  briefOf,
  commitsFileOf,
  healthPassedOf,
  healthStopOf,
  heartbeatLine,
  redFlagStopOf,
} from './texts.mts';
import {
  requestsIn,
  spendOf,
  transcriptsOf,
  configDirOf,
} from '../records/transcript.mts';
import { loadPrices } from '../records/usage.mts';

import type { RunContext, RunStore } from './context.mts';
import type { RunSignals } from './signals.mts';
import type { StepOutcome } from './stage-outcome.mts';
import type { Step } from './stage-table.mts';

// The health checks a step asks for: their pass line for the brief, or a Stop naming the failures.
const healthOf = (
  { options, table, paths }: RunContext,
  step: Step
): string | null => {
  if (!step.health || !table.healthChecks.length) return null;
  const { root, id } = options;
  const results = runHealthChecks(
    root,
    table.healthChecks,
    join(paths.workDir, 'logs')
  );
  const failed = results.filter(({ ok }) => !ok);
  if (failed.length) {
    throw new Stop(
      1,
      healthStopOf(
        step.id,
        failed.map(({ name, log }) => ({ name, log: relative(root, log) }))
      )
    );
  }
  return healthPassedOf(
    id,
    results.map(({ name }) => name)
  );
};

interface Heartbeat {
  readonly root: string;
  readonly step: Step;
  readonly sessionId: string | null;
  readonly ledgerPath: string;
  readonly stepKey: string;
  readonly cap: number;
  readonly startedMs: number;
}

// A heartbeat line: the step's time, its tool calls and its spend so far (from the session's transcript).
const heartbeatOf =
  ({ root, step, sessionId, ledgerPath, stepKey, cap, startedMs }: Heartbeat) =>
  (): void => {
    const spendUsd = ((): number | null => {
      try {
        return spendOf(
          requestsIn(transcriptsOf(sessionId, configDirOf()), {
            sinceMs: startedMs - 1000,
          }),
          loadPrices(root)
        );
      } catch {
        return null; // a transcript or prices file being written: the next beat reads it
      }
    })();
    say(
      heartbeatLine({
        stepId: step.id,
        seconds: Math.round((Date.now() - startedMs) / 1000),
        calls: existsSync(ledgerPath)
          ? callsIn(readFileSync(ledgerPath, 'utf8'), stepKey)
          : 0,
        cap,
        spendUsd,
      })
    );
  };

// Snapshot what the human judges at the gate: the gate summary, the step's artifact and, for a branch
// step, its commits. The gate cell names the judged snapshot and its hash.
const pendingGateOf = (
  { options, paths }: RunContext,
  step: Step,
  outcome: StepOutcome
): PendingGate => {
  const { root } = options;
  const { workDir, runLogPath } = paths;
  const seq = String(gateCount(runLogPath) + 1).padStart(2, '0');
  const snapshots = join(workDir, 'snapshots');
  mkdirSync(snapshots, { recursive: true });
  if (step.writes === 'branch') {
    writeFileSync(
      join(workDir, 'commits.txt'),
      commitsFileOf(branchLogOf(root), git(root, 'rev-parse', 'HEAD^{tree}'))
    );
  }
  const shown = [
    ...new Set([
      'gate-summary.md',
      step.artifact,
      ...(step.writes === 'branch' ? ['commits.txt'] : []),
    ]),
  ].filter((name) => existsSync(join(workDir, name)));
  const snapshotOf = (name: string): string =>
    join(snapshots, `${seq}-${step.gate}-${name}`);
  shown.forEach((name) => copyFileSync(join(workDir, name), snapshotOf(name)));
  const judged = shown.includes(step.artifact) ? step.artifact : shown[0];
  return {
    step: step.id,
    gate: step.gate,
    status: outcome.status,
    predictedUsd: outcome.predictedUsd,
    usd: outcome.usd,
    denials: outcome.denials,
    result: outcome.resultPath,
    snapshotCell: judged
      ? `snapshots/${seq}-${step.gate}-${judged} · ${sha16(snapshotOf(judged))}`
      : '—',
  };
};

export const runSession = async (
  ctx: RunContext,
  store: RunStore,
  signals: RunSignals,
  step: Step,
  revise: string | null
): Promise<PendingGate> => {
  const { options, adapter, paths, sandboxesDir } = ctx;
  const { root, id } = options;
  const { workDir, runLogPath, agentsPath } = paths;
  const { record, state: atStart } = store.current();
  const budget = {
    budgetUsd: options.budgetUsd,
    maxUsd: record.maxUsd,
    spentUsd: atStart.spentUsd,
  };
  const budgetStop = budgetStopOf(budget, record.lane, step.id);
  if (budgetStop) throw new Stop(1, budgetStop);

  const health = healthOf(ctx, step);
  const squashed =
    step.autosquash === 'before'
      ? autosquashRun({
          root,
          workDir,
          runLogPath,
          base: atStart.branchStart ?? null,
        })
      : null;
  rmSync(join(workDir, 'gate-summary.md'), { force: true });
  // Only this step's agent: a stage with the Agent tool must not dispatch another stage.
  writeJson(join(root, agentsPath), adapter.agentsFile([step]));
  const attempted = store.updateState((state) => withAttempt(state, step.id));
  const stepKey = stepKeyOf(step.id, attempted.attempts[step.id] ?? 1);
  const cap = toolCallCapOf(step.maxToolCalls, attempted.toolCallCap);
  store.save();
  store.activate(stepKey, cap);
  const before = gitState(root);
  // Where this run's commits start: autosquash.mts rewrites nothing before it.
  if (step.writes === 'branch' && !attempted.branchStart) {
    store.updateState((state) => ({ ...state, branchStart: before.head }));
  }
  const sessionId = step.resume
    ? attempted.sessions[step.stage] ?? null
    : randomUUID();
  const brief = briefOf({
    id,
    lane: record,
    step,
    revise,
    health,
    autosquash: squashed,
  });
  say(
    `→ ${step.id} started ${now()} (${step.tier}/${step.effort}, maxTurns ${
      step.maxTurns
    }, ${cap} tool calls)`
  );
  signals.sessionStarting();
  const heartbeat = heartbeatOf({
    root,
    step,
    sessionId,
    ledgerPath: join(workDir, `tool-calls-${attempted.runId}.log`),
    stepKey,
    cap,
    startedMs: Date.now(),
  });
  const args = adapter.sessionArgs(step, {
    issue: id,
    brief,
    agentsPath,
    sessionId: step.resume ? sessionId : null,
    newSessionId: step.resume ? null : sessionId,
    budgetUsd: leftUsd(budget),
    sandboxesDir,
  });
  const outcome = await runStep({
    root,
    id,
    step,
    args,
    onStart: signals.sessionChild,
    heartbeat,
  });
  const signal = signals.sessionEnded(outcome.interrupted);
  if (signal) {
    throw new Interrupted(signal, step.id, {
      ...outcome,
      sessionId: outcome.sessionId ?? sessionId,
    });
  }
  store.update((values) => ({
    ...values,
    state: afterSession(values.state, step, outcome),
    summary: {
      ...values.summary,
      steps: [...values.summary.steps, summaryStepOf(step.id, outcome)],
    },
  }));
  store.save();

  const after = gitState(root);
  const flags = redFlags(
    step,
    before,
    after,
    subjectsBetween(root, before.head, after.head)
  );
  if (flags.length) throw new Stop(1, redFlagStopOf(flags));

  if (step.autosquash === 'after' && isApprovable(outcome.status)) {
    autosquashRun({
      root,
      workDir,
      runLogPath,
      base: store.current().state.branchStart ?? null,
    });
  }

  const gate = pendingGateOf(ctx, step, outcome);
  store.updateState((state) => ({ ...state, pending: gate }));
  store.save();
  return gate;
};
