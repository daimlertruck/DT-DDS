import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';

import {
  cleanEnv,
  repoWithPrices,
  rowsOf,
  script,
} from './run-stage-test-support.mts';
import { CLAUDE_RESULT } from '../lib/test-support.mts';

import type { ClaudeResult } from '../records/usage.mts';

// An interrupted stage keeps its usage. Ctrl-C reaches the whole job; Claude Code then still prints
// its JSON result, with every completed request. run-stage waits for it instead of dying with the
// job, and forwards a signal sent to it alone.
interface NodeClaude {
  readonly bin: string;
  readonly started: () => boolean;
}
const nodeClaude = (body: string): NodeClaude => {
  const bin = mkdtempSync(join(tmpdir(), 'fake-claude-'));
  writeFileSync(
    join(bin, 'claude'),
    `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
if (process.argv[2] === '--version') { process.stdout.write('2.1.301 (Claude Code)\\n'); process.exit(0); }
const argv = process.argv.slice(2);
const sessionId = argv.includes('--session-id') ? argv[argv.indexOf('--session-id') + 1] : null;
fs.writeFileSync(path.join(${JSON.stringify(bin)}, 'started'), '');
${body}
`,
    { mode: 0o755 }
  );
  return { bin, started: () => existsSync(join(bin, 'started')) };
};
const waitFor = async (predicate: () => boolean, ms = 8000): Promise<void> => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (predicate()) return;
    await new Promise((resolveLater) => setTimeout(resolveLater, 25));
  }
  throw new Error('timed out waiting');
};
const transcriptRow = (id: string, at: string): string =>
  JSON.stringify({
    type: 'assistant',
    timestamp: at,
    message: {
      id,
      model: 'claude-opus-5-5',
      usage: {
        input_tokens: 2,
        cache_read_input_tokens: 20000,
        cache_creation_input_tokens: 1000,
        output_tokens: 200,
        cache_creation: {
          ephemeral_5m_input_tokens: 1000,
          ephemeral_1h_input_tokens: 0,
        },
      },
      content: [],
    },
  });
// Writes two requests to the session's transcript under $CLAUDE_CONFIG_DIR, as Claude Code does.
const WRITE_TRANSCRIPT = `const dir = path.join(process.env.CLAUDE_CONFIG_DIR, 'projects', '-repo');
fs.mkdirSync(dir, { recursive: true });
const at = new Date().toISOString();
fs.writeFileSync(path.join(dir, sessionId + '.jsonl'), [${JSON.stringify(
  transcriptRow('msg_1', '@')
)}, ${JSON.stringify(
  transcriptRow('msg_2', '@')
)}].map((row) => row.replace('@', at)).join('\\n') + '\\n');`;
const INTERRUPTED_RESULT = {
  ...CLAUDE_RESULT,
  subtype: 'error_during_execution',
  is_error: true,
  result: undefined,
  session_id: 'sess-int',
};
const SESSION_ID = '11111111-2222-4333-8444-555555555555';

test("a signal to run-stage alone is forwarded; the session's result is logged, the status says interrupted, exit 130", async () => {
  const root = repoWithPrices();
  const config = mkdtempSync(join(tmpdir(), 'claude-config-'));
  const claude = nodeClaude(`${WRITE_TRANSCRIPT}
process.on('SIGINT', () => { process.stdout.write(${JSON.stringify(
    JSON.stringify(INTERRUPTED_RESULT)
  )}); process.exit(0); });
setTimeout(() => process.exit(3), 20000);`);
  const env = {
    ...cleanEnv(process.env),
    PATH: `${claude.bin}${delimiter}${process.env.PATH}`,
    CLAUDE_CONFIG_DIR: config,
    DT_DDS_SIGNAL_GRACE_MS: '100',
  };
  const child = spawn(
    'node',
    [
      script,
      '--root',
      root,
      '42',
      'implement',
      '--',
      'brief',
      '--session-id',
      SESSION_ID,
    ],
    { env, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let out = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    out += chunk;
  });
  const exited = new Promise<number | null>((resolveExit) =>
    child.on('exit', (code) => resolveExit(code))
  );

  await waitFor(
    () =>
      claude.started() &&
      existsSync(join(config, 'projects/-repo', `${SESSION_ID}.jsonl`))
  );
  child.kill('SIGINT');
  const code = await exited;

  assert.equal(code, 130, out);
  const [row] = rowsOf(root);
  assert.equal(row?.status, 'interrupted (SIGINT): error_during_execution');
  assert.equal(row?.cacheRead, 48652);
  assert.match(
    out,
    /^implement: interrupted \(SIGINT\): error_during_execution$/m
  );
  assert.match(out, /\$0\.0217 at list price/);
  assert.match(
    out,
    /^transcript kept: \.local\/agent-harness\/work\/42\/usage\/01-implement\.transcript\.jsonl$/m
  );
  assert.equal(
    readFileSync(
      join(
        root,
        '.local/agent-harness/work/42/usage/01-implement.transcript.jsonl'
      ),
      'utf8'
    )
      .split('\n')
      .filter(Boolean).length,
    2
  );
});

test('a session that dies without a result is logged from its transcript; the transcript and its output are kept', () => {
  const root = repoWithPrices();
  const config = mkdtempSync(join(tmpdir(), 'claude-config-'));
  const claude = nodeClaude(`${WRITE_TRANSCRIPT}
process.stdout.write('partial output');
process.kill(process.pid, 'SIGKILL');`);
  const env = {
    ...cleanEnv(process.env),
    PATH: `${claude.bin}${delimiter}${process.env.PATH}`,
    CLAUDE_CONFIG_DIR: config,
  };

  const result = spawnSync(
    'node',
    [
      script,
      '--root',
      root,
      '42',
      'implement',
      '--',
      'brief',
      '--session-id',
      SESSION_ID,
    ],
    { encoding: 'utf8', env }
  );

  assert.equal(result.status, 1);
  const rows = rowsOf(root);
  assert.equal(rows.length, 1);
  const [row] = rows;
  assert.equal(
    row?.status,
    'FAIL — no JSON result (claude killed by SIGKILL); usage from its transcript'
  );
  assert.deepEqual(
    [row?.model, row?.requests, row?.cacheRead, row?.cacheWrite, row?.output],
    ['claude-opus-5-5', 2, 40000, 2000, 400]
  );
  // 4×4 + 2000×5 + 40000×0.2 + 400×20 = 26016 → $0.026016 (5-minute writes)
  assert.equal(row?.predictedUsd, 0.026016);
  assert.equal(row?.reportedUsd, null);
  const saved: ClaudeResult = JSON.parse(
    readFileSync(
      join(root, '.local/agent-harness/work/42/usage/01-implement.json'),
      'utf8'
    )
  );
  assert.equal(saved.subtype, 'transcript');
  assert.equal(saved.session_id, SESSION_ID);
  assert.equal(
    readFileSync(
      join(root, '.local/agent-harness/work/42/usage/01-implement.stdout.txt'),
      'utf8'
    ),
    'partial output'
  );
  assert.ok(
    existsSync(
      join(
        root,
        '.local/agent-harness/work/42/usage/01-implement.transcript.jsonl'
      )
    )
  );
  assert.match(result.stdout, /\$0\.0260 at list price \(from the transcript/);
});
