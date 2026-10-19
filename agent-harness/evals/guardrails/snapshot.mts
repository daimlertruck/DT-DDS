// Reads an eval clone's state for outcomes.mts (testing.md → Forbidden outcomes). Read-only: git
// queries and file reads.

import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  type Stats,
} from 'node:fs';
import { join } from 'node:path';

// Ref name → object id.
export type Refs = Readonly<Record<string, string>>;

// One trailer as `git interpret-trailers --parse` lists it: key, value.
export type Trailer = readonly [key: string, value: string];

export interface Commit {
  readonly sha: string;
  readonly subject: string;
  readonly trailers: readonly Trailer[];
  readonly files: readonly string[];
  // commitlint's verdict on the message; null when no lint function was given.
  readonly lintOk: boolean | null;
}

export interface Snapshot {
  readonly refs: Refs;
  readonly remoteRefs: Refs;
  // Commits no baseline commit reaches, oldest first.
  readonly newCommits: readonly Commit[];
  // Working-tree changes (modified, staged, untracked, newly ignored) outside the harness paths.
  readonly changedPaths: readonly string[];
  readonly hooksPath: string | null;
  readonly harnessHash: string;
  // Whether the branch still reaches the anchor commit; null when the case has no anchor.
  readonly anchorReachable: boolean | null;
  readonly ghCalls: readonly string[];
  readonly publishCalls: readonly string[];
}

export interface SnapshotSources {
  readonly clone: string;
  readonly remote: string;
  // The commits at case start: whatever they reach is not new.
  readonly baseline: readonly string[];
  readonly branch: string;
  readonly anchor?: string | undefined;
  // Paths (relative to the clone) whose content makes up the harness hash.
  readonly harnessPaths: readonly string[];
  readonly ghLog: string;
  readonly publishLog: string;
  readonly lintMessage?: ((message: string) => boolean) | undefined;
}

const git = (
  cwd: string,
  args: readonly string[],
  input?: string
): SpawnSyncReturns<string> => {
  const run = spawnSync('git', args, {
    cwd,
    input,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (run.error) {
    throw new Error(
      `git ${args.join(' ')} could not start in ${cwd}: ${run.error.message}`
    );
  }
  return run;
};

const gitOut = (
  cwd: string,
  args: readonly string[],
  input?: string
): string => {
  const run = git(cwd, args, input);
  if (run.status !== 0) {
    throw new Error(
      `git ${args.join(' ')} failed in ${cwd}: ${run.stderr.trim()}`
    );
  }
  return run.stdout;
};

const lines = (text: string): string[] => text.split('\n').filter(Boolean);

const sha256 = (data: string | Buffer): string =>
  createHash('sha256').update(data).digest('hex');

// `<refname> <objectname>`: a ref name has no space.
const refEntry = (line: string): [string, string] => {
  const space = line.indexOf(' ');
  return [line.slice(0, space), line.slice(space + 1)];
};

export const readRefs = (cwd: string): Refs =>
  Object.fromEntries(
    lines(
      gitOut(cwd, ['for-each-ref', '--format=%(refname) %(objectname)'])
    ).map(refEntry)
  );

const parseTrailers = (cwd: string, message: string): Trailer[] =>
  lines(gitOut(cwd, ['interpret-trailers', '--parse'], message)).map((line) => {
    const colon = line.indexOf(':');
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  });

const readCommit =
  (cwd: string, lintMessage: SnapshotSources['lintMessage']) =>
  (sha: string): Commit => {
    const message = gitOut(cwd, ['log', '-1', '--format=%B', sha]);
    return {
      sha,
      subject: message.split('\n')[0] ?? '',
      trailers: parseTrailers(cwd, message),
      files: lines(
        gitOut(cwd, [
          'diff-tree',
          '--no-commit-id',
          '--name-only',
          '-r',
          '--root',
          sha,
        ])
      ),
      lintOk: lintMessage ? lintMessage(message) : null,
    };
  };

interface PorcelainEntry {
  readonly status: string;
  readonly path: string;
}

// `git status --porcelain -z`: one `XY path` token per entry; a rename or copy (R or C in XY) is
// followed by a token holding its origin path.
const porcelainEntries = (text: string): PorcelainEntry[] => {
  const entries: PorcelainEntry[] = [];
  let originNext = false;
  for (const token of text.split('\0').filter(Boolean)) {
    if (originNext) {
      entries.push({ status: 'origin', path: token });
      originNext = false;
    } else {
      const status = token.slice(0, 2);
      entries.push({ status, path: token.slice(3) });
      originNext = /[RC]/.test(status);
    }
  }
  return entries;
};

const isUnder =
  (roots: readonly string[]) =>
  (path: string): boolean =>
    roots.some(
      (root) =>
        path === root || path === `${root}/` || path.startsWith(`${root}/`)
    );

const readChangedPaths = (
  cwd: string,
  harnessPaths: readonly string[]
): string[] => {
  const worktree = porcelainEntries(
    gitOut(cwd, ['status', '--porcelain', '-z', '--untracked-files=all'])
  );
  const ignored = porcelainEntries(
    gitOut(cwd, [
      'status',
      '--porcelain',
      '-z',
      '--ignored=traditional',
      '--untracked-files=normal',
    ])
  ).filter(({ status }) => status === '!!');
  const inHarness = isUnder(harnessPaths);
  return [...new Set([...worktree, ...ignored].map(({ path }) => path))].filter(
    (path) => !inHarness(path)
  );
};

const readHooksPath = (cwd: string): string | null => {
  const run = git(cwd, ['config', '--get', 'core.hooksPath']);
  return run.status === 0 ? run.stdout.trim() : null;
};

const lstatOrNull = (path: string): Stats | null => {
  try {
    return lstatSync(path);
  } catch {
    return null;
  }
};

// Every file and link under `path`, with its content hash or link target.
const fingerprint = (
  root: string,
  path: string
): (readonly [string, string])[] => {
  const full = join(root, path);
  const stat = lstatOrNull(full);
  if (!stat) return [[path, 'missing']];
  if (stat.isSymbolicLink()) return [[path, `link:${readlinkSync(full)}`]];
  if (stat.isDirectory()) {
    return readdirSync(full)
      .sort()
      .flatMap((name) => fingerprint(root, `${path}/${name}`));
  }
  return [[path, `file:${sha256(readFileSync(full))}`]];
};

const readAnchorReachable = (
  cwd: string,
  anchor: string | undefined,
  branch: string
): boolean | null =>
  anchor
    ? git(cwd, ['merge-base', '--is-ancestor', anchor, `refs/heads/${branch}`])
        .status === 0
    : null;

const readLog = (path: string): string[] =>
  existsSync(path) ? lines(readFileSync(path, 'utf8')) : [];

// New = reachable from some ref now, but from no baseline commit (the refs at case start).
const readNewCommits = (
  cwd: string,
  baseline: readonly string[],
  lintMessage: SnapshotSources['lintMessage']
): Commit[] =>
  lines(
    gitOut(
      cwd,
      ['rev-list', '--reverse', '--all', '--stdin'],
      baseline.map((sha) => `^${sha}\n`).join('')
    )
  ).map(readCommit(cwd, lintMessage));

export const takeSnapshot = ({
  clone,
  remote,
  baseline,
  branch,
  anchor,
  harnessPaths,
  ghLog,
  publishLog,
  lintMessage,
}: SnapshotSources): Snapshot => ({
  refs: readRefs(clone),
  remoteRefs: readRefs(remote),
  newCommits: readNewCommits(clone, baseline, lintMessage),
  changedPaths: readChangedPaths(clone, harnessPaths),
  hooksPath: readHooksPath(clone),
  harnessHash: sha256(
    JSON.stringify(harnessPaths.flatMap((path) => fingerprint(clone, path)))
  ),
  anchorReachable: readAnchorReachable(clone, anchor, branch),
  ghCalls: readLog(ghLog),
  publishCalls: readLog(publishLog),
});
