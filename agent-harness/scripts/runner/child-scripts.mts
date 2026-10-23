// The runner's child scripts: a step's session through run-stage.mts, and the fold of the run's own
// fixups through autosquash.mts.

import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { branchLogOf, git, messageOf, now, say, tryJson } from './io.mts';
import { outcomeOf, resultPathIn, type StepOutcome } from './stage-outcome.mts';
import { autosquashActionOf, commitsFileOf } from './texts.mts';
import { withHumanActionRows } from '../records/run-records.mts';

import type { Step } from './stage-table.mts';

const HERE = dirname(fileURLToPath(import.meta.url));
const HEARTBEAT_MS = Number(process.env.DT_DDS_HEARTBEAT_MS) || 60000;

export interface StepRun {
  readonly root: string;
  readonly id: string;
  readonly step: Step;
  readonly args: readonly string[];
  readonly onStart: (child: ChildProcess) => void;
  readonly heartbeat: () => void;
}

// One step as one session, through run-stage.mts (which records it). `onStart` gets the child process;
// `heartbeat` runs every HEARTBEAT_MS while it runs.
export const runStep = ({
  root,
  id,
  step,
  args,
  onStart,
  heartbeat,
}: StepRun): Promise<StepOutcome> =>
  new Promise((resolveStep) => {
    const stageName = step.id.replace(':', '-');
    const child = spawn(
      process.execPath,
      [
        join(HERE, 'run-stage.mts'),
        id,
        stageName,
        '--root',
        root,
        '--',
        ...args,
      ],
      { cwd: root, stdio: ['ignore', 'pipe', 'inherit'] }
    );
    onStart(child);
    const timer = setInterval(heartbeat, HEARTBEAT_MS);
    let out = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      out += chunk;
      process.stdout.write(chunk);
    });
    child.on('close', (code, signal) => {
      clearInterval(timer);
      const resultPath = resultPathIn(out);
      const saved =
        resultPath && existsSync(join(root, resultPath))
          ? tryJson(readFileSync(join(root, resultPath), 'utf8'))
          : undefined;
      resolveStep(outcomeOf(root, { stageName, out, code, signal, saved }));
    });
  });

export interface AutosquashRun {
  readonly root: string;
  readonly workDir: string;
  readonly runLogPath: string;
  readonly base: string | null;
}

const revisionOf = (
  root: string
): { head: string | null; tree: string | null } => ({
  head: git(root, 'rev-parse', 'HEAD'),
  tree: git(root, 'rev-parse', 'HEAD^{tree}'),
});

// A Human actions row for the fold. The fold is done: a hand-made table in another layout costs the
// row, never the run.
const withAutosquashRow = (
  runLog: string,
  row: Parameters<typeof autosquashActionOf>[0]
): string | null => {
  try {
    return withHumanActionRows(runLog, [autosquashActionOf(row)]);
  } catch (error) {
    say(
      `   Human actions row not written (${messageOf(
        error
      )}); record the autosquash there by hand`
    );
    return null;
  }
};

// Folds the run's own fixups (autosquash.mts); on success records a Human actions row and the new
// commits. Never fatal: a refusal leaves the branch as it was, for the human (ds-run-pipeline → Human
// actions between gates). Returns its result line without the `autosquash: ` prefix.
export const autosquashRun = ({
  root,
  workDir,
  runLogPath,
  base,
}: AutosquashRun): string => {
  if (!base) return 'not run (this run made no branch commits)';
  const started = now();
  const before = revisionOf(root);
  const result = spawnSync(
    process.execPath,
    [join(HERE, '../git/autosquash.mts'), '--base', base, '--root', root],
    { cwd: root, encoding: 'utf8' }
  );
  const out = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
  if (out) say(out);
  const line =
    out
      .split('\n')
      .find((text) => text.startsWith('autosquash: '))
      ?.slice('autosquash: '.length) ?? `failed (exit ${result.status})`;
  if (result.status === 0 && line.startsWith('done:')) {
    const after = revisionOf(root);
    const runLog = existsSync(runLogPath)
      ? readFileSync(runLogPath, 'utf8')
      : '';
    const withRow = withAutosquashRow(runLog, {
      started,
      ended: now(),
      line,
      base,
      before,
      after,
    });
    if (withRow !== null) writeFileSync(runLogPath, withRow);
    writeFileSync(
      join(workDir, 'commits.txt'),
      commitsFileOf(branchLogOf(root), after.tree)
    );
  }
  return line;
};
