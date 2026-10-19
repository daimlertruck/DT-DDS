import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
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

import { isRecord, type JsonObject } from '../lib/json.mts';
import { GIT_ENV, createGitRepo, git } from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./sandbox.mts', import.meta.url));

const run = (
  root: string,
  sandboxes: string,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync(
    'node',
    [script, ...args, '--root', root, '--sandboxes', sandboxes],
    {
      encoding: 'utf8',
      env: GIT_ENV,
    }
  );

const setup = (): { readonly root: string; readonly sandboxes: string } => ({
  root: createGitRepo(),
  sandboxes: mkdtempSync(join(tmpdir(), 'sandboxes-')),
});

const create = (
  root: string,
  sandboxes: string,
  name = 'probe-1',
  ...extra: readonly string[]
): SpawnSyncReturns<string> =>
  run(
    root,
    sandboxes,
    'create',
    name,
    '--issue',
    '42',
    '--stage',
    'ds-verify-changes',
    '--purpose',
    'generator probe',
    '--keep-until',
    'G5',
    '--logs',
    'out.log,results',
    ...extra
  );

const manifestOf = (sandboxes: string, name = 'probe-1'): JsonObject => {
  const manifest: unknown = JSON.parse(
    readFileSync(join(sandboxes, `${name}.sandbox.json`), 'utf8')
  );
  assert.ok(isRecord(manifest), 'the manifest is a JSON object');
  return manifest;
};

test('create clones the repo outside it, with pushing disabled, and writes a manifest', () => {
  const { root, sandboxes } = setup();
  const headBefore = git(root, 'rev-parse', 'HEAD');

  const result = create(root, sandboxes);

  assert.equal(result.status, 0, result.stderr);
  const clone = join(sandboxes, 'probe-1');
  assert.equal(readFileSync(join(clone, 'README.md'), 'utf8'), '# Example\n');
  assert.equal(
    git(clone, 'remote', 'get-url', '--push', 'origin'),
    'DISABLED-sandbox-probe-1'
  );
  assert.equal(
    git(clone, 'rev-parse', 'base/main'),
    git(root, 'rev-parse', 'origin/main')
  );
  assert.equal(git(clone, 'config', '--local', 'commit.gpgsign'), 'false');
  const manifest = manifestOf(sandboxes);
  assert.deepEqual(
    { ...manifest, created: typeof manifest.created },
    {
      name: 'probe-1',
      path: clone,
      issue: '42',
      stage: 'ds-verify-changes',
      purpose: 'generator probe',
      keepUntil: 'G5',
      logs: ['out.log', 'results'],
      head: headBefore,
      created: 'string',
    }
  );
  assert.equal(git(root, 'rev-parse', 'HEAD'), headBefore);
  assert.equal(git(root, 'status', '--porcelain'), '');
  assert.match(result.stdout, new RegExp(`created ${clone}`));
});

test('create refuses a sandboxes dir inside the repo, an existing name and an unsafe name', () => {
  const { root, sandboxes } = setup();

  const inside = run(
    root,
    join(root, 'sandboxes'),
    'create',
    'probe-1',
    '--issue',
    '42',
    '--keep-until',
    'G5'
  );
  assert.equal(inside.status, 2);
  assert.match(inside.stderr, /the sandboxes dir must be outside the repo/);
  assert.equal(existsSync(join(root, 'sandboxes')), false);

  assert.equal(create(root, sandboxes).status, 0);
  const again = create(root, sandboxes);
  assert.equal(again.status, 1);
  assert.match(again.stderr, /sandbox probe-1 already exists/);

  ['../escape', 'Probe', '', 'a/b'].forEach((name) => {
    const result = create(root, sandboxes, name);
    assert.equal(result.status, 2, `name ${JSON.stringify(name)}`);
    assert.match(result.stderr, /usage: /);
  });
});

test('list shows each sandbox with its issue, stage, purpose and keep-until gate', () => {
  const { root, sandboxes } = setup();
  create(root, sandboxes);
  create(root, sandboxes, 'probe-2');

  const result = run(root, sandboxes, 'list');

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /probe-1 · #42 · ds-verify-changes · generator probe · keep until G5 · /
  );
  assert.match(result.stdout, /probe-2 · #42 · /);
});

test('close copies the declared logs into the work dir, verifies them and deletes the sandbox', () => {
  const { root, sandboxes } = setup();
  create(root, sandboxes);
  const clone = join(sandboxes, 'probe-1');
  writeFileSync(join(clone, 'out.log'), 'probe output\n');
  mkdirSync(join(clone, 'results'));
  writeFileSync(join(clone, 'results/a.txt'), 'result a\n');

  const result = run(root, sandboxes, 'close', 'probe-1');

  assert.equal(result.status, 0, result.stderr);
  const logs = join(root, '.local/agent-harness/work/42/logs/probe-1');
  assert.equal(readFileSync(join(logs, 'out.log'), 'utf8'), 'probe output\n');
  assert.equal(readFileSync(join(logs, 'results/a.txt'), 'utf8'), 'result a\n');
  assert.equal(existsSync(clone), false);
  assert.equal(existsSync(join(sandboxes, 'probe-1.sandbox.json')), false);
  assert.match(
    result.stdout,
    /kept 2 log files in .local\/agent-harness\/work\/42\/logs\/probe-1/
  );
  assert.match(result.stdout, /deleted sandbox probe-1/);
});

test('close refuses while a declared log is missing and keeps the sandbox, unless --force', () => {
  const { root, sandboxes } = setup();
  create(root, sandboxes);
  writeFileSync(join(sandboxes, 'probe-1/out.log'), 'probe output\n');

  const refused = run(root, sandboxes, 'close', 'probe-1');

  assert.equal(refused.status, 1);
  assert.match(refused.stderr, /declared log results is missing/);
  assert.ok(existsSync(join(sandboxes, 'probe-1/out.log')));

  const forced = run(root, sandboxes, 'close', 'probe-1', '--force');

  assert.equal(forced.status, 0, forced.stderr);
  assert.equal(
    readFileSync(
      join(root, '.local/agent-harness/work/42/logs/probe-1/out.log'),
      'utf8'
    ),
    'probe output\n'
  );
  assert.equal(existsSync(join(sandboxes, 'probe-1')), false);
});

test('close refuses when a log destination already holds different content', () => {
  const { root, sandboxes } = setup();
  create(root, sandboxes, 'probe-1', '--logs', 'out.log');
  writeFileSync(join(sandboxes, 'probe-1/out.log'), 'new output\n');
  mkdirSync(join(root, '.local/agent-harness/work/42/logs/probe-1'), {
    recursive: true,
  });
  writeFileSync(
    join(root, '.local/agent-harness/work/42/logs/probe-1/out.log'),
    'older output\n'
  );

  const result = run(root, sandboxes, 'close', 'probe-1');

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /.local\/agent-harness\/work\/42\/logs\/probe-1\/out.log exists with different content/
  );
  assert.ok(existsSync(join(sandboxes, 'probe-1')));
});

test('close never deletes a path that is not that sandbox', () => {
  const { root, sandboxes } = setup();
  create(root, sandboxes, 'probe-1', '--logs', '');
  const manifestPath = join(sandboxes, 'probe-1.sandbox.json');
  writeFileSync(
    manifestPath,
    JSON.stringify({ ...manifestOf(sandboxes), path: root })
  );

  const result = run(root, sandboxes, 'close', 'probe-1', '--force');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /is not the sandbox path/);
  assert.ok(existsSync(join(root, 'README.md')));
  assert.ok(existsSync(join(sandboxes, 'probe-1')));
});

test('close refuses an unknown sandbox', () => {
  const { root, sandboxes } = setup();

  const result = run(root, sandboxes, 'close', 'probe-9');

  assert.equal(result.status, 1);
  assert.match(result.stderr, /no sandbox probe-9/);
});
