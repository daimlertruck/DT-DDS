// The workspace on disk: built once, proved isolated by the self-checks, reset before every run
// (testing.md → How a run works, Environment isolation).

import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { harnessFiles } from './harness.mts';
import { isInside, samePath } from './paths.mts';
import { exec, git, must, say, which } from './processes.mts';
import { readRefs, type Refs } from './snapshot.mts';
import {
  AGENT,
  BRANCH,
  HUMAN,
  ghShim,
  harnessHashPathsOf,
  isolatedEnvOf,
  publishShim,
  refRestore,
  type Env,
  type Prepared,
  type Workspace,
} from './workspace.mts';

const HARNESS_COPY_EXCLUDES: readonly string[] = [
  // The case list stays out of the clone, so no agent can read it.
  'agent-harness/evals',
];

export const overlapsRepo = (repo: string, root: string): boolean =>
  isInside(repo, root) || isInside(root, repo) || samePath(root, repo);

// The repo's info/exclude, asked of git: in a linked worktree `.git` is a file, and the worktree
// shares its main checkout's exclude.
export const excludeFileOf = (repo: string): string =>
  git(
    repo,
    'rev-parse',
    '--path-format=absolute',
    '--git-path',
    'info/exclude'
  );

// Refuses to go on unless the clone is its own repository and pushes to the local remote.
const assertClone = ({ clone, remote }: Workspace): void => {
  const top = git(clone, 'rev-parse', '--show-toplevel');
  if (!samePath(top, clone)) {
    throw new Error(`refusing to act outside the clone (${top})`);
  }
  const url = git(clone, 'remote', 'get-url', '--push', 'origin');
  if (!samePath(url, remote)) {
    throw new Error(`the clone's push URL is not the local remote (${url})`);
  }
};

const copyHarness = (
  from: string,
  to: string,
  paths: readonly string[]
): void => {
  const excluded = HARNESS_COPY_EXCLUDES.map((path) => join(from, path));
  const isExcluded = (source: string): boolean =>
    excluded.some((path) => source === path || source.startsWith(`${path}/`));
  paths.forEach((path) =>
    cpSync(join(from, path), join(to, path), {
      recursive: true,
      verbatimSymlinks: true,
      filter: (source) => !isExcluded(source),
    })
  );
};

const writeShim = (dir: string, name: string, body: string): void =>
  writeFileSync(join(dir, name), `#!/bin/sh\n${body}\n`, { mode: 0o755 });

const createShims = ({ shims, logs }: Workspace): void => {
  mkdirSync(shims, { recursive: true });
  writeShim(shims, 'gh', ghShim(logs.gh));
  ['npm', 'yarn', 'pnpm']
    .map((name): [string, string] => [name, which(name)])
    .filter(([, real]) => real)
    .forEach(([name, real]) =>
      writeShim(shims, name, publishShim(name, real, logs.publish))
    );
};

const resetIsolatedConfig = ({ isolated }: Workspace): void => {
  writeFileSync(isolated.gitGlobal, '');
  writeFileSync(isolated.npmrc, '');
  rmSync(isolated.ghConfig, { recursive: true, force: true });
  mkdirSync(isolated.ghConfig, { recursive: true });
};

const restoreRefs = (cwd: string, baseline: Refs): void => {
  const { remove, set } = refRestore(readRefs(cwd), baseline);
  remove.forEach((ref) => git(cwd, 'update-ref', '-d', ref));
  set.forEach(([ref, sha]) => git(cwd, 'update-ref', ref, sha));
};

export const setup = (
  repo: string,
  workspace: Workspace,
  env: Env
): Prepared => {
  const { root, clone, remote, pristine } = workspace;
  const claude = exec('claude', ['--version']);
  if (claude.status !== 0) throw new Error('claude is not on PATH');
  say(
    `claude ${claude.stdout.trim()} · repo HEAD ${git(
      repo,
      'rev-parse',
      '--short',
      'HEAD'
    )} · workspace ${root}`
  );

  rmSync(root, { recursive: true, force: true });
  mkdirSync(root, { recursive: true });
  if (overlapsRepo(repo, root)) {
    throw new Error(
      `the workspace resolves inside or around the repo: ${root}`
    );
  }
  must('git', ['clone', '--quiet', '--no-hardlinks', repo, clone]);
  git(clone, 'remote', 'set-url', 'origin', remote);
  // Detached, so the fetch below may move main even when the repo itself is on main.
  git(clone, 'checkout', '--quiet', '--detach');
  git(
    clone,
    'fetch',
    '--quiet',
    repo,
    '+refs/remotes/origin/main:refs/heads/main'
  );
  must('git', ['clone', '--quiet', '--bare', clone, remote]);
  git(clone, 'fetch', '--quiet', '--prune', 'origin');
  cpSync(excludeFileOf(repo), join(clone, '.git/info/exclude'));
  assertClone(workspace);

  const harness = harnessFiles(repo);
  copyHarness(repo, clone, harness);
  say(`harness copied: ${harness.length} paths`);

  say('installing dependencies in the clone (a few minutes)…');
  must('yarn', ['--frozen-lockfile', '--silent'], {
    cwd: clone,
    timeout: 30 * 60 * 1000,
  });
  must(
    'yarn',
    ['turbo', 'run', 'build', '--filter=changeset-conventional-commits'],
    { cwd: clone, timeout: 10 * 60 * 1000 }
  );
  git(clone, 'config', 'user.name', HUMAN.name);
  git(clone, 'config', 'user.email', HUMAN.email);
  git(clone, 'config', 'commit.gpgsign', 'false');
  git(clone, 'config', 'tag.gpgsign', 'false');
  git(clone, 'checkout', '--quiet', '-B', BRANCH);

  mkdirSync(pristine.root, { recursive: true });
  copyHarness(clone, pristine.root, harness);
  cpSync(join(clone, '.git/config'), pristine.gitConfig);
  cpSync(join(clone, '.git/info/exclude'), pristine.infoExclude);
  cpSync(join(clone, '.husky/_'), pristine.husky, {
    recursive: true,
    verbatimSymlinks: true,
  });
  createShims(workspace);
  writeFileSync(workspace.mcpConfig, '{"mcpServers":{}}\n');
  resetIsolatedConfig(workspace);

  return {
    harness,
    harnessHashPaths: harnessHashPathsOf(harness),
    base: git(clone, 'rev-parse', 'HEAD'),
    cloneRefs: readRefs(clone),
    remoteRefs: readRefs(remote),
    env: isolatedEnvOf(env, workspace),
  };
};

export const selfChecks = (workspace: Workspace, { env }: Prepared): void => {
  const { clone } = workspace;
  const pushProbe = JSON.stringify({
    tool_name: 'Bash',
    tool_input: { command: 'git push origin HEAD' },
  });
  const guard = exec(
    'node',
    [join(clone, 'agent-harness/hooks/guard-bash.mts')],
    {
      input: pushProbe,
    }
  );
  if (!guard.stdout.includes('"deny"')) {
    throw new Error('the copied guard-bash.mts does not deny a push');
  }

  const probe = workspace.signoffProbe;
  const inProbe = { cwd: probe, env };
  mkdirSync(probe, { recursive: true });
  must('git', ['init', '--quiet'], inProbe);
  must('git', ['config', 'user.name', HUMAN.name], inProbe);
  must('git', ['config', 'user.email', HUMAN.email], inProbe);
  must(
    'git',
    ['commit', '--quiet', '--allow-empty', '-s', '-m', 'chore: probe'],
    inProbe
  );
  const trailer = must(
    'git',
    ['log', '-1', '--format=%(trailers:key=Signed-off-by,valueonly)'],
    inProbe
  );
  if (trailer !== `${AGENT.name} <${AGENT.email}>`) {
    throw new Error(`an agent -s would not be visible (got "${trailer}")`);
  }
  rmSync(probe, { recursive: true, force: true });

  if (
    exec('git', ['config', '--get-all', 'credential.helper'], {
      cwd: clone,
      env,
    }).stdout.trim()
  ) {
    throw new Error(
      'a git credential helper is still visible in the isolated environment'
    );
  }
  const realGh = which('gh');
  if (realGh && exec(realGh, ['auth', 'status'], { env }).status === 0) {
    throw new Error('the real gh is authenticated in the isolated environment');
  }
  if (
    exec('git', ['ls-remote', 'git@github.com:daimlertruck/DT-DDS.git'], {
      cwd: clone,
      env,
      timeout: 30000,
    }).status === 0
  ) {
    throw new Error('SSH to github.com works in the isolated environment');
  }
  say(
    'self-checks passed: guard live in the clone, agent sign-off visible, no credentials, no SSH'
  );
};

export const resetClone = (workspace: Workspace, prepared: Prepared): void => {
  const { clone, remote, pristine, logs } = workspace;
  assertClone(workspace);
  git(clone, 'checkout', '--quiet', '--force', '--detach');
  restoreRefs(clone, prepared.cloneRefs);
  git(clone, 'checkout', '--quiet', '--force', BRANCH);
  git(clone, 'reset', '--quiet', '--hard', prepared.base);
  git(clone, 'clean', '-q', '-fd');
  git(clone, 'clean', '-q', '-fdx', '--', '.changeset');
  cpSync(pristine.gitConfig, join(clone, '.git/config'));
  cpSync(pristine.infoExclude, join(clone, '.git/info/exclude'));
  rmSync(join(clone, '.husky/_'), { recursive: true, force: true });
  cpSync(pristine.husky, join(clone, '.husky/_'), {
    recursive: true,
    verbatimSymlinks: true,
  });
  prepared.harness.forEach((path) =>
    rmSync(join(clone, path), { recursive: true, force: true })
  );
  copyHarness(pristine.root, clone, prepared.harness);
  restoreRefs(remote, prepared.remoteRefs);
  Object.values(logs).forEach((log) => rmSync(log, { force: true }));
  resetIsolatedConfig(workspace);
  assertClone(workspace);
};
