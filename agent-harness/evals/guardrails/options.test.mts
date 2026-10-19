import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  agentArgs,
  expandRuns,
  listRuns,
  parseArgs,
  type Run,
} from './options.mts';
import { kase } from './test-support.mts';

test('expandRuns applies the default repeats, an override, and the filters', () => {
  const cases = [kase(), kase({ id: 'L-script', kind: 'limit', limit: 'x' })];
  const ids = (runs: readonly Run[]): string[] =>
    runs.map(({ kase: { id }, attempt }) => `${id}#${attempt}`);
  assert.deepEqual(ids(expandRuns({ cases })), [
    'I-publish#1',
    'I-publish#2',
    'I-publish#3',
    'L-script#1',
  ]);
  assert.deepEqual(ids(expandRuns({ cases, repeat: 2 })), [
    'I-publish#1',
    'I-publish#2',
    'L-script#1',
    'L-script#2',
  ]);
  assert.deepEqual(ids(expandRuns({ cases, kinds: ['limit'] })), [
    'L-script#1',
  ]);
  assert.deepEqual(ids(expandRuns({ cases, ids: ['L-script'] })), [
    'L-script#1',
  ]);
});

test('listRuns prints one line per run, then the count (the --list output)', () => {
  const runs = expandRuns({
    cases: [
      kase({ prompt: `${'x'.repeat(100)}` }),
      kase({
        id: 'I-dco',
        kind: 'indirect',
        outcomes: ['O4'],
        prompt: 'Commit it.',
      }),
    ],
    repeat: 1,
  });
  assert.deepEqual(listRuns(runs), [
    `I-publish            indirect #1  O1       ${'x'.repeat(90)}`,
    'I-dco                indirect #1  O4       Commit it.',
    '2 runs',
  ]);
});

test('parseArgs reads the options and rejects unknown ones', () => {
  assert.deepEqual(
    parseArgs([
      '--case',
      'I-publish',
      '--case',
      'I-dco',
      '--kind',
      'indirect',
      '--repeat',
      '2',
      '--model',
      'm',
      '--budget-usd',
      '0.5',
    ]),
    {
      ids: ['I-publish', 'I-dco'],
      kinds: ['indirect'],
      repeat: 2,
      model: 'm',
      budgetUsd: 0.5,
      list: false,
      keep: false,
      setupOnly: false,
    }
  );
  assert.deepEqual(parseArgs(['--list', '--keep']), {
    ids: [],
    kinds: [],
    repeat: undefined,
    model: undefined,
    budgetUsd: 1,
    list: true,
    keep: true,
    setupOnly: false,
  });
  assert.equal(parseArgs(['--setup-only']).setupOnly, true);
  assert.throws(() => parseArgs(['--push']), /unknown option --push/);
  assert.throws(() => parseArgs(['--kind', 'sideways']), /unknown kind/);
  assert.throws(() => parseArgs(['--model']), /--model needs a value/);
  ['0', 'x'].forEach((value) =>
    assert.throws(
      () => parseArgs(['--repeat', value]),
      /--repeat needs a positive number/
    )
  );
  ['0', '-1', 'x'].forEach((value) =>
    assert.throws(
      () => parseArgs(['--budget-usd', value]),
      /--budget-usd needs a positive number/
    )
  );
});

test('every session runs with bypassPermissions, project settings only and no MCP server', () => {
  const args = agentArgs(
    kase({ prompt: 'Push it.' }),
    parseArgs(['--model', 'm']),
    '/ws/empty-mcp.json'
  );
  assert.deepEqual(args.slice(0, 2), ['-p', 'Push it.']);
  [
    ['--permission-mode', 'bypassPermissions'],
    ['--permission-prompts', 'none'],
    ['--setting-sources', 'project'],
    ['--mcp-config', '/ws/empty-mcp.json'],
    ['--max-budget-usd', '1'],
    ['--model', 'm'],
  ].forEach(([flag, value]) =>
    assert.equal(args[args.indexOf(flag ?? '') + 1], value, flag)
  );
  assert.ok(args.includes('--strict-mcp-config'));
});
