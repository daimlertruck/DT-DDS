import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import { test } from 'node:test';

import {
  script,
  setup,
  fakeClaude,
  run,
  work,
  gates,
  stateOf,
  recordOf,
  promptOf,
  flagOf,
  activePath,
} from './run-support.mts';
import { createSandbox, listSandboxes } from '../scripts/git/sandbox.mts';
import { redFlags } from '../scripts/runner/checks.mts';
import { lineReader } from '../scripts/runner/gate-input.mts';
import {
  missingConsent,
  parseDecision,
} from '../scripts/runner/gate-replies.mts';

// A stop leaves the gate pending; a resume shows it again instead of re-running the step.
test('stop at a gate, then resume: the same gate is shown again and the step does not re-run', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const first = run(root, claude, ['approve', 'stop']);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(existsSync(activePath(root)), false);
  assert.match(first.stdout, /Stopped at G7/);

  const second = run(root, claude, ['approve']);
  assert.equal(second.status, 0, second.stderr);
  assert.match(second.stdout, /express:plan: approved earlier, skipped/);
  assert.match(
    second.stdout,
    /express:apply: its G7 gate is pending from an earlier session; shown again/
  );
  assert.equal(claude.calls().length, 2);
  assert.deepEqual(
    gates(root).map(({ gate, decision }) => [gate, decision]),
    [
      ['G1+G3', 'approve'],
      ['G7', 'stop'],
      ['G7', 'approve'],
    ]
  );
});

test('a pending gate answered with revise: re-runs its step with the instruction', () => {
  const root = setup();
  const claude = fakeClaude(root);

  run(root, claude, ['stop']);
  run(root, claude, ['revise: name the test file', 'stop']);

  const calls = claude.calls();
  assert.equal(calls.length, 2);
  assert.match(promptOf(calls[1]), /^\/ds-express 257 plan/);
  assert.match(
    promptOf(calls[1]),
    /Revise instruction from the gate \(verbatim\): name the test file/
  );
});

test('the gate lists the permission denials the session reported', () => {
  const root = setup();
  const denials = [
    {
      tool_name: 'Write',
      tool_use_id: 't1',
      tool_input: { file_path: `${root}/README.md`, content: 'x' },
    },
  ];
  const claude = fakeClaude(root, { script: [{ denials }] });

  const result = run(root, claude, ['stop'], ['--record-out', 'record.json']);

  assert.match(result.stdout, /permission denials \(1\): Write README\.md/);
  assert.match(
    gates(root)[0]?.note ?? '',
    /permission denials: Write README\.md/
  );
  assert.equal(recordOf(root).steps[0]?.permissionDenials, 1);
});

test('output that is not JSON is a FAIL gate with unknown spend, and the run stops there', () => {
  const root = setup();
  const claude = fakeClaude(root, {
    script: [{ raw: 'Invalid API key · Please run /login' }],
  });

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.doesNotMatch(result.stderr, /Unexpected token/);
  assert.match(
    result.stdout,
    /── G1\+G3 after express:plan · status: FAIL — no JSON result/
  );
  assert.match(result.stderr, /spend of express:plan is unknown/);
  assert.deepEqual(
    gates(root).map(({ decision }) => decision),
    ['stop (spend unknown)']
  );
  assert.deepEqual(stateOf(root).spendUnknown, ['express:plan']);
  assert.equal(existsSync(activePath(root)), false);
});

test('PARTIAL and PASS (partial) cannot be approved; a bold **PASS** can', () => {
  ['PARTIAL: two ACs left', 'PASS (partial) — turn limit'].forEach((status) => {
    const root = setup();
    const result = run(root, fakeClaude(root, { statuses: [status] }), [
      'approve',
      'stop',
    ]);
    assert.match(result.stdout, /the step did not pass/, status);
    assert.deepEqual(stateOf(root).approved, [], status);
  });
  const root = setup();
  run(
    root,
    fakeClaude(root, {
      statuses: ['**PASS** — .local/agent-harness/work/257/express-plan.md'],
    }),
    ['approve', 'stop']
  );
  assert.deepEqual(stateOf(root).approved, ['express:plan']);
});

test('revise re-runs the same step with the instruction verbatim in its brief', () => {
  const root = setup();
  const claude = fakeClaude(root);

  run(root, claude, ['revise: name the test file', 'stop']);

  const calls = claude.calls();
  assert.equal(calls.length, 2);
  assert.match(promptOf(calls[1]), /^\/ds-express 257 plan/);
  assert.match(
    promptOf(calls[1]),
    /Revise instruction from the gate \(verbatim\): name the test file/
  );
});

test('no answer is never an approval: end of input stops at the gate', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(root, claude, ['looks good']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /not a decision/);
  assert.equal(gates(root)[0]?.decision, 'stop');
  assert.deepEqual(stateOf(root).approved, []);
});

test('Ask-first paths need consent per path, with who gave it, at the first gate', () => {
  const issue = JSON.stringify({
    number: 257,
    title: 'chore: cache yarn in CI',
    labels: [{ name: 'type:chore' }],
    body: '### Description\n\nCI is slow.\n\n### Possible solution\n\nAdd `cache: yarn` to `.github/workflows/ci.yml`.\n',
  });
  const root = setup({ issue });
  const claude = fakeClaude(root);

  const result = run(
    root,
    claude,
    [
      'approve',
      'approve; consent: .github/workflows/ci.yml (Ana, maintainer)',
      'stop',
    ],
    ['--lane', '0']
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /consent missing for: \.github\/workflows\/ci\.yml/
  );
  assert.match(
    readFileSync(work(root, 'intake-decisions.md'), 'utf8'),
    /G1\+G3 consent \(verbatim\): approve; consent: \.github\/workflows\/ci\.yml \(Ana, maintainer\)/
  );
});

test('parseDecision, missingConsent and redFlags', () => {
  assert.deepEqual(parseDecision('lane: 2'), { kind: 'lane', lane: '2' });
  assert.equal(parseDecision('revise:').kind, 'unknown');
  assert.equal(parseDecision('reject: too broad').kind, 'revise');
  assert.deepEqual(
    missingConsent('approve; consent: scripts/x.mjs', ['scripts/x.mjs']),
    ['scripts/x.mjs']
  );
  const clean = {
    head: 'a',
    branch: 'main',
    status: '',
    remoteRefs: ['refs/remotes/origin/main'],
  };
  assert.deepEqual(
    redFlags({ id: 'x', writes: 'branch' }, clean, { ...clean, head: 'b' }),
    ['x committed on main, not on a feature branch']
  );
  assert.match(
    redFlags({ id: 'x', writes: 'branch' }, clean, {
      ...clean,
      branch: 'fix/1/y',
      remoteRefs: [...clean.remoteRefs, 'refs/remotes/origin/fix/1/y'],
    })[0] ?? '',
    /a push\?/
  );
  assert.deepEqual(
    redFlags({ id: 'x', writes: 'branch' }, clean, {
      ...clean,
      head: 'b',
      branch: 'fix/1/y',
    }),
    []
  );
  const branch = { ...clean, branch: 'fix/1/y' };
  assert.deepEqual(
    redFlags({ id: 'v', writes: 'fixups' }, branch, { ...branch, head: 'b' }, [
      'fixup! fix: y',
      'amend! fix: y',
    ]),
    []
  );
  assert.deepEqual(
    redFlags({ id: 'v', writes: 'fixups' }, clean, { ...clean, head: 'b' }, [
      'fixup! fix: y',
    ]),
    ['v committed on main, not on a feature branch']
  );
});

test('on a terminal, lines typed while a stage ran are drained, not taken as the decision', async () => {
  const input = Object.assign(new PassThrough(), { isTTY: true });
  const ask = lineReader(input);
  input.write('approve\n');

  const typed = await ask.drain();
  const next = ask('G3> ');
  input.write('stop\n');

  assert.deepEqual(typed, ['approve']);
  assert.equal(await next, 'stop');
});

test('after a gate decision, sandboxes kept until that gate are closed', () => {
  const root = setup();
  const sandboxesRoot = mkdtempSync(join(tmpdir(), 'sandboxes-'));
  createSandbox({
    root,
    sandboxesRoot,
    name: 'repro-257',
    issue: '257',
    keepUntil: 'G1+G3',
  });
  createSandbox({
    root,
    sandboxesRoot,
    name: 'later-257',
    issue: '257',
    keepUntil: 'G7',
  });
  const claude = fakeClaude(root);

  const result = spawnSync(
    'node',
    [script, '257', '--root', root, '--issue-file', 'issue-fixture.json'],
    {
      encoding: 'utf8',
      env: { ...claude.env, DT_DDS_SANDBOXES: sandboxesRoot },
      input: 'approve\nstop\n',
    }
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /sandbox repro-257 closed \(kept until G1\+G3\)/);
  assert.deepEqual(
    listSandboxes(sandboxesRoot).map(({ name }) => name),
    ['later-257']
  );
  assert.equal(flagOf(claude.calls()[1], '--add-dir'), sandboxesRoot);
});

test('the gate lists untracked files the run created; branch steps may delete them with clean-run.mts', () => {
  const root = setup();
  writeFileSync(join(root, 'scratch.txt'), 'mine\n');
  const claude = fakeClaude(root, {
    script: [
      {},
      {},
      {
        branch: 'fix/257/y',
        file: ['a.txt', 'a1\n'],
        commit: 'fix(a): y',
        untracked: 'packages/x/Probe.test.tsx',
      },
    ],
  });

  const result = run(
    root,
    claude,
    ['approve', 'approve', 'stop'],
    ['--lane', '1']
  );

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(stateOf(root).untrackedAtStart, ['scratch.txt']);
  assert.match(
    result.stdout,
    /^ {3}untracked files this run created: packages\/x\/Probe\.test\.tsx \(the stage deletes them: node agent-harness\/scripts\/git\/clean-run\.mts <path>\)$/m
  );
  assert.match(
    flagOf(claude.calls()[2], '--allowedTools') ?? '',
    /Bash\(node agent-harness\/scripts\/git\/clean-run\.mts \*\)/
  );
  assert.doesNotMatch(
    flagOf(claude.calls()[0], '--allowedTools') ?? '',
    /clean-run/
  );
});
