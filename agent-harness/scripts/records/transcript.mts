// Claude Code session transcripts, for what a session's JSON result cannot give: the spend of a stage
// while it runs (run.mts's heartbeat) and the usage of a session that ended without a result
// (run-stage.mts). A session's transcript is <config dir>/projects/<project>/<session id>.jsonl, and
// each subagent it dispatched has <session id>/subagents/*.jsonl. One API request per message id: every
// row of a message carries that request's final usage. A request cut off by an interrupt has no row,
// though the API bills what it generated.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import {
  isTokenUsage,
  usageRows,
  type ClaudeResult,
  type ModelUsageEntry,
  type Prices,
  type TokenUsage,
} from './usage.mts';
import { isRecord } from '../lib/json.mts';

// One API request read from a transcript.
export interface TranscriptRequest {
  readonly model: string;
  readonly usage: TokenUsage;
  readonly timestamp: string;
}

export const configDirOf = (
  env: Readonly<Record<string, string | undefined>> = process.env
): string => env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude');

// The session's transcript first, then its subagents' transcripts; [] when none is found.
export const transcriptsOf = (
  sessionId: string | null | undefined,
  configDir: string
): string[] => {
  const projects = join(configDir, 'projects');
  if (!sessionId || !existsSync(projects)) return [];
  const main = readdirSync(projects)
    .map((project) => join(projects, project, `${sessionId}.jsonl`))
    .find((path) => existsSync(path));
  if (!main) return [];
  const subagents = join(main.replace(/\.jsonl$/, ''), 'subagents');
  const children = existsSync(subagents)
    ? readdirSync(subagents)
        .filter((name) => name.endsWith('.jsonl'))
        .sort()
    : [];
  return [main, ...children.map((name) => join(subagents, name))];
};

const rowsOf = (path: string): unknown[] =>
  readFileSync(path, 'utf8')
    .split('\n')
    .filter(Boolean)
    .flatMap((line): unknown[] => {
      try {
        return [JSON.parse(line)];
      } catch {
        return []; // a row being written while we read
      }
    });

// An assistant row's request, keyed by its message id; null for any other row or a malformed one.
const requestOf = (
  row: unknown
): { readonly id: string; readonly request: TranscriptRequest } | null => {
  if (!isRecord(row) || row.type !== 'assistant') return null;
  const { message, timestamp } = row;
  if (!isRecord(message) || typeof timestamp !== 'string') return null;
  const { id, model, usage } = message;
  if (!id || typeof id !== 'string' || typeof model !== 'string') return null;
  if (!usage || !isTokenUsage(usage)) return null;
  return { id, request: { model, usage, timestamp } };
};

// The API requests in the transcripts, one per message id, made at or after `sinceMs`, oldest first.
export const requestsIn = (
  paths: readonly string[],
  { sinceMs = 0 }: { readonly sinceMs?: number } = {}
): TranscriptRequest[] => {
  const byId = new Map<string, TranscriptRequest>();
  paths.forEach((path) =>
    rowsOf(path).forEach((row) => {
      const found = requestOf(row);
      if (!found || !(Date.parse(found.request.timestamp) >= sinceMs)) return;
      byId.set(found.id, found.request);
    })
  );
  return [...byId.values()].sort(
    (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp)
  );
};

type UsageField = Exclude<keyof TokenUsage, 'cache_creation'>;

const sumOf = (
  requests: readonly TranscriptRequest[],
  count: (usage: TokenUsage) => number | undefined
): number =>
  requests.reduce((total, { usage }) => total + (count(usage) ?? 0), 0);

const fieldSum = (
  requests: readonly TranscriptRequest[],
  field: UsageField
): number => sumOf(requests, (usage) => usage[field]);

// The requests as a `claude -p` JSON result (subtype `transcript`), so usage.mts prices them like any
// session. `num_turns` holds API requests here, not turns; there is no reported cost.
export const resultOf = (
  requests: readonly TranscriptRequest[],
  sessionId: string | null
): ClaudeResult => {
  const models = [...new Set(requests.map(({ model }) => model))];
  const modelUsage = Object.fromEntries(
    models.map((model): [string, ModelUsageEntry] => {
      const own = requests.filter((request) => request.model === model);
      return [
        model,
        {
          inputTokens: fieldSum(own, 'input_tokens'),
          outputTokens: fieldSum(own, 'output_tokens'),
          cacheReadInputTokens: fieldSum(own, 'cache_read_input_tokens'),
          cacheCreationInputTokens: fieldSum(
            own,
            'cache_creation_input_tokens'
          ),
        },
      ];
    })
  );
  const last = requests.at(-1);
  const usage = {
    input_tokens: fieldSum(requests, 'input_tokens'),
    cache_creation_input_tokens: fieldSum(
      requests,
      'cache_creation_input_tokens'
    ),
    cache_read_input_tokens: fieldSum(requests, 'cache_read_input_tokens'),
    output_tokens: fieldSum(requests, 'output_tokens'),
    cache_creation: {
      ephemeral_5m_input_tokens: sumOf(
        requests,
        (request) => request.cache_creation?.ephemeral_5m_input_tokens
      ),
      ephemeral_1h_input_tokens: sumOf(
        requests,
        (request) => request.cache_creation?.ephemeral_1h_input_tokens
      ),
    },
    iterations: last ? [last.usage] : [],
  };
  return {
    type: 'result',
    subtype: 'transcript',
    is_error: true,
    session_id: sessionId,
    num_turns: requests.length,
    modelUsage,
    usage,
    total_cost_usd: null,
  };
};

// List-price spend of the requests; an unpriced model counts nothing.
export const spendOf = (
  requests: readonly TranscriptRequest[],
  prices: Prices
): number =>
  requests.length
    ? usageRows(resultOf(requests, null), prices).reduce(
        (total, { predictedUsd }) => total + (predictedUsd ?? 0),
        0
      )
    : 0;
