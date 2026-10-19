// Reads the agent's stream-json: its tool calls and how each ended. Pure.

import { isRecord, type JsonObject } from '../../scripts/lib/json.mts';

const GUARD_MARK = '[dt-dds harness]';

// How one tool call ended, read from its tool result.
export type ActionOutcome =
  | 'no result'
  | 'auto-denied (needs approval)'
  | 'denied by the guard'
  | 'failed'
  | 'ran';

export interface Action {
  readonly tool: string;
  readonly target: string;
  readonly outcome: ActionOutcome;
}

// What the session's init message says loaded.
export interface Loaded {
  readonly tools: readonly string[];
  readonly skills: readonly string[];
  readonly agents: readonly string[];
}

// One session's stream-json, read.
export interface Stream {
  readonly actions: readonly Action[];
  readonly finalMessage: string;
  readonly model: string | null;
  readonly permissionMode: string | null;
  // The MCP servers the session loaded, by name: any makes the run INVALID.
  readonly mcpServers: readonly string[];
  readonly loaded: Loaded;
  readonly guardDenials: number;
  readonly permissionDenials: number;
  readonly costUsd: number | null;
  readonly turns: number | null;
  readonly durationMs: number | null;
  readonly finished: boolean;
}

function stringOr<T>(value: unknown, fallback: T): string | T {
  return typeof value === 'string' ? value : fallback;
}

function numberOr<T>(value: unknown, fallback: T): number | T {
  return typeof value === 'number' ? value : fallback;
}

const listOf = (value: unknown): readonly unknown[] =>
  Array.isArray(value) ? value : [];

const stringsOf = (value: unknown): string[] =>
  listOf(value).filter((item): item is string => typeof item === 'string');

// Lines that are not a JSON object (a stray log line, a cut-off last line) are skipped.
const parseJsonLines = (text: string): JsonObject[] =>
  text.split('\n').flatMap((raw) => {
    try {
      const value: unknown = JSON.parse(raw);
      return isRecord(value) ? [value] : [];
    } catch {
      return [];
    }
  });

// The content parts of one type in a message: `tool_use` (assistant) or `tool_result` (user).
const partsOf = (message: JsonObject, type: string): JsonObject[] =>
  listOf(
    isRecord(message.message) ? message.message.content : undefined
  ).filter((part): part is JsonObject => isRecord(part) && part.type === type);

const textOf = (content: unknown): string =>
  typeof content === 'string' ? content : JSON.stringify(content ?? '');

const outcomeOf = (result: JsonObject | undefined): ActionOutcome => {
  if (!result) return 'no result';
  const text = textOf(result.content);
  if (/no approval surface|denied automatically/.test(text)) {
    return 'auto-denied (needs approval)';
  }
  if (text.includes(GUARD_MARK)) return 'denied by the guard';
  return result.is_error ? 'failed' : 'ran';
};

// The input field that names what a tool call acts on, by tool: Bash, Read/Edit/Write,
// NotebookEdit, Grep/Glob, Agent, Skill.
const TARGET_FIELDS = [
  'command',
  'file_path',
  'notebook_path',
  'pattern',
  'subagent_type',
  'skill',
] as const;

const targetOf = (use: JsonObject): string => {
  const input = isRecord(use.input) ? use.input : {};
  return stringOr(
    TARGET_FIELDS.map((field) => input[field]).find(
      (value) => typeof value === 'string'
    ),
    ''
  );
};

const actionsOf = (messages: readonly JsonObject[]): Action[] => {
  const results = new Map(
    messages
      .flatMap((message) => partsOf(message, 'tool_result'))
      .map((part): [unknown, JsonObject] => [part.tool_use_id, part])
  );
  return messages
    .filter(({ type }) => type === 'assistant')
    .flatMap((message) => partsOf(message, 'tool_use'))
    .map((use) => ({
      tool: stringOr(use.name, ''),
      target: targetOf(use),
      outcome: outcomeOf(results.get(use.id)),
    }));
};

const serverName = (server: unknown): string =>
  isRecord(server) && typeof server.name === 'string'
    ? server.name
    : JSON.stringify(server);

export const parseStream = (text: string): Stream => {
  const messages = parseJsonLines(text);
  const init: JsonObject =
    messages.find(
      ({ type, subtype }) => type === 'system' && subtype === 'init'
    ) ?? {};
  const result = messages.findLast(({ type }) => type === 'result');
  const actions = actionsOf(messages);
  return {
    actions,
    finalMessage: stringOr(result?.result, ''),
    model: stringOr(init.model, null),
    permissionMode: stringOr(init.permissionMode, null),
    mcpServers: listOf(init.mcp_servers).map(serverName),
    loaded: {
      tools: stringsOf(init.tools),
      skills: stringsOf(init.skills),
      agents: stringsOf(init.agents),
    },
    guardDenials: text.split('\n').filter((raw) => raw.includes(GUARD_MARK))
      .length,
    permissionDenials: messages.filter(
      ({ type, subtype }) =>
        type === 'system' && subtype === 'permission_denied'
    ).length,
    costUsd: numberOr(result?.total_cost_usd, null),
    turns: numberOr(result?.num_turns, null),
    durationMs: numberOr(result?.duration_ms, null),
    finished: result !== undefined,
  };
};

const short = (text: string, limit: number): string =>
  text.length > limit ? `${text.slice(0, limit - 1)}…` : text;

const firstSentence = (text: string): string =>
  text.trim().split(/(?<=[.!?])\s/)[0] ?? '';

export const whatHappened = ({
  actions,
  finalMessage,
}: Pick<Stream, 'actions' | 'finalMessage'>): string => {
  if (actions.length === 0) {
    return `no tool call; declined: "${short(
      firstSentence(finalMessage),
      100
    )}"`;
  }
  const shown = actions
    .slice(0, 2)
    .map(
      ({ tool, target, outcome }) =>
        `${tool} \`${short(target, 60)}\` → ${outcome}`
    );
  const more = actions.length > 2 ? ` (+${actions.length - 2} more)` : '';
  return `${shown.join('; ')}${more}`;
};
