// Fixtures for claude-code.integration.test.mts (not a test file): the real `claude` CLI against a
// scripted model. A local server answers the Messages API with tool calls a scenario names, so Claude
// Code runs its own permission rules and PreToolUse hooks on them; no model, key or network is used.

import { spawn, spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { createServer, type IncomingMessage, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../..', import.meta.url));
const SESSION_TIMEOUT_MS = 60_000;

// Why the integration tests cannot run here, or null when `claude` is on PATH.
export const claudeMissing = (): string | null => {
  const run = spawnSync('claude', ['--version'], { encoding: 'utf8' });
  return run.status === 0 ? null : 'the claude CLI is not on PATH';
};

// One tool call the scripted model makes. `when`: text the request's system prompt must contain,
// which picks the session or subagent that makes the call (an agent's own prompt).
export interface ScriptedCall {
  readonly id: string;
  readonly tool: string;
  readonly input: Readonly<Record<string, unknown>>;
  readonly when?: string;
}

interface MessagesRequest {
  readonly stream?: boolean;
  readonly system?: unknown;
  readonly tools?: readonly { readonly name: string }[];
  readonly messages?: readonly unknown[];
}

type Block =
  | { readonly type: 'text'; readonly text: string }
  | {
      readonly type: 'tool_use';
      readonly id: string;
      readonly name: string;
      readonly input: Readonly<Record<string, unknown>>;
    };

// The tool_use id of a scripted call: unique, so no prompt text can contain it.
export const toolUseId = (id: string): string => `toolu_scripted_${id}`;

// Each request gets the first scripted call whose tool it offers, whose `when` its system prompt
// contains and whose id its messages do not hold yet; any other request ends its turn.
export const replyTo = (
  request: MessagesRequest,
  script: readonly ScriptedCall[]
): Block => {
  const offered = new Set((request.tools ?? []).map(({ name }) => name));
  const system = JSON.stringify(request.system ?? '');
  const history = JSON.stringify(request.messages ?? []);
  const call = script.find(
    ({ id, tool, when }) =>
      offered.has(tool) &&
      (when === undefined || system.includes(when)) &&
      !history.includes(`"${toolUseId(id)}"`)
  );
  return call
    ? {
        type: 'tool_use',
        id: toolUseId(call.id),
        name: call.tool,
        input: call.input,
      }
    : { type: 'text', text: 'done' };
};

const messageOf = (content: readonly Block[], stopReason: string | null) => ({
  id: 'msg_scripted',
  type: 'message',
  role: 'assistant',
  model: 'scripted',
  content,
  stop_reason: stopReason,
  stop_sequence: null,
  usage: { input_tokens: 1, output_tokens: 1 },
});

const eventsOf = (block: Block, stopReason: string) => [
  { type: 'message_start', message: messageOf([], null) },
  {
    type: 'content_block_start',
    index: 0,
    content_block:
      block.type === 'tool_use'
        ? { ...block, input: {} }
        : { ...block, text: '' },
  },
  {
    type: 'content_block_delta',
    index: 0,
    delta:
      block.type === 'tool_use'
        ? {
            type: 'input_json_delta',
            partial_json: JSON.stringify(block.input),
          }
        : { type: 'text_delta', text: block.text },
  },
  { type: 'content_block_stop', index: 0 },
  {
    type: 'message_delta',
    delta: { stop_reason: stopReason, stop_sequence: null },
    usage: { output_tokens: 1 },
  },
  { type: 'message_stop' },
];

const bodyOf = (request: IncomingMessage): Promise<string> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const parsed = (text: string): MessagesRequest => {
  try {
    return JSON.parse(text) as MessagesRequest;
  } catch {
    return {};
  }
};

const listen = (server: Server): Promise<string> =>
  new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve(
        typeof address === 'object' && address
          ? `http://127.0.0.1:${address.port}`
          : ''
      );
    })
  );

const scriptedModel = async (script: readonly ScriptedCall[]) => {
  const requests: string[] = [];
  const server = createServer((request, response) => {
    void bodyOf(request).then((text) => {
      const body = parsed(text);
      if (
        !request.url?.startsWith('/v1/messages?') &&
        request.url !== '/v1/messages'
      ) {
        response.writeHead(200, { 'content-type': 'application/json' });
        response.end('{"input_tokens":1}');
        return;
      }
      requests.push(text);
      const block = replyTo(body, script);
      const stopReason = block.type === 'tool_use' ? 'tool_use' : 'end_turn';
      if (!body.stream) {
        response.writeHead(200, { 'content-type': 'application/json' });
        response.end(JSON.stringify(messageOf([block], stopReason)));
        return;
      }
      response.writeHead(200, { 'content-type': 'text/event-stream' });
      eventsOf(block, stopReason).forEach((event) =>
        response.write(
          `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`
        )
      );
      response.end();
    });
  });
  const url = await listen(server);
  return { url, requests, close: () => server.close() };
};

const git = (cwd: string, ...args: string[]): string => {
  const run = spawnSync('git', args, { cwd, encoding: 'utf8', env: GIT_ENV });
  if (run.status !== 0) throw new Error(`git ${args.join(' ')}: ${run.stderr}`);
  return run.stdout.trim();
};

const GIT_ENV: NodeJS.ProcessEnv = {
  PATH: process.env.PATH,
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_AUTHOR_NAME: 'Test Agent',
  GIT_AUTHOR_EMAIL: 'agent@test.invalid',
  GIT_COMMITTER_NAME: 'Test Agent',
  GIT_COMMITTER_EMAIL: 'agent@test.invalid',
  GIT_TERMINAL_PROMPT: '0',
};

// A shim on PATH that logs its arguments and succeeds, so a call that ran leaves a line.
const shim = (bin: string, name: string): void =>
  writeFileSync(
    join(bin, name),
    `#!/bin/sh\nprintf '%s\\n' "$*" >> '${join(bin, `${name}.log`)}'\n`,
    { mode: 0o755 }
  );

export interface Sandbox {
  readonly root: string;
  readonly remote: string;
  readonly configDir: string;
  readonly bin: string;
  readonly remoteRefs: () => string;
  readonly head: () => string;
  readonly shimCalls: (name: string) => string[];
  readonly read: (path: string) => string | null;
}

// A throwaway repo with the real harness registration: the project and pipeline settings and the
// reviewer agents are copied, the hooks dir is linked. Its origin is a local bare repo, and gh and
// yarn are logging shims, so nothing a guard lets through can leave the machine.
export const sandbox = (): Sandbox => {
  const base = realpathSync(mkdtempSync(join(tmpdir(), 'dt-dds-claude-it-')));
  const root = join(base, 'repo');
  const remote = join(base, 'remote.git');
  const configDir = join(base, 'config');
  const bin = join(base, 'bin');
  [
    root,
    configDir,
    bin,
    join(root, '.local/agent-harness/work'),
    join(root, 'agent-harness'),
    join(root, '.claude'),
  ].forEach((dir) => mkdirSync(dir, { recursive: true }));
  git(base, 'init', '-q', '--bare', remote);
  git(root, 'init', '-q', '-b', 'main');
  writeFileSync(
    join(root, '.gitignore'),
    '/.local/\n/agent-harness/\n/.claude/\n'
  );
  writeFileSync(join(root, 'README.md'), '# sandbox\n');
  writeFileSync(join(root, 'yarn.lock'), '# lockfile\n');
  git(root, 'add', '.gitignore', 'README.md', 'yarn.lock');
  git(root, 'commit', '-q', '-m', 'chore: init');
  git(root, 'commit', '-q', '--allow-empty', '-m', 'docs: second');
  git(root, 'remote', 'add', 'origin', remote);
  symlinkSync(
    join(REPO, 'agent-harness/hooks'),
    join(root, 'agent-harness/hooks')
  );
  cpSync(
    join(REPO, '.claude/pipeline.settings.json'),
    join(root, '.claude/pipeline.settings.json')
  );
  cpSync(
    join(REPO, '.claude/settings.json'),
    join(root, '.claude/settings.json')
  );
  cpSync(join(REPO, '.claude/agents'), join(root, '.claude/agents'), {
    recursive: true,
  });
  ['gh', 'yarn', 'npm'].forEach((name) => shim(bin, name));
  const shimLog = (name: string) => join(bin, `${name}.log`);
  return {
    root,
    remote,
    configDir,
    bin,
    remoteRefs: () => git(remote, 'for-each-ref'),
    head: () => git(root, 'rev-parse', 'HEAD'),
    shimCalls: (name) =>
      existsSync(shimLog(name))
        ? readFileSync(shimLog(name), 'utf8').trim().split('\n')
        : [],
    read: (path) =>
      existsSync(join(root, path))
        ? readFileSync(join(root, path), 'utf8')
        : null,
  };
};

// Marks the sandbox trusted in its config dir, as accepting the trust dialog would: Claude Code runs
// an agent's frontmatter hooks only in a trusted folder.
export const trust = ({ configDir, root }: Sandbox): void =>
  writeFileSync(
    join(configDir, '.claude.json'),
    JSON.stringify({ projects: { [root]: { hasTrustDialogAccepted: true } } })
  );

export interface ToolResult {
  readonly isError: boolean;
  readonly content: string;
}

export interface Session {
  readonly exitCode: number | null;
  readonly results: ReadonlyMap<string, ToolResult>;
  readonly stderr: string;
  // The Messages API request bodies the session sent, as JSON text.
  readonly requests: readonly string[];
}

const contentText = (content: unknown): string =>
  typeof content === 'string' ? content : JSON.stringify(content);

// The tool results of a stream-json transcript, by tool_use id (subagents' included).
export const toolResultsOf = (stdout: string): Map<string, ToolResult> => {
  const results = new Map<string, ToolResult>();
  stdout.split('\n').forEach((line) => {
    let event: { type?: string; message?: { content?: unknown } };
    try {
      event = JSON.parse(line);
    } catch {
      return;
    }
    const content = event.type === 'user' ? event.message?.content : undefined;
    if (!Array.isArray(content)) return;
    content
      .filter((block) => block?.type === 'tool_result')
      .forEach((block) =>
        results.set(String(block.tool_use_id), {
          isError: block.is_error === true,
          content: contentText(block.content),
        })
      );
  });
  return results;
};

export interface SessionOptions {
  readonly script: readonly ScriptedCall[];
  // Flags after `claude -p <prompt>`; the prompt is `go` unless `prompt` is set.
  readonly args: readonly string[];
  readonly prompt?: string;
  // Added to the session's environment, as run-stage.mts adds the runner's (session-env.mts).
  readonly env?: Readonly<Record<string, string | undefined>>;
}

// One `claude -p` session in the sandbox against the scripted model, with an environment built from
// scratch: a fake key, the sandbox's config dir and home, no git, gh or npm credentials.
export const runClaude = async (
  box: Sandbox,
  { script, args, prompt = 'go', env: extra = {} }: SessionOptions
): Promise<Session> => {
  const model = await scriptedModel(script);
  const home = join(box.configDir, '..', 'home');
  mkdirSync(home, { recursive: true });
  const env: NodeJS.ProcessEnv = {
    ...GIT_ENV,
    PATH: `${box.bin}:${process.env.PATH}`,
    HOME: home,
    TMPDIR: process.env.TMPDIR,
    CLAUDE_CONFIG_DIR: box.configDir,
    ANTHROPIC_BASE_URL: model.url,
    ANTHROPIC_API_KEY: 'sk-ant-scripted-not-a-key',
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1',
    DISABLE_AUTOUPDATER: '1',
    ...extra,
  };
  const child = spawn(
    'claude',
    [
      '-p',
      prompt,
      '--output-format',
      'stream-json',
      '--verbose',
      '--max-turns',
      '6',
      ...args,
    ],
    { cwd: box.root, env, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  let stdout = '';
  let stderr = '';
  child.stdout.on(
    'data',
    (chunk: Buffer) => (stdout += chunk.toString('utf8'))
  );
  child.stderr.on(
    'data',
    (chunk: Buffer) => (stderr += chunk.toString('utf8'))
  );
  const timer = setTimeout(() => child.kill('SIGKILL'), SESSION_TIMEOUT_MS);
  const exitCode = await new Promise<number | null>((resolve) =>
    child.on('close', (code) => resolve(code))
  );
  clearTimeout(timer);
  model.close();
  return {
    exitCode,
    results: toolResultsOf(stdout),
    stderr,
    requests: model.requests,
  };
};
