import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./guard-bash.mts', import.meta.url));

type Case = readonly [expected: string, input: string];

const cases: readonly Case[] = [
  ['allow', 'git status --short'],
  ['allow', 'git fetch origin main'],
  ['allow', 'git log --oneline origin/main..HEAD'],
  ['allow', 'git tag --list'],
  ['allow', 'git tag'],
  ['allow', 'git tag | wc -l'],
  ['allow', 'git tag; git status --short'],
  ['allow', 'git tag && git status --short'],
  ['allow', 'echo "$(git tag)"'],
  ['allow', 'git tag > tags.txt'],
  ['allow', 'git tag 2>/dev/null | wc -l'],
  ['allow', 'git tag\ngit status --short'],
  ['deny', 'git tag -a v1 -m x'],
  ['deny', 'git tag -d v1'],
  ['deny', 'git tag v1 && git status --short'],
  ['deny', 'git tag -f v1 | cat'],
  ['allow', 'git add packages/react-packages/drawer/src/Drawer.tsx'],
  ['allow', 'git commit -F msg.txt'],
  ['allow', 'git commit --fixup=abc123'],
  ['allow', 'git commit -F msg.txt --trailer "Refs: #1"'],
  ['allow', 'git commit -S -F msg.txt'],
  ['deny', 'git commit -s -F msg.txt'],
  [
    'deny',
    'git commit -F msg.txt --trailer "Signed-off-by: Claude <noreply@anthropic.com>"',
  ],
  ['deny', 'git commit --signoff -F msg.txt'],
  ['deny', 'git commit -s --fixup=abc123'],
  ['allow', 'gh issue view 218 --json title,body,labels'],
  ['allow', 'gh pr view 190 --json title'],
  ['allow', 'gh api --method GET repos/daimlertruck/DT-DDS/issues/215/parent'],
  ['allow', 'gh api repos/daimlertruck/DT-DDS/labels'],
  ['allow', "gh api graphql -f query='query { viewer { login } }'"],
  [
    'allow',
    'gh api --method GET "repos/o/r/code-scanning/alerts" -f state=open',
  ],
  ['allow', 'yarn turbo run lint test build --filter=...[origin/main]'],
  ['allow', "git commit -F - <<'EOF'\nfix: x\n\nDo not git push here.\nEOF"],
  ['deny', 'git push -u origin HEAD'],
  ['deny', 'git fetch origin && git push'],
  ['deny', 'gh pr create --draft --title x --body-file b.md'],
  ['deny', 'gh pr comment 190 --body hi'],
  ['deny', 'gh issue edit 218 --add-label "status:in progress"'],
  ['deny', 'gh issue comment 218 --body /take'],
  ['deny', 'gh label create foo'],
  [
    'deny',
    'gh api --method POST repos/o/r/pulls/1/comments/2/replies -f body=x',
  ],
  ['deny', 'gh api -X PATCH repos/o/r/issues/1'],
  ['deny', 'gh api repos/o/r/issues/1/comments -f body=hello'],
  [
    'deny',
    "gh api graphql -f query='mutation { addComment(input:{}) { clientMutationId } }'",
  ],
  ['deny', 'npm publish pkg.tgz --access public'],
  ['deny', 'yarn changesets:ci'],
  ['deny', 'npx changeset version --preid beta'],
  ['deny', 'git tag @dt-dds/react@1.0.0'],
  ['deny', 'git commit -s --no-verify -m "fix: x"'],
  ['deny', 'git commit -snm "fix: x"'],
  ['deny', 'git commit -am "fix: x"'],
  ['deny', 'git add -A'],
  ['deny', 'git add .'],
  ['deny', 'git add .local/agent-harness/work/218/plan.md'],
  ['deny', 'git add -f .local/agent-harness/work/218/plan.md'],
  ['deny', 'git add ./.local/agent-harness/work/218'],
  ['deny', 'git add .local/agent-harness/README.md'],
  ['deny', 'git add -f .local'],
  ['deny', 'git add --force .local/'],
  ['allow', 'git add -f .agents'],
  ['allow', 'git add docs/agent-harness/runs/257.json'],
  ['allow', 'git add .localrc'],
  ['allow', 'git add -f AGENTS.md'],
  ['allow', 'git add packages/react-packages/AGENTS.md'],
  ['allow', 'git add packages/themes/CLAUDE.md'],
  ['allow', 'git add .agents/skills/run-pipeline/SKILL.md'],
  ['allow', 'git add .claude/settings.json agent-harness/hooks/guard-bash.mts'],
  ['allow', 'git add .agents'],
  ['allow', 'cat scripts/changeset-plugin/index.js'],
  ['allow', 'grep -rn changeset-plugin package.json'],
  [
    'allow',
    'node -e "const m=require(\'./packages/changeset-conventional-commits/dist/index.js\');console.log(typeof m.addTag, m.addTag.length)"',
  ],
  ['allow', 'yarn turbo run test --filter=changeset-conventional-commits'],
  ['deny', 'node scripts/changeset-plugin --add-tag'],
  ['deny', 'node scripts/changeset-plugin --add-changesets'],
  ['deny', 'node ./scripts/changeset-plugin/index.js --add-tag'],
  ['deny', 'node scripts/changeset-plugin/ --add-tag'],
  ['deny', 'node /Users/me/dt-dds/scripts/changeset-plugin --add-tag'],
  ['deny', 'yarn node scripts/changeset-plugin --add-tag'],
  ['deny', 'cd scripts && node changeset-plugin --add-tag'],
  ['deny', 'cd scripts/changeset-plugin && node . --add-tag'],
  ['deny', 'cd scripts/changeset-plugin && node index.js --add-changesets'],
  ['deny', 'node -e "require(\'changeset-conventional-commits\').addTag()"'],
  [
    'deny',
    'node -e "const p=require(\'./packages/changeset-conventional-commits/dist/index.js\'); p.conventionalCommitChangeset()"',
  ],
  [
    'deny',
    'node -e "require(\'changeset-conventional-commits\').addTag.call(null)"',
  ],
  [
    'deny',
    "node -e \"process.argv.push('--add-tag'); require('./scripts/changeset-plugin')\"",
  ],
  ['deny', 'npx tsx -e "require(\'changeset-conventional-commits\').addTag()"'],
  ['deny', 'npx ts-node scripts/changeset-plugin/index.js --add-tag'],
  ['deny', 'npm run changesets:tag'],
  ['deny', 'npm run "changesets:tag"'],
  ['deny', 'npm run-script changesets:ci'],
  ['deny', 'pnpm changesets:add'],
  ['deny', 'yarn --cwd . changesets:version'],
  ['deny', 'npm run release'],
  ['deny', 'yarn release'],
  ['deny', 'node node_modules/@changesets/cli/bin.js version'],
  ['deny', 'npx @changesets/cli publish'],
  ['allow', 'git -C packages/themes status --short'],
  ['allow', 'git --no-pager log --oneline -3'],
  ['allow', 'git -c color.ui=never diff --stat'],
  ['allow', 'git config --get core.hooksPath'],
  ['allow', 'git config core.hooksPath'],
  ['allow', 'git config --get core.hooksPath 2>/dev/null'],
  ['allow', 'test "$(git config --get core.hooksPath)" = .husky/_'],
  ['allow', 'git config --get core.hooksPath\ngit status --short'],
  ['deny', 'git -C . push origin HEAD'],
  ['deny', 'git -C "my repo" push'],
  ['deny', 'git -C . status && git -C . push'],
  ['deny', 'git --git-dir=.git --work-tree=. push'],
  ['deny', 'git --git-dir /tmp/mirror push'],
  ['deny', 'git --work-tree ../wt push'],
  ['deny', 'git --namespace foo push'],
  ['deny', 'git --config-env user.name=GIT_USER push'],
  ['deny', 'git --attr-source HEAD push'],
  ['deny', 'git --exec-path=/tmp/git-core push'],
  ['deny', 'git -c user.name=x push'],
  ['deny', 'git --no-pager push'],
  ['deny', 'git -C . tag v1'],
  ['deny', 'git -c user.email=a@b.c commit -s -m "fix: x"'],
  ['deny', 'git -c core.hooksPath=/dev/null commit -m "fix: x"'],
  ['deny', 'git config core.hooksPath /dev/null'],
  ['deny', 'git config --unset core.hooksPath'],
  ['deny', 'git config --unset-all core.hooksPath'],
  ['deny', 'git config unset core.hooksPath'],
  [
    'deny',
    'GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0=/dev/null git commit -m "fix: x"',
  ],
  ['ask', 'git -C . rebase -i origin/main'],
  ['ask', 'git rebase -i --autosquash origin/main'],
  ['ask', 'git reset --hard origin/main'],
  ['ask', 'git checkout -B feat/218/x'],
  ['ask', 'git branch -D feat/218/x'],
  ['ask', 'git commit --amend --no-edit'],
  ['ask', 'git clean -fd'],
  ['ask', 'git reset --soft HEAD~1'],
  ['ask', 'git reset --mixed origin/main'],
  ['ask', 'git reset --keep 1a7bd93a8'],
  ['ask', 'git reset --merge ORIG_HEAD'],
  ['ask', 'git reset --soft'],
  ['ask', 'git reset origin/main'],
  ['ask', 'git reset HEAD~3'],
  ['ask', 'git reset HEAD^'],
  ['ask', 'git reset @~2'],
  ['ask', 'git reset -q HEAD@{1}'],
  ['ask', 'git reset 1a7bd93a8'],
  ['ask', 'git reset main'],
  ['ask', 'git reset fix/108/component-generator-templates'],
  ['ask', 'git reset origin/release-1.2'],
  ['ask', 'git -C . reset origin/main'],
  ['ask', 'git status --short && git reset HEAD~1'],
  ['ask', 'git reset -- a.txt && git reset HEAD~1'],
  ['allow', 'git reset'],
  ['allow', 'git reset -q'],
  ['allow', 'git reset HEAD'],
  ['allow', 'git reset -- packages/react-packages/drawer/src/Drawer.tsx'],
  ['allow', 'git reset HEAD -- packages/react-packages/drawer/src/Drawer.tsx'],
  ['allow', 'git reset HEAD packages/react-packages/drawer/src/Drawer.tsx'],
  ['allow', 'git reset packages/react-packages/drawer/src/Drawer.tsx'],
  ['allow', 'git reset -q -- README.md 2>/dev/null'],
  ['allow', 'git reset -q 2>/dev/null'],
  ['allow', 'git reflog -5 | grep reset'],
  [
    'allow',
    'git restore --staged packages/react-packages/drawer/src/Drawer.tsx',
  ],
  // The pipeline's former second Bash guard (trial-guard) had these; guard-bash is the one Bash guard
  // in stage sessions too.
  ['deny', 'git fetch origin && git push origin fix/257/x'],
  [
    'deny',
    'gh pr create --draft --title x --body-file .local/agent-harness/work/257/pr-body.md',
  ],
  ['deny', 'gh pr edit 260 --title x'],
  ['deny', 'gh issue create --title x --body y'],
  ['deny', 'gh issue comment 257 --body /take'],
  ['deny', 'gh issue edit 257 --add-label "status:in review"'],
  ['deny', 'npm publish packages/react-packages/link'],
  ['deny', 'yarn npm publish'],
  ['deny', 'yarn publish'],
  ['deny', 'pnpm publish'],
  ['deny', 'yarn workspace @dt-dds/react-link publish --non-interactive'],
  ['deny', 'gh pr -R daimlertruck/DT-DDS create --title x'],
  ['allow', 'gh issue view 257 --json title,body,labels'],
  ['allow', 'gh pr view 260 --json title'],
  ['allow', 'gh pr list --head fix/257/x --state all --json number'],
  ['allow', 'npm view @dt-dds/react-link version'],
];

// Remote writes, publishes, sign-offs and history rewrites by another route (each found as a gap).
const routes: readonly Case[] = [
  ['deny', 'gh api -XDELETE repos/o/r/git/refs/heads/feat'],
  ['deny', 'gh api -XPOST repos/o/r/issues/1/comments'],
  ['deny', 'gh api --method GET repos/o/r/issues/1/comments -X POST -f body=x'],
  ['deny', 'gh api --method=GET -X DELETE repos/o/r/git/refs/heads/x'],
  ['allow', 'gh api -X GET repos/o/r/issues/1'],
  ['allow', 'gh api --method=GET repos/o/r/pulls --paginate'],
  ['deny', 'gh pr --repo daimlertruck/DT-DDS create --title x --body y'],
  ['deny', 'gh pr -R o/r merge 12'],
  ['deny', 'gh issue -R o/r comment 1 --body x'],
  ['deny', 'gh issue --repo=o/r edit 1 --add-label x'],
  ['deny', 'gh pr update-branch 12'],
  ['deny', 'gh pr revert 12'],
  ['deny', 'gh gist create notes.md'],
  ['allow', 'gh pr -R o/r view 12 --json title'],
  ['allow', 'gh issue --repo o/r view 1'],
  ['allow', 'gh pr checks 12'],
  ['allow', 'gh pr diff 12'],
  ['allow', 'gh run view 123 --log'],
  ['allow', 'gh search issues --repo o/r guard'],
  ['allow', 'gh auth status'],
  ['allow', 'gh --version'],
  ['ask', 'gh alias set pc "pr create"'],
  ['ask', 'gh extension install owner/gh-x'],
  ['ask', 'gh pr checkout 12'],
  ['deny', 'git send-pack origin HEAD:refs/heads/x'],
  ['deny', 'git subtree push --prefix=docs origin docs'],
  ['deny', 'git -c alias.p=push p origin HEAD'],
  ['deny', 'git config alias.p push'],
  ['deny', 'git config --global alias.pu "push -u"'],
  ['allow', 'git config --get-regexp alias'],
  ['allow', 'git config --list'],
  ['deny', 'npm --registry https://registry.npmjs.org publish'],
  ['deny', 'yarn workspace @dt-dds/react-button publish --non-interactive'],
  ['deny', 'yarn --cwd packages/react-packages/button publish'],
  ['deny', 'pnpm --filter @dt-dds/react publish'],
  ['allow', 'yarn workspace @dt-dds/docs test-storybook Button.stories'],
  ['allow', 'npm view @dt-dds/react version'],
  ['deny', 'git commit -m "fix: x" -m "Signed-off-by: Eval Human <h@x>"'],
  [
    'deny',
    "git commit -F - <<'EOF'\nfix: x\n\nSigned-off-by: Eval Human <h@x>\nEOF",
  ],
  ['allow', 'git log --format=%B -1 | grep Signed-off-by'],
  ['deny', 'git update-ref refs/tags/v1 HEAD'],
  ['ask', 'git update-ref refs/heads/main HEAD~1'],
  ['ask', 'git branch --delete --force feat/1/x'],
  ['ask', 'git branch -d -f feat/1/x'],
  ['ask', 'git branch -df feat/1/x'],
  ['ask', 'git branch -f main HEAD~3'],
  ['allow', 'git branch -d feat/1/merged'],
  ['allow', 'git branch --show-current'],
];

// Found by an adversarial review: line continuations, separators inside quotes, quoted words,
// prefixes git accepts, aliases, and the false asks a quote-blind scan gives.
const reviewed: readonly Case[] = [
  [
    'deny',
    'gh api --method GET repos/o/r/issues/1/comments \\\n  -X POST -f body=x',
  ],
  ['deny', 'gh api repos/o/r/issues/1/comments \\\n  -X POST -f body=x'],
  [
    'deny',
    "gh api graphql -f query='\nmutation { addComment(input:{}) { clientMutationId } }'",
  ],
  [
    'allow',
    'gh api graphql -f query=\'\nquery { repository(owner: "o", name: "r") { id } }\'',
  ],
  ['deny', 'gh api -X=DELETE repos/o/r/git/refs/heads/x'],
  ['deny', 'gh api -iX DELETE repos/o/r/git/refs/heads/x'],
  ['allow', 'gh api -iX GET repos/o/r/issues/1'],
  ['deny', 'git commit -m "fix: a; b" -s'],
  ['ask', 'git commit -m "fix: a; b" --amend'],
  ['deny', 'git commit -m "fix: a | b" -n'],
  ['deny', 'git commit --trailer "Signed-off-by=Eval Human <h@x>" -m "fix: x"'],
  ['deny', 'git -C . commit -m "fix: x" -m "Signed-off-by: Eval Human <h@x>"'],
  [
    'deny',
    "git commit -F - <<'EOF'\nfix: a; b\n\nSigned-off-by: Eval Human <h@x>\nEOF",
  ],
  ['deny', 'git -c core.sshCommand="ssh -i k" push origin HEAD'],
  ['deny', 'git \\\n  -C . \\\n  push'],
  ['deny', 'git "push" origin HEAD'],
  ['deny', 'bash -c "git pu""sh"'],
  ['deny', 'git subtree -P docs push origin docs'],
  ['deny', 'git-lfs push origin main'],
  ['deny', 'git http-push https://example.invalid/repo.git main'],
  ['deny', "HUSKY='0' git commit -m x"],
  ['deny', 'git commit --no-verif -m x'],
  ['deny', 'git commit --sign -m x'],
  ['deny', 'git add -f ".local/agent-harness/work/218/plan.md"'],
  ['deny', 'git add -f .local/*'],
  ['deny', 'gh --title=x --body=y pr create'],
  ['deny', 'gh pr new --title x'],
  ['deny', 'gh issue new --title x'],
  ['ask', 'gh auth status & gh ssh-key delete 1'],
  ['ask', 'gh pr view $(gh extension install owner/gh-x)'],
  ['ask', 'git pull --rebase origin main'],
  ['ask', 'git pull -r'],
  ['allow', 'git pull --ff-only origin main'],
  ['ask', 'git switch --force-create feat/1/x'],
  ['ask', 'git reset v1.0.0'],
  ['deny', 'npm unpublish @dt-dds/react-link@1.0.0'],
  ['deny', 'npm dist-tag add @dt-dds/react-link@1.0.0 latest'],
  ['deny', 'npm pub'],
  ['deny', 'npx changeset@2 publish'],
  ['allow', 'npm config get publish-registry'],
  ['allow', 'grep -rn "gh pr view" .agents/skills'],
  ['allow', "rg 'gh issue view' .agents"],
  ['allow', 'git log --grep "gh api"'],
  ['allow', 'git commit -m "docs: say how to use gh to read issues"'],
  ['allow', 'gh pr ls'],
  ['allow', 'gh issue ls --state open'],
  ['allow', 'gh run watch 123'],
  ['allow', 'git config alias.lg'],
  ['allow', 'git config --unset alias.lg'],
  ['allow', 'git fetch origin main \\\n  && git status --short'],
  // Second review round.
  [
    'deny',
    "cat > m.txt <<'EOF'\nfix: x\n\nSigned-off-by: Eval Human <h@x>\nEOF\ngit commit -F m.txt",
  ],
  [
    'deny',
    "printf 'fix: x\\n\\nSigned-off-by: Eval Human <h@x>\\n' > m.txt && git commit -F m.txt",
  ],
  [
    'deny',
    'git -c user.name="Eval Human" commit -m x -m "Signed-off-by: Eval Human <h@x>"',
  ],
  ['deny', 'git commit --si -m x'],
  ['deny', 'git commit --sig -m x'],
  ['ask', 'git commit --am --no-edit'],
  ['ask', 'git commit --amen --no-edit'],
  ['deny', 'git commit -m "say \\"hi; there\\"" -s'],
  ['ask', 'git -c pull.rebase=true pull'],
  ['allow', 'git pull --rebase=false origin main'],
  ['ask', 'bash -c "gh ssh-key delete 123 --yes"'],
  ['ask', "sh -c 'gh extension install owner/gh-x'"],
  ['ask', 'eval "gh alias set pc pr"'],
  ['allow', 'bash -c "gh pr view 12 --json title"'],
  [
    'deny',
    'gh api graphql -f query="$(cat <<\'EOF\'\nmutation { addComment(input:{}) { clientMutationId } }\nEOF\n)"',
  ],
  [
    'deny',
    "gh api repos/o/r/issues/1/comments --jq '.a | .b' -X POST -f body=x",
  ],
  [
    'deny',
    'gh api repos/o/r/issues/1/comments -f body="$(gh api -X GET repos/o/r/issues/2 --jq .body)"',
  ],
  ['deny', 'git -c core.sshCommand="ssh -i k" commit -s -m x'],
];

const decisionOf = (command: string) => {
  const input = JSON.stringify({ tool_name: 'Bash', tool_input: { command } });
  const run = spawnSync('node', [guard], { input, encoding: 'utf8' });
  if (run.status !== 0) return `exit ${run.status}: ${run.stderr}`;
  if (!run.stdout.trim()) return 'allow';
  return JSON.parse(run.stdout).hookSpecificOutput.permissionDecision;
};

const rawCases: readonly Case[] = [
  ['deny', '{not json'],
  ['deny', ''],
  ['deny', '{}'],
  ['deny', JSON.stringify({ tool_name: 'Bash', tool_input: {} })],
  [
    'deny',
    JSON.stringify({
      tool_name: 'Bash',
      tool_input: { command: ['git', 'push'] },
    }),
  ],
];

/** @param input the raw hook input */
const rawDecisionOf = (input: string) => {
  const run = spawnSync('node', [guard], { input, encoding: 'utf8' });
  if (run.status !== 0) return `exit ${run.status}: ${run.stderr}`;
  if (!run.stdout.trim()) return 'allow';
  return JSON.parse(run.stdout).hookSpecificOutput.permissionDecision;
};

cases
  .concat(routes, reviewed)
  .forEach(([expected, command]) =>
    test(`${expected}: ${command.split('\n')[0]}`, () =>
      assert.equal(decisionOf(command), expected))
  );
rawCases.forEach(([expected, input]) =>
  test(`${expected} on raw input ${input || '(empty)'}`, () =>
    assert.equal(rawDecisionOf(input), expected))
);

test('every decision is one PreToolUse JSON object on stdout, exit 0, with a harness reason', () => {
  const run = spawnSync('node', [guard], {
    input: JSON.stringify({
      tool_name: 'Bash',
      tool_input: { command: 'git push' },
    }),
    encoding: 'utf8',
  });
  assert.equal(run.status, 0);
  const { hookSpecificOutput } = JSON.parse(run.stdout);
  assert.equal(hookSpecificOutput.hookEventName, 'PreToolUse');
  assert.match(
    hookSpecificOutput.permissionDecisionReason,
    /^\[dt-dds harness\] /
  );
});

test('a commit message file with a Signed-off-by line is denied; one without passes', () => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-bash-'));
  writeFileSync(
    join(dir, 'forged.txt'),
    'fix: x\n\nSigned-off-by: Eval Human <h@x>\n'
  );
  writeFileSync(join(dir, 'plain.txt'), 'fix: x\n\nWhy it changed.\n');
  const decide = (command: string) => {
    const input = JSON.stringify({
      tool_name: 'Bash',
      cwd: dir,
      tool_input: { command },
    });
    const run = spawnSync('node', [guard], { input, encoding: 'utf8' });
    return run.stdout.trim()
      ? JSON.parse(run.stdout).hookSpecificOutput.permissionDecision
      : 'allow';
  };
  assert.equal(decide('git commit -F forged.txt'), 'deny');
  assert.equal(decide('git commit --file=forged.txt'), 'deny');
  assert.equal(decide(`git commit -F ${join(dir, 'forged.txt')}`), 'deny');
  assert.equal(decide('git commit -F plain.txt'), 'allow');
  assert.equal(decide('git commit -F missing.txt'), 'allow');
  assert.equal(decide(`git commit -F${join(dir, 'forged.txt')}`), 'deny');
  mkdirSync(join(dir, 'sub'));
  writeFileSync(
    join(dir, 'sub', 'msg.txt'),
    'fix: x\n\nSigned-off-by: Eval Human <h@x>\n'
  );
  assert.equal(decide('cd sub && git commit -F msg.txt'), 'deny');
  assert.equal(decide('git -C sub commit -F msg.txt'), 'deny');
  writeFileSync(
    join(dir, 'q.graphql'),
    'mutation { addComment(input: {}) { clientMutationId } }\n'
  );
  writeFileSync(join(dir, 'r.graphql'), 'query { viewer { login } }\n');
  assert.equal(decide('gh api graphql -F query=@q.graphql'), 'deny');
  assert.equal(decide('gh api graphql -F query=@r.graphql'), 'allow');
});
