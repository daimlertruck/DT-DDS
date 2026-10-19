// Checks a work dir's run log against the stage sessions' saved JSON results: read through the same
// parser as record-run.mts, the Dispatches rows must hold, per model, the tokens by type that the
// results' modelUsage holds (a resumed session's result less its earlier ones); the main rows'
// requests must equal num_turns; and the predicted and reported costs must equal total_cost_usd.
// Each within the tolerance (default 1%).
// Usage: node agent-harness/scripts/records/reconcile-usage.mts <id> [--tolerance 0.01] [--root <repo>]
// Exit 0 reconciled · 1 a difference above the tolerance, an unpriced model, an unreadable result, or
// nothing to reconcile · 2 usage. Read-only.

import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  WORK_DIR,
  dispatchesOf,
  tableUnder,
  type Dispatch,
} from './run-records.mts';
import {
  isClaudeResult,
  ownOf,
  previousOf,
  tokensOf,
  type ClaudeResult,
  type Tokens,
} from './usage.mts';

const USAGE =
  'usage: node agent-harness/scripts/records/reconcile-usage.mts <id> [--tolerance 0.01] [--root <repo>]';
const ID = /^(?:\d+|PR-\d+|[a-z][a-z0-9-]*)$/;
const VALUE_FLAGS: readonly string[] = ['--root', '--tolerance'];
const TOKEN_METRICS = [
  'uncachedIn',
  'cacheWrite',
  'cacheRead',
  'output',
] as const;
const NO_TOKENS: Tokens = {
  uncachedIn: 0,
  cacheWrite: 0,
  cacheRead: 0,
  output: 0,
};

// One compared figure: the run log's against the saved results'.
export interface Check {
  readonly metric: string;
  readonly model: string;
  readonly logged: number | null;
  readonly reported: number | null;
  readonly ok: boolean;
}

export interface Reconciliation {
  readonly checks: readonly Check[];
  readonly problems: readonly string[];
}

// Each result's own part: a resumed session's result also reports its earlier invocations.
export const ownResultsOf = (saved: readonly ClaudeResult[]): ClaudeResult[] =>
  saved.map((result, index) =>
    ownOf(result, previousOf(saved.slice(0, index), result))
  );

const sum = (values: readonly (number | null | undefined)[]): number =>
  values.reduce<number>((total, value) => total + (value ?? 0), 0);

const addTokens = (a: Tokens, b: Tokens): Tokens => ({
  uncachedIn: a.uncachedIn + b.uncachedIn,
  cacheWrite: a.cacheWrite + b.cacheWrite,
  cacheRead: a.cacheRead + b.cacheRead,
  output: a.output + b.output,
});

const tokensByModel = (
  results: readonly ClaudeResult[]
): ReadonlyMap<string, Tokens> => {
  const totals = new Map<string, Tokens>();
  results.forEach(({ modelUsage = {} }) =>
    Object.entries(modelUsage).forEach(([model, entry]) =>
      totals.set(
        model,
        addTokens(totals.get(model) ?? NO_TOKENS, tokensOf(entry))
      )
    )
  );
  return totals;
};

export const reconcile = (
  rows: readonly Dispatch[],
  results: readonly ClaudeResult[],
  tolerance: number
): Reconciliation => {
  const differs = (logged: number | null, reported: number | null): boolean =>
    logged === null ||
    reported === null ||
    Math.abs(logged - reported) >
      tolerance * Math.max(Math.abs(reported), Number.EPSILON);
  const check = (
    metric: string,
    model: string,
    logged: number | null,
    reported: number | null
  ): Check => ({
    metric,
    model,
    logged,
    reported,
    ok: !differs(logged, reported),
  });

  const fromResults = tokensByModel(results);
  const models = [
    ...new Set([
      ...fromResults.keys(),
      ...rows.flatMap(({ model }) => (model ? [model] : [])),
    ]),
  ].sort();
  const byModel = models.map((model) => {
    const logged = rows.filter((row) => row.model === model);
    return {
      checks: TOKEN_METRICS.map((metric) =>
        check(
          metric,
          model,
          logged.length ? sum(logged.map((row) => row[metric])) : null,
          fromResults.get(model)?.[metric] ?? null
        )
      ),
      problems: logged.some(({ predictedUsd }) => predictedUsd === null)
        ? [`${model} has no price in prices.json`]
        : [],
    };
  });
  const totalCost = sum(results.map(({ total_cost_usd: cost }) => cost));
  return {
    checks: [
      ...byModel.flatMap(({ checks }) => checks),
      check(
        'requests',
        'main loop',
        sum(rows.map(({ requests }) => requests)),
        sum(results.map(({ num_turns: turns }) => turns))
      ),
      check(
        'dispatches',
        'all',
        new Set(rows.map(({ dispatch }) => dispatch)).size,
        results.length
      ),
      check(
        'predicted_usd',
        'all',
        sum(rows.map(({ predictedUsd }) => predictedUsd)),
        totalCost
      ),
      check(
        'reported_usd',
        'all',
        sum(rows.map(({ reportedUsd }) => reportedUsd)),
        totalCost
      ),
    ],
    problems: byModel.flatMap(({ problems }) => problems),
  };
};

const show = (value: number | null): string =>
  value === null
    ? '—'
    : Number.isInteger(value)
    ? String(value)
    : value.toFixed(6);

export interface Report {
  readonly lines: readonly string[];
  readonly exitCode: 0 | 1;
}

// What reconcile-usage prints for a work dir, and its exit code.
export const reportOf = (
  id: string,
  rows: readonly Dispatch[],
  results: readonly ClaudeResult[],
  tolerance: number,
  unreadable: readonly string[]
): Report => {
  const { checks, problems: unpriced } = reconcile(rows, results, tolerance);
  const problems = [...unreadable, ...unpriced];
  const failed = checks.filter(({ ok }) => !ok).length + problems.length;
  return {
    lines: [
      `reconcile ${WORK_DIR}/${id}: ${
        new Set(rows.map(({ dispatch }) => dispatch)).size
      } dispatch(es) in the run log, ${
        results.length
      } saved result(s), tolerance ${tolerance * 100}%`,
      '| metric | model | run log | JSON | ok |',
      '|---|---|---|---|---|',
      ...checks.map(
        ({ metric, model, logged, reported, ok }) =>
          `| ${metric} | ${model} | ${show(logged)} | ${show(reported)} | ${
            ok ? 'yes' : 'NO'
          } |`
      ),
      ...problems.map((problem) => `problem: ${problem}`),
      failed ? `NOT reconciled: ${failed} problem(s)` : 'reconciled',
    ],
    exitCode: failed ? 1 : 0,
  };
};

const readResult = (path: string): ClaudeResult | null => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
    return isClaudeResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const main = (args: readonly string[]): void => {
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const stop = (code: number, message: string): never => {
    process.stderr.write(`reconcile-usage: ${message}\n`);
    process.exit(code);
  };
  const valueOf = (flag: string): string | undefined =>
    args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;

  const root = resolve(valueOf('--root') ?? process.cwd());
  const tolerance = Number(valueOf('--tolerance') ?? 0.01);
  const positional = args.filter(
    (arg, index) =>
      !arg.startsWith('--') && !VALUE_FLAGS.includes(args[index - 1] ?? '')
  );
  const [id] = positional;
  if (
    positional.length !== 1 ||
    id === undefined ||
    !ID.test(id) ||
    !(tolerance >= 0)
  ) {
    return stop(2, USAGE);
  }

  const workDir = join(root, WORK_DIR, id);
  const runLogPath = join(workDir, 'run-log.md');
  const usageDir = join(workDir, 'usage');
  if (!existsSync(runLogPath)) {
    stop(1, `no run log at ${WORK_DIR}/${id}/run-log.md`);
  }

  const rows = dispatchesOf(
    tableUnder(readFileSync(runLogPath, 'utf8'), 'dispatches')
  );
  const resultFiles = existsSync(usageDir)
    ? readdirSync(usageDir)
        .filter((name) => name.endsWith('.json'))
        .sort()
    : [];
  const read = resultFiles.map((name) => ({
    name,
    result: readResult(join(usageDir, name)),
  }));
  const unreadable = read.flatMap(({ name, result }) =>
    result ? [] : [`usage/${name} is not a JSON result`]
  );
  const results = ownResultsOf(
    read.flatMap(({ result }) => (result ? [result] : []))
  );
  if (!rows.length && !results.length) {
    stop(1, 'nothing to reconcile: no Dispatches rows and no saved results');
  }

  const { lines, exitCode } = reportOf(
    id,
    rows,
    results,
    tolerance,
    unreadable
  );
  lines.forEach(say);
  process.exit(exitCode);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main(process.argv.slice(2));
}
