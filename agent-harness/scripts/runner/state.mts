// The state of one pipeline run: run-state.json (what a resume continues from), the lane record as
// run.mts reads it back from lane.json, the run summary (--record-out), and the pure transitions a step
// or a gate decision makes. run.mts reads and writes the files; nothing here does I/O.

import {
  GATES,
  LANES,
  type Gate,
  type LaneCaps,
  type LaneId,
  type Step,
} from './stage-table.mts';
import { isRecord, type JsonObject } from '../lib/json.mts';
import { omit } from '../lib/objects.mts';

import type { StepOutcome } from './stage-outcome.mts';

// A gate waiting for the human: the step's outcome and the snapshot the human judges. `presented` is
// when the human first saw it, kept while a gate left pending by --no-wait waits for its reply.
export interface PendingGate {
  readonly step: string;
  readonly gate: Gate;
  readonly status: string;
  readonly predictedUsd: number | null;
  readonly usd: number | null;
  readonly denials: readonly string[];
  readonly result: string | null;
  readonly snapshotCell: string;
  readonly presented?: string;
}

// A revise:/loop: instruction, kept until the step it re-runs completes.
export interface GateInstruction {
  readonly step: string;
  readonly gate: Gate;
  readonly kind: 'revise' | 'loop';
  readonly text: string;
}

// The last interrupt: at a gate (`gate` set), or during a step with what run-stage recorded for it.
export interface InterruptRecord {
  readonly step: string | null;
  readonly gate: Gate | null;
  readonly signal: string;
  readonly at: string;
  readonly sessionId?: string | null;
  readonly usd?: number | null;
  readonly result?: string | null;
  readonly transcript?: string | null;
}

export interface RunState {
  readonly runId: string;
  readonly approved: readonly string[];
  // Session id per stage, for a step that resumes its stage's session.
  readonly sessions: Readonly<Record<string, string>>;
  readonly attempts: Readonly<Record<string, number>>;
  readonly loops: Readonly<Record<string, number>>;
  readonly spentUsd: number;
  readonly spendUnknown: readonly string[];
  readonly pending: PendingGate | null;
  readonly revise: GateInstruction | null;
  readonly toolCallCap: number | null;
  readonly interrupted: InterruptRecord | null;
  readonly outcome: string | null;
  // What clean-run.mts must never delete: the untracked files there before the run's first session.
  readonly untrackedAtStart?: readonly string[];
  // Where this run's commits start (HEAD before its first branch step).
  readonly branchStart?: string | null;
}

// lane.json as run.mts reads it back: lane.mts's record, whose lane a human may have changed with
// --lane or at a gate. Other fields pass through unread.
export interface LaneChoice {
  readonly lane: LaneId;
  readonly name: string;
  readonly maxUsd: number;
  readonly maxToolCalls: number;
  readonly confidence: number;
  readonly decidedBy: string;
  readonly reasons: readonly string[];
  readonly classifierUsd?: number | null;
  readonly features?: { readonly askFirst?: readonly string[] };
}

export interface SummaryStep {
  readonly step: string;
  readonly status: string;
  readonly predictedUsd: number | null;
  readonly reportedUsd: number | null;
  readonly usd: number | null;
  readonly permissionDenials: number;
  readonly result: string | null;
  readonly interrupted?: string;
  readonly sessionId?: string | null;
}

// The JSON summary --record-out writes when the run ends or stops.
export interface RunSummary {
  readonly issue: string;
  readonly runId: string;
  readonly harness: string;
  readonly harness_commit: string | null;
  readonly harness_dirty: boolean;
  readonly lane: LaneId;
  readonly steps: readonly SummaryStep[];
  readonly outcome: string | null;
  readonly spentUsd?: number;
  readonly spendUnknown?: readonly string[];
}

// --- reading run-state.json and lane.json ----------------------------------------------------

type Check<T> = (value: unknown) => value is T;

const isString: Check<string> = (value) => typeof value === 'string';
const isNumber: Check<number> = (value) => typeof value === 'number';
const isStringList: Check<readonly string[]> = (
  value
): value is readonly string[] =>
  Array.isArray(value) && value.every((item: unknown) => isString(item));
function isRecordOf<T>(check: Check<T>): Check<Readonly<Record<string, T>>> {
  return (value): value is Readonly<Record<string, T>> =>
    isRecord(value) && Object.values(value).every((item) => check(item));
}
function isNullable<T>(check: Check<T>): Check<T | null> {
  return (value): value is T | null => value === null || check(value);
}
function isOptional<T>(check: Check<T>): Check<T | undefined> {
  return (value): value is T | undefined => value === undefined || check(value);
}
const isGate: Check<Gate> = (value): value is Gate =>
  GATES.some((gate) => gate === value);
const isLane: Check<LaneId> = (value): value is LaneId =>
  LANES.some((lane) => lane === value);

const isPendingGate: Check<PendingGate> = (value): value is PendingGate =>
  isRecord(value) &&
  isString(value.step) &&
  isGate(value.gate) &&
  isString(value.status) &&
  isNullable(isNumber)(value.predictedUsd) &&
  isNullable(isNumber)(value.usd) &&
  isStringList(value.denials) &&
  isNullable(isString)(value.result) &&
  isString(value.snapshotCell) &&
  isOptional(isString)(value.presented);

const isGateInstruction: Check<GateInstruction> = (
  value
): value is GateInstruction =>
  isRecord(value) &&
  isString(value.step) &&
  isGate(value.gate) &&
  (value.kind === 'revise' || value.kind === 'loop') &&
  isString(value.text);

const isInterruptRecord: Check<InterruptRecord> = (
  value
): value is InterruptRecord =>
  isRecord(value) &&
  isNullable(isString)(value.step) &&
  isNullable(isGate)(value.gate) &&
  isString(value.signal) &&
  isString(value.at) &&
  isOptional(isNullable(isString))(value.sessionId) &&
  isOptional(isNullable(isNumber))(value.usd) &&
  isOptional(isNullable(isString))(value.result) &&
  isOptional(isNullable(isString))(value.transcript);

const isFeatures = (value: unknown): boolean =>
  isRecord(value) && isOptional(isStringList)(value.askFirst);

export const isLaneChoice: Check<LaneChoice> = (value): value is LaneChoice =>
  isRecord(value) &&
  isLane(value.lane) &&
  isString(value.name) &&
  isNumber(value.maxUsd) &&
  isNumber(value.maxToolCalls) &&
  isNumber(value.confidence) &&
  isString(value.decidedBy) &&
  isStringList(value.reasons) &&
  isOptional(isNullable(isNumber))(value.classifierUsd) &&
  (value.features === undefined || isFeatures(value.features));

const initialState = (runId: string): RunState => ({
  runId,
  approved: [],
  sessions: {},
  attempts: {},
  loops: {},
  spentUsd: 0,
  spendUnknown: [],
  pending: null,
  revise: null,
  toolCallCap: null,
  interrupted: null,
  outcome: null,
});

// The state a run continues from: the saved run-state.json over a new run's defaults (`runId` is the
// new run's id). Throws on a field it cannot read, naming it; fields it does not know are dropped.
export const runStateFrom = (saved: unknown, runId: string): RunState => {
  if (saved !== undefined && saved !== null && !isRecord(saved)) {
    throw new Error('run-state.json is not an object');
  }
  const value: JsonObject = {
    ...initialState(runId),
    ...(isRecord(saved) ? saved : {}),
  };
  function field<T>(name: string, check: Check<T>): T {
    const found = value[name];
    if (!check(found)) {
      throw new Error(`run-state.json: ${name} has an unexpected value`);
    }
    return found;
  }
  const untrackedAtStart = field('untrackedAtStart', isOptional(isStringList));
  const branchStart = field('branchStart', isOptional(isNullable(isString)));
  return {
    runId: field('runId', isString),
    approved: field('approved', isStringList),
    sessions: field('sessions', isRecordOf(isString)),
    attempts: field('attempts', isRecordOf(isNumber)),
    loops: field('loops', isRecordOf(isNumber)),
    spentUsd: field('spentUsd', isNumber),
    spendUnknown: field('spendUnknown', isStringList),
    pending: field('pending', isNullable(isPendingGate)),
    revise: field('revise', isNullable(isGateInstruction)),
    toolCallCap: field('toolCallCap', isNullable(isNumber)),
    interrupted: field('interrupted', isNullable(isInterruptRecord)),
    outcome: field('outcome', isNullable(isString)),
    ...(untrackedAtStart === undefined ? {} : { untrackedAtStart }),
    ...(branchStart === undefined ? {} : { branchStart }),
  };
};

// A run that handed off or escalated is over: a new run starts with --fresh.
export const isEnded = (state: Pick<RunState, 'outcome'>): boolean =>
  /^(?:handed off|escalated)/.test(state.outcome ?? '');

// --- transitions -----------------------------------------------------------------------------

// A step's spend counts toward the run; an unknown spend is listed, never counted as zero.
export const withSpend = (
  state: RunState,
  stepId: string,
  usd: number | null
): RunState => ({
  ...state,
  spentUsd: state.spentUsd + (usd ?? 0),
  spendUnknown:
    usd === null ? [...state.spendUnknown, stepId] : state.spendUnknown,
});

export const withAttempt = (state: RunState, stepId: string): RunState => ({
  ...state,
  attempts: { ...state.attempts, [stepId]: (state.attempts[stepId] ?? 0) + 1 },
});

// After a session that ran to its end: its spend counted, its session id kept for a step that
// resumes it, and the gate instruction it ran with done.
export const afterSession = (
  state: RunState,
  step: Pick<Step, 'id' | 'stage'>,
  outcome: Pick<StepOutcome, 'usd' | 'sessionId'>
): RunState => {
  const spent = withSpend({ ...state, revise: null }, step.id, outcome.usd);
  return outcome.sessionId
    ? {
        ...spent,
        sessions: { ...spent.sessions, [step.stage]: outcome.sessionId },
      }
    : spent;
};

export const withApproval = (state: RunState, stepId: string): RunState => ({
  ...state,
  approved: [...state.approved, stepId],
});

export const withRevise = (
  state: RunState,
  step: Pick<Step, 'id' | 'gate'>,
  text: string
): RunState => ({
  ...state,
  revise: { step: step.id, gate: step.gate, kind: 'revise', text },
});

// A gate that loops back to implement this often suggests an unsound approach: the run stops.
export const LOOP_BOUND: Readonly<Partial<Record<Gate, number>>> = {
  G5: 3,
  G6: 2,
};

export const withLoopCounted = (state: RunState, gate: Gate): RunState => ({
  ...state,
  loops: { ...state.loops, [gate]: (state.loops[gate] ?? 0) + 1 },
});

export const loopBoundReached = (gate: Gate, count: number): boolean => {
  const bound = LOOP_BOUND[gate];
  return bound !== undefined && count >= bound;
};

// Back to implement: approvals from implement on are dropped, and implement re-runs with the
// instruction. `target` is implement's index in the lane.
export const loopedBack = (
  state: RunState,
  steps: readonly Pick<Step, 'id' | 'stage'>[],
  gate: Gate,
  text: string
): { readonly state: RunState; readonly target: number } => {
  const target = steps.findIndex((step) => step.stage === 'implement');
  const implement = steps[target];
  if (!implement) throw new Error('loop: this lane has no implement step');
  return {
    target,
    state: {
      ...state,
      approved: state.approved.filter(
        (approved) => steps.findIndex((step) => step.id === approved) < target
      ),
      revise: { step: implement.id, gate, kind: 'loop', text },
    },
  };
};

// A gate shown again after a stop is presented anew.
export const withoutPresented = (gate: PendingGate): PendingGate =>
  omit(gate, 'presented');

export interface LaneChange {
  readonly lane: LaneId;
  readonly caps: Pick<LaneCaps, 'name' | 'maxUsd' | 'maxToolCalls'>;
  readonly decidedBy: string;
  readonly reason: string;
}

// A human's lane: the new lane's caps, who decided, and why, after the classifier's reasons.
export const withLane = (
  record: LaneChoice,
  { lane, caps, decidedBy, reason }: LaneChange
): LaneChoice => ({
  ...record,
  lane,
  name: caps.name,
  maxUsd: caps.maxUsd,
  maxToolCalls: caps.maxToolCalls,
  decidedBy,
  reasons: [...record.reasons, reason],
});

export const summaryStepOf = (
  stepId: string,
  outcome: StepOutcome
): SummaryStep => ({
  step: stepId,
  status: outcome.status,
  predictedUsd: outcome.predictedUsd,
  reportedUsd: outcome.reportedUsd,
  usd: outcome.usd,
  permissionDenials: outcome.denials.length,
  result: outcome.resultPath,
});

export const finishedSummary = (
  summary: RunSummary,
  state: Pick<RunState, 'spentUsd' | 'spendUnknown'>,
  outcome: string
): RunSummary => ({
  ...summary,
  outcome,
  spentUsd: Number(state.spentUsd.toFixed(6)),
  spendUnknown: state.spendUnknown,
});
