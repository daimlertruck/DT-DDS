import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  ISSUE_UNLABELLED,
  setup,
  fakeClaude,
  run,
  work,
  gates,
  stateOf,
  laneOfRun,
  recordOf,
  promptOf,
  activePath,
} from './run-support.mts';

import type { AgentsFile } from '../scripts/runner/adapters/claude.mts';

test('--dry prints lane 0 with reasons, the steps and the caps, and writes and calls nothing', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(root, claude, [], ['--dry']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /Lane 0 \(Express\), confidence 0\.9, decided by rules/
  );
  assert.match(result.stdout, /- manifest change in ≤ 3 packages/);
  assert.match(
    result.stdout,
    /Caps: \$3\.00 token cost per run \(list price\); tool calls per step \(budget-guard\), 90 per pass/
  );
  assert.match(result.stdout, /1\. express:plan .* calls 30 /);
  assert.match(result.stdout, /2\. express:apply .* calls 60 /);
  assert.match(result.stdout, /1\. express:plan .* sonnet\/medium .* → G1\+G3/);
  assert.match(
    result.stdout,
    /2\. express:apply .* → G7 \(resumes step 1; health checks first\)/
  );
  assert.match(
    result.stdout,
    /First session: claude -p .*--permission-mode dontAsk --allowedTools /
  );
  assert.deepEqual(claude.calls(), []);
  assert.equal(existsSync(join(root, '.local/agent-harness/work')), false);
});

test('--harness other stops with the pointer to the ADR-0008 proposal', () => {
  const root = setup();
  const result = run(
    root,
    fakeClaude(root),
    [],
    ['--dry', '--harness', 'codex']
  );

  assert.equal(result.status, 2);
  assert.match(
    result.stderr,
    /no adapter for harness "codex".*ADR-0008 decision 6, docs\/adrs\/0008-agentic-development-workflow\.md/s
  );
});

test('Lane 0: plan, gate G1+G3, health checks, resumed apply, gate, hand-off; caps reach the budget guard', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(
    root,
    claude,
    ['approve', 'approve'],
    ['--record-out', 'record.json']
  );

  assert.equal(result.status, 0, result.stderr);
  const [plan = [], apply = []] = claude.calls();
  assert.match(
    promptOf(plan),
    /^\/ds-express 257 plan\n\nPipeline run for issue 257, lane 0 \(Express\), step express:plan/
  );
  assert.ok(plan.includes('--agents') && plan.includes('ds-stage-express'));
  assert.equal(plan.includes('--resume'), false);
  assert.match(
    promptOf(apply),
    /^Pipeline run for issue 257, lane 0 \(Express\), step express:apply/
  );
  assert.match(
    promptOf(apply),
    /Environment health checks ran just before this step: all passed/
  );
  assert.deepEqual(
    apply.slice(apply.indexOf('--resume'), apply.indexOf('--resume') + 2),
    ['--resume', 'session-1']
  );
  const active = claude.activeSeen(1);
  assert.deepEqual(
    { ...active, pid: undefined, runId: undefined },
    {
      issue: 257,
      lane: '0',
      maxToolCalls: 30,
      step: 'express:plan#1',
      pid: undefined,
      runId: undefined,
    }
  );
  assert.deepEqual(
    [claude.activeSeen(2).maxToolCalls, claude.activeSeen(2).step],
    [60, 'express:apply#1']
  );
  assert.equal(active.runId, stateOf(root).runId);
  assert.equal(existsSync(activePath(root)), false);
  assert.deepEqual(
    gates(root).map(({ gate, decision }) => [gate, decision]),
    [
      ['G1+G3', 'approve'],
      ['G7', 'approve'],
    ]
  );
  assert.match(
    gates(root)[0]?.snapshot ?? '',
    /^snapshots\/01-G1\+G3-express-plan\.md · [0-9a-f]{16}$/
  );
  assert.ok(existsSync(work(root, 'snapshots/01-G1+G3-gate-summary.md')));
  assert.ok(existsSync(work(root, 'logs/health-stub.log')));
  assert.equal(laneOfRun(root).lane, '0');
  const agents: AgentsFile = JSON.parse(
    readFileSync(work(root, 'agents.json'), 'utf8')
  );
  assert.equal(agents['ds-stage-express']?.model, 'sonnet');
  const record = recordOf(root);
  assert.equal(record.outcome, 'handed off at G7');
  assert.match(record.harness_commit ?? '', /^[0-9a-f]{40}$/);
  assert.equal(record.harness_dirty, false);
  assert.deepEqual(
    record.steps.map(({ step }) => step),
    ['express:plan', 'express:apply']
  );
  assert.match(result.stdout, /summary of call 1/);
  assert.equal(
    result.stdout.match(
      /^ {3}lane 0 \(Express\), decided by rules, confidence 0\.9; caps \$3\.00 · 90 tool calls per pass \(capped per step\); change it with lane:N$/gm
    )?.length,
    2
  );
});

// A resumed session's JSON reports the whole session; only the step's own part counts.
test('Lane 0: the resumed apply step counts its own spend, not its session total', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(
    root,
    claude,
    ['approve', 'stop'],
    ['--record-out', 'record.json']
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /spent so far: \$0\.0434 \(cap \$3\)/);
  const [, apply] = recordOf(root).steps;
  assert.equal(apply?.predictedUsd, 0.0217);
  assert.ok(
    Math.abs((apply?.reportedUsd ?? NaN) - 0.0216904) < 1e-9,
    String(apply?.reportedUsd)
  );
});

test('each step announces itself before it starts', () => {
  const root = setup();
  const result = run(root, fakeClaude(root), ['stop']);

  assert.match(
    result.stdout,
    /^→ express:plan started \d{4}-\d\d-\d\dT\S+Z \(sonnet\/medium, maxTurns 25, 30 tool calls\)$/m
  );
});

test('--lane skips the classifier model call', () => {
  const root = setup({ issue: ISSUE_UNLABELLED });
  const claude = fakeClaude(root);

  run(root, claude, ['stop'], ['--lane', '1']);

  assert.match(promptOf(claude.calls()[0]), /^\/ds-gather-context 257\n/);
  assert.match(laneOfRun(root).reasons.join('\n'), /no model call \(--lane\)/);
});

test('a BLOCKER cannot be approved; lane:1 is a recorded scope decision and the plan changes', () => {
  const root = setup();
  const claude = fakeClaude(root, { statuses: ['BLOCKER: lane — 4 packages'] });

  const result = run(root, claude, ['approve', 'lane:1', 'stop']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /the step did not pass \(BLOCKER: lane — 4 packages\)/
  );
  assert.match(
    readFileSync(work(root, 'intake-decisions.md'), 'utf8'),
    /G1\+G3: lane 0 → 1 \(a scope decision\)/
  );
  const lane = laneOfRun(root);
  assert.equal(lane.lane, '1');
  assert.equal(lane.maxToolCalls, 560);
  assert.match(promptOf(claude.calls()[1]), /^\/ds-gather-context 257\n/);
  assert.deepEqual(
    gates(root).map(({ decision }) => decision),
    ['lane:1', 'stop']
  );
});

test('Lane 1: loops back to implement are bounded at G5', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(
    root,
    claude,
    [
      'approve',
      'approve',
      'approve',
      'loop: fix a',
      'approve',
      'loop: fix b',
      'approve',
      'loop: fix c',
    ],
    ['--lane', '1']
  );

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /G5 looped back 3 times: suspected unsound approach/
  );
  const skills = claude
    .calls()
    .map((call) => promptOf(call).match(/^\/(ds-[a-z-]+)/)?.[1]);
  assert.deepEqual(skills, [
    'ds-gather-context',
    'ds-plan-implementation',
    'ds-implement-plan',
    'ds-verify-changes',
    'ds-implement-plan',
    'ds-verify-changes',
    'ds-implement-plan',
    'ds-verify-changes',
  ]);
  assert.match(
    readFileSync(work(root, 'intake-decisions.md'), 'utf8'),
    /G5 code-or-scope revise \(loop 2\): fix b/
  );
});

// The review stage has the Agent tool; it must not see an agent that can edit.
test("the agents file holds only the running step's agent", () => {
  const root = setup();
  const claude = fakeClaude(root);

  run(root, claude, ['approve', 'approve', 'stop'], ['--lane', '1']);

  assert.deepEqual(Object.keys(claude.agentsSeen(1)), [
    'ds-stage-gather-context',
  ]);
  assert.deepEqual(Object.keys(claude.agentsSeen(3)), ['ds-stage-implement']);
});
