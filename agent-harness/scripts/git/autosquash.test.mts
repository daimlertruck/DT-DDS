// autosquash.mts in throwaway repos: a local bare repo stands in for origin, a fake `gh` answers the
// PR query, a fake `npx` stands in for commitlint.
import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  GIT_ENV,
  commitFile,
  createGitRepo,
  fakeCommand,
  git,
  type FakeCommand,
} from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./autosquash.mts', import.meta.url));

interface Setup {
  readonly root: string;
  readonly bare: string;
  readonly base: string;
}

// main with one commit; origin is an empty bare repo; branch fix/1/y holds two commits and the fixups.
const setup = ({ amend = false }: { readonly amend?: boolean } = {}): Setup => {
  const root = createGitRepo();
  const bare = mkdtempSync(join(tmpdir(), 'origin-'));
  git(bare, 'init', '-q', '--bare');
  git(root, 'remote', 'add', 'origin', bare);
  const base = git(root, 'rev-parse', 'HEAD');
  git(root, 'checkout', '-q', '-b', 'fix/1/y');
  commitFile(root, 'a.txt', 'a1\n', 'fix(a): first');
  commitFile(root, 'b.txt', 'b1\n', 'test(b): second');
  commitFile(root, 'a.txt', 'a2\n', 'fixup! fix(a): first');
  if (amend) {
    commitFile(
      root,
      'b.txt',
      'b2\n',
      'amend! test(b): second\n\ntest(b): second, renamed'
    );
  }
  return { root, bare, base };
};

interface ToolOptions {
  readonly prs?: string;
  readonly ghExit?: number;
  readonly npxExit?: number;
}

interface Tools {
  readonly gh: FakeCommand;
  readonly npx: FakeCommand;
  readonly env: NodeJS.ProcessEnv;
}

const tools = ({
  prs = '[]',
  ghExit = 0,
  npxExit = 0,
}: ToolOptions = {}): Tools => {
  const gh = fakeCommand('gh', {
    stdout: prs,
    exitCode: ghExit,
    stderr: 'HTTP 502',
  });
  const npx = fakeCommand('npx', {
    exitCode: npxExit,
    stderr: 'subject may not be empty',
  });
  return {
    gh,
    npx,
    env: {
      ...GIT_ENV,
      PATH: `${gh.bin}${delimiter}${npx.bin}${delimiter}${process.env.PATH}`,
    },
  };
};
const run = (
  root: string,
  base: string,
  env: NodeJS.ProcessEnv
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, '--base', base, '--root', root], {
    cwd: root,
    encoding: 'utf8',
    env,
  });
const subjects = (root: string, base: string): string[] =>
  git(root, 'log', '--format=%s', `${base}..HEAD`).split('\n').reverse();

test("folds this run's fixups when no PR and no remote branch exist; the tree is unchanged", () => {
  const { root, base } = setup();
  const { gh, env } = tools();
  const tree = git(root, 'rev-parse', 'HEAD^{tree}');
  const old = git(root, 'rev-parse', 'HEAD');

  const result = run(root, base, env);

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(subjects(root, base), ['fix(a): first', 'test(b): second']);
  assert.equal(git(root, 'rev-parse', 'HEAD^{tree}'), tree);
  assert.equal(git(root, 'show', 'HEAD~1:a.txt'), 'a2');
  assert.match(
    result.stdout,
    new RegExp(
      `^autosquash: done: 1 folded \\(fixup! 1\\); HEAD ${old.slice(
        0,
        12
      )} → [0-9a-f]{12}; tree ${tree.slice(0, 12)} unchanged$`,
      'm'
    )
  );
  assert.deepEqual(gh.calls(), [
    'pr list --head fix/1/y --state all --json number',
  ]);
  assert.equal(git(root, 'rev-parse', '--abbrev-ref', 'HEAD'), 'fix/1/y');
});

test('nothing to fold is not an error', () => {
  const { root, base } = setup();
  git(root, 'reset', '-q', '--hard', 'HEAD~1');
  const result = run(root, base, tools().env);

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /^autosquash: nothing to do \(no fixup!\/amend! commits after [0-9a-f]{12}\)$/m
  );
});

test('an amend! message is checked with commitlint after the fold; a failure restores the old history', () => {
  const ok = setup({ amend: true });
  const passed = run(ok.root, ok.base, tools().env);
  assert.equal(passed.status, 0, passed.stderr);
  assert.deepEqual(subjects(ok.root, ok.base), [
    'fix(a): first',
    'test(b): second, renamed',
  ]);

  const bad = setup({ amend: true });
  const old = git(bad.root, 'rev-parse', 'HEAD');
  const { npx, env } = tools({ npxExit: 1 });
  const failed = run(bad.root, bad.base, env);
  assert.equal(failed.status, 1);
  assert.match(
    failed.stdout,
    /^autosquash: refused: commitlint failed on the folded messages; HEAD restored to [0-9a-f]{12}/m
  );
  assert.equal(git(bad.root, 'rev-parse', 'HEAD'), old);
  assert.match(
    npx.calls()[0] ?? '',
    /^--no -- commitlint --from [0-9a-f]{40} --to HEAD$/
  );
});

test('refused, with nothing changed, when a PR exists, GitHub is unreadable, or a remote branch exists', () => {
  const cases: readonly (readonly [ToolOptions, 'remote' | null, RegExp])[] = [
    [
      { prs: '[{"number":12}]' },
      null,
      /a pull request exists for fix\/1\/y \(#12\)/,
    ],
    [{ ghExit: 1 }, null, /cannot tell whether a pull request exists/],
    [{}, 'remote', /fix\/1\/y exists on origin/],
  ];
  cases.forEach(([options, remote, reason]) => {
    const { root, bare, base } = setup();
    if (remote) git(bare, 'fetch', '-q', root, 'fix/1/y:fix/1/y');
    const old = git(root, 'rev-parse', 'HEAD');
    const result = run(root, base, tools(options).env);
    assert.equal(result.status, 1, String(reason));
    assert.match(result.stdout, reason);
    assert.match(result.stdout, /^autosquash: refused: /m);
    assert.equal(git(root, 'rev-parse', 'HEAD'), old);
  });
});

test('refused when a fixup targets a commit outside this run, on main, or with a dirty tree', () => {
  const foreign = setup();
  commitFile(foreign.root, 'c.txt', 'c\n', 'fixup! chore: initial commit');
  const outside = run(foreign.root, foreign.base, tools().env);
  assert.equal(outside.status, 1);
  assert.match(
    outside.stdout,
    /fixup! chore: initial commit targets no commit of this run/
  );

  const dirty = setup();
  writeFileSync(join(dirty.root, 'a.txt'), 'edited\n');
  assert.match(
    run(dirty.root, dirty.base, tools().env).stdout,
    /the working tree is not clean/
  );

  const onMain = setup();
  git(onMain.root, 'checkout', '-q', 'main');
  assert.match(
    run(onMain.root, onMain.base, tools().env).stdout,
    /not on a feature branch \(main\)/
  );
});

test('a conflict aborts the rebase and leaves the branch as it was', () => {
  const { root, base } = setup();
  // A fixup that cannot apply where it moves to: it edits a line the commit between them changed.
  commitFile(root, 'b.txt', 'b-changed\n', 'test(b): third');
  commitFile(root, 'b.txt', 'b-fixed\n', 'fixup! test(b): second');
  const old = git(root, 'rev-parse', 'HEAD');

  const result = run(root, base, tools().env);

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    new RegExp(
      `^autosquash: aborted: the rebase stopped on a conflict; git rebase --abort restored HEAD ${old.slice(
        0,
        12
      )}`,
      'm'
    )
  );
  assert.equal(git(root, 'rev-parse', 'HEAD'), old);
  assert.equal(
    spawnSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' })
      .stdout,
    ''
  );
});
