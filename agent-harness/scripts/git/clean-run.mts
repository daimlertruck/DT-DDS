// Deletes paths the active pipeline run created, so a stage can remove its own temporary files (a probe
// test) without the human: stage sessions have no rm (dontAsk rules), and the clean-tree health check
// stops the next step while they remain (AGENTS.md → Trial mode).
// Usage: node agent-harness/scripts/git/clean-run.mts <path>...
// A path is deleted only when it is inside the repo, untracked, not ignored (so never a harness file,
// node_modules or a build output) and was not there when the run started (run-state.json →
// untrackedAtStart, recorded by run.mts). A folder qualifies when every file in it does and it holds no
// ignored files. A symlink is removed as a link. All or nothing: one refusal deletes nothing.
// Exit 0 deleted · 1 refused · 2 usage

import { spawnSync } from 'node:child_process';
import {
  lstatSync,
  readFileSync,
  realpathSync,
  rmSync,
  unlinkSync,
  type Stats,
} from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isRecord } from '../lib/json.mts';

const USAGE = 'usage: node agent-harness/scripts/git/clean-run.mts <path>...';
const ACTIVE_ISSUE = /^(?:\d+|PR-\d+|[a-z][a-z0-9-]*)$/;

// What to delete: a file (a symlink counts as one) or a folder with the number of files in it.
export type Deletion =
  | { readonly kind: 'file'; readonly path: string; readonly rel: string }
  | {
      readonly kind: 'directory';
      readonly path: string;
      readonly rel: string;
      readonly files: number;
    };

export type Verdict =
  | Deletion
  | { readonly kind: 'refused'; readonly reason: string };

export interface GitResult {
  readonly status: number | null;
  readonly stdout: string;
}

// What a verdict needs: the repo (a real path), the caller's cwd, the untracked files there when the
// run started, and git run in the repo.
export interface VerdictContext {
  readonly root: string;
  readonly cwd: string;
  readonly atStart: ReadonlySet<string>;
  readonly git: (...args: readonly string[]) => GitResult;
}

// The issue of the active run (`.local/agent-harness/work/.active-run.json`), or null when none is active.
export const activeIssueOf = (active: unknown): string | null => {
  if (!isRecord(active)) return null;
  const issue = String(active.issue ?? '');
  return ACTIVE_ISSUE.test(issue) ? issue : null;
};

// What was untracked when the run started (run-state.json), or null when the run did not record it.
export const untrackedAtStartOf = (state: unknown): string[] | null =>
  isRecord(state) && Array.isArray(state.untrackedAtStart)
    ? state.untrackedAtStart.filter(
        (path: unknown): path is string => typeof path === 'string'
      )
    : null;

export const deletedLine = (deletion: Deletion): string => {
  if (deletion.kind === 'file') return `deleted: ${deletion.rel}`;
  const { rel, files } = deletion;
  return `deleted: ${rel} (${files} file${files === 1 ? '' : 's'})`;
};

const isInsideRoot = (root: string, path: string): boolean => {
  const rel = relative(root, path);
  return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
};

const lstatOrNull = (path: string): Stats | null => {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
};

const refused = (reason: string): Verdict => ({ kind: 'refused', reason });

// Whether `arg` may be deleted, and what to delete: the link itself when it is a symlink.
export const verdictOf = (
  arg: string,
  { root, cwd, atStart, git }: VerdictContext
): Verdict => {
  const listed = (command: string, ...args: readonly string[]): string[] =>
    git(command, '-z', ...args)
      .stdout.split('\0')
      .filter(Boolean);
  const absolute = resolve(cwd, arg);
  if (!isInsideRoot(root, absolute)) return refused('outside the repo');
  let parent: string;
  try {
    parent = realpathSync(dirname(absolute));
  } catch {
    return refused('does not exist');
  }
  const path = join(parent, absolute.slice(dirname(absolute).length + 1));
  if (!(parent === root || isInsideRoot(root, parent))) {
    return refused('outside the repo');
  }
  const stats = lstatOrNull(path);
  if (!stats) return refused('does not exist');
  const rel = relative(root, path);
  if (stats.isDirectory()) {
    if (listed('ls-files', '--', rel).length) {
      return refused('holds files tracked by git');
    }
    const ignored = listed(
      'ls-files',
      '--others',
      '--ignored',
      '--exclude-standard',
      '--directory',
      '--',
      rel
    );
    if (git('check-ignore', '-q', '--', rel).status === 0) {
      return refused('ignored by git');
    }
    if (ignored.length) {
      return refused(`holds ignored files (${ignored.join(', ')})`);
    }
    const files = listed(
      'ls-files',
      '--others',
      '--exclude-standard',
      '--',
      rel
    );
    const old = files.find((file) => atStart.has(file));
    if (old) return refused(`holds ${old}, which existed when the run started`);
    return { kind: 'directory', path, rel, files: files.length };
  }
  if (git('ls-files', '--error-unmatch', '--', rel).status === 0) {
    return refused('tracked by git');
  }
  if (git('check-ignore', '-q', '--no-index', '--', rel).status === 0) {
    return refused('ignored by git');
  }
  if (atStart.has(rel)) return refused('existed when the run started');
  return { kind: 'file', path, rel };
};

const readJson = (path: string): unknown => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
};

const main = (paths: readonly string[]): void => {
  if (!paths.length || paths.some((path) => path.startsWith('-'))) {
    process.stderr.write(`${USAGE}\n`);
    process.exit(2);
  }
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const root = realpathSync(
    resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd())
  );
  const refuseAll = (reason: string): never => {
    say(`refused: ${reason}; nothing deleted`);
    process.exit(1);
  };

  const issue =
    activeIssueOf(
      readJson(join(root, '.local/agent-harness/work/.active-run.json'))
    ) ?? refuseAll('no pipeline run is active');
  const atStart =
    untrackedAtStartOf(
      readJson(join(root, '.local/agent-harness/work', issue, 'run-state.json'))
    ) ?? refuseAll('the run did not record what existed at its start');
  const context: VerdictContext = {
    root,
    cwd: process.cwd(),
    atStart: new Set(atStart),
    git: (...args) => spawnSync('git', args, { cwd: root, encoding: 'utf8' }),
  };

  const verdicts = paths.map((arg) => ({
    arg,
    verdict: verdictOf(arg, context),
  }));
  const refusals = verdicts.flatMap(({ arg, verdict }) =>
    verdict.kind === 'refused' ? [`refused: ${arg}: ${verdict.reason}`] : []
  );
  if (refusals.length) {
    refusals.forEach(say);
    say('nothing deleted');
    process.exit(1);
  }
  verdicts
    .flatMap(({ verdict }) => (verdict.kind === 'refused' ? [] : [verdict]))
    .forEach((deletion) => {
      if (deletion.kind === 'directory') {
        rmSync(deletion.path, { recursive: true });
      } else unlinkSync(deletion.path);
      say(deletedLine(deletion));
    });
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
