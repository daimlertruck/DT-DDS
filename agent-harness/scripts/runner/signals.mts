// Signals. During a step the session stops and prints its result (run-stage records it); the step's
// outcome then ends the run (Interrupted). A signal sent to run.mts alone is forwarded after a grace.
// While a gate waits: record it, keep the gate pending, remove the run file.

import { Stop, type Interrupted } from './errors.mts';
import { appendGateRow, now } from './io.mts';
import { INTERRUPTED } from './stage-outcome.mts';
import { summaryStepOf, withSpend } from './state.mts';

import type { RunContext, RunStore } from './context.mts';
import type { Gate } from './stage-table.mts';
import type { ChildProcess } from 'node:child_process';

// How long the session may take to stop on a signal it got with the job before run.mts forwards it.
const GRACE_MS = Number(process.env.DT_DDS_SIGNAL_GRACE_MS) || 2000;

// A gate the human is deciding: what an interrupt at the gate records.
export interface Presented {
  readonly step: string;
  readonly gate: Gate;
  readonly presented: string;
  readonly snapshotCell: string;
}

export interface RunSignals {
  readonly install: () => void;
  readonly uninstall: () => void;
  readonly sessionStarting: () => void;
  readonly sessionChild: (child: ChildProcess | null) => void;
  // The signal that stopped the session (its own report, or one run.mts got), or null.
  readonly sessionEnded: (interrupted: string | null) => string | null;
  // The gate the human is deciding; null once decided.
  readonly atGate: (presented: Presented | null) => void;
}

export const createRunSignals = (
  { options, paths }: RunContext,
  store: RunStore
): RunSignals => {
  const { id } = options;
  let current: Presented | null = null;
  let running = false;
  let runningChild: ChildProcess | null = null;
  let stepSignal: NodeJS.Signals | null = null;

  const onSignal = (signal: NodeJS.Signals): void => {
    if (running) {
      if (stepSignal) return;
      stepSignal = signal;
      setTimeout(() => {
        if (
          runningChild &&
          runningChild.exitCode === null &&
          runningChild.signalCode === null
        ) {
          runningChild.kill(signal);
        }
      }, GRACE_MS).unref();
      return;
    }
    const at = current;
    if (at) {
      appendGateRow(paths.runLogPath, id, [
        at.gate,
        at.presented,
        now(),
        'interrupted',
        at.snapshotCell,
        `${signal} at the gate`,
      ]);
    }
    store.updateState((state) => ({
      ...state,
      interrupted: {
        step: at?.step ?? null,
        gate: at?.gate ?? null,
        signal,
        at: now(),
      },
    }));
    store.save();
    store.finish(`interrupted (${signal})${at ? ` at ${at.gate}` : ''}`);
    store.deactivate();
    process.stderr.write(
      `run: interrupted (${signal})${
        at ? ` at ${at.gate}; the gate stays pending` : ''
      }. Resume with: node agent-harness/scripts/run.mts ${id}\n`
    );
    process.exit(INTERRUPTED);
  };

  return {
    install: () => {
      process.on('SIGINT', onSignal);
      process.on('SIGTERM', onSignal);
    },
    uninstall: () => {
      process.off('SIGINT', onSignal);
      process.off('SIGTERM', onSignal);
    },
    sessionStarting: () => {
      running = true;
      stepSignal = null;
    },
    sessionChild: (child) => {
      runningChild = child;
    },
    sessionEnded: (interrupted) => {
      runningChild = null;
      const signal = interrupted ?? stepSignal;
      if (!signal) running = false;
      return signal;
    },
    atGate: (presented) => {
      current = presented;
    },
  };
};

// What run-stage recorded for an interrupted session: its completed requests, its id and transcript.
// The gate instruction (state.revise) stays for the re-run. Returns the Stop that ends the run.
export const stopForInterrupted = (
  { options }: RunContext,
  store: RunStore,
  { signal, stepId, outcome }: Interrupted
): Stop => {
  store.update((values) => ({
    ...values,
    state: {
      ...withSpend(values.state, stepId, outcome.usd),
      interrupted: {
        step: stepId,
        gate: null,
        signal,
        at: now(),
        sessionId: outcome.sessionId ?? null,
        usd: outcome.usd,
        result: outcome.resultPath ?? null,
        transcript: outcome.transcriptPath ?? null,
      },
    },
    summary: {
      ...values.summary,
      steps: [
        ...values.summary.steps,
        {
          ...summaryStepOf(stepId, outcome),
          interrupted: signal,
          sessionId: outcome.sessionId ?? null,
        },
      ],
    },
  }));
  store.save();
  store.finish(`interrupted (${signal}) during ${stepId}`);
  store.deactivate();
  const spent =
    outcome.usd !== null
      ? `$${outcome.usd.toFixed(
          4
        )} counted (a request cut off by the interrupt is not in it)`
      : 'its spend is unknown (not counted)';
  return new Stop(
    INTERRUPTED,
    `interrupted (${signal}) during ${stepId}: ${spent}. Resume with: node agent-harness/scripts/run.mts ${options.id}`
  );
};
