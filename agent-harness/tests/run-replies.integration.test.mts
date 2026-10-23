import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PassThrough } from 'node:stream';
import { test } from 'node:test';

import {
  setup,
  fakeClaude,
  run,
  work,
  gates,
  promptOf,
} from './run-support.mts';
import { lineReader } from '../scripts/runner/gate-input.mts';

test('a typed reply that is not a decision is kept: a bare decision word next uses it, and an approval with text binds', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(root, claude, [
    '1. file a follow-up, 2. fix in this PR, 2 commits. Approve',
    'approve',
    'stop',
  ]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /not a decision .*\n {3}kept: "1\. file a follow-up, 2\. fix in this PR, 2 commits\. Approve" — reply approve, revise, loop or stop alone to use it/
  );
  const [row] = gates(root);
  assert.equal(
    row?.decision,
    'approve (approve; 1. file a follow-up, 2. fix in this PR, 2 commits. Approve)'
  );
  assert.match(
    result.stdout,
    /recorded at G1\+G3: approve \(approve; 1\. file a follow-up/
  );
  assert.match(
    readFileSync(work(root, 'intake-decisions.md'), 'utf8'),
    /G1\+G3 approved with \(verbatim\): approve; 1\. file a follow-up, 2\. fix in this PR, 2 commits\. Approve/
  );
});

test('a kept reply followed by a whole decision is not lost: the gate note records it', () => {
  const root = setup();
  const claude = fakeClaude(root);

  const result = run(root, claude, [
    'looks fine to me',
    'revise: name the test file',
    'stop',
  ]);

  assert.equal(result.status, 0, result.stderr);
  const [row] = gates(root);
  assert.equal(row?.decision, 'revise: name the test file');
  assert.match(row?.note ?? '', /refused reply \(kept\): looks fine to me/);
  assert.match(
    promptOf(claude.calls()[1]),
    /Revise instruction from the gate \(verbatim\): name the test file/
  );
});

test('a bare revise or loop word with nothing kept is still not a decision', () => {
  const root = setup();
  const result = run(root, fakeClaude(root), ['revise', 'stop']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /not a decision/);
  assert.deepEqual(
    gates(root).map(({ decision }) => decision),
    ['stop']
  );
});

test('on a terminal, a multi-line paste is one reply; lines typed apart are separate replies', async () => {
  const input = Object.assign(new PassThrough(), { isTTY: true });
  const ask = lineReader(input);

  const pasted = ask('G6> ');
  input.write('loop: the story does not render\n');
  input.write('move its body into a named component\n');
  assert.equal(
    await pasted,
    'loop: the story does not render\nmove its body into a named component'
  );

  const first = ask('G6> ');
  input.write('approve\n');
  assert.equal(await first, 'approve');
  const second = ask('G7> ');
  await new Promise((resolveLater) => setTimeout(resolveLater, 250));
  input.write('stop\n');
  assert.equal(await second, 'stop');
});
