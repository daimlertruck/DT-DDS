// Before the first step: one run at a time, a finished run is not rerun, preflight, the issue, the
// lane (no model call with --lane; the classifier's cost counts toward the run), the Base line.

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import { relative, resolve } from 'node:path';

import { Stop } from './errors.mts';
import {
  compactNow,
  git,
  messageOf,
  readJsonFile,
  sameJson,
  say,
  writeJson,
} from './io.mts';
import { laneRecord, readIssue } from './lane.mts';
import { checkActiveRun, preflight } from './preflight.mts';
import { laneOf, type StageTable } from './stage-table.mts';
import {
  isEnded,
  isLaneChoice,
  runStateFrom,
  withLane,
  type LaneChoice,
  type RunState,
} from './state.mts';
import { withBase } from './texts.mts';
import {
  WORK_DIR,
  withDispatchRows,
  withGateRows,
} from '../records/run-records.mts';

import type { RunOptions } from './args.mts';
import type { RunPaths } from './context.mts';

export interface StartedRun {
  readonly state: RunState;
  readonly record: LaneChoice;
}

// A run log in another layout (an older run) would be refused mid-run, after money was spent.
const checkRunLogLayout = (root: string, runLogPath: string): void => {
  if (!existsSync(runLogPath)) return;
  try {
    withGateRows(withDispatchRows(readFileSync(runLogPath, 'utf8'), []), []);
  } catch (error) {
    throw new Stop(
      1,
      `${relative(root, runLogPath)}: ${messageOf(
        error
      )}. Move that work dir aside (it is an older run's record) and start again.`
    );
  }
};

// The issue, where every brief tells the stage to read it.
const saveIssue = (
  options: RunOptions,
  { workDir, issuePath }: RunPaths
): void => {
  const { root, id } = options;
  if (options.issueFile) {
    const fixture = readFileSync(resolve(root, options.issueFile), 'utf8');
    if (
      existsSync(issuePath) &&
      !sameJson(readFileSync(issuePath, 'utf8'), fixture)
    ) {
      throw new Stop(
        1,
        `${relative(root, issuePath)} differs from --issue-file ${
          options.issueFile
        }; pass the same file, or start a new run with --fresh`
      );
    }
    mkdirSync(workDir, { recursive: true });
    writeFileSync(issuePath, fixture);
  } else if (!existsSync(issuePath) && /^\d+$/.test(id)) {
    const view = spawnSync(
      'gh',
      [
        'issue',
        'view',
        id,
        '--json',
        'number,title,body,labels,state,assignees,milestone,comments,url',
      ],
      { cwd: root, encoding: 'utf8' }
    );
    if (view.status !== 0) {
      throw new Stop(1, `cannot read issue ${id}: ${view.stderr.trim()}`);
    }
    mkdirSync(workDir, { recursive: true });
    writeFileSync(issuePath, view.stdout);
  }
};

export const startRun = (
  options: RunOptions,
  table: StageTable,
  paths: RunPaths
): StartedRun => {
  const { root, id } = options;
  const { workDir, statePath, lanePath, runLogPath } = paths;
  checkActiveRun(paths.activePath, id);
  if (options.fresh && existsSync(workDir)) {
    const aside = `${workDir}.${compactNow()}`;
    renameSync(workDir, aside);
    say(
      `--fresh: moved ${relative(root, workDir)} to ${relative(root, aside)}`
    );
  }
  const saved = runStateFrom(
    existsSync(statePath) ? readJsonFile(statePath) : undefined,
    compactNow()
  );
  if (isEnded(saved)) {
    throw new Stop(
      1,
      `run ${saved.runId} of issue ${id} ended (${saved.outcome}). Start a new run with --fresh (it moves ${WORK_DIR}/${id} aside).`
    );
  }
  // A --decide reply answers the gate pending now, which the human has seen; it is never kept for later.
  if (options.decide !== null && !saved.pending) {
    throw new Stop(
      2,
      `no gate is pending for ${id}: start or resume with --no-wait, then pass the human's reply to the gate it shows`
    );
  }
  checkRunLogLayout(root, runLogPath);
  const problems = preflight(root, id, options.issueFile);
  if (problems.length) {
    throw new Stop(
      1,
      `preflight failed:\n${problems
        .map((problem) => `  - ${problem}`)
        .join('\n')}`
    );
  }
  saveIssue(options, paths);
  const issue = readIssue(root, id);
  const kept = existsSync(lanePath) ? readJsonFile(lanePath) : null;
  if (kept !== null && !isLaneChoice(kept)) {
    throw new Stop(
      1,
      `${relative(
        root,
        lanePath
      )} is not a lane record; move that work dir aside and start again`
    );
  }
  const classified =
    kept ?? laneRecord({ root, id, issue, table, override: options.lane });
  const state =
    kept === null
      ? { ...saved, spentUsd: saved.spentUsd + (classified.classifierUsd ?? 0) }
      : saved;
  const record =
    kept !== null && options.lane !== null && options.lane !== kept.lane
      ? withLane(kept, {
          lane: options.lane,
          caps: laneOf(table, options.lane),
          decidedBy: 'human (--lane)',
          reason: `human override: lane ${options.lane} (--lane)`,
        })
      : classified;
  writeJson(lanePath, record);
  const runLog = existsSync(runLogPath)
    ? readFileSync(runLogPath, 'utf8')
    : `# Run log — ${id}\n`;
  writeFileSync(
    runLogPath,
    withBase(runLog, git(root, 'rev-parse', 'origin/main') ?? 'unknown')
  );
  return { state, record };
};
