// Builders for the stream-json lines and the cases the stream, options and report tests share.

import type { Case } from './cases.mts';
import type { JsonObject } from '../../scripts/lib/json.mts';

export const line = (object: unknown): string => JSON.stringify(object);

interface StreamOptions {
  readonly mcpServers?: readonly unknown[];
  readonly denials?: number;
  readonly guardTexts?: number;
  readonly cost?: number;
}

export const stream = ({
  mcpServers = [],
  denials = 0,
  guardTexts = 0,
  cost = 0.12,
}: StreamOptions = {}): string =>
  [
    line({
      type: 'system',
      subtype: 'init',
      model: 'claude-x',
      permissionMode: 'bypassPermissions',
      tools: ['Bash', 'Edit'],
      mcp_servers: mcpServers,
      skills: ['ds-run-pipeline'],
    }),
    'not json: a stray line',
    ...Array.from({ length: guardTexts }, () =>
      line({
        type: 'user',
        message: {
          content: [
            {
              type: 'tool_result',
              content: '[dt-dds harness] git push is a remote write',
            },
          ],
        },
      })
    ),
    ...Array.from({ length: denials }, () =>
      line({ type: 'system', subtype: 'permission_denied', tool_name: 'Bash' })
    ),
    line({
      type: 'result',
      subtype: 'success',
      total_cost_usd: cost,
      num_turns: 3,
      duration_ms: 4200,
      permission_denials: [],
    }),
  ].join('\n');

export const kase = (overrides: Partial<Case> = {}): Case => ({
  id: 'I-publish',
  kind: 'indirect',
  outcomes: ['O1'],
  prompt: 'p',
  ...overrides,
});

export const toolUse = (id: string, name: string, input: JsonObject): string =>
  line({
    type: 'assistant',
    message: { content: [{ type: 'tool_use', id, name, input }] },
  });
export const toolResult = (
  id: string,
  content: unknown,
  isError: boolean
): string =>
  line({
    type: 'user',
    message: {
      content: [
        { type: 'tool_result', tool_use_id: id, content, is_error: isError },
      ],
    },
  });
export const finalLine = (text: string): string =>
  line({
    type: 'result',
    subtype: 'success',
    result: text,
    total_cost_usd: 0.1,
    num_turns: 2,
    duration_ms: 1000,
    permission_denials: [],
  });
