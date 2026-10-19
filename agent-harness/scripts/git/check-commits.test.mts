// check-commits.mts in a throwaway repo: every commit on the branch carries exactly one human
// Signed-off-by, as its last trailer, and no commit body mentions the harness.
import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { GIT_ENV, createGitRepo, git } from '../lib/test-support.mts';

const script = fileURLToPath(new URL('./check-commits.mts', import.meta.url));
const HUMAN = 'Signed-off-by: Test <test@invalid>';
const OTHER = 'Refs: #1';

const repoWith = (...messages: readonly string[]): string => {
  const root = createGitRepo();
  git(root, 'checkout', '-q', '-b', 'fix/1/x');
  messages.forEach((message) =>
    git(root, 'commit', '-q', '--allow-empty', '-m', message)
  );
  return root;
};
const check = (
  root: string,
  ...args: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: GIT_ENV,
  });

test('commits with one human sign-off, last, and team-facing bodies pass', () => {
  const result = check(repoWith(`fix: a\n\nWhy it changed.\n\n${HUMAN}`));

  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /^commits: 1 \(origin\/main\.\.HEAD\)$/m);
  assert.match(result.stdout, /^signoff: ok$/m);
  assert.match(result.stdout, /^bodies: ok$/m);
});

test('a missing, doubled or misplaced sign-off fails, naming the commit and why', () => {
  const root = repoWith(
    `fix: none\n\n${OTHER}`,
    `fix: two\n\n${HUMAN}\n${HUMAN}`,
    `fix: order\n\n${HUMAN}\n${OTHER}`
  );
  const result = check(root);

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /^BAD-SIGNOFF [0-9a-f]{12} fix: none — no Signed-off-by$/m
  );
  assert.match(
    result.stdout,
    /^BAD-SIGNOFF [0-9a-f]{12} fix: two — 2 Signed-off-by trailers$/m
  );
  assert.match(
    result.stdout,
    /^BAD-SIGNOFF [0-9a-f]{12} fix: order — the last trailer is not the human sign-off$/m
  );
});

test('an agent or other sign-off is not the human one', () => {
  const result = check(
    repoWith('fix: a\n\nSigned-off-by: Claude <noreply@anthropic.com>')
  );

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /BAD-SIGNOFF .* — the last trailer is not the human sign-off/
  );
});

test('a harness word in a commit body fails, quoting the line', () => {
  const result = check(
    repoWith(`fix: a\n\nFound in the trial run (G4).\n\n${HUMAN}`)
  );

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /^HARNESS-WORD [0-9a-f]{12} fix: a — Found in the trial run \(G4\)\.$/m
  );
});

test('fixup and amend subjects are listed, not failed; --base picks the range', () => {
  const root = repoWith(`fix: a\n\n${HUMAN}`, `fixup! fix: a\n\n${HUMAN}`);
  const result = check(root, '--base', 'HEAD~1');

  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /^commits: 1 \(HEAD~1\.\.HEAD\)$/m);
  assert.match(result.stdout, /^fixups: fixup! fix: a$/m);
});

test('no commits on the branch is reported, not a pass by silence', () => {
  const result = check(repoWith());

  assert.equal(result.status, 1);
  assert.match(
    result.stdout,
    /^commits: 0 \(origin\/main\.\.HEAD\): nothing to check$/m
  );
});
