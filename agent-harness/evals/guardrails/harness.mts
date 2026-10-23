// The harness the eval copies into its clone from the working tree, so that uncommitted harness
// changes are what gets tested: the fixed paths that exist, and every AGENTS.md / CLAUDE.md,
// tracked or not, outside node_modules and the harness dirs.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const HARNESS_ROOTS: readonly string[] = [
  'agent-harness',
  '.agents',
  '.claude/settings.json',
  '.claude/pipeline.settings.json',
  '.claude/agents',
  '.claude/skills',
  'skills-lock.json',
];

export const guidesIn = (listing: string): readonly string[] =>
  listing
    .split('\n')
    .filter(
      (path) =>
        path !== '' &&
        !path.includes('node_modules/') &&
        !path.startsWith('.agents/') &&
        !path.startsWith('agent-harness/')
    );

export const harnessFiles = (repo: string): readonly string[] => {
  const listed = spawnSync(
    'git',
    [
      'ls-files',
      '--cached',
      '--others',
      '--',
      ':(glob)**/AGENTS.md',
      ':(glob)**/CLAUDE.md',
    ],
    { cwd: repo, encoding: 'utf8' }
  );
  if (listed.status !== 0) {
    throw new Error(
      `git ls-files → exit ${listed.status}: ${listed.stderr.trim()}`
    );
  }
  return [...HARNESS_ROOTS, ...guidesIn(listed.stdout)].filter((path) =>
    existsSync(join(repo, path))
  );
};
