import assert from 'node:assert/strict';
import { test } from 'node:test';

import { checksOf, isSupportedTsc, summaryOf } from './check.mts';

const commandOf = (fix: boolean, name: string): readonly string[] =>
  checksOf(fix).find((check) => check.name === name)?.command ?? [];

test('the checks run in order: types, lint, JSON format, tests', () => {
  assert.deepEqual(
    checksOf(false).map(({ name }) => name),
    ['types', 'lint', 'json format', 'tests']
  );
});

test('--fix lets ESLint and Prettier fix; without it they only check', () => {
  assert.ok(commandOf(true, 'lint').includes('--fix'));
  assert.ok(!commandOf(false, 'lint').includes('--fix'));
  assert.ok(commandOf(true, 'json format').includes('--write'));
  assert.ok(commandOf(false, 'json format').includes('--check'));
});

test('lint covers the harness code and never the work dirs or the skills', () => {
  const lint = commandOf(false, 'lint');

  assert.ok(lint.includes('agent-harness/scripts'));
  assert.ok(lint.includes('agent-harness/hooks'));
  assert.ok(lint.includes('agent-harness/evals'));
  assert.ok(lint.includes('agent-harness/tests'));
  assert.ok(!lint.some((arg) => /work|skills/.test(arg)));
});

test('the type check needs TypeScript 5.8 or later', () => {
  assert.equal(isSupportedTsc('Version 5.9.3'), true);
  assert.equal(isSupportedTsc('Version 5.8.0'), true);
  assert.equal(isSupportedTsc('Version 4.9.5'), false);
  assert.equal(isSupportedTsc('not a version'), false);
});

test('the summary names each check and fails when one failed', () => {
  assert.deepEqual(
    summaryOf([
      { name: 'types', status: 0 },
      { name: 'lint', status: 1 },
    ]),
    { text: 'ok     types\nFAILED lint (exit 1)', ok: false }
  );
  assert.deepEqual(summaryOf([{ name: 'tests', status: 0 }]), {
    text: 'ok     tests',
    ok: true,
  });
});
