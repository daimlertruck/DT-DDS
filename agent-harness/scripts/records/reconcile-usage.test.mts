import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  appendFileSync,
  copyFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { omit } from '../lib/objects.mts';
import {
  CLAUDE_RESULT,
  CLAUDE_RESULT_RESUMED,
  CLAUDE_RESULT_WITH_UTILITY,
  createRepo,
  fakeCommand,
} from '../lib/test-support.mts';

import type { ClaudeResult } from './usage.mts';

const runStage = fileURLToPath(
  new URL('../runner/run-stage.mts', import.meta.url)
);
const script = fileURLToPath(new URL('./reconcile-usage.mts', import.meta.url));
const prices = fileURLToPath(
  new URL('../../config/prices.json', import.meta.url)
);

// A work dir written by run-stage.mts itself, one stage per result.
const recordedRun = (...results: readonly ClaudeResult[]): string => {
  const root = createRepo();
  mkdirSync(join(root, 'agent-harness/config'), { recursive: true });
  copyFileSync(prices, join(root, 'agent-harness/config/prices.json'));
  results.forEach((result, index) => {
    const env = omit(
      fakeCommand('claude', { stdout: JSON.stringify(result) }).env,
      'CLAUDE_CODE_SUBAGENT_MODEL'
    );
    const stage = spawnSync(
      'node',
      [
        runStage,
        '--root',
        root,
        'dry-run',
        `stage-${index + 1}`,
        '--',
        'Reply with OK',
      ],
      { encoding: 'utf8', env }
    );
    assert.equal(stage.status, 0, stage.stderr);
  });
  return root;
};
const reconcile = (
  root: string,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, 'dry-run', ...args, '--root', root], {
    encoding: 'utf8',
  });
const runLogPath = (root: string): string =>
  join(root, '.local/agent-harness/work/dry-run/run-log.md');

test('a run logged by run-stage reconciles with its saved results', () => {
  const root = recordedRun(CLAUDE_RESULT_WITH_UTILITY, CLAUDE_RESULT);

  const result = reconcile(root);

  assert.equal(result.status, 0, result.stdout);
  assert.match(
    result.stdout,
    /2 dispatch\(es\) in the run log, 2 saved result\(s\), tolerance 1%/
  );
  assert.match(
    result.stdout,
    /\| cacheRead \| claude-opus-5-5 \| 97304 \| 97304 \| yes \|/
  );
  assert.match(
    result.stdout,
    /\| cacheRead \| claude-haiku-4-5 \| 50000 \| 50000 \| yes \|/
  );
  assert.match(result.stdout, /\| requests \| main loop \| 4 \| 4 \| yes \|/);
  assert.match(
    result.stdout,
    /\| predicted_usd \| all \| 0\.074125 \| 0\.074126 \| yes \|/
  );
  assert.match(result.stdout, /\nreconciled\n$/);
});

test('a resumed session reconciles with its own usage, not with its session total', () => {
  const root = recordedRun(CLAUDE_RESULT, CLAUDE_RESULT_RESUMED);

  const result = reconcile(root);

  assert.equal(result.status, 0, result.stdout);
  assert.match(
    result.stdout,
    /\| cacheRead \| claude-opus-5-5 \| 63628 \| 63628 \| yes \|/
  );
  assert.match(
    result.stdout,
    /\| output \| claude-opus-5-5 \| 582 \| 582 \| yes \|/
  );
  assert.match(
    result.stdout,
    /\| predicted_usd \| all \| 0\.031741 \| 0\.031742 \| yes \|/
  );
});

test('a token cell that differs from the saved result fails', () => {
  const root = recordedRun(CLAUDE_RESULT);
  const log = readFileSync(runLogPath(root), 'utf8');
  writeFileSync(runLogPath(root), log.replace('| 48652 |', '| 40000 |'));

  const result = reconcile(root);

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /\| cacheRead \| claude-opus-5-5 \| 40000 \| 48652 \| NO \|/
  );
  assert.match(result.stdout, /NOT reconciled/);
});

test('a difference inside the tolerance passes', () => {
  const root = recordedRun(CLAUDE_RESULT);
  const log = readFileSync(runLogPath(root), 'utf8');
  writeFileSync(runLogPath(root), log.replace('| 48652 |', '| 48600 |'));

  assert.equal(reconcile(root).status, 0);
  assert.equal(reconcile(root, '--tolerance', '0.0001').status, 1);
});

test('a model without a price cannot reconcile', () => {
  const unlisted = {
    ...CLAUDE_RESULT,
    modelUsage: {
      'claude-haiku-5-5': CLAUDE_RESULT.modelUsage['claude-opus-5-5'],
    },
  };
  const root = recordedRun(unlisted);

  const result = reconcile(root);

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /problem: claude-haiku-5-5 has no price in prices.json/
  );
});

test('a dispatch in the log without a saved result fails', () => {
  const root = recordedRun(CLAUDE_RESULT);
  const log = readFileSync(runLogPath(root), 'utf8');
  const row = log.trimEnd().split('\n').at(-1) ?? '';
  appendFileSync(runLogPath(root), `${row.replace('stage-1', 'stage-2')}\n`);

  const result = reconcile(root);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /\| dispatches \| all \| 2 \| 1 \| NO \|/);
});

test('nothing to reconcile, or no run log, fails', () => {
  const root = createRepo({ 'dry-run': { 'notes.md': '# notes\n' } });

  const result = reconcile(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /no run log/);
  assert.equal(spawnSync('node', [script, '../x', '--root', root]).status, 2);
});
