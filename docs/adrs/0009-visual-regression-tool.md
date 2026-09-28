# Choose the visual regression testing tool for the initial regression guardrail

- Status: Accepted
- Author: Antonio Freire
- Deciders: DT-DDS maintainers (MAINTAINERS.md)
- Date: 27 September 2026
- Decision due date: 1 October 2026

**Priority:** Medium

## Context and Problem Statement

Issue: #226, "1 regression guardrail in place (VRT or equivalent) non-blocking" ([OKR1][KR1]).

DT-DDS has no visual regression testing (VRT). A change to a component, a theme token or a shared
style can alter how other components look, and nothing notices. Visual review happens by hand in
Storybook: in the gh-pages PR preview, and in the designers' Design Review step.

**Current state:**

- Storybook 8.6.
- 38 story files, about 75 stories, each rendered under 3 brands (Default, Greenlane, TruckAPI).
  A full run is about 225 snapshots for one browser and one viewport.
- Volume in the last 90 days: 20 PRs, 6 of which touched components, themes or docs.

**Requirements for the first phase:**

- **Non-blocking.** The check reports; it does not fail the PR.
- **Coverage.** The Default brand.
- **Stable.** Rendering is deterministic, so a diff means a real visual change.
- **Reviewable.** Designers and developers can review an intended change and approve new
  baselines.
- **Agents (ADR-0008).** VRT runs locally before any push, agents only read its results, and
  accepting or updating baselines stays with humans.
- **No accidental releases.** Updating baselines must not release a package.
- **Practical.** Low running cost and no blocking procurement.

**Question.** Which tool gives us that first guardrail, and when do we revisit the choice?

## Considered Options

- **Chromatic:** the hosted visual testing service from the Storybook maintainers.
- **Self-hosted Storybook + Playwright:** Playwright's `toHaveScreenshot()` run against each story
  URL of the built Storybook, inside Playwright's Docker image, with baselines committed to the
  repo.
- **Vitest browser mode `toMatchScreenshot()` through Storybook's Vitest addon:** one runner for
  story tests, a11y and screenshots.

## Pros and Cons of the Options

### Chromatic

#### Pros

- **Fastest setup.** A CLI, a GitHub Action and a project token. It works with Storybook 8.6 today.
- **Built for review.** It has a web UI for diffs, per-snapshot accept or deny, and PR checks.
  Baselines follow branches, with no files in git.
- **Stable rendering.** Snapshots render in Chromatic's cloud browsers, so we don't manage rendering
  consistency ourselves.
- **Multiple browsers**, on paid plans.
- **Cost.**
  - The Free plan (5,000 snapshots a month, Chrome only) covers today's volume with TurboSnap.
  - There is an open-source programme on application. The repo is public.
  - Starter is $179 a month for 35,000 snapshots.

#### Cons

- **Agents can't use it before a push.**
  - A run uploads a build, which is a remote write.
  - Each run uses snapshot quota.
  - Diffs are only visible in the web UI. Chromatic's MCP exposes the Storybook docs tools, not
    test results.
- **A third-party service hosts the built Storybook and the snapshots.** That needs vendor and
  policy approval, although sensitivity is low because the repo is public.
- **Volume growth has a price.** Higher throughput, more viewports or more browsers move us to a
  paid plan.

### Self-hosted Storybook + Playwright

#### Pros

- **Agents can run it locally before a push**, in the same Docker image as CI. They read the JSON
  report and the diff images as verification evidence (ADR-0008).
- **No vendor, no licence, no procurement.** It runs on GitHub Actions only.
- **Baseline changes are reviewed like code.** They go in an explicit commit, and GitHub's image
  diff shows them in the PR. This works like the existing `test:update:snapshot` discipline.
- **Chromium, Firefox and WebKit are all available** at no cost.
- **No Storybook upgrade is needed.** It visits the built story URLs.
- **No releases.** Living under `apps/docs/` (the private, ignored `@dt-dds/docs`), baseline updates
  release nothing. This was checked with the release path matcher.

#### Cons

- **We own stability.** It needs Playwright's Docker image locally and in CI, fonts loaded before
  the capture, animations off and tuned diff thresholds. A baseline taken on macOS won't match a
  capture on Linux.
- **More setup.**
  - Read the story list from the built Storybook's `index.json`.
  - Write run and update scripts.
  - Add a CI job, which touches `.github/**` and needs the maintainers to agree first.
- **Weaker review experience.** There is no hosted UI for accepting individual snapshots; failed
  runs attach an HTML report.
- **Git holds the baselines.** A few hundred PNGs to start, and heavy churn grows the repo.

### Vitest browser mode `toMatchScreenshot()`

#### Pros

- **One runner** for interactions, a11y and screenshots, once the Storybook 10 upgrade brings the
  Vitest addon.
- **Baselines in the repo**, with the same review model as the self-hosted option.

#### Cons

- **Storybook's Vitest addon does not support `toMatchScreenshot()` today**, and no work on it has
  been announced (Storybook discussion #32930).
- **It depends on the Storybook 10 upgrade.**

## Decision outcome

We decided to go with **self-hosted Storybook + Playwright** for the initial phase, scoped small:

- **Scope:** Chromium only; the Default brand first, then Greenlane and TruckAPI; one viewport.
- **Rendering:** Playwright's Docker image, locally and in CI.
- **CI:** a non-blocking job on PRs that change components, themes or docs. It attaches the HTML
  report.
- **Location:** code and baselines live under `apps/docs/`.
- **Baseline updates:** only through an update script run in Docker, in one reviewed commit. Agents
  never update baselines.

**Why.**

- It meets the agent requirement from ADR-0008: agents can run it locally before a push.
- It needs no vendor approval.
- It works on Storybook 8.6.
- It releases nothing.

Chromatic is the better tool once review at scale matters more than local runs. Our volume is low,
so its cost is not the deciding factor.

**Revisit and consider Chromatic when any of these holds:**

- designers need a review UI at scale;
- we need more than one browser;
- baseline churn in git becomes painful;
- Storybook's Vitest addon supports `toMatchScreenshot()`, in which case consider moving to one
  runner.

**Consequences.**

- **Good.**
  - A first regression guardrail with no vendor dependency.
  - Agents get visual evidence before a push.
  - Baseline changes are reviewed like code.
- **Bad.**
  - We maintain rendering stability ourselves.
  - The review experience is weaker than a hosted UI.
  - Binary baselines in git.

### Next steps:

- [ ] Spike: read the story list from `index.json`, set the brand per URL, and check how stable screenshots are in Docker
- [ ] Add `vrt` and `vrt:update` scripts under `apps/docs/`, both running in Playwright's Docker image
- [ ] Add a non-blocking CI job that attaches the HTML report (maintainers agree first on the `.github/**` change)
- [ ] Record the rules in `apps/docs/AGENTS.md`: never hand-edit baselines; update only through `vrt:update`
- [ ] Take the first baselines on the Default brand, then add Greenlane and TruckAPI
- [ ] Wire VRT into the agents' verify stage (ADR-0008)
- [ ] Review the revisit criteria at the end of Q4

## References

- Issue: #226 (regression guardrail). Related: #225 (a11y checks in CI), #245 (ADR-0008 agentic development workflow)
- ADR-0008: agentic development workflow (the agent requirements for VRT)
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright visual regression in CI (Docker, baselines): https://argos-ci.com/blog/playwright-visual-regression-testing-ci
- Chromatic pricing: https://www.chromatic.com/pricing
- Chromatic, publishing a Storybook MCP server: https://www.chromatic.com/docs/mcp/
- Vitest visual regression testing: https://main.vitest.dev/guide/browser/visual-regression-testing
- Storybook discussion #32930 (`toMatchScreenshot` in the Vitest addon): https://github.com/storybookjs/storybook/discussions/32930
