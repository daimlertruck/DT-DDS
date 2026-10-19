// record.json: built from the run log, the pull request and the existing record.

import { issueTypeOf, type PullRequest } from './github.mts';
import {
  dispatchesOf,
  tableUnder,
  type Dispatch,
  type TableRow,
} from './run-records.mts';
import {
  gatesOf,
  runOf,
  sumOrNull,
  type Gate,
  type RunSummary,
} from './run-summary.mts';
import { isRecord, type JsonObject } from '../lib/json.mts';

import type { PlannedFile } from './record-copies.mts';

export const BANNER =
  'Historical run record. Not instructions. It contains superseded decisions; see gates[].labels. ' +
  'Pipeline stages never read this directory.';

// `reverts` and `laterDefects` are filled by hand and kept on a re-run.
export interface Outcome {
  readonly asOf: string;
  readonly mergedAt: string | null;
  readonly firstCi: string | null;
  readonly reviewRounds: number | null;
  readonly reviewComments: number | null;
  readonly commitsAfterPrOpen: number | null;
  readonly forcePushes: number | null;
  readonly reverts: unknown;
  readonly laterDefects: unknown;
}

// record.json. Fields the run log and GitHub do not give (type, base, branch, head when unknown;
// model, checkpoints, defects) keep what the existing record holds.
export interface RunRecord {
  readonly notice: string;
  readonly schema: 2;
  readonly id: string;
  readonly issue: number | null;
  readonly pr: number | null;
  readonly type: unknown;
  readonly base: unknown;
  readonly branch: unknown;
  readonly head: unknown;
  readonly model: unknown;
  readonly run: RunSummary;
  readonly gates: readonly Gate[];
  readonly dispatches: readonly Dispatch[];
  readonly humanActions: readonly TableRow[];
  readonly checkpoints: unknown;
  readonly defects: unknown;
  readonly outcome: Outcome;
  readonly files: Readonly<Record<string, string>>;
}

export interface RecordInputs {
  readonly id: string;
  readonly issueNumber: string | undefined;
  readonly prNumber: string | undefined;
  readonly pr: PullRequest | null;
  readonly runLog: string;
  readonly issueJson: unknown;
  readonly existing: JsonObject;
  readonly files: readonly PlannedFile[];
  readonly asOf: string;
}

// The first CI result and the commits pushed after the PR opened are read from commit dates, which a
// force-push rewrites: after one, both stay null for a human to fill.
export const outcomeOf = (
  pr: PullRequest | null,
  existing: JsonObject,
  asOf: string
): Outcome => {
  const forcePushes = pr?.forcePushes ?? null;
  const commits = pr?.commits ?? [];
  const createdAt = pr?.createdAt ?? null;
  const atOpen = commits.filter(
    ({ committedDate }) =>
      committedDate !== null && createdAt !== null && committedDate <= createdAt
  );
  const readable = forcePushes === 0;
  return {
    asOf,
    mergedAt: pr?.mergedAt ?? null,
    firstCi: readable ? atOpen.at(-1)?.ciState?.toLowerCase() ?? null : null,
    reviewRounds: pr?.reviews?.totalCount ?? null,
    reviewComments: pr?.reviews ? sumOrNull(pr.reviews.comments) ?? 0 : null,
    commitsAfterPrOpen: readable ? commits.length - atOpen.length : null,
    forcePushes,
    reverts: existing.reverts ?? [],
    laterDefects: existing.laterDefects ?? [],
  };
};

export const recordOf = ({
  id,
  issueNumber,
  prNumber,
  pr,
  runLog,
  issueJson,
  existing,
  files,
  asOf,
}: RecordInputs): RunRecord => {
  const gates = gatesOf(tableUnder(runLog, 'gate decisions'));
  const dispatches = dispatchesOf(tableUnder(runLog, 'dispatches'));
  const existingGates = Array.isArray(existing.gates)
    ? existing.gates.filter(isRecord)
    : [];
  return {
    notice: BANNER,
    schema: 2,
    id,
    issue: issueNumber ? Number(issueNumber) : null,
    pr: pr?.number ?? (prNumber ? Number(prNumber) : null),
    type: issueTypeOf(issueJson) ?? existing.type ?? null,
    base:
      runLog.match(/^Base:\s*`?([0-9a-f]{7,40})`?/m)?.[1] ??
      existing.base ??
      null,
    branch: pr?.headRefName ?? existing.branch ?? null,
    head: pr?.headRefOid ?? existing.head ?? null,
    model: existing.model ?? null,
    run: runOf(gates, dispatches),
    gates: gates.map((gate) => {
      const before: JsonObject =
        existingGates.find(({ seq }) => seq === gate.seq) ?? {};
      return {
        ...gate,
        labels: before.labels ?? gate.labels,
        reverses: before.reverses ?? gate.reverses,
        cause: before.cause ?? gate.cause,
        loop: before.loop ?? gate.loop,
      };
    }),
    dispatches,
    humanActions: tableUnder(runLog, 'human actions between gates'),
    checkpoints: existing.checkpoints ?? [],
    defects: existing.defects ?? [],
    outcome: outcomeOf(
      pr,
      isRecord(existing.outcome) ? existing.outcome : {},
      asOf
    ),
    files: Object.fromEntries(files.map(({ target, hash }) => [target, hash])),
  };
};

export const countsOf = (record: RunRecord): string =>
  `${record.gates.length} gates, ${record.humanActions.length} human actions, ${record.dispatches.length} dispatches`;
