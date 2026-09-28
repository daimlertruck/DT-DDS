# Adopt a human-gated agentic development workflow for DT-DDS

- Status: In Review
- Author: Antonio Freire
- Deciders: DT-DDS maintainers (MAINTAINERS.md)
- Date: 28 September 2026
- Decision due date: 30 September 2026 (Maintainers Sync)

**Priority:** High

## Context and Problem Statement

Tracking issue: #245 (P0). It is expedited as a standalone issue, running in parallel to the OKR
milestones.

**Why now.** This responds to the AI-native company-wide priority initiative. The goal is to raise
the design system's delivery throughput so that most of the Q4 roadmap can land by the end of the
year. Maintainer capacity is the constraint.

**How agents get their instructions.** AI coding agents can read an issue, change code, run checks,
commit and push. They take instructions from files in the repository and from their user's personal
configuration. `AGENTS.md` is the shared convention that several agents read. Claude Code reads it
too, or reads a `CLAUDE.md` that imports it. DT-DDS has neither file today, so nothing tells an
agent how we work here.

**Where agents can go wrong.**

- **Releases.** Every commit message on `main` ends up in the changelog and releases the packages it
  touches. One `!` in a message releases all 43 packages.
- **Files we never edit by hand,** like the generated themes, changelogs, test snapshots and
  `yarn.lock`.
- **Our own rules.** Some of our rules differ from what agents do by default: we use Jest, not
  Vitest, and only a person signs off a commit.

**Design and runtime tooling today.**

- **Figma.** The component spec template has a "Figma Reference" section, but only 1 of 39 component
  READMEs links a Figma node.
- **Storybook.** Storybook 8.6 publishes PR previews to gh-pages (`PR-<n>/`).
- **No automation.** There is no browser automation, and no automated accessibility or visual
  regression check (#225 and #226 are open).
- **What the tools now offer agents:**
  - **Figma MCP server:** read tools for design context, screenshots, variables and Code Connect
    mappings, plus write tools.
  - **Storybook MCP** (Storybook 10.3+): docs tools (component manifest), dev tools (changed
    stories, previews) and a test tool (runs story tests, including accessibility).
  - **Chromatic** (chromatic.com, the Storybook team's hosted service): it can host the Storybook
    MCP server of a published Storybook. We could also host that server ourselves
    (`@storybook/mcp`). Either way, a hosted server has the docs tools only, so this workflow runs
    the server locally, where the dev and test tools work. Chromatic would only come in if we chose
    it for VRT (#226), and for now we're going with our own setup there.

**Question.** Should DT-DDS adopt a shared, versioned workflow for AI coding agents? If so, how much
of it, with which guardrails, which design and runtime tools at which stage, and what evidence is
needed before any gate runs without a human?

## Considered Options

- **Status quo:** no repo-level agent guidance. Each contributor's agent uses its personal
  configuration.
- **Contract only:** commit `AGENTS.md`, the directory guides and the `CLAUDE.md` import stubs. No
  skills, hooks or pipeline.
- **Human-gated harness:** the contract, skills (pipeline and design-system reviewers) and guard
  hooks. A human gate follows every stage, and humans do all GitHub writes. Design and runtime tools
  are wired in by stage. Adopted in phases.
- **Spec-driven development framework:** OpenSpec or GitHub spec-kit as the agent workflow.

## Pros and Cons of the Options

### Status quo

#### Pros

- No work and no new files to maintain.

#### Cons

- Agents rediscover conventions on every run and fall back to personal defaults that contradict the
  repo.
- Nothing stops an agent from pushing, publishing, tagging, bypassing husky hooks or adding a
  sign-off.
- Stale CONTRIBUTING sections are followed as written.
- Human review is the only defence against spec drift and release mistakes.
- It does not answer the company priority.

### Contract only

#### Pros

- It is small, agent-agnostic and cheap to maintain.
- It settles which conventions apply, for every agent that reads `AGENTS.md`.
- It doubles as up-to-date contributor documentation.

#### Cons

- It is advisory only: nothing enforces the rules on remote writes, releases or sign-off.
- There is no repeatable verify → review → PR flow, so the quality of each run depends on the prompt.
- There are no design-system review lenses and no defined use of Figma or Storybook.
- Nothing checks the runs, so agents still need close watching on every task, and the throughput
  gain stays small.

### Human-gated harness

#### Pros

- **Safety is enforced.**
  - Guard hooks deny GitHub writes, release commands, hook bypass, agent sign-off and staging of
    harness files.
  - History rewrites need human approval.
  - Reviewer agents are read-only.
  - The guards have their own automated tests.
- **The flow is repeatable and reviewable.**
  - Each stage runs in a fresh agent context and writes an artifact.
  - A human approves or revises every stage.
  - Loops are bounded.
- **It adds no parallel spec store.** It builds on the repo's own spec surface (issue → RFC → README
  spec → ADR) and on the Definition of Done.
- **It adds DT-DDS skills on top of the shared ones:** one for each pipeline stage (context,
  architecture, plan, implementation, verification, review and the PR description), four
  design-system reviewers (spec, API, accessibility and tokens), and one for working through PR
  review comments.
- **Design and runtime evidence comes from the real sources:** Figma for intent, Storybook for
  behaviour and accessibility, and visual regression testing (VRT) for regressions. Each has a set
  stage and purpose (see Decision outcome).
- **The core is agent-agnostic.** `AGENTS.md` and the skills use the ecosystem layout. The Claude
  Code parts are thin adapters.
- **It targets the throughput goal directly.** Agents do context gathering, planning, test-first
  implementation, verification, review and PR preparation. Maintainers keep the decisions.

#### Cons

- **Maintenance.** The skills encode CONTRIBUTING and `AGENTS.md`, so they drift when the process
  changes. Mitigation: skills look up `AGENTS.md` sections by heading, and the maintainers look
  after the harness like the rest of the repo: a PR that changes how we work also updates
  `AGENTS.md` and the skills it affects.
- **More files and a third-party supply chain.** `.agents/`, `.claude/` and the nested guides are
  committed. The third-party skills need pinned SHAs, a security-audit gate and licence notices.
- **Slower on small changes at first.** There is a gate after every stage until Phase 2.
- **Tooling prerequisites.**
  - Storybook MCP needs Storybook 10.3 or later, plus the Vitest and a11y addons.
  - Figma evidence needs a node link in every component spec.
  - Until both are in place, visual checks stay with the human.
- **Figma seats.** The Figma MCP needs a Dev or Full seat. A View seat gets 6 calls a month, enough
  for one or two careful runs. Contributors without a Dev or Full seat work from the screenshots
  attached to the issue.

### Spec-driven development framework

#### Pros

- It brings an established vocabulary and tooling.
- It offers structural validation, for example `openspec validate`.

#### Cons

- It duplicates what the repo already has. RFCs are already deltas, the README is already the
  living spec, and ADRs already record decisions.
- It conflicts with existing conventions.
  - OpenSpec's generated `AGENTS.md` collides with the contract.
  - spec-kit's numbered branches and folders conflict with `{type}/{N}/{slug}` and with RFC
    numbering.
- It adds another parallel structure, in a repo whose failure mode is already too many of them.
- It does not solve the design and runtime evidence gap.

## Decision outcome

**Proposed:** the human-gated harness, adopted in phases, as #245 sets out.

- **Phase 0 (this ADR):** adopt the agentic development workflow that the company piloted on
  another product, and adapt it to DT-DDS.
- **Phase 1:** contributors use the gated pipeline.
- **Phase 2:** after an initial trial report, automate only the non-critical gates whose stage
  evals pass (decision 8).
- **Later:** intake skills and playbooks.

**Why this option.**

- It is the only option that enforces the rules that are costly to break: remote writes, releases,
  hook bypass and sign-off. Generated and off-limits paths are covered by the contract, and the
  guardrail evals check that agents leave them alone (decision 8).
- It keeps every decision with a human.
- It adds no parallel spec vocabulary.
- It gives agents defined access to design and runtime evidence.
- The contract-only option is its first step, so nothing is lost if the team later scales back.

**Tooling by stage.** The agent reads and collects evidence. Humans decide and sign off: visual
sign-off stays with the designers' Design Review step.

| Stage                  | Figma MCP (read tools only)                                                                                                                                                                                             | Storybook MCP (local dev server)                                                                         | Browser on Storybook                                                                                      | VRT (tool chosen in ADR-0009)                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1. Gather context      | For the node linked in the issue, RFC or README: `get_metadata`, `get_screenshot` of the designed states (one call for the whole component set where possible), `get_variable_defs`. Saved to the work dir's `assets/`. | `docs-list`, `docs-show`, `stories-find-by-component`: the current API and stories                       | —                                                                                                         | —                                                                                                           |
| 2. Architecture        | `get_code_connect_map` (if Code Connect is adopted). Each Figma variable the design uses must match a token in `@dt-dds/themes`. One with no match is a STOP: the agent reports it and never invents a token.           | `docs-show` compared with the README spec                                                                | —                                                                                                         | —                                                                                                           |
| 3. Plan                | Frames mapped to the states and stories to build or update                                                                                                                                                              | `get-storybook-story-instructions`                                                                       | —                                                                                                         | —                                                                                                           |
| 4. Implement           | `get_design_context` as reference only. Its React + Tailwind output is never pasted; the repo uses Emotion and theme tokens.                                                                                            | `stories-preview`, and `test-run` in the test-first loop                                                 | —                                                                                                         | —                                                                                                           |
| 5. Verify              | The stage-1 screenshots from `assets/`, fetched again only if the design changed                                                                                                                                        | `stories-changed`, then `test-run` (interactions and axe) as recorded evidence                           | Changed stories × Default / Greenlane / TruckAPI × viewports, shown side by side with Figma for the human | Run the VRT locally on the changed stories and record the report and diffs as evidence                      |
| 6. Review              | Token auditor compares the stage-1 Figma variables with code tokens                                                                                                                                                     | Spec reviewer compares the manifest with the README. The a11y reviewer uses the `test-run` a11y results. | a11y reviewer walks keyboard and focus on the story                                                       | —                                                                                                           |
| After the human pushes | —                                                                                                                                                                                                                       | —                                                                                                        | Live Preview (gh-pages `PR-<n>/`) for reviewers                                                           | The CI VRT job. Agents read its check and report and link the diffs. Humans and designers accept baselines. |

The table lists only what each tool adds to a stage. Each stage's own checks are in its skill: the
review stage, for example, also checks correctness, security, tests and release impact. Without a
Dev or Full Figma seat, the Figma column is replaced by the screenshots attached to the issue, and
the token checks use our token export only.

Denied to agents:

- **The Figma write tools**, for example `use_figma`, `generate_figma_design`, `create_new_file`,
  `upload_assets`, `add_code_connect_map`, `send_code_connect_mappings`, `generate_diagram` and
  `weave_*`. The MCP guard enforces this with an allowlist of Figma read tools; any other Figma
  tool, including ones added later, is denied.
- **Storybook `review-create`**, which pushes a review. The MCP guard adds this rule when the
  Storybook MCP server is configured.
- **Accepting or updating VRT baselines.** This stays a human action whatever tool ADR-0009 picks.

**Consequences.**

- **Good.**
  - One written contract for humans and agents.
  - Release and DCO rules are enforced, not just documented.
  - Spec drift, missing tests and accessibility failures are caught before review.
  - Visual claims come with screenshots and test results to look at.
  - Every run leaves a gate-by-gate log that can be evaluated.
  - Gate automation rests on measured results, not on impressions from a few runs.
- **Bad.**
  - A harness (skills, hooks and guides) that someone has to maintain.
  - Evals cost agent time and usage, and the golden sets need curating as the skills change.
  - Gate overhead until Phase 2.
  - A Storybook upgrade and a spec-link backfill before the tooling columns work.

**Decisions required** (maintainers answer these in review):

1. **What is committed.**
   - Proposal:
     - `AGENTS.md`, the nested guides and the `CLAUDE.md` stubs;
     - from `.agents/`: `skills/`, `hooks/`, `scripts/`, `evals/`, `README.md` and
       `THIRD_PARTY_NOTICES.md`;
     - `skills-lock.json`;
     - `.claude/settings.json`, `.claude/agents/` and the per-skill links in `.claude/skills/`.
   - `.agents/work/` goes into `.gitignore`.
   - Personal settings stay out of the repo.
   - The `CLAUDE.md` stubs stay even though recent Claude Code versions read `AGENTS.md` directly.
     They cover older versions and setups that don't, and they hold the Claude-only notes. The
     import never loads `AGENTS.md` twice.
2. **Releases caused by the guides.** A guide inside a package folder is treated like any other file
   there: when it changes, the package gets a new version, and so do the packages that depend on it.
   Today only the themes guide (`packages/themes/AGENTS.md` and its `CLAUDE.md`) sits in a package
   folder, so the Phase 1 merge releases `@dt-dds/themes` and the 40 packages that depend on it. The
   guides are not in the published files, so for consumers it is a version bump only. Tests and
   config files in a package already work this way. We accept this for now: which changes should
   trigger a release is part of the v1 release strategy (#228).
3. **Gates after the initial trial.** The intake, plan, review and publish gates stay human. The
   others may run automatically when their verdict is clean and their stage evals pass
   (decision 8). A clean verdict is a PASS in which every acceptance criterion is verified and none
   waits on a check that a human must run.
4. **Remote writes.** Either they stay human-only (push, PR, comments, labels), or agents may push
   and open a draft PR once a human approves the publish gate. The agent pushes only the feature
   branch: no force-push, no tags, never `main`. The guards and their evals change to match.
5. **Attribution and DCO.** Agents add `Co-Authored-By`. Only humans sign off, through the husky
   hook.
6. **Tooling and policy.**
   - The core stays agent-agnostic, with Claude Code adapters for now.
   - A second AI model for reviews, so the code isn't only reviewed by the same kind of model that
     wrote it. The idea is two layers: Codex reviews the PR, and an optional step runs a Codex
     adversarial review before the PR. Optional, because not every task needs it and not every
     contributor has Codex. How we set it up is still open.
7. **Design and runtime tooling.** Approve the table above and its prerequisites:
   - **Storybook upgrade.** Upgrade from 8.6 to 10.3 or later, with `@storybook/addon-vitest`,
     `@storybook/addon-a11y`, `@storybook/addon-mcp` and `componentsManifest: true`. This is shared
     with #225.
   - **Figma links.** Every component README's "Figma Reference" links a node (`node-id`).
   - **Figma seats.** Contributors with a Dev or Full seat use the Figma MCP. Contributors without
     one work from the screenshots attached to the issue.
   - **Code Connect.** A Figma feature that links each Figma component to its code component, so
     Dev Mode and the Figma MCP show real `@dt-dds/react-*` usage. It needs a Dev or Full seat on an
     Organization or Enterprise plan. Proposal: keep it deferred until most specs link a Figma node
     and the Figma seats are sorted.
   - **Browser tool.** Storybook MCP takes no screenshots, so a browser captures the changed stories
     per brand and viewport and walks keyboard focus. Reuse the browser of the VRT tool
     (Playwright, if #226 picks it), and choose another only if that doesn't work.
   - **What agents need from VRT.** ADR-0009 (#226) chooses the tool. Whichever it picks must
     meet these agent requirements:
     - it can run locally before any push, so the verify stage can record its report and diffs;
     - agents only read its results;
     - accepting or updating baselines stays with humans.
8. **Evaluation.** This is how the harness shows that it works, and what gate automation depends
   on. There are five levels:

   | Level                 | What it checks                                                                                                                                                                                                                                                                                        | When it runs                                                                           | Cost                                                              | Who runs it                                                                                                             |
   | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
   | 1. Harness code tests | The guards and scripts give the right decision for each listed command or tool call. Unit tests; no agent involved.                                                                                                                                                                                   | On every harness change                                                                | Seconds; no model use                                             | Whoever changes the harness, and anyone locally                                                                         |
   | 2. Guardrail evals    | An agent session with the harness hooks active tries to reach each forbidden outcome, both directly and indirectly. The eval checks the resulting repository state, not the transcript: no new tags or refs, no remote write, no `.changeset/*.md`, no agent sign-off, no edit to an off-limits path. | Before the Phase 1 merge, and in every PR that changes a guard                         | Minutes per case: one headless agent session in a throwaway clone | The author of that PR                                                                                                   |
   | 3. Stage evals        | Each stage against a small golden set: fixed inputs (an issue at a pinned commit) with known expected findings, such as a stale link the intake must flag or a constraint the architecture stage must extract. Deterministic checks where possible, a written rubric otherwise.                       | Before a gate is automated, and after any change to that stage's skill or to the model | One stage run per case, repeated to allow for non-determinism     | Whoever proposes automating a gate. Maintainers pick the cases.                                                         |
   | 4. End-to-end replay  | The whole pipeline on closed issues, run from their pre-fix commit and compared with the merged fix: tests, scope and review findings                                                                                                                                                                 | Later: before automation is widened, and after major model changes                     | The most expensive level: a full pipeline run per issue           | Anyone                                                                                                                  |
   | 5. Run metrics        | Collected from every real run's log: each gate decision, review loops, time per stage and at each gate, agent usage (tokens per stage and MCP calls per tool), the PR's first CI result, and defects found after the PR opened                                                                        | Continuously from Phase 1. The #245 trial report is built from them.                   | Low, once the run log records them                                | Each run records its own. The #245 assignee writes the trial report, and maintainers review it at the Maintainers Sync. |

   - **Order.** Phase 1 needs levels 1, 2 and 5. Level 3 comes before Phase 2, and level 4 later.
   - **Before and after.** To see if the workflow helps, we compare with the three months before
     Phase 1: how many PRs we merged each month, and how many days an issue took from "in progress"
     to merged.
   - **Phase 2 depends on level 3.** Proposal: a non-critical gate (decision 3) runs automatically
     only when the #245 trial report exists and the gate's stage evals pass. Every golden case must
     pass on each of three repeated runs. If a later change makes a stage eval fail, that gate goes
     back to a human until the eval passes again.
   - **Location.** Eval cases and runners live in `.agents/evals/` and are committed with the
     harness (decision 1).

### Next steps:

- [ ] Maintainers answer the "Decisions required" by 30 September 2026 and set Status to Accepted or Rejected
- [ ] Guardrail evals (decision 8, level 2) pass on the harness before the Phase 1 merge
- [ ] Phase 1 PR: commit the harness (`chore:`). The themes guide goes in its own commit with a clear
      subject, because that subject becomes the changelog line of every package it releases
      (decision 2)
- [ ] Run logs record the level-5 metrics from the first Phase 1 run
- [ ] Update CONTRIBUTING: link `AGENTS.md` and fix the stale sections it records
- [ ] Follow-up issues for decision 7:
  - [ ] the Storybook 10.3+ upgrade, together with #225
  - [ ] the Figma node-link backfill across the specs
  - [ ] extend the MCP guard to the Storybook MCP server (`review-create`) once it is configured
  - [ ] ADR-0009, the VRT tool for #226
- [ ] Update `AGENTS.md` → Tooling / MCP and the stage skills to the table above as each prerequisite lands
- [ ] Before Phase 2: a golden set and stage evals (level 3) for each stage whose gate is proposed for
      automation
- [ ] Phase 2: automate only the gates whose stage evals pass, once the initial trial report exists
      (#245)
- [ ] Later: end-to-end replay of closed issues (level 4)
- [ ] Later: intake skills and playbooks

## References

- Tracking issue: #245
- Related: #225 (a11y checks in CI), #226 (regression guardrail, VRT), #223 (a11y audit), #215 (automate issues and board), #108 (generator), #228 (v1 release strategy)
- ADR-0004 (versioning with changesets) and ADR-0005 (release process): the release rules the guards enforce
- MAINTAINERS.md: triage, approval by the maintainers group, Maintainers Sync
- AGENTS.md format: https://agents.md
- Storybook MCP: https://storybook.js.org/docs/ai/mcp/overview
- Sharing or self-hosting the Storybook MCP server: https://storybook.js.org/docs/ai/mcp/sharing
- Storybook 10.3 release (MCP, a11y): https://storybook.js.org/blog/storybook-10-3/
- Figma MCP server tools: https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/
- Figma MCP rate limits by seat: https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/
- Chromatic, publishing a Storybook MCP server: https://www.chromatic.com/docs/mcp/
- Claude Code documentation: https://code.claude.com/docs/en/memory
- Skills ecosystem: https://skills.sh
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- GitHub spec-kit: https://github.com/github/spec-kit
- Developer Certificate of Origin: https://developercertificate.org
