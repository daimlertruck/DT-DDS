// Records a pipeline run (ds-run-pipeline → Retention): copies the reports a run keeps into
// <records>/<id>/ and writes record.json from the run-log tables and the pull request's outcome.
// Usage: node agent-harness/scripts/records/record-run.mts <N | PR-n> [--apply] [--force] [--records <dir>] [--root <repo>]
//   default:   dry run — print the plan, change nothing
//   --apply:   copy the files and write record.json; re-run after the merge to fill the outcome
//   --force:   replace a copy whose content differs from the work dir (refused otherwise)
//   --records: where records live (default .local/agent-harness/runs); never under .local/agent-harness/work
// Exit 0 done or dry run · 1 refused (differing copy, GitHub unreadable, no such dir, bad record.json)
// · 2 usage. GitHub is only read (one GraphQL query). Nothing is committed or pushed.

import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ISSUE_QUERY,
  PR_QUERY,
  closingNodesOf,
  graphqlArgsOf,
  pickPullRequest,
  pullRequestNodeOf,
  pullRequestOf,
  type PullRequest,
} from './github.mts';
import {
  copyStateOf,
  doneLineOf,
  planLineOf,
  type PlannedFile,
} from './record-copies.mts';
import { BANNER, countsOf, recordOf } from './record-json.mts';
import {
  DEFAULT_RECORDS_DIR,
  ID_PATTERN,
  WORK_DIR,
  filesUnder,
  isDirectory,
  isInside,
  recordableFiles,
  sha256,
} from './run-records.mts';
import { isRecord } from '../lib/json.mts';

const USAGE =
  'usage: node agent-harness/scripts/records/record-run.mts <N | PR-n> [--apply] [--force] [--records <dir>] [--root <repo>]';
const VALUE_FLAGS: readonly string[] = ['--root', '--records'];

const say = (line: string): void => {
  process.stdout.write(`${line}\n`);
};

function stop(code: number, message: string): never {
  process.stderr.write(`record-run: ${message}\n`);
  process.exit(code);
}

function unreadable(): never {
  return stop(1, 'cannot read GitHub: gh returned invalid JSON');
}

const graphql = (query: string, number: string): unknown => {
  const result = spawnSync('gh', graphqlArgsOf(query, number), {
    encoding: 'utf8',
  });
  if (result.error || result.status !== 0) {
    stop(
      1,
      `cannot read GitHub (gh api graphql): ${(
        result.stderr ||
        result.error?.message ||
        ''
      ).trim()}`
    );
  }
  try {
    return JSON.parse(result.stdout);
  } catch {
    return unreadable();
  }
};

const pullRequestIn = (value: unknown): PullRequest =>
  pullRequestOf(value) ?? unreadable();

// The PR that closes the issue (the merged one first), or the PR of a PR work dir.
const closingPullRequest = (number: string): PullRequest | null =>
  pickPullRequest(
    closingNodesOf(graphql(ISSUE_QUERY, number)).map(pullRequestIn)
  );
const namedPullRequest = (number: string): PullRequest | null => {
  const node = pullRequestNodeOf(graphql(PR_QUERY, number));
  return node === null || node === undefined ? null : pullRequestIn(node);
};

const main = (args: readonly string[]): void => {
  const valueOf = (flag: string): string | undefined =>
    args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
  const apply = args.includes('--apply');
  const force = args.includes('--force');
  const root = resolve(valueOf('--root') ?? process.cwd());
  const positional = args.filter(
    (arg, index) =>
      !arg.startsWith('--') && !VALUE_FLAGS.includes(args[index - 1] ?? '')
  );
  const rel = (path: string): string => relative(root, path);

  const [id] = positional;
  const match =
    positional.length === 1 && id !== undefined ? ID_PATTERN.exec(id) : null;
  if (!match || id === undefined) return stop(2, USAGE);
  const [, issueNumber, prNumber] = match;

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
  const recordDir = join(recordsRoot, id);
  const subject = issueNumber ? `#${issueNumber}` : `PR #${prNumber}`;

  const readJson = (path: string, what: string): unknown => {
    try {
      return JSON.parse(readFileSync(path, 'utf8'));
    } catch {
      return stop(
        1,
        `${rel(path)} is not valid JSON; fix or move it (${what})`
      );
    }
  };
  const recordPath = join(recordDir, 'record.json');
  const existing = existsSync(recordPath) ? readJson(recordPath, 'record') : {};
  if (!isRecord(existing)) {
    return stop(
      1,
      `${rel(recordPath)} is not valid JSON; fix or move it (record)`
    );
  }

  const pr = issueNumber
    ? closingPullRequest(issueNumber)
    : namedPullRequest(prNumber ?? '');

  const runLogPath = join(workDir, 'run-log.md');
  const runLog = existsSync(runLogPath) ? readFileSync(runLogPath, 'utf8') : '';
  const issueJsonPath = join(workDir, 'issue.json');
  const issueJson = existsSync(issueJsonPath)
    ? readJson(issueJsonPath, 'issue snapshot')
    : null;

  const files = recordableFiles(workDir).map((file): PlannedFile => {
    const copy = join(recordDir, file.target);
    const hash = sha256(file.source);
    const state = copyStateOf(hash, existsSync(copy) ? sha256(copy) : null);
    return { ...file, copy, hash, state };
  });

  const record = recordOf({
    id,
    issueNumber,
    prNumber,
    pr,
    runLog,
    issueJson,
    existing,
    files,
    asOf: new Date().toISOString(),
  });

  const recordedSources = new Set(files.map(({ source }) => source));
  const notRecorded = readdirSync(workDir)
    .sort()
    .filter((name) => name !== 'snapshots')
    .flatMap((name) => {
      const path = join(workDir, name);
      if (isDirectory(path)) {
        const count = filesUnder(path).length;
        return [`${name}/ (${count} ${count === 1 ? 'file' : 'files'})`];
      }
      return recordedSources.has(path) ? [] : [name];
    });

  say(`record ${subject} -> ${rel(recordDir)}`);
  say(
    pr
      ? `${subject}: PR #${pr.number} ${pr.state.toLowerCase()}`
      : `${subject}: no pull request yet`
  );
  const differing = files.filter(({ state }) => state === 'differs');

  if (!apply) {
    files.forEach((file) => say(planLineOf(file, workDir, force)));
    if (notRecorded.length) say(`not recorded: ${notRecorded.join(', ')}`);
    say(`write record.json (${countsOf(record)})`);
    say('dry run: nothing changed; re-run with --apply');
    process.exit(0);
  }

  if (differing.length && !force) {
    const targets = differing.map(({ target }) => target).join(', ');
    stop(
      1,
      `${targets} ${
        differing.length === 1 ? 'exists' : 'exist'
      } with different content; re-run with --force to replace`
    );
  }

  files.forEach((file) => {
    if (file.state !== 'unchanged') {
      mkdirSync(dirname(file.copy), { recursive: true });
      copyFileSync(file.source, file.copy);
    }
    say(doneLineOf(file));
  });
  mkdirSync(recordDir, { recursive: true });
  writeFileSync(
    join(recordDir, 'README.md'),
    `# Run record ${subject}\n\n${BANNER}\n`
  );
  writeFileSync(recordPath, `${JSON.stringify(record, null, 2)}\n`);
  if (notRecorded.length) say(`not recorded: ${notRecorded.join(', ')}`);
  say(`wrote record.json (${countsOf(record)})`);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
