// Runs one pipeline stage as its own `claude -p` session and records what it consumed (ds-run-pipeline
// → Run log): saves the session's JSON result to .local/agent-harness/work/<id>/usage/ and appends one Dispatches
// row per model to .local/agent-harness/work/<id>/run-log.md, priced from agent-harness/config/prices.json.
// Usage: node agent-harness/scripts/runner/run-stage.mts <id> <stage> [--root <repo>] -- <prompt and claude flags…>
//   <id>:    an issue number, PR-<n>, or a lowercase name for eval runs (dry-run-1)
//   <stage>: lowercase name of the stage (ds-gather-context)
//   run-stage passes `-p --output-format json` first, then everything after `--` unchanged.
// The stage gets this process's environment minus the variables a parent Claude Code session sets
// (session-env.mts), so a stage started from inside a session does not inherit them. It refuses to run
// while CLAUDE_CODE_SUBAGENT_MODEL is set, because that overrides every stage agent's model.
// Interrupts: on SIGINT or SIGTERM run-stage waits for the session, which prints its JSON result with
// every completed request, records it with an `interrupted (<signal>): ` status and keeps the
// session's transcript; a signal that reached run-stage alone is forwarded to the session after a
// short grace. A session that ends without a JSON result is recorded from its transcript when its id
// is known (`--session-id` or `--resume` among the claude flags).
// Exit: claude's exit code · 1 no JSON result, prices or run log unreadable · 2 usage · 130 interrupted

import { spawn, spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { freshSessionEnv } from './session-env.mts';
import {
  WORK_DIR,
  withDispatchRows,
  type TableCells,
} from '../records/run-records.mts';
import {
  configDirOf,
  requestsIn,
  resultOf,
  transcriptsOf,
} from '../records/transcript.mts';
import {
  isClaudeResult,
  loadPrices,
  ownOf,
  previousOf,
  usageRows,
  type ClaudeResult,
  type UsageRow,
} from '../records/usage.mts';

const USAGE =
  'usage: node agent-harness/scripts/runner/run-stage.mts <id> <stage> [--root <repo>] -- <prompt and claude flags…>';
const ID = /^(?:\d+|PR-\d+|[a-z][a-z0-9-]*)$/;
const STAGE = /^[a-z][a-z0-9-]*$/;
const UNKNOWN = '—';
const INTERRUPTED = 130;
// How long a session may take to stop on a signal it got with the job before run-stage forwards it.
const GRACE_MS = 2000;

export interface StageArgs {
  readonly root: string;
  readonly id: string;
  readonly stage: string;
  readonly claudeArgs: readonly string[];
}

// How the `claude` process ended: its exit status or signal, or the error code that kept it from
// starting.
export interface SessionEnd {
  readonly status: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly error: string | null;
}

// What the status line and the summary need: the result priced (the session's own part, or one read
// from its transcript), how the process ended and the signal run-stage got.
export interface Outcome {
  readonly result: ClaudeResult | null;
  readonly fromTranscript: boolean;
  readonly session: SessionEnd;
  readonly signalled: NodeJS.Signals | null;
}

const valueAfter = (args: readonly string[], flag: string): string | null =>
  args.includes(flag) ? args[args.indexOf(flag) + 1] ?? null : null;

export const parseArgs = (
  args: readonly string[],
  cwd: string
): StageArgs | { readonly error: string } => {
  const split = args.indexOf('--');
  const own = split < 0 ? args : args.slice(0, split);
  const claudeArgs = split < 0 ? [] : args.slice(split + 1);
  const positional = own.filter(
    (arg, index) => !arg.startsWith('--') && own[index - 1] !== '--root'
  );
  const [id, stage] = positional;
  if (
    positional.length !== 2 ||
    id === undefined ||
    stage === undefined ||
    !ID.test(id) ||
    !STAGE.test(stage) ||
    !claudeArgs.length
  ) {
    return { error: USAGE };
  }
  if (
    claudeArgs.some(
      (arg) =>
        ['-p', '--print'].includes(arg) || arg.startsWith('--output-format')
    )
  ) {
    return {
      error:
        'run-stage adds -p and --output-format json itself; leave them out',
    };
  }
  return {
    root: resolve(cwd, valueAfter(own, '--root') ?? '.'),
    id,
    stage,
    claudeArgs,
  };
};

// The session id the stage runs under, when the claude flags name it.
export const sessionIdOf = (claudeArgs: readonly string[]): string | null =>
  valueAfter(claudeArgs, '--session-id') ?? valueAfter(claudeArgs, '--resume');

export const versionOf = (output: string | null | undefined): string =>
  output?.match(/\d+\.\d+\.\d+/)?.[0] ?? UNKNOWN;

export const parseResult = (text: string): ClaudeResult | null => {
  try {
    const parsed: unknown = JSON.parse(text);
    return isClaudeResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const exitTextOf = ({ status, signal, error }: SessionEnd): string =>
  error ?? (signal ? `killed by ${signal}` : `exit ${status ?? 1}`);

const baseStatusOf = ({ result, fromTranscript, session }: Outcome): string => {
  const exitText = exitTextOf(session);
  if (fromTranscript) {
    return `FAIL — no JSON result (claude ${exitText}); usage from its transcript`;
  }
  if (!result) return `FAIL — no JSON result (claude ${exitText})`;
  const line =
    (result.result ?? '')
      .split('\n')
      .map((text) => text.trim())
      .find(Boolean) ?? '';
  const clipped = line.length > 200 ? `${line.slice(0, 199)}…` : line;
  if (result.subtype === 'success' && !result.is_error) {
    return clipped || '(no result text)';
  }
  return `${result.subtype ?? 'error'}${clipped ? ` — ${clipped}` : ''}`;
};

export const statusOf = (outcome: Outcome): string =>
  outcome.signalled
    ? `interrupted (${outcome.signalled}): ${baseStatusOf(outcome)}`
    : baseStatusOf(outcome);

export interface DispatchFacts {
  readonly stage: string;
  readonly started: string;
  readonly seconds: number;
  readonly version: string;
  readonly status: string;
}

const integer = (value: number | null | undefined): string =>
  value === null || value === undefined ? UNKNOWN : String(value);
const usd = (value: number | null | undefined): string =>
  value === null || value === undefined ? UNKNOWN : value.toFixed(6);

// The Dispatches rows of one dispatch: one per model, or one row of unknowns when no usage was read.
export const dispatchCellsOf = (
  rows: readonly UsageRow[],
  { stage, started, seconds, version, status }: DispatchFacts
): TableCells[] =>
  rows.length
    ? rows.map((row, index) => [
        stage,
        started,
        index ? UNKNOWN : String(seconds),
        row.model,
        integer(row.requests),
        integer(row.uncachedIn),
        integer(row.cacheWrite),
        integer(row.cacheRead),
        integer(row.output),
        usd(row.predictedUsd),
        usd(row.reportedUsd),
        integer(row.finalContext),
        version,
        index ? UNKNOWN : status,
      ])
    : [
        [
          stage,
          started,
          String(seconds),
          ...Array.from({ length: 9 }, () => UNKNOWN),
          version,
          status,
        ],
      ];

// Rounded to Claude Code's own precision: a subtraction leaves float noise (0.010051199999999999).
const dollars = (value: number | null | undefined): string =>
  typeof value === 'number' ? String(Number(value.toFixed(7))) : '?';

// The status and spend lines run-stage prints; stage-outcome.mts and lane.mts parse their wording.
export const summaryOf = (
  rows: readonly UsageRow[],
  { stage, seconds, status }: DispatchFacts,
  { result, fromTranscript }: Outcome
): string[] => {
  const unpriced = rows
    .filter(({ predictedUsd }) => predictedUsd === null)
    .map(({ model }) => model);
  const total = rows.reduce(
    (sum, { predictedUsd }) => sum + (predictedUsd ?? 0),
    0
  );
  const predicted = !rows.length
    ? 'no usage recorded'
    : unpriced.length
    ? `no prediction for ${unpriced.join(', ')}`
    : `$${total.toFixed(4)} at list price${
        fromTranscript
          ? ' (from the transcript; a request cut off is not in it)'
          : ''
      }`;
  const sessionTotal = result?.session_total_cost_usd;
  return [
    `${stage}: ${status}`,
    `${
      rows.length
    } model row(s), ${seconds} s, ${predicted}; Claude Code reported $${dollars(
      result?.total_cost_usd
    )}` +
      (sessionTotal === undefined
        ? ''
        : ` (this invocation; session total $${dollars(sessionTotal)})`),
  ];
};

const messageOf = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const main = async (args: readonly string[]): Promise<void> => {
  const say = (line: string): void => {
    process.stdout.write(`${line}\n`);
  };
  const stop = (code: number, message: string): never => {
    process.stderr.write(`run-stage: ${message}\n`);
    process.exit(code);
  };

  const parsed = parseArgs(args, process.cwd());
  if ('error' in parsed) return stop(2, parsed.error);
  const { root, id, stage, claudeArgs } = parsed;
  if (process.env.CLAUDE_CODE_SUBAGENT_MODEL !== undefined) {
    stop(
      2,
      'CLAUDE_CODE_SUBAGENT_MODEL is set: it overrides every stage agent model. Unset it first.'
    );
  }
  const graceMs = Number(process.env.DT_DDS_SIGNAL_GRACE_MS) || GRACE_MS;

  const prices = (() => {
    try {
      return loadPrices(root);
    } catch (error) {
      return stop(1, `cannot read prices.json (${messageOf(error)})`);
    }
  })();

  // Check the run log before spending a session on a stage whose usage could not be recorded.
  const workDir = join(root, WORK_DIR, id);
  const runLogPath = join(workDir, 'run-log.md');
  const runLog = existsSync(runLogPath)
    ? readFileSync(runLogPath, 'utf8')
    : `# Run log — ${id}\n`;
  try {
    withDispatchRows(runLog, []);
  } catch (error) {
    stop(
      1,
      `${relative(root, runLogPath)}: ${messageOf(
        error
      )}; record this run in a new work dir`
    );
  }

  const env = freshSessionEnv(process.env, root);
  // The version that ran the stage, on every row: Claude Code updates itself, and its prices with it.
  // `--version` starts no session.
  const version = versionOf(
    spawnSync('claude', ['--version'], {
      cwd: root,
      env,
      encoding: 'utf8',
      timeout: 15000,
    }).stdout
  );
  const sessionId = sessionIdOf(claudeArgs);
  const startedAt = new Date();
  // run-stage's own flags go first: a stage flag left without its value (a wrapped command line) must
  // fail in claude, not take `--output-format` as its value.
  const child = spawn(
    'claude',
    ['-p', '--output-format', 'json', ...claudeArgs],
    { cwd: root, env, stdio: ['ignore', 'pipe', 'inherit'] }
  );
  // The first SIGINT or SIGTERM run-stage got while the session ran.
  const interrupt: { signal: NodeJS.Signals | null } = { signal: null };
  const onSignal = (signal: NodeJS.Signals): void => {
    if (interrupt.signal) return;
    interrupt.signal = signal;
    setTimeout(() => {
      if (child.exitCode === null && child.signalCode === null) {
        child.kill(signal);
      }
    }, graceMs).unref();
  };
  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);
  let stdout = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    stdout += chunk;
  });
  const session = await new Promise<SessionEnd>((resolveSession) => {
    child.on('error', (error: NodeJS.ErrnoException) =>
      resolveSession({ status: null, signal: null, error: String(error.code) })
    );
    child.on('close', (status, signal) =>
      resolveSession({ status, signal, error: null })
    );
  });
  const signalled = interrupt.signal;
  const seconds = Math.round((Date.now() - startedAt.getTime()) / 1000);
  const started = startedAt.toISOString().replace(/\.\d{3}Z$/, 'Z');

  const usageDir = join(workDir, 'usage');
  mkdirSync(usageDir, { recursive: true });
  const savedNames = readdirSync(usageDir);
  const sequence = String(
    savedNames.filter((name) => /^\d+-/.test(name)).length + 1
  ).padStart(2, '0');
  const resultPath = join(usageDir, `${sequence}-${stage}.json`);

  // The session's own result: a resumed session reports its whole session in modelUsage and
  // total_cost_usd, so the latest earlier result of the same session (saved here) is subtracted.
  const earlier = savedNames
    .filter(
      (name) =>
        /^\d+-.*\.json$/.test(name) && join(usageDir, name) !== resultPath
    )
    .sort()
    .map((name) => parseResult(readFileSync(join(usageDir, name), 'utf8')));
  const reported = parseResult(stdout);
  // No JSON result: this invocation's requests from the session's transcript, when it can be found.
  const transcripts = transcriptsOf(sessionId, configDirOf(env));
  const [transcript] = transcripts;
  const fromTranscript =
    !reported && transcript
      ? resultOf(
          requestsIn(transcripts, { sinceMs: startedAt.getTime() - 1000 }),
          sessionId
        )
      : null;
  const result = reported
    ? ownOf(reported, previousOf(earlier, reported))
    : fromTranscript;
  writeFileSync(
    resultPath,
    fromTranscript ? `${JSON.stringify(fromTranscript)}\n` : stdout
  );
  if (fromTranscript && stdout) {
    writeFileSync(resultPath.replace(/\.json$/, '.stdout.txt'), stdout);
  }
  // An interrupted or failed session's transcript is kept beside its result: it holds the requests the
  // session completed, for checking the logged usage later.
  const transcriptPath =
    (signalled || fromTranscript) && transcript
      ? resultPath.replace(/\.json$/, '.transcript.jsonl')
      : null;
  if (transcriptPath && transcript) copyFileSync(transcript, transcriptPath);

  const outcome: Outcome = {
    result,
    fromTranscript: fromTranscript !== null,
    session,
    signalled,
  };
  const rows = result ? usageRows(result, prices) : [];
  const facts: DispatchFacts = {
    stage,
    started,
    seconds,
    version,
    status: statusOf(outcome),
  };
  mkdirSync(workDir, { recursive: true });
  writeFileSync(
    runLogPath,
    withDispatchRows(runLog, dispatchCellsOf(rows, facts))
  );

  summaryOf(rows, facts, outcome).forEach(say);
  say(`wrote ${relative(root, runLogPath)} and ${relative(root, resultPath)}`);
  if (transcriptPath) {
    say(`transcript kept: ${relative(root, transcriptPath)}`);
  }
  process.exit(signalled ? INTERRUPTED : reported ? session.status ?? 1 : 1);
};

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main(process.argv.slice(2));
}
