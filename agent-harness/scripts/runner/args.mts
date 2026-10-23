// The command line of run.mts: its options, checked. Pure: `cwd` resolves --root.

import { resolve } from 'node:path';

import { LANES, type LaneId } from './stage-table.mts';

export const USAGE =
  'usage: node agent-harness/scripts/run.mts <N> [--dry] [--fresh] [--no-wait | --decide <reply>] [--lane 0|1|2|escalate] [--issue-file <path>] [--harness claude] [--budget-usd <usd>] [--tool-calls <n>] [--record-out <path>] [--root <repo>] | <N> --close [--root <repo>]';

export interface RunOptions {
  readonly id: string;
  readonly root: string;
  readonly dry: boolean;
  readonly fresh: boolean;
  readonly noWait: boolean;
  readonly close: boolean;
  readonly decide: string | null;
  readonly lane: LaneId | null;
  readonly issueFile: string | null;
  readonly harness: string;
  readonly budgetUsd: number | null;
  readonly toolCalls: number | null;
  readonly recordOut: string | null;
}

export type ParsedArgs = RunOptions | { readonly error: string };

const SWITCHES = {
  '--dry': 'dry',
  '--fresh': 'fresh',
  '--no-wait': 'noWait',
  '--close': 'close',
} as const;
type SwitchFlag = keyof typeof SWITCHES;
type Switch = (typeof SWITCHES)[SwitchFlag];

const VALUE_FLAGS = [
  '--lane',
  '--issue-file',
  '--harness',
  '--budget-usd',
  '--tool-calls',
  '--record-out',
  '--root',
  '--decide',
] as const;
type ValueFlag = (typeof VALUE_FLAGS)[number];

const isSwitchFlag = (arg: string): arg is SwitchFlag =>
  Object.hasOwn(SWITCHES, arg);
const isValueFlag = (arg: string): arg is ValueFlag =>
  VALUE_FLAGS.some((flag) => flag === arg);

// The flag a combination refuses, named as the human typed it.
const SWITCH_NAMES: Readonly<Record<Switch, string>> = {
  dry: '--dry',
  fresh: '--fresh',
  noWait: '--no-wait or --decide',
  close: '--close',
};

export const parseArgs = (argv: readonly string[], cwd: string): ParsedArgs => {
  const switches = new Set<Switch>();
  const values = new Map<ValueFlag, string>();
  const positional: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? '';
    if (isSwitchFlag(arg)) switches.add(SWITCHES[arg]);
    else if (isValueFlag(arg)) {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        return { error: `${arg} needs a value\n${USAGE}` };
      }
      values.set(arg, value);
      index += 1;
    } else if (arg.startsWith('--')) {
      return { error: `unknown flag ${arg}\n${USAGE}` };
    } else positional.push(arg);
  }
  const [id] = positional;
  if (
    positional.length !== 1 ||
    id === undefined ||
    !/^(?:\d+|[a-z][a-z0-9-]*)$/.test(id)
  ) {
    return { error: USAGE };
  }
  const laneText = values.get('--lane');
  const lane = LANES.find((known) => known === laneText) ?? null;
  if (laneText !== undefined && lane === null) {
    return { error: '--lane must be 0, 1, 2 or escalate' };
  }
  const budgetText = values.get('--budget-usd');
  const budgetUsd = budgetText === undefined ? null : Number(budgetText);
  if (budgetUsd !== null && !(budgetUsd > 0)) {
    return { error: '--budget-usd must be a positive number' };
  }
  const toolCallsText = values.get('--tool-calls');
  const toolCalls = toolCallsText === undefined ? null : Number(toolCallsText);
  if (toolCalls !== null && (!Number.isInteger(toolCalls) || toolCalls < 1)) {
    return { error: '--tool-calls must be a positive integer' };
  }
  const decide = values.get('--decide') ?? null;
  // A reply answers a gate the human has seen: never a dry run's, never one --fresh just moved aside.
  const decideClash = (['dry', 'fresh'] as const).find((name) =>
    switches.has(name)
  );
  if (decide !== null && decideClash) {
    return {
      error: `--decide cannot be combined with ${SWITCH_NAMES[decideClash]}`,
    };
  }
  const noWait = switches.has('noWait') || decide !== null;
  const closeClash = (['dry', 'fresh', 'noWait'] as const).find((name) =>
    name === 'noWait' ? noWait : switches.has(name)
  );
  if (switches.has('close') && closeClash) {
    return {
      error: `--close cannot be combined with ${SWITCH_NAMES[closeClash]}`,
    };
  }
  return {
    id,
    root: resolve(cwd, values.get('--root') ?? '.'),
    dry: switches.has('dry'),
    fresh: switches.has('fresh'),
    noWait,
    close: switches.has('close'),
    decide,
    lane,
    issueFile: values.get('--issue-file') ?? null,
    harness: values.get('--harness') ?? 'claude',
    budgetUsd,
    toolCalls,
    recordOut: values.get('--record-out') ?? null,
  };
};
