// PostToolUse hook for Edit, Write and MultiEdit (registered in .claude/settings.json): after an agent
// changes harness code, ESLint fixes and formats it (Prettier runs inside ESLint, as in the packages);
// after it changes harness JSON, Prettier formats it. A lint error ESLint cannot fix goes back to the
// agent (exit 2). A formatter, not a guard: without installed tools, or when a tool fails, it lets
// the edit stand.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const CODE =
  /^agent-harness\/(?:(?:scripts|hooks|evals|tests)\/.+\.m[jt]s|eslint\.config\.mjs)$/;
const JSON_FILE =
  /^(?:agent-harness\/(?:config\/|tests\/fixtures\/)?[^/]+\.json|\.claude\/(?:pipeline\.)?settings\.json)$/;

const filePathOf = (text: string) => {
  try {
    const path = JSON.parse(text)?.tool_input?.file_path;
    return typeof path === 'string' ? path : null;
  } catch {
    return null;
  }
};

/**
 * The tool behind node_modules/.bin/<name>, or null when it is not installed.
 */
const toolOf = (root: string, name: string) => {
  const link = join(root, 'node_modules/.bin', name);
  return existsSync(link) ? realpathSync(link) : null;
};

const run = (root: string, tool: string, args: readonly string[]) =>
  spawnSync(process.execPath, [tool, ...args], {
    cwd: root,
    encoding: 'utf8',
  });

const root = resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
const path = filePathOf(readFileSync(0, 'utf8'));
const file = path === null ? '' : relative(root, resolve(root, path));
const name = file.split(sep).join('/');

if (CODE.test(name)) {
  const eslint = toolOf(root, 'eslint');
  if (eslint) {
    const result = run(root, eslint, ['--fix', name]);
    if (result.status === 1) {
      process.stderr.write(`ESLint errors left in ${name}:\n${result.stdout}`);
      process.exit(2);
    }
    if (result.status !== 0) {
      process.stderr.write(`format-harness: eslint failed on ${name}\n`);
    }
  }
} else if (JSON_FILE.test(name)) {
  const prettier = toolOf(root, 'prettier');
  if (prettier && run(root, prettier, ['--write', name]).status !== 0) {
    process.stderr.write(`format-harness: prettier failed on ${name}\n`);
  }
}
