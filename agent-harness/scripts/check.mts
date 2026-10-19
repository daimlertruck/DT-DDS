// The checks a change to the harness must pass: types (tsc), lint and code format (ESLint, which runs
// Prettier), JSON format (Prettier) and the tests. `--fix` lets ESLint and Prettier fix what they can
// first. The tools come from the repo's node_modules/.bin: run `yarn --frozen-lockfile` first.
// Usage: node agent-harness/scripts/check.mts [--fix] [--root <repo>]
// Exit: 0 every check passed · 1 a check failed · 2 usage or a missing tool.

import { spawnSync } from 'node:child_process';
import { existsSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Check {
  readonly name: string;
  readonly command: readonly string[];
}

export interface Outcome {
  readonly name: string;
  readonly status: number;
}

const USAGE =
  'usage: node agent-harness/scripts/check.mts [--fix] [--root <repo>]';

const LINTED = [
  'agent-harness/scripts',
  'agent-harness/hooks',
  'agent-harness/evals',
  'agent-harness/tests',
  'agent-harness/eslint.config.mjs',
];
const JSON_FILES = [
  'agent-harness/*.json',
  'agent-harness/config/*.json',
  'agent-harness/tests/fixtures/*.json',
  '.claude/settings.json',
  '.claude/pipeline.settings.json',
];
const TESTS = [
  'agent-harness/scripts/**/*.test.mts',
  'agent-harness/hooks/*.test.mts',
  'agent-harness/evals/guardrails/*.test.mts',
  'agent-harness/tests/*.test.mts',
];

// A tool name stands for its node_modules/.bin entry; `node` for this Node.
export const checksOf = (fix: boolean): readonly Check[] => [
  { name: 'types', command: ['tsc', '-p', 'agent-harness/tsconfig.json'] },
  { name: 'lint', command: ['eslint', ...(fix ? ['--fix'] : []), ...LINTED] },
  {
    name: 'json format',
    command: ['prettier', fix ? '--write' : '--check', ...JSON_FILES],
  },
  { name: 'tests', command: ['node', '--test', ...TESTS] },
];

// erasableSyntaxOnly (agent-harness/tsconfig.json) needs TypeScript 5.8.
export const isSupportedTsc = (versionLine: string): boolean => {
  const match = /(\d+)\.(\d+)\.\d+/.exec(versionLine);
  if (!match) return false;
  const [major, minor] = [Number(match[1]), Number(match[2])];
  return major > 5 || (major === 5 && minor >= 8);
};

export const summaryOf = (
  outcomes: readonly Outcome[]
): { readonly text: string; readonly ok: boolean } => ({
  text: outcomes
    .map(({ name, status }) =>
      status === 0 ? `ok     ${name}` : `FAILED ${name} (exit ${status})`
    )
    .join('\n'),
  ok: outcomes.every(({ status }) => status === 0),
});

const fail = (status: number, message: string): never => {
  process.stderr.write(`check: ${message}\n`);
  process.exit(status);
};

// The script behind node_modules/.bin/<tool>, run with this Node (no shell, no .cmd shims).
const toolScript = (root: string, tool: string): string => {
  const link = join(root, 'node_modules/.bin', tool);
  if (!existsSync(link)) {
    return fail(2, `${tool} is not installed; run yarn --frozen-lockfile`);
  }
  return realpathSync(link);
};

const argvOf = (root: string, [tool = '', ...args]: readonly string[]) =>
  tool === 'node' ? args : [toolScript(root, tool), ...args];

const main = (argv: readonly string[]): void => {
  const fix = argv.includes('--fix');
  const rootAt = argv.indexOf('--root');
  const known = argv.every(
    (arg, index) =>
      arg === '--fix' ||
      arg === '--root' ||
      (rootAt !== -1 && index === rootAt + 1)
  );
  if (!known || (rootAt !== -1 && argv[rootAt + 1] === undefined)) {
    fail(2, USAGE);
  }
  const root = resolve(rootAt === -1 ? '.' : argv[rootAt + 1] ?? '.');
  const tsc = spawnSync(process.execPath, [toolScript(root, 'tsc'), '-v'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (!isSupportedTsc(tsc.stdout ?? '')) {
    fail(
      2,
      `node_modules/.bin/tsc is ${
        tsc.stdout.trim() || 'unreadable'
      }; the harness needs TypeScript 5.8 or later`
    );
  }
  const outcomes = checksOf(fix).map(({ name, command }) => {
    process.stdout.write(`── ${name}\n`);
    const run = spawnSync(process.execPath, argvOf(root, command), {
      cwd: root,
      stdio: 'inherit',
    });
    return { name, status: run.status ?? 1 };
  });
  const { text, ok } = summaryOf(outcomes);
  process.stdout.write(`\n${text}\n`);
  process.exit(ok ? 0 : 1);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
