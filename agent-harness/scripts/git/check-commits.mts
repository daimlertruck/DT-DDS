// Read-only commit checks for the verify gate (ds-verify-changes → Procedure 4) and Lane 0
// (ds-express): every commit in <base>..HEAD has exactly one Signed-off-by, the human committer's
// (`git var GIT_COMMITTER_IDENT`, from git config user.name/email), as its last trailer; no commit
// body mentions the harness; fixup! and amend! subjects are listed (informational). A script, not a
// shell loop: stage sessions run in dontAsk mode, where a multi-line shell loop is denied.
// Usage: node agent-harness/scripts/git/check-commits.mts [--base <ref>]   (default origin/main)
// Exit: 0 every check passed · 1 a finding, or no commits to check · 2 git failed

import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The words ds-verify-changes names: harness paths, trial, probes, gates, pipeline artifacts.
const HARNESS_WORDS =
  /\.agents\/|\.local\/|harness|trial|probe|\bG[1-7]\b|HUMAN-RUN|run-log|intake-decisions|context-bundle|validation-report/i;
const TRAILER = /^[A-Za-z][\w-]*: /;
const FIXUP = /^(?:fixup|amend)! /;

// One commit as git prints it: the message (`%B`, trailing whitespace trimmed) and its trailers.
export interface Commit {
  readonly sha: string;
  readonly message: string;
  readonly trailers: readonly string[];
}

export interface CheckReport {
  readonly lines: readonly string[];
  readonly exitCode: 0 | 1;
}

// The committer identity git prints (`Name <email> <time> <tz>`) as the sign-off trailer it makes.
export const humanSignoffOf = (committerIdent: string): string =>
  `Signed-off-by: ${committerIdent.replace(/\s+\d+\s+[+-]\d{4}\s*$/, '')}`;

const signoffFindingOf = (
  { trailers }: Commit,
  label: string,
  human: string
): string | null => {
  const signoffs = trailers.filter((line) => line.startsWith('Signed-off-by:'));
  if (!signoffs.length) return `BAD-SIGNOFF ${label} — no Signed-off-by`;
  if (signoffs.length > 1) {
    return `BAD-SIGNOFF ${label} — ${signoffs.length} Signed-off-by trailers`;
  }
  if (trailers.at(-1) !== human) {
    return `BAD-SIGNOFF ${label} — the last trailer is not the human sign-off`;
  }
  return null;
};

// What follows the `commits: <n> (<range>)` line for these commits (oldest first), and the exit code.
export const reportOf = (
  commits: readonly Commit[],
  human: string
): CheckReport => {
  const checked = commits.map((commit) => {
    const [subject = '', ...rest] = commit.message.split('\n');
    const label = `${commit.sha.slice(0, 12)} ${subject}`;
    return {
      subject,
      signoff: signoffFindingOf(commit, label, human),
      bodies: rest
        .filter(
          (line) =>
            line.trim() && !TRAILER.test(line) && HARNESS_WORDS.test(line)
        )
        .map((line) => `HARNESS-WORD ${label} — ${line.trim()}`),
    };
  });
  const signoff = checked.flatMap(({ signoff }) => (signoff ? [signoff] : []));
  const bodies = checked.flatMap(({ bodies }) => bodies);
  const fixups = checked
    .map(({ subject }) => subject)
    .filter((subject) => FIXUP.test(subject));
  return {
    lines: [
      ...(signoff.length ? signoff : ['signoff: ok']),
      ...(bodies.length ? bodies : ['bodies: ok']),
      `fixups: ${fixups.length ? fixups.join(' · ') : 'none'}`,
    ],
    exitCode: signoff.length || bodies.length ? 1 : 0,
  };
};

const linesOf = (text: string): string[] => text.split('\n').filter(Boolean);

const main = (args: readonly string[]): void => {
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const git = (...gitArgs: readonly string[]): string => {
    const result = spawnSync('git', gitArgs, { encoding: 'utf8' });
    if (result.status !== 0) {
      process.stderr.write(
        `check-commits: git ${gitArgs.join(' ')}: ${result.stderr.trim()}\n`
      );
      process.exit(2);
    }
    return result.stdout;
  };

  const base = args.includes('--base')
    ? args[args.indexOf('--base') + 1]
    : 'origin/main';
  const human = humanSignoffOf(git('var', 'GIT_COMMITTER_IDENT'));
  const range = `${base}..HEAD`;
  const shas = linesOf(git('rev-list', '--reverse', range));
  if (!shas.length) {
    say(`commits: 0 (${range}): nothing to check`);
    process.exit(1);
  }
  say(`commits: ${shas.length} (${range})`);
  const commits = shas.map((sha) => ({
    sha,
    message: git('log', '-1', '--format=%B', sha).replace(/\s+$/, ''),
    trailers: linesOf(
      git('log', '-1', '--format=%(trailers:only,unfold)', sha)
    ),
  }));
  const { lines, exitCode } = reportOf(commits, human);
  lines.forEach(say);
  process.exit(exitCode);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
