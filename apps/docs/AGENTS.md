# AGENTS.md — apps/docs (`@dt-dds/docs`, Storybook)

The root `AGENTS.md` applies; this file adds Storybook rules.

- Storybook with `@storybook/react-vite` (versions: `package.json`). Private app; ignored by
  changesets.
- Stories live in the packages (`packages/react-packages/**/*.stories.tsx`). This app holds config
  (`.storybook/`), docs pages (`src/**/*.mdx`) and static fonts.
- Packages resolve through **Vite aliases to source**: the `components` list in `.storybook/main.ts`
  (`viteFinal`). The component generator adds new packages to it; add a hand-made package yourself.
- Docs pages are `.mdx` under `apps/docs/src/**` only. `.stories.mdx` is dead, and package-level
  MDX (CONTRIBUTING suggests it) is not picked up by the stories glob.
- The autodocs tab is named "Specs" (props from TS via react-docgen-typescript); the package README is
  the real spec.
- **Story tests:** `yarn test-storybook [filter]` (Vitest through `@storybook/addon-vitest`, Chromium
  through Playwright) renders every story, or those whose file path matches the filter, with the
  preview's decorators. a11y results are `todo`: reported, never failing. CI job `storybook-tests`;
  results go to `test-results/` (git-ignored).
- **VRT** (ADR-0009): `yarn vrt [--grep <story id or file path>]` screenshots every story of the
  built Storybook (`storybook-static/`: build it first) in Playwright's Docker image (Docker
  required) and compares it with the baselines in `vrt/__snapshots__/<brand>/`. Report:
  `test-results/vrt-report/` (HTML) and `test-results/vrt.json`; diff images in
  `test-results/vrt/`. Baselines are never hand-edited: they change only through `yarn vrt:update`,
  run by a human in a terminal with Docker, in one reviewed commit. `vrt:update` does not delete the
  baselines of removed stories: the human `git rm`s them in the same commit. Stories left out are
  listed in `EXCLUDED` in `vrt/stories.spec.ts`, each with its reason.
- Commands: `yarn dev` → http://localhost:6006. Build like CI:
  `yarn turbo run build --filter='./packages/*' && (cd apps/docs && yarn build)` (`storybook build --docs`).
- Previews: `deploy-storybook.yml` publishes `PR-<n>/` to gh-pages after the human pushes; its path
  filter misses `packages/themes` changes.
