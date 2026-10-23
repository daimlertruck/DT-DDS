@AGENTS.md

Claude Code specifics:

- Project skills: canonical in `.agents/skills/`, exposed as per-skill links in `.claude/skills/`
  (kept in sync by the SessionStart hook). Pipeline stages run as their own `claude -p` sessions,
  started by `agent-harness/scripts/run.mts` (in a terminal, or driven by `/ds-run-pipeline`); never
  run a stage skill inline.
- Trial mode applies: never write to GitHub; prepare commands for the human instead (enforced by the
  PreToolUse guard in `.claude/settings.json`).
- Loading is additive: personal (`~/.claude`) memory, skills, agents and hooks load alongside this
  project's. On a skill **name clash the personal skill wins**, so never give a project skill the
  name of a personal one. On a subagent name clash the project agent wins. Where personal rules
  contradict the repo, AGENTS.md → Precedence applies.
