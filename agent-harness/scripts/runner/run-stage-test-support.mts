import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { omit } from '../lib/objects.mts';
import {
  createRepo,
  fakeCommand,
  type FakeCommand,
  type FakeCommandOptions,
  type WorkDirFiles,
} from '../lib/test-support.mts';
import {
  dispatchesOf,
  tableUnder,
  type Dispatch,
} from '../records/run-records.mts';

import type { ClaudeResult } from '../records/usage.mts';

export const script = fileURLToPath(
  new URL('./run-stage.mts', import.meta.url)
);
const prices = fileURLToPath(
  new URL('../../config/prices.json', import.meta.url)
);

export const repoWithPrices = (workDirs: WorkDirFiles = {}): string => {
  const root = createRepo(workDirs);
  mkdirSync(join(root, 'agent-harness/config'), { recursive: true });
  copyFileSync(prices, join(root, 'agent-harness/config/prices.json'));
  return root;
};
export const fakeClaude = (
  result: ClaudeResult | string,
  options: FakeCommandOptions = {}
): FakeCommand =>
  fakeCommand('claude', {
    stdout: typeof result === 'string' ? result : JSON.stringify(result),
    ...options,
  });
export const cleanEnv = (env: NodeJS.ProcessEnv): NodeJS.ProcessEnv =>
  omit(env, 'CLAUDE_CODE_SUBAGENT_MODEL');
export const run = (
  root: string,
  claude: FakeCommand,
  args: readonly string[],
  env: NodeJS.ProcessEnv = cleanEnv(claude.env)
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, '--root', root, ...args], {
    encoding: 'utf8',
    env,
  });
export const runLogOf = (root: string, id = '42'): string =>
  readFileSync(
    join(root, '.local/agent-harness/work', id, 'run-log.md'),
    'utf8'
  );
export const rowsOf = (root: string, id = '42'): Dispatch[] =>
  dispatchesOf(tableUnder(runLogOf(root, id), 'dispatches'));
export const STAGE_ARGS: readonly string[] = [
  '42',
  'ds-gather-context',
  '--',
  'Reply with OK',
  '--model',
  'claude-opus-5-5',
];
