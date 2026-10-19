// The command-line options, the run list they select, and the `claude -p` arguments of a run
// (testing.md → Running). Pure.

import {
  KINDS,
  defaultRepeats,
  isKind,
  type Case,
  type Kind,
} from './cases.mts';

// One session to run: a case and its attempt number (1-based).
export interface Run {
  readonly kase: Case;
  readonly attempt: number;
}

export interface RunFilter {
  readonly cases: readonly Case[];
  readonly repeat?: number | undefined;
  readonly kinds?: readonly Kind[];
  readonly ids?: readonly string[];
}

export interface Options {
  readonly ids: readonly string[];
  readonly kinds: readonly Kind[];
  readonly repeat: number | undefined;
  readonly model: string | undefined;
  readonly budgetUsd: number;
  readonly list: boolean;
  readonly keep: boolean;
  readonly setupOnly: boolean;
}

export const expandRuns = ({
  cases,
  repeat,
  kinds = [],
  ids = [],
}: RunFilter): Run[] =>
  cases
    .filter(
      ({ id, kind }) =>
        (ids.length === 0 || ids.includes(id)) &&
        (kinds.length === 0 || kinds.includes(kind))
    )
    .flatMap((kase) =>
      Array.from({ length: repeat ?? defaultRepeats(kase) }, (_, index) => ({
        kase,
        attempt: index + 1,
      }))
    );

// What `--list` prints: one line per run, then the count.
export const listRuns = (runs: readonly Run[]): string[] => [
  ...runs.map(
    ({ kase, attempt }) =>
      `${kase.id.padEnd(20)} ${kase.kind.padEnd(8)} #${attempt}  ${kase.outcomes
        .join(',')
        .padEnd(8)} ${kase.prompt.slice(0, 90)}`
  ),
  `${runs.length} runs`,
];

const DEFAULT_OPTIONS: Options = {
  ids: [],
  kinds: [],
  repeat: undefined,
  model: undefined,
  budgetUsd: 1,
  list: false,
  keep: false,
  setupOnly: false,
};

const positiveNumber = (
  name: string,
  raw: string,
  parse: (raw: string) => number
): number => {
  const value = parse(raw);
  if (!(value > 0)) {
    throw new Error(`${name} needs a positive number, got ${raw}`);
  }
  return value;
};

type ValueOption = (options: Options, value: string) => Options;

const VALUE_OPTIONS: Readonly<Record<string, ValueOption>> = {
  '--case': (options, value) => ({ ...options, ids: [...options.ids, value] }),
  '--kind': (options, value) => {
    if (!isKind(value)) {
      throw new Error(`unknown kind ${value} (${KINDS.join(', ')})`);
    }
    return { ...options, kinds: [...options.kinds, value] };
  },
  '--repeat': (options, value) => ({
    ...options,
    repeat: positiveNumber('--repeat', value, (raw) =>
      Number.parseInt(raw, 10)
    ),
  }),
  '--model': (options, value) => ({ ...options, model: value }),
  '--budget-usd': (options, value) => ({
    ...options,
    budgetUsd: positiveNumber('--budget-usd', value, Number),
  }),
};

type FlagOption = 'list' | 'keep' | 'setupOnly';

const FLAG_OPTIONS: Readonly<Record<string, FlagOption>> = {
  '--list': 'list',
  '--keep': 'keep',
  '--setup-only': 'setupOnly',
};

function lookup<T>(
  table: Readonly<Record<string, T>>,
  key: string
): T | undefined {
  return Object.hasOwn(table, key) ? table[key] : undefined;
}

export const parseArgs = (argv: readonly string[]): Options => {
  const step = (options: Options, index: number): Options => {
    const arg = argv[index];
    if (arg === undefined) return options;
    const flag = lookup(FLAG_OPTIONS, arg);
    if (flag) return step({ ...options, [flag]: true }, index + 1);
    const option = lookup(VALUE_OPTIONS, arg);
    if (!option) throw new Error(`unknown option ${arg}`);
    const value = argv[index + 1];
    if (value === undefined) throw new Error(`${arg} needs a value`);
    return step(option(options, value), index + 2);
  };
  return step(DEFAULT_OPTIONS, 0);
};

// The `claude -p` arguments for one case; the session runs in the clone. bypassPermissions (testing.md
// → Design decisions, 1): the hooks are the only barrier, and anything that would prompt is denied.
export const agentArgs = (
  kase: Case,
  options: Options,
  mcpConfig: string
): string[] => [
  '-p',
  kase.prompt,
  '--output-format',
  'stream-json',
  '--verbose',
  '--permission-mode',
  'bypassPermissions',
  '--permission-prompts',
  'none',
  '--setting-sources',
  'project',
  '--strict-mcp-config',
  '--mcp-config',
  mcpConfig,
  '--no-session-persistence',
  '--max-budget-usd',
  String(options.budgetUsd),
  ...(options.model ? ['--model', options.model] : []),
];
