// run.mts end to end in a throwaway git repo, with a scripted fake `claude` on PATH: each call writes
// the step's gate-summary.md and artifact, and can touch a tracked file, commit, sleep, report
// permission denials or print something that is not JSON.
import assert from 'node:assert/strict';
import {
  spawn,
  spawnSync,
  type ChildProcess,
  type ChildProcessWithoutNullStreams,
  type SpawnSyncReturns,
} from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { afterEach } from 'node:test';
import { fileURLToPath } from 'node:url';

import { omit } from '../scripts/lib/objects.mts';
import {
  CLAUDE_RESULT,
  GIT_ENV,
  createGitRepo,
} from '../scripts/lib/test-support.mts';
import { tableUnder, type TableRow } from '../scripts/records/run-records.mts';
import { type ActiveRun } from '../scripts/runner/checks.mts';

import type { AgentsFile } from '../scripts/runner/adapters/claude.mts';
import type {
  LaneChoice,
  RunState,
  RunSummary,
} from '../scripts/runner/state.mts';

const realRoot = fileURLToPath(new URL('../..', import.meta.url));
export const script = fileURLToPath(
  new URL('../scripts/run.mts', import.meta.url)
);
// A checked-in issue as `gh issue view` saves it: tests never read a real work dir.
export const ISSUE_257 = readFileSync(
  join(realRoot, 'agent-harness/tests/fixtures/issue-257.json'),
  'utf8'
);
// Low confidence: no type label, so the rules ask a model unless --lane is given.
export const ISSUE_UNLABELLED = JSON.stringify({
  number: 257,
  title: 'Something',
  labels: [],
  body: 'Hm.',
});

interface SetupOptions {
  readonly healthOk?: boolean;
  readonly hooksOk?: boolean;
  readonly issue?: string;
}

// stages.json, loose enough to replace its health checks.
type StagesFile = Record<string, unknown>;

// A repo with the harness pieces run.mts reads, health checks that pass (or fail), a stub hook check.
export const setup = ({
  healthOk = true,
  hooksOk = true,
  issue = ISSUE_257,
}: SetupOptions = {}): string => {
  const root = createGitRepo();
  const stages: StagesFile = JSON.parse(
    readFileSync(join(realRoot, 'agent-harness/config/stages.json'), 'utf8')
  );
  mkdirSync(join(root, 'agent-harness/config'), { recursive: true });
  mkdirSync(join(root, 'agent-harness/hooks'), { recursive: true });
  writeFileSync(
    join(root, 'agent-harness/config/stages.json'),
    JSON.stringify({
      ...stages,
      healthChecks: [{ name: 'stub', run: [healthOk ? 'true' : 'false'] }],
    })
  );
  copyFileSync(
    join(realRoot, 'agent-harness/config/prices.json'),
    join(root, 'agent-harness/config/prices.json')
  );
  writeFileSync(
    join(root, 'agent-harness/hooks/check-hooks.mts'),
    hooksOk
      ? 'process.exit(0);\n'
      : 'console.log("hook x crashed"); process.exit(1);\n'
  );
  writeFileSync(join(root, 'issue-fixture.json'), issue);
  writeFileSync(
    join(root, '.git/info/exclude'),
    '/.local/\n/agent-harness/\n/.agents/\nissue-fixture.json\n'
  );
  return root;
};

export const withHealthChecks = (root: string, healthChecks: unknown): void => {
  const path = join(root, 'agent-harness/config/stages.json');
  const stages: StagesFile = JSON.parse(readFileSync(path, 'utf8'));
  writeFileSync(path, JSON.stringify({ ...stages, healthChecks }));
};

// What one call of the fake `claude` does (see fakeClaude).
interface FakeCall {
  readonly status?: string;
  readonly raw?: string;
  readonly denials?: readonly unknown[];
  readonly cost?: number;
  readonly model?: string;
  readonly sleepMs?: number;
  readonly touch?: boolean;
  readonly untracked?: string;
  readonly branch?: string;
  readonly file?: readonly [string, string];
  readonly commit?: string;
  readonly transcript?: boolean;
  readonly toolCalls?: number;
  readonly trapSigint?: boolean;
}

interface FakeClaudeOptions {
  readonly script?: readonly FakeCall[];
  readonly statuses?: readonly string[];
  readonly touchCall?: number;
}

export interface FakeClaude {
  readonly bin: string;
  readonly calls: () => string[][];
  readonly activeSeen: (n: number) => ActiveRun;
  readonly agentsSeen: (n: number) => AgentsFile;
  readonly started: (n: number) => boolean;
  readonly env: NodeJS.ProcessEnv;
}

// `script[n - 1]` scripts call n: { status, raw (printed instead of JSON, exit 1), denials, cost,
// model, sleepMs, touch (edit README.md), untracked (create that untracked file), branch (check out a
// new branch), file ([path, content], staged), commit (a commit with that subject), transcript,
// toolCalls, trapSigint }. Each call copies the active-run and agents files so a test can see what
// the session saw.
export const fakeClaude = (
  root: string,
  { script: calls = [], statuses = [], touchCall = 0 }: FakeClaudeOptions = {}
): FakeClaude => {
  const bin = mkdtempSync(join(tmpdir(), 'fake-claude-'));
  const plan = Array.from(
    { length: Math.max(calls.length, statuses.length, touchCall) },
    (_, index): FakeCall => ({
      ...(statuses[index] ? { status: statuses[index] } : {}),
      ...(touchCall === index + 1 ? { touch: true } : {}),
      ...calls[index],
    })
  );
  writeFileSync(
    join(bin, 'claude'),
    `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const bin = ${JSON.stringify(bin)};
if (process.argv[2] === '--version') { process.stdout.write('2.1.296 (Claude Code)\\n'); process.exit(0); }
const log = path.join(bin, 'calls.jsonl');
const n = fs.existsSync(log) ? fs.readFileSync(log, 'utf8').split('\\n').filter(Boolean).length + 1 : 1;
const argv = process.argv.slice(2);
fs.appendFileSync(log, JSON.stringify(argv) + '\\n');
const root = ${JSON.stringify(root)};
const active = path.join(root, '.local/agent-harness/work/.active-run.json');
if (fs.existsSync(active)) fs.copyFileSync(active, path.join(bin, 'active-' + n + '.json'));
if (argv.includes('--agents')) fs.copyFileSync(path.join(root, argv[argv.indexOf('--agents') + 1]), path.join(bin, 'agents-' + n + '.json'));
const call = (${JSON.stringify(plan)})[n - 1] || {};
const sessionId = argv.includes('--session-id') ? argv[argv.indexOf('--session-id') + 1] : argv.includes('--resume') ? argv[argv.indexOf('--resume') + 1] : null;
if (call.transcript) {
  const dir = path.join(process.env.CLAUDE_CONFIG_DIR, 'projects', '-repo');
  fs.mkdirSync(dir, { recursive: true });
  const usage = { input_tokens: 2, cache_read_input_tokens: 20000, cache_creation_input_tokens: 1000, output_tokens: 200, cache_creation: { ephemeral_5m_input_tokens: 1000, ephemeral_1h_input_tokens: 0 } };
  fs.appendFileSync(path.join(dir, sessionId + '.jsonl'), JSON.stringify({ type: 'assistant', timestamp: new Date().toISOString(), message: { id: 'msg_' + n, model: 'claude-opus-5-5', usage, content: [] } }) + '\\n');
}
if (call.toolCalls) {
  const run = JSON.parse(fs.readFileSync(active, 'utf8'));
  const ledger = path.join(root, '.local/agent-harness/work/257/tool-calls-' + run.runId + '.log');
  for (let i = 0; i < call.toolCalls; i += 1) fs.appendFileSync(ledger, new Date().toISOString() + ' Read ' + run.step + '\\n');
}
fs.writeFileSync(path.join(bin, 'started-' + n), '');
if (call.trapSigint) {
  const interrupted = { ...${JSON.stringify(
    CLAUDE_RESULT
  )}, subtype: 'error_during_execution', is_error: true, result: undefined, session_id: sessionId };
  process.on('SIGINT', () => { process.stdout.write(JSON.stringify(interrupted)); process.exit(0); });
  setTimeout(() => process.exit(3), 20000);
  return;
}
if (call.sleepMs) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, call.sleepMs);
if (call.raw !== undefined) { process.stdout.write(call.raw); process.exit(1); }
const brief = argv[3] || '';
const artifact = (brief.match(/Your artifact: (\\S+?)\\.?$/m) || [])[1];
if (artifact) {
  fs.mkdirSync(path.dirname(path.join(root, artifact)), { recursive: true });
  fs.writeFileSync(path.join(root, artifact), 'artifact of call ' + n + '\\n');
  fs.writeFileSync(path.join(path.dirname(path.join(root, artifact)), 'gate-summary.md'), 'summary of call ' + n + '\\n');
}
if (call.touch) fs.appendFileSync(path.join(root, 'README.md'), 'touched\\n');
if (call.untracked) { fs.mkdirSync(path.dirname(path.join(root, call.untracked)), { recursive: true }); fs.writeFileSync(path.join(root, call.untracked), '{}\\n'); }
if (call.branch) execFileSync('git', ['checkout', '-q', '-b', call.branch], { cwd: root });
if (call.file) { fs.writeFileSync(path.join(root, call.file[0]), call.file[1]); execFileSync('git', ['add', call.file[0]], { cwd: root }); }
if (call.commit) execFileSync('git', ['commit', '-q', '--allow-empty', '-m', call.commit], { cwd: root });
const result = ${JSON.stringify(CLAUDE_RESULT)};
result.result = call.status || 'PASS';
const resumed = argv.includes('--resume') ? argv[argv.indexOf('--resume') + 1] : null;
result.session_id = resumed || 'session-' + n;
result.permission_denials = call.denials || [];
if (call.model) { result.modelUsage = { [call.model]: result.modelUsage['claude-opus-5-5'] }; }
// A resumed session reports modelUsage and total_cost_usd for the whole session (here: one earlier call like this one).
if (resumed) {
  Object.values(result.modelUsage).forEach((entry) => ['inputTokens', 'outputTokens', 'cacheReadInputTokens', 'cacheCreationInputTokens', 'costUSD'].forEach((key) => (entry[key] *= 2)));
  result.total_cost_usd *= 2;
}
if (call.cost !== undefined) result.total_cost_usd = call.cost;
process.stdout.write(JSON.stringify(result));
`,
    { mode: 0o755 }
  );
  const calls_ = (): string[][] =>
    existsSync(join(bin, 'calls.jsonl'))
      ? readFileSync(join(bin, 'calls.jsonl'), 'utf8')
          .split('\n')
          .filter(Boolean)
          .map((line): string[] => JSON.parse(line))
      : [];
  const seen = (kind: string, n: number): string =>
    readFileSync(join(bin, `${kind}-${n}.json`), 'utf8');
  const base = omit(GIT_ENV, 'CLAUDE_CODE_SUBAGENT_MODEL');
  return {
    bin,
    calls: calls_,
    activeSeen: (n): ActiveRun => JSON.parse(seen('active', n)),
    agentsSeen: (n): AgentsFile => JSON.parse(seen('agents', n)),
    started: (n) => existsSync(join(bin, `started-${n}`)),
    env: { ...base, PATH: `${bin}${delimiter}${process.env.PATH}` },
  };
};

export const ARGS = (root: string, extra: readonly string[]): string[] => [
  script,
  '257',
  '--root',
  root,
  '--issue-file',
  'issue-fixture.json',
  ...extra,
];
export const run = (
  root: string,
  claude: FakeClaude,
  answers: readonly string[],
  extra: readonly string[] = []
): SpawnSyncReturns<string> =>
  spawnSync('node', ARGS(root, extra), {
    encoding: 'utf8',
    env: claude.env,
    input: answers.map((answer) => `${answer}\n`).join(''),
  });
// An interactive run: its own process group (like a terminal job), stdin kept open. Every group is
// killed after its test, so a failing assertion cannot leave a run waiting at a gate.
const jobs: ChildProcess[] = [];
afterEach(() => {
  jobs.splice(0).forEach((child) => {
    try {
      if (child.pid !== undefined) process.kill(-child.pid, 'SIGKILL');
    } catch {
      // already gone
    }
  });
});
interface Job {
  readonly child: ChildProcessWithoutNullStreams;
  readonly output: { out: string; err: string };
  readonly exited: Promise<{
    readonly code: number | null;
    readonly signal: NodeJS.Signals | null;
  }>;
}
export const start = (
  root: string,
  claude: FakeClaude,
  extra: readonly string[] = [],
  env: NodeJS.ProcessEnv = {}
): Job => {
  const child = spawn('node', ARGS(root, extra), {
    env: { ...claude.env, ...env },
    detached: true,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  jobs.push(child);
  const output = { out: '', err: '' };
  child.stdout.on('data', (chunk) => (output.out += chunk));
  child.stderr.on('data', (chunk) => (output.err += chunk));
  const exited = new Promise<{
    code: number | null;
    signal: NodeJS.Signals | null;
  }>((resolveExit) =>
    child.on('exit', (code, signal) => resolveExit({ code, signal }))
  );
  return { child, output, exited };
};
// The job's process group, for a Ctrl-C that reaches the whole job.
export const groupOf = (job: Job): number => {
  assert.ok(job.child.pid !== undefined, 'the job started');
  return -job.child.pid;
};
export const waitFor = async (
  predicate: () => boolean,
  ms = 8000
): Promise<void> => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (predicate()) return;
    await new Promise((resolveLater) => setTimeout(resolveLater, 25));
  }
  throw new Error('timed out waiting');
};
export const work = (root: string, ...path: readonly string[]): string =>
  join(root, '.local/agent-harness/work/257', ...path);
export const gates = (root: string): TableRow[] =>
  tableUnder(readFileSync(work(root, 'run-log.md'), 'utf8'), 'gate decisions');
export const stateOf = (root: string): RunState =>
  JSON.parse(readFileSync(work(root, 'run-state.json'), 'utf8'));
export const laneOfRun = (root: string): LaneChoice =>
  JSON.parse(readFileSync(work(root, 'lane.json'), 'utf8'));
export const recordOf = (root: string): RunSummary =>
  JSON.parse(readFileSync(join(root, 'record.json'), 'utf8'));
// A call's prompt (`claude -p --output-format json <prompt> …`) and the value after one of its flags.
export const promptOf = (call: readonly string[] | undefined): string =>
  call?.[3] ?? '';
export const flagOf = (
  call: readonly string[] | undefined,
  name: string
): string | undefined => call?.[call.indexOf(name) + 1];
export const activePath = (root: string): string =>
  join(root, '.local/agent-harness/work/.active-run.json');
