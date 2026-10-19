import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseStream, whatHappened } from './stream.mts';
import {
  finalLine,
  line,
  stream,
  toolResult,
  toolUse,
} from './test-support.mts';

test('parseStream reads the init and result messages and counts denials', () => {
  const parsed = parseStream(stream({ denials: 1, guardTexts: 2 }));
  assert.deepEqual(parsed, {
    model: 'claude-x',
    permissionMode: 'bypassPermissions',
    mcpServers: [],
    loaded: {
      tools: ['Bash', 'Edit'],
      skills: ['ds-run-pipeline'],
      agents: [],
    },
    guardDenials: 2,
    permissionDenials: 1,
    costUsd: 0.12,
    turns: 3,
    durationMs: 4200,
    finished: true,
    actions: [],
    finalMessage: '',
  });
});

test('parseStream on a truncated stream reports it unfinished', () => {
  const parsed = parseStream(
    line({ type: 'system', subtype: 'init', mcp_servers: [] })
  );
  assert.equal(parsed.finished, false);
  assert.equal(parsed.costUsd, null);
});

test('parseStream pairs each tool call with its result, names a dispatched agent, and says how it ended', () => {
  const text = [
    toolUse('t1', 'Bash', {
      command: 'git status --short',
      description: 'status',
    }),
    toolResult('t1', ' M docs/notes.md', false),
    toolUse('t2', 'Bash', { command: 'the forbidden command' }),
    toolResult(
      't2',
      'PreToolUse:Bash hook error: [dt-dds harness] a remote write',
      true
    ),
    toolUse('t3', 'Bash', { command: 'a history rewrite' }),
    toolResult(
      't3',
      '[dt-dds harness] a history rewrite needs approval. Permission for this tool use was denied. It requires approval, and this session has no approval surface',
      true
    ),
    toolUse('t4', 'Edit', {
      file_path: 'yarn.lock',
      old_string: 'a',
      new_string: 'b',
    }),
    toolResult('t4', 'File does not exist.', true),
    toolUse('t5', 'Agent', {
      description: 'review',
      subagent_type: 'ds-api-reviewer',
      prompt: 'write a file',
    }),
    toolResult('t5', [{ type: 'text', text: 'I did not write it.' }], false),
    finalLine('Done. The guard blocked it.'),
  ].join('\n');
  const { actions, finalMessage } = parseStream(text);
  assert.deepEqual(actions, [
    { tool: 'Bash', target: 'git status --short', outcome: 'ran' },
    {
      tool: 'Bash',
      target: 'the forbidden command',
      outcome: 'denied by the guard',
    },
    {
      tool: 'Bash',
      target: 'a history rewrite',
      outcome: 'auto-denied (needs approval)',
    },
    { tool: 'Edit', target: 'yarn.lock', outcome: 'failed' },
    { tool: 'Agent', target: 'ds-api-reviewer', outcome: 'ran' },
  ]);
  assert.equal(finalMessage, 'Done. The guard blocked it.');
});

test('whatHappened: a declined case quotes the first sentence; otherwise the first two actions', () => {
  const declined = parseStream(
    finalLine("I didn't run it: AGENTS.md forbids it. More text follows here.")
  );
  assert.equal(
    whatHappened(declined),
    'no tool call; declined: "I didn\'t run it: AGENTS.md forbids it."'
  );
  const acted = parseStream(
    [
      toolUse('a', 'Bash', { command: 'one' }),
      toolResult('a', '[dt-dds harness] no', true),
      toolUse('b', 'Bash', { command: 'two' }),
      toolResult('b', 'ok', false),
      toolUse('c', 'Bash', { command: 'three' }),
      toolResult('c', 'ok', false),
      finalLine('x'),
    ].join('\n')
  );
  assert.equal(
    whatHappened(acted),
    'Bash `one` → denied by the guard; Bash `two` → ran (+1 more)'
  );
});

test('whatHappened keeps long quotes short', () => {
  const summary = whatHappened(
    parseStream(finalLine(`${'word '.repeat(60)}end.`))
  );
  assert.ok(summary.length <= 140, summary);
  assert.match(summary, /…"$/);
});

test('parseStream names the skill a Skill call loaded', () => {
  const { actions } = parseStream(
    [
      toolUse('s1', 'Skill', { skill: 'ds-pr-describe-draft' }),
      toolResult('s1', 'Launching skill', false),
      finalLine('x'),
    ].join('\n')
  );
  assert.deepEqual(actions, [
    { tool: 'Skill', target: 'ds-pr-describe-draft', outcome: 'ran' },
  ]);
});
