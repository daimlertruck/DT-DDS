import assert from 'node:assert/strict';
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { isRecord } from './lib/json.mts';

const script = fileURLToPath(new URL('./sync-skills.mts', import.meta.url));

interface RepoOptions {
  readonly canonical?: readonly string[];
  readonly claude?: 'dir' | 'whole-dir-link' | null;
}

const createRepo = ({
  canonical = [],
  claude = null,
}: RepoOptions = {}): string => {
  const root = mkdtempSync(join(tmpdir(), 'sync-skills-'));
  canonical.forEach((name) => {
    mkdirSync(join(root, '.agents/skills', name), { recursive: true });
    writeFileSync(
      join(root, '.agents/skills', name, 'SKILL.md'),
      `# ${name}\n`
    );
  });
  if (claude === 'dir') {
    mkdirSync(join(root, '.claude/skills'), { recursive: true });
  }
  if (claude === 'whole-dir-link') {
    mkdirSync(join(root, '.claude'), { recursive: true });
    symlinkSync('../.agents/skills', join(root, '.claude/skills'));
  }
  return root;
};

const addRealSkill = (
  root: string,
  dir: string,
  name: string,
  content = `# ${name}\n`
): void => {
  mkdirSync(join(root, dir, name), { recursive: true });
  writeFileSync(join(root, dir, name, 'SKILL.md'), content);
};

const run = (
  root: string,
  ...flags: readonly string[]
): SpawnSyncReturns<string> =>
  spawnSync('node', [script, '--root', root, ...flags], { encoding: 'utf8' });

const isLinkTo = (
  root: string,
  linkPath: string,
  expectedTarget: string
): boolean =>
  lstatSync(join(root, linkPath)).isSymbolicLink() &&
  readlinkSync(join(root, linkPath)) === expectedTarget;

// The systemMessage of a --json run (its stdout is one JSON object); '' when it has none.
const systemMessageOf = (stdout: string): string => {
  const parsed: unknown = JSON.parse(stdout);
  return isRecord(parsed) && typeof parsed.systemMessage === 'string'
    ? parsed.systemMessage
    : '';
};

test('check mode reports missing links and exits non-zero without changing anything', () => {
  const root = createRepo({ canonical: ['alpha'], claude: 'dir' });

  const result = run(root);

  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing-link .claude\/skills\/alpha/);
  assert.equal(existsSync(join(root, '.claude/skills/alpha')), false);
});

test('fix mode links every canonical skill into .claude/skills with a relative per-skill link', () => {
  const root = createRepo({ canonical: ['alpha', 'beta'] });

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.ok(
    isLinkTo(root, '.claude/skills/alpha', '../../.agents/skills/alpha')
  );
  assert.ok(isLinkTo(root, '.claude/skills/beta', '../../.agents/skills/beta'));
});

test('fix mode replaces a legacy whole-directory link with per-skill links', () => {
  const root = createRepo({ canonical: ['alpha'], claude: 'whole-dir-link' });

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.equal(lstatSync(join(root, '.claude/skills')).isSymbolicLink(), false);
  assert.ok(
    isLinkTo(root, '.claude/skills/alpha', '../../.agents/skills/alpha')
  );
});

test('fix mode moves a skill another agent created in a tool dir into canonical and links it back', () => {
  const root = createRepo({ canonical: ['alpha'], claude: 'dir' });
  addRealSkill(root, '.claude/skills', 'gamma', '# gamma from another agent\n');

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.equal(
    readFileSync(join(root, '.agents/skills/gamma/SKILL.md'), 'utf8'),
    '# gamma from another agent\n'
  );
  assert.ok(
    isLinkTo(root, '.claude/skills/gamma', '../../.agents/skills/gamma')
  );
});

test('a real skill dir whose name already exists in canonical is a conflict and is never moved', () => {
  const root = createRepo({ canonical: ['alpha'], claude: 'dir' });
  addRealSkill(root, '.claude/skills', 'alpha', '# divergent copy\n');

  const result = run(root, '--fix');

  assert.equal(result.status, 1);
  assert.match(result.stdout, /conflict .claude\/skills\/alpha/);
  assert.equal(
    readFileSync(join(root, '.claude/skills/alpha/SKILL.md'), 'utf8'),
    '# divergent copy\n'
  );
  assert.equal(
    readFileSync(join(root, '.agents/skills/alpha/SKILL.md'), 'utf8'),
    '# alpha\n'
  );
});

test('fix mode removes broken links', () => {
  const root = createRepo({ canonical: [], claude: 'dir' });
  symlinkSync('../../.agents/skills/gone', join(root, '.claude/skills/gone'));

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.equal(existsSync(join(root, '.claude/skills/gone')), false);
  assert.throws(() => lstatSync(join(root, '.claude/skills/gone')));
});

test('links pointing outside canonical are reported but left alone', () => {
  const root = createRepo({ canonical: [], claude: 'dir' });
  const outside = mkdtempSync(join(tmpdir(), 'outside-skill-'));
  symlinkSync(outside, join(root, '.claude/skills/personal'));

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.match(result.stdout, /foreign-link .claude\/skills\/personal/);
  assert.ok(lstatSync(join(root, '.claude/skills/personal')).isSymbolicLink());
});

test('other agents skill dirs are synced only when they already exist', () => {
  const root = createRepo({ canonical: ['alpha'] });
  mkdirSync(join(root, '.codex/skills'), { recursive: true });

  const result = run(root, '--fix');

  assert.equal(result.status, 0);
  assert.ok(
    isLinkTo(root, '.codex/skills/alpha', '../../.agents/skills/alpha')
  );
  assert.equal(existsSync(join(root, '.pi')), false);
});

test('a clean repo passes check mode silently', () => {
  const root = createRepo({ canonical: ['alpha'] });
  run(root, '--fix');

  const result = run(root);

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), '');
});

test('json mode never fails the session: unresolved conflicts are reported in the message with exit 0', () => {
  const root = createRepo({ canonical: ['alpha'], claude: 'dir' });
  addRealSkill(root, '.claude/skills', 'alpha', '# divergent copy\n');

  const result = run(root, '--fix', '--json');

  assert.equal(result.status, 0);
  assert.match(
    systemMessageOf(result.stdout),
    /conflict .claude\/skills\/alpha/
  );
});

test('json mode emits a systemMessage only when something was reported', () => {
  const root = createRepo({ canonical: ['alpha'] });

  const first = run(root, '--fix', '--json');
  const second = run(root, '--fix', '--json');

  assert.match(systemMessageOf(first.stdout), /linked .claude\/skills\/alpha/);
  assert.equal(second.stdout.trim(), '');
});
