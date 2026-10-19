import assert from 'node:assert/strict';
import { test } from 'node:test';

import { omit } from './objects.mts';

test('omit returns a copy without the key and leaves the input unchanged', () => {
  const input = { a: 1, b: 'two', c: null };

  assert.deepEqual(omit(input, 'b'), { a: 1, c: null });
  assert.deepEqual(input, { a: 1, b: 'two', c: null });
});

test('omit of an absent key returns an equal copy', () => {
  const input: Readonly<Record<string, string | undefined>> = { PATH: '/bin' };

  assert.deepEqual(omit(input, 'CLAUDE_CODE_SUBAGENT_MODEL'), { PATH: '/bin' });
});
