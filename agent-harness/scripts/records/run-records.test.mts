import assert from 'node:assert/strict';
import { test } from 'node:test';

import { tableUnder, withGateRows } from './run-records.mts';

// GFM ends a cell at a `|` that no backslash escapes, and reads `\\` as one backslash.
test('a gate row with backslashes and pipes is written GFM-escaped and reads back unchanged', () => {
  const markdown = withGateRows('# Run 257\n', [
    ['G1', 't0', 't1', 'a\\|b', 'C:\\dir\\', 'x|y'],
  ]);

  assert.ok(
    markdown
      .split('\n')
      .includes(String.raw`| G1 | t0 | t1 | a\\\|b | C:\\dir\\ | x\|y |`),
    markdown
  );
  assert.deepEqual(tableUnder(markdown, 'gate decisions'), [
    {
      gate: 'G1',
      presented: 't0',
      decided: 't1',
      decision: 'a\\|b',
      snapshot: 'C:\\dir\\',
      note: 'x|y',
    },
  ]);
});
