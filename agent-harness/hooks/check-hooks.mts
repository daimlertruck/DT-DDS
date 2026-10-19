// Health check for the PreToolUse command hooks a settings file registers. When a hook process fails
// (exit other than 0 or 2: a crash, `node` missing, a missing script, a timeout), Claude Code denies
// the call if the hook is registered with "onFailure": "block", so a broken guard stalls a run, and
// lets the call through otherwise, so a broken guard is silent. A hook that denies an ordinary call
// stalls a run too. Each hook runs once, as registered, in a scratch project whose agent-harness/hooks
// links to the real hooks: it must be registered with onFailure: block, exit 0 and allow a benign call.
// Usage: node agent-harness/hooks/check-hooks.mts [settings file]...
//   default: .claude/pipeline.settings.json and .claude/settings.json. Exit 0 all healthy · 1 a hook is broken.
// Run it before a pipeline run (with the run file the run will use) and in the hook tests.

import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The fields read from a hook entry; every `type: 'command'` entry has a `command`.
interface Hook {
  readonly type: string;
  readonly command: string;
  readonly timeout?: number;
  readonly onFailure?: string;
}
interface HookGroup {
  readonly matcher?: string;
  readonly hooks?: readonly Hook[];
}
interface Settings {
  readonly hooks?: { readonly PreToolUse?: readonly HookGroup[] };
}
interface Probe {
  readonly tool_name: string;
  readonly tool_input: Readonly<Record<string, unknown>>;
}
interface HookOutput {
  readonly hookSpecificOutput: {
    readonly permissionDecision?: string;
    readonly permissionDecisionReason?: string;
  };
}
interface HookCheck {
  readonly matcher: string | undefined;
  readonly command: string;
  readonly ok: boolean;
  readonly detail: string;
}
interface CheckOptions {
  readonly settingsPath: string;
  // The hooks the scratch project links to.
  readonly hooksDir?: string;
  readonly env?: NodeJS.ProcessEnv;
  // The scratch project's run file; none when undefined.
  readonly activeRun?: unknown;
}

const HOOKS_DIR = fileURLToPath(new URL('.', import.meta.url));
const REPO = resolve(HOOKS_DIR, '../..');
const MAX_SECONDS = 30;

const READ_PROBE: Probe = {
  tool_name: 'Read',
  tool_input: { file_path: 'README.md' },
};

const PROBES: readonly Probe[] = [
  {
    tool_name: 'Bash',
    tool_input: {
      command: 'git status --short',
      description: 'hook health check',
    },
  },
  READ_PROBE,
  {
    tool_name: 'mcp__github__get_issue',
    tool_input: { owner: 'daimlertruck', repo: 'DT-DDS', issue_number: 1 },
  },
  { tool_name: 'mcp__figma__get_metadata', tool_input: {} },
];

const probeFor = (matcher = '') => {
  const pattern = new RegExp(`^(?:${matcher || '.*'})$`);
  return PROBES.find(({ tool_name }) => pattern.test(tool_name)) ?? READ_PROBE;
};

const firstLine = (text: string) => text.trim().split('\n')[0] ?? '';

/**
 * Why a hook run is broken, or null when it allowed the probe call.
 * @param blocks the hook is registered with onFailure: block
 */
const verdictOf = (
  run: SpawnSyncReturns<string>,
  probe: Probe,
  seconds: number,
  blocks: boolean
): string | null => {
  const failure = blocks
    ? 'Claude Code denies every call: a run would stall'
    : 'Claude Code lets every call through';
  const code = (run.error as NodeJS.ErrnoException | undefined)?.code;
  if (code === 'ETIMEDOUT') return `timed out after ${seconds} s; ${failure}`;
  if (run.status !== 0)
    return `exit ${run.status}${
      run.stderr.trim() ? `: ${firstLine(run.stderr)}` : ''
    }; ${failure}`;
  if (!run.stdout.trim()) return null;
  try {
    const { permissionDecision, permissionDecisionReason } = (
      JSON.parse(run.stdout) as HookOutput
    ).hookSpecificOutput;
    if (permissionDecision === 'allow') return null;
    const verb =
      permissionDecision === 'deny'
        ? 'denies'
        : `answers ${permissionDecision} to`;
    return `${verb} a benign ${probe.tool_name} call (${permissionDecisionReason}); a run would stall on denials`;
  } catch {
    return `unparseable output: ${firstLine(run.stdout)}`;
  }
};

/**
 * @param activeRun the run file: a string is written as is, another value as JSON
 */
const scratchProject = (hooksDir: string, activeRun: unknown) => {
  const root = mkdtempSync(join(tmpdir(), 'dt-dds-hook-check-'));
  mkdirSync(join(root, '.local/agent-harness/work'), { recursive: true });
  mkdirSync(join(root, 'agent-harness'), { recursive: true });
  symlinkSync(resolve(hooksDir), join(root, 'agent-harness/hooks'));
  if (activeRun !== undefined) {
    writeFileSync(
      join(root, '.local/agent-harness/work/.active-run.json'),
      typeof activeRun === 'string' ? activeRun : JSON.stringify(activeRun)
    );
  }
  return root;
};

// Runs each PreToolUse command hook of a settings file once, on a benign call.
export const checkHooks = ({
  settingsPath,
  hooksDir = HOOKS_DIR,
  env = process.env,
  activeRun,
}: CheckOptions): HookCheck[] => {
  const settings = JSON.parse(readFileSync(settingsPath, 'utf8')) as Settings;
  const groups = settings.hooks?.PreToolUse ?? [];
  const root = scratchProject(hooksDir, activeRun);
  try {
    return groups.flatMap(({ matcher, hooks = [] }) =>
      hooks
        .filter(({ type }) => type === 'command')
        .map(({ command, timeout, onFailure }) => {
          const probe = probeFor(matcher);
          const seconds = Math.min(timeout ?? MAX_SECONDS, MAX_SECONDS);
          const run = spawnSync('/bin/sh', ['-c', command], {
            cwd: root,
            env: { ...env, CLAUDE_PROJECT_DIR: root },
            input: JSON.stringify({
              session_id: 'hook-check',
              hook_event_name: 'PreToolUse',
              cwd: root,
              ...probe,
            }),
            encoding: 'utf8',
            timeout: seconds * 1000,
          });
          const blocks = onFailure === 'block';
          const detail =
            verdictOf(run, probe, seconds, blocks) ??
            (blocks
              ? null
              : 'fails open if it cannot start: add "onFailure": "block"');
          return {
            matcher,
            command,
            ok: detail === null,
            detail: detail ?? `allows a benign ${probe.tool_name} call`,
          };
        })
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const files = process.argv.slice(2);
  const targets = files.length
    ? files.map((file) => resolve(file))
    : [
        join(REPO, '.claude/pipeline.settings.json'),
        join(REPO, '.claude/settings.json'),
      ];
  const results = targets.flatMap((settingsPath) =>
    checkHooks({ settingsPath }).map((result) => ({
      ...result,
      file: relative(REPO, settingsPath),
    }))
  );
  results.forEach(({ file, matcher, command, ok, detail }) =>
    process.stdout.write(
      `${ok ? 'ok    ' : 'BROKEN'} ${file} [${matcher}] ${
        command.match(/[\w-]+\.mts/)?.[0] ?? command
      }: ${detail}\n`
    )
  );
  process.exit(results.every(({ ok }) => ok) ? 0 : 1);
}
