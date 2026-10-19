// Folds a run's own fixup!/amend! commits into the commits they fix, before the PR exists (AGENTS.md →
// Trial mode: the one history rewrite agents run without asking).
// run.mts calls it when the steps have passed: before Lane 1/2's pr-draft step, after Lane 0's apply.
// Usage: node agent-harness/scripts/git/autosquash.mts --base <sha> [--root <repo>]
//   --base  where this run's commits start (run.mts records HEAD before its first branch step); only
//           commits after it are rewritten, and every fixup must target one of them
// Refuses, changing nothing, unless: the checkout is on a feature branch with a clean working tree; no
// branch of that name exists on origin (`git ls-remote`); no pull request exists for it (`gh pr list`,
// read-only; unreadable GitHub refuses). Then `git rebase -i --autosquash <base>` with no editor. After
// the fold no fixup!/amend! subject may be left and the tree must equal the tree before (the base did
// not move); folded amend! messages must pass commitlint. A conflict runs `git rebase --abort`; a failed
// check after the fold restores the old HEAD.
// Output: one line `autosquash: done: … | nothing to do … | refused: … | aborted: …`, then the commits.
// Exit 0 done or nothing to do · 1 refused or aborted (the branch is as it was) · 2 usage

import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isRecord } from '../lib/json.mts';

const USAGE =
  'usage: node agent-harness/scripts/git/autosquash.mts --base <sha> [--root <repo>]';
const FIXUP = /^(fixup|amend)! (.+)$/;

export interface Commit {
  readonly sha: string;
  readonly subject: string;
}

// `git log --format='%H %s'` output, one commit per line.
export const commitsOf = (log: string): Commit[] =>
  log
    .split('\n')
    .filter(Boolean)
    .map((line) => ({ sha: line.slice(0, 40), subject: line.slice(41) }));

export const isFixup = (subject: string): boolean => FIXUP.test(subject);

// The first fixup that folds into no commit of this run: git matches the subject, or a commit id.
export const strayFixupOf = (
  commits: readonly Commit[]
): Commit | undefined => {
  const targets = commits.filter(({ subject }) => !isFixup(subject));
  return commits
    .filter(({ subject }) => isFixup(subject))
    .find(({ subject }) => {
      const target = FIXUP.exec(subject)?.[2] ?? '';
      return !targets.some(
        (commit) =>
          commit.subject === target ||
          (target.length >= 7 && commit.sha.startsWith(target))
      );
    });
};

// The pull request numbers in `gh pr list --json number` output, or null when it is not that list.
export const pullRequestNumbersOf = (stdout: string): number[] | null => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return null;
  const numbers = parsed.map((item: unknown) =>
    isRecord(item) && typeof item.number === 'number' ? item.number : null
  );
  return numbers.every((number) => number !== null) ? numbers : null;
};

const short = (sha: string | null): string => String(sha).slice(0, 12);

// A fold that passed its checks: how many fixups it folded (amends of them), HEAD before and after.
export interface Fold {
  readonly fixups: number;
  readonly amends: number;
  readonly oldHead: string;
  readonly newHead: string | null;
  readonly tree: string;
}

export const doneLine = ({
  fixups,
  amends,
  oldHead,
  newHead,
  tree,
}: Fold): string => {
  const kinds = (
    [
      ['fixup!', fixups - amends],
      ['amend!', amends],
    ] as const
  )
    .filter(([, count]) => count)
    .map(([kind, count]) => `${kind} ${count}`)
    .join(', ');
  const [before, after, unchanged] = [oldHead, newHead, tree].map(short);
  return `autosquash: done: ${fixups} folded (${kinds}); HEAD ${before} → ${after}; tree ${unchanged} unchanged`;
};

const main = (args: readonly string[], cwd: string): void => {
  const valueOf = (flag: string): string | undefined =>
    args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
  const base = valueOf('--base');
  const root = resolve(valueOf('--root') ?? cwd);
  if (!base || !/^[0-9a-f]{7,40}$/.test(base)) {
    process.stderr.write(`autosquash: ${USAGE}\n`);
    process.exit(2);
  }

  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const run = (
    command: string,
    commandArgs: readonly string[],
    env: Readonly<Record<string, string>> = {}
  ): SpawnSyncReturns<string> =>
    spawnSync(command, commandArgs, {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, ...env },
    });
  const git = (...gitArgs: readonly string[]): string | null => {
    const result = run('git', gitArgs);
    return result.status === 0 ? result.stdout.trim() : null;
  };
  // Typed on the binding so that a call narrows like `process.exit` does.
  const refuse: (reason: string) => never = (reason) => {
    say(`autosquash: refused: ${reason}`);
    process.exit(1);
  };

  const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
  if (!branch || ['main', 'HEAD'].includes(branch)) {
    refuse(`not on a feature branch (${branch ?? 'unknown'})`);
  }
  if (git('status', '--porcelain') !== '') {
    refuse('the working tree is not clean');
  }
  if (git('merge-base', '--is-ancestor', base, 'HEAD') === null) {
    refuse(`${short(base)} is not an ancestor of HEAD`);
  }

  const commits = commitsOf(
    git('log', '--reverse', '--format=%H %s', `${base}..HEAD`) ?? ''
  );
  const fixups = commits.filter(({ subject }) => isFixup(subject));
  const baseShort = short(base);
  if (!fixups.length) {
    say(
      `autosquash: nothing to do (no fixup!/amend! commits after ${baseShort})`
    );
    process.exit(0);
  }
  const stray = strayFixupOf(commits);
  if (stray) {
    refuse(
      `${stray.subject} targets no commit of this run (after ${baseShort})`
    );
  }

  // Not published: no branch on origin, no pull request. Both are reads; an unreadable answer refuses.
  const remote = run('git', ['ls-remote', '--heads', 'origin', branch]);
  if (remote.status !== 0) {
    refuse(`cannot read origin (git ls-remote: ${remote.stderr.trim()})`);
  }
  if (
    remote.stdout.trim() ||
    git('rev-parse', '--verify', '--quiet', `refs/remotes/origin/${branch}`)
  ) {
    refuse(`${branch} exists on origin`);
  }
  const prs = run('gh', [
    'pr',
    'list',
    '--head',
    branch,
    '--state',
    'all',
    '--json',
    'number',
  ]);
  const gh = (prs.stderr || prs.stdout).trim();
  const numbers =
    (prs.status === 0 ? pullRequestNumbersOf(prs.stdout) : null) ??
    refuse(
      `cannot tell whether a pull request exists for ${branch} (gh: ${gh})`
    );
  if (numbers.length) {
    const list = numbers.map((number) => `#${number}`).join(', ');
    refuse(`a pull request exists for ${branch} (${list})`);
  }

  const oldHead = git('rev-parse', 'HEAD');
  const tree = git('rev-parse', 'HEAD^{tree}');
  if (!oldHead || !tree) refuse('cannot read HEAD and its tree');
  const rebase = run('git', ['rebase', '-i', '--autosquash', base], {
    GIT_SEQUENCE_EDITOR: ':',
    GIT_EDITOR: ':',
  });
  if (rebase.status !== 0) {
    run('git', ['rebase', '--abort']);
    const head = short(git('rev-parse', 'HEAD'));
    say(
      `autosquash: aborted: the rebase stopped on a conflict; git rebase --abort restored HEAD ${head}`
    );
    process.exit(1);
  }
  const restore: (reason: string) => never = (reason) => {
    // The tree was clean before the fold, so going back discards nothing.
    run('git', ['reset', '--hard', oldHead]);
    return refuse(`${reason}; HEAD restored to ${short(oldHead)}`);
  };
  const left = (git('log', '--format=%s', `${base}..HEAD`) ?? '')
    .split('\n')
    .filter((subject) => isFixup(subject));
  if (left.length) restore(`fixups left after the fold: ${left.join(' · ')}`);
  const folded = git('rev-parse', 'HEAD^{tree}');
  if (folded !== tree) {
    restore(`the tree changed (${short(tree)} → ${short(folded)})`);
  }
  const amends = fixups.filter(({ subject }) =>
    subject.startsWith('amend! ')
  ).length;
  if (
    amends &&
    run('npx', ['--no', '--', 'commitlint', '--from', base, '--to', 'HEAD'])
      .status !== 0
  ) {
    restore('commitlint failed on the folded messages');
  }

  say(
    doneLine({
      fixups: fixups.length,
      amends,
      oldHead,
      newHead: git('rev-parse', 'HEAD'),
      tree,
    })
  );
  (git('log', '--reverse', '--format=%h %s', `${base}..HEAD`) ?? '')
    .split('\n')
    .filter(Boolean)
    .forEach((line) => say(`  ${line}`));
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2), process.cwd());
}
