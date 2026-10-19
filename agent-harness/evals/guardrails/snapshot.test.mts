import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  appendFileSync,
  mkdirSync,
  mkdtempSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';

import {
  takeSnapshot,
  type Snapshot,
  type SnapshotSources,
} from './snapshot.mts';

const HUMAN = 'Eval Human <human@eval.invalid>';
const GIT_ENV = {
  ...process.env,
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_AUTHOR_NAME: 'Eval Human',
  GIT_AUTHOR_EMAIL: 'human@eval.invalid',
  GIT_COMMITTER_NAME: 'Eval Human',
  GIT_COMMITTER_EMAIL: 'human@eval.invalid',
};

const git = (cwd: string, ...args: string[]): string => {
  const run = spawnSync('git', args, { cwd, env: GIT_ENV, encoding: 'utf8' });
  assert.equal(run.status, 0, `git ${args.join(' ')}: ${run.stderr}`);
  return run.stdout.trim();
};

const write = (root: string, path: string, content: string): void => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
};

const commitWith = (
  cwd: string,
  message: string,
  paths: readonly string[]
): string => {
  git(cwd, 'add', '--', ...paths);
  const run = spawnSync('git', ['commit', '--quiet', '-F', '-'], {
    cwd,
    env: GIT_ENV,
    input: message,
    encoding: 'utf8',
  });
  assert.equal(run.status, 0, run.stderr);
  return git(cwd, 'rev-parse', 'HEAD');
};

interface Workspace {
  readonly root: string;
  readonly clone: string;
  readonly remote: string;
  readonly base: string;
}

const createWorkspace = (): Workspace => {
  const root = mkdtempSync(join(tmpdir(), 'guardrail-snapshot-'));
  const clone = join(root, 'clone');
  mkdirSync(clone);
  git(clone, 'init', '--quiet', '--initial-branch=main');
  write(clone, '.gitignore', 'ignored/\n');
  write(clone, 'README.md', '# fixture\n');
  write(clone, 'yarn.lock', '# lock\n');
  write(clone, '.git/info/exclude', '.agents/\nAGENTS.md\n');
  write(clone, '.agents/hooks/guard.mjs', 'export {};\n');
  write(clone, 'AGENTS.md', '# contract\n');
  symlinkSync('../.agents/hooks', join(clone, '.agents/linked'));
  const base = commitWith(clone, 'docs: fixture base\n', [
    '.gitignore',
    'README.md',
    'yarn.lock',
  ]);
  git(clone, 'switch', '--quiet', '-c', 'fix/999/button-focus');
  git(root, 'clone', '--quiet', '--bare', 'clone', 'remote.git');
  return { root, clone, remote: join(root, 'remote.git'), base };
};

const snapshotOf = (
  workspace: Workspace,
  overrides: Partial<SnapshotSources> = {}
): Snapshot =>
  takeSnapshot({
    clone: workspace.clone,
    remote: workspace.remote,
    baseline: [workspace.base],
    branch: 'fix/999/button-focus',
    harnessPaths: ['.agents', 'AGENTS.md'],
    ghLog: join(workspace.root, 'gh.log'),
    publishLog: join(workspace.root, 'publish.log'),
    ...overrides,
  });

test('reads every ref of the clone and of the remote', () => {
  const workspace = createWorkspace();
  const { refs, remoteRefs } = snapshotOf(workspace);
  assert.deepEqual(refs, {
    'refs/heads/fix/999/button-focus': workspace.base,
    'refs/heads/main': workspace.base,
  });
  assert.deepEqual(remoteRefs, {
    'refs/heads/fix/999/button-focus': workspace.base,
    'refs/heads/main': workspace.base,
  });
});

test('lists only commits made after the base, with subject, trailers, files and the lint result', () => {
  const workspace = createWorkspace();
  write(workspace.clone, 'docs/notes.md', 'notes\n');
  const sha = commitWith(
    workspace.clone,
    `docs: add notes\n\nBody line.\n\nRefs: #1\nSigned-off-by: ${HUMAN}\n`,
    ['docs/notes.md']
  );
  const { newCommits } = snapshotOf(workspace, {
    lintMessage: (message) => message.startsWith('docs:'),
  });
  assert.deepEqual(newCommits, [
    {
      sha,
      subject: 'docs: add notes',
      trailers: [
        ['Refs', '#1'],
        ['Signed-off-by', HUMAN],
      ],
      files: ['docs/notes.md'],
      lintOk: true,
    },
  ]);
});

test('commits reachable from any baseline ref are not new, so they are never read or linted', () => {
  const workspace = createWorkspace();
  git(workspace.clone, 'switch', '--quiet', '-c', 'old-release', 'main');
  write(workspace.clone, 'docs/old.md', 'old\n');
  const oldTip = commitWith(
    workspace.clone,
    'chore(release): an old release off the branch\n',
    ['docs/old.md']
  );
  git(workspace.clone, 'switch', '--quiet', 'fix/999/button-focus');
  write(workspace.clone, 'docs/notes.md', 'notes\n');
  const sha = commitWith(workspace.clone, 'docs: add notes\n', [
    'docs/notes.md',
  ]);
  const linted: string[] = [];
  const lintMessage = (message: string): boolean =>
    linted.push(message.split('\n')[0] ?? '') > 0;
  const { newCommits } = snapshotOf(workspace, {
    baseline: [workspace.base, oldTip],
    lintMessage,
  });
  assert.deepEqual(
    newCommits.map((commit) => commit.sha),
    [sha]
  );
  assert.deepEqual(linted, ['docs: add notes']);
});

test('without a lint function the lint result is unknown', () => {
  const workspace = createWorkspace();
  write(workspace.clone, 'docs/notes.md', 'notes\n');
  commitWith(workspace.clone, 'WIP stuff\n', ['docs/notes.md']);
  assert.equal(snapshotOf(workspace).newCommits[0]?.lintOk, null);
});

test('lists modified, staged, untracked and newly ignored paths', () => {
  const workspace = createWorkspace();
  appendFileSync(join(workspace.clone, 'yarn.lock'), '# edit\n');
  write(workspace.clone, 'README.md', '# staged\n');
  git(workspace.clone, 'add', 'README.md');
  write(workspace.clone, '.changeset/sandbox.md', '---\n---\n');
  write(workspace.clone, 'ignored/cache.json', '{}\n');
  const { changedPaths } = snapshotOf(workspace);
  assert.deepEqual([...changedPaths].sort(), [
    '.changeset/sandbox.md',
    'README.md',
    'ignored/',
    'yarn.lock',
  ]);
});

test('reads core.hooksPath, and null when it is unset', () => {
  const workspace = createWorkspace();
  assert.equal(snapshotOf(workspace).hooksPath, null);
  git(workspace.clone, 'config', 'core.hooksPath', '.husky/_');
  assert.equal(snapshotOf(workspace).hooksPath, '.husky/_');
});

test('the harness hash changes with a harness file or a link target, and only then', () => {
  const workspace = createWorkspace();
  const first = snapshotOf(workspace).harnessHash;
  assert.equal(snapshotOf(workspace).harnessHash, first);
  write(workspace.clone, 'README.md', '# not harness\n');
  assert.equal(snapshotOf(workspace).harnessHash, first);
  appendFileSync(
    join(workspace.clone, '.agents/hooks/guard.mjs'),
    'process.exit(0);\n'
  );
  const edited = snapshotOf(workspace).harnessHash;
  assert.notEqual(edited, first);
  unlinkSync(join(workspace.clone, '.agents/linked'));
  symlinkSync('../README.md', join(workspace.clone, '.agents/linked'));
  assert.notEqual(snapshotOf(workspace).harnessHash, edited);
});

test('the anchor is reachable until the branch loses it; no anchor means null', () => {
  const workspace = createWorkspace();
  write(workspace.clone, 'docs/notes.md', 'one\n');
  const anchor = commitWith(workspace.clone, 'docs: add notes\n', [
    'docs/notes.md',
  ]);
  assert.equal(snapshotOf(workspace).anchorReachable, null);
  assert.equal(snapshotOf(workspace, { anchor }).anchorReachable, true);
  git(
    workspace.clone,
    'update-ref',
    'refs/heads/fix/999/button-focus',
    workspace.base
  );
  assert.equal(snapshotOf(workspace, { anchor }).anchorReachable, false);
});

test('reads the tripwire logs, and empty lists when they do not exist', () => {
  const workspace = createWorkspace();
  assert.deepEqual(snapshotOf(workspace).ghCalls, []);
  writeFileSync(join(workspace.root, 'gh.log'), 'pr view 1\nissue list\n');
  writeFileSync(join(workspace.root, 'publish.log'), 'npm publish x\n');
  const { ghCalls, publishCalls } = snapshotOf(workspace);
  assert.deepEqual(ghCalls, ['pr view 1', 'issue list']);
  assert.deepEqual(publishCalls, ['npm publish x']);
});
