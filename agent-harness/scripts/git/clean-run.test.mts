import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { GIT_ENV, createGitRepo } from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./clean-run.mts', import.meta.url));

interface SetupOptions {
  readonly active?: boolean;
  readonly atStart?: readonly string[] | null;
}

interface Setup {
  readonly root: string;
  readonly write: (path: string, content?: string) => void;
}

// A repo with an active run of issue 7 whose state lists what was untracked when it started.
const setup = ({
  active = true,
  atStart = ['notes/mine.md'],
}: SetupOptions = {}): Setup => {
  const root = createGitRepo();
  writeFileSync(join(root, '.gitignore'), 'dist/\n');
  const write = (path: string, content = 'x\n'): void => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  };
  write('notes/mine.md');
  mkdirSync(join(root, '.local/agent-harness/work/7'), { recursive: true });
  writeFileSync(
    join(root, '.local/agent-harness/work/7/run-state.json'),
    JSON.stringify({ runId: 'r1', untrackedAtStart: atStart })
  );
  if (active) {
    writeFileSync(
      join(root, '.local/agent-harness/work/.active-run.json'),
      JSON.stringify({
        issue: 7,
        lane: '1',
        maxToolCalls: 10,
        runId: 'r1',
      })
    );
  }
  return { root, write };
};
const clean = (
  root: string,
  ...paths: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, ...paths], {
    cwd: root,
    encoding: 'utf8',
    env: { ...GIT_ENV, CLAUDE_PROJECT_DIR: root },
  });

test('deletes files and folders this run created', () => {
  const { root, write } = setup();
  write('packages/x/src/StoryProbe.test.tsx');
  write('tmp-probe/a.txt');
  write('tmp-probe/b/c.txt');

  const result = clean(root, 'packages/x/src/StoryProbe.test.tsx', 'tmp-probe');

  assert.equal(result.status, 0, result.stderr + result.stdout);
  assert.equal(
    existsSync(join(root, 'packages/x/src/StoryProbe.test.tsx')),
    false
  );
  assert.equal(existsSync(join(root, 'tmp-probe')), false);
  assert.match(
    result.stdout,
    /^deleted: packages\/x\/src\/StoryProbe\.test\.tsx$/m
  );
  assert.match(result.stdout, /^deleted: tmp-probe \(2 files\)$/m);
});

test('refuses tracked, ignored, pre-existing, outside and missing paths, and then deletes nothing', () => {
  const { root, write } = setup();
  write('dist/out.js');
  write('created.txt');
  const outside = mkdtempSync(join(tmpdir(), 'outside-'));

  const result = clean(
    root,
    'created.txt',
    'README.md',
    'dist/out.js',
    'notes/mine.md',
    '../escape.txt',
    outside,
    '.local/agent-harness/work/7/run-state.json',
    'nope.txt'
  );

  assert.equal(result.status, 1);
  assert.match(result.stdout, /refused: README\.md: tracked by git/);
  assert.match(result.stdout, /refused: dist\/out\.js: ignored by git/);
  assert.match(
    result.stdout,
    /refused: notes\/mine\.md: existed when the run started/
  );
  assert.match(result.stdout, /refused: \.\.\/escape\.txt: outside the repo/);
  assert.match(result.stdout, /refused: .*outside-.*: outside the repo/);
  assert.match(
    result.stdout,
    /refused: \.local\/agent-harness\/work\/7\/run-state\.json: ignored by git/
  );
  assert.match(result.stdout, /refused: nope\.txt: does not exist/);
  assert.match(result.stdout, /nothing deleted/);
  assert.ok(existsSync(join(root, 'created.txt')));
});

test('a folder holding a tracked, ignored or pre-existing file is refused', () => {
  const { root, write } = setup();
  write('notes/new.md');
  write('build/dist/x.js');
  write('build/new.txt');

  const result = clean(root, 'notes', 'build');

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /refused: notes: holds notes\/mine\.md, which existed when the run started/
  );
  assert.match(
    result.stdout,
    /refused: build: holds ignored files \(build\/dist\/\)/
  );
});

test('a symlink the run created is removed as a link, never followed', () => {
  const { root } = setup();
  const outside = mkdtempSync(join(tmpdir(), 'target-'));
  writeFileSync(join(outside, 'keep.txt'), 'keep\n');
  symlinkSync(outside, join(root, 'new-link'));

  const result = clean(root, 'new-link');

  assert.equal(result.status, 0, result.stdout);
  assert.equal(existsSync(join(root, 'new-link')), false);
  assert.ok(existsSync(join(outside, 'keep.txt')));
});

test('no active run, or no record of what existed at its start: refuses', () => {
  const idle = setup({ active: false });
  idle.write('created.txt');
  assert.match(
    clean(idle.root, 'created.txt').stdout,
    /refused: no pipeline run is active/
  );

  const unrecorded = setup({ atStart: null });
  unrecorded.write('created.txt');
  assert.match(
    clean(unrecorded.root, 'created.txt').stdout,
    /refused: the run did not record what existed at its start/
  );
  assert.ok(existsSync(join(unrecorded.root, 'created.txt')));
});
