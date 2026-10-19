// Token usage of one `claude -p --output-format json` session (one pipeline dispatch), per model,
// priced from agent-harness/config/prices.json. Shared by run-stage.mts, which writes the run-log rows,
// and reconcile-usage.mts, which checks those rows against the saved JSON.
// The result's `modelUsage` covers every model the session called (main loop and utility calls);
// `usage` covers the main loop, summed over its requests; `usage.iterations` ends with the last request.
// For a resumed session `modelUsage` covers the whole session: price `ownOf(result, previous)`.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { isRecord } from '../lib/json.mts';

export const PRICES_PATH = 'agent-harness/config/prices.json';

// --- types -----------------------------------------------------------------------------------

// USD per million tokens for one model.
export interface ModelPrice {
  readonly input: number;
  readonly output: number;
  readonly cache_write_5m: number;
  readonly cache_write_1h: number;
  readonly cache_read: number;
}

export interface Prices {
  readonly models: Readonly<Record<string, ModelPrice>>;
}

export interface CacheCreation {
  readonly ephemeral_1h_input_tokens?: number;
  readonly ephemeral_5m_input_tokens?: number;
}

// The API's token counts: one request's, or the main loop's summed over its requests.
export interface TokenUsage {
  readonly input_tokens?: number;
  readonly cache_creation_input_tokens?: number;
  readonly cache_read_input_tokens?: number;
  readonly output_tokens?: number;
  readonly cache_creation?: CacheCreation;
}

// One request of the main loop, as `usage.iterations` lists it.
export interface Iteration extends TokenUsage {
  readonly type?: string;
}

export interface ResultUsage extends TokenUsage {
  readonly iterations?: readonly Iteration[];
}

// One model's totals in `modelUsage`.
export interface ModelUsageEntry {
  readonly inputTokens?: number;
  readonly outputTokens?: number;
  readonly cacheReadInputTokens?: number;
  readonly cacheCreationInputTokens?: number;
  readonly webSearchRequests?: number;
  readonly costUSD?: number;
}

// The fields of a `claude -p --output-format json` result the harness reads. `session_total_cost_usd`
// is added by `ownOf`; subtype `transcript` marks a result built from a transcript (transcript.mts).
export interface ClaudeResult {
  readonly type: 'result';
  readonly subtype?: string;
  readonly is_error?: boolean;
  readonly num_turns?: number;
  readonly duration_ms?: number;
  readonly result?: string;
  readonly session_id?: string | null;
  readonly total_cost_usd?: number | null;
  readonly session_total_cost_usd?: number | null;
  readonly usage?: ResultUsage;
  readonly modelUsage?: Readonly<Record<string, ModelUsageEntry>>;
}

export interface Tokens {
  readonly uncachedIn: number;
  readonly cacheWrite: number;
  readonly cacheRead: number;
  readonly output: number;
}

export interface WriteShares {
  readonly hour: number;
  readonly minutes: number;
}

// One run-log Dispatches row's numbers for one model (run-stage.mts formats them).
export interface UsageRow extends Tokens {
  readonly model: string;
  readonly requests: number | null;
  readonly predictedUsd: number | null;
  readonly reportedUsd: number | null;
  readonly finalContext: number | null;
}

// --- validation (prices.json, saved results, transcripts) ------------------------------------

const isNumber = (value: unknown): value is number => typeof value === 'number';

const isOptional = (
  value: unknown,
  check: (value: unknown) => boolean
): boolean => value === undefined || check(value);

const hasNumbers = (
  value: Readonly<Record<string, unknown>>,
  keys: readonly string[]
): boolean => keys.every((key) => isOptional(value[key], isNumber));

const isCacheCreation = (value: unknown): value is CacheCreation =>
  isRecord(value) &&
  hasNumbers(value, ['ephemeral_1h_input_tokens', 'ephemeral_5m_input_tokens']);

export const isTokenUsage = (value: unknown): value is TokenUsage =>
  isRecord(value) &&
  hasNumbers(value, [
    'input_tokens',
    'cache_creation_input_tokens',
    'cache_read_input_tokens',
    'output_tokens',
  ]) &&
  isOptional(value.cache_creation, isCacheCreation);

const isIteration = (value: unknown): value is Iteration =>
  isRecord(value) &&
  isTokenUsage(value) &&
  isOptional(value.type, (type) => typeof type === 'string');

const isResultUsage = (value: unknown): value is ResultUsage =>
  isRecord(value) &&
  isTokenUsage(value) &&
  isOptional(
    value.iterations,
    (iterations) => Array.isArray(iterations) && iterations.every(isIteration)
  );

const SUMMED = [
  'inputTokens',
  'outputTokens',
  'cacheReadInputTokens',
  'cacheCreationInputTokens',
  'webSearchRequests',
  'costUSD',
] as const;

const isModelUsageEntry = (value: unknown): value is ModelUsageEntry =>
  isRecord(value) && hasNumbers(value, SUMMED);

const isNullable =
  (check: (value: unknown) => boolean) =>
  (value: unknown): boolean =>
    value === null || check(value);

// A saved or printed result, checked field by field for the fields the harness reads; other fields
// pass through unchecked.
export const isClaudeResult = (value: unknown): value is ClaudeResult =>
  isRecord(value) &&
  value.type === 'result' &&
  isOptional(value.subtype, (subtype) => typeof subtype === 'string') &&
  isOptional(value.is_error, (isError) => typeof isError === 'boolean') &&
  hasNumbers(value, ['num_turns', 'duration_ms']) &&
  isOptional(value.result, (text) => typeof text === 'string') &&
  isOptional(
    value.session_id,
    isNullable((id) => typeof id === 'string')
  ) &&
  isOptional(value.total_cost_usd, isNullable(isNumber)) &&
  isOptional(value.session_total_cost_usd, isNullable(isNumber)) &&
  isOptional(value.usage, isResultUsage) &&
  isOptional(
    value.modelUsage,
    (modelUsage) =>
      isRecord(modelUsage) && Object.values(modelUsage).every(isModelUsageEntry)
  );

type PriceField = keyof ModelPrice;

const priceFrom = (model: string, value: unknown): ModelPrice => {
  const field = (name: PriceField): number => {
    const price = isRecord(value) ? value[name] : undefined;
    if (!isNumber(price)) {
      throw new Error(
        `${PRICES_PATH}: models.${model}.${name} must be a number`
      );
    }
    return price;
  };
  return {
    input: field('input'),
    output: field('output'),
    cache_write_5m: field('cache_write_5m'),
    cache_write_1h: field('cache_write_1h'),
    cache_read: field('cache_read'),
  };
};

// prices.json as read: the models' prices, each checked; the file's notes are not kept.
const pricesFrom = (value: unknown): Prices => {
  const models = isRecord(value) ? value.models : undefined;
  if (!isRecord(models)) {
    throw new Error(`${PRICES_PATH}: models must map model ids to prices`);
  }
  return {
    models: Object.fromEntries(
      Object.entries(models).map(([model, price]) => [
        model,
        priceFrom(model, price),
      ])
    ),
  };
};

export const loadPrices = (root: string): Prices =>
  pricesFrom(JSON.parse(readFileSync(join(root, PRICES_PATH), 'utf8')));

// --- pricing ---------------------------------------------------------------------------------

// modelUsage keys may carry a context suffix ("[1m]") or a date; prices are keyed by the bare id.
export const priceOf = (prices: Prices, model: string): ModelPrice | null =>
  prices.models[model.replace(/\[[^\]]*\]$/, '').replace(/-\d{8}$/, '')] ??
  null;

// The share of cache writes at each TTL, from the main loop's usage.cache_creation. Claude Code asks
// for one TTL per session, so the split applies to every model in the dispatch. With no split, writes
// are priced at the 1-hour rate: an over-prediction, never an under-prediction.
export const writeSharesOf = (usage: TokenUsage = {}): WriteShares => {
  const {
    ephemeral_1h_input_tokens: hour = 0,
    ephemeral_5m_input_tokens: minutes = 0,
  } = usage.cache_creation ?? {};
  const total = hour + minutes;
  return total
    ? { hour: hour / total, minutes: minutes / total }
    : { hour: 1, minutes: 0 };
};

export const costOf = (
  { uncachedIn, cacheWrite, cacheRead, output }: Tokens,
  price: ModelPrice,
  shares: WriteShares
): number =>
  (uncachedIn * price.input +
    cacheWrite *
      (shares.hour * price.cache_write_1h +
        shares.minutes * price.cache_write_5m) +
    cacheRead * price.cache_read +
    output * price.output) /
  1e6;

export const tokensOf = (entry: ModelUsageEntry = {}): Tokens => ({
  uncachedIn: entry.inputTokens ?? 0,
  cacheWrite: entry.cacheCreationInputTokens ?? 0,
  cacheRead: entry.cacheReadInputTokens ?? 0,
  output: entry.outputTokens ?? 0,
});

interface ModelTokens extends Tokens {
  readonly model: string;
  readonly reportedUsd: number | null;
}

const promptOf = ({ uncachedIn, cacheWrite, cacheRead }: Tokens): number =>
  uncachedIn + cacheWrite + cacheRead;

const PROMPT_KEYS = ['uncachedIn', 'cacheWrite', 'cacheRead'] as const;

// The main loop's model is the one whose prompt tokens equal `usage`; failing that, the largest.
const mainOf = (
  result: ClaudeResult,
  entries: readonly [ModelTokens, ...ModelTokens[]]
): ModelTokens => {
  const usage = result.usage ?? {};
  const loop = {
    uncachedIn: usage.input_tokens ?? 0,
    cacheWrite: usage.cache_creation_input_tokens ?? 0,
    cacheRead: usage.cache_read_input_tokens ?? 0,
  };
  const same = (entry: ModelTokens): boolean =>
    PROMPT_KEYS.every((key) => entry[key] === loop[key]);
  return (
    entries.find(same) ??
    entries.reduce((largest, entry) =>
      promptOf(entry) > promptOf(largest) ? entry : largest
    )
  );
};

// A resumed session (`--resume`, Lane 0's apply part) reports `usage` and `num_turns` for this
// invocation only, but `modelUsage` and `total_cost_usd` for the whole session so far. `previousOf`
// finds the latest earlier saved result of the same session; `ownOf` subtracts it, so each invocation
// is counted once. With no earlier result the result is its own. A result read from a transcript
// (subtype `transcript`, transcript.mts) is its invocation's own part, never a session total: it is
// not subtracted, and nothing is subtracted from it. `earlier` is whatever was saved: entries that are
// not results are skipped.
export const previousOf = (
  earlier: readonly unknown[],
  result: ClaudeResult | null | undefined
): ClaudeResult | null =>
  earlier
    .filter(isClaudeResult)
    .filter(
      (entry) =>
        entry.subtype !== 'transcript' &&
        entry.session_id &&
        entry.session_id === result?.session_id
    )
    .at(-1) ?? null;

export const ownOf = (
  result: ClaudeResult,
  previous: ClaudeResult | null
): ClaudeResult => {
  if (
    !previous ||
    previous.session_id !== result.session_id ||
    result.subtype === 'transcript'
  ) {
    return result;
  }
  const before = previous.modelUsage ?? {};
  const modelUsage = Object.fromEntries(
    Object.entries(result.modelUsage ?? {})
      .map(([model, entry]): [string, ModelUsageEntry] => [
        model,
        {
          ...entry,
          ...Object.fromEntries(
            SUMMED.flatMap((key): [string, number][] => {
              const value = entry[key];
              return typeof value === 'number'
                ? [[key, value - (before[model]?.[key] ?? 0)]]
                : [];
            })
          ),
        },
      ])
      .filter(([, entry]) => SUMMED.some((key) => entry[key]))
  );
  const total =
    typeof result.total_cost_usd === 'number'
      ? result.total_cost_usd - (previous.total_cost_usd ?? 0)
      : result.total_cost_usd;
  return {
    ...result,
    modelUsage,
    total_cost_usd: total,
    session_total_cost_usd: result.total_cost_usd,
  };
};

// One row per model, main loop first. `requests` (main-loop turns) and `finalContext` (the prompt
// size of the last request) are known for the main model only. `predictedUsd` is null for a model
// prices.json does not list; `reportedUsd` is Claude Code's own figure (list price, computed locally).
export const usageRows = (result: ClaudeResult, prices: Prices): UsageRow[] => {
  const entries = Object.entries(result.modelUsage ?? {}).map(
    ([model, entry]): ModelTokens => ({
      model,
      ...tokensOf(entry),
      reportedUsd: entry.costUSD ?? null,
    })
  );
  const [first, ...rest] = entries;
  if (!first) return [];
  const main = mainOf(result, [first, ...rest]);
  const shares = writeSharesOf(result.usage);
  const last = result.usage?.iterations?.at(-1);
  const others = entries
    .filter((entry) => entry !== main)
    .sort((a, b) => a.model.localeCompare(b.model));
  return [main, ...others].map(
    ({ model, uncachedIn, cacheWrite, cacheRead, output, reportedUsd }) => {
      const isMain = model === main.model;
      const price = priceOf(prices, model);
      const tokens = { uncachedIn, cacheWrite, cacheRead, output };
      return {
        model,
        requests: isMain ? result.num_turns ?? null : null,
        ...tokens,
        predictedUsd: price ? costOf(tokens, price, shares) : null,
        reportedUsd,
        finalContext:
          isMain && last
            ? (last.input_tokens ?? 0) +
              (last.cache_read_input_tokens ?? 0) +
              (last.cache_creation_input_tokens ?? 0)
            : null,
      };
    }
  );
};
