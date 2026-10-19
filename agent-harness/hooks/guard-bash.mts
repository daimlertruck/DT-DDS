// PreToolUse guard for the Bash tool (DT-DDS harness, Trial mode — see AGENTS.md).
// Denies remote writes, release commands, hook bypasses and staging of .local/ (run state);
// asks the human before history rewrites and before any gh command that is not a known read.
// Reads the hook payload from stdin. Line continuations are joined first. A rule applies when it
// matches any view of the command: as written; with git's global options and gh's leading and
// --repo flags removed (`git -C <dir> push`, `gh pr -R o/r create`); with quoted text emptied, so
// a separator inside a commit message hides no flag after it; and with quote characters dropped,
// as the shell joins words (`git "push"`). More views can only add denials. A text guard: a script
// the agent writes and runs, or a command built from variables, is not seen (AGENTS.md → Trial mode).

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface Pattern {
  test(command: string): boolean;
}
type Rule = readonly [pattern: Pattern, reason: string];

const stripHeredocs = (command: string) =>
  command.replace(
    /<<-?\s*['"]?(\w+)['"]?[^\n]*\n[\s\S]*?\n\s*\1\b/g,
    '<<heredoc'
  );

// One shell word: unquoted characters and quoted parts (`user.name="Eval Human"` is one word).
const ARG = String.raw`(?:[^\s"']|"[^"]*"|'[^']*')+`;
const GIT_GLOBAL_OPTIONS = new RegExp(
  String.raw`\bgit(?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--config-env|--attr-source)(?:=${ARG}|\s+${ARG})|--?[A-Za-z][\w-]*(?:=${ARG})?))+`,
  'g'
);
const stripGitGlobalOptions = (command: string) =>
  command.replace(GIT_GLOBAL_OPTIONS, 'git');
const GH_REPO_FLAG = new RegExp(
  String.raw`\s(?:-R|--repo)(?:=|\s+)${ARG}`,
  'g'
);
// gh also reads flags placed before the command (`gh --title=x pr create`).
const GH_LEADING_FLAGS = /\bgh(?:\s+--?[A-Za-z][\w-]*(?:=\S*)?)+(?=\s)/g;
const stripGhFlags = (command: string) =>
  command.replace(GH_REPO_FLAG, '').replace(GH_LEADING_FLAGS, 'gh');

const joinContinuations = (command: string) => command.replace(/\\\n/g, ' ');
const emptyQuotes = (command: string) =>
  command.replace(/"(?:[^"\\]|\\.)*"|'[^']*'/g, (quoted) =>
    quoted.slice(0, 1).repeat(2)
  );
const dropQuotes = (command: string) => command.replace(/["']/g, '');
const normalized = (command: string) =>
  stripGhFlags(stripGitGlobalOptions(command));

const JS_RUNTIME = String.raw`\b(?:node|tsx)\b`;

const DENY_RULES: readonly Rule[] = [
  [
    new RegExp(
      String.raw`${JS_RUNTIME}[^\n]*(?:\bchangeset-plugin\b|\s--add-(?:tag|changesets)\b)`
    ),
    'scripts/changeset-plugin is CI-only: --add-tag commits and tags, --add-changesets writes .changeset/*.md.',
  ],
  [
    new RegExp(
      String.raw`${JS_RUNTIME}[^\n]*\b(?:addTag|conventionalCommitChangeset)\b\s*(?:\(|\.\s*(?:call|apply|bind)\b)`
    ),
    'addTag/conventionalCommitChangeset commit, tag or write .changeset/*.md: CI-only (release automation).',
  ],
  [
    /\bunset(?:-all)?\s+core\.hookspath\b|\bcore\.hookspath\b(?!\s*(?:$|[;&|)>]|2>))/im,
    'Never change or override core.hooksPath: it disables the husky hooks.',
  ],
  [
    /\bgit(?:\s+(?:push|send-pack|http-push|subtree\b[^;&|\n]*\spush|lfs\s+push)|-lfs\s+push)\b/,
    'git push is a remote write — the human pushes (Trial mode).',
  ],
  [
    /\bgit\b[^;&|\n]*\s-c\s*['"]?alias\.|\bgit\s+config\b(?![^;&|\n]*\s(?:--get\S*|get|--list|-l|list|--unset\S*|unset)\b)[^;&|\n]*\salias\.[\w.-]+(?:=|\s+(?!\d*>)[^\s;&|<>])/,
    'A git alias hides the command it runs from this guard: run the command itself.',
  ],
  [
    /\bgh\s+pr\s+(create|new|edit|comment|review|merge|ready|close|reopen|lock|unlock|update-branch|revert)\b/,
    'gh pr writes are human-only (Trial mode). Prepare the command for the human instead.',
  ],
  [
    /\bgh\s+issue\s+(create|new|edit|comment|close|reopen|delete|transfer|pin|unpin|lock|unlock|develop)\b/,
    'gh issue writes are human-only (Trial mode). Prepare the command for the human instead.',
  ],
  [
    /\bgh\s+(label|release|secret|variable|ruleset|cache|gist)\s+(create|edit|delete|clone|upload|set|remove)\b/,
    'GitHub configuration writes are human-only (Trial mode).',
  ],
  [
    /\bgh\s+repo\s+(create|edit|delete|rename|archive|unarchive|fork|sync|set-default)\b/,
    'gh repo writes are human-only (Trial mode).',
  ],
  [
    /\bgh\s+(workflow\s+(run|enable|disable)|run\s+(rerun|cancel|delete))\b/,
    'Triggering or changing workflow runs is human-only (Trial mode).',
  ],
  [
    /\bgh\s+project\s+(create|edit|delete|close|copy|link|unlink|mark-template|field-create|field-delete|item-add|item-create|item-edit|item-delete|item-archive)\b/,
    'Project board writes are human-only (Trial mode).',
  ],
  [
    /\b(?:npm|yarn|pnpm)\b[^;&|\n]*\s(?:publish|pub|unpublish)(?![\w-])|\bnpm\b[^;&|\n]*\sdist-tag\s+(?:add|rm)\b/,
    'Publishing is CI-only (AGENTS.md → Off-limits paths).',
  ],
  [
    /(?:\bchangeset|@changesets\/cli)(?:@[\w.^~-]+)?(?:\/bin\.js)?\s+(version|publish|pre|tag)\b/,
    'Changesets commands are CI-only (release automation).',
  ],
  [
    /\b(?:yarn|npm|pnpm)\b[^;&|\n]*[\s'"]changesets:/,
    'The changesets:* scripts are CI-only (they commit and tag).',
  ],
  [
    /\b(?:yarn|npm|pnpm)\b[^;&|\n]*\srelease\b/,
    'The release script is not part of the workflow (CI publishes).',
  ],
  [
    /\bgit\s+tag[ \t]+(?!(-l|--list|-n\d*|--contains|--no-contains|--merged|--no-merged|--points-at|--sort|--format|-v|--verify)\b|\d*[|;&)<>])\S/,
    'Creating/deleting tags is CI-only (release automation).',
  ],
  [
    /\bgit\s+update-ref\b[^;&|\n]*\srefs\/tags\//,
    'Creating/deleting tags is CI-only (release automation).',
  ],
  [
    /--no-veri(?:fy?)?\b/,
    'Never bypass the husky hooks (commitlint, DCO sign-off, check-pkg-deps).',
  ],
  [/\bHUSKY=0\b/, 'Never disable husky hooks.'],
  [
    /\bgit\s+commit\b[^;&|\n]*\s-[a-zA-Z]*n[a-zA-Z]*\b/,
    'git commit -n bypasses the hooks — not allowed.',
  ],
  [
    /\bgit\s+commit\b[^;&|\n]*(\s-[a-zA-RT-Z]*s[a-zA-Z]*\b|\s--si(?:g(?:n(?:o(?:ff?)?)?)?)?\b)/,
    'Agents never sign off: drop -s/--signoff. The husky hook appends the human Signed-off-by.',
  ],
  [
    /\bgit\s+commit\b[^;&|\n]*\s(-[a-zA-Z]*a[a-zA-Z]*|--all)\b/,
    'Stage by explicit path — no git commit -a/--all (AGENTS.md → Branch & commit policy).',
  ],
  [
    /\bgit\s+add\b[^;&|\n]*\s(-A|--all|-u|--update|\.|:\/)(\s|$)/,
    'Stage by explicit path — no git add -A/./-u.',
  ],
  [
    /\bgit\s+add\b[^;&|\n]*(\s|\/)\.local(?![\w.-])/,
    'Run state, work dirs and local records (.local/) stay out of git (.gitignore).',
  ],
];

const RESET_MODE = /^--(?:soft|mixed|keep|merge)$/;
const COMMIT_ISH =
  /^(?:origin|upstream|refs)\/|[~^]|@\{|^[0-9a-f]{7,40}$|^v?\d+(?:\.\d+)+(?:-[\w.]+)?$/i;
const unquote = (token: string) => token.replace(/^(['"])(.*)\1$/, '$2');

/** @param args the words after `git reset` */
const resetMovesBranch = (args: string) => {
  const tokens = args
    .replace(/\d*[<>]+&?\S*/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(unquote);
  if (tokens.some((token) => RESET_MODE.test(token))) return true;
  const end = tokens.includes('--') ? tokens.indexOf('--') : tokens.length;
  const target = tokens.slice(0, end).find((token) => !token.startsWith('-'));
  if (!target || target === 'HEAD' || target === '@') return false;
  return COMMIT_ISH.test(target) || !/[.*]/.test(target);
};

/**
 * A reset with a mode flag or a commit target can move the branch; `git reset [HEAD] -- <path>` only unstages.
 */
const RESET_MOVING_BRANCH: Pattern = {
  test: (command) =>
    [...command.matchAll(/\bgit\s+reset\b([^;&|\n)]*)/g)].some(
      ([, args = '']) => resetMovesBranch(args)
    ),
};

const ASK_RULES: readonly Rule[] = [
  [
    /\bgit\s+(?:rebase\b|pull\b[^;&|\n]*\s(?:--rebase(?!=false)\S*|-[a-zA-Z]*r[a-zA-Z]*)(?:\s|$))|\bgit\b[^;&|\n]*\s-c\s*['"]?pull\.rebase=(?!false)/,
    "History rewrite (rebase) — human approval required. A pipeline run's own fixups are folded by run.mts (autosquash.mts), not by a stage.",
  ],
  [
    /\bgit\s+reset\s+[^;&|\n]*--hard\b/,
    'git reset --hard discards work — human approval required.',
  ],
  [
    RESET_MOVING_BRANCH,
    'git reset with a mode flag or a commit target moves the branch — human approval required. To unstage, use git reset -- <path>.',
  ],
  [
    /\bgit\s+(checkout|switch)\s+[^;&|\n]*(?:-(B|C)\b|--force-create\b)/,
    'Force-recreating a branch — human approval required.',
  ],
  [
    /\bgit\s+branch\b[^;&|\n]*\s(?:-[a-zA-Z]*[DMCf][a-zA-Z]*|--force)(?:\s|$)/,
    'Force delete/rename/reset of a branch — human approval required.',
  ],
  [
    /\bgit\s+commit\b[^;&|\n]*\s--am(?:e(?:nd?)?)?\b/,
    'Amending rewrites a commit — human approval required.',
  ],
  [
    /\bgit\s+(stash\s+(drop|clear)|clean\s+[^;&|\n]*-[a-zA-Z]*f[a-zA-Z]*)\b/,
    'Discarding stashes/untracked files — human approval required.',
  ],
  [
    /\bgit\s+(filter-branch|filter-repo|update-ref|replace)\b/,
    'Low-level history rewrite — human approval required.',
  ],
];

// Agents may read GitHub: these gh commands only read. Any other gh command asks (Trial mode).
const GH_READS = new Set([
  'view',
  'list',
  'ls',
  'status',
  'diff',
  'checks',
  'watch',
]);
const GH_READ_COMMANDS = new Set(['search', 'status', 'version', 'help']);

// The command strings a shell wrapper or eval runs (`bash -c "…"`), checked as commands of their own.
const WRAPPED =
  /\b(?:(?:ba|z)?sh\s+-[a-z]*c|eval)\s+(?:"((?:[^"\\]|\\.)*)"|'([^']*)')/g;
const wrappedOf = (command: string): string[] =>
  [...command.matchAll(WRAPPED)].map(
    ([, doubled, single]) => doubled ?? single ?? ''
  );

const METHOD_FLAG =
  /\s(?:-[a-zA-Z]*X(?:=|\s*)|--method(?:\s+|=))['"]?([A-Za-z]+)/g;
const methodsIn = (text: string): string[] =>
  [...text.matchAll(METHOD_FLAG)].map(([, method = '']) =>
    method.toUpperCase()
  );

// Whether a file, relative to one of the directories, contains the pattern; unreadable is no.
const fileHas = (
  dirs: readonly string[],
  file: string,
  pattern: RegExp
): boolean =>
  dirs.some((dir) => {
    try {
      return pattern.test(readFileSync(resolve(dir, file), 'utf8'));
    } catch {
      return false;
    }
  });

/**
 * Why a `gh api` call in the command is a remote write, or null when every call reads. gh takes the
 * last method flag, so any method other than GET is a write (`-XPOST`, `--method=GET … -X POST`). A
 * GraphQL mutation counts wherever it is: in the command, a heredoc (`joined`) or a `query=@file`.
 */
const ghApiVerdict = (
  command: string,
  joined: string,
  dirs: readonly string[]
): string | null => {
  if (!/\bgh\s+api\b/.test(command)) return null;
  const write = methodsIn(command).find((method) => method !== 'GET');
  if (write) return `gh api --method ${write} is a remote write (Trial mode).`;
  const queryFiles = [
    ...command.matchAll(
      new RegExp(
        String.raw`\s(?:-[fF]|--field|--raw-field)(?:=|\s+)query=@(${ARG})`,
        'g'
      )
    ),
  ].map(([, file = '']) => unquote(file));
  if (
    /\bgh\s+api\s+graphql\b/.test(command) &&
    (/\bmutation\b/.test(joined) ||
      queryFiles.some((file) => fileHas(dirs, file, /\bmutation\b/)))
  )
    return 'GraphQL mutations are remote writes (Trial mode).';
  // Fields without a method make a POST. Judged with quoted text emptied, so a quoted `|` does not
  // split a call and a `$(gh api -X GET …)` value lends it no method.
  const posts = emptyQuotes(command)
    .split(/&&|\|\||;|\|/)
    .filter(
      (call) =>
        /\bgh\s+api\b/.test(call) && !/\bgh\s+api\s+graphql\b/.test(call)
    )
    .some(
      (call) =>
        !methodsIn(call).length &&
        /\s(-f|-F|--field|--raw-field|--input)(\s|=)/.test(call)
    );
  return posts
    ? 'gh api with fields defaults to POST — add --method GET for reads (Trial mode).'
    : null;
};

/**
 * Why a gh command needs the human, or null when every gh command in it is a known read (`api` is
 * judged by ghApiVerdict). Reads: `gh <group> view|list|ls|status|diff|checks|watch`,
 * `gh auth status`, `gh search …`, `gh status`, `gh --version`. Judged with quoted text emptied, so a
 * quoted mention (`grep "gh pr view"`) is not a gh command.
 */
const ghReadVerdict = (command: string): string | null => {
  const calls = [command, ...wrappedOf(command)].flatMap((text) => [
    ...stripGhFlags(emptyQuotes(text)).matchAll(/\bgh((?:\s+[^\s()`$;&|]+)*)/g),
  ]);
  for (const [, args = ''] of calls) {
    const words = args.trim().split(/\s+/).filter(Boolean);
    if (!words[0] || words[0].startsWith('-')) continue;
    const [group = '', sub = ''] = words;
    const read =
      group === 'api' ||
      GH_READ_COMMANDS.has(group) ||
      (group === 'auth' && sub === 'status') ||
      GH_READS.has(sub);
    if (!read)
      return `gh ${group} ${sub} is not a known read; agents only read GitHub (Trial mode) — human approval required.`;
  }
  return null;
};

function respond(permissionDecision: 'deny' | 'ask', reason: string): never {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision,
        permissionDecisionReason: `[dt-dds harness] ${reason}`,
      },
    })
  );
  process.exit(0);
}

// Checked with heredocs kept: a heredoc is where a commit message carries a trailer.
const SIGN_OFF_TEXT =
  /\bgit\s+(?:commit|interpret-trailers)\b[\s\S]*Signed-off-by\s*[:=]/i;
const SIGN_OFF_LINE = /^Signed-off-by\s*:/im;
const SIGN_OFF_ANYWHERE = /Signed-off-by\s*[:=]/i;
const SIGN_OFF_REASON =
  'Agents never add a Signed-off-by (trailer, -m, message text or message file) — only the human signs off (added by the husky hook).';

// The message files a commit reads (-F/--file, -F<file>); `-` is stdin, checked as text above.
const messageFilesOf = (command: string): string[] =>
  [...command.matchAll(/\bgit\s+commit\b[^;&|\n]*/g)].flatMap(([segment]) =>
    [
      ...segment.matchAll(
        new RegExp(String.raw`\s(?:-F\s*|--file(?:=|\s+))(${ARG})`, 'g')
      ),
    ]
      .map(([, file = '']) => unquote(file))
      .filter((file) => file !== '-')
  );

// Where a relative file in the command may be: the session's directory and any `cd` or `-C` target.
const dirsOf = (command: string, cwd: string): string[] => [
  cwd,
  ...[
    ...command.matchAll(new RegExp(String.raw`(?:\bcd|\s-C)\s+(${ARG})`, 'g')),
  ].map(([, dir = '']) => resolve(cwd, unquote(dir))),
];

const decide = (rawCommand: string, cwd: string) => {
  const joined = joinContinuations(rawCommand);
  const command = stripHeredocs(joined);
  const views = [
    command,
    normalized(command),
    normalized(emptyQuotes(command)),
    normalized(dropQuotes(command)),
  ];
  const matchesAnyView = ([pattern]: Rule) =>
    views.some((view) => pattern.test(view));

  const denied = DENY_RULES.find(matchesAnyView);
  if (denied) respond('deny', denied[1]);

  // A message file is checked as it is now, and as text the same command may write into it.
  const dirs = dirsOf(joined, cwd);
  const files = messageFilesOf(normalized(command));
  if (
    SIGN_OFF_TEXT.test(stripGitGlobalOptions(joined)) ||
    (files.length > 0 && SIGN_OFF_ANYWHERE.test(joined)) ||
    files.some((file) => fileHas(dirs, file, SIGN_OFF_LINE))
  )
    respond('deny', SIGN_OFF_REASON);

  const apiReason = ghApiVerdict(command, joined, dirs);
  if (apiReason) respond('deny', apiReason);

  const asked = ASK_RULES.find(matchesAnyView);
  if (asked) respond('ask', asked[1]);

  const ghReason = ghReadVerdict(command);
  if (ghReason) respond('ask', ghReason);
};

// Every unexpected input or error is a deny: Claude Code before 2.1.295 ignores onFailure: block.
try {
  const payload = JSON.parse(readFileSync(0, 'utf8'));
  const cwd =
    typeof payload.cwd === 'string'
      ? payload.cwd
      : process.env.CLAUDE_PROJECT_DIR || process.cwd();
  decide(payload.tool_input.command, cwd);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  respond('deny', `guard error (${message}); failing closed.`);
}

process.exit(0);
