// The hook registration as Claude Code reads it: which guard runs for which tool, from the real
// settings files. A matcher typo or a dropped entry fails here instead of silently guarding nothing.
// Matchers follow the documented rules: empty or `*` matches every tool; letters, digits, `_`, `-`,
// spaces, `,` and `|` only is an exact name or a list of them; anything else is an unanchored regex.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

interface Hook {
  readonly command: string;
  readonly onFailure?: string;
}
interface Group {
  readonly matcher?: string;
  readonly hooks: readonly Hook[];
}
interface Settings {
  readonly disableAllHooks?: boolean;
  readonly hooks: { readonly PreToolUse: readonly Group[] };
}

const settingsOf = (path: string): Settings =>
  JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'));
const project = settingsOf('.claude/settings.json');
const pipeline = settingsOf('.claude/pipeline.settings.json');

const matches = (matcher: string | undefined, tool: string): boolean => {
  if (!matcher || matcher === '*') return true;
  if (/^[\w\s,|-]+$/.test(matcher))
    return matcher.split(/[|,]/).some((name) => name.trim() === tool);
  return new RegExp(matcher).test(tool);
};

// The guard scripts that run for a tool under a settings file.
const guardsFor = (settings: Settings, tool: string): string[] =>
  settings.hooks.PreToolUse.filter(({ matcher }) => matches(matcher, tool))
    .flatMap(({ hooks }) => hooks)
    .map(({ command }) => command.match(/[\w-]+\.mts/)?.[0] ?? command);

test('guard-bash runs for every Bash call', () => {
  assert.deepEqual(guardsFor(project, 'Bash'), ['guard-bash.mts']);
});

test('guard-mcp runs for GitHub and Figma MCP tools under any server name', () => {
  [
    'mcp__github__create_pull_request',
    'mcp__plugin_github_github__create_pull_request',
    'mcp__claude_ai_GitHub__create_pull_request',
    'mcp__GITHUB__create_pull_request',
    'mcp__figma__use_figma',
    'mcp__plugin_design_figma__use_figma',
    'mcp__claude_ai_Figma__use_figma',
  ].forEach((tool) =>
    assert.deepEqual(guardsFor(project, tool), ['guard-mcp.mts'], tool)
  );
});

// Stage sessions load the project settings too, so guard-bash is their one Bash guard (the
// integration test proves it holds in a stage).
test('pipeline runs add the run budget to every tool', () => {
  ['Read', 'Write', 'Bash', 'Agent', 'mcp__github__get_issue'].forEach((tool) =>
    assert.deepEqual(guardsFor(pipeline, tool), ['budget-guard.mts'], tool)
  );
});

test('every guard fails closed and no lower settings level can switch the guards off', () => {
  [project, pipeline].forEach((settings) => {
    assert.equal(settings.disableAllHooks, false);
    settings.hooks.PreToolUse.flatMap(({ hooks }) => hooks).forEach(
      ({ command, onFailure }) => assert.equal(onFailure, 'block', command)
    );
  });
});
