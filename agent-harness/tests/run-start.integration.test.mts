import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  ISSUE_257,
  ISSUE_UNLABELLED,
  setup,
  withHealthChecks,
  fakeClaude,
  run,
  work,
  stateOf,
  promptOf,
  activePath,
} from './run-support.mts';
import { git } from '../scripts/lib/test-support.mts';

// Every brief tells the stage to read work/<N>/issue.json.
test('--issue-file is copied to the work dir; a different issue.json there is refused', () => {
  const root = setup();
  run(root, fakeClaude(root), ['stop']);
  assert.deepEqual(
    JSON.parse(readFileSync(work(root, 'issue.json'), 'utf8')),
    JSON.parse(ISSUE_257)
  );

  const other = setup();
  mkdirSync(work(other), { recursive: true });
  writeFileSync(
    work(other, 'issue.json'),
    JSON.stringify({
      number: 257,
      title: 'another issue',
      labels: [],
      body: '',
    })
  );
  const claude = fakeClaude(other);
  const result = run(other, claude, ['stop']);

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /work\/257\/issue\.json differs from --issue-file/
  );
  assert.deepEqual(claude.calls(), []);
});

// A finished work dir must not rerun as "approved earlier, skipped" on the old ledger.
test('a run that was handed off is not rerun; --fresh moves the work dir aside and starts a new run', () => {
  const root = setup();
  const claude = fakeClaude(root);
  run(root, claude, ['approve', 'approve']);
  const firstRun = stateOf(root).runId;

  const again = run(root, claude, ['approve', 'approve']);
  assert.equal(again.status, 1);
  assert.match(again.stderr, /run .* ended \(handed off at G7\).*--fresh/s);
  assert.equal(claude.calls().length, 2);

  const fresh = run(root, claude, ['stop'], ['--fresh']);
  assert.equal(fresh.status, 0, fresh.stderr);
  const aside = readdirSync(join(root, '.local/agent-harness/work')).filter(
    (name) => /^257\.\d{8}T\d{6}Z$/.test(name)
  );
  assert.equal(aside.length, 1);
  assert.ok(
    existsSync(
      join(root, '.local/agent-harness/work', aside[0] ?? '', 'run-state.json')
    )
  );
  assert.notEqual(stateOf(root).runId, firstRun);
  assert.equal(claude.calls().length, 3);
  assert.equal(claude.activeSeen(3).runId, stateOf(root).runId);
});

test('a run file whose process is gone is stale and removed; a live one for another issue refuses', () => {
  const root = setup();
  mkdirSync(join(root, '.local/agent-harness/work'), { recursive: true });
  const dead = spawnSync('true').pid;
  writeFileSync(
    activePath(root),
    JSON.stringify({
      issue: 999,
      lane: '1',
      maxToolCalls: 250,
      pid: dead,
    })
  );
  const claude = fakeClaude(root);

  const stale = run(root, claude, ['stop']);
  assert.equal(stale.status, 0, stale.stderr);
  assert.match(
    stale.stdout,
    /stale run file .*issue 999.*not running.*removed/
  );

  writeFileSync(
    activePath(root),
    JSON.stringify({
      issue: 999,
      lane: '1',
      maxToolCalls: 250,
      pid: process.pid,
    })
  );
  const busy = run(root, claude, ['stop']);
  assert.equal(busy.status, 1);
  assert.match(busy.stderr, /another run is active .*issue 999.*pid/);
});

// Nothing is fetched, classified or written while another run is active.
test('order: the active-run check comes before the classifier, which comes before the Base line', () => {
  const root = setup({ issue: ISSUE_UNLABELLED });
  mkdirSync(join(root, '.local/agent-harness/work'), { recursive: true });
  writeFileSync(
    activePath(root),
    JSON.stringify({
      issue: 999,
      lane: '1',
      maxToolCalls: 250,
      pid: process.pid,
    })
  );
  const claude = fakeClaude(root, {
    script: [{ status: '{"lane":"1","reason":"r"}' }],
  });

  const refused = run(root, claude, ['stop']);
  assert.equal(refused.status, 1);
  assert.deepEqual(claude.calls(), []);
  assert.equal(existsSync(work(root, 'lane.json')), false);
  assert.equal(existsSync(work(root, 'issue.json')), false);

  rmSync(activePath(root));
  const ran = run(root, claude, ['stop']);
  assert.equal(ran.status, 0, ran.stderr);
  assert.match(
    promptOf(claude.calls()[0]),
    /^Classify this DT-DDS GitHub issue/
  );
  assert.match(
    readFileSync(work(root, 'run-log.md'), 'utf8'),
    /^# Run log — 257\n\nBase: [0-9a-f]{40}\n/
  );
  assert.match(
    readFileSync(work(root, 'run-log.md'), 'utf8'),
    /\| lane-classifier \|/
  );
});

test('preflight runs before the classifier: a failed hook check spends nothing', () => {
  const root = setup({ issue: ISSUE_UNLABELLED, hooksOk: false });
  const claude = fakeClaude(root);

  const result = run(root, claude, ['stop']);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /preflight failed:.*check-hooks\.mts failed/s);
  assert.deepEqual(claude.calls(), []);
  assert.equal(existsSync(work(root, 'lane.json')), false);
});

test('a failing health check stops the run before the implementing step', () => {
  const root = setup({ healthOk: false });
  const claude = fakeClaude(root);

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /health checks failed before express:apply: stub/
  );
  assert.equal(claude.calls().length, 1);
});

test('a new run log starts with the base it ran on', () => {
  const root = setup();
  run(root, fakeClaude(root), ['stop']);

  assert.match(
    readFileSync(work(root, 'run-log.md'), 'utf8'),
    /^# Run log — 257\n\nBase: [0-9a-f]{40}\n/
  );
});

test('a run log in an older layout is refused before any session starts', () => {
  const root = setup();
  mkdirSync(work(root), { recursive: true });
  writeFileSync(
    work(root, 'run-log.md'),
    '# Run log\n\n## Dispatches\n\n| stage | started | wall time (s) | tokens | status line |\n|---|---|---|---|---|\n'
  );
  const claude = fakeClaude(root);

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /the Dispatches table has other columns.*Move that work dir aside/s
  );
  assert.deepEqual(claude.calls(), []);
});

test('a loop: instruction survives a health-check stop before implement', () => {
  const root = setup();
  withHealthChecks(root, [
    {
      name: 'gate-file',
      run: ['sh', '-c', 'test ! -e .local/agent-harness/work/257/unhealthy'],
    },
  ]);
  const claude = fakeClaude(root, {
    script: [{}, {}, {}, { commit: 'fix: y' }, {}, {}],
  });
  const lane1 = (answers: readonly string[]): SpawnSyncReturns<string> =>
    run(root, claude, answers, ['--lane', '1']);
  lane1(['approve', 'approve', 'approve', 'approve', 'stop']);
  git(root, 'checkout', '-q', '-b', 'fix/257/y');
  writeFileSync(work(root, 'unhealthy'), '');

  const looped = lane1(['loop: fix the story']);
  assert.equal(looped.status, 1);
  assert.match(looped.stderr, /health checks failed before implement/);
  rmSync(work(root, 'unhealthy'));

  const resumed = lane1(['stop']);
  assert.equal(resumed.status, 0, resumed.stderr);
  const implementCall = claude.calls().at(-1);
  assert.match(promptOf(implementCall), /step implement/);
  assert.match(
    promptOf(implementCall),
    /Revise instruction from the gate \(verbatim\): fix the story/
  );
});
