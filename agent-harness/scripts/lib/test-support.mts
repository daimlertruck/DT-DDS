// Shared fixtures for the harness script tests (not a test file).

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';

import type { ClaudeResult } from '../records/usage.mts';

// Work dirs by id, each a map of file name (may contain `/`) to content.
export type WorkDirFiles = Readonly<
  Record<string, Readonly<Record<string, string>>>
>;

export const createRepo = (workDirs: WorkDirFiles = {}): string => {
  const root = mkdtempSync(join(tmpdir(), 'work-dir-'));
  Object.entries(workDirs).forEach(([id, files]) =>
    Object.entries(files).forEach(([name, content]) => {
      const path = join(root, '.local/agent-harness/work', id, name);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, content);
    })
  );
  return root;
};

export interface FakeCommandOptions {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exitCode?: number;
}

export interface FakeCommand {
  readonly bin: string;
  readonly calls: () => string[];
  readonly seenEnv: () => string[];
  readonly seenPwd: () => string | null;
  readonly env: NodeJS.ProcessEnv;
}

// A fake `<name>` on PATH that logs its arguments and the names of its environment variables, prints
// `stdout`, and exits with `exitCode` (printing `stderr` first when it fails); `seenPwd` is its $PWD.
export const fakeCommand = (
  name: string,
  { stdout = '', stderr = '', exitCode = 0 }: FakeCommandOptions = {}
): FakeCommand => {
  const bin = mkdtempSync(join(tmpdir(), `fake-${name}-`));
  const log = join(bin, 'calls.log');
  const envLog = join(bin, 'env.log');
  const pwdLog = join(bin, 'pwd.log');
  const stdoutFile = join(bin, 'stdout.txt');
  writeFileSync(stdoutFile, stdout);
  writeFileSync(
    join(bin, name),
    [
      '#!/bin/sh',
      // Like the real CLI, `claude --version` starts no session (run-stage.mts asks it per stage).
      ...(name === 'claude'
        ? [
            '[ "$1" = "--version" ] && { echo \'2.1.296 (Claude Code)\'; exit 0; }',
          ]
        : []),
      `printf '%s' "$*" | tr '\\n' ' ' >> '${log}'`,
      `printf '\\n' >> '${log}'`,
      `env | sed -n 's/^\\([A-Za-z_][A-Za-z0-9_]*\\)=.*/\\1/p' > '${envLog}'`,
      `printf '%s' "$PWD" > '${pwdLog}'`,
      `[ ${exitCode} -eq 0 ] || { printf '%s\\n' '${stderr}' >&2; cat '${stdoutFile}'; exit ${exitCode}; }`,
      `cat '${stdoutFile}'`,
      '',
    ].join('\n'),
    { mode: 0o755 }
  );
  const calls = (): string[] =>
    existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n') : [];
  const seenEnv = (): string[] =>
    existsSync(envLog) ? readFileSync(envLog, 'utf8').trim().split('\n') : [];
  // The PWD the command saw: sh keeps an inherited PWD that names its cwd under another spelling.
  const seenPwd = (): string | null =>
    existsSync(pwdLog) ? readFileSync(pwdLog, 'utf8') : null;
  const env = {
    ...process.env,
    PATH: `${bin}${delimiter}${process.env.PATH}`,
  };
  return { bin, calls, seenEnv, seenPwd, env };
};

// A fake `gh` on PATH that logs its arguments and prints `stdout`.
export const fakeGh = ({
  stdout = '',
  exitCode = 0,
}: Omit<FakeCommandOptions, 'stderr'> = {}): FakeCommand =>
  fakeCommand('gh', { stdout, exitCode, stderr: 'HTTP 502: Bad Gateway' });

// A `claude -p --output-format json` result, trimmed from a real session: two Opus 5.5 requests with
// 1-hour cache writes, where Claude Code's costUSD equals list price.
export const CLAUDE_RESULT = {
  type: 'result',
  subtype: 'success',
  is_error: false,
  num_turns: 2,
  duration_ms: 7217,
  result:
    'PASS — .local/agent-harness/work/42/context-bundle.md\nsecond line is ignored',
  session_id: 'fba203f3-221d-493c-960e-bf145c6c3a78',
  total_cost_usd: 0.0216904,
  usage: {
    input_tokens: 4,
    cache_creation_input_tokens: 463,
    cache_read_input_tokens: 48652,
    output_tokens: 412,
    cache_creation: {
      ephemeral_1h_input_tokens: 463,
      ephemeral_5m_input_tokens: 0,
    },
    iterations: [
      {
        input_tokens: 2,
        output_tokens: 56,
        cache_read_input_tokens: 24326,
        cache_creation_input_tokens: 463,
        type: 'message',
      },
    ],
  },
  modelUsage: {
    'claude-opus-5-5': {
      inputTokens: 4,
      outputTokens: 412,
      cacheReadInputTokens: 48652,
      cacheCreationInputTokens: 463,
      costUSD: 0.0216904,
    },
  },
} as const satisfies ClaudeResult;

// The same session plus utility calls on Haiku 4.5 (1,700 uncached, 12,000 written at 1 hour,
// 50,000 read, 9 output: $0.030745), listed first as Claude Code may list them.
export const CLAUDE_RESULT_WITH_UTILITY = {
  ...CLAUDE_RESULT,
  // Another session: only a resumed session keeps its id (usage.mts → ownOf).
  session_id: '0c4f2a8e-5b1d-4e7a-9c3f-2d6b8a1e4f70',
  total_cost_usd: 0.0524354,
  modelUsage: {
    'claude-haiku-4-5': {
      inputTokens: 1700,
      outputTokens: 9,
      cacheReadInputTokens: 50000,
      cacheCreationInputTokens: 12000,
      costUSD: 0.030745,
    },
    ...CLAUDE_RESULT.modelUsage,
  },
} as const satisfies ClaudeResult;

// CLAUDE_RESULT's session resumed (`--resume`, as Lane 0's apply part is): `usage` and `num_turns`
// cover this invocation only, `modelUsage` and `total_cost_usd` the whole session so far. This
// invocation alone: 4 uncached, 455 written at 1 hour, 14,976 read, 170 output: $0.0100512.
export const CLAUDE_RESULT_RESUMED = {
  ...CLAUDE_RESULT,
  result: 'PASS — .local/agent-harness/work/42/pr-draft.md',
  total_cost_usd: 0.0317416,
  usage: {
    input_tokens: 4,
    cache_creation_input_tokens: 455,
    cache_read_input_tokens: 14976,
    output_tokens: 170,
    cache_creation: {
      ephemeral_1h_input_tokens: 455,
      ephemeral_5m_input_tokens: 0,
    },
    iterations: [
      {
        input_tokens: 2,
        output_tokens: 85,
        cache_read_input_tokens: 7488,
        cache_creation_input_tokens: 455,
        type: 'message',
      },
    ],
  },
  modelUsage: {
    'claude-opus-5-5': {
      inputTokens: 8,
      outputTokens: 582,
      cacheReadInputTokens: 63628,
      cacheCreationInputTokens: 918,
      costUSD: 0.0317416,
    },
  },
} as const satisfies ClaudeResult;

export type PullRequestState = 'OPEN' | 'CLOSED' | 'MERGED';

export interface PullRequestFixture {
  readonly number: number;
  readonly state: PullRequestState;
  readonly mergedAt: string | null;
  readonly url: string;
}

export const pullRequest = (
  number: number,
  state: PullRequestState
): PullRequestFixture => ({
  number,
  state,
  mergedAt: state === 'MERGED' ? '2026-09-30T10:00:00Z' : null,
  url: `https://github.com/daimlertruck/DT-DDS/pull/${number}`,
});

export const issueClosedBy = (
  ...pullRequests: readonly PullRequestFixture[]
): string =>
  JSON.stringify({
    data: {
      repository: {
        issue: { closedByPullRequestsReferences: { nodes: pullRequests } },
      },
    },
  });

// Git fixtures, isolated from the user's global and system git config (hooks, signing, identity).
export const GIT_ENV: NodeJS.ProcessEnv = {
  ...process.env,
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 'Test',
  GIT_AUTHOR_EMAIL: 'test@invalid',
  GIT_COMMITTER_NAME: 'Test',
  GIT_COMMITTER_EMAIL: 'test@invalid',
};

export const git = (cwd: string, ...args: readonly string[]): string => {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: GIT_ENV,
  });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')}: ${result.stderr}`);
  }
  return result.stdout.trim();
};

export const commitFile = (
  cwd: string,
  path: string,
  content: string,
  message: string
): string => {
  mkdirSync(dirname(join(cwd, path)), { recursive: true });
  writeFileSync(join(cwd, path), content);
  git(cwd, 'add', path);
  git(cwd, 'commit', '-q', '-m', message);
  return git(cwd, 'rev-parse', 'HEAD');
};

// A repo on `main` with one commit, whose `origin/main` points at that commit. `.local/` and the
// harness dirs are excluded from git, so the work dirs and harness files a test writes never count as
// untracked changes.
export const createGitRepo = (): string => {
  const root = mkdtempSync(join(tmpdir(), 'git-repo-'));
  git(root, 'init', '-q', '-b', 'main');
  writeFileSync(
    join(root, '.git/info/exclude'),
    '/.local/\n/agent-harness/\n/.agents/\n'
  );
  commitFile(root, 'README.md', '# Example\n', 'chore: initial commit');
  git(root, 'update-ref', 'refs/remotes/origin/main', 'HEAD');
  return root;
};
