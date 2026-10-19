// What a run works with. The context is fixed for the run: its options, adapter, stage table and
// paths. The store holds what changes (run state, lane record, summary, steps) as one value; every
// change is a pure function of the current value, and the store owns the files it is saved to.

import { rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { activeRunOf } from './checks.mts';
import { writeJson } from './io.mts';
import { finishedSummary } from './state.mts';
import { WORK_DIR } from '../records/run-records.mts';

import type { HarnessAdapter } from './adapter.mts';
import type { RunOptions } from './args.mts';
import type { Step, StageTable } from './stage-table.mts';
import type { LaneChoice, RunState, RunSummary } from './state.mts';

export const ACTIVE_RUN = join(WORK_DIR, '.active-run.json');

export interface RunPaths {
  readonly workDir: string;
  readonly statePath: string;
  readonly lanePath: string;
  readonly runLogPath: string;
  readonly issuePath: string;
  readonly activePath: string;
  // Relative to the repo, as the adapter passes it on.
  readonly agentsPath: string;
}

export const pathsOf = (root: string, id: string): RunPaths => {
  const workDir = join(root, WORK_DIR, id);
  return {
    workDir,
    statePath: join(workDir, 'run-state.json'),
    lanePath: join(workDir, 'lane.json'),
    runLogPath: join(workDir, 'run-log.md'),
    issuePath: join(workDir, 'issue.json'),
    activePath: join(root, ACTIVE_RUN),
    agentsPath: join(WORK_DIR, id, 'agents.json'),
  };
};

export interface RunContext {
  readonly options: RunOptions;
  readonly adapter: HarnessAdapter;
  readonly table: StageTable;
  readonly paths: RunPaths;
  readonly sandboxesDir: string | null;
}

export interface RunValues {
  readonly state: RunState;
  readonly record: LaneChoice;
  readonly summary: RunSummary;
  readonly steps: readonly Step[];
}

export interface RunStore {
  readonly current: () => RunValues;
  readonly update: (change: (values: RunValues) => RunValues) => RunValues;
  readonly updateState: (change: (state: RunState) => RunState) => RunState;
  // run-state.json, with the lane the run is on.
  readonly save: () => void;
  // The summary's outcome, and the --record-out file.
  readonly finish: (outcome: string) => void;
  // The run file budget-guard reads. Before a session: its step key and its tool-call
  // cap. Between sessions: no step.
  readonly activate: (stepKey?: string | null, maxToolCalls?: number) => void;
  readonly deactivate: () => void;
}

export const createRunStore = (
  { options, paths }: RunContext,
  initial: RunValues
): RunStore => {
  let values = initial;
  const update = (change: (current: RunValues) => RunValues): RunValues => {
    values = change(values);
    return values;
  };
  return {
    current: () => values,
    update,
    updateState: (change) =>
      update((current) => ({ ...current, state: change(current.state) })).state,
    save: () =>
      writeJson(paths.statePath, {
        ...values.state,
        lane: values.record.lane,
      }),
    finish: (outcome) => {
      const { summary } = update((current) => ({
        ...current,
        summary: finishedSummary(current.summary, current.state, outcome),
      }));
      if (options.recordOut) {
        writeJson(resolve(options.root, options.recordOut), summary);
      }
    },
    activate: (stepKey = null, maxToolCalls = values.record.maxToolCalls) =>
      writeJson(
        paths.activePath,
        activeRunOf({
          id: options.id,
          lane: values.record.lane,
          maxToolCalls,
          stepKey,
          pid: process.pid,
          runId: values.state.runId,
        })
      ),
    deactivate: () => rmSync(paths.activePath, { force: true }),
  };
};
