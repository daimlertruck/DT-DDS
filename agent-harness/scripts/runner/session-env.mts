// The environment for a fresh `claude -p` session started by a harness script: this process's
// environment minus the variables a parent Claude Code session sets for its own tools and hooks, so a
// child started from inside a session does not inherit them (CLAUDE_EFFORT would change its effort),
// minus the parent shell's directory variables (below), plus the push block (below).
// Used by run-stage.mts.

export type Env = Readonly<Record<string, string | undefined>>;

export const SESSION_VARIABLES: readonly string[] = [
  'CLAUDECODE',
  'CLAUDE_CODE_ENTRYPOINT',
  'CLAUDE_CODE_SESSION_ID',
  'CLAUDE_CODE_CHILD_SESSION',
  'CLAUDE_CODE_SESSION_ATTENDED',
  'CLAUDE_CODE_MESSAGING_SOCKET',
  'CLAUDE_CODE_MESSAGING_TOKEN',
  'CLAUDE_CODE_EXECPATH',
  'CLAUDE_PID',
  'CLAUDE_EFFORT',
  'CLAUDE_PLUGIN_DATA',
];

// The parent shell's directory variables. A shell's inherited PWD can name its cwd under another
// spelling (another case on a case-insensitive disk); Claude Code takes that spelling as its working
// directory, and relative permission rules then miss the real paths. So OLDPWD goes, and PWD is the
// session's own cwd when the caller names it.
const SHELL_DIRECTORIES: readonly string[] = ['OLDPWD'];

// The push block: git config passed in the environment rewrites every push URL to a scheme git has no
// helper for, so any push from the session fails, whatever runs it (a script, a test, a tool, a
// command built from variables, none of which guard-bash sees); fetches are unaffected. Added after
// any git config the parent passes the same way. Not tamper-proof: a command can reset these
// variables or set a remote's pushurl. Only the human pushes (AGENTS.md → Trial mode).
const NO_PUSH_KEY = 'url.agents-may-not-push://.pushInsteadOf';

const noPushConfig = (env: Env): Record<string, string> => {
  const count = Number(env.GIT_CONFIG_COUNT ?? 0);
  const index = Number.isInteger(count) && count > 0 ? count : 0;
  return {
    GIT_CONFIG_COUNT: String(index + 1),
    [`GIT_CONFIG_KEY_${index}`]: NO_PUSH_KEY,
    [`GIT_CONFIG_VALUE_${index}`]: '',
  };
};

export const freshSessionEnv = (
  env: Env = process.env,
  cwd: string | null = null
): Record<string, string | undefined> => ({
  ...Object.fromEntries(
    Object.entries(env).filter(
      ([name]) =>
        !SESSION_VARIABLES.includes(name) && !SHELL_DIRECTORIES.includes(name)
    )
  ),
  ...(cwd ? { PWD: cwd } : {}),
  ...noPushConfig(env),
});
