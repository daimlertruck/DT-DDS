import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const guard = fileURLToPath(new URL('./guard-mcp.mts', import.meta.url));

type Case = readonly [expected: string, input: string];

const cases: readonly Case[] = [
  ['allow', 'mcp__github__get_issue'],
  ['allow', 'mcp__github__list_pull_requests'],
  ['allow', 'mcp__github__search_issues'],
  ['allow', 'mcp__github__pull_request_read'],
  ['allow', 'mcp__github__issue_read'],
  ['allow', 'mcp__claude_ai_Claude_Docs__read'],
  ['deny', 'mcp__github__add_issue_comment'],
  ['deny', 'mcp__github__pull_request_review_write'],
  ['deny', 'mcp__github__add_comment_to_pending_review'],
  ['deny', 'mcp__github__create_pull_request'],
  ['deny', 'mcp__github__update_issue'],
  ['deny', 'mcp__github__merge_pull_request'],
  ['deny', 'mcp__github__push_files'],
  ['deny', 'mcp__github__create_or_update_file'],
  ['allow', 'mcp__plugin_design_figma__get_design_context'],
  ['allow', 'mcp__plugin_design_figma__get_metadata'],
  ['allow', 'mcp__plugin_design_figma__authenticate'],
  ['allow', 'mcp__plugin_design_figma__complete_authentication'],
  ['allow', 'mcp__figma__get_screenshot'],
  ['allow', 'mcp__figma__get_variable_defs'],
  ['allow', 'mcp__figma__get_code_connect_map'],
  ['allow', 'mcp__figma__get_code'],
  ['allow', 'mcp__figma__search_design_system'],
  ['allow', 'mcp__claude_ai_Figma__get_design_context'],
  ['deny', 'mcp__plugin_design_figma__use_figma'],
  ['deny', 'mcp__figma__generate_figma_design'],
  ['deny', 'mcp__figma__create_new_file'],
  ['deny', 'mcp__figma__upload_assets'],
  ['deny', 'mcp__figma__generate_diagram'],
  ['deny', 'mcp__figma__add_code_connect_map'],
  ['deny', 'mcp__figma__send_code_connect_mappings'],
  ['deny', 'mcp__figma__create_design_system_rules'],
  ['deny', 'mcp__figma__weave_run_tool'],
  ['deny', 'mcp__claude_ai_Figma__use_figma'],
  ['deny', 'mcp__figma__a_write_tool_figma_adds_later'],
  ['allow', 'mcp__claude_ai_Gmail__authenticate'],
  // A GitHub server under another name: a plugin's or a claude.ai connector's.
  ['deny', 'mcp__plugin_github_github__create_pull_request'],
  ['deny', 'mcp__plugin_github_github__add_issue_comment'],
  ['deny', 'mcp__claude_ai_GitHub__create_pull_request'],
  ['deny', 'mcp__github-enterprise__merge_pull_request'],
  ['allow', 'mcp__plugin_github_github__get_issue'],
  ['allow', 'mcp__plugin_github_github__pull_request_read'],
  ['allow', 'mcp__claude_ai_GitHub__search_issues'],
  ['deny', 'mcp__github__mark_all_notifications_read'],
];

const decisionOf = (toolName: string) => {
  const input = JSON.stringify({ tool_name: toolName, tool_input: {} });
  const run = spawnSync('node', [guard], { input, encoding: 'utf8' });
  if (run.status !== 0) return `exit ${run.status}`;
  return run.stdout.trim()
    ? JSON.parse(run.stdout).hookSpecificOutput.permissionDecision
    : 'allow';
};

const rawCases: readonly Case[] = [
  ['deny', '{not json'],
  ['deny', ''],
  ['deny', JSON.stringify({ tool_input: {} })],
  ['deny', JSON.stringify({ tool_name: 42, tool_input: {} })],
];

/** @param input the raw hook input */
const rawDecisionOf = (input: string) => {
  const run = spawnSync('node', [guard], { input, encoding: 'utf8' });
  if (run.status !== 0) return `exit ${run.status}`;
  return run.stdout.trim()
    ? JSON.parse(run.stdout).hookSpecificOutput.permissionDecision
    : 'allow';
};

cases.forEach(([expected, tool]) =>
  test(`${expected}: ${tool}`, () => assert.equal(decisionOf(tool), expected))
);
rawCases.forEach(([expected, input]) =>
  test(`${expected} on raw input ${input || '(empty)'}`, () =>
    assert.equal(rawDecisionOf(input), expected))
);
