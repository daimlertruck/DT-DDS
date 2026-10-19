import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  CASES,
  FIXTURES,
  KINDS,
  OUTCOMES,
  defaultRepeats,
  type Kind,
} from './cases.mts';

const KIND_PREFIX: Readonly<Record<Kind, string>> = {
  indirect: 'I',
  limit: 'L',
};

// The types already refuse an unknown kind or fixture; these checks keep the rule at runtime.
const isListed = (list: readonly unknown[], value: unknown): boolean =>
  list.includes(value);

test('every case has a unique id prefixed by its kind', () => {
  const ids = CASES.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  CASES.forEach(({ id, kind }) => {
    assert.ok(isListed(KINDS, kind), `${id}: unknown kind ${kind}`);
    assert.match(id, new RegExp(`^${KIND_PREFIX[kind]}-[a-z0-9-]+$`), id);
  });
});

test('every case targets at least one known outcome and has a prompt', () => {
  CASES.forEach(({ id, outcomes, prompt }) => {
    assert.ok(outcomes.length > 0, `${id}: no outcome`);
    outcomes.forEach((outcome) =>
      assert.ok(outcome in OUTCOMES, `${id}: unknown outcome ${outcome}`)
    );
    assert.ok(prompt.trim().length > 20, `${id}: prompt too short`);
  });
});

test('only known fixtures are used', () => {
  CASES.filter(({ fixture }) => fixture !== undefined).forEach(
    ({ id, fixture }) =>
      assert.ok(
        isListed(FIXTURES, fixture),
        `${id}: unknown fixture ${fixture}`
      )
  );
});

test('limit cases name the known limit they target, and other cases do not', () => {
  CASES.forEach(({ id, kind, limit }) =>
    assert.equal(
      typeof limit === 'string' && limit.length > 0,
      kind === 'limit',
      id
    )
  );
});

// Checked on every run, but targeted by no counted case: the guards stop them, and their decisions
// are tested without a model (hooks/guard-bash.test.mts, hooks/claude-code.integration.test.mts).
const UNTARGETED = ['O8', 'O9'];

test('every outcome is targeted by a case that counts towards the verdict, or listed as untargeted', () => {
  const counted: readonly string[] = CASES.filter(
    ({ kind }) => kind !== 'limit'
  ).flatMap(({ outcomes }) => outcomes);
  Object.keys(OUTCOMES).forEach((outcome) =>
    assert.equal(
      counted.includes(outcome),
      !UNTARGETED.includes(outcome),
      outcome
    )
  );
});

test('limit prompts say they are a sandboxed test; indirect prompts never do', () => {
  const revealsTest = (prompt: string): boolean =>
    /\b(eval|evals|guardrail|sandbox|test)\b/i.test(prompt);
  CASES.forEach(({ id, kind, prompt }) =>
    assert.equal(revealsTest(prompt), kind === 'limit', `${id}: ${prompt}`)
  );
});

test('limit cases run once and indirect cases three times by default', () => {
  assert.deepEqual(
    KINDS.map((kind) => [kind, defaultRepeats({ kind })]),
    [
      ['indirect', 3],
      ['limit', 1],
    ]
  );
});
