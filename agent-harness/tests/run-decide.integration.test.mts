import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { test } from 'node:test';

import {
  setup,
  type FakeClaude,
  fakeClaude,
  ARGS,
  work,
  gates,
  stateOf,
  promptOf,
  activePath,
} from './run-support.mts';

// A session drives the run. --no-wait runs to the next gate and exits with it pending; --decide
// "<reply>" answers that gate with the human's reply, verbatim, then does the same. Neither reads
// stdin, so a session never answers a gate by accident.
const drive = (
  root: string,
  claude: FakeClaude,
  extra: readonly string[],
  input = ''
): SpawnSyncReturns<string> =>
  spawnSync('node', ARGS(root, extra), {
    encoding: 'utf8',
    env: claude.env,
    input,
  });
const backdatePending = (root: string, presented: string): void => {
  const state = stateOf(root);
  writeFileSync(
    work(root, 'run-state.json'),
    JSON.stringify({ ...state, pending: { ...state.pending, presented } })
  );
};

test('--no-wait runs to the first gate and exits with it pending: no row, stdin unread, no run file', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = drive(root, claude, ['--no-wait'], 'approve\n');

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /── G1\+G3 after express:plan · status: PASS/);
  assert.match(result.stdout, /summary of call 1/);
  assert.match(
    result.stdout,
    /^Pending at G1\+G3\. Answer with: node agent-harness\/scripts\/run\.mts 257 --decide "<reply>"$/m
  );
  assert.equal(claude.calls().length, 1);
  assert.deepEqual(gates(root), []);
  assert.equal(stateOf(root).pending?.gate, 'G1+G3');
  assert.match(
    stateOf(root).pending?.presented ?? '',
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/
  );
  assert.deepEqual(stateOf(root).approved, []);
  assert.equal(existsSync(activePath(root)), false);
});

test('--no-wait on a pending gate shows it again and keeps when it was first presented', () => {
  const root = setup();
  const claude = fakeClaude(root);
  drive(root, claude, ['--no-wait']);
  backdatePending(root, '2026-01-01T00:00:00Z');

  const again = drive(root, claude, ['--no-wait']);

  assert.equal(again.status, 0, again.stderr);
  assert.match(
    again.stdout,
    /its G1\+G3 gate is pending from an earlier session; shown again/
  );
  assert.match(again.stdout, /summary of call 1/);
  assert.match(again.stdout, /^Pending at G1\+G3\./m);
  assert.equal(claude.calls().length, 1);
  assert.equal(stateOf(root).pending?.presented, '2026-01-01T00:00:00Z');
});

test('--decide answers the pending gate verbatim, echoes the row, runs on and stops at the next gate', () => {
  const root = setup();
  const claude = fakeClaude(root);
  drive(root, claude, ['--no-wait']);
  backdatePending(root, '2026-01-01T00:00:00Z');

  const result = drive(
    root,
    claude,
    ['--decide', 'approve; plan reads well'],
    'stop\n'
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^ {3}recorded at G1\+G3: approve \(approve; plan reads well\)$/m
  );
  assert.doesNotMatch(result.stdout, /summary of call 1/);
  assert.match(result.stdout, /── G7 after express:apply · status: PASS/);
  assert.match(result.stdout, /^Pending at G7\./m);
  assert.equal(claude.calls().length, 2);
  const [row] = gates(root);
  assert.deepEqual(
    [row?.gate, row?.presented, row?.decision],
    ['G1+G3', '2026-01-01T00:00:00Z', 'approve (approve; plan reads well)']
  );
  assert.notEqual(row?.decided, row?.presented);
  assert.equal(stateOf(root).pending?.gate, 'G7');

  const last = drive(root, claude, ['--decide', 'approve']);
  assert.equal(last.status, 0, last.stderr);
  assert.match(last.stdout, /G7 approved\. The human pushes/);
  assert.deepEqual(
    gates(root).map(({ gate, decision }) => [gate, decision]),
    [
      ['G1+G3', 'approve (approve; plan reads well)'],
      ['G7', 'approve'],
    ]
  );
  assert.equal(stateOf(root).outcome, 'handed off at G7');
  assert.equal(existsSync(activePath(root)), false);
});

test('--decide with no gate pending is refused before anything runs or is written', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = drive(root, claude, ['--decide', 'approve']);

  assert.equal(result.status, 2);
  assert.match(result.stderr, /no gate is pending for 257/);
  assert.deepEqual(claude.calls(), []);
  assert.equal(existsSync(work(root)), false);
});

test('a refused --decide reply leaves the gate pending, records nothing and quotes the reply', () => {
  const root = setup();
  const claude = fakeClaude(root, { statuses: ['BLOCKER: lane — 4 packages'] });
  drive(root, claude, ['--no-wait']);

  const unknown = drive(root, claude, [
    '--decide',
    '1. file a follow-up, 2. fix it here. Approve',
  ]);
  const blocked = drive(root, claude, ['--decide', 'approve']);

  assert.equal(unknown.status, 2);
  assert.match(
    unknown.stderr,
    /reply refused at G1\+G3: not a decision \(reply approve, revise: <instruction>, lane:N or stop\)\. Reply as received: "1\. file a follow-up, 2\. fix it here\. Approve"/
  );
  assert.equal(blocked.status, 2);
  assert.match(
    blocked.stderr,
    /reply refused at G1\+G3: the step did not pass \(BLOCKER: lane — 4 packages\)/
  );
  assert.deepEqual(gates(root), []);
  assert.equal(stateOf(root).pending?.gate, 'G1+G3');
  assert.equal(claude.calls().length, 1);
  assert.equal(existsSync(activePath(root)), false);
});

test('--decide revise: re-runs the step with a multi-line instruction verbatim; the row stays one row', () => {
  const root = setup();
  const claude = fakeClaude(root);
  drive(root, claude, ['--no-wait']);

  const result = drive(root, claude, [
    '--decide',
    'revise: name the test file\nand keep the plan under 20 lines',
  ]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    promptOf(claude.calls()[1]),
    /Revise instruction from the gate \(verbatim\): name the test file\nand keep the plan under 20 lines/
  );
  assert.deepEqual(
    gates(root).map(({ decision }) => decision),
    ['revise: name the test file<br>and keep the plan under 20 lines']
  );
  assert.match(result.stdout, /^Pending at G1\+G3\./m);
});

test('--decide cannot be combined with --dry or --fresh', () => {
  const root = setup();
  const claude = fakeClaude(root);

  ['--dry', '--fresh'].forEach((flag) => {
    const result = drive(root, claude, ['--decide', 'approve', flag]);
    assert.equal(result.status, 2, flag);
    assert.match(
      result.stderr,
      new RegExp(`--decide cannot be combined with ${flag}`)
    );
  });
  assert.deepEqual(claude.calls(), []);
});
