import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { excludeFileOf } from './setup.mts';
import { createGitRepo, git } from '../../scripts/lib/test-support.mts';

test('excludeFileOf finds the info/exclude a linked worktree shares with its main checkout', () => {
  const root = createGitRepo();
  const worktree = join(mkdtempSync(join(tmpdir(), 'git-worktree-')), 'wt');
  git(root, 'worktree', 'add', '-q', '-b', 'wt', worktree);
  const shared = readFileSync(join(root, '.git/info/exclude'), 'utf8');

  assert.equal(readFileSync(excludeFileOf(worktree), 'utf8'), shared);
  assert.equal(readFileSync(excludeFileOf(root), 'utf8'), shared);
});
