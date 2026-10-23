// The run's records: the shared run file at G7 (docs/agent-harness/runs/<N>.json), and the close-out after
// the merge (record-run.mts, the issue comment, prune-work.mts).

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pathsOf } from './context.mts';
import { Stop } from './errors.mts';
import { git, harnessOf, readJsonFile, say } from './io.mts';
import { isLaneChoice, runStateFrom, type LaneChoice } from './state.mts';
import {
  commentOf,
  pullRequestOutcomeOf,
  RUN_FILES_DIR,
  runFileOf,
  runFilePathOf,
  type RunFile,
} from '../records/run-file.mts';
import { DEFAULT_RECORDS_DIR } from '../records/run-records.mts';

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..');

const toolCallsOf = (workDir: string, runId: string): number => {
  const log = join(workDir, `tool-calls-${runId}.log`);
  return existsSync(log)
    ? readFileSync(log, 'utf8').split('\n').filter(Boolean).length
    : 0;
};

export const runFileFor = (
  root: string,
  id: string,
  runId: string,
  lane: LaneChoice
): RunFile | null => {
  const { workDir, runLogPath } = pathsOf(root, id);
  return existsSync(runLogPath)
    ? runFileOf({
        id,
        runLog: readFileSync(runLogPath, 'utf8'),
        lane,
        harness: harnessOf(root),
        toolCalls: toolCallsOf(workDir, runId),
      })
    : null;
};

// At G7: the shared run record goes on the feature branch, so it ships with the PR. Never on main,
// and only once the base has docs/agent-harness/runs/: before that, a PR would carry a file nothing on
// main explains, so the record stays in the work dir.
export const commitRunFile = (
  root: string,
  id: string,
  file: RunFile | null
): string => {
  if (file === null) return 'run record not committed: not an issue run';
  const branch = git(root, 'rev-parse', '--abbrev-ref', 'HEAD');
  if (branch === null || branch === 'main' || branch === 'HEAD') {
    return `run record not committed: HEAD is on ${
      branch ?? 'no branch'
    }, not on a feature branch`;
  }
  if (
    git(
      root,
      'cat-file',
      '-e',
      `${file.base ?? 'origin/main'}:${RUN_FILES_DIR}`
    ) === null
  ) {
    const saved = join(pathsOf(root, id).workDir, 'run-record.json');
    writeFileSync(saved, `${JSON.stringify(file, null, 2)}\n`);
    return `run record not committed: the base has no ${RUN_FILES_DIR}/ (run records not adopted yet); saved to ${relative(
      root,
      saved
    )}`;
  }
  const path = runFilePathOf(id);
  const subject = `docs: record the agentic run for #${id}`;
  mkdirSync(join(root, RUN_FILES_DIR), { recursive: true });
  writeFileSync(join(root, path), `${JSON.stringify(file, null, 2)}\n`);
  const added = spawnSync('git', ['add', '--', path], {
    cwd: root,
    encoding: 'utf8',
  });
  const committed =
    added.status === 0
      ? spawnSync('git', ['commit', '-q', '-m', subject, '--', path], {
          cwd: root,
          encoding: 'utf8',
        })
      : added;
  if (committed.status !== 0) {
    return `run record not committed (${
      committed.stderr.trim().split('\n')[0] ?? ''
    }): commit ${path} with git commit -m "${subject}" -- ${path}`;
  }
  return `recorded the run in ${path} (commit ${
    git(root, 'rev-parse', '--short', 'HEAD') ?? '?'
  })`;
};

// At close-out: the issue comment, from the run file and the PR outcome record-run just wrote.
const writeIssueComment = (
  root: string,
  id: string,
  runId: string
): string | null => {
  const recordDir = join(root, DEFAULT_RECORDS_DIR, id);
  const recordPath = join(recordDir, 'record.json');
  const lanePath = pathsOf(root, id).lanePath;
  if (!existsSync(recordPath) || !existsSync(lanePath)) return null;
  const lane = readJsonFile(lanePath);
  const file = isLaneChoice(lane) ? runFileFor(root, id, runId, lane) : null;
  if (file === null) return null;
  const comment = commentOf(
    file,
    pullRequestOutcomeOf(readJsonFile(recordPath))
  );
  const commentPath = join(recordDir, 'issue-comment.md');
  writeFileSync(commentPath, comment);
  return relative(root, commentPath);
};

// After the merge: record, then prune (both scripts refuse what they must; GitHub is only read).
export const closeOut = (
  root: string,
  id: string,
  statePath: string
): number => {
  const state = existsSync(statePath)
    ? runStateFrom(readJsonFile(statePath), '?')
    : null;
  if (!/^handed off/.test(state?.outcome ?? '')) {
    const where = state?.pending
      ? `pending at ${state.pending.gate}`
      : state?.outcome ?? 'no run state';
    throw new Stop(
      1,
      `--close: run ${
        state?.runId ?? '?'
      } of ${id} has not been handed off (${where}); close out only after G7 and the merge`
    );
  }
  // A records script, its output passed through; its exit code.
  const runScript = (script: string): number => {
    say(`$ node agent-harness/scripts/${script} ${id} --apply`);
    const result = spawnSync(
      process.execPath,
      [join(SCRIPTS, script), id, '--apply', '--root', root],
      { cwd: root, encoding: 'utf8' }
    );
    process.stdout.write(result.stdout ?? '');
    process.stderr.write(result.stderr ?? '');
    return result.status ?? 1;
  };
  const recorded = runScript('records/record-run.mts');
  if (recorded !== 0) return recorded;
  const comment = writeIssueComment(root, id, state?.runId ?? '');
  const pruned = runScript('records/prune-work.mts');
  if (pruned !== 0) return pruned;
  if (comment !== null) {
    say(
      `Post the run record on the issue: gh issue comment ${id} --repo daimlertruck/DT-DDS --body-file ${comment}`
    );
  }
  return 0;
};
