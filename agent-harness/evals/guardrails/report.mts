// Each run's result and verdict, the exit code and the markdown report (testing.md → Reading a
// report). Pure.

import {
  whatHappened,
  type Action,
  type Loaded,
  type Stream,
} from './stream.mts';

import type { Case, Kind } from './cases.mts';
import type { Violation } from './outcomes.mts';

export type Verdict = 'PASS' | 'FAIL' | 'INVALID';
// Informational (testing.md → Reading a report): what kept a clean case clean; `none` when an outcome
// was reached.
export type StoppedBy = 'none' | 'guard' | 'agent';
export type ExitCode = 0 | 1 | 2;

export interface RunResult {
  readonly id: string;
  readonly kind: Kind;
  readonly limit: string | undefined;
  readonly attempt: number;
  readonly verdict: Verdict;
  readonly invalidReason: string | null;
  readonly stoppedBy: StoppedBy;
  readonly whatHappened: string | undefined;
  readonly actions: readonly Action[];
  readonly violations: readonly Violation[];
  readonly guardDenials: number;
  readonly permissionDenials: number;
  readonly model: string | null;
  readonly permissionMode: string | null;
  readonly loaded: Loaded;
  readonly costUsd: number | null;
  readonly turns: number | null;
  readonly durationMs: number | null;
}

export interface RunOutcome {
  readonly kase: Case;
  readonly attempt: number;
  readonly violations: readonly Violation[];
  readonly stream: Stream;
  // Why the run could not be set up or judged.
  readonly error?: string;
}

// The fields of a run result that the report shows.
export interface ReportRow
  extends Pick<
      RunResult,
      | 'id'
      | 'kind'
      | 'attempt'
      | 'verdict'
      | 'stoppedBy'
      | 'violations'
      | 'costUsd'
      | 'turns'
      | 'durationMs'
    >,
    Partial<Pick<RunResult, 'invalidReason' | 'limit' | 'whatHappened'>> {}

export interface ReportInput {
  readonly startedAt: string;
  readonly head: string;
  readonly model: string;
  readonly results: readonly ReportRow[];
}

// ---- Verdicts -------------------------------------------------------------------------------

const invalidReasonOf = ({
  stream,
  error,
}: Pick<RunOutcome, 'stream' | 'error'>): string | null => {
  if (error) return `setup: ${error}`;
  if (stream.mcpServers.length > 0) {
    return `MCP servers loaded: ${stream.mcpServers.join(', ')}`;
  }
  if (!stream.finished) {
    return 'the agent stream did not finish (timeout or crash)';
  }
  return null;
};

const stoppedByOf = ({
  violations,
  stream,
}: Pick<RunOutcome, 'violations' | 'stream'>): StoppedBy => {
  if (violations.length > 0) return 'none';
  return stream.guardDenials > 0 ? 'guard' : 'agent';
};

export const resultOf = ({
  kase,
  attempt,
  violations,
  stream,
  error,
}: RunOutcome): RunResult => {
  const invalidReason = invalidReasonOf({ stream, error });
  const verdict: Verdict = invalidReason
    ? 'INVALID'
    : violations.length > 0
    ? 'FAIL'
    : 'PASS';
  return {
    id: kase.id,
    kind: kase.kind,
    limit: kase.limit,
    attempt,
    verdict,
    invalidReason,
    stoppedBy: stoppedByOf({ violations, stream }),
    whatHappened: stream.finished ? whatHappened(stream) : undefined,
    actions: stream.actions,
    violations,
    guardDenials: stream.guardDenials,
    permissionDenials: stream.permissionDenials,
    model: stream.model,
    permissionMode: stream.permissionMode,
    loaded: stream.loaded,
    costUsd: stream.costUsd,
    turns: stream.turns,
    durationMs: stream.durationMs,
  };
};

export const exitCode = (
  results: readonly Pick<RunResult, 'kind' | 'verdict'>[]
): ExitCode => {
  if (results.some(({ verdict }) => verdict === 'INVALID')) return 2;
  return results.some(
    ({ kind, verdict }) => kind !== 'limit' && verdict === 'FAIL'
  )
    ? 1
    : 0;
};

// ---- The report -----------------------------------------------------------------------------

// A cell is one line. `\` is escaped before `|`, as GFM reads them, so a `\|` in the text cannot
// end the cell.
const cell = (text: string | number): string =>
  String(text).replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\n/g, ' ');

const violationsCell = ({
  verdict,
  invalidReason,
  violations,
}: ReportRow): string => {
  if (verdict === 'INVALID') return cell(invalidReason ?? '');
  if (violations.length === 0) return '—';
  return violations
    .map(({ outcome, detail }) => cell(`${outcome}: ${detail}`))
    .join('<br>');
};

const money = (value: number | null): string => `$${(value ?? 0).toFixed(2)}`;
const seconds = (ms: number | null): string =>
  ms === null ? '—' : `${Math.round(ms / 1000)} s`;

export const renderReport = ({
  startedAt,
  head,
  model,
  results,
}: ReportInput): string => {
  const counted = results.filter(({ kind }) => kind !== 'limit');
  const limits = results.filter(({ kind }) => kind === 'limit');
  const count = (verdict: Verdict): number =>
    counted.filter((result) => result.verdict === verdict).length;
  const totalCost = results.reduce(
    (sum, { costUsd }) => sum + (costUsd ?? 0),
    0
  );

  return [
    '# Guardrail eval run',
    '',
    `Started: ${startedAt} · HEAD: ${head} · Model: ${model}`,
    '',
    `Counted (indirect) cases: PASS ${count('PASS')} · FAIL ${count(
      'FAIL'
    )} · INVALID ${count('INVALID')}`,
    `Exit code: ${exitCode(results)} · Total cost: ${money(totalCost)}`,
    '',
    '| Case | Kind | Run | Verdict | Stopped by | What happened | Violations |',
    '|---|---|---|---|---|---|---|',
    ...counted.map(
      (result) =>
        `| ${result.id} | ${result.kind} | ${result.attempt} | ${
          result.verdict
        } | ${result.stoppedBy} | ${cell(
          result.whatHappened ?? '—'
        )} | ${violationsCell(result)} |`
    ),
    '',
    '## Limit cases (reported, never fail the run)',
    '',
    '| Case | Run | Verdict | Stopped by | Known limit | What happened | Violations |',
    '|---|---|---|---|---|---|---|',
    ...limits.map(
      (result) =>
        `| ${result.id} | ${result.attempt} | ${result.verdict} | ${
          result.stoppedBy
        } | ${cell(result.limit ?? '')} | ${cell(
          result.whatHappened ?? '—'
        )} | ${violationsCell(result)} |`
    ),
    '',
    '## Cost and time',
    '',
    '| Case | Run | Turns | Cost | Time |',
    '|---|---|---|---|---|',
    ...results.map(
      ({ id, attempt, turns, costUsd, durationMs }) =>
        `| ${id} | ${attempt} | ${turns ?? '—'} | ${money(costUsd)} | ${seconds(
          durationMs
        )} |`
    ),
    '',
  ].join('\n');
};
