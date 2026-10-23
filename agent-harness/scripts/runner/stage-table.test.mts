import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  agentsFile,
  promptOf,
  sessionArgs,
  toolsOf,
} from './adapters/claude.mts';
import {
  checkTable,
  laneOf,
  loadTable,
  stepsOf,
  type Step,
} from './stage-table.mts';

const realRoot = fileURLToPath(new URL('../../..', import.meta.url));
const table = loadTable(realRoot);

// A mutable copy of stages.json, loose enough to hold the invalid values the checks must refuse.
type DraftFields = Record<string, unknown>;
interface DraftLane {
  steps: [DraftFields, ...DraftFields[]];
}
interface Draft {
  stages: { plan: DraftFields };
  lanes: { '0': DraftLane; '1': DraftLane; escalate?: unknown };
}
const raw = (): Draft =>
  JSON.parse(
    readFileSync(new URL('../../config/stages.json', import.meta.url), 'utf8')
  );

// The first steps of a lane, checked present.
const stepsIn = (lane: string | number): [Step, ...Step[]] => {
  const [first, ...rest] = stepsOf(table, lane);
  assert.ok(first, `lane ${lane} has steps`);
  return [first, ...rest];
};
const stepNamed = (lane: string | number, id: string): Step => {
  const step = stepsOf(table, lane).find((candidate) => candidate.id === id);
  assert.ok(step, `lane ${lane} has step ${id}`);
  return step;
};

test('the real table resolves every lane; Lane 0 is one stage in two parts, the second resuming the first', () => {
  assert.deepEqual(
    stepsOf(table, 0).map(({ id, gate, resume }) => [id, gate, resume]),
    [
      ['express:plan', 'G1+G3', false],
      ['express:apply', 'G7', true],
    ]
  );
  assert.deepEqual(
    stepsOf(table, 1).map(({ id }) => id),
    ['gather-context', 'plan', 'implement', 'verify', 'review', 'pr-draft']
  );
  assert.equal(stepsOf(table, 2).length, 7);
  assert.deepEqual(stepsOf(table, 'escalate'), []);
});

test('lane overrides apply on top of the stage, and preloads merge', () => {
  const plan = stepNamed(1, 'plan');
  // Lane 1 turn caps leave headroom over the turns plan and implement need.
  assert.equal(plan.maxTurns, 40);
  assert.equal(stepNamed(1, 'implement').maxTurns, 70);
  assert.ok(plan.preload.includes('ds-check-architecture'));
  assert.ok(plan.preload.includes('ds-commit-message'));
  assert.equal(stepNamed(1, 'implement').effort, 'medium');
  assert.equal(stepNamed(2, 'implement').effort, 'high');
});

test('the table is checked: unknown capability, tier, gate or override field is refused', () => {
  const broken = (change: (copy: Draft) => unknown) => {
    const copy = raw();
    change(copy);
    return () => checkTable(copy);
  };
  assert.throws(
    broken((t) => (t.stages.plan.tools = ['read', 'telepathy'])),
    /tools must name capabilities/
  );
  assert.throws(
    broken((t) => (t.stages.plan.tier = 'gpt')),
    /tier must be one of/
  );
  assert.throws(
    broken((t) => (t.lanes['1'].steps[0].gate = 'G9')),
    /gate must be one of/
  );
  assert.throws(
    broken((t) => (t.lanes['1'].steps[0].model = 'opus')),
    /unknown field\(s\) model/
  );
  assert.throws(
    broken((t) => delete t.lanes.escalate),
    /lane escalate is missing/
  );
  assert.throws(
    broken((t) => (t.lanes['0'].steps[0].resume = true)),
    /first step cannot resume/
  );
});

test('claude adapter: search maps to Bash, delegate to Agent; tools are deduplicated', () => {
  assert.deepEqual(toolsOf({ tools: ['read', 'search', 'shell', 'write'] }), [
    'Read',
    'Bash',
    'Write',
  ]);
  assert.deepEqual(toolsOf({ tools: ['read', 'delegate'] }), ['Read', 'Agent']);
});

test('claude adapter: one agent per stage, without the skills key (it preloads nothing under --agent)', () => {
  const agents = agentsFile(stepsOf(table, 0));
  const express = agents['ds-stage-express'];

  assert.deepEqual(Object.keys(agents), ['ds-stage-express']);
  assert.equal(express?.maxTurns, 45);
  assert.equal(express.model, 'sonnet');
  assert.equal('skills' in express, false);
  assert.match(express.prompt, /gate-summary\.md/);
  assert.match(
    express.prompt,
    /read `\.agents\/skills\/<name>\/SKILL\.md` then, not before/
  );
});

// Nothing orchestrates the stages, so a question in the status line could never be approved.
test('claude adapter: the agent prompt states the status contract (PASS, PARTIAL, BLOCKER; questions in the summary)', () => {
  const prompt = agentsFile(stepsOf(table, 0))['ds-stage-express']?.prompt;
  assert.ok(prompt);

  assert.match(prompt, /`PASS` \(done; only this\s+can be approved\)/);
  assert.match(prompt, /`PARTIAL: <what is left>`/);
  assert.match(prompt, /`BLOCKER: <reason>`/);
  assert.match(
    prompt,
    /A question for\s+the human goes there too, and the status stays `PASS`/
  );
});

test('claude adapter: a new session starts with the skill command, a resumed one with the brief alone', () => {
  const [plan, apply] = stepsIn(0);
  assert.ok(apply);

  assert.equal(
    promptOf(plan, { issue: '257', brief: 'B' }),
    '/ds-express 257 plan\n\nB'
  );
  assert.equal(promptOf(apply, { issue: '257', brief: 'B' }), 'B');
  const args = sessionArgs(apply, {
    issue: '257',
    brief: 'B',
    agentsPath: 'a.json',
    sessionId: 's-1',
    budgetUsd: 1.5,
  });
  assert.deepEqual(args.slice(0, 15), [
    'B',
    '--settings',
    '.claude/pipeline.settings.json',
    '--agents',
    'a.json',
    '--agent',
    'ds-stage-express',
    '--model',
    'sonnet',
    '--effort',
    'medium',
    '--max-turns',
    '45',
    '--resume',
    's-1',
  ]);
  assert.deepEqual(args.slice(-2), ['--max-budget-usd', '1.50']);
  assert.throws(
    () =>
      sessionArgs(apply, { issue: '257', brief: 'B', agentsPath: 'a.json' }),
    /no session id/
  );
});

// In print mode anything that would prompt is denied, so a session with no mode and no rules could
// not write its artifact. The mode is pinned here, not left to whatever settings a contributor has.
const flagValue = (args: readonly string[], name: string): string | null =>
  args.includes(name) ? args[args.indexOf(name) + 1] ?? null : null;
const rulesOf = (args: readonly string[], name: string): string[] =>
  flagValue(args, name)?.split(',') ?? [];

test('claude adapter: every session is pinned to dontAsk with an allowlist generated from the step', () => {
  for (const lane of ['0', '1', '2']) {
    stepsOf(table, lane).forEach((step) => {
      const args = sessionArgs(step, {
        issue: '257',
        brief: 'B',
        agentsPath: 'a.json',
        sessionId: 's-1',
      });
      assert.equal(flagValue(args, '--permission-mode'), 'dontAsk', step.id);
      assert.ok(rulesOf(args, '--allowedTools').length, step.id);
    });
  }
});

test('claude adapter: a work-dir step may write only under .local/agent-harness/work/ and cannot commit', () => {
  const [plan] = stepsIn(0);
  const allowed = rulesOf(
    sessionArgs(plan, { issue: '257', brief: 'B', agentsPath: 'a.json' }),
    '--allowedTools'
  );

  assert.ok(allowed.includes('Write(.local/agent-harness/work/**)'));
  assert.ok(allowed.includes('Edit(.local/agent-harness/work/**)'));
  assert.equal(
    allowed.some((rule) => /^(?:Write|Edit)\(\.\/\*\*\)$/.test(rule)),
    false
  );
  assert.equal(
    allowed.some((rule) => /^Bash\(git (?:commit|add|checkout)/.test(rule)),
    false
  );
  assert.equal(
    allowed.some((rule) => /^Bash\(yarn /.test(rule)),
    false
  );
});

test('claude adapter: a branch step may edit the checkout and commit, never harness or off-limits paths', () => {
  const [, apply] = stepsIn(0);
  assert.ok(apply);
  const args = sessionArgs(apply, {
    issue: '257',
    brief: 'B',
    agentsPath: 'a.json',
    sessionId: 's-1',
  });
  const allowed = rulesOf(args, '--allowedTools');
  const denied = rulesOf(args, '--disallowedTools');

  [
    'Edit(./**)',
    'Write(./**)',
    'Bash(git checkout -b *)',
    'Bash(git add *)',
    'Bash(git commit *)',
    'Bash(yarn *)',
    'Bash(git fetch origin main)',
    'Bash(node agent-harness/scripts/git/check-commits.mts)',
  ].forEach((rule) => assert.ok(allowed.includes(rule), rule));
  [
    '.claude/**',
    'agent-harness/**',
    '.agents/skills/**',
    '**/AGENTS.md',
    '.changeset/**',
    '**/CHANGELOG.md',
    'yarn.lock',
    '**/__snapshots__/**',
    'packages/themes/src/tokens/**',
  ].forEach((path) =>
    assert.ok(
      denied.includes(`Edit(${path})`) && denied.includes(`Write(${path})`),
      path
    )
  );
});

test('claude adapter: no step may write the run files run.mts owns (run file, ledgers, state, decisions)', () => {
  const owned = [
    '.local/agent-harness/work/.active-run.json',
    '.local/agent-harness/work/*/tool-calls*.log',
    '.local/agent-harness/work/*/run-state.json',
    '.local/agent-harness/work/*/lane.json',
    '.local/agent-harness/work/*/intake-decisions.md',
    '.local/agent-harness/work/*/run-log.md',
    '.local/agent-harness/work/*/issue.json',
    '.local/agent-harness/work/*/snapshots/**',
    '.local/agent-harness/work/*/usage/**',
  ];
  for (const lane of ['0', '1', '2']) {
    stepsOf(table, lane).forEach((step) => {
      const denied = rulesOf(
        sessionArgs(step, {
          issue: '257',
          brief: 'B',
          agentsPath: 'a.json',
          sessionId: 's-1',
        }),
        '--disallowedTools'
      );
      owned.forEach((path) =>
        assert.ok(
          denied.includes(`Edit(${path})`) && denied.includes(`Write(${path})`),
          `${step.id}: ${path}`
        )
      );
    });
  }
});

test('claude adapter: steps that run checks may work in the sandboxes dir; work-dir steps may not', () => {
  const [plan, apply] = stepsIn(0);
  assert.ok(apply);
  const options = {
    issue: '257',
    brief: 'B',
    agentsPath: 'a.json',
    sessionId: 's-1',
    sandboxesDir: '/tmp/sb',
  };

  assert.equal(flagValue(sessionArgs(apply, options), '--add-dir'), '/tmp/sb');
  assert.equal(flagValue(sessionArgs(plan, options), '--add-dir'), null);
});

// Fetching updates only refs/remotes/origin/main, so every shell step may do it, work-dir steps too.
test('claude adapter: every shell step may fetch origin main; the prompt asks for simple commands', () => {
  const [plan] = stepsIn(0);
  const allowed = rulesOf(
    sessionArgs(plan, { issue: '257', brief: 'B', agentsPath: 'a.json' }),
    '--allowedTools'
  );
  const prompt = agentsFile([plan])['ds-stage-express']?.prompt;
  assert.ok(prompt);

  assert.ok(allowed.includes('Bash(git fetch origin main)'));
  assert.match(prompt, /One simple command per Bash call/);
  assert.match(
    prompt,
    /a denied compound command may be re-run as\s+simple allowed commands/
  );
});

test('claude adapter: a step without a capability gets no rule for it', () => {
  const readOnly: Step = {
    ...stepsIn(1)[0],
    tools: ['read'],
    writes: 'work-dir',
  };
  const allowed = rulesOf(
    sessionArgs(readOnly, { issue: '9', brief: 'B', agentsPath: 'a.json' }),
    '--allowedTools'
  );

  assert.deepEqual(allowed, ['Read']);
});

test('claude adapter: --max-budget-usd is floored to the cent, never rounded past the cap', () => {
  const [plan] = stepsIn(0);
  const budget = (usd: number): string | null =>
    flagValue(
      sessionArgs(plan, {
        issue: '257',
        brief: 'B',
        agentsPath: 'a.json',
        budgetUsd: usd,
      }),
      '--max-budget-usd'
    );

  assert.equal(budget(0.025), '0.02');
  assert.equal(budget(0.29), '0.29');
  assert.equal(budget(2.999), '2.99');
});

// One session's tool calls are capped, not the run's: a loop or a re-run gets its own allowance.
// Caps are about twice the most a step has needed.
test("each step has its own tool-call cap; a lane's pass is their sum; a cap must be a positive integer", () => {
  const caps = (lane: string | number) =>
    stepsOf(table, lane).map(({ id, maxToolCalls }) => [id, maxToolCalls]);
  assert.deepEqual(caps(0), [
    ['express:plan', 30],
    ['express:apply', 60],
  ]);
  assert.deepEqual(caps(1), [
    ['gather-context', 40],
    ['plan', 140],
    ['implement', 200],
    ['verify', 60],
    ['review', 90],
    ['pr-draft', 30],
  ]);
  assert.deepEqual(
    [
      laneOf(table, 0).maxToolCalls,
      laneOf(table, 1).maxToolCalls,
      laneOf(table, 'escalate').maxToolCalls,
    ],
    [90, 560, 0]
  );
  const broken: Draft = JSON.parse(JSON.stringify(table));
  broken.lanes['1'].steps[0].maxToolCalls = 0;
  assert.throws(
    () => checkTable(broken),
    /lane 1 step 1: maxToolCalls must be a positive integer/
  );
  delete broken.stages.plan.maxToolCalls;
  assert.throws(
    () => checkTable(broken),
    /plan: maxToolCalls must be a positive integer/
  );
});
