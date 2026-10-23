// The enforcement contract, through the real `claude` CLI: the hooks as .claude/settings.json and
// .claude/pipeline.settings.json register them, the reviewer agents' frontmatter hooks, the
// permission rules the Claude adapter gives each pipeline stage, and the project setting that turns
// off Claude Code's commit and PR attribution. A scripted model (test-support.mts)
// makes the tool calls, so every scenario reaches Claude Code's permission flow and no model is paid.
// Each test grades the outcome (refs, files, shim logs), and an allowed twin call shows the session
// ran. Skipped when `claude` is not on PATH. Run after a Claude Code upgrade.

import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  claudeMissing,
  runClaude,
  sandbox,
  trust,
  type Sandbox,
  type ScriptedCall,
  type Session,
  toolUseId,
} from './claude-code-support.mts';
import { agentsFile, sessionArgs } from '../scripts/runner/adapters/claude.mts';
import { freshSessionEnv } from '../scripts/runner/session-env.mts';
import { loadTable, stepsOf } from '../scripts/runner/stage-table.mts';

const skip = claudeMissing() ?? false;
const it = (name: string, fn: () => Promise<void>) =>
  test(name, { skip, timeout: 120_000 }, fn);

const REPO = fileURLToPath(new URL('../..', import.meta.url));
const PROJECT = [
  '--permission-mode',
  'bypassPermissions',
  '--setting-sources',
  'project',
  '--strict-mcp-config',
];
const REVIEWER_PROMPT = 'You are the DT-DDS component API reviewer';

const bash = (id: string, command: string, when?: string): ScriptedCall => ({
  id,
  tool: 'Bash',
  input: { command, description: id },
  ...(when ? { when } : {}),
});
const write = (
  id: string,
  box: Sandbox,
  path: string,
  when?: string
): ScriptedCall => ({
  id,
  tool: 'Write',
  input: { file_path: join(box.root, path), content: `written by ${id}\n` },
  ...(when ? { when } : {}),
});

// The call reached Claude Code's permission flow and was refused, not skipped by the script.
const refused = (session: Session, id: string): void => {
  const result = session.results.get(toolUseId(id));
  assert.ok(result, `no tool result for ${id}; stderr: ${session.stderr}`);
  assert.equal(result.isError, true, `${id} ran: ${result.content}`);
};
const ran = (session: Session, id: string): void => {
  const result = session.results.get(toolUseId(id));
  assert.ok(result, `no tool result for ${id}; stderr: ${session.stderr}`);
  assert.equal(result.isError, false, `${id} failed: ${result.content}`);
};

// The flags run-stage.mts gives a stage's session, from the stage table and the Claude adapter.
const stageArgs = (box: Sandbox, stage: string): string[] => {
  const steps = stepsOf(loadTable(REPO), '1');
  const step = steps.find((candidate) => candidate.stage === stage);
  assert.ok(step, `no ${stage} step in lane 1`);
  const agentsPath = join(box.root, '..', 'agents.json');
  writeFileSync(agentsPath, JSON.stringify(agentsFile(steps)));
  const [, ...flags] = sessionArgs(step, { issue: '1', brief: '', agentsPath });
  return flags;
};

// An active run as run.mts writes it, with `used` tool calls already in the step's ledger.
const activeRun = (box: Sandbox, maxToolCalls: number, used = 0): void => {
  const run = {
    issue: 1,
    lane: '1',
    maxToolCalls,
    runId: 'it',
    step: 'gather-context#1',
  };
  mkdirSync(join(box.root, '.local/agent-harness/work/1'), { recursive: true });
  writeFileSync(
    join(box.root, '.local/agent-harness/work/.active-run.json'),
    JSON.stringify(run)
  );
  writeFileSync(
    join(box.root, '.local/agent-harness/work/1/tool-calls-it.log'),
    Array.from(
      { length: used },
      () => '2026-01-01T00:00:00.000Z Bash gather-context#1\n'
    ).join('')
  );
};

// --- project settings: the guards are the only barrier (bypassPermissions) -------------------

it('a guard deny stops the call under bypassPermissions: the push leaves the remote unchanged', async () => {
  const box = sandbox();
  const session = await runClaude(box, {
    script: [
      bash('push', 'git push origin main'),
      bash('twin', 'touch allowed.txt'),
    ],
    args: PROJECT,
  });
  refused(session, 'push');
  assert.match(
    session.results.get(toolUseId('push'))?.content ?? '',
    /\[dt-dds harness\]/
  );
  assert.equal(box.remoteRefs(), '');
  ran(session, 'twin');
  assert.notEqual(box.read('allowed.txt'), null);
});

it('an ask rule is not an approval in a print-mode session: git reset --hard leaves HEAD', async () => {
  const box = sandbox();
  const before = box.head();
  const session = await runClaude(box, {
    script: [
      bash('reset', 'git reset --hard HEAD~1'),
      bash('twin', 'touch allowed.txt'),
    ],
    args: PROJECT,
  });
  refused(session, 'reset');
  assert.equal(box.head(), before);
  ran(session, 'twin');
});

it('a guard that cannot start blocks the call (onFailure: block)', async () => {
  const box = sandbox();
  writeFileSync(
    join(box.root, '.claude/settings.json'),
    JSON.stringify({
      hooks: {
        PreToolUse: [
          {
            matcher: 'Bash',
            hooks: [
              {
                type: 'command',
                command:
                  'node "$CLAUDE_PROJECT_DIR/agent-harness/hooks/missing-guard.mts"',
                timeout: 10,
                onFailure: 'block',
              },
            ],
          },
        ],
      },
    })
  );
  const session = await runClaude(box, {
    script: [bash('call', 'touch should-not-exist.txt')],
    args: PROJECT,
  });
  refused(session, 'call');
  assert.equal(box.read('should-not-exist.txt'), null);
});

it('a guard that times out blocks the call (onFailure: block)', async () => {
  const box = sandbox();
  writeFileSync(
    join(box.root, '.claude/settings.json'),
    JSON.stringify({
      hooks: {
        PreToolUse: [
          {
            matcher: 'Bash',
            hooks: [
              {
                type: 'command',
                command: 'sleep 5',
                timeout: 1,
                onFailure: 'block',
              },
            ],
          },
        ],
      },
    })
  );
  const session = await runClaude(box, {
    script: [bash('call', 'touch should-not-exist.txt')],
    args: PROJECT,
  });
  refused(session, 'call');
  assert.equal(box.read('should-not-exist.txt'), null);
});

it('disableAllHooks in user settings does not switch the project guards off', async () => {
  const box = sandbox();
  writeFileSync(
    join(box.configDir, 'settings.json'),
    JSON.stringify({ disableAllHooks: true })
  );
  const session = await runClaude(box, {
    script: [
      bash('push', 'git push origin main'),
      bash('twin', 'touch allowed.txt'),
    ],
    args: ['--permission-mode', 'bypassPermissions', '--strict-mcp-config'],
  });
  refused(session, 'push');
  assert.equal(box.remoteRefs(), '');
  ran(session, 'twin');
});

// --- project settings: no attribution --------------------------------------------------------

// Claude Code's own attribution texts: what it tells the model to end commits and PRs with.
const ATTRIBUTION = ['Co-Authored-By', 'Generated with [Claude Code]'];
const attributionIn = ({ requests }: Session): string[] =>
  ATTRIBUTION.filter((text) => requests.some((body) => body.includes(text)));

it("the project settings take Claude Code's commit and PR attribution out of the session", async () => {
  const configured = sandbox();
  const control = sandbox();
  const settings = join(control.root, '.claude/settings.json');
  const parsed = JSON.parse(readFileSync(settings, 'utf8')) as Record<
    string,
    unknown
  >;
  writeFileSync(
    settings,
    JSON.stringify(
      Object.fromEntries(
        Object.entries(parsed).filter(([key]) => key !== 'attribution')
      )
    )
  );
  const [withKey, withoutKey] = await Promise.all(
    [configured, control].map((box) =>
      runClaude(box, {
        script: [bash('twin', 'touch allowed.txt')],
        args: PROJECT,
      })
    )
  );
  assert.ok(withKey && withoutKey);
  ran(withKey, 'twin');
  ran(withoutKey, 'twin');
  assert.deepEqual(
    attributionIn(withoutKey),
    ATTRIBUTION,
    'control: Claude Code no longer adds this attribution by default'
  );
  assert.deepEqual(attributionIn(withKey), []);
});

// --- reviewer agents: frontmatter hooks (guard-reviewer) -------------------------------------

it('a reviewer session (--agent) may write its report under .local/agent-harness/work and nothing else', async () => {
  const box = sandbox();
  trust(box);
  const session = await runClaude(box, {
    script: [
      write('notes', box, 'docs/review-notes.md', REVIEWER_PROMPT),
      write(
        'report',
        box,
        '.local/agent-harness/work/1/api-review.md',
        REVIEWER_PROMPT
      ),
    ],
    args: [...PROJECT, '--agent', 'ds-api-reviewer'],
  });
  refused(session, 'notes');
  assert.equal(box.read('docs/review-notes.md'), null);
  ran(session, 'report');
});

it('a reviewer dispatched as a subagent cannot write outside .local/agent-harness/work', async () => {
  const box = sandbox();
  trust(box);
  const session = await runClaude(box, {
    script: [
      {
        id: 'dispatch',
        tool: 'Agent',
        input: {
          subagent_type: 'ds-api-reviewer',
          description: 'review',
          prompt: 'review',
        },
      },
      write('notes', box, 'docs/review-notes.md', REVIEWER_PROMPT),
      write(
        'report',
        box,
        '.local/agent-harness/work/1/api-review.md',
        REVIEWER_PROMPT
      ),
    ],
    args: PROJECT,
  });
  refused(session, 'notes');
  assert.equal(box.read('docs/review-notes.md'), null);
  ran(session, 'report');
});

// --- pipeline stages: the adapter's dontAsk rules plus the pipeline hooks --------------------

it('in a review stage the rules stop a reviewer write even where its frontmatter hooks are skipped', async () => {
  const box = sandbox(); // not trusted: Claude Code skips the reviewer's frontmatter hooks
  const session = await runClaude(box, {
    script: [
      {
        id: 'dispatch',
        tool: 'Agent',
        input: {
          subagent_type: 'ds-api-reviewer',
          description: 'review',
          prompt: 'review',
        },
      },
      write('notes', box, 'docs/review-notes.md', REVIEWER_PROMPT),
      write(
        'report',
        box,
        '.local/agent-harness/work/1/api-review.md',
        REVIEWER_PROMPT
      ),
    ],
    args: stageArgs(box, 'review'),
  });
  refused(session, 'notes');
  assert.equal(box.read('docs/review-notes.md'), null);
  ran(session, 'report');
});

it('a work-dir stage writes only under .local/agent-harness/work', async () => {
  const box = sandbox();
  const session = await runClaude(box, {
    script: [
      write('source', box, 'packages/x/README.md'),
      write('artifact', box, '.local/agent-harness/work/1/context-bundle.md'),
    ],
    args: stageArgs(box, 'gather-context'),
  });
  refused(session, 'source');
  assert.equal(box.read('packages/x/README.md'), null);
  ran(session, 'artifact');
});

it('a branch stage cannot write the never-edit paths', async () => {
  const box = sandbox();
  const session = await runClaude(box, {
    script: [
      write('changeset', box, '.changeset/eval.md'),
      {
        id: 'lockfile',
        tool: 'Edit',
        input: {
          file_path: join(box.root, 'yarn.lock'),
          old_string: '# lockfile',
          new_string: '# edited',
        },
      },
      write('harness-test', box, 'agent-harness/tests/fixtures/x.json'),
      write('source', box, 'src/fix.ts'),
    ],
    args: stageArgs(box, 'implement'),
  });
  refused(session, 'harness-test');
  assert.equal(box.read('agent-harness/tests/fixtures/x.json'), null);
  refused(session, 'changeset');
  assert.equal(box.read('.changeset/eval.md'), null);
  refused(session, 'lockfile');
  assert.equal(box.read('yarn.lock'), '# lockfile\n');
  ran(session, 'source');
});

it('the run budget stops a stage at its cap, even with disableAllHooks in user settings', async () => {
  const box = sandbox();
  activeRun(box, 1, 1);
  writeFileSync(
    join(box.configDir, 'settings.json'),
    JSON.stringify({ disableAllHooks: true })
  );
  const flags = stageArgs(box, 'gather-context').filter(
    (flag) => flag !== 'project'
  );
  const session = await runClaude(box, {
    script: [
      write('artifact', box, '.local/agent-harness/work/1/context-bundle.md'),
    ],
    args: flags,
  });
  refused(session, 'artifact');
  assert.equal(box.read('.local/agent-harness/work/1/context-bundle.md'), null);
});

it('no stage can rewrite the run file, ledger or decisions that bind it', async () => {
  const box = sandbox();
  activeRun(box, 50);
  const before = box.read('.local/agent-harness/work/.active-run.json');
  const session = await runClaude(box, {
    script: [
      write('run-file', box, '.local/agent-harness/work/.active-run.json'),
      write('ledger', box, '.local/agent-harness/work/1/tool-calls-it.log'),
      write(
        'decisions',
        box,
        '.local/agent-harness/work/1/intake-decisions.md'
      ),
      write('artifact', box, '.local/agent-harness/work/1/context-bundle.md'),
    ],
    args: stageArgs(box, 'gather-context'),
  });
  refused(session, 'run-file');
  assert.equal(box.read('.local/agent-harness/work/.active-run.json'), before);
  refused(session, 'ledger');
  refused(session, 'decisions');
  assert.equal(
    box.read('.local/agent-harness/work/1/intake-decisions.md'),
    null
  );
  ran(session, 'artifact');
});

it('a stage cannot turn a gh api read into a write with a later -X', async () => {
  const box = sandbox();
  const session = await runClaude(box, {
    script: [
      bash(
        'write',
        'gh api --method GET repos/o/r/issues/1/comments -X POST -f body=x'
      ),
      bash('read', 'gh api --method GET repos/o/r/issues/1'),
    ],
    args: stageArgs(box, 'gather-context'),
  });
  refused(session, 'write');
  ran(session, 'read');
  assert.deepEqual(box.shimCalls('gh'), [
    'api --method GET repos/o/r/issues/1',
  ]);
});

it('a stage that may run yarn cannot publish through yarn workspace', async () => {
  const box = sandbox();
  const session = await runClaude(box, {
    script: [
      bash(
        'publish',
        'yarn workspace @dt-dds/react-button publish --non-interactive'
      ),
      bash('twin', 'yarn lint'),
    ],
    args: stageArgs(box, 'implement'),
  });
  refused(session, 'publish');
  ran(session, 'twin');
  assert.deepEqual(box.shimCalls('yarn'), ['lint']);
});

// guard-bash sees `yarn deploy`, not the push a package script runs. The runner's session environment
// (session-env.mts) makes git refuse it; the same session without it shows the push would land.
it('a stage that runs a package script cannot push through it under the runner environment', async () => {
  const pushBlock = freshSessionEnv({});
  const sessions = await Promise.all(
    [pushBlock, {}].map(async (env) => {
      const box = sandbox();
      writeFileSync(
        join(box.bin, 'yarn'),
        [
          '#!/bin/sh',
          `printf '%s\\n' "$*" >> '${join(box.bin, 'yarn.log')}'`,
          'if [ "$1" = deploy ]; then exec git push -q origin HEAD:refs/heads/leak; fi',
          '',
        ].join('\n'),
        { mode: 0o755 }
      );
      const session = await runClaude(box, {
        script: [bash('deploy', 'yarn deploy'), bash('twin', 'yarn lint')],
        args: stageArgs(box, 'implement'),
        env,
      });
      ran(session, 'twin');
      assert.deepEqual(box.shimCalls('yarn'), ['deploy', 'lint']);
      return { box, session };
    })
  );
  const [blocked, open] = sessions;
  assert.ok(blocked && open);
  refused(blocked.session, 'deploy');
  assert.equal(blocked.box.remoteRefs(), '');
  ran(open.session, 'deploy');
  assert.match(open.box.remoteRefs(), /refs\/heads\/leak/);
});
