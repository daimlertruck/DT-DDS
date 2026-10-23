// The runner's I/O primitives: the clock, stdout, JSON files, git, and appends to the run log and
// the intake decisions.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { isRecord } from '../lib/json.mts';
import {
  tableUnder,
  withGateRows,
  type TableCells,
} from '../records/run-records.mts';

import type { GitState } from './checks.mts';

export const now = (): string =>
  new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
// A run id, and the suffix of a work dir moved aside: <yyyymmdd>T<hhmmss>Z (UTC).
export const compactNow = (): string => now().replace(/[-:]/g, '');
export const say = (line = ''): void => {
  process.stdout.write(`${line}\n`);
};
export const sha16 = (path: string): string =>
  createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 16);
export const messageOf = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const isAlive = (pid: unknown): boolean => {
  if (typeof pid !== 'number' || !Number.isInteger(pid) || pid <= 0) {
    return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return isRecord(error) && error.code === 'EPERM';
  }
};

// --- JSON files ------------------------------------------------------------------------------

export const readJsonFile = (path: string): unknown =>
  JSON.parse(readFileSync(path, 'utf8'));
export const tryJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};
export const writeJson = (path: string, value: unknown): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
};
export const sameJson = (a: string, b: string): boolean => {
  const left = tryJson(a);
  return (
    left !== undefined && JSON.stringify(left) === JSON.stringify(tryJson(b))
  );
};

// --- git -------------------------------------------------------------------------------------

export const git = (
  root: string,
  ...args: readonly string[]
): string | null => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
};

export const gitState = (root: string): GitState => ({
  head: git(root, 'rev-parse', 'HEAD'),
  branch: git(root, 'rev-parse', '--abbrev-ref', 'HEAD'),
  status: git(root, 'status', '--porcelain'),
  remoteRefs: (
    git(root, 'for-each-ref', '--format=%(refname)', 'refs/remotes') ?? ''
  )
    .split('\n')
    .filter(Boolean),
});

// Untracked files that are not ignored: what clean-run.mts may delete when the run did not start with them.
export const untrackedOf = (root: string): string[] =>
  (
    spawnSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], {
      cwd: root,
      encoding: 'utf8',
    }).stdout ?? ''
  )
    .split('\0')
    .filter(Boolean);

// The branch's commits since origin/main, one `<sha> <subject>` per line.
export const branchLogOf = (root: string): string | null =>
  git(root, 'log', '--format=%h %s', 'origin/main..HEAD');

// The subjects of the commits from `from` to `to`, or null when `to` does not descend from `from`.
export const subjectsBetween = (
  root: string,
  from: string | null,
  to: string | null
): string[] | null => {
  const linear =
    from !== null &&
    to !== null &&
    git(root, 'merge-base', '--is-ancestor', from, to) !== null;
  return linear
    ? (git(root, 'log', '--format=%s', `${from}..${to}`) ?? '')
        .split('\n')
        .filter(Boolean)
    : null;
};

const HARNESS_PATHS: readonly string[] = [
  '.agents/skills',
  'agent-harness/scripts',
  'agent-harness/hooks',
  'agent-harness/config',
  '.claude',
  'AGENTS.md',
  'CLAUDE.md',
];

export interface HarnessVersion {
  readonly commit: string | null;
  readonly dirty: boolean;
}

// The harness a run used: the last commit that changed it (HEAD when none did), and whether it has
// uncommitted changes.
export const harnessOf = (root: string): HarnessVersion => ({
  commit:
    git(root, 'log', '-1', '--format=%H', '--', ...HARNESS_PATHS) ||
    git(root, 'rev-parse', 'HEAD'),
  dirty:
    (git(root, 'status', '--porcelain', '--', ...HARNESS_PATHS) ?? '') !== '',
});

// --- the run log and the intake decisions ---------------------------------------------------

export const appendGateRow = (
  runLogPath: string,
  id: string,
  cells: TableCells
): void => {
  const runLog = existsSync(runLogPath)
    ? readFileSync(runLogPath, 'utf8')
    : `# Run log — ${id}\n`;
  writeFileSync(runLogPath, withGateRows(runLog, [cells]));
};

export const gateCount = (runLogPath: string): number =>
  existsSync(runLogPath)
    ? tableUnder(readFileSync(runLogPath, 'utf8'), 'gate decisions').length
    : 0;

export const appendDecision = (workDir: string, text: string): void => {
  const path = join(workDir, 'intake-decisions.md');
  const head = existsSync(path)
    ? readFileSync(path, 'utf8').replace(/\n*$/, '\n\n')
    : '# Intake decisions\n\n';
  writeFileSync(path, `${head}- ${now()} ${text}\n`);
};
