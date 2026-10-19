import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  WORK_FILES,
  issueWith,
  prNode,
  readRecord,
  run,
} from './record-run-test-support.mts';
import { createRepo, fakeGh } from '../lib/test-support.mts';

test('record.json reads the gate, dispatch and human-action tables; clean is the verdict as presented, waits are not stage time', () => {
  const root = createRepo({ 42: WORK_FILES });
  const gh = fakeGh({ stdout: issueWith(prNode('MERGED')) });

  run(root, gh, '42', '--apply');

  const record = readRecord(root, '42');
  assert.equal(record.schema, 2);
  assert.equal(record.issue, 42);
  assert.equal(record.base, '0123456789abcdef0123456789abcdef01234567');
  assert.equal(record.gates.length, 6);
  assert.deepEqual(
    record.gates.map(({ seq, gate, iteration, decision, clean }) => [
      seq,
      gate,
      iteration,
      decision,
      clean,
    ]),
    [
      [1, 'G1', 1, 'approve', null],
      [2, 'G4', 1, 'approve', true],
      [3, 'G5', 1, 'revise', false],
      [4, 'G5', 2, 'approve', false],
      [5, 'G5', 3, 'approve', false],
      [6, 'G7', 1, 'approve', null],
    ]
  );
  assert.equal(
    record.gates[2]?.verbatim,
    'revise: reword the summary | keep the checklist'
  );
  assert.equal(record.gates[0]?.snapshot, 'snapshots/01-G1-context-bundle.md');
  assert.equal(record.gates[0]?.snapshotSha256, 'aaaaaaaaaaaaaaaa');
  assert.equal(record.gates[2]?.snapshot, null);
  assert.deepEqual(record.gates[0]?.labels, []);
  assert.deepEqual(
    record.dispatches.map(
      ({
        dispatch,
        stage,
        continuation,
        seconds,
        model,
        requests,
        finalContext,
      }) => [
        dispatch,
        stage,
        continuation,
        seconds,
        model,
        requests,
        finalContext,
      ]
    ),
    [
      [1, 'ds-gather-context', false, 600, 'claude-sonnet-5-5', 20, 95000],
      [1, 'ds-gather-context', false, null, 'claude-haiku-4-5', null, null],
      [2, 'ds-implement-plan', false, 3000, 'claude-opus-5-5', 60, 180000],
      [3, 'ds-implement-plan', true, 500, 'claude-opus-5-5', 10, 190000],
      [4, 'ds-verify-changes', false, 900, null, null, null],
      [5, 'ds-code-review', false, 400, 'claude-sonnet-5-5', 15, 80000],
      [6, 'ds-code-review', true, null, 'claude-sonnet-5-5', 5, 85000],
    ]
  );
  assert.deepEqual(record.dispatches[1], {
    dispatch: 1,
    stage: 'ds-gather-context',
    continuation: false,
    started: '2026-01-05T08:50:00Z',
    seconds: null,
    model: 'claude-haiku-4-5',
    requests: null,
    uncachedIn: 1500,
    cacheWrite: 12000,
    cacheRead: 40000,
    output: 90,
    predictedUsd: 0.02995,
    reportedUsd: 0.02995,
    finalContext: null,
    claudeCode: null,
    status: '—',
  });
  assert.deepEqual(record.run, {
    started: '2026-01-05T08:50:00Z',
    handedOff: '2026-01-05T15:00:00Z',
    dispatches: 4,
    continuations: 2,
    stageSeconds: 5400,
    requests: 110,
    uncachedIn: 1720,
    cacheWrite: 362000,
    cacheRead: 9740000,
    output: 62090,
    predictedUsd: 5.36067,
    reportedUsd: 5.36067,
    claudeCode: [],
    byModel: {
      'claude-haiku-4-5': {
        requests: null,
        uncachedIn: 1500,
        cacheWrite: 12000,
        cacheRead: 40000,
        output: 90,
        predictedUsd: 0.02995,
        reportedUsd: 0.02995,
      },
      'claude-opus-5-5': {
        requests: 70,
        uncachedIn: 140,
        cacheWrite: 230000,
        cacheRead: 7500000,
        output: 45000,
        predictedUsd: 4.24056,
        reportedUsd: 4.24056,
      },
      'claude-sonnet-5-5': {
        requests: 40,
        uncachedIn: 80,
        cacheWrite: 120000,
        cacheRead: 2200000,
        output: 17000,
        predictedUsd: 1.09016,
        reportedUsd: 1.09016,
      },
    },
  });
  assert.equal('tokens' in record.run, false);
  assert.equal(record.humanActions.length, 2);
  assert.deepEqual(record.humanActions[0], {
    when: '2026-01-05T11:06:00Z – 2026-01-05T11:08:00Z',
    kind: 'history',
    action: 'autosquash',
    beforeAfter: '1111111 → 2222222',
    evidence: 'reflog rebase (finish)',
    evidenceMadeStale: 'none',
  });
});

test('an older run log: its tokens column is a final context size, never summed; cumulative cells are unknown', () => {
  const legacy = `# Run log — #42

## Dispatches

| stage | started | wall time (s) | tokens | status line |
|---|---|---|---|---|
| ds-gather-context | 2026-01-05T08:50:00Z | 596 | 146469 | PASS |
| ds-check-architecture | 2026-01-05T09:10:00Z | 1228 | 150867 | PASS |
| ds-check-architecture (continuation) | 2026-01-05T09:40:00Z | 1500 (cumulative) | 160000 (cumulative) | PASS |
`;
  const root = createRepo({ 42: { 'run-log.md': legacy } });
  const gh = fakeGh({ stdout: issueWith(prNode('OPEN')) });

  run(root, gh, '42', '--apply');

  const { dispatches, run: summary } = readRecord(root, '42');
  assert.deepEqual(
    dispatches.map(({ seconds, finalContext, model, cacheRead }) => [
      seconds,
      finalContext,
      model,
      cacheRead,
    ]),
    [
      [596, 146469, null, null],
      [1228, 150867, null, null],
      [null, null, null, null],
    ]
  );
  assert.equal(summary.dispatches, 2);
  assert.equal(summary.continuations, 1);
  assert.equal(summary.stageSeconds, 1824);
  assert.equal(summary.cacheRead, null);
  assert.equal(summary.predictedUsd, null);
  assert.deepEqual(summary.byModel, {});
});

test('a combined G1+G3 gate keeps its name, and the run lists the Claude Code versions', () => {
  const runLog = [
    '# Run log — 42',
    '',
    'Base: 0123456789abcdef0123456789abcdef01234567',
    '',
    '## Dispatches',
    '',
    '| stage | started | wall time (s) | model | requests | uncached_in | cache_write | cache_read | output | predicted_usd | reported_usd | final_context | claude_code | status line |',
    '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
    '| express-plan | 2026-10-10T10:00:00Z | 60 | claude-sonnet-5-5 | 12 | 10 | 20000 | 200000 | 3000 | 0.100000 | 0.100000 | 30000 | 2.1.296 | PASS |',
    '',
    '## Gate decisions',
    '',
    '| gate | presented | decided | decision | snapshot | note |',
    '|---|---|---|---|---|---|',
    '| G1+G3 | 2026-10-10T10:01:00Z | 2026-10-10T10:05:00Z | approve | — | status: PASS |',
    '',
  ].join('\n');
  const root = createRepo({ 42: { ...WORK_FILES, 'run-log.md': runLog } });

  run(root, fakeGh({ stdout: issueWith(prNode('MERGED')) }), '42', '--apply');

  const record = readRecord(root, '42');
  assert.deepEqual(
    record.gates.map(({ gate }) => gate),
    ['G1+G3']
  );
  assert.equal(record.dispatches[0]?.claudeCode, '2.1.296');
  assert.deepEqual(record.run.claudeCode, ['2.1.296']);
});
