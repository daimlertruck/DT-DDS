import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  decisionCellOf,
  isApprovable,
  keptWith,
  missingConsent,
  parseDecision,
  refusalOf,
  replyPromptOf,
  withKept,
  type GateRules,
} from './gate-replies.mts';

const PASSED: GateRules = {
  status: 'PASS',
  blocked: false,
  askFirst: [],
  canLoop: false,
};

test('a reply decides by its first word; an instruction keeps its lines; anything else is not a decision', () => {
  assert.deepEqual(parseDecision('  Approve; plan reads well '), {
    kind: 'approve',
    text: 'Approve; plan reads well',
  });
  assert.deepEqual(parseDecision('revise: name the test\nand the story'), {
    kind: 'revise',
    text: 'name the test\nand the story',
  });
  assert.deepEqual(parseDecision('REJECT : too broad'), {
    kind: 'revise',
    text: 'too broad',
  });
  assert.deepEqual(parseDecision('loop: fix the story'), {
    kind: 'loop',
    text: 'fix the story',
  });
  assert.deepEqual(parseDecision('lane:escalate'), {
    kind: 'lane',
    lane: 'escalate',
  });
  assert.deepEqual(parseDecision('Lane 1'), { kind: 'lane', lane: '1' });
  assert.deepEqual(parseDecision('stop for now'), {
    kind: 'stop',
    text: 'stop for now',
  });
  assert.deepEqual(parseDecision('lane: 3'), {
    kind: 'unknown',
    text: 'lane: 3',
  });
  assert.deepEqual(parseDecision(null), { kind: 'unknown', text: '' });
});

test('a bare decision word after a kept reply uses the kept text, and nothing stays kept', () => {
  const kept = '1. a follow-up\n2. fix here';

  assert.deepEqual(withKept(parseDecision('approve'), 'approve', kept), {
    decision: { kind: 'approve', text: `approve; ${kept}` },
    kept: null,
  });
  assert.deepEqual(withKept(parseDecision('reject'), ' Reject ', kept), {
    decision: { kind: 'revise', text: kept },
    kept: null,
  });
  assert.deepEqual(withKept(parseDecision('loop'), 'loop', kept), {
    decision: { kind: 'loop', text: kept },
    kept: null,
  });
});

test('a whole decision leaves the kept text kept; with nothing kept a reply is as parsed', () => {
  const whole = parseDecision('revise: shorter');

  assert.deepEqual(withKept(whole, 'revise: shorter', 'looks fine'), {
    decision: whole,
    kept: 'looks fine',
  });
  assert.deepEqual(withKept(parseDecision('approve'), 'approve', null), {
    decision: { kind: 'approve', text: 'approve' },
    kept: null,
  });
  assert.equal(keptWith(null, 'first'), 'first');
  assert.equal(keptWith('first', 'second'), 'first\nsecond');
});

test('only a plain PASS is approvable, leading markdown aside', () => {
  assert.equal(isApprovable('PASS — .local/agent-harness/work/1/x.md'), true);
  assert.equal(isApprovable('**PASS**'), true);
  assert.equal(isApprovable('> PASS'), true);
  assert.equal(isApprovable('PASS (partial) — turn limit'), false);
  assert.equal(isApprovable('PARTIAL: two ACs left'), false);
  assert.equal(isApprovable('BLOCKER: lane'), false);
  assert.equal(isApprovable('PASSED'), false);
  assert.equal(isApprovable(undefined), false);
});

test('each Ask-first path needs its own consent, naming who gave it', () => {
  const askFirst = ['.github/workflows/ci.yml', 'scripts/release.js'];

  assert.deepEqual(
    missingConsent(
      'approve; consent: .github/workflows/ci.yml (Ana, maintainer)',
      askFirst
    ),
    ['scripts/release.js']
  );
  assert.deepEqual(
    missingConsent(
      'approve; consent: .github/workflows/ci.yml (Ana); consent: scripts/release.js (Bo, maintainer)',
      askFirst
    ),
    []
  );
  // A path is matched literally: the dot is not a wildcard.
  assert.deepEqual(
    missingConsent('approve; consent: scripts/releasexjs (Ana)', [
      'scripts/release.js',
    ]),
    ['scripts/release.js']
  );
});

test('a gate refuses a non-decision, an approval of a failed step, missing consent and a loop before implement', () => {
  assert.equal(
    refusalOf(parseDecision('looks good'), PASSED),
    'not a decision (reply approve, revise: <instruction>, lane:N or stop)'
  );
  assert.equal(
    refusalOf(parseDecision('looks good'), { ...PASSED, canLoop: true }),
    'not a decision (reply approve, revise: <instruction>, loop: <instruction>, lane:N or stop)'
  );
  assert.equal(
    refusalOf(parseDecision('approve'), {
      ...PASSED,
      status: 'BLOCKER: x',
      blocked: true,
      canLoop: true,
    }),
    'the step did not pass (BLOCKER: x); reply revise:, loop:, lane:N or stop'
  );
  assert.equal(
    refusalOf(parseDecision('approve'), { ...PASSED, askFirst: ['scripts/a'] }),
    'consent missing for: scripts/a'
  );
  assert.equal(
    refusalOf(parseDecision('loop: again'), PASSED),
    'loop: goes back to implement, which has not run; use revise:'
  );
});

test('a gate accepts stop and lane on a failed step, and loop once implement has run', () => {
  const blocked = { ...PASSED, status: 'FAIL', blocked: true };

  assert.equal(refusalOf(parseDecision('stop'), blocked), null);
  assert.equal(refusalOf(parseDecision('lane:2'), blocked), null);
  assert.equal(refusalOf(parseDecision('revise: retry'), blocked), null);
  assert.equal(
    refusalOf(parseDecision('loop: again'), { ...PASSED, canLoop: true }),
    null
  );
});

test('the prompt offers loop only where it is accepted; the decision cell names the reply', () => {
  assert.equal(
    replyPromptOf('G3', false),
    'G3> approve | revise: <text> | lane:N | stop: '
  );
  assert.equal(
    replyPromptOf('G6', true),
    'G6> approve | revise: <text> | loop: <text> | lane:N | stop: '
  );
  assert.equal(decisionCellOf(parseDecision('approve')), 'approve');
  assert.equal(
    decisionCellOf(parseDecision('approve; ok')),
    'approve (approve; ok)'
  );
  assert.equal(
    decisionCellOf(parseDecision('revise: shorter')),
    'revise: shorter'
  );
  assert.equal(decisionCellOf(parseDecision('loop: again')), 'loop: again');
  assert.equal(decisionCellOf(parseDecision('lane: 2')), 'lane:2');
  assert.equal(decisionCellOf(parseDecision('stop now')), 'stop');
});
