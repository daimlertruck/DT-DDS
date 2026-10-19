// PreToolUse guard for MCP tools (DT-DDS harness, Trial mode — see AGENTS.md).
// GitHub (any server whose name contains "github": `github`, a plugin's, a claude.ai connector's):
// read-only tools allowed; every other GitHub MCP tool denied (comments, reviews, labels, PRs, pushes).
// Figma (any server whose name contains "figma"): only the read tools below are allowed; everything else
// is denied, including write tools Figma adds later (fail closed). Agents read designs; humans change them.

import { readFileSync } from 'node:fs';

const GITHUB_READ_ONLY = /^(?:get_|list_|search_|download_)|_read$/;
// Ends like a read tool, but marks notifications read.
const GITHUB_WRITES = new Set(['mark_all_notifications_read']);
const FIGMA_READ_TOOLS = new Set([
  'authenticate',
  'complete_authentication',
  'download_assets',
  'get_code',
  'get_code_connect_map',
  'get_design_context',
  'get_figjam',
  'get_image',
  'get_libraries',
  'get_metadata',
  'get_motion_context',
  'get_screenshot',
  'get_variable_defs',
  'search_design_system',
  'whoami',
]);

function deny(reason: string): never {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `[dt-dds harness] ${reason}`,
      },
    })
  );
  process.exit(0);
}

const decide = (toolName: string) => {
  const [, server = '', tool = ''] = /^mcp__(.+?)__(.+)$/.exec(toolName) ?? [];

  if (
    /github/i.test(server) &&
    (!GITHUB_READ_ONLY.test(tool) || GITHUB_WRITES.has(tool))
  ) {
    deny(
      `${toolName} writes to GitHub — human-only in Trial mode. Prepare the text/command for the human instead.`
    );
  }

  if (/figma/i.test(server) && !FIGMA_READ_TOOLS.has(tool)) {
    deny(
      `${toolName} is not a Figma read tool — agents use Figma read-only (design context, screenshots, ` +
        'variables, metadata, Code Connect map). Ask a human to make Figma changes.'
    );
  }
};

// Every unexpected input or error is a deny: Claude Code before 2.1.295 ignores onFailure: block.
try {
  const toolName = JSON.parse(readFileSync(0, 'utf8'))?.tool_name;
  if (typeof toolName !== 'string')
    deny('unexpected hook input (no tool_name); failing closed.');
  decide(toolName);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  deny(`guard error (${message}); failing closed.`);
}

process.exit(0);
