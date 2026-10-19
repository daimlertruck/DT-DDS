import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  afterSession,
  finishedSummary,
  isEnded,
  isLaneChoice,
  loopBoundReached,
  loopedBack,
  runStateFrom,
  summaryStepOf,
  withApproval,
  withAttempt,
  withLane,
  withLoopCounted,
  withRevise,
  withSpend,
  withoutPresented,
  type LaneChoice,
  type PendingGate,
  type RunState,
  type RunSummary,
} from './state.mts';

import type { StepOutcome } from './stage-outcome.mts';

const fresh = (): RunState => runStateFrom(undefined, '20261010T093000Z');

const GATE: PendingGate = {
  step: 'express:plan',
  gate: 'G1+G3',
  status: 'PASS',
  predictedUsd: 0.02,
  usd: 0.02,
  denials: [],
  result: '.local/agent-harness/work/257/usage/01-express-plan.json',
  snapshotCell: 'snapshots/01-G1+G3-express-plan.md · 0123456789abcdef',
};

const OUTCOME: StepOutcome = {
  status: 'PASS',
  predictedUsd: 0.0217,
  reportedUsd: 0.0216904,
  usd: 0.0217,
  sessionId: 'session-1',
  denials: ['Write README.md'],
  resultPath: '.local/agent-harness/work/257/usage/01-express-plan.json',
  transcriptPath: null,
  interrupted: null,
};

const LANE: LaneChoice = {
  lane: '0',
  name: 'Express',
  maxUsd: 3,
  maxToolCalls: 90,
  confidence: 0.9,
  decidedBy: 'rules',
  reasons: ['type:bug'],
  features: { askFirst: [] },
};

const LANE1 = [
  { id: 'gather-context', stage: 'gather-context' },
  { id: 'plan', stage: 'plan' },
  { id: 'implement', stage: 'implement' },
  { id: 'verify', stage: 'verify' },
  { id: 'review', stage: 'review' },
];

test('a new run starts empty under its run id; a saved state continues where it stopped', () => {
  assert.deepEqual(fresh(), {
    runId: '20261010T093000Z',
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
  const saved = {
    runId: '20261009T080000Z',
    approved: ['express:plan'],
    sessions: { express: 'session-1' },
    pending: { ...GATE, presented: '2026-10-09T08:01:00Z' },
    revise: { step: 'express:plan', gate: 'G1+G3', kind: 'revise', text: 'x' },
    untrackedAtStart: ['scratch.txt'],
    branchStart: null,
    lane: '0',
  };
  const state = runStateFrom(saved, 'new-id');
  assert.equal(state.runId, '20261009T080000Z');
  assert.deepEqual(state.approved, ['express:plan']);
  assert.equal(state.pending?.presented, '2026-10-09T08:01:00Z');
  assert.equal(state.revise?.text, 'x');
  assert.deepEqual(state.untrackedAtStart, ['scratch.txt']);
  assert.equal(state.branchStart, null);
  // run.mts writes the lane on every save; it is read from lane.json, not from here.
  assert.equal('lane' in state, false);
});

test('a saved state with a field it cannot read is refused, naming the field', () => {
  assert.throws(
    () => runStateFrom({ approved: 'express:plan' }, 'id'),
    /run-state\.json: approved has an unexpected value/
  );
  assert.throws(
    () => runStateFrom({ pending: { ...GATE, gate: 'G9' } }, 'id'),
    /run-state\.json: pending has an unexpected value/
  );
  assert.throws(
    () => runStateFrom([], 'id'),
    /run-state\.json is not an object/
  );
});

test('a run that handed off or escalated has ended', () => {
  assert.equal(isEnded({ outcome: 'handed off at G7' }), true);
  assert.equal(isEnded({ outcome: 'escalated' }), true);
  assert.equal(isEnded({ outcome: 'stopped at G3' }), false);
  assert.equal(isEnded({ outcome: null }), false);
});

test('lane.json reads back as a lane choice; extra fields pass through, a broken one is refused', () => {
  assert.equal(isLaneChoice({ ...LANE, issue: 257, decidedAt: 'now' }), true);
  assert.equal(isLaneChoice({ ...LANE, lane: '3' }), false);
  assert.equal(isLaneChoice({ ...LANE, reasons: 'type:bug' }), false);
  assert.equal(isLaneChoice({ ...LANE, features: { askFirst: 'x' } }), false);
  assert.equal(isLaneChoice(null), false);
});

test('a session that ran to its end counts its spend, keeps its session id and clears its instruction', () => {
  const state = {
    ...fresh(),
    revise: { step: 'plan', gate: 'G3', kind: 'revise', text: 'x' },
  } satisfies RunState;

  const after = afterSession(
    state,
    { id: 'express:plan', stage: 'express' },
    OUTCOME
  );

  assert.equal(after.spentUsd, 0.0217);
  assert.deepEqual(after.sessions, { express: 'session-1' });
  assert.equal(after.revise, null);
  assert.deepEqual(state.sessions, {}, 'the input is not changed');
  const unknown = afterSession(
    after,
    { id: 'express:apply', stage: 'express' },
    {
      usd: null,
      sessionId: null,
    }
  );
  assert.equal(unknown.spentUsd, 0.0217);
  assert.deepEqual(unknown.spendUnknown, ['express:apply']);
  assert.deepEqual(unknown.sessions, { express: 'session-1' });
});

test('attempts, approvals and revise instructions accumulate per step', () => {
  const twice = withAttempt(withAttempt(fresh(), 'plan'), 'plan');
  assert.deepEqual(twice.attempts, { plan: 2 });
  assert.deepEqual(withApproval(twice, 'plan').approved, ['plan']);
  assert.deepEqual(
    withRevise(twice, { id: 'plan', gate: 'G3' }, 'shorter').revise,
    {
      step: 'plan',
      gate: 'G3',
      kind: 'revise',
      text: 'shorter',
    }
  );
  assert.equal(withSpend(fresh(), 'plan', 0.5).spentUsd, 0.5);
});

test('loops are counted per gate and bounded at G5 and G6', () => {
  const once = withLoopCounted(fresh(), 'G5');
  const twice = withLoopCounted(once, 'G5');
  assert.deepEqual(twice.loops, { G5: 2 });
  assert.equal(loopBoundReached('G5', 2), false);
  assert.equal(loopBoundReached('G5', 3), true);
  assert.equal(loopBoundReached('G6', 2), true);
  assert.equal(loopBoundReached('G7', 9), false);
});

test('a loop goes back to implement: approvals from implement on are dropped, implement gets the instruction', () => {
  const state = {
    ...fresh(),
    approved: ['gather-context', 'plan', 'implement', 'verify'],
  };

  const back = loopedBack(state, LANE1, 'G6', 'fix the story');

  assert.equal(back.target, 2);
  assert.deepEqual(back.state.approved, ['gather-context', 'plan']);
  assert.deepEqual(back.state.revise, {
    step: 'implement',
    gate: 'G6',
    kind: 'loop',
    text: 'fix the story',
  });
  assert.throws(
    () => loopedBack(state, LANE1.slice(0, 2), 'G3', 'x'),
    /no implement step/
  );
});

test("a human's lane keeps the classifier's record and adds why; a re-shown gate is presented anew", () => {
  const changed = withLane(
    { ...LANE, features: { askFirst: ['scripts/a'] } },
    {
      lane: '1',
      caps: { name: 'Standard', maxUsd: 10, maxToolCalls: 560 },
      decidedBy: 'human at G1+G3',
      reason: 'human override at G1+G3: lane 1',
    }
  );

  assert.deepEqual(changed, {
    ...LANE,
    lane: '1',
    name: 'Standard',
    maxUsd: 10,
    maxToolCalls: 560,
    decidedBy: 'human at G1+G3',
    reasons: ['type:bug', 'human override at G1+G3: lane 1'],
    features: { askFirst: ['scripts/a'] },
  });
  assert.deepEqual(withoutPresented({ ...GATE, presented: 'then' }), GATE);
});

test('the run summary lists each step and ends with the outcome and the spend', () => {
  const summary: RunSummary = {
    issue: '257',
    runId: 'r',
    harness: 'claude',
    harness_commit: null,
    harness_dirty: false,
    lane: '0',
    steps: [summaryStepOf('express:plan', OUTCOME)],
    outcome: null,
  };

  assert.deepEqual(summary.steps, [
    {
      step: 'express:plan',
      status: 'PASS',
      predictedUsd: 0.0217,
      reportedUsd: 0.0216904,
      usd: 0.0217,
      permissionDenials: 1,
      result: '.local/agent-harness/work/257/usage/01-express-plan.json',
    },
  ]);
  const finished = finishedSummary(
    summary,
    { spentUsd: 0.1 + 0.2, spendUnknown: ['express:apply'] },
    'stopped at G7'
  );
  assert.equal(finished.outcome, 'stopped at G7');
  assert.equal(finished.spentUsd, 0.3);
  assert.deepEqual(finished.spendUnknown, ['express:apply']);
  assert.deepEqual(Object.keys(finished), [
    'issue',
    'runId',
    'harness',
    'harness_commit',
    'harness_dirty',
    'lane',
    'steps',
    'outcome',
    'spentUsd',
    'spendUnknown',
  ]);
});
