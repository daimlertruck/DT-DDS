// The shared record of a pipeline run: `docs/agent-harness/runs/<N>.json`, which run.mts commits on the
// feature branch when G7 is approved, and the issue comment `--close` prepares once the PR merged.
// Both are public: they carry numbers and gate decision kinds, never the text of a reply, a note or
// a human action, and no local path.

import { dispatchesOf, tableUnder, type Dispatch } from './run-records.mts';
import { gatesOf, runOf, type Gate } from './run-summary.mts';
import { isRecord } from '../lib/json.mts';

import type { Outcome } from './record-json.mts';

export const RUN_FILES_DIR = 'docs/agent-harness/runs';

export const runFilePathOf = (id: string): string =>
  `${RUN_FILES_DIR}/${id}.json`;

export interface RunFileLane {
  readonly lane: string;
  readonly name: string;
  readonly decidedBy: string;
  readonly confidence: number;
}

export interface Tokens {
  readonly requests: number | null;
  readonly uncachedIn: number | null;
  readonly cacheWrite: number | null;
  readonly cacheRead: number | null;
  readonly output: number | null;
}

export interface RunFileStage extends Tokens {
  readonly stage: string;
  readonly models: readonly string[];
  readonly listUsd: number | null;
  readonly reportedUsd: number | null;
  readonly seconds: number | null;
}

export interface RunFileGate {
  readonly gate: string;
  readonly iteration: number;
  readonly decision: string | null;
  readonly waitSeconds: number | null;
}

export interface RunFile {
  readonly schema: 1;
  readonly issue: number;
  readonly lane: RunFileLane;
  readonly base: string | null;
  readonly harness: {
    readonly commit: string | null;
    readonly dirty: boolean;
    readonly claudeCode: readonly string[];
  };
  readonly started: string | null;
  readonly handedOff: string | null;
  readonly totals: Tokens & {
    readonly listUsd: number | null;
    readonly reportedUsd: number | null;
    readonly stageSeconds: number | null;
    readonly toolCalls: number;
  };
  readonly stages: readonly RunFileStage[];
  readonly gates: readonly RunFileGate[];
  readonly humanActions: number;
}

export interface RunFileInput {
  readonly id: string;
  readonly runLog: string;
  readonly lane: RunFileLane;
  readonly harness: { readonly commit: string | null; readonly dirty: boolean };
  readonly toolCalls: number;
}

const sumOrNull = (values: readonly (number | null)[]): number | null => {
  const numbers = values.filter((value) => value !== null);
  return numbers.length
    ? numbers.reduce((total, value) => total + value, 0)
    : null;
};
const roundUsd = (value: number | null): number | null =>
  value === null ? null : Math.round(value * 1e6) / 1e6;

const secondsBetween = (from: string | null, to: string | null) =>
  from === null || to === null
    ? null
    : Math.round((Date.parse(to) - Date.parse(from)) / 1000);

const stageOf = (stage: string, rows: readonly Dispatch[]): RunFileStage => {
  const total = (field: keyof Tokens | 'seconds'): number | null =>
    sumOrNull(rows.map((row) => row[field]));
  return {
    stage,
    models: [
      ...new Set(rows.flatMap(({ model }) => (model ? [model] : []))),
    ].sort(),
    listUsd: roundUsd(sumOrNull(rows.map(({ predictedUsd }) => predictedUsd))),
    reportedUsd: roundUsd(
      sumOrNull(rows.map(({ reportedUsd }) => reportedUsd))
    ),
    seconds: total('seconds'),
    requests: total('requests'),
    uncachedIn: total('uncachedIn'),
    cacheWrite: total('cacheWrite'),
    cacheRead: total('cacheRead'),
    output: total('output'),
  };
};

const gateOf = ({
  gate,
  iteration,
  decision,
  presented,
  decided,
}: Gate): RunFileGate => ({
  gate,
  iteration,
  decision,
  waitSeconds: secondsBetween(presented, decided),
});

// Null for a run that is not an issue's (a fixture or smoke id): only issue runs are shared.
export const runFileOf = ({
  id,
  runLog,
  lane,
  harness,
  toolCalls,
}: RunFileInput): RunFile | null => {
  if (!/^\d+$/.test(id)) return null;
  const gates = gatesOf(tableUnder(runLog, 'gate decisions'));
  const dispatches = dispatchesOf(tableUnder(runLog, 'dispatches'));
  const run = runOf(gates, dispatches);
  const stageNames = [...new Set(dispatches.map(({ stage }) => stage))];
  return {
    schema: 1,
    issue: Number(id),
    lane: {
      lane: lane.lane,
      name: lane.name,
      decidedBy: lane.decidedBy,
      confidence: lane.confidence,
    },
    base: runLog.match(/^Base:\s*`?([0-9a-f]{7,40})`?/m)?.[1] ?? null,
    harness: { ...harness, claudeCode: run.claudeCode },
    started: run.started,
    handedOff: run.handedOff,
    totals: {
      listUsd: run.predictedUsd,
      reportedUsd: run.reportedUsd,
      requests: run.requests,
      uncachedIn: run.uncachedIn,
      cacheWrite: run.cacheWrite,
      cacheRead: run.cacheRead,
      output: run.output,
      stageSeconds: run.stageSeconds,
      toolCalls,
    },
    stages: stageNames.map((stage) =>
      stageOf(
        stage,
        dispatches.filter((row) => row.stage === stage)
      )
    ),
    gates: gates.map(gateOf),
    humanActions: tableUnder(runLog, 'human actions between gates').length,
  };
};

// --- the issue comment -----------------------------------------------------------------------

export type PullRequestFacts = Pick<
  Outcome,
  'mergedAt' | 'reviewRounds' | 'reviewComments' | 'commitsAfterPrOpen'
>;

export interface PullRequestOutcome {
  readonly pr: number | null;
  readonly outcome: PullRequestFacts | null;
}

const stringOrNull = (value: unknown): string | null =>
  typeof value === 'string' ? value : null;
const numberOrNull = (value: unknown): number | null =>
  typeof value === 'number' ? value : null;

// The PR number and outcome from record.json, as record-run.mts wrote it.
export const pullRequestOutcomeOf = (record: unknown): PullRequestOutcome => {
  if (!isRecord(record)) return { pr: null, outcome: null };
  const outcome = isRecord(record.outcome) ? record.outcome : null;
  return {
    pr: numberOrNull(record.pr),
    outcome: outcome && {
      mergedAt: stringOrNull(outcome.mergedAt),
      reviewRounds: numberOrNull(outcome.reviewRounds),
      reviewComments: numberOrNull(outcome.reviewComments),
      commitsAfterPrOpen: numberOrNull(outcome.commitsAfterPrOpen),
    },
  };
};

const usdText = (value: number | null): string =>
  value === null ? 'unknown' : `$${value.toFixed(4)}`;
const minutesText = (seconds: number | null): string =>
  seconds === null ? '—' : `${Math.round(seconds / 60)} min`;
const plural = (count: number, word: string): string =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

const decisionsText = (gates: readonly RunFileGate[]): string => {
  const counts = gates.reduce<Readonly<Record<string, number>>>(
    (byKind, { decision }) => {
      const kind = decision ?? 'unknown';
      return { ...byKind, [kind]: (byKind[kind] ?? 0) + 1 };
    },
    {}
  );
  const parts = Object.entries(counts).map(
    ([kind, count]) => `${count} ${kind}`
  );
  return `${gates.length}: ${parts.join(', ')}`;
};

const pullRequestText = ({ pr, outcome }: PullRequestOutcome): string => {
  if (pr === null) return 'none found';
  const merged = outcome?.mergedAt
    ? `merged ${outcome.mergedAt.slice(0, 10)}`
    : 'not merged';
  const reviews =
    outcome?.reviewRounds === null || outcome?.reviewRounds === undefined
      ? null
      : `${plural(outcome.reviewRounds, 'review')}, ${plural(
          outcome.reviewComments ?? 0,
          'comment'
        )}`;
  const after =
    outcome?.commitsAfterPrOpen === null ||
    outcome?.commitsAfterPrOpen === undefined
      ? null
      : `${plural(outcome.commitsAfterPrOpen, 'commit')} after it opened`;
  return [`#${pr}, ${merged}`, reviews, after]
    .filter((part) => part !== null)
    .join(' · ');
};

export const commentOf = (
  file: RunFile,
  pullRequest: PullRequestOutcome
): string =>
  [
    `#### Agentic run record: Lane ${file.lane.lane} (${file.lane.name})`,
    '',
    '| | |',
    '|---|---|',
    `| Token cost (list price) | ${usdText(file.totals.listUsd)} |`,
    `| Requests · tool calls | ${file.totals.requests ?? '—'} · ${
      file.totals.toolCalls
    } |`,
    `| Stage time | ${minutesText(file.totals.stageSeconds)} |`,
    `| Gates | ${decisionsText(file.gates)} |`,
    `| Pull request | ${pullRequestText(pullRequest)} |`,
    '',
    '| Stage | Models | Token cost | Time |',
    '|---|---|---|---|',
    ...file.stages.map(
      ({ stage, models, listUsd, seconds }) =>
        `| ${stage} | ${models.join(', ')} | ${usdText(
          listUsd
        )} | ${minutesText(seconds)} |`
    ),
    '',
    `Per-stage tokens: \`${runFilePathOf(String(file.issue))}\`.`,
    '',
  ].join('\n');
