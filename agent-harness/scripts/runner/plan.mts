// The plan a run prints (lane, reasons, steps, caps), and --dry, which prints it and nothing else.

import { runCapUsd } from './checks.mts';
import { say } from './io.mts';
import { laneRecord, readIssue } from './lane.mts';
import { laneOf, stepsOf, type Step, type StageTable } from './stage-table.mts';
import { describePlan, firstSessionLine } from './texts.mts';

import type { HarnessAdapter } from './adapter.mts';
import type { RunOptions } from './args.mts';
import type { LaneChoice } from './state.mts';

export const planOf = (
  id: string,
  record: LaneChoice,
  steps: readonly Step[],
  adapter: HarnessAdapter,
  table: StageTable
): string[] =>
  describePlan({
    id,
    record,
    lane: laneOf(table, record.lane),
    steps,
    harness: adapter.HARNESS,
    toolsOf: adapter.toolsOf,
    healthChecks: table.healthChecks,
  });

export const dryRun = (
  options: RunOptions,
  adapter: HarnessAdapter,
  table: StageTable,
  agentsPath: string
): number => {
  const { root, id } = options;
  const issue = readIssue(root, id, options.issueFile);
  const record = laneRecord({
    root,
    id,
    issue,
    table,
    dry: true,
    override: options.lane,
  });
  const steps = stepsOf(table, record.lane);
  say(`run.mts ${id} --dry (writes nothing, calls no model)`);
  planOf(id, record, steps, adapter, table).forEach((line) => say(line));
  const [first] = steps;
  if (first) {
    say(
      firstSessionLine(
        adapter.sessionArgs(first, {
          issue: id,
          brief: '<brief>',
          agentsPath,
          newSessionId: '<uuid>',
          budgetUsd: runCapUsd(options.budgetUsd, record.maxUsd),
        })
      )
    );
  }
  return 0;
};
