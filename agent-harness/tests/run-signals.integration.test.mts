import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  setup,
  fakeClaude,
  ARGS,
  run,
  start,
  groupOf,
  waitFor,
  work,
  gates,
  stateOf,
  promptOf,
  flagOf,
  activePath,
} from './run-support.mts';

test('Ctrl-C during a stage: interrupted is recorded, the run file is removed, exit 130', async () => {
  const root = setup();
  const claude = fakeClaude(root, { script: [{ sleepMs: 20000 }] });
  const job = start(root, claude);

  await waitFor(() => claude.started(1));
  process.kill(groupOf(job), 'SIGINT');
  const { code } = await job.exited;

  assert.equal(code, 130, job.output.err);
  assert.equal(existsSync(activePath(root)), false);
  assert.equal(stateOf(root).interrupted?.step, 'express:plan');
  assert.match(job.output.err, /interrupted \(SIGINT\) during express:plan/);
});

test('Ctrl-C at a gate: the gate row says interrupted and a resume shows the gate again', async () => {
  const root = setup();
  const claude = fakeClaude(root);
  const job = start(root, claude);

  await waitFor(() => /G1\+G3> /.test(job.output.out));
  job.child.kill('SIGINT');
  const { code } = await job.exited;

  assert.equal(code, 130, job.output.err);
  assert.equal(existsSync(activePath(root)), false);
  assert.deepEqual(
    gates(root).map(({ gate, decision }) => [gate, decision]),
    [['G1+G3', 'interrupted']]
  );
  const resumed = run(root, claude, ['approve', 'stop']);
  assert.equal(resumed.status, 0, resumed.stderr);
  assert.equal(claude.calls().length, 2);
  assert.match(promptOf(claude.calls()[1]), /step express:apply/);
});

test('a resumed step keeps its gate instruction: revise:, Ctrl-C during the re-run, resume', async () => {
  const root = setup();
  const claude = fakeClaude(root, { script: [{}, { sleepMs: 20000 }] });
  run(root, claude, ['stop']);

  const job = start(root, claude);
  await waitFor(() => /G1\+G3> /.test(job.output.out));
  job.child.stdin.write('revise: name the test file\n');
  await waitFor(() => claude.started(2));
  process.kill(groupOf(job), 'SIGINT');
  assert.equal((await job.exited).code, 130, job.output.err);
  assert.equal(stateOf(root).revise?.text, 'name the test file');

  const resumed = run(root, claude, ['stop']);
  assert.equal(resumed.status, 0, resumed.stderr);
  assert.match(
    resumed.stdout,
    /express:plan re-runs with its gate instruction \(revise from G1\+G3\)/
  );
  assert.match(
    promptOf(claude.calls()[2]),
    /Revise instruction from the gate \(verbatim\): name the test file/
  );
  assert.equal(stateOf(root).revise, null);
});

test('a long step prints a heartbeat: elapsed time, its tool calls and its spend so far', () => {
  const root = setup();
  const config = mkdtempSync(join(tmpdir(), 'claude-config-'));
  const claude = fakeClaude(root, {
    script: [{ transcript: true, toolCalls: 3, sleepMs: 1500 }],
  });

  const result = spawnSync('node', ARGS(root, []), {
    encoding: 'utf8',
    env: {
      ...claude.env,
      CLAUDE_CONFIG_DIR: config,
      DT_DDS_HEARTBEAT_MS: '300',
    },
    input: 'stop\n',
  });

  assert.equal(result.status, 0, result.stderr);
  // One Opus request: 2×4 + 1000×5 + 20000×0.2 + 200×20 = 13008 → $0.0130.
  assert.match(
    result.stdout,
    /^ {3}… express:plan running 0m 0\ds · 3 of 30 tool calls · \$0\.0130 so far$/m
  );
  assert.ok(
    result.stdout.indexOf('… express:plan running') >
      result.stdout.indexOf('→ express:plan started')
  );
});

test('Ctrl-C during a stage: its completed requests are counted, its session id and transcript recorded', async () => {
  const root = setup();
  const config = mkdtempSync(join(tmpdir(), 'claude-config-'));
  const claude = fakeClaude(root, {
    script: [{ transcript: true, trapSigint: true }],
  });
  const job = start(root, claude, [], { CLAUDE_CONFIG_DIR: config });

  await waitFor(() => claude.started(1));
  process.kill(groupOf(job), 'SIGINT');
  const { code } = await job.exited;

  assert.equal(code, 130, job.output.err);
  const state = stateOf(root);
  assert.equal(state.interrupted?.step, 'express:plan');
  assert.equal(
    state.interrupted?.sessionId,
    flagOf(claude.calls()[0], '--session-id')
  );
  assert.match(
    state.interrupted?.transcript ?? '',
    /^\.local\/agent-harness\/work\/257\/usage\/01-express-plan\.transcript\.jsonl$/
  );
  assert.equal(state.spentUsd, 0.0217); // run-stage prints list price to 4 decimals
  assert.deepEqual(state.spendUnknown, []);
  assert.match(
    job.output.err,
    /interrupted \(SIGINT\) during express:plan: \$0\.0217 counted \(a request cut off by the interrupt is not in it\)/
  );
  const runLog = readFileSync(work(root, 'run-log.md'), 'utf8');
  assert.match(runLog, /\| interrupted \(SIGINT\): error_during_execution \|/);
  assert.equal(existsSync(activePath(root)), false);
});

test('every new session gets a session id run.mts chose; a resumed one keeps its id', () => {
  const root = setup();
  const claude = fakeClaude(root);
  run(root, claude, ['approve', 'stop']);

  const [plan, apply] = claude.calls();
  assert.match(
    flagOf(plan, '--session-id') ?? '',
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  );
  assert.equal(apply?.includes('--session-id'), false);
  assert.equal(flagOf(apply, '--resume'), 'session-1');
});
