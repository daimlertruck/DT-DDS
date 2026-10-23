# AGENTS.md — packages/themes (`@dt-dds/themes`)

The root `AGENTS.md` applies; this file adds token and theme rules.

## Sources vs generated

- **Source:** `src/tokens/*.tokens.json`, exported from Figma Variables (Design Tokens Manager plugin,
  DTCG format). Edit only in token-import tasks; run `yarn workspace @dt-dds/themes format:tokens` first.
- **Generated:** `src/themes/**` — never hand-edit. Regenerate with
  `yarn workspace @dt-dds/themes build:theme` (hand-written generator in `src/utils/theme-generator/`).
- CI (`theme-generation.yml`) regenerates themes on token PRs and commits themes plus **all**
  snapshots back to the PR branch; a `build:theme` failure only shows as a PR comment. Pull after the
  human pushes.

## Theme

`daimler-truck` (`defaultTheme`) is the only theme: build, test and review against it. The other
token sets in `src/tokens/` are legacy and fail the generator's validation; leave them, as well as
`manifest.json` and the Responsiveness tokens, unchanged without a maintainer decision.

## Token tiers (how components consume the theme)

- **Component tier first:** `theme.components.<group>.<key>` — 41 groups, flat keys such as
  `surfaceAccordionBgtrueDefault`. Group names differ from packages (`datepicker`, `loadingSpinner`,
  `radioButton`, `selectField`, `tab`, `textField`, `textarea`, `toastMessages`, …). The type is a
  loose index signature (`string | object`) — narrow to `string` before use.
- **Semantic fallback:** `theme.palette.*`, `spacing`, `fontStyles`, `shape`, `shadows`, `breakpoints`.
- No component reads `theme.components` yet; switching one changes its visuals (values differ, e.g.
  accordion) → design review.

## Verify

- `yarn workspace @dt-dds/themes type-check && yarn workspace @dt-dds/themes test` (ts-jest; no
  coverage threshold), then `yarn turbo run build test --filter=...@dt-dds/themes` (every package).
- Review `git diff --stat packages/themes/src/themes` — a token change is a visual change everywhere.
