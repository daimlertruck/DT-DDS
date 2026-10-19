// A run's gates and summary, read from the run-log tables (record.json and the shared run file).

import { textOrNull, type Dispatch, type TableRow } from './run-records.mts';

// One gate presentation. `labels`, `reverses`, `cause` and `loop` are filled by hand in record.json
// and kept on a re-run, whatever they hold.
export interface Gate {
  readonly seq: number;
  readonly gate: string;
  readonly iteration: number;
  readonly presented: string | null;
  readonly decided: string | null;
  readonly decision: string | null;
  readonly verbatim: string;
  readonly snapshot: string | null;
  readonly snapshotSha256: string | null;
  readonly clean: boolean | null;
  readonly note: string;
  readonly labels: unknown;
  readonly reverses: unknown;
  readonly cause: unknown;
  readonly loop: unknown;
}

export interface UsageTotals {
  readonly requests: number | null;
  readonly uncachedIn: number | null;
  readonly cacheWrite: number | null;
  readonly cacheRead: number | null;
  readonly output: number | null;
  readonly predictedUsd: number | null;
  readonly reportedUsd: number | null;
}

export interface RunSummary extends UsageTotals {
  readonly started: string | null;
  readonly handedOff: string | null;
  readonly dispatches: number;
  readonly continuations: number;
  readonly stageSeconds: number | null;
  readonly claudeCode: readonly string[];
  readonly byModel: Readonly<Record<string, UsageTotals>>;
}

export const sumOrNull = (
  values: readonly (number | null)[]
): number | null => {
  const numbers = values.filter((value) => value !== null);
  return numbers.length
    ? numbers.reduce((total, value) => total + value, 0)
    : null;
};
// `G5 (loop 1)` → G5; Lane 0's combined first gate stays `G1+G3`.
const gateOf = (cell: string): string =>
  cell.match(/^G\d+(?:\+G\d+)?/)?.[0] ?? cell;

// The verdict as presented decides whether a gate could have run automatically.
const cleanOf = (note: string): boolean | null => {
  const value =
    note.match(/presented clean: (yes|no)/)?.[1] ??
    note.match(/clean: (yes|no)/)?.[1];
  return value ? value === 'yes' : null;
};

export const gatesOf = (rows: readonly TableRow[]): Gate[] =>
  rows.map((row, index) => {
    const gate = gateOf(row.gate ?? '');
    const decision = row.decision ?? '';
    const snapshot = row.snapshot ?? '';
    return {
      seq: index + 1,
      gate,
      iteration:
        rows
          .slice(0, index)
          .filter((earlier) => gateOf(earlier.gate ?? '') === gate).length + 1,
      presented: textOrNull(row.presented),
      decided: textOrNull(row.decided ?? row.timestamp),
      decision: decision.match(/^[a-z]+/i)?.[0].toLowerCase() ?? null,
      verbatim: decision,
      snapshot: snapshot.match(/snapshots\/[^\s·`]+/)?.[0] ?? null,
      snapshotSha256: snapshot.match(/sha256:([0-9a-f]+)/)?.[1] ?? null,
      clean: cleanOf(row.note ?? ''),
      note: row.note ?? '',
      labels: [],
      reverses: null,
      cause: null,
      loop: null,
    };
  });

// Consumption is summed from the per-model usage columns. final_context is a size, not consumption,
// so it is never summed.
const roundUsd = (value: number | null): number | null =>
  value === null ? null : Math.round(value * 1e6) / 1e6;
const usageOf = (rows: readonly Dispatch[]): UsageTotals => {
  const total = (field: keyof UsageTotals): number | null =>
    sumOrNull(rows.map((row) => row[field]));
  return {
    requests: total('requests'),
    uncachedIn: total('uncachedIn'),
    cacheWrite: total('cacheWrite'),
    cacheRead: total('cacheRead'),
    output: total('output'),
    predictedUsd: roundUsd(total('predictedUsd')),
    reportedUsd: roundUsd(total('reportedUsd')),
  };
};
const countDispatches = (rows: readonly Dispatch[]): number =>
  new Set(rows.map(({ dispatch }) => dispatch)).size;
const presentOf = (values: readonly (string | null)[]): string[] =>
  values.flatMap((value) => (value ? [value] : []));

export const runOf = (
  gates: readonly Gate[],
  dispatches: readonly Dispatch[]
): RunSummary => ({
  started:
    presentOf([
      ...dispatches.map(({ started }) => started),
      ...gates.map(({ presented }) => presented),
    ]).sort()[0] ?? null,
  handedOff: gates.filter(({ gate }) => gate === 'G7').at(-1)?.decided ?? null,
  dispatches: countDispatches(
    dispatches.filter(({ continuation }) => !continuation)
  ),
  continuations: countDispatches(
    dispatches.filter(({ continuation }) => continuation)
  ),
  stageSeconds: sumOrNull(dispatches.map(({ seconds }) => seconds)),
  ...usageOf(dispatches),
  claudeCode: [
    ...new Set(presentOf(dispatches.map(({ claudeCode }) => claudeCode))),
  ].sort(),
  byModel: Object.fromEntries(
    [...new Set(presentOf(dispatches.map(({ model }) => model)))]
      .sort()
      .map((model) => [
        model,
        usageOf(dispatches.filter((row) => row.model === model)),
      ])
  ),
});
