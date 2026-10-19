import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./guard-reviewer.mts', import.meta.url));
const projectDir = '/repo';

const decide = (payload: Record<string, unknown>) => {
  const result = spawnSync('node', [guard], {
    input: JSON.stringify({ cwd: projectDir, ...payload }),
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PROJECT_DIR: projectDir },
  });
  assert.equal(result.status, 0, result.stderr);
  if (!result.stdout) return 'allow';
  return JSON.parse(result.stdout).hookSpecificOutput.permissionDecision;
};

const bash = (command: string) =>
  decide({ tool_name: 'Bash', tool_input: { command } });
const write = (tool_name: string, file_path: string) =>
  decide({ tool_name, tool_input: { file_path } });

test('reports may be written or edited only under .local/agent-harness/work/', () => {
  assert.equal(
    write('Write', '/repo/.local/agent-harness/work/218/review-a11y.md'),
    'allow'
  );
  assert.equal(
    write('Edit', '/repo/.local/agent-harness/work/223/a11y-dialog.md'),
    'allow'
  );
  assert.equal(
    write('Write', '.local/agent-harness/work/218/review-spec.md'),
    'allow'
  );
  assert.equal(
    write('Write', '/repo/packages/react-packages/drawer/src/Drawer.tsx'),
    'deny'
  );
  assert.equal(
    write('Edit', '/repo/packages/react-packages/drawer/README.md'),
    'deny'
  );
  assert.equal(
    write(
      'Write',
      '/repo/.local/agent-harness/work/../skills/ds-code-review/SKILL.md'
    ),
    'deny'
  );
  assert.equal(
    write('Write', '/repo/.local/agent-harness/workbench/x.md'),
    'deny'
  );
  assert.equal(write('MultiEdit', '/repo/AGENTS.md'), 'deny');
  assert.equal(write('NotebookEdit', '/repo/notes.ipynb'), 'deny');
});

test('read-only tools pass through untouched', () => {
  assert.equal(
    decide({ tool_name: 'Read', tool_input: { file_path: '/repo/AGENTS.md' } }),
    'allow'
  );
  assert.equal(
    decide({ tool_name: 'Grep', tool_input: { pattern: 'role=' } }),
    'allow'
  );
  assert.equal(
    decide({ tool_name: 'Glob', tool_input: { pattern: '**/*.tsx' } }),
    'allow'
  );
});

test('read-only inspection commands are allowed, including pipes and chains', () => {
  [
    'git diff origin/main...HEAD --name-only',
    'git diff origin/main...HEAD -- packages/react-packages/drawer',
    'git log origin/main..HEAD --format="%h %s"',
    'git show HEAD:packages/react-packages/drawer/src/index.ts',
    'git -C packages/react-packages/drawer ls-files',
    'git --no-pager log -1 --stat',
    'git merge-base origin/main HEAD',
    'git grep -n "role=" -- packages/react-packages',
    'git branch --show-current',
    'rg -n "aria-(modal|labelledby)" packages/react-packages/drawer/src',
    'grep -rn "onKeyDown" packages/react-packages/modal/src | head -20',
    'ls packages/react-packages',
    'find packages/react-packages/drawer/src -name "*.tsx" -not -path "*/node_modules/*"',
    'cat packages/react-packages/drawer/src/index.ts',
    'wc -l packages/react-packages/*/README.md',
    'jq -r ".version" packages/react-packages/drawer/package.json',
    'rg -l "styled\\.div" packages/react-packages | sort | uniq -c',
    'git diff --name-only origin/main...HEAD | cut -d/ -f3 | sort -u',
    'rg "a -> b" docs && echo done',
    'rg -c "x" src 2>/dev/null || true',
    'git diff --stat origin/main...HEAD 2>&1 | tail -5',
  ].forEach((command) => assert.equal(bash(command), 'allow', command));
});

test('file writes through the shell are denied', () => {
  [
    'git diff > /tmp/diff.patch',
    'rg -n role src >> report.md',
    'cat a | tee report.md',
    'git diff --output=diff.patch',
    'sort -o out.txt in.txt',
    'sort -uo out.txt in.txt',
    'sort --out=/tmp/x in.txt',
    'git diff "--out"put=/tmp/x',
    'tree -o notes.txt packages',
    'git diff --out""put=/tmp/x',
    'find . -name "*.snap" -delete',
    'find . -name "*.tsx" -exec sed -i s/a/b/ {} +',
    "sed -i 's/role/x/' src/Drawer.tsx",
    'cp README.md /tmp/x',
    'rm -rf .local/agent-harness/work/218',
    'mkdir -p .local/agent-harness/work/218',
  ].forEach((command) => assert.equal(bash(command), 'deny', command));
});

test('commands that change repo, remote or package state are denied', () => {
  [
    'git fetch origin main',
    'git checkout -b fix/x',
    'git commit -m x',
    'git stash',
    'git branch -D feature',
    'yarn turbo run test --filter=@dt-dds/react-drawer',
    'npx jest',
    "node -e \"require('fs').writeFileSync('x','y')\"",
    'gh api repos/daimlertruck/DT-DDS/issues/218',
    'curl -s https://example.com',
  ].forEach((command) => assert.equal(bash(command), 'deny', command));
});

test('hidden execution is denied', () => {
  [
    'echo $(rm -rf src)',
    'echo `touch x`',
    'rg --pre ./script.sh role src',
    'cat <(git diff)',
    'rg "$(cat patterns.txt)" src',
    'git -c core.pager=./x.sh log',
    'GIT_EXTERNAL_DIFF=./x.sh git diff HEAD~1',
    'GIT_PAGER=./x.sh git log',
    'sort --compress-program=./x.sh a.txt',
    'sort --compress=./x.sh a.txt',
  ].forEach((command) => assert.equal(bash(command), 'deny', command));
});

test('single-quoted text is literal, not execution', () => {
  assert.equal(bash("rg '$(not-run)' src"), 'allow');
  assert.equal(bash("rg 'a > b' docs"), 'allow');
});

test('the deny reason names the reviewer boundary', () => {
  const result = spawnSync('node', [guard], {
    input: JSON.stringify({
      tool_name: 'Bash',
      tool_input: { command: 'yarn test' },
    }),
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PROJECT_DIR: projectDir },
  });
  const { permissionDecisionReason } = JSON.parse(
    result.stdout
  ).hookSpecificOutput;
  assert.match(permissionDecisionReason, /read-only reviewer/);
});

/** @param input the raw hook input */
const decideRaw = (input: string) => {
  const result = spawnSync('node', [guard], {
    input,
    encoding: 'utf8',
    env: { ...process.env, CLAUDE_PROJECT_DIR: projectDir },
  });
  assert.equal(result.status, 0, `exit ${result.status}: ${result.stderr}`);
  if (!result.stdout) return 'allow';
  return JSON.parse(result.stdout).hookSpecificOutput.permissionDecision;
};

test('unexpected hook input fails closed', () => {
  assert.equal(decideRaw('{not json'), 'deny');
  assert.equal(decideRaw(''), 'deny');
  assert.equal(decideRaw(JSON.stringify({ tool_input: {} })), 'deny');
  [undefined, null, 42, {}, ['git', 'status']].forEach((command) =>
    assert.equal(
      decideRaw(JSON.stringify({ tool_name: 'Bash', tool_input: { command } })),
      'deny',
      JSON.stringify(command)
    )
  );
});
