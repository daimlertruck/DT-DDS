import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const HOOK = fileURLToPath(new URL('./format-harness.mts', import.meta.url));
const REPO = fileURLToPath(new URL('../..', import.meta.url));

const projects: string[] = [];
after(() =>
  projects.forEach((root) => rmSync(root, { recursive: true, force: true }))
);

/**
 * A scratch project with the repo's tools and lint configs.
 */
const project = ({ tools = true }: { tools?: boolean } = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'format-harness-'));
  projects.push(root);
  mkdirSync(join(root, 'agent-harness'), { recursive: true });
  copyFileSync(
    join(REPO, 'agent-harness/eslint.config.mjs'),
    join(root, 'agent-harness/eslint.config.mjs')
  );
  copyFileSync(
    join(REPO, 'prettier.config.js'),
    join(root, 'prettier.config.js')
  );
  if (tools)
    symlinkSync(join(REPO, 'node_modules'), join(root, 'node_modules'));
  return root;
};

/**
 * @param path relative to root
 */
const write = (root: string, path: string, content: string) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
};

/**
 * Runs the hook as Claude Code does after an edit of `path`.
 */
const edited = (root: string, path: string) =>
  spawnSync(process.execPath, [HOOK], {
    cwd: root,
    env: { ...process.env, CLAUDE_PROJECT_DIR: root },
    input: JSON.stringify({
      hook_event_name: 'PostToolUse',
      tool_name: 'Edit',
      tool_input: { file_path: join(root, path) },
    }),
    encoding: 'utf8',
  });

test('a file outside the harness code is left alone', () => {
  const root = project();
  const ugly = 'const a = "x"\n';
  write(root, 'packages/x/src/a.ts', ugly);

  const result = edited(root, 'packages/x/src/a.ts');

  assert.equal(result.status, 0);
  assert.equal(readFileSync(join(root, 'packages/x/src/a.ts'), 'utf8'), ugly);
});

test('harness code is formatted and fixed by ESLint', () => {
  const root = project();
  write(root, 'agent-harness/scripts/a.mts', 'export const a = "x"\n');

  const result = edited(root, 'agent-harness/scripts/a.mts');

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    readFileSync(join(root, 'agent-harness/scripts/a.mts'), 'utf8'),
    "export const a = 'x';\n"
  );
});

test('a lint error ESLint cannot fix goes back to the agent (exit 2)', () => {
  const root = project();
  write(
    root,
    'agent-harness/hooks/b.mts',
    "export const b = () => {\n  const unused = 1;\n  return 'b';\n};\n"
  );

  const result = edited(root, 'agent-harness/hooks/b.mts');

  assert.equal(result.status, 2);
  assert.match(result.stderr, /no-unused-vars/);
});

test('harness JSON is formatted by Prettier', () => {
  const root = project();
  write(root, 'agent-harness/config/c.json', '{"a":1,\n"b":[1,2]}');

  const result = edited(root, 'agent-harness/config/c.json');

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    readFileSync(join(root, 'agent-harness/config/c.json'), 'utf8'),
    '{ "a": 1, "b": [1, 2] }\n'
  );
});

test('work dirs are never touched', () => {
  const root = project();
  const ugly = '{"a":1}';
  write(root, '.local/agent-harness/work/1/usage/a.json', ugly);

  const result = edited(root, '.local/agent-harness/work/1/usage/a.json');

  assert.equal(result.status, 0);
  assert.equal(
    readFileSync(
      join(root, '.local/agent-harness/work/1/usage/a.json'),
      'utf8'
    ),
    ugly
  );
});

test('without installed tools the hook does nothing', () => {
  const root = project({ tools: false });
  const ugly = 'export const a = "x"\n';
  write(root, 'agent-harness/scripts/a.mts', ugly);

  const result = edited(root, 'agent-harness/scripts/a.mts');

  assert.equal(result.status, 0);
  assert.equal(
    readFileSync(join(root, 'agent-harness/scripts/a.mts'), 'utf8'),
    ugly
  );
});
