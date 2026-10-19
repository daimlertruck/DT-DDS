// PreToolUse guard for the DT-DDS reviewer subagents (.claude/agents/ds-{spec,api,a11y}-reviewer.md, ds-token-auditor.md).
// Reviewers are read-only: reports go to .local/agent-harness/work/ only; Bash is limited to
// inspection commands. Registered in each reviewer's frontmatter `hooks:`; the
// project guards (guard-bash, guard-mcp) still run as well.

import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';

/**
 * The hook input fields this guard reads.
 */
interface HookInput {
  tool_name: string;
  tool_input?: { command?: string; file_path?: string; notebook_path?: string };
  cwd?: string;
}

const WRITE_TOOLS = new Set(['Write', 'Edit', 'MultiEdit', 'NotebookEdit']);

const READ_ONLY_COMMANDS = new Set([
  'cat',
  'head',
  'tail',
  'wc',
  'ls',
  'grep',
  'rg',
  'jq',
  'cut',
  'tr',
  'diff',
  'sort',
  'uniq',
  'find',
  'git',
  'basename',
  'dirname',
  'realpath',
  'pwd',
  'echo',
  'printf',
  'test',
  '[',
  'true',
  'false',
  'cd',
  'file',
  'stat',
  'tree',
]);

const GIT_READ_SUBCOMMANDS = new Set([
  'diff',
  'log',
  'show',
  'status',
  'rev-parse',
  'merge-base',
  'ls-files',
  'ls-tree',
  'grep',
  'blame',
  'cat-file',
  'describe',
  'shortlog',
  'name-rev',
  'for-each-ref',
  'branch',
]);

const GIT_BRANCH_LIST_FLAGS = new Set([
  '--show-current',
  '-a',
  '--all',
  '-r',
  '--remotes',
  '--list',
  '-l',
  '-v',
  '-vv',
  '--verbose',
  '--no-color',
  '--color',
]);
const GIT_BRANCH_VALUE_FLAGS = new Set([
  '--contains',
  '--no-contains',
  '--merged',
  '--no-merged',
  '--points-at',
  '--sort',
  '--format',
]);

const FIND_ACTIONS =
  /^-(delete|exec|execdir|ok|okdir|fprint|fprint0|fprintf|fls)$/;

function respond(permissionDecision: 'deny', reason: string): never {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision,
        permissionDecisionReason: `[dt-dds harness] read-only reviewer: ${reason}`,
      },
    })
  );
  process.exit(0);
}

const HARMLESS_REDIRECT = /^\d?>(&\d|\s*\/dev\/null)/;

/**
 * Splits a command at |, ;, & and newlines outside quotes, and lists the hazards it contains.
 */
const scan = (command: string) => {
  const segments: string[] = [];
  const hazards: string[] = [];
  let current = '';
  let quote: string | null = null;
  for (let i = 0; i < command.length; i += 1) {
    const char = command[i];
    const next = command[i + 1];
    if (quote) {
      if (char === quote) quote = null;
      else if (
        quote === '"' &&
        (char === '`' || (char === '$' && next === '('))
      )
        hazards.push('command substitution');
      current += char;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }
    if (char === '`' || (char === '$' && next === '('))
      hazards.push('command substitution');
    if ((char === '<' || char === '>') && next === '(')
      hazards.push('process substitution');
    const harmless = command.slice(i).match(HARMLESS_REDIRECT);
    if (harmless) {
      i += harmless[0].length - 1;
      continue;
    }
    if (char === '>') hazards.push('output redirection');
    if (char === '|' || char === ';' || char === '&' || char === '\n') {
      segments.push(current);
      current = '';
      if ((char === '|' || char === '&') && next === char) i += 1;
      continue;
    }
    current += char;
  }
  segments.push(current);
  return { segments: segments.map((s) => s.trim()).filter(Boolean), hazards };
};

/**
 * The words of a segment, quoted words without their quotes.
 */
const words = (segment: string) =>
  [...segment.matchAll(/(?:[^\s"']|"[^"]*"|'[^']*')+/g)].map(([word]) =>
    word.replace(/["']/g, '')
  );

/**
 * @param args the words after `git`
 */
const gitVerdict = (args: string[]): string | null => {
  let index = 0;
  while (args[index]?.startsWith('-')) {
    if (args[index] === '-C') index += 2;
    else if (args[index] === '--no-pager') index += 1;
    else return `git option ${args[index]} is not allowed`;
  }
  const [subcommand, ...rest] = args.slice(index);
  if (subcommand === undefined || !GIT_READ_SUBCOMMANDS.has(subcommand))
    return `git ${subcommand ?? ''} is not a read-only subcommand`;
  if (rest.some((a) => /^--output(=|$)|^-O|^--open-files-in-pager/.test(a)))
    return `git ${subcommand} must not write output files or open pagers`;
  if (subcommand === 'branch') {
    for (let i = 0; i < rest.length; i += 1) {
      const flag = rest[i] ?? '';
      if (GIT_BRANCH_VALUE_FLAGS.has(flag)) i += 1;
      else if (!GIT_BRANCH_LIST_FLAGS.has(flag.split('=')[0] ?? ''))
        return 'git branch may only list branches';
    }
  }
  return null;
};

/**
 * Why a segment is not a read-only inspection, or null when it is.
 */
const segmentVerdict = (segment: string): string | null => {
  const tokens = words(segment);
  if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(tokens[0] ?? ''))
    return 'environment assignments are not allowed (GIT_EXTERNAL_DIFF, GIT_PAGER and others run a program)';
  const [command, ...args] = tokens;
  if (command === undefined || !READ_ONLY_COMMANDS.has(command))
    return `\`${command}\` is not an inspection command`;
  if (command === 'git') return gitVerdict(args);
  if (command === 'find' && args.some((a) => FIND_ACTIONS.test(a)))
    return 'find actions (-delete/-exec/-fprint…) are not allowed';
  if (command === 'sort' && args.some((a) => /^(-[a-zA-Z]*o|--o)/.test(a)))
    return 'sort -o writes a file';
  if (command === 'sort' && args.some((a) => /^--com/.test(a)))
    return 'sort --compress-program runs a program';
  if (command === 'tree' && args.some((a) => /^-[a-zA-Z]*o/.test(a)))
    return 'tree -o writes a file';
  if (command === 'uniq' && args.filter((a) => !a.startsWith('-')).length > 1)
    return 'uniq with an output file writes a file';
  if (command === 'rg' && args.some((a) => /^--pre(=|$)/.test(a)))
    return 'rg --pre executes a command';
  return null;
};

const decide = (payload: HookInput) => {
  const toolName = payload.tool_name;
  const input = payload.tool_input ?? {};

  if (WRITE_TOOLS.has(toolName)) {
    const projectDir =
      process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
    const target = resolve(
      projectDir,
      input.file_path ?? input.notebook_path ?? ''
    );
    const workDir = resolve(projectDir, '.local/agent-harness/work') + sep;
    if (!target.startsWith(workDir)) {
      respond(
        'deny',
        `write reports only under .local/agent-harness/work/<N>/ (got ${
          input.file_path ?? input.notebook_path
        }).`
      );
    }
    process.exit(0);
  }

  if (toolName === 'Bash') {
    if (typeof input.command !== 'string')
      respond('deny', 'unexpected hook input (no command); failing closed.');
    const { segments, hazards } = scan(input.command);
    if (hazards.length > 0)
      respond(
        'deny',
        `${hazards[0]} is not allowed; run inspection commands directly.`
      );
    const reason = segments.map(segmentVerdict).find(Boolean);
    if (reason) {
      respond(
        'deny',
        `${reason}. Use Read/Grep/Glob, or git diff|log|show|grep, rg, ls, find, cat, wc, jq. Execution evidence comes from validation-report.md.`
      );
    }
  }
};

// Every unexpected input or error is a deny: Claude Code before 2.1.295 ignores onFailure: block.
try {
  const payload = JSON.parse(readFileSync(0, 'utf8'));
  if (typeof payload?.tool_name !== 'string')
    respond('deny', 'unexpected hook input (no tool_name); failing closed.');
  decide(payload);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  respond('deny', `guard error (${message}); failing closed.`);
}

process.exit(0);
