---
name: ds-gather-context
description: 'Use as DT-DDS pipeline stage 1 (intake): turn a GitHub issue, its RFC chain, spec README and linked docs into the context bundle for planning.'
argument-hint: '<ISSUE-NUMBER>'
---

# Gather context (intake)

First stage. Turn a GitHub issue and the documents it depends on into a structured context bundle.
Run in isolation: the artifact file is the only thing that crosses to the next stage.
Read-only against GitHub (AGENTS.md → Trial mode).

## Input

A GitHub issue number `<N>` in `daimlertruck/DT-DDS`. On a re-dispatch (after `grill` or `revise:`
at G1), also read `.local/agent-harness/work/<N>/intake-decisions.md` and `run-log.md` when they exist: the
decisions there bind.

## Preflight (fail loud — never guess)

1. Fetch the issue: `gh issue view <N> --json number,title,body,labels,state,assignees,milestone,comments,url`.
   Auth failure → STOP and name it. On the first pass, save that JSON unchanged to
   `.local/agent-harness/work/<N>/issue.json`: it freezes the issue as it was at intake. Never overwrite an
   existing `issue.json`.
2. **Provided-spec fallback:** only if the human explicitly hands over a spec (path or pasted text)
   instead of an issue, copy it verbatim to `.local/agent-harness/work/<N>/spec.md` and record it as a substituted
   source. A spec-looking file you merely found stays a lead, never a source: surface it and STOP.
3. The issue must be open and labelled `status:ready`, or `status:in progress` with the current `gh`
   user (`gh api user --jq .login`) among its assignees (claimed); else `BLOCKED-NOT-READY`.
4. **RFC gate** (AGENTS.md → Architecture decisions): if the issue is `type:feature`, carries
   `needs:rfc`, or asks for a new component / new public API, a **merged** RFC in `docs/rfcs/` whose
   `Component issue` links `#<N>` must exist (`grep -l "#<N>\|issues/<N>" docs/rfcs/*.md`, and
   `git log origin/main -- <rfc>` shows it merged). Missing → `BLOCKED-RFC-MISSING`: the RFC is a
   separate PR a maintainer approves first.
5. **Conflicts:** a conflict is two requirement-bearing statements that disagree (AC, prop names,
   defaults, keyboard behaviour, exact values) across issue, RFC(s), and the component spec README.
   STOP with `BLOCKED-SPEC-CONFLICT` and quote both verbatim; never pick one. Historical prose is
   not a conflict: quote it under Open questions.

## Procedure

1. Parse the issue body. Form issues (`.github/ISSUE_TEMPLATE/`) render `### <Field label>`
   sections (`_No response_` = empty); read a blank issue as free text.
2. Identify the affected package(s) (`packages/react-packages/<pkg>`, themes, …) from the issue and
   RFC; verify each path exists.
3. Read depth-one sources: the RFC chain for the component (`docs/rfcs/*-<component>*.md`, oldest
   first; each RFC is a delta), the component spec `packages/react-packages/<pkg>/README.md`, ADRs
   the issue/RFC links, and issues the issue links (`#123`). List skipped links with a reason.
   Leave `.local/` out of reads and searches, except this run's work dir: the rest is other runs and
   local run records, not sources, and their decisions may be superseded.
4. **Acceptance criteria:** take them from the RFC's `## Acceptance Criteria` if present, else the
   issue's Acceptance Criteria (features) or Expected Behavior (bugs). Number them `AC1…ACn`, quoted
   verbatim. No AC anywhere → `NEEDS-CLARIFICATION` under Open questions (DoR requires AC).
   **Vague terms:** an AC term with no observable ("correctly", "works", "properly", "as
   expected", "looks right") is an Open question. Propose a definition as a list of observable
   items (what to check, where, compared with what), and mark each item as automatable or as
   needing human judgement (visual).
5. Record route and metadata: type/area/priority labels, milestone (`[OKRn]`), parent issue (OKR
   sub-issues: `gh api repos/daimlertruck/DT-DDS/issues/<N>/parent` if available), linked RFC/ADR.
6. **Design artifacts:** if the issue/RFC links Figma and a design MCP is configured, pull frames
   and tokens into `.local/agent-harness/work/<N>/assets/` with `assets/manifest.md` (file · source ·
   story/state · viewport), using its read tools only (AGENTS.md → Tooling / MCP): Figma
   `get_metadata`, `get_screenshot` for each designed state, `get_variable_defs`. Attached images go
   there too. A visual ticket with no design → Open question for G1; never fabricate one.

## Scope discipline

- The issue's file:line, command and SHA facts are inputs (AGENTS.md → Work intake & routing).
  Check only what routing depends on: labels, the claim, the RFC gate, and that the affected paths
  exist. Reproducing the bug belongs to the verify stage.
- A choice the issue already makes with a reason (for example a version range) is a requirement.
  An open question exists only when an AC has no observable or two sources conflict.
- An out-of-scope observation gets one line under Stays as is, marked "not checked".
- At a `run budget` denial or the turn limit, return `PARTIAL: <what is left>`.

## Output artifact: `.local/agent-harness/work/<N>/context-bundle.md`

Sections: Summary · Source (issue URL, RFC(s), spec README, ADRs) · Route (bug / enhancement /
feature+RFC) · Affected packages · Requirements · Acceptance Criteria (`AC1…`) · Dependencies & blockers · Open questions · Stays as is · Skipped links. Quote exact values
verbatim.

**Each open question** gives the human what they need to decide at G1:

1. **Current practice, newest first:** what the most recent comparable cases in the repo do, with
   dates and SHAs (`git log`), then the older practice if it differs and when it changed. A
   majority count alone is not evidence of current practice.
2. **Consequences** of each option, for this change and later (for example "the only `0.x`
   package in the library").
3. **A recommendation.** "Maintainer decision" is allowed only with the reason no recommendation
   is possible, never as the whole answer.
4. Every claim not checked in this run is marked "unverified".

**Stays as is:** what the change deliberately leaves untouched, in the words the PR body will use
("Kept as is on purpose: …"), so the human sees it at G1 and not first in the PR draft.
