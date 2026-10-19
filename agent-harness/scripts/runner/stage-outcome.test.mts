import assert from 'node:assert/strict';
import { test } from 'node:test';

import { denialOf, outcomeOf, resultPathIn } from './stage-outcome.mts';
import { CLAUDE_RESULT } from '../lib/test-support.mts';

const ROOT = '/repo';
// run-stage.mts's summary for one priced session.
const OUT = [
  'express-plan: PASS — .local/agent-harness/work/257/express-plan.md',
  '1 model row(s), 7 s, $0.0217 at list price; Claude Code reported $0.0216904',
  'wrote .local/agent-harness/work/257/run-log.md and .local/agent-harness/work/257/usage/01-express-plan.json',
  '',
].join('\n');

test('a priced session: its status, both spends, its session id and its result file', () => {
  const outcome = outcomeOf(ROOT, {
    stageName: 'express-plan',
    out: OUT,
    code: 0,
    signal: null,
    saved: CLAUDE_RESULT,
  });

  assert.deepEqual(outcome, {
    status: 'PASS — .local/agent-harness/work/257/express-plan.md',
    predictedUsd: 0.0217,
    reportedUsd: 0.0216904,
    usd: 0.0217,
    sessionId: CLAUDE_RESULT.session_id,
    denials: [],
    resultPath: '.local/agent-harness/work/257/usage/01-express-plan.json',
    transcriptPath: null,
    interrupted: null,
  });
});

test("an unpriced model falls back to Claude Code's reported cost; no JSON result leaves spend unknown", () => {
  const unpriced = [
    'express-plan: PASS',
    '1 model row(s), 7 s, no prediction for claude-unpriced-9; Claude Code reported $3.2',
    'wrote .local/agent-harness/work/257/run-log.md and .local/agent-harness/work/257/usage/01-express-plan.json',
  ].join('\n');

  const priced = outcomeOf(ROOT, {
    stageName: 'express-plan',
    out: unpriced,
    code: 0,
    signal: null,
    saved: CLAUDE_RESULT,
  });
  const unread = outcomeOf(ROOT, {
    stageName: 'express-plan',
    out: unpriced,
    code: 1,
    signal: null,
    saved: undefined,
  });

  assert.deepEqual(
    [priced.predictedUsd, priced.reportedUsd, priced.usd],
    [null, 3.2, 3.2]
  );
  assert.deepEqual(
    [unread.reportedUsd, unread.usd, unread.sessionId],
    [null, null, null]
  );
});

test('without a status line the step failed in run-stage itself', () => {
  assert.equal(
    outcomeOf(ROOT, {
      stageName: 'plan',
      out: '',
      code: 2,
      signal: null,
      saved: undefined,
    }).status,
    'FAIL — run-stage exit 2'
  );
  assert.equal(
    outcomeOf(ROOT, {
      stageName: 'plan',
      out: '',
      code: null,
      signal: 'SIGKILL',
      saved: undefined,
    }).status,
    'FAIL — run-stage killed by SIGKILL'
  );
});

test('an interrupt is read from the status line, the signal or exit 130; the kept transcript is named', () => {
  const interruptedOut = [
    'plan: interrupted (SIGTERM): error_during_execution',
    'wrote .local/agent-harness/work/1/run-log.md and .local/agent-harness/work/1/usage/01-plan.json',
    'transcript kept: .local/agent-harness/work/1/usage/01-plan.transcript.jsonl',
  ].join('\n');
  const of = (
    out: string,
    code: number | null,
    signal: NodeJS.Signals | null
  ): string | null =>
    outcomeOf(ROOT, { stageName: 'plan', out, code, signal, saved: undefined })
      .interrupted;

  assert.equal(of(interruptedOut, 130, null), 'SIGTERM');
  assert.equal(of('', null, 'SIGINT'), 'SIGINT');
  assert.equal(of('', 130, null), 'SIGINT');
  assert.equal(of('', null, 'SIGKILL'), null);
  assert.equal(
    outcomeOf(ROOT, {
      stageName: 'plan',
      out: interruptedOut,
      code: 130,
      signal: null,
      saved: undefined,
    }).transcriptPath,
    '.local/agent-harness/work/1/usage/01-plan.transcript.jsonl'
  );
  assert.equal(
    resultPathIn(interruptedOut),
    '.local/agent-harness/work/1/usage/01-plan.json'
  );
});

test('permission denials name the tool and its target, relative to the repo and cut to 80 characters', () => {
  const saved = {
    ...CLAUDE_RESULT,
    permission_denials: [
      { tool_name: 'Write', tool_input: { file_path: '/repo/README.md' } },
      {
        tool_name: 'Bash',
        tool_input: { command: `git   push\n${'x'.repeat(100)}` },
      },
      { tool_name: 'Grep', tool_input: { pattern: 'TODO' } },
      'not a denial',
    ],
  };

  const { denials } = outcomeOf(ROOT, {
    stageName: 'express-plan',
    out: OUT,
    code: 0,
    signal: null,
    saved,
  });

  assert.equal(denials[0], 'Write README.md');
  assert.equal(denials[1], `Bash git push ${'x'.repeat(70)}…`);
  assert.equal(denials[2], 'Grep TODO');
  assert.equal(denials[3], 'undefined');
  assert.equal(
    denialOf(ROOT)({
      tool_name: 'Read',
      tool_input: { file_path: '/elsewhere/a' },
    }),
    'Read ../elsewhere/a'
  );
});

test('a saved file that is not a session result gives no session, spend reported or denials', () => {
  const outcome = outcomeOf(ROOT, {
    stageName: 'express-plan',
    out: OUT,
    code: 0,
    signal: null,
    saved: { type: 'other', permission_denials: [{ tool_name: 'Write' }] },
  });

  assert.deepEqual(
    [outcome.sessionId, outcome.reportedUsd, outcome.denials],
    [null, null, []]
  );
  assert.equal(outcome.usd, 0.0217);
});
