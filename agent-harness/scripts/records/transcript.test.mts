import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { requestsIn, resultOf, spendOf, transcriptsOf } from './transcript.mts';
import { loadPrices, type TokenUsage } from './usage.mts';

const realRoot = new URL('../../..', import.meta.url).pathname;

const usage = (read: number, write: number, output: number): TokenUsage => ({
  input_tokens: 2,
  cache_read_input_tokens: read,
  cache_creation_input_tokens: write,
  output_tokens: output,
  cache_creation: {
    ephemeral_5m_input_tokens: write,
    ephemeral_1h_input_tokens: 0,
  },
});
const assistant = (
  id: string,
  at: string,
  model: string,
  tokens: TokenUsage,
  content = 'text'
): string =>
  JSON.stringify({
    type: 'assistant',
    timestamp: at,
    message: { id, model, usage: tokens, content: [{ type: content }] },
  });

// A config dir holding one session's transcript and one subagent transcript. Each message is written
// as one row per content block, every row with the request's final usage.
const configDir = (): string => {
  const dir = mkdtempSync(join(tmpdir(), 'claude-config-'));
  const project = join(dir, 'projects', '-repo');
  mkdirSync(join(project, 'sess-1', 'subagents'), { recursive: true });
  writeFileSync(
    join(project, 'sess-1.jsonl'),
    [
      JSON.stringify({ type: 'user', timestamp: '2026-10-16T10:00:00.000Z' }),
      assistant(
        'msg_a',
        '2026-10-16T10:00:01.000Z',
        'claude-opus-5-5',
        usage(0, 10000, 100),
        'thinking'
      ),
      assistant(
        'msg_a',
        '2026-10-16T10:00:01.500Z',
        'claude-opus-5-5',
        usage(0, 10000, 100),
        'tool_use'
      ),
      '{not json',
      assistant(
        'msg_b',
        '2026-10-16T10:05:00.000Z',
        'claude-opus-5-5',
        usage(10000, 2000, 300)
      ),
      '',
    ].join('\n')
  );
  writeFileSync(
    join(project, 'sess-1', 'subagents', 'agent-x.jsonl'),
    `${assistant(
      'msg_c',
      '2026-10-16T10:05:30.000Z',
      'claude-sonnet-5-5',
      usage(5000, 1000, 50)
    )}\n`
  );
  return dir;
};

test("a session's transcripts are its own file and its subagents' files; none when the session is unknown", () => {
  const dir = configDir();
  assert.deepEqual(
    transcriptsOf('sess-1', dir).map((path) => path.slice(dir.length)),
    [
      '/projects/-repo/sess-1.jsonl',
      '/projects/-repo/sess-1/subagents/agent-x.jsonl',
    ]
  );
  assert.deepEqual(transcriptsOf('sess-2', dir), []);
  assert.deepEqual(transcriptsOf(null, dir), []);
});

test('one request per message id, from a given time on; unreadable rows are skipped', () => {
  const dir = configDir();
  const all = requestsIn(transcriptsOf('sess-1', dir));
  assert.deepEqual(
    all.map(({ model, usage: { output_tokens: output } }) => [model, output]),
    [
      ['claude-opus-5-5', 100],
      ['claude-opus-5-5', 300],
      ['claude-sonnet-5-5', 50],
    ]
  );
  assert.equal(
    requestsIn(transcriptsOf('sess-1', dir), {
      sinceMs: Date.parse('2026-10-16T10:01:00Z'),
    }).length,
    2
  );
});

test('requests read as a JSON result: tokens per model, the TTL split and the last request', () => {
  const result = resultOf(
    requestsIn(transcriptsOf('sess-1', configDir())),
    'sess-1'
  );
  assert.equal(result.type, 'result');
  assert.equal(result.subtype, 'transcript');
  assert.equal(result.session_id, 'sess-1');
  assert.equal(result.num_turns, 3);
  assert.deepEqual(result.modelUsage?.['claude-opus-5-5'], {
    inputTokens: 4,
    outputTokens: 400,
    cacheReadInputTokens: 10000,
    cacheCreationInputTokens: 12000,
  });
  assert.deepEqual(result.modelUsage['claude-sonnet-5-5'], {
    inputTokens: 2,
    outputTokens: 50,
    cacheReadInputTokens: 5000,
    cacheCreationInputTokens: 1000,
  });
  assert.deepEqual(result.usage?.cache_creation, {
    ephemeral_5m_input_tokens: 13000,
    ephemeral_1h_input_tokens: 0,
  });
  assert.equal(result.usage.iterations?.at(-1)?.cache_read_input_tokens, 5000);
});

test('spend so far is the requests priced at list (5-minute writes here)', () => {
  const prices = loadPrices(realRoot);
  const requests = requestsIn(transcriptsOf('sess-1', configDir()));
  // Opus: 4×4 + 12000×5 + 10000×0.2 + 400×20 = 70016 → $0.070016; Sonnet: 2×2 + 1000×2.5 + 5000×0.1 + 50×10 = 3504 → $0.003504.
  assert.equal(Number(spendOf(requests, prices).toFixed(6)), 0.07352);
  assert.equal(spendOf([], prices), 0);
});
