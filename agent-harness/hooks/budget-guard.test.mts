import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./budget-guard.mts', import.meta.url));

/** @param activeRun the run file: a string is written as is, another value as JSON */
const project = (activeRun?: unknown) => {
  const root = mkdtempSync(join(tmpdir(), 'budget-guard-'));
  mkdirSync(join(root, '.local/agent-harness/work'), { recursive: true });
  if (activeRun !== undefined) {
    const body =
      typeof activeRun === 'string' ? activeRun : JSON.stringify(activeRun);
    writeFileSync(
      join(root, '.local/agent-harness/work/.active-run.json'),
      body
    );
  }
  return root;
};

const ledgerOf = (root: string, id: string) =>
  join(root, `.local/agent-harness/work/${id}/tool-calls.log`);
const ledgerLines = (root: string, id: string) =>
  existsSync(ledgerOf(root, id))
    ? readFileSync(ledgerOf(root, id), 'utf8').split('\n').filter(Boolean)
    : [];

/**
 * @param input the raw hook input
 */
const callRaw = (root: string, input: string) => {
  const run = spawnSync('node', [guard], {
    input,
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PROJECT_DIR: root },
  });
  assert.equal(run.status, 0, `exit ${run.status}: ${run.stderr}`);
  if (!run.stdout.trim()) return { decision: 'allow', reason: '' };
  const { permissionDecision, permissionDecisionReason } = JSON.parse(
    run.stdout
  ).hookSpecificOutput;
  return { decision: permissionDecision, reason: permissionDecisionReason };
};

const call = (root: string, tool_name = 'Read') =>
  callRaw(root, JSON.stringify({ tool_name, tool_input: {} }));

test('no active run: every call is allowed and nothing is counted', () => {
  const root = project();
  assert.equal(call(root).decision, 'allow');
  assert.equal(existsSync(join(root, '.local/agent-harness/work/257')), false);
});

test('under the cap: the call is allowed and one ledger line names the tool', () => {
  const root = project({ issue: 257, lane: 0, maxToolCalls: 3 });
  assert.equal(call(root, 'Bash').decision, 'allow');
  assert.equal(call(root, 'Read').decision, 'allow');
  const lines = ledgerLines(root, '257');
  assert.equal(lines.length, 2);
  assert.match(lines[0] ?? '', /^\d{4}-\d\d-\d\dT\S+Z Bash$/);
  assert.match(lines[1] ?? '', / Read$/);
});

test('at the cap: the call is denied with the lane and cap, and is not counted', () => {
  const root = project({ issue: 257, lane: 0, maxToolCalls: 2 });
  call(root);
  call(root);
  const { decision, reason } = call(root, 'Bash');
  assert.equal(decision, 'deny');
  assert.match(reason, /^\[dt-dds harness\] run budget: /);
  assert.match(reason, /lane 0 cap of 2 tool calls reached/);
  assert.equal(ledgerLines(root, '257').length, 2);
});

test('the ledger is keyed to the run id: another run of the same issue is not counted', () => {
  const root = project({
    issue: 257,
    lane: 0,
    maxToolCalls: 2,
    runId: '20261010T090000Z',
  });
  mkdirSync(join(root, '.local/agent-harness/work/257'), { recursive: true });
  writeFileSync(
    join(root, '.local/agent-harness/work/257/tool-calls-20261009T080000Z.log'),
    'a Read\nb Read\nc Read\n'
  );
  writeFileSync(
    join(root, '.local/agent-harness/work/257/tool-calls.log'),
    'a Read\nb Read\nc Read\n'
  );

  assert.equal(call(root, 'Bash').decision, 'allow');
  assert.equal(
    readFileSync(
      join(
        root,
        '.local/agent-harness/work/257/tool-calls-20261010T090000Z.log'
      ),
      'utf8'
    )
      .split('\n')
      .filter(Boolean).length,
    1
  );
});

test('an unsafe run id fails closed', () => {
  const { decision, reason } = call(
    project({ issue: 257, lane: 0, maxToolCalls: 2, runId: '../../x' })
  );
  assert.equal(decision, 'deny');
  assert.match(reason, /run id .* failing closed/);
});

test('the first call of a run creates the work dir and ledger instead of failing closed', () => {
  const root = project({ issue: 'dry-run-2', lane: 1, maxToolCalls: 5 });
  assert.equal(call(root).decision, 'allow');
  assert.equal(ledgerLines(root, 'dry-run-2').length, 1);
});

test('a malformed or unsafe run file fails closed', () => {
  [
    '{not json',
    '',
    JSON.stringify({ lane: 0, maxToolCalls: 60 }),
    JSON.stringify({ issue: '../../etc', lane: 0, maxToolCalls: 60 }),
    JSON.stringify({ issue: 257, lane: 0, maxToolCalls: 0 }),
    JSON.stringify({ issue: 257, lane: 0, maxToolCalls: 2.5 }),
    JSON.stringify({ issue: 257, lane: 0, maxToolCalls: '60' }),
    JSON.stringify([257, 0, 60]),
  ].forEach((body) => {
    const { decision, reason } = call(project(body));
    assert.equal(decision, 'deny', body);
    assert.match(reason, /failing closed/, body);
  });
});

test('unexpected hook input fails closed while a run is active', () => {
  const root = project({ issue: 257, lane: 0, maxToolCalls: 60 });
  ['{not json', '', JSON.stringify({ tool_input: {} })].forEach((input) =>
    assert.equal(callRaw(root, input).decision, 'deny', input || '(empty)')
  );
  assert.equal(ledgerLines(root, '257').length, 0);
});

// The cap is per step (one session), so a loop or a re-run starts a new allowance.
test("with a step key, only that step's calls count, and each ledger line names its step", () => {
  const root = project({
    issue: 127,
    lane: '1',
    maxToolCalls: 2,
    runId: 'r1',
    step: 'implement#2',
  });
  mkdirSync(join(root, '.local/agent-harness/work/127'), { recursive: true });
  const ledger = join(root, '.local/agent-harness/work/127/tool-calls-r1.log');
  writeFileSync(
    ledger,
    'a Read implement#1\nb Edit implement#1\nc Bash implement#1\nd Read\n'
  );

  assert.equal(call(root, 'Bash').decision, 'allow');
  assert.equal(call(root, 'Read').decision, 'allow');
  const { decision, reason } = call(root, 'Edit');

  assert.equal(decision, 'deny');
  assert.match(reason, /step implement#2 cap of 2 tool calls reached/);
  const lines = readFileSync(ledger, 'utf8').split('\n').filter(Boolean);
  assert.equal(lines.length, 6);
  assert.match(lines[4] ?? '', /^\d{4}-\d\d-\d\dT\S+Z Bash implement#2$/);
});

test('an unsafe step key fails closed', () => {
  const { decision, reason } = call(
    project({
      issue: 127,
      lane: '1',
      maxToolCalls: 2,
      runId: 'r1',
      step: 'impl ement',
    })
  );
  assert.equal(decision, 'deny');
  assert.match(reason, /step .* failing closed/);
});
