import assert from 'node:assert/strict';
import { test } from 'node:test';

import { USAGE, parseArgs } from './args.mts';

test('a full command line: switches, values, and --root resolved against the working directory', () => {
  assert.deepEqual(
    parseArgs(
      [
        '257',
        '--fresh',
        '--lane',
        'escalate',
        '--issue-file',
        'fixture.json',
        '--budget-usd',
        '0.5',
        '--tool-calls',
        '120',
        '--record-out',
        'out.json',
        '--root',
        'repo',
      ],
      '/work'
    ),
    {
      id: '257',
      root: '/work/repo',
      dry: false,
      fresh: true,
      noWait: false,
      close: false,
      decide: null,
      lane: 'escalate',
      issueFile: 'fixture.json',
      harness: 'claude',
      budgetUsd: 0.5,
      toolCalls: 120,
      recordOut: 'out.json',
    }
  );
});

test('defaults: the claude harness, the working directory as root; a named run id is accepted', () => {
  const parsed = parseArgs(['dry-run-1', '--dry'], '/work');

  assert.ok(!('error' in parsed));
  assert.equal(parsed.root, '/work');
  assert.equal(parsed.harness, 'claude');
  assert.equal(parsed.dry, true);
  assert.equal(parsed.lane, null);
});

test('--decide implies --no-wait and keeps the reply verbatim', () => {
  const parsed = parseArgs(['257', '--decide', 'revise: a\nb'], '/work');

  assert.ok(!('error' in parsed));
  assert.equal(parsed.noWait, true);
  assert.equal(parsed.decide, 'revise: a\nb');
});

test('usage errors name the problem', () => {
  const errorOf = (argv: readonly string[]): string | undefined => {
    const parsed = parseArgs(argv, '/work');
    return 'error' in parsed ? parsed.error : undefined;
  };

  assert.equal(errorOf([]), USAGE);
  assert.equal(errorOf(['257', '258']), USAGE);
  assert.equal(errorOf(['Bad_Id']), USAGE);
  assert.equal(errorOf(['257', '--frob']), `unknown flag --frob\n${USAGE}`);
  assert.equal(errorOf(['257', '--lane']), `--lane needs a value\n${USAGE}`);
  assert.equal(
    errorOf(['257', '--decide', '--dry']),
    `--decide needs a value\n${USAGE}`
  );
  assert.equal(
    errorOf(['257', '--lane', '3']),
    '--lane must be 0, 1, 2 or escalate'
  );
  assert.equal(
    errorOf(['257', '--budget-usd', '0']),
    '--budget-usd must be a positive number'
  );
  assert.equal(
    errorOf(['257', '--budget-usd', 'lots']),
    '--budget-usd must be a positive number'
  );
  assert.equal(
    errorOf(['257', '--tool-calls', '1.5']),
    '--tool-calls must be a positive integer'
  );
});

test('a reply never goes with --dry or --fresh; --close goes with nothing that runs a step', () => {
  const errorOf = (argv: readonly string[]): string | undefined => {
    const parsed = parseArgs(argv, '/work');
    return 'error' in parsed ? parsed.error : undefined;
  };

  assert.equal(
    errorOf(['257', '--decide', 'approve', '--fresh', '--dry']),
    '--decide cannot be combined with --dry'
  );
  assert.equal(
    errorOf(['257', '--close', '--fresh']),
    '--close cannot be combined with --fresh'
  );
  assert.equal(
    errorOf(['257', '--close', '--no-wait']),
    '--close cannot be combined with --no-wait or --decide'
  );
  assert.equal(
    errorOf(['257', '--close', '--decide', 'approve']),
    '--close cannot be combined with --no-wait or --decide'
  );
});
