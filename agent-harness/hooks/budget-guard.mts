// PreToolUse guard for every tool, pipeline runs only (registered in .claude/pipeline.settings.json):
// a hard tool-call cap for the running step of the active pipeline run. run.mts writes the run file
// .local/agent-harness/work/.active-run.json ({"issue":123,"lane":"0","maxToolCalls":60,
// "runId":"<run id>","step":"express:apply#1"}) before each session and deletes it at G7, on `stop`
// or on an interrupt. No run file: no cap. Each allowed call appends one line (`<time> <tool> <step>`)
// to .local/agent-harness/work/<issue>/tool-calls-<runId>.log (tool-calls.log for a run file without a run id),
// so a new run of the same issue starts at zero. With a `step` key (one per session:
// `<step id>#<attempt>`) only that step's lines count, so a loop or a re-run gets its own allowance;
// without one, every line of the run counts. At the cap every call is denied.
// Self-contained on purpose (node built-ins only): a failed import would crash the hook before its try.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The validated run file.
 */
interface Run {
  id: string;
  lane: unknown;
  maxToolCalls: number;
  runId: string | null;
  step: string | null;
}

const ID = /^(?:\d+|PR-\d+|[a-z][a-z0-9-]*)$/;
const RUN_ID = /^[0-9A-Za-z-]+$/;
const STEP = /^[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)?#\d+$/;

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const runPath = join(root, '.local/agent-harness/work/.active-run.json');

function respond(permissionDecision: 'deny', reason: string): never {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision,
        permissionDecisionReason: `[dt-dds harness] run budget: ${reason}`,
      },
    })
  );
  process.exit(0);
}

const readRun = (): Run => {
  const run = JSON.parse(readFileSync(runPath, 'utf8'));
  const id = String(run?.issue ?? '');
  if (!ID.test(id))
    throw new Error(`issue ${JSON.stringify(run?.issue)} is not a work id`);
  if (!Number.isInteger(run.maxToolCalls) || run.maxToolCalls < 1) {
    throw new Error(
      `maxToolCalls ${JSON.stringify(
        run.maxToolCalls
      )} is not a positive integer`
    );
  }
  if (run.runId !== undefined && !RUN_ID.test(String(run.runId)))
    throw new Error(
      `run id ${JSON.stringify(run.runId)} is not safe in a file name`
    );
  if (run.step !== undefined && !STEP.test(String(run.step)))
    throw new Error(`step ${JSON.stringify(run.step)} is not a step key`);
  return {
    id,
    lane: run.lane,
    maxToolCalls: run.maxToolCalls,
    runId: run.runId ?? null,
    step: run.step ?? null,
  };
};

if (!existsSync(runPath)) process.exit(0);

// Every unexpected input or error is a deny: Claude Code before 2.1.295 ignores onFailure: block.
try {
  const { id, lane, maxToolCalls, runId, step } = readRun();
  const tool = JSON.parse(readFileSync(0, 'utf8'))?.tool_name;
  if (typeof tool !== 'string')
    throw new Error('unexpected hook input (no tool_name)');
  const workDir = join(root, '.local/agent-harness/work', id);
  const ledger = join(
    workDir,
    runId ? `tool-calls-${runId}.log` : 'tool-calls.log'
  );
  const lines = existsSync(ledger)
    ? readFileSync(ledger, 'utf8').split('\n').filter(Boolean)
    : [];
  const used = step
    ? lines.filter((line) => line.split(' ')[2] === step).length
    : lines.length;
  if (used >= maxToolCalls) {
    const scope = step ? `step ${step}` : `lane ${lane}`;
    respond(
      'deny',
      `${scope} cap of ${maxToolCalls} tool calls reached; stop and report what is left at the gate.`
    );
  }
  mkdirSync(workDir, { recursive: true });
  appendFileSync(
    ledger,
    `${new Date().toISOString()} ${tool}${step ? ` ${step}` : ''}\n`
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  respond('deny', `guard error (${message}); failing closed.`);
}

process.exit(0);
