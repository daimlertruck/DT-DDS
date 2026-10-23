import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { checkHooks } from './check-hooks.mts';

const hooksDir = fileURLToPath(new URL('.', import.meta.url));
const repo = fileURLToPath(new URL('../..', import.meta.url));
const pipelineSettings = join(repo, '.claude/pipeline.settings.json');
const projectSettings = join(repo, '.claude/settings.json');
const GUARD_BASH =
  'node "$CLAUDE_PROJECT_DIR/agent-harness/hooks/guard-bash.mts"';

const scratchDirs: string[] = [];
after(() =>
  scratchDirs.forEach((dir) => rmSync(dir, { recursive: true, force: true }))
);

const scratchDir = (prefix: string) => {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  scratchDirs.push(dir);
  return dir;
};

/**
 * A copy of the hooks dir with one script replaced.
 */
const brokenHooksDir = (script: string, body: string) => {
  const dir = scratchDir('check-hooks-');
  cpSync(hooksDir, dir, { recursive: true });
  writeFileSync(join(dir, script), body);
  return dir;
};

/**
 * Checks a settings file that registers one Bash command hook.
 * @param hook the entry's fields besides `type`
 */
const checkOne = (hook: Record<string, unknown>, env?: NodeJS.ProcessEnv) => {
  const settingsPath = join(scratchDir('check-hooks-settings-'), 's.json');
  writeFileSync(
    settingsPath,
    JSON.stringify({
      hooks: {
        PreToolUse: [
          {
            matcher: 'Bash',
            hooks: [{ type: 'command', timeout: 10, ...hook }],
          },
        ],
      },
    })
  );
  const [result, ...others] = checkHooks({ settingsPath, env });
  assert.ok(result && others.length === 0);
  return result;
};

const byScript = (results: ReturnType<typeof checkHooks>, script: string) => {
  const result = results.find(({ command }) => command.includes(script));
  assert.ok(result, `no hook runs ${script}`);
  return result;
};

test('every PreToolUse hook registered for pipeline runs and for the project fails closed, runs and allows a benign call', () => {
  [pipelineSettings, projectSettings].forEach((settingsPath) => {
    const results = checkHooks({ settingsPath });
    assert.ok(results.length > 0, settingsPath);
    results.forEach(({ command, ok, detail }) =>
      assert.ok(ok, `${command}: ${detail}`)
    );
  });
});

test('the pipeline settings register the budget guard for every tool', () => {
  const results = checkHooks({ settingsPath: pipelineSettings });
  assert.equal(byScript(results, 'budget-guard.mts').matcher, '.*');
});

test('a healthy hook registered without onFailure: block is reported broken: it fails open if it cannot start', () => {
  const { ok, detail } = checkOne({ command: GUARD_BASH });
  assert.equal(ok, false);
  assert.match(
    detail,
    /fails open if it cannot start: add "onFailure": "block"/
  );
});

test('a hook with onFailure: block whose process cannot start (node missing from PATH) is reported broken: Claude Code denies every call', () => {
  const results = checkHooks({
    settingsPath: pipelineSettings,
    env: { ...process.env, PATH: '/nonexistent' },
  });
  const budget = byScript(results, 'budget-guard.mts');
  assert.equal(budget.ok, false);
  assert.match(budget.detail, /exit 127/);
  assert.match(budget.detail, /denies every call/);
});

test('a hook without onFailure: block whose process cannot start is reported broken: Claude Code lets every call through', () => {
  const { ok, detail } = checkOne(
    { command: GUARD_BASH },
    { ...process.env, PATH: '/nonexistent' }
  );
  assert.equal(ok, false);
  assert.match(detail, /exit 127/);
  assert.match(detail, /lets every call through/);
});

test('a hook with onFailure: block that times out is reported broken: Claude Code denies every call', () => {
  const { ok, detail } = checkOne({
    command: 'sleep 5',
    timeout: 1,
    onFailure: 'block',
  });
  assert.equal(ok, false);
  assert.match(detail, /timed out after 1 s/);
  assert.match(detail, /denies every call/);
});

test('a hook script that crashes is reported broken, and only that one', () => {
  const results = checkHooks({
    settingsPath: projectSettings,
    hooksDir: brokenHooksDir('guard-bash.mts', 'this is not javascript(\n'),
  });
  const bash = byScript(results, 'guard-bash.mts');
  assert.equal(bash.ok, false);
  assert.match(bash.detail, /exit 1/);
  assert.equal(byScript(results, 'guard-mcp.mts').ok, true);
});

test('a missing hook script is reported broken', () => {
  const results = checkHooks({
    settingsPath: pipelineSettings,
    hooksDir: scratchDir('check-hooks-empty-'),
  });
  results.forEach(({ command, ok }) => assert.equal(ok, false, command));
});

test('a hook that denies a benign call is reported broken: the run would stall on denials', () => {
  const results = checkHooks({
    settingsPath: pipelineSettings,
    activeRun: '{not json',
  });
  const budget = byScript(results, 'budget-guard.mts');
  assert.equal(budget.ok, false);
  assert.match(budget.detail, /denies a benign Bash call/);
});

test('a valid active run passes the check, and the probe call lands in the scratch project, not the repo', () => {
  const results = checkHooks({
    settingsPath: pipelineSettings,
    activeRun: { issue: 257, lane: 0, maxToolCalls: 60 },
  });
  results.forEach(({ command, ok, detail }) =>
    assert.ok(ok, `${command}: ${detail}`)
  );
});

test('pipeline settings: unused tools denied, model slots and cache TTL pinned, nothing inherited from personal settings', () => {
  const settings = JSON.parse(readFileSync(pipelineSettings, 'utf8'));
  [
    'Artifact',
    'Workflow',
    'ScheduleWakeup',
    'SendFeedback',
    'ReportFindings',
    'ListAgents',
  ].forEach((tool) =>
    assert.ok(settings.permissions.deny.includes(tool), tool)
  );
  assert.deepEqual(
    {
      haiku: settings.env.ANTHROPIC_DEFAULT_HAIKU_MODEL,
      sonnet: settings.env.ANTHROPIC_DEFAULT_SONNET_MODEL,
      opus: settings.env.ANTHROPIC_DEFAULT_OPUS_MODEL,
      ttl: settings.env.CLAUDE_CODE_PROMPT_CACHE_TTL,
      subagentTtl: settings.env.CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL,
    },
    {
      haiku: 'claude-haiku-4-5',
      sonnet: 'claude-sonnet-5-5',
      opus: 'claude-opus-5-5',
      ttl: '5m',
      subagentTtl: '5m',
    }
  );
  [
    'CLAUDE_CODE_SUBAGENT_MODEL',
    'CLAUDE_CODE_EFFORT_LEVEL',
    'CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS',
  ].forEach((name) => assert.equal(name in settings.env, false, name));
  assert.equal(settings.effortLevel, 'medium');
  assert.equal(settings.model, 'sonnet');
});

// A contributor's ~/.claude/CLAUDE.md would reach every stage session, as User memory and, with
// CLAUDE_CONFIG_DIR elsewhere, through the ancestor walk (~ is an ancestor of the checkout).
test("pipeline settings: no .claude/CLAUDE.md outside the repo loads (a contributor's own instructions)", () => {
  const settings = JSON.parse(readFileSync(pipelineSettings, 'utf8'));
  assert.deepEqual(settings.claudeMdExcludes, ['**/.claude/CLAUDE.md']);
  assert.equal(
    existsSync(join(repo, '.claude/CLAUDE.md')),
    false,
    'the repo has its own .claude/CLAUDE.md: the exclude would drop it'
  );
});

// A `cd` would persist across Bash calls, and the stage's relative permission rules
// (Write(.local/agent-harness/work/**)) and script paths would then resolve from the new directory.
test('pipeline settings: every Bash call starts at the project root', () => {
  const settings = JSON.parse(readFileSync(pipelineSettings, 'utf8'));
  assert.equal(settings.env.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR, '1');
});
