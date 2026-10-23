import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  activeRunOf,
  budgetStopOf,
  callsIn,
  leftUsd,
  readinessOf,
  redFlags,
  runCapUsd,
  stepKeyOf,
  toolCallCapOf,
  type GitState,
} from './checks.mts';

const view = (
  state: string,
  labels: readonly string[],
  logins: readonly string[] = []
): unknown => ({
  state,
  labels: labels.map((name) => ({ name })),
  assignees: logins.map((login) => ({ login })),
});

test('an issue runs only when it is open and claimed by the user', () => {
  assert.equal(
    readinessOf('7', view('OPEN', ['status:in progress'], ['ana']), 'ana'),
    null
  );
  assert.equal(
    readinessOf('7', view('CLOSED', ['status:ready']), 'ana'),
    'issue 7 is CLOSED'
  );
  assert.equal(
    readinessOf('7', view('OPEN', ['status:in progress'], ['bo']), 'ana'),
    'BLOCKED-NOT-READY: issue 7 is neither status:ready nor claimed by ana'
  );
  assert.equal(
    readinessOf('7', view('OPEN', ['status:ready']), 'ana'),
    'issue 7 is not claimed. The human runs: gh issue edit 7 --add-assignee @me --remove-label "status:ready" --add-label "status:in progress"'
  );
  assert.equal(readinessOf('7', 'not json', 'ana'), 'issue 7 is undefined');
});

test('the run cap is the lower of --budget-usd and the lane cap; the next session gets what is left', () => {
  assert.equal(runCapUsd(null, 3), 3);
  assert.equal(runCapUsd(0.5, 3), 0.5);
  assert.equal(runCapUsd(10, 3), 3);
  assert.equal(leftUsd({ budgetUsd: null, maxUsd: 3, spentUsd: 0.25 }), 2.75);
});

test('the run stops before a step once less than a cent is left, naming the cap that tripped', () => {
  assert.equal(
    budgetStopOf(
      { budgetUsd: null, maxUsd: 3, spentUsd: 2.98 },
      '0',
      'express:apply'
    ),
    null
  );
  assert.match(
    budgetStopOf({ budgetUsd: null, maxUsd: 3, spentUsd: 2.991 }, '0', 'x') ??
      '',
    /^run budget: lane 0 cap \$3 reached \(\$2\.9910 spent\)/
  );
  assert.equal(
    budgetStopOf(
      { budgetUsd: null, maxUsd: 3, spentUsd: 3.2 },
      '0',
      'express:apply'
    ),
    'run budget: lane 0 cap $3 reached ($3.2000 spent); stopped before express:apply'
  );
  assert.equal(
    budgetStopOf(
      { budgetUsd: 0.025, maxUsd: 3, spentUsd: 0.0217 },
      '0',
      'express:apply'
    ),
    '--budget-usd 0.025 spent ($0.0217); stopped before express:apply'
  );
  // A --budget-usd above the lane cap is not what tripped.
  assert.match(
    budgetStopOf({ budgetUsd: 5, maxUsd: 3, spentUsd: 3 }, '1', 'plan') ?? '',
    /^run budget: lane 1 cap \$3 reached/
  );
});

test('a session gets its step cap or the raised cap, whichever is higher; its calls are counted by step key', () => {
  assert.equal(toolCallCapOf(30, null), 30);
  assert.equal(toolCallCapOf(30, 120), 120);
  assert.equal(toolCallCapOf(60, 40), 60);
  assert.equal(stepKeyOf('express:plan', 2), 'express:plan#2');
  const ledger = [
    '2026-10-10T09:00:00Z Read express:plan#1',
    '2026-10-10T09:00:01Z Bash express:plan#2',
    '2026-10-10T09:00:02Z Read express:plan#2',
    '',
  ].join('\n');
  assert.equal(callsIn(ledger, 'express:plan#2'), 2);
  assert.equal(callsIn(ledger, 'express:apply#1'), 0);
});

test('the active-run file names the issue, the cap and, during a session, its step key', () => {
  assert.deepEqual(
    activeRunOf({
      id: '257',
      lane: '0',
      maxToolCalls: 30,
      stepKey: 'express:plan#1',
      pid: 42,
      runId: 'r',
    }),
    {
      issue: 257,
      lane: '0',
      maxToolCalls: 30,
      step: 'express:plan#1',
      pid: 42,
      runId: 'r',
    }
  );
  assert.deepEqual(
    activeRunOf({
      id: 'dry-run-1',
      lane: '1',
      maxToolCalls: 0,
      stepKey: null,
      pid: 42,
      runId: 'r',
    }),
    {
      issue: 'dry-run-1',
      lane: '1',
      maxToolCalls: 1,
      pid: 42,
      runId: 'r',
    }
  );
});

test('red flags: a work-dir step moved HEAD or changed tracked files; a fixups step rewrote history', () => {
  const before: GitState = {
    head: 'a'.repeat(40),
    branch: 'fix/1/y',
    status: '',
    remoteRefs: [],
  };

  assert.deepEqual(
    redFlags({ id: 'plan', writes: 'work-dir' }, before, {
      ...before,
      head: 'b',
      status: ' M README.md',
    }),
    [
      'plan may write only under .local/agent-harness/work/, but HEAD moved',
      'plan may write only under .local/agent-harness/work/, but tracked files changed:\n M README.md',
    ]
  );
  assert.deepEqual(
    redFlags(
      { id: 'verify', writes: 'fixups' },
      before,
      { ...before, head: 'b' },
      null
    ),
    ['verify moved HEAD off aaaaaaaaaaaa (a history rewrite)']
  );
  assert.deepEqual(
    redFlags({ id: 'verify', writes: 'fixups' }, before, {
      ...before,
      status: '?? x',
    }),
    [
      'verify may write only under .local/agent-harness/work/ and commit fixups, but tracked files changed:\n?? x',
    ]
  );
  assert.deepEqual(
    redFlags({ id: 'implement', writes: 'branch' }, before, {
      ...before,
      head: 'b',
      branch: 'HEAD',
    }),
    ['implement committed on HEAD, not on a feature branch']
  );
  assert.deepEqual(
    redFlags({ id: 'plan', writes: 'work-dir' }, before, before),
    []
  );
});
