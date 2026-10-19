// The harness-neutral stage table (agent-harness/config/stages.json): loads and checks it, and resolves a
// lane into the steps run.mts walks. A step is a stage with the lane's overrides applied. Nothing here
// knows a harness; adapters (agent-harness/scripts/runner/adapters/<harness>.mts) turn a step into a session.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { isRecord } from '../lib/json.mts';

export const STAGES_PATH = 'agent-harness/config/stages.json';
export const TIERS = ['haiku', 'sonnet', 'opus'] as const;
export const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'] as const;
export const CAPABILITIES = [
  'read',
  'search',
  'shell',
  'write',
  'edit',
  'delegate',
] as const;
export const WRITES = ['work-dir', 'fixups', 'branch'] as const;
// G1+G3: Lane 0's combined intake and plan gate (one session plans the exact diff).
export const GATES = [
  'G1',
  'G2',
  'G3',
  'G1+G3',
  'G4',
  'G5',
  'G6',
  'G7',
] as const;
export const LANES = ['0', '1', '2', 'escalate'] as const;
export const AUTOSQUASH = ['before', 'after'] as const;

export type Tier = (typeof TIERS)[number];
export type Effort = (typeof EFFORTS)[number];
export type Capability = (typeof CAPABILITIES)[number];
export type Writes = (typeof WRITES)[number];
export type Gate = (typeof GATES)[number];
export type LaneId = (typeof LANES)[number];
export type Autosquash = (typeof AUTOSQUASH)[number];

// Fields a lane step may override; everything else comes from the stage.
export interface StageOverrides {
  readonly tier?: Tier;
  readonly effort?: Effort;
  readonly maxTurns?: number;
  readonly maxToolCalls?: number;
  readonly preload?: readonly string[];
  readonly writes?: Writes;
  readonly health?: boolean;
  readonly artifact?: string;
}

const OVERRIDABLE = [
  'tier',
  'effort',
  'maxTurns',
  'maxToolCalls',
  'preload',
  'writes',
  'health',
  'artifact',
] as const satisfies readonly (keyof StageOverrides)[];

export interface Stage {
  readonly number?: number;
  readonly skill: string;
  readonly preload?: readonly string[];
  readonly artifact: string;
  readonly tier: Tier;
  readonly effort: Effort;
  readonly maxTurns: number;
  readonly maxToolCalls: number;
  readonly tools: readonly Capability[];
  readonly writes: Writes;
  readonly health?: boolean;
  readonly failLoopsTo?: string;
}

// A step as a lane lists it.
export interface LaneStep extends StageOverrides {
  readonly stage: string;
  readonly part?: string;
  readonly gate: Gate;
  readonly brief?: string;
  readonly resume?: boolean;
  readonly autosquash?: Autosquash;
}

export interface Lane {
  readonly name: string;
  readonly maxUsd: number;
  readonly steps: readonly LaneStep[];
}

export interface HealthCheck {
  readonly name: string;
  readonly about?: string;
  readonly run: readonly [string, ...string[]];
}

export interface StageTable {
  readonly schema: 1;
  readonly lowConfidence: number;
  readonly healthChecks: readonly HealthCheck[];
  readonly stages: Readonly<Record<string, Stage>>;
  readonly lanes: Readonly<Record<LaneId, Lane>>;
}

// A stage with a lane step's overrides applied: what an adapter turns into a session.
export interface Step extends Omit<Stage, 'preload' | 'health'> {
  readonly preload: readonly string[];
  readonly health: boolean;
  readonly id: string;
  readonly stage: string;
  readonly part: string | null;
  readonly gate: Gate;
  readonly brief: string;
  readonly resume: boolean;
  readonly autosquash: Autosquash | null;
}

// A lane with its tool calls per pass.
export interface LaneCaps extends Lane {
  readonly maxToolCalls: number;
}

// --- checks ----------------------------------------------------------------------------------

const fail: (message: string) => never = (message) => {
  throw new Error(`${STAGES_PATH}: ${message}`);
};

const isOneOf = <T extends string>(
  values: readonly T[],
  value: unknown
): value is T => values.some((known) => known === value);

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 1;

const isString = (value: unknown): value is string => typeof value === 'string';

const isStringList = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every((item: unknown) => isString(item));

const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

const isFileName = (value: unknown): value is string =>
  isString(value) && /^[a-z0-9.-]+$/.test(value);

const isKebab = (value: unknown): value is string =>
  isString(value) && /^[a-z][a-z0-9-]*$/.test(value);

// An optional field: absent, or valid; anything else fails with `message`.
function optional<T>(
  value: unknown,
  check: (value: unknown) => value is T,
  message: string
): T | undefined {
  return value === undefined ? undefined : check(value) ? value : fail(message);
}

function required<T>(
  value: unknown,
  check: (value: unknown) => value is T,
  message: string
): T {
  return check(value) ? value : fail(message);
}

const stageFrom = (name: string, value: unknown): Stage => {
  if (!isKebab(name)) {
    fail(`stage name ${JSON.stringify(name)} is not lowercase-kebab`);
  }
  const stage = isRecord(value) ? value : {};
  const skill = required(
    stage.skill,
    (skill): skill is string =>
      isString(skill) && /^ds-[a-z0-9-]+$/.test(skill),
    `${name}: skill must be a ds-* skill`
  );
  const tier = required(
    stage.tier,
    (tier) => isOneOf(TIERS, tier),
    `${name}: tier must be one of ${TIERS.join(', ')}`
  );
  const effort = required(
    stage.effort,
    (effort) => isOneOf(EFFORTS, effort),
    `${name}: effort must be one of ${EFFORTS.join(', ')}`
  );
  const maxTurns = required(
    stage.maxTurns,
    isPositiveInteger,
    `${name}: maxTurns must be a positive integer`
  );
  const maxToolCalls = required(
    stage.maxToolCalls,
    isPositiveInteger,
    `${name}: maxToolCalls must be a positive integer`
  );
  const tools = required(
    stage.tools,
    (tools): tools is readonly Capability[] =>
      Array.isArray(tools) &&
      tools.length > 0 &&
      tools.every((tool: unknown) => isOneOf(CAPABILITIES, tool)),
    `${name}: tools must name capabilities (${CAPABILITIES.join(', ')})`
  );
  const writes = required(
    stage.writes,
    (writes) => isOneOf(WRITES, writes),
    `${name}: writes must be one of ${WRITES.join(', ')}`
  );
  const artifact = required(
    stage.artifact,
    isFileName,
    `${name}: artifact must be a file name`
  );
  return {
    number: optional(
      stage.number,
      (number): number is number =>
        typeof number === 'number' && Number.isInteger(number),
      `${name}: number must be an integer`
    ),
    skill,
    preload: optional(
      stage.preload,
      isStringList,
      `${name}: preload must be a list of skill names`
    ),
    artifact,
    tier,
    effort,
    maxTurns,
    maxToolCalls,
    tools,
    writes,
    health: optional(
      stage.health,
      isBoolean,
      `${name}: health must be true or false`
    ),
    failLoopsTo: optional(
      stage.failLoopsTo,
      isString,
      `${name}: failLoopsTo must name a stage`
    ),
  };
};

const STEP_FIELDS: readonly string[] = [
  'stage',
  'part',
  'gate',
  'brief',
  'resume',
  'autosquash',
  ...OVERRIDABLE,
];

const stepFrom = (
  lane: LaneId,
  value: unknown,
  index: number,
  stages: Readonly<Record<string, Stage>>
): LaneStep => {
  const where = `lane ${lane} step ${index + 1}`;
  const step = isRecord(value) ? value : {};
  const stage = required(
    step.stage,
    (stage): stage is string => isString(stage) && Object.hasOwn(stages, stage),
    `${where}: unknown stage ${JSON.stringify(step.stage)}`
  );
  const gate = required(
    step.gate,
    (gate) => isOneOf(GATES, gate),
    `${where}: gate must be one of ${GATES.join(', ')}`
  );
  const unknown = Object.keys(step).filter((key) => !STEP_FIELDS.includes(key));
  if (unknown.length) fail(`${where}: unknown field(s) ${unknown.join(', ')}`);
  if (step.resume && index === 0) {
    fail(`${where}: the first step cannot resume a session`);
  }
  const maxToolCalls = optional(
    step.maxToolCalls,
    isPositiveInteger,
    `${where}: maxToolCalls must be a positive integer`
  );
  const autosquash = optional(
    step.autosquash,
    (autosquash) => isOneOf(AUTOSQUASH, autosquash),
    `${where}: autosquash must be before or after`
  );
  return {
    stage,
    part: optional(step.part, isString, `${where}: part must be a string`),
    gate,
    brief: optional(step.brief, isString, `${where}: brief must be a string`),
    resume: optional(
      step.resume,
      isBoolean,
      `${where}: resume must be true or false`
    ),
    autosquash,
    maxToolCalls,
    tier: optional(
      step.tier,
      (tier) => isOneOf(TIERS, tier),
      `${where}: tier must be one of ${TIERS.join(', ')}`
    ),
    effort: optional(
      step.effort,
      (effort) => isOneOf(EFFORTS, effort),
      `${where}: effort must be one of ${EFFORTS.join(', ')}`
    ),
    maxTurns: optional(
      step.maxTurns,
      isPositiveInteger,
      `${where}: maxTurns must be a positive integer`
    ),
    preload: optional(
      step.preload,
      isStringList,
      `${where}: preload must be a list of skill names`
    ),
    writes: optional(
      step.writes,
      (writes) => isOneOf(WRITES, writes),
      `${where}: writes must be one of ${WRITES.join(', ')}`
    ),
    health: optional(
      step.health,
      isBoolean,
      `${where}: health must be true or false`
    ),
    artifact: optional(
      step.artifact,
      isFileName,
      `${where}: artifact must be a file name`
    ),
  };
};

const laneFrom = (
  lane: LaneId,
  value: unknown,
  stages: Readonly<Record<string, Stage>>
): Lane => {
  if (!value) fail(`lane ${lane} is missing`);
  const entry = isRecord(value) ? value : {};
  const maxUsd = required(
    entry.maxUsd,
    (maxUsd): maxUsd is number => typeof maxUsd === 'number' && maxUsd > 0,
    `lane ${lane}: maxUsd must be a positive number`
  );
  const rawSteps = required(
    entry.steps,
    (steps): steps is readonly unknown[] => Array.isArray(steps),
    `lane ${lane}: steps must be a list`
  );
  const steps = rawSteps.map((step, index) =>
    stepFrom(lane, step, index, stages)
  );
  const ids = steps.map(stepId);
  if (new Set(ids).size !== ids.length) {
    fail(
      `lane ${lane}: two steps share the id ${ids.find(
        (id, i) => ids.indexOf(id) !== i
      )}`
    );
  }
  const name = required(
    entry.name,
    isString,
    `lane ${lane}: name must be a string`
  );
  return { name, maxUsd, steps };
};

const healthCheckFrom = (value: unknown, index: number): HealthCheck => {
  const check = isRecord(value) ? value : {};
  const { name, run } = check;
  const [command, ...args] = isStringList(run) ? run : [];
  if (!isKebab(name) || command === undefined) {
    return fail(
      `healthChecks[${index}] needs a kebab-case name and a non-empty run list`
    );
  }
  return {
    name,
    about: optional(
      check.about,
      isString,
      `healthChecks[${index}]: about must be a string`
    ),
    run: [command, ...args],
  };
};

// The table as read from stages.json, checked; throws on the first problem, naming it.
export const checkTable = (value: unknown): StageTable => {
  const table = isRecord(value) ? value : {};
  if (table.schema !== 1) fail('schema must be 1');
  const lowConfidence = required(
    table.lowConfidence,
    (number): number is number => typeof number === 'number',
    'lowConfidence must be a number'
  );
  const healthChecks = required(
    table.healthChecks ?? [],
    (checks): checks is readonly unknown[] => Array.isArray(checks),
    'healthChecks must be a list'
  ).map(healthCheckFrom);
  const stages = Object.fromEntries(
    Object.entries(
      required(
        table.stages ?? {},
        isRecord,
        'stages must map stage names to stages'
      )
    ).map(([name, stage]) => [name, stageFrom(name, stage)])
  );
  const lanes = required(
    table.lanes ?? {},
    isRecord,
    'lanes must map lane ids to lanes'
  );
  const laneIn = (lane: LaneId): Lane => laneFrom(lane, lanes[lane], stages);
  const checked = {
    '0': laneIn('0'),
    '1': laneIn('1'),
    '2': laneIn('2'),
    escalate: laneIn('escalate'),
  };
  const unknownLanes = Object.keys(lanes).filter(
    (lane) => !isOneOf(LANES, lane)
  );
  if (unknownLanes.length) {
    const known = LANES.join(', ');
    fail(`unknown lane(s) ${unknownLanes.join(', ')}: lanes are ${known}`);
  }
  return { schema: 1, lowConfidence, healthChecks, stages, lanes: checked };
};

export const loadTable = (root: string): StageTable =>
  checkTable(JSON.parse(readFileSync(join(root, STAGES_PATH), 'utf8')));

// `express:plan`, `implement`: unique within a lane, the key for resuming and for loop targets.
export const stepId = (step: Pick<LaneStep, 'stage' | 'part'>): string =>
  step.part ? `${step.stage}:${step.part}` : step.stage;

const laneEntry = (table: StageTable, lane: string | number): Lane => {
  const key = String(lane);
  return isOneOf(LANES, key)
    ? table.lanes[key]
    : fail(`no lane ${JSON.stringify(lane)}`);
};

// A lane with its tool calls per pass: the sum of its steps' caps (budget-guard caps each session).
export const laneOf = (table: StageTable, lane: string | number): LaneCaps => ({
  ...laneEntry(table, lane),
  maxToolCalls: stepsOf(table, lane).reduce(
    (total, step) => total + step.maxToolCalls,
    0
  ),
});

// The steps of a lane, each a full stage definition with the lane's overrides applied.
export const stepsOf = (table: StageTable, lane: string | number): Step[] =>
  laneEntry(table, lane).steps.map((step) => {
    const stage =
      table.stages[step.stage] ?? fail(`unknown stage ${step.stage}`);
    const preload = [...(stage.preload ?? [])];
    return {
      ...stage,
      tier: step.tier ?? stage.tier,
      effort: step.effort ?? stage.effort,
      maxTurns: step.maxTurns ?? stage.maxTurns,
      maxToolCalls: step.maxToolCalls ?? stage.maxToolCalls,
      preload: step.preload
        ? [...new Set([...preload, ...step.preload])]
        : preload,
      writes: step.writes ?? stage.writes,
      health: step.health ?? Boolean(stage.health),
      artifact: step.artifact ?? stage.artifact,
      id: stepId(step),
      stage: step.stage,
      part: step.part ?? null,
      gate: step.gate,
      brief: step.brief ?? '',
      resume: Boolean(step.resume),
      autosquash: step.autosquash ?? null,
    };
  });
