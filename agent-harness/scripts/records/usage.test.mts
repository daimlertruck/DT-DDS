import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  loadPrices,
  ownOf,
  previousOf,
  priceOf,
  usageRows,
  type ClaudeResult,
} from './usage.mts';
import {
  CLAUDE_RESULT,
  CLAUDE_RESULT_RESUMED,
  CLAUDE_RESULT_WITH_UTILITY,
} from '../lib/test-support.mts';

const repo = fileURLToPath(new URL('../../..', import.meta.url));
const prices = loadPrices(repo);
const near = (actual: number | null | undefined, expected: number): void => {
  assert.equal(typeof actual, 'number', `${actual} is not a number`);
  assert.ok(
    Math.abs((actual ?? NaN) - expected) < 1e-9,
    `${actual} != ${expected}`
  );
};

test('one row per model: tokens by type, main-loop turns, final context, and the predicted cost at list price', () => {
  const [row, ...rest] = usageRows(CLAUDE_RESULT, prices);

  assert.deepEqual(rest, []);
  assert.deepEqual(
    { ...row, predictedUsd: undefined },
    {
      model: 'claude-opus-5-5',
      requests: 2,
      uncachedIn: 4,
      cacheWrite: 463,
      cacheRead: 48652,
      output: 412,
      predictedUsd: undefined,
      reportedUsd: 0.0216904,
      finalContext: 2 + 24326 + 463,
    }
  );
  near(row?.predictedUsd, CLAUDE_RESULT.total_cost_usd);
});

test('the main loop comes first, found by its usage; utility models follow without turns or context', () => {
  const rows = usageRows(CLAUDE_RESULT_WITH_UTILITY, prices);

  assert.deepEqual(
    rows.map(({ model, requests, finalContext }) => [
      model,
      requests,
      finalContext,
    ]),
    [
      ['claude-opus-5-5', 2, 24791],
      ['claude-haiku-4-5', null, null],
    ]
  );
  near(rows[1]?.predictedUsd, 0.030745);
  near(
    (rows[0]?.predictedUsd ?? NaN) + (rows[1]?.predictedUsd ?? NaN),
    CLAUDE_RESULT_WITH_UTILITY.total_cost_usd
  );
});

test('cache writes are priced at the TTL the session used, and at the 1-hour rate when it is not reported', () => {
  const fiveMinutes: ClaudeResult = {
    ...CLAUDE_RESULT,
    usage: {
      ...CLAUDE_RESULT.usage,
      cache_creation: {
        ephemeral_1h_input_tokens: 0,
        ephemeral_5m_input_tokens: 463,
      },
    },
  };
  const unreported: ClaudeResult = {
    ...CLAUDE_RESULT,
    usage: { ...CLAUDE_RESULT.usage, cache_creation: undefined },
  };

  near(
    usageRows(fiveMinutes, prices)[0]?.predictedUsd,
    (4 * 4 + 463 * 5 + 48652 * 0.2 + 412 * 20) / 1e6
  );
  near(
    usageRows(unreported, prices)[0]?.predictedUsd,
    CLAUDE_RESULT.total_cost_usd
  );
});

// A session stopped by a tiny `--max-budget-usd` can return `usage` zeroed, with no iterations, while
// modelUsage holds the session.
test('a result whose usage is zeroed still prices modelUsage, with final context unknown', () => {
  const budgetExhausted: ClaudeResult = {
    ...CLAUDE_RESULT,
    subtype: 'error_max_budget_usd',
    is_error: true,
    num_turns: 1,
    total_cost_usd: 0.1868562,
    usage: {
      input_tokens: 0,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      output_tokens: 0,
      cache_creation: {
        ephemeral_1h_input_tokens: 0,
        ephemeral_5m_input_tokens: 0,
      },
      iterations: [],
    },
    modelUsage: {
      'claude-opus-5-5': {
        inputTokens: 2,
        outputTokens: 142,
        cacheReadInputTokens: 10481,
        cacheCreationInputTokens: 22739,
        costUSD: 0.1868562,
      },
    },
  };

  const [row] = usageRows(budgetExhausted, prices);

  assert.equal(row?.model, 'claude-opus-5-5');
  assert.equal(row.requests, 1);
  assert.equal(row.finalContext, null);
  near(row.predictedUsd, 0.1868562);
});

test('a model prices.json does not list keeps its tokens but has no prediction', () => {
  const unlisted: ClaudeResult = {
    ...CLAUDE_RESULT,
    modelUsage: {
      'claude-haiku-5-5': CLAUDE_RESULT.modelUsage['claude-opus-5-5'],
    },
  };

  const [row] = usageRows(unlisted, prices);

  assert.equal(row?.model, 'claude-haiku-5-5');
  assert.equal(row.cacheRead, 48652);
  assert.equal(row.predictedUsd, null);
});

test('prices are looked up by the bare model id', () => {
  assert.equal(
    priceOf(prices, 'claude-opus-5-5[1m]'),
    prices.models['claude-opus-5-5']
  );
  assert.equal(
    priceOf(prices, 'claude-haiku-4-5-20251001'),
    prices.models['claude-haiku-4-5']
  );
  assert.equal(priceOf(prices, 'gpt-x'), null);
});

test('a resumed session is priced from its own invocation: the earlier result of its session is subtracted', () => {
  const own = ownOf(CLAUDE_RESULT_RESUMED, CLAUDE_RESULT);
  const [row, ...rest] = usageRows(own, prices);

  assert.deepEqual(rest, []);
  assert.deepEqual(
    { ...row, predictedUsd: undefined, reportedUsd: undefined },
    {
      model: 'claude-opus-5-5',
      requests: 2,
      uncachedIn: 4,
      cacheWrite: 455,
      cacheRead: 14976,
      output: 170,
      predictedUsd: undefined,
      reportedUsd: undefined,
      finalContext: 2 + 7488 + 455,
    }
  );
  near(row?.predictedUsd, 0.0100512);
  near(row?.reportedUsd, 0.0100512);
  near(own.total_cost_usd, 0.0100512);
});

test('a result is its own when no earlier result of its session exists', () => {
  assert.equal(ownOf(CLAUDE_RESULT_RESUMED, null), CLAUDE_RESULT_RESUMED);
  assert.equal(
    ownOf(CLAUDE_RESULT_RESUMED, {
      ...CLAUDE_RESULT,
      session_id: 'another-session',
    }),
    CLAUDE_RESULT_RESUMED
  );
});

test('the earlier result of a session is the latest one saved before it', () => {
  const other = { ...CLAUDE_RESULT, session_id: 'another-session' };
  const first = { ...CLAUDE_RESULT, num_turns: 1 };

  assert.equal(
    previousOf([first, other, CLAUDE_RESULT], CLAUDE_RESULT_RESUMED),
    CLAUDE_RESULT
  );
  assert.equal(previousOf([other], CLAUDE_RESULT_RESUMED), null);
  assert.equal(
    previousOf([undefined, 'not json'], CLAUDE_RESULT_RESUMED),
    null
  );
});

test('a result without modelUsage has no rows', () => {
  assert.deepEqual(
    usageRows({ ...CLAUDE_RESULT, modelUsage: undefined }, prices),
    []
  );
});

test('a result read from a transcript is its own part: never subtracted from, never subtracted', () => {
  const fromTranscript: ClaudeResult = {
    ...CLAUDE_RESULT,
    subtype: 'transcript',
    total_cost_usd: null,
  };
  assert.equal(ownOf(fromTranscript, CLAUDE_RESULT), fromTranscript);
  assert.equal(
    previousOf([CLAUDE_RESULT, fromTranscript], CLAUDE_RESULT_RESUMED),
    CLAUDE_RESULT
  );
});
