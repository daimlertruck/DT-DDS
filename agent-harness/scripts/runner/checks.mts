// The checks that stop a pipeline run, and the caps that limit its sessions: whether the issue is
// ready, what budget is left, each session's tool-call cap and the active-run file that carries it to
// the budget guard, and the red flags a script can see in the git state (ds-run-pipeline → What
// run.mts enforces). Pure: run.mts gathers the inputs (gh, git, files) and acts on the answers.

import { isRecord, type JsonObject } from '../lib/json.mts';
import { WORK_DIR } from '../records/run-records.mts';

import type { LaneId, Step } from './stage-table.mts';

// Why the issue cannot run yet, or null: it must be open, and claimed (status:in progress, assigned
// to `user`). `view` is `gh issue view <N> --json state,labels,assignees`.
export const readinessOf = (
  id: string,
  view: unknown,
  user: string | undefined
): string | null => {
  const issue: JsonObject = isRecord(view) ? view : {};
  const labels = (Array.isArray(issue.labels) ? issue.labels : []).flatMap(
    (label: unknown) =>
      isRecord(label) && typeof label.name === 'string' ? [label.name] : []
  );
  const assignees: readonly unknown[] = Array.isArray(issue.assignees)
    ? issue.assignees
    : [];
  const claimed =
    labels.includes('status:in progress') &&
    assignees.some((assignee) => isRecord(assignee) && assignee.login === user);
  if (issue.state !== 'OPEN') return `issue ${id} is ${String(issue.state)}`;
  if (!labels.includes('status:ready') && !claimed) {
    return `BLOCKED-NOT-READY: issue ${id} is neither status:ready nor claimed by ${user}`;
  }
  if (!claimed) {
    return `issue ${id} is not claimed. The human runs: gh issue edit ${id} --add-assignee @me --remove-label "status:ready" --add-label "status:in progress"`;
  }
  return null;
};

export interface Budget {
  // --budget-usd, when given.
  readonly budgetUsd: number | null;
  // The lane cap.
  readonly maxUsd: number;
  readonly spentUsd: number;
}

// The run's dollar cap: --budget-usd when it is below the lane cap.
export const runCapUsd = (budgetUsd: number | null, maxUsd: number): number =>
  Math.min(budgetUsd ?? Infinity, maxUsd);

// What the next session may spend (its --max-budget-usd).
export const leftUsd = ({ budgetUsd, maxUsd, spentUsd }: Budget): number =>
  runCapUsd(budgetUsd, maxUsd) - spentUsd;

// Why the run stops before `stepId`: less than a cent is left. Null while a session can still run.
export const budgetStopOf = (
  budget: Budget,
  lane: LaneId,
  stepId: string
): string | null => {
  if (leftUsd(budget) >= 0.01) return null;
  const { budgetUsd, maxUsd, spentUsd } = budget;
  return budgetUsd !== null && budgetUsd < maxUsd
    ? `--budget-usd ${budgetUsd} spent ($${spentUsd.toFixed(
        4
      )}); stopped before ${stepId}`
    : `run budget: lane ${lane} cap $${maxUsd} reached ($${spentUsd.toFixed(
        4
      )} spent); stopped before ${stepId}`;
};

// A session's tool-call cap: its step's own, or the human's raised cap (--tool-calls) when higher.
export const toolCallCapOf = (stepCap: number, raised: number | null): number =>
  Math.max(stepCap, raised ?? 0);

// `<step id>#<attempt>`: which session of a step a tool call belongs to.
export const stepKeyOf = (stepId: string, attempt: number): string =>
  `${stepId}#${attempt}`;

// The tool calls of one session in the run's ledger (`<time> <tool> <step key>` per line).
export const callsIn = (ledger: string, stepKey: string): number =>
  ledger.split('\n').filter((line) => line.split(' ')[2] === stepKey).length;

// The active-run file (.local/agent-harness/work/.active-run.json) that budget-guard reads. During a
// session it names the session's step key and cap; between sessions, the lane's tool calls per pass.
export interface ActiveRun {
  readonly issue: number | string;
  readonly lane: LaneId;
  readonly maxToolCalls: number;
  readonly step?: string;
  readonly pid: number;
  readonly runId: string;
}

export interface ActiveRunInput {
  readonly id: string;
  readonly lane: LaneId;
  readonly maxToolCalls: number;
  readonly stepKey: string | null;
  readonly pid: number;
  readonly runId: string;
}

export const activeRunOf = ({
  id,
  lane,
  maxToolCalls,
  stepKey,
  pid,
  runId,
}: ActiveRunInput): ActiveRun => ({
  issue: /^\d+$/.test(id) ? Number(id) : id,
  lane,
  maxToolCalls: Math.max(1, maxToolCalls),
  ...(stepKey ? { step: stepKey } : {}),
  pid,
  runId,
});

export interface GitState {
  readonly head: string | null;
  readonly branch: string | null;
  readonly status: string | null;
  readonly remoteRefs: readonly string[];
}

// The red flags a script can see: a work-dir stage changed tracked files or HEAD, a fixups stage
// added anything but fixup!/amend! commits, a stage committed on the base branch, or a remote branch
// appeared (a push). `subjects`: the new commits' subjects (before..after), or null when HEAD did not
// move forward (a rewrite).
export const redFlags = (
  step: Pick<Step, 'id' | 'writes'>,
  before: GitState,
  after: GitState,
  subjects: readonly string[] | null = []
): string[] => {
  const moved = after.head !== before.head;
  const tracked = after.status !== before.status;
  const others = (subjects ?? []).filter(
    (subject) => !/^(?:fixup|amend)! /.test(subject)
  );
  const pushed = after.remoteRefs.filter(
    (ref) => !before.remoteRefs.includes(ref)
  );
  const workDir = step.writes === 'work-dir';
  const fixups = step.writes === 'fixups';
  const commits = step.writes === 'branch' || fixups;
  return [
    ...(workDir && moved
      ? [`${step.id} may write only under ${WORK_DIR}/, but HEAD moved`]
      : []),
    ...(workDir && tracked
      ? [
          `${step.id} may write only under ${WORK_DIR}/, but tracked files changed:\n${after.status}`,
        ]
      : []),
    ...(fixups && tracked
      ? [
          `${step.id} may write only under ${WORK_DIR}/ and commit fixups, but tracked files changed:\n${after.status}`,
        ]
      : []),
    ...(fixups && moved && subjects === null
      ? [
          `${step.id} moved HEAD off ${String(before.head).slice(
            0,
            12
          )} (a history rewrite)`,
        ]
      : []),
    ...(fixups && moved && others.length
      ? [
          `${
            step.id
          } may add only fixup!/amend! commits, but added: ${others.join(
            ' · '
          )}`,
        ]
      : []),
    ...(commits && moved && (after.branch === 'main' || after.branch === 'HEAD')
      ? [`${step.id} committed on ${after.branch}, not on a feature branch`]
      : []),
    ...(pushed.length
      ? [`new remote ref(s) after ${step.id}: ${pushed.join(', ')} (a push?)`]
      : []),
  ];
};
