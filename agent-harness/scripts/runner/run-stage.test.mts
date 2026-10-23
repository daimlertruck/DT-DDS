import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  cleanEnv,
  fakeClaude,
  repoWithPrices,
  rowsOf,
  run,
  runLogOf,
  STAGE_ARGS,
} from './run-stage-test-support.mts';
import {
  CLAUDE_RESULT,
  CLAUDE_RESULT_RESUMED,
  CLAUDE_RESULT_WITH_UTILITY,
  createRepo,
} from '../lib/test-support.mts';

test('runs the stage as claude -p with JSON output, saves the result and logs one row per model', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT_WITH_UTILITY);

  const result = run(root, claude, STAGE_ARGS);

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(claude.calls(), [
    '-p --output-format json Reply with OK --model claude-opus-5-5',
  ]);
  assert.equal(
    readFileSync(
      join(
        root,
        '.local/agent-harness/work/42/usage/01-ds-gather-context.json'
      ),
      'utf8'
    ),
    JSON.stringify(CLAUDE_RESULT_WITH_UTILITY)
  );
  assert.match(
    runLogOf(root),
    /^# Run log — 42\n\n## Dispatches\n\n\| stage \| started \| wall time \(s\) \| model \|/
  );
  const rows = rowsOf(root);
  assert.deepEqual(
    rows.map(
      ({
        dispatch,
        stage,
        model,
        requests,
        cacheRead,
        predictedUsd,
        reportedUsd,
        finalContext,
        status,
      }) => [
        dispatch,
        stage,
        model,
        requests,
        cacheRead,
        predictedUsd,
        reportedUsd,
        finalContext,
        status,
      ]
    ),
    [
      [
        1,
        'ds-gather-context',
        'claude-opus-5-5',
        2,
        48652,
        0.02169,
        0.02169,
        24791,
        'PASS — .local/agent-harness/work/42/context-bundle.md',
      ],
      [
        1,
        'ds-gather-context',
        'claude-haiku-4-5',
        null,
        50000,
        0.030745,
        0.030745,
        null,
        '—',
      ],
    ]
  );
  assert.equal(typeof rows[0]?.seconds, 'number');
  assert.equal(rows[1]?.seconds, null);
  assert.equal(rows[0]?.started, rows[1]?.started);
  assert.match(
    result.stdout,
    /2 model row\(s\), \d+ s, \$0\.0524 at list price; Claude Code reported \$0\.0524354/
  );
});

// Claude Code updates itself and its prices can move with it, so each row names the version.
test('every usage row records the Claude Code version that ran the stage', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT_WITH_UTILITY);

  run(root, claude, STAGE_ARGS);

  assert.deepEqual(
    rowsOf(root).map(({ claudeCode }) => claudeCode),
    ['2.1.296', '2.1.296']
  );
  assert.match(
    runLogOf(root),
    /\| final_context \| claude_code \| status line \|/
  );
});

test('a stage argument left without its value cannot take run-stage flags', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT);

  run(root, claude, [
    '42',
    'ds-gather-context',
    '--',
    'Reply with OK',
    '--model',
  ]);

  assert.deepEqual(claude.calls(), [
    '-p --output-format json Reply with OK --model',
  ]);
});

test('appends to the Dispatches table of an existing run log and keeps the other tables', () => {
  const header =
    '| stage | started | wall time (s) | model | requests | uncached_in | cache_write | cache_read | output | predicted_usd | reported_usd | final_context | claude_code | status line |';
  const existing = [
    '# Run log — issue #42',
    '',
    'Base: 0123456789abcdef0123456789abcdef01234567',
    '',
    '## Gate decisions',
    '',
    '| gate | presented | decided | decision | snapshot | note |',
    '|---|---|---|---|---|---|',
    '',
    '## Dispatches',
    '',
    header,
    '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
    '',
    '## Human actions between gates',
    '',
    '| when | kind | action | before → after | evidence | evidence made stale |',
    '|---|---|---|---|---|---|',
    '',
  ].join('\n');
  const root = repoWithPrices({ 42: { 'run-log.md': existing } });
  const claude = fakeClaude(CLAUDE_RESULT);

  run(root, claude, STAGE_ARGS);
  const second = run(root, claude, [
    '42',
    'ds-check-architecture',
    '--',
    'Go on',
  ]);

  assert.equal(second.status, 0, second.stderr);
  const log = runLogOf(root);
  assert.ok(log.startsWith(existing.split('## Dispatches')[0] ?? ''));
  assert.match(
    log,
    /## Dispatches\n\n\| stage .*\n\|---.*\n\| ds-gather-context \|.*\n\| ds-check-architecture \|.*\n\n## Human actions between gates/
  );
  assert.deepEqual(
    rowsOf(root).map(({ dispatch, stage }) => [dispatch, stage]),
    [
      [1, 'ds-gather-context'],
      [2, 'ds-check-architecture'],
    ]
  );
  assert.ok(
    existsSync(
      join(
        root,
        '.local/agent-harness/work/42/usage/02-ds-check-architecture.json'
      )
    )
  );
});

test('a run log with the old Dispatches columns is refused before claude starts', () => {
  const legacy =
    '# Run log\n\n## Dispatches\n\n| stage | started | wall time (s) | tokens | status line |\n|---|---|---|---|---|\n';
  const root = repoWithPrices({ 42: { 'run-log.md': legacy } });
  const claude = fakeClaude(CLAUDE_RESULT);

  const result = run(root, claude, STAGE_ARGS);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /the Dispatches table has other columns/);
  assert.deepEqual(claude.calls(), []);
  assert.equal(runLogOf(root), legacy);
});

test('refuses to run while CLAUDE_CODE_SUBAGENT_MODEL is set', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT);

  const result = run(root, claude, STAGE_ARGS, {
    ...claude.env,
    CLAUDE_CODE_SUBAGENT_MODEL: 'claude-opus-5-5',
  });

  assert.equal(result.status, 2);
  assert.match(result.stderr, /CLAUDE_CODE_SUBAGENT_MODEL is set/);
  assert.deepEqual(claude.calls(), []);
});

test('the stage does not inherit the variables of a parent Claude Code session', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT);
  const parent = {
    ...cleanEnv(claude.env),
    CLAUDECODE: '1',
    CLAUDE_EFFORT: 'xhigh',
    CLAUDE_CODE_SESSION_ID: 'parent',
    CLAUDE_CODE_MESSAGING_TOKEN: 'secret',
    STAGE_KEEPS_THIS: '1',
  };

  run(root, claude, STAGE_ARGS, parent);

  const seen = claude.seenEnv();
  [
    'CLAUDECODE',
    'CLAUDE_EFFORT',
    'CLAUDE_CODE_SESSION_ID',
    'CLAUDE_CODE_MESSAGING_TOKEN',
  ].forEach((name) => assert.equal(seen.includes(name), false, name));
  assert.ok(seen.includes('STAGE_KEEPS_THIS'));
  assert.ok(seen.includes('PATH'));
});

// A parent shell's PWD can name the same dir under another spelling; the stage must not inherit it.
// The symlink makes that spelling on any OS (macOS's /var → /private/var is not on Linux).
test("the stage sees PWD as the root it runs in, not the parent shell's spelling of it", () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT);
  const otherSpelling = join(mkdtempSync(join(tmpdir(), 'spelling-')), 'root');
  symlinkSync(root, otherSpelling);

  run(root, claude, STAGE_ARGS, {
    ...cleanEnv(claude.env),
    PWD: otherSpelling,
  });

  assert.equal(claude.seenPwd(), root);
});

test('a session that ends in error keeps its usage, its subtype in the status line and claude exit code', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(
    {
      ...CLAUDE_RESULT,
      subtype: 'error_max_turns',
      is_error: true,
      result: '',
    },
    { exitCode: 1 }
  );

  const result = run(root, claude, STAGE_ARGS);

  assert.equal(result.status, 1);
  const [row] = rowsOf(root);
  assert.equal(row?.status, 'error_max_turns');
  assert.equal(row?.cacheRead, 48652);
});

test('output that is not a JSON result is logged as a FAIL row with unknown usage, and kept', () => {
  const root = repoWithPrices();
  const claude = fakeClaude('Error: not logged in');

  const result = run(root, claude, STAGE_ARGS);

  assert.equal(result.status, 1);
  const [row] = rowsOf(root);
  assert.equal(row?.status, 'FAIL — no JSON result (claude exit 0)');
  assert.equal(row?.model, null);
  assert.equal(row?.cacheRead, null);
  assert.equal(typeof row?.seconds, 'number');
  assert.equal(
    readFileSync(
      join(
        root,
        '.local/agent-harness/work/42/usage/01-ds-gather-context.json'
      ),
      'utf8'
    ),
    'Error: not logged in'
  );
  assert.match(result.stdout, /no usage recorded/);
  assert.doesNotMatch(result.stdout, /at list price/);
});

test('a resumed session logs only its own usage: the earlier result of its session in usage/ is subtracted', () => {
  const root = repoWithPrices();
  run(root, fakeClaude(CLAUDE_RESULT), STAGE_ARGS);

  const result = run(root, fakeClaude(CLAUDE_RESULT_RESUMED), [
    '42',
    'express-apply',
    '--',
    'brief',
    '--resume',
    CLAUDE_RESULT.session_id,
  ]);

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    rowsOf(root).map(
      ({
        stage,
        requests,
        uncachedIn,
        cacheWrite,
        cacheRead,
        output,
        predictedUsd,
        reportedUsd,
      }) => [
        stage,
        requests,
        uncachedIn,
        cacheWrite,
        cacheRead,
        output,
        predictedUsd,
        reportedUsd,
      ]
    ),
    [
      ['ds-gather-context', 2, 4, 463, 48652, 412, 0.02169, 0.02169],
      ['express-apply', 2, 4, 455, 14976, 170, 0.010051, 0.010051],
    ]
  );
  assert.match(
    result.stdout,
    /\$0\.0101 at list price; Claude Code reported \$0\.0100512 \(this invocation; session total \$0\.0317416\)/
  );
});

test('usage errors run nothing', () => {
  const root = repoWithPrices();
  const claude = fakeClaude(CLAUDE_RESULT);

  [
    ['42', 'ds-gather-context'],
    ['../42', 'ds-gather-context', '--', 'hi'],
    ['42', 'Stage One', '--', 'hi'],
    ['42', 'ds-gather-context', '--', 'hi', '--output-format', 'stream-json'],
    ['42', 'ds-gather-context', '--', '-p', 'hi'],
  ].forEach((args) => {
    const result = run(root, claude, args);
    assert.equal(result.status, 2, args.join(' '));
  });
  assert.deepEqual(claude.calls(), []);
});

test('prices.json missing: nothing runs', () => {
  const root = createRepo();
  const claude = fakeClaude(CLAUDE_RESULT);

  const result = run(root, claude, STAGE_ARGS);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /cannot read prices.json/);
  assert.deepEqual(claude.calls(), []);
});
