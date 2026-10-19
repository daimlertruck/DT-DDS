import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';

import { guidesIn, harnessFiles } from './harness.mts';
import { commitFile, createGitRepo } from '../../scripts/lib/test-support.mts';

const write = (root: string, path: string, content = 'x\n'): void => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
};

test('guidesIn keeps guide paths and drops node_modules, the harness dirs and blank lines', () => {
  assert.deepEqual(
    guidesIn(
      'AGENTS.md\nnode_modules/x/AGENTS.md\n.agents/skills/y/CLAUDE.md\nagent-harness/x/AGENTS.md\n\npackages/themes/CLAUDE.md\n'
    ),
    ['AGENTS.md', 'packages/themes/CLAUDE.md']
  );
});

test('harnessFiles lists tracked and git-excluded guides, and only the fixed paths that exist', () => {
  const root = createGitRepo();
  commitFile(root, 'AGENTS.md', '# contract\n', 'docs: add contract');
  commitFile(
    root,
    'packages/themes/AGENTS.md',
    '# themes\n',
    'docs: add guide'
  );
  writeFileSync(
    join(root, '.git/info/exclude'),
    '.agents/\napps/docs/CLAUDE.md\nnode_modules/\n'
  );
  write(root, 'apps/docs/CLAUDE.md', '@AGENTS.md\n');
  write(root, 'node_modules/pkg/AGENTS.md');
  write(root, '.agents/skills/s/AGENTS.md');
  write(root, '.claude/settings.json', '{}\n');
  write(root, 'agent-harness/hooks/guard-bash.mts');

  assert.deepEqual([...harnessFiles(root)].sort(), [
    '.agents',
    '.claude/settings.json',
    'AGENTS.md',
    'agent-harness',
    'apps/docs/CLAUDE.md',
    'packages/themes/AGENTS.md',
  ]);
});
