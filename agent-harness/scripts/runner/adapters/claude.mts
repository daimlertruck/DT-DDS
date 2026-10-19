// Claude Code adapter for the stage table: the only adapter. It turns resolved steps
// (stage-table.mts → stepsOf) into one agents file for `claude -p --agents <file>` and into the
// prompt and flags of each step's session. The stage skill is invoked as the prompt's `/skill`
// command: an agent's `skills` key preloads nothing when the agent runs as the session (`--agent`),
// from a file or from `--agents`, and stages have no Skill tool.
// Another harness gets an adapter only after the maintainers decide it (ADR-0008 decision 6) and
// its guards pass the guardrail eval under it.

import { omit } from '../../lib/objects.mts';

import type { Capability, Effort, Step, Tier } from '../stage-table.mts';

export const HARNESS = 'claude';
export const SETTINGS_PATH = '.claude/pipeline.settings.json';

// Capability → Claude Code tool. Search maps to Bash: Claude Code leaves Grep and Glob out of the
// default tool set on macOS, Linux and WSL (naming them loads nothing).
export const TOOLS: Readonly<Record<Capability, readonly string[]>> = {
  read: ['Read'],
  search: ['Bash'],
  shell: ['Bash'],
  write: ['Write'],
  edit: ['Edit'],
  delegate: ['Agent'],
};

// Tier → model alias; the pipeline settings' env block pins each alias to a model id.
export const MODELS: Readonly<Record<Tier, string>> = {
  haiku: 'haiku',
  sonnet: 'sonnet',
  opus: 'opus',
};

// Permissions. In print mode anything that would prompt is denied, so every session runs in
// `dontAsk` with rules generated from its step: least privilege per stage, no classifier calls, and a
// contributor's settings cannot change the mode. The hooks stay as a second layer. Read-only Bash
// (git status/log/diff, ls, cat, grep) needs no rule; a redirect needs a rule for its command and a
// Write/Edit rule for its target. A missing rule shows as a denial at the gate (run.mts lists the
// session's permission_denials).
export const PERMISSION_MODE = 'dontAsk';
const BASH_WORK: readonly string[] = [
  'mkdir -p .local/agent-harness/work/*',
  // Updates only refs/remotes/origin/main, so work-dir steps may run it too.
  'git fetch origin main',
  'gh issue view *',
  'gh pr list *',
  'gh pr view *',
  'gh api user --jq .login',
  'gh api repos/daimlertruck/DT-DDS/issues/*/parent',
  'gh api --method GET *',
  'node agent-harness/scripts/git/sandbox.mts *',
  'node agent-harness/scripts/git/check-commits.mts *',
  'node agent-harness/scripts/git/check-commits.mts',
];
// The verify gate (AGENTS.md → Stack & commands), for steps that run it.
const BASH_CHECKS: readonly string[] = [
  'yarn *',
  'npx --no -- commitlint *',
  'xargs -r npx prettier --check',
];
const BASH_FIXUPS: readonly string[] = ['git commit --fixup=*'];
// Deleting what the run created (a probe test): the script refuses anything else (clean-run.mts).
const BASH_CLEAN: readonly string[] = [
  'node agent-harness/scripts/git/clean-run.mts *',
];
const BASH_COMMITS: readonly string[] = [
  'git checkout -b *',
  'git switch -c *',
  'git add *',
  'git commit *',
  'git mv *',
  'git rm *',
];
// Harness files and AGENTS.md → Off-limits paths: denied even where a branch step may edit the checkout.
export const NEVER_EDIT: readonly string[] = [
  '/agent-harness/**',
  '.agents/skills/**',
  '.claude/**',
  '**/AGENTS.md',
  '**/CLAUDE.md',
  '.changeset/**',
  '**/CHANGELOG.md',
  '**/__snapshots__/**',
  'yarn.lock',
  'packages/themes/src/themes/**',
  'packages/themes/src/tokens/**',
  'packages/icons/src/codes.ts',
];

// Files run.mts owns under .local/agent-harness/work/: the run file and ledgers budget-guard reads,
// the state, lane, intake and decisions later steps trust, and the usage results the spend is computed
// from. Denied to every step, so no session can raise its own cap, write a
// human decision or hide spend. A step that runs code (tests, `yarn node`) is not stopped by these.
export const RUN_FILES: readonly string[] = [
  '.local/agent-harness/work/.active-run.json',
  '.local/agent-harness/work/*/tool-calls*.log',
  '.local/agent-harness/work/*/run-state.json',
  '.local/agent-harness/work/*/lane.json',
  '.local/agent-harness/work/*/intake-decisions.md',
  '.local/agent-harness/work/*/run-log.md',
  '.local/agent-harness/work/*/issue.json',
  '.local/agent-harness/work/*/snapshots/**',
  '.local/agent-harness/work/*/usage/**',
];

export interface Permissions {
  readonly mode: typeof PERMISSION_MODE;
  readonly allow: readonly string[];
  readonly deny: readonly string[];
}

// The agent definition of one stage, as `--agents` reads it.
export interface AgentDefinition {
  readonly description: string;
  readonly prompt: string;
  readonly tools: readonly string[];
  readonly model: string;
  readonly effort: Effort;
  readonly maxTurns: number;
}

export type AgentsFile = Readonly<Record<string, AgentDefinition>>;

export interface PromptOptions {
  readonly issue: string;
  readonly brief: string;
}

export interface SessionOptions extends PromptOptions {
  readonly agentsPath: string;
  readonly sessionId?: string | null;
  readonly newSessionId?: string | null;
  readonly budgetUsd?: number | null;
  readonly sandboxesDir?: string | null;
}

export const permissionsOf = (
  step: Pick<Step, 'tools' | 'writes'>
): Permissions => {
  const can = (capability: Capability): boolean =>
    step.tools.includes(capability);
  const bash = (pattern: string): string => `Bash(${pattern})`;
  const files =
    step.writes === 'branch' ? './**' : '.local/agent-harness/work/**';
  const allow = [
    'Read',
    ...(can('write') || can('edit')
      ? [`Write(${files})`, `Edit(${files})`]
      : []),
    ...(can('shell') ? BASH_WORK.map(bash) : []),
    ...(can('shell') && step.writes !== 'work-dir'
      ? [...BASH_CHECKS, ...BASH_CLEAN].map(bash)
      : []),
    ...(can('shell') && step.writes === 'fixups' ? BASH_FIXUPS.map(bash) : []),
    ...(can('shell') && step.writes === 'branch' ? BASH_COMMITS.map(bash) : []),
    ...(can('delegate') ? ['Agent'] : []),
  ];
  const deny = [
    ...RUN_FILES,
    ...(step.writes === 'branch' ? NEVER_EDIT : []),
  ].flatMap((path) => [`Edit(${path})`, `Write(${path})`]);
  return { mode: PERMISSION_MODE, allow, deny };
};

// Floored to the cent: rounding up would pass a cap above what is left.
const centsDown = (usd: number): string =>
  (Math.floor(Number((usd * 100).toFixed(6))) / 100).toFixed(2);

export const agentName = (step: Pick<Step, 'stage'>): string =>
  `ds-stage-${step.stage}`;

export const toolsOf = (step: Pick<Step, 'tools'>): string[] => [
  ...new Set(step.tools.flatMap((capability) => TOOLS[capability])),
];

const agentPromptOf = (step: Step): string => {
  const preloads = step.preload.map((name) => `\`${name}\``).join(', ');
  return [
    `You are DT-DDS pipeline stage \`${step.stage}\`, started by run.mts. Follow the`,
    `\`${step.skill}\` skill for the issue in your brief; the brief is your whole task.`,
    `The prompt's \`/${step.skill}\` command loaded that skill.`,
    preloads
      ? `When it refers to ${preloads}, read \`.agents/skills/<name>/SKILL.md\` then, not before.`
      : '',
    'What you may write is in the brief (it differs between the parts of one stage).',
    'Local only (AGENTS.md → Trial mode). One simple command per Bash call: a loop, a `;` chain or a',
    'command outside your permissions is denied as a whole; a denied compound command may be re-run as',
    'simple allowed commands, and a simple command that is denied stays denied (name it in gate-summary.md).',
    'Before you report, write `.local/agent-harness/work/<N>/gate-summary.md`:',
    'at most 10 lines for the human at the gate (verdict, what changed or was found, open questions,',
    'the decision needed). run.mts shows only that file; it never reads your full artifact. A question for',
    'the human goes there too, and the status stays `PASS`.',
    'Report ONLY a status line and the path of the artifact the brief names. Status: `PASS` (done; only this',
    'can be approved), `PARTIAL: <what is left>` (turn limit, budget) or `BLOCKER: <reason>` (a failed check,',
    'an unpassed verdict, a criterion that does not hold).',
  ]
    .filter(Boolean)
    .join('\n');
};

const definitionOf = (step: Step): AgentDefinition => ({
  description: `DT-DDS pipeline stage ${step.stage}, started only by run.mts; not for interactive use.`,
  prompt: agentPromptOf(step),
  tools: toolsOf(step),
  model: MODELS[step.tier],
  effort: step.effort,
  maxTurns: step.maxTurns,
});

// One agent per stage of the lane. Two steps of one stage (Lane 0's plan and apply parts) share it,
// so their tools, skills and prompt must agree; maxTurns and the session flags stay per step.
export const agentsFile = (steps: readonly Step[]): AgentsFile =>
  steps.reduce<AgentsFile>((agents, step) => {
    const name = agentName(step);
    const definition = definitionOf(step);
    const existing = agents[name];
    if (!existing) return { ...agents, [name]: definition };
    const shared = omit(definition, 'maxTurns');
    const kept = omit(existing, 'maxTurns');
    if (JSON.stringify(shared) !== JSON.stringify(kept)) {
      throw new Error(
        `steps of stage ${step.stage} disagree on its agent definition`
      );
    }
    return {
      ...agents,
      [name]: {
        ...existing,
        maxTurns: Math.max(existing.maxTurns, definition.maxTurns),
      },
    };
  }, {});

// The prompt: a new session starts with the stage skill's command (`/ds-express 123 plan`); a resumed
// one already holds the skill, so it gets the brief alone.
export const promptOf = (
  step: Pick<Step, 'resume' | 'skill' | 'part'>,
  { issue, brief }: PromptOptions
): string =>
  step.resume
    ? brief
    : `/${step.skill} ${[issue, step.part]
        .filter(Boolean)
        .join(' ')}\n\n${brief}`;

// Prompt and flags for one step's session, after `claude -p --output-format json` (run-stage.mts
// adds those).
// `sandboxesDir`: where sandbox.mts puts throwaway clones; steps that run checks may work there
// (`--add-dir`: rule-matched commands run there).
// `newSessionId`: the id a new session takes (`--session-id`), so run.mts can read its transcript while
// it runs and record it when it is interrupted; a resumed session keeps its own.
export const sessionArgs = (
  step: Step,
  {
    issue,
    brief,
    agentsPath,
    sessionId = null,
    newSessionId = null,
    budgetUsd = null,
    sandboxesDir = null,
  }: SessionOptions
): string[] => {
  if (step.resume && !sessionId) {
    throw new Error(
      `step ${step.id} resumes a session, but there is no session id`
    );
  }
  const permissions = permissionsOf(step);
  return [
    promptOf(step, { issue, brief }),
    '--settings',
    SETTINGS_PATH,
    '--agents',
    agentsPath,
    '--agent',
    agentName(step),
    '--model',
    MODELS[step.tier],
    '--effort',
    step.effort,
    '--max-turns',
    String(step.maxTurns),
    ...(step.resume && sessionId
      ? ['--resume', sessionId]
      : newSessionId
      ? ['--session-id', newSessionId]
      : []),
    '--permission-mode',
    permissions.mode,
    '--allowedTools',
    permissions.allow.join(','),
    ...(permissions.deny.length
      ? ['--disallowedTools', permissions.deny.join(',')]
      : []),
    ...(sandboxesDir &&
    step.tools.includes('shell') &&
    step.writes !== 'work-dir'
      ? ['--add-dir', sandboxesDir]
      : []),
    ...(budgetUsd === null ? [] : ['--max-budget-usd', centsDown(budgetUsd)]),
  ];
};
