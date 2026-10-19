// Deterministic lane classifier. Reads an issue (`gh issue view <N> --json number,title,body,labels,…`,
// saved as .local/agent-harness/work/<N>/issue.json) and decides the run lane from its labels, its template fields
// and what it names. Caps come from the stage table. Below the table's `lowConfidence`, one Sonnet
// call with --max-turns 1 decides, and the reasons say so.
// Usage: node agent-harness/scripts/runner/lane.mts <N> [--issue-file <path>] [--dry] [--root <repo>]
//   writes .local/agent-harness/work/<N>/lane.json (not with --dry, which also never calls a model) and prints it.
// Exit: 0 · 1 issue or table unreadable · 2 usage

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { featuresOf, type Features } from './lane/features.mts';
import { issueFrom, type Issue } from './lane/issue.mts';
import {
  promptOf,
  SYSTEM_PROMPT,
  withAnswer,
  type DecidedBy,
  type Decision,
} from './lane/model-fallback.mts';
import { classify } from './lane/rules.mts';
import {
  laneOf,
  loadTable,
  type LaneId,
  type StageTable,
} from './stage-table.mts';
import { WORK_DIR } from '../records/run-records.mts';
import { isClaudeResult } from '../records/usage.mts';

export interface AskInput {
  readonly root: string;
  readonly id: string;
  readonly issue: Issue;
  readonly verdict: Decision;
}

export type Ask = (input: AskInput) => Decision;

export interface LaneRecordInput {
  readonly root: string;
  readonly id: string;
  readonly issue: Issue;
  readonly table: StageTable;
  readonly dry?: boolean;
  readonly ask?: Ask;
  readonly override?: LaneId | null;
  readonly now?: Date;
}

// lane.json: the verdict, the lane's caps from the stage table, and the classifier's inputs.
export interface LaneRecord {
  readonly issue: number | null;
  readonly lane: LaneId;
  readonly name: string;
  readonly maxUsd: number;
  readonly maxToolCalls: number;
  readonly confidence: number;
  readonly decidedBy: DecidedBy;
  readonly reasons: readonly string[];
  readonly classifierUsd: number | null;
  readonly features: Features;
  readonly decidedAt: string;
}

// The whole answer from the saved result, not run-stage's clipped status line.
const answerIn = (root: string, out: string): string => {
  const resultPath = out.match(/ and (\S+\.json)$/m)?.[1];
  if (!resultPath) return '';
  try {
    const result: unknown = JSON.parse(
      readFileSync(join(root, resultPath), 'utf8')
    );
    return isClaudeResult(result) ? result.result ?? '' : '';
  } catch {
    return '';
  }
};

// One Sonnet request, recorded like a stage (run-stage.mts → run log, usage/). Returns the verdict
// with the model's lane, or the deterministic one when the answer is unusable, saying which.
export const askModel: Ask = ({ root, id, issue, verdict }) => {
  const runStage = join(
    dirname(fileURLToPath(import.meta.url)),
    'run-stage.mts'
  );
  const session = spawnSync(
    process.execPath,
    [
      runStage,
      id,
      'lane-classifier',
      '--root',
      root,
      '--',
      promptOf(issue, verdict),
      '--settings',
      '.claude/pipeline.settings.json',
      '--system-prompt',
      SYSTEM_PROMPT,
      '--model',
      'sonnet',
      '--tools',
      '',
      '--max-turns',
      '1',
    ],
    {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
      timeout: 120000,
    }
  );
  const out = session.stdout ?? '';
  const cost = Number(
    out.match(/\$(\d+\.\d+) at list price/)?.[1] ??
      out.match(/Claude Code reported \$(\d+(?:\.\d+)?)/)?.[1] ??
      NaN
  );
  return withAnswer(
    verdict,
    answerIn(root, out),
    Number.isFinite(cost) ? cost : null
  );
};

// The lane record: verdict, caps from the stage table, inputs. `dry` never calls a model, and neither
// does a human override (`--lane`): the rules' verdict is kept in the reasons for calibration.
export const laneRecord = ({
  root,
  id,
  issue,
  table,
  dry = false,
  ask = askModel,
  override = null,
  now = new Date(),
}: LaneRecordInput): LaneRecord => {
  const rules: Decision = { ...classify(issue), decidedBy: 'rules' };
  const verdict: Decision =
    override !== null
      ? {
          ...rules,
          lane: override,
          decidedBy: 'human (--lane)',
          reasons: [
            ...rules.reasons,
            `human override: lane ${override} (--lane); the rules said lane ${rules.lane} at confidence ${rules.confidence}; no model call (--lane)`,
          ],
        }
      : rules.confidence >= table.lowConfidence
      ? rules
      : dry
      ? {
          ...rules,
          reasons: [
            ...rules.reasons,
            `confidence ${rules.confidence} is below ${table.lowConfidence}: a real run asks Sonnet once (--max-turns 1)`,
          ],
        }
      : ask({ root, id, issue, verdict: rules });
  const caps = laneOf(table, verdict.lane);
  return {
    issue: issue.number ?? null,
    lane: verdict.lane,
    name: caps.name,
    maxUsd: caps.maxUsd,
    maxToolCalls: caps.maxToolCalls,
    confidence: verdict.confidence,
    decidedBy: verdict.decidedBy,
    reasons: verdict.reasons,
    classifierUsd: verdict.usd ?? null,
    features: featuresOf(issue),
    decidedAt: now.toISOString().replace(/\.\d{3}Z$/, 'Z'),
  };
};

export const readIssue = (
  root: string,
  id: string,
  issueFile: string | null = null
): Issue => {
  const path = issueFile
    ? resolve(root, issueFile)
    : join(root, WORK_DIR, id, 'issue.json');
  if (!existsSync(path)) {
    throw new Error(
      `no issue file at ${path} (save one with gh issue view ${id} --json number,title,body,labels,state,assignees > ${path})`
    );
  }
  return issueFrom(JSON.parse(readFileSync(path, 'utf8')));
};

const main = (args: readonly string[]): void => {
  const value = (flag: string): string | null =>
    args.includes(flag) ? args[args.indexOf(flag) + 1] ?? null : null;
  const root = resolve(value('--root') ?? process.cwd());
  const id = args.find(
    (arg, index) =>
      !arg.startsWith('--') &&
      !['--root', '--issue-file'].includes(args[index - 1] ?? '')
  );
  if (!id || !/^(?:\d+|[a-z][a-z0-9-]*)$/.test(id)) {
    process.stderr.write(
      'usage: node agent-harness/scripts/runner/lane.mts <N> [--issue-file <path>] [--dry] [--root <repo>]\n'
    );
    process.exit(2);
  }
  const dry = args.includes('--dry');
  const record = ((): LaneRecord => {
    try {
      return laneRecord({
        root,
        id,
        issue: readIssue(root, id, value('--issue-file')),
        table: loadTable(root),
        dry,
      });
    } catch (error) {
      process.stderr.write(
        `lane: ${error instanceof Error ? error.message : String(error)}\n`
      );
      process.exit(1);
    }
  })();
  if (!dry) {
    const path = join(root, WORK_DIR, id, 'lane.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(record, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
