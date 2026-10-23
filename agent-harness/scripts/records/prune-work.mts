// Prunes a closed pipeline work dir once its pull request is merged and its run is recorded
// (ds-run-pipeline → Retention).
// Usage: node agent-harness/scripts/records/prune-work.mts <N | PR-n> [--apply] [--records <dir>] [--root <repo>]
//   <N>:       issue work dir .local/agent-harness/work/<N>/, checked against every PR that closes issue #N
//   PR-<n>:    PR work dir .local/agent-harness/work/PR-<n>/ (ds-resolve-pr-comments), checked against PR #n
//   default:   dry run — print the plan and the bytes it would free, change nothing
//   --apply:   delete the work dir
//   --records: where record-run.mts wrote the record (default .local/agent-harness/runs)
// Exit 0 done or dry run · 1 refused (PR open or unmerged, none linked, GitHub unreadable, no record,
// a file missing from the record or differing from its copy, no such dir) ·
// 2 usage.
// GitHub is only read (one GraphQL query or `gh pr view`).

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_RECORDS_DIR,
  ID_PATTERN,
  WORK_DIR,
  filesUnder,
  isDirectory,
  isInside,
  recordableFiles,
  sha256,
  type RecordableFile,
} from './run-records.mts';
import { isRecord, type JsonObject } from '../lib/json.mts';

const REPO_OWNER = 'daimlertruck';
const REPO_NAME = 'DT-DDS';
const USAGE =
  'usage: node agent-harness/scripts/records/prune-work.mts <N | PR-n> [--apply] [--records <dir>] [--root <repo>]';
const VALUE_FLAGS: readonly string[] = ['--root', '--records'];

const ISSUE_PULL_REQUESTS_QUERY = `query($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) {
    issue(number: $number) {
      closedByPullRequestsReferences(first: 20, includeClosedPrs: true) {
        nodes { number state mergedAt url }
      }
    }
  }
}`;

// A pull request's state as GitHub reports it.
export interface PullRequestState {
  readonly number: number;
  readonly state: string;
  readonly mergedAt: string | null;
}

const at = (value: unknown, ...keys: readonly string[]): unknown =>
  keys.reduce<unknown>(
    (node, key) => (isRecord(node) ? node[key] : undefined),
    value
  );

// A pull request read from gh's JSON; null when it is not one.
export const pullRequestOf = (value: unknown): PullRequestState | null =>
  isRecord(value) &&
  typeof value.number === 'number' &&
  typeof value.state === 'string'
    ? {
        number: value.number,
        state: value.state,
        mergedAt: typeof value.mergedAt === 'string' ? value.mergedAt : null,
      }
    : null;

// The pull requests that close an issue, from the GraphQL response; null when one cannot be read.
export const closingPullRequestsOf = (
  response: unknown
): PullRequestState[] | null => {
  const nodes = at(
    response,
    'data',
    'repository',
    'issue',
    'closedByPullRequestsReferences',
    'nodes'
  );
  const pullRequests = (Array.isArray(nodes) ? nodes : []).map(pullRequestOf);
  return pullRequests.every((pr) => pr !== null) ? pullRequests : null;
};

export const mergedOf = (
  pullRequests: readonly PullRequestState[]
): PullRequestState[] =>
  pullRequests.filter(
    ({ state, mergedAt }) => state === 'MERGED' && Boolean(mergedAt)
  );

const list = (pullRequests: readonly PullRequestState[]): string =>
  pullRequests.map(({ number }) => `PR #${number}`).join(', ');

// Why the work dir of `subject` cannot be pruned yet; null once a linked PR merged and none is open.
export const refusalOf = (
  subject: string,
  pullRequests: readonly PullRequestState[]
): string | null => {
  if (!pullRequests.length) {
    return `no pull request closes ${subject} (the PR body needs "Closes ${subject}"); prune by hand if intended`;
  }
  const open = pullRequests.filter(({ state }) => state === 'OPEN');
  if (open.length) {
    return `${subject}: ${list(open)} still open; prune after it merges`;
  }
  if (!mergedOf(pullRequests).length) {
    return `${subject}: no linked pull request was merged (${list(
      pullRequests
    )}); prune by hand if intended`;
  }
  return null;
};

// What keeps the record from vouching for the work dir: a recordable file it lacks, or one whose copy
// or recorded hash differs. `hashOf` is null for a missing file.
export const recordProblemsOf = (
  recordable: readonly RecordableFile[],
  recordedHashes: JsonObject,
  recordDir: string,
  hashOf: (path: string) => string | null
): string[] =>
  recordable.flatMap(({ source, target }) => {
    if (!recordedHashes[target]) return [`${target} is not in the record`];
    const hash = hashOf(source);
    return recordedHashes[target] === hash &&
      hashOf(join(recordDir, target)) === hash
      ? []
      : [`${target} differs from its record copy`];
  });

const plural = (count: number, word: string): string =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

const main = (args: readonly string[]): void => {
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const stop = (code: number, message: string): never => {
    process.stderr.write(`prune-work: ${message}\n`);
    process.exit(code);
  };
  const valueOf = (flag: string): string | undefined =>
    args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
  const apply = args.includes('--apply');
  const root = resolve(valueOf('--root') ?? process.cwd());
  const positional = args.filter(
    (arg, index) =>
      !arg.startsWith('--') && !VALUE_FLAGS.includes(args[index - 1] ?? '')
  );
  const rel = (path: string): string => relative(root, path);

  const gh = (ghArgs: readonly string[]): unknown => {
    const result = spawnSync('gh', ghArgs, { encoding: 'utf8' });
    if (result.error || result.status !== 0) {
      const detail = (result.stderr || result.error?.message || '').trim();
      stop(
        1,
        `cannot read PR state from GitHub (gh ${ghArgs
          .slice(0, 2)
          .join(' ')}): ${detail}`
      );
    }
    try {
      return JSON.parse(result.stdout);
    } catch {
      return stop(
        1,
        'cannot read PR state from GitHub: gh returned invalid JSON'
      );
    }
  };
  const unreadable = (): never =>
    stop(1, 'cannot read PR state from GitHub: gh returned invalid JSON');

  const issuePullRequests = (issueNumber: string): PullRequestState[] =>
    closingPullRequestsOf(
      gh([
        'api',
        'graphql',
        '-f',
        `query=${ISSUE_PULL_REQUESTS_QUERY}`,
        '-F',
        `owner=${REPO_OWNER}`,
        '-F',
        `name=${REPO_NAME}`,
        '-F',
        `number=${issueNumber}`,
      ])
    ) ?? unreadable();

  const pullRequest = (prNumber: string): PullRequestState =>
    pullRequestOf(
      gh([
        'pr',
        'view',
        prNumber,
        '--repo',
        `${REPO_OWNER}/${REPO_NAME}`,
        '--json',
        'number,state,mergedAt,url',
      ])
    ) ?? unreadable();

  const [id] = positional;
  const match =
    positional.length === 1 && id !== undefined ? ID_PATTERN.exec(id) : null;
  if (!match || id === undefined) return stop(2, USAGE);

  const [, issueNumber, prNumber = ''] = match;
  const recordsRoot = resolve(
    root,
    valueOf('--records') ?? DEFAULT_RECORDS_DIR
  );
  if (isInside(recordsRoot, join(root, WORK_DIR))) {
    stop(
      2,
      'the records dir must be outside .local/agent-harness/work (records outlive the work dirs)'
    );
  }
  const workDir = join(root, WORK_DIR, id);
  if (!isDirectory(workDir)) stop(1, `${rel(workDir)} is not a work directory`);

  const subject = issueNumber ? `#${issueNumber}` : `PR #${prNumber}`;
  const pullRequests = issueNumber
    ? issuePullRequests(issueNumber)
    : [pullRequest(prNumber)];
  const refusal = refusalOf(subject, pullRequests);
  if (refusal) stop(1, refusal);

  const recordDir = join(recordsRoot, id);
  const recordPath = join(recordDir, 'record.json');
  if (!existsSync(recordPath)) {
    stop(
      1,
      `no record for ${id} in ${rel(
        recordsRoot
      )}; run record-run.mts ${id} --apply first`
    );
  }
  const notValid = (): never =>
    stop(
      1,
      `${rel(
        recordPath
      )} is not valid JSON; re-run record-run.mts ${id} --apply`
    );
  const recordedHashes = ((): JsonObject => {
    try {
      const record: unknown = JSON.parse(readFileSync(recordPath, 'utf8'));
      if (!isRecord(record)) return notValid();
      return isRecord(record.files) ? record.files : {};
    } catch {
      return notValid();
    }
  })();
  const recordable = recordableFiles(workDir);
  const problems = recordProblemsOf(
    recordable,
    recordedHashes,
    recordDir,
    (path) => (existsSync(path) ? sha256(path) : null)
  );
  if (problems.length) {
    stop(1, `${problems.join('; ')}; re-run record-run.mts ${id} --apply`);
  }

  const files = filesUnder(workDir);
  const bytes = files.reduce(
    (total, entry) => total + lstatSync(join(workDir, entry)).size,
    0
  );
  const size = `${plural(files.length, 'file')}, ${bytes} bytes`;

  mergedOf(pullRequests).forEach(({ number, mergedAt }) =>
    say(`${subject}: PR #${number} merged ${mergedAt}`)
  );
  say(
    `record ${rel(recordDir)} verified (${plural(recordable.length, 'file')})`
  );

  if (!apply) {
    say(`delete ${rel(workDir)} (${size})`);
    say('dry run: nothing changed; re-run with --apply');
    process.exit(0);
  }

  rmSync(workDir, { recursive: true });
  say(`deleted ${rel(workDir)} (${size})`);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
