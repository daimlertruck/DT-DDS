import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

import {
  setup,
  withHealthChecks,
  fakeClaude,
  run,
  work,
  gates,
  flagOf,
  activePath,
} from './run-support.mts';
import { git } from '../scripts/lib/test-support.mts';

test("a step with an unpriced model counts Claude Code's reported cost, so the lane cap still trips", () => {
  const root = setup();
  const claude = fakeClaude(root, {
    script: [{ model: 'claude-unpriced-9', cost: 3.2 }],
  });

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /run budget: lane 0 cap \$3 reached \(\$3\.2000/);
  assert.equal(claude.calls().length, 1);
});

test('without --budget-usd every session is capped at what is left of the lane cap, floored to the cent', () => {
  const root = setup();
  const claude = fakeClaude(root, { script: [{ cost: 0.017 }] });

  run(root, claude, ['approve', 'stop']);

  const [plan, apply] = claude.calls();
  assert.equal(flagOf(plan, '--max-budget-usd'), '3.00');
  assert.equal(flagOf(apply, '--max-budget-usd'), '2.97');
});

test('--budget-usd caps each session with what is left, and stops once less than a cent is left', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(root, claude, ['approve'], ['--budget-usd', '0.025']);

  assert.equal(result.status, 1);
  const [plan] = claude.calls();
  assert.equal(flagOf(plan, '--max-budget-usd'), '0.02');
  assert.match(result.stderr, /--budget-usd 0\.025 spent/);
  assert.equal(claude.calls().length, 1);
});

test('Red flag: a work-dir step that changes a tracked file stops the run', () => {
  const root = setup();
  const claude = fakeClaude(root, { touchCall: 1 });

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /Red flag — STOP:\n {2}- express:plan may write only under \.local\/agent-harness\/work\/, but tracked files changed/
  );
  assert.equal(existsSync(activePath(root)), false);
});

// Verify may add fixup!/amend! commits on the feature branch, nothing else.
test('a fixups step that adds an amend! commit passes; any other commit is a red flag', () => {
  const root = setup();
  git(root, 'checkout', '-q', '-b', 'fix/257/x');
  const ok = fakeClaude(root, {
    script: [{}, {}, { commit: 'fix: y' }, { commit: 'amend! fix: y' }],
  });
  const passed = run(
    root,
    ok,
    ['approve', 'approve', 'approve', 'stop'],
    ['--lane', '1']
  );
  assert.equal(passed.status, 0, passed.stderr);
  assert.deepEqual(
    gates(root).map(({ gate }) => gate),
    ['G1', 'G3', 'G4', 'G5']
  );

  const other = setup();
  git(other, 'checkout', '-q', '-b', 'fix/257/x');
  const bad = fakeClaude(other, {
    script: [{}, {}, { commit: 'fix: y' }, { commit: 'fix: z' }],
  });
  const flagged = run(
    other,
    bad,
    ['approve', 'approve', 'approve'],
    ['--lane', '1']
  );
  assert.equal(flagged.status, 1);
  assert.match(
    flagged.stderr,
    /verify may add only fixup!\/amend! commits, but added: fix: z/
  );
});

test('a red flag from an untracked folder says how to clear it', () => {
  const root = setup();
  const claude = fakeClaude(root, {
    script: [{ untracked: '.editor-cache/state.json' }],
  });

  const result = run(root, claude, ['approve']);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /\?\? \.editor-cache\//);
  assert.match(
    result.stderr,
    /An untracked file or folder the run did not create also stops it/
  );
  assert.match(result.stderr, /remove it from the checkout, then resume/);
});

test('a failed clean-tree check says how to clear an untracked folder', () => {
  const root = setup();
  withHealthChecks(root, [{ name: 'clean-tree', run: ['false'] }]);

  const result = run(root, fakeClaude(root), ['approve']);

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /health checks failed before express:apply: clean-tree/
  );
  assert.match(
    result.stderr,
    /An untracked file or folder the run did not create also stops it/
  );
});

test('each session gets its own tool-call cap and step key; --tool-calls raises it for the rest of the run, recorded', () => {
  const root = setup();
  const claude = fakeClaude(root);
  run(root, claude, ['revise: shorter', 'stop']);

  const resumed = run(
    root,
    claude,
    ['approve', 'stop'],
    ['--tool-calls', '120']
  );

  assert.equal(resumed.status, 0, resumed.stderr);
  const seen = (n: number): [number, string | undefined] => [
    claude.activeSeen(n).maxToolCalls,
    claude.activeSeen(n).step,
  ];
  assert.deepEqual(
    [seen(1), seen(2), seen(3)],
    [
      [30, 'express:plan#1'],
      [30, 'express:plan#2'],
      [120, 'express:apply#1'],
    ]
  );
  assert.match(
    resumed.stdout,
    /tool-call cap per step raised to 120 for the rest of run /
  );
  assert.match(
    readFileSync(work(root, 'intake-decisions.md'), 'utf8'),
    /tool-call cap per step raised to 120 \(--tool-calls, human\)/
  );
  assert.equal(run(root, claude, [], ['--tool-calls', '0']).status, 2);
});
