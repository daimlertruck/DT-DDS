import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { freshSessionEnv } from './session-env.mts';

const NO_PUSH = {
  GIT_CONFIG_COUNT: '1',
  GIT_CONFIG_KEY_0: 'url.agents-may-not-push://.pushInsteadOf',
  GIT_CONFIG_VALUE_0: '',
};

test('a stage session gets PWD set to its own cwd and no OLDPWD', () => {
  const parent = {
    PWD: '/Users/x/desktop/repo',
    OLDPWD: '/Users/x/desktop/repo',
    CLAUDE_EFFORT: 'xhigh',
    KEEP: '1',
  };

  assert.deepEqual(freshSessionEnv(parent, '/Users/x/Desktop/repo'), {
    PWD: '/Users/x/Desktop/repo',
    KEEP: '1',
    ...NO_PUSH,
  });
});

test('without a cwd the inherited PWD stays; OLDPWD and parent-session variables still go', () => {
  const parent = {
    PWD: '/repo',
    OLDPWD: '/elsewhere',
    CLAUDECODE: '1',
    CLAUDE_CODE_SESSION_ID: 'parent',
    KEEP: '1',
  };

  assert.deepEqual(freshSessionEnv(parent), {
    PWD: '/repo',
    KEEP: '1',
    ...NO_PUSH,
  });
});

test('the push block is added after git config the parent already passes in the environment', () => {
  const env = freshSessionEnv({
    GIT_CONFIG_COUNT: '1',
    GIT_CONFIG_KEY_0: 'core.pager',
    GIT_CONFIG_VALUE_0: 'cat',
  });

  assert.equal(env.GIT_CONFIG_COUNT, '2');
  assert.equal(env.GIT_CONFIG_KEY_0, 'core.pager');
  assert.equal(env.GIT_CONFIG_VALUE_0, 'cat');
  assert.equal(
    env.GIT_CONFIG_KEY_1,
    'url.agents-may-not-push://.pushInsteadOf'
  );
  assert.equal(env.GIT_CONFIG_VALUE_1, '');
});

// The block holds whatever runs the push: a guard sees only the command text, git sees every push.
test('under a stage session environment git refuses every push and still fetches', () => {
  const base = mkdtempSync(join(tmpdir(), 'session-env-'));
  const run = (cwd: string, args: readonly string[], env = process.env) =>
    spawnSync('git', args, { cwd, env, encoding: 'utf8' });
  const local = {
    ...process.env,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_AUTHOR_NAME: 'Test Agent',
    GIT_AUTHOR_EMAIL: 'agent@test.invalid',
    GIT_COMMITTER_NAME: 'Test Agent',
    GIT_COMMITTER_EMAIL: 'agent@test.invalid',
    GIT_TERMINAL_PROMPT: '0',
  };
  run(base, ['init', '-q', '--bare', 'remote.git'], local);
  run(base, ['init', '-q', '-b', 'main', 'repo'], local);
  const repo = join(base, 'repo');
  const remote = join(base, 'remote.git');
  run(repo, ['commit', '-q', '--allow-empty', '-m', 'chore: init'], local);
  run(repo, ['remote', 'add', 'origin', remote], local);
  const session = freshSessionEnv(local, repo);

  // `.invalid` never resolves: no run of this test can reach a real remote.
  ['origin', remote, 'https://example.invalid/repo.git'].forEach((target) => {
    const push = run(repo, ['push', '-q', target, 'main'], session);
    assert.notEqual(push.status, 0, `push to ${target} ran`);
    assert.match(push.stderr, /agents-may-not-push/);
  });
  assert.equal(run(remote, ['for-each-ref'], local).stdout, '');
  assert.equal(run(repo, ['fetch', '-q', 'origin'], session).status, 0);
});
