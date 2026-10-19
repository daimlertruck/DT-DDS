import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  commentOf,
  pullRequestOutcomeOf,
  runFileOf,
  runFilePathOf,
} from './run-file.mts';

import type { Outcome } from './record-json.mts';

const RUN_LOG = `# Run log — #42 Example change

Base: 0123456789abcdef0123456789abcdef01234567

## Gate decisions

| gate | presented | decided | decision | snapshot | note |
|---|---|---|---|---|---|
| G1 | 2026-01-05T09:00:00Z | 2026-01-05T09:30:00Z | approve; consent: .github/ci.yml (A Maintainer, maintainer) | snapshots/01-G1-context-bundle.md · sha256:aaaaaaaaaaaaaaaa | consent recorded |
| G6 | 2026-01-05T11:00:00Z | 2026-01-05T11:05:00Z | loop: the new story throws in Storybook | — | clean: no |
| G6 (loop 1) | 2026-01-05T12:00:00Z | 2026-01-05T12:01:00Z | approve | — | clean: yes |
| G7 | 2026-01-05T14:00:00Z | 2026-01-05T15:00:00Z | approve | — | handed off |

## Dispatches

| stage | started | wall time (s) | model | requests | uncached_in | cache_write | cache_read | output | predicted_usd | reported_usd | final_context | claude_code | status line |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| gather-context | 2026-01-05T08:50:00Z | 600 | claude-sonnet-5-5 | 20 | 40 | 60000 | 1200000 | 9000 | 0.570080 | 0.570080 | 95000 | 2.1.302 | PASS |
| gather-context | 2026-01-05T08:50:00Z | — | claude-haiku-4-5 | — | 1500 | 12000 | 40000 | 90 | 0.029950 | 0.029950 | — | — | — |
| implement | 2026-01-05T10:00:00Z | 3000 | claude-opus-5-5 | 60 | 120 | 200000 | 6000000 | 40000 | 3.600480 | 3.600480 | 180000 | 2.1.302 | PASS |
| implement (continuation) | 2026-01-05T11:10:00Z | 500 (incl. wait for human) | claude-opus-5-5 | 10 | 20 | 30000 | 1500000 | 5000 | 0.640080 | 0.640080 | 190000 | 2.1.302 | PASS |

## Human actions between gates

| when (UTC start and end) | kind | action | before → after (HEAD, tree) | evidence | evidence made stale |
|---|---|---|---|---|---|
| 2026-01-05T12:30:00Z – 2026-01-05T12:50:00Z | check | Storybook checklist, 4/4 items | — | per-item answers | — |
`;

const LANE = {
  lane: '1',
  name: 'Standard',
  decidedBy: 'rules',
  confidence: 0.8,
} as const;

const fileOf = () =>
  runFileOf({
    id: '42',
    runLog: RUN_LOG,
    lane: LANE,
    harness: { commit: 'f'.repeat(40), dirty: false },
    toolCalls: 123,
  });

test('the run file lives in docs/agent-harness/runs, named after the issue', () => {
  assert.equal(runFilePathOf('42'), 'docs/agent-harness/runs/42.json');
});

test('a run file holds the lane, the totals, each stage and each gate', () => {
  const file = fileOf();

  assert.ok(file);
  assert.equal(file.schema, 1);
  assert.equal(file.issue, 42);
  assert.deepEqual(file.lane, LANE);
  assert.equal(file.base, '0123456789abcdef0123456789abcdef01234567');
  assert.deepEqual(file.harness, {
    commit: 'f'.repeat(40),
    dirty: false,
    claudeCode: ['2.1.302'],
  });
  assert.equal(file.started, '2026-01-05T08:50:00Z');
  assert.equal(file.handedOff, '2026-01-05T15:00:00Z');
  assert.deepEqual(file.totals, {
    listUsd: 4.84059,
    reportedUsd: 4.84059,
    requests: 90,
    uncachedIn: 1680,
    cacheWrite: 302000,
    cacheRead: 8740000,
    output: 54090,
    stageSeconds: 3600,
    toolCalls: 123,
  });
  assert.deepEqual(
    file.stages.map(({ stage, models, listUsd, seconds }) => [
      stage,
      models,
      listUsd,
      seconds,
    ]),
    [
      [
        'gather-context',
        ['claude-haiku-4-5', 'claude-sonnet-5-5'],
        0.60003,
        600,
      ],
      ['implement', ['claude-opus-5-5'], 4.24056, 3000],
    ]
  );
  assert.deepEqual(file.gates, [
    { gate: 'G1', iteration: 1, decision: 'approve', waitSeconds: 1800 },
    { gate: 'G6', iteration: 1, decision: 'loop', waitSeconds: 300 },
    { gate: 'G6', iteration: 2, decision: 'approve', waitSeconds: 60 },
    { gate: 'G7', iteration: 1, decision: 'approve', waitSeconds: 3600 },
  ]);
  assert.equal(file.humanActions, 1);
});

test('the run file leaves out the text of gate replies, notes and human actions', () => {
  const text = JSON.stringify(fileOf());

  assert.doesNotMatch(text, /A Maintainer|consent|throws|Storybook|snapshots/);
});

test('only an issue run gets a run file', () => {
  assert.equal(
    runFileOf({
      id: 'smoke-1',
      runLog: RUN_LOG,
      lane: LANE,
      harness: { commit: null, dirty: false },
      toolCalls: 0,
    }),
    null
  );
});

const OUTCOME: Outcome = {
  asOf: '2026-01-07T10:00:00Z',
  mergedAt: '2026-01-06T16:00:00Z',
  firstCi: 'success',
  reviewRounds: 2,
  reviewComments: 3,
  commitsAfterPrOpen: 1,
  forcePushes: 0,
  reverts: [],
  laterDefects: [],
};

test('the issue comment sums up the run and the pull request outcome', () => {
  const file = fileOf();
  assert.ok(file);

  const comment = commentOf(file, { pr: 77, outcome: OUTCOME });

  assert.match(comment, /^#### Agentic run record: Lane 1 \(Standard\)$/m);
  assert.match(comment, /\| Token cost \(list price\) \| \$4\.8406 \|/);
  assert.match(comment, /\| Requests · tool calls \| 90 · 123 \|/);
  assert.match(comment, /\| Gates \| 4: 3 approve, 1 loop \|/);
  assert.match(
    comment,
    /\| Pull request \| #77, merged 2026-01-06 · 2 reviews, 3 comments · 1 commit after it opened \|/
  );
  assert.match(
    comment,
    /^\| implement \| claude-opus-5-5 \| \$4\.2406 \| 50 min \|$/m
  );
  assert.match(comment, /`docs\/agent-harness\/runs\/42\.json`/);
});

test('an issue comment without a pull request says so', () => {
  const file = fileOf();
  assert.ok(file);

  assert.match(
    commentOf(file, { pr: null, outcome: null }),
    /\| Pull request \| none found \|/
  );
});

test('the PR number and outcome are read from record.json, and nothing else from it', () => {
  assert.deepEqual(
    pullRequestOutcomeOf({ pr: 77, outcome: OUTCOME, gates: [] }),
    {
      pr: 77,
      outcome: {
        mergedAt: '2026-01-06T16:00:00Z',
        reviewRounds: 2,
        reviewComments: 3,
        commitsAfterPrOpen: 1,
      },
    }
  );
  assert.deepEqual(pullRequestOutcomeOf({ pr: '77', outcome: 'x' }), {
    pr: null,
    outcome: null,
  });
  assert.deepEqual(pullRequestOutcomeOf(null), { pr: null, outcome: null });
});
