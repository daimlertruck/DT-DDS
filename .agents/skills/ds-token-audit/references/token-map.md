# Token map (`packages/themes/src/themes/daimler-truck/`)

Re-verify against the generated theme before relying on counts: it changes with every token import.

## Tiers

| Tier | Where | Use |
|---|---|---|
| Component | `theme.components.<group>.<key>` (`components.ts`, 41 groups) | First choice (AGENTS.md → Coding conventions); current use and the `string` narrowing: `packages/themes/AGENTS.md` → Token tiers |
| Semantic | `theme.palette.{surface,content,border,primary,secondary,accent,informative,success,warning,error}.<shade>`; `spacing.spacing_*`; `radius.radius_*`; `shape.<component>`; `shadows.elevation_*`; `fontStyles.*`; `animations.emphasizedDecelerate.{duration,timingFunction}` (the only motion token); `breakpoints` | Fallback when no component token exists |
| Raw | `theme.colors.*` | Not for components: reference palettes only |

## Component key grammar

`<role><Component><Variant?><State?>`, for example `surfaceAccordionBgtrueHover`, `contentAccordionHeadingDisabled`,
`strokeAccordion`, `shapeAccordion`. Nested groups (`button`, `checkbox`, `messages`, `tab`, `tag`,
`toastMessages`, `stepper`, `avatar`, `loadingSpinner`, `radioButton`, `toggle`) hold variant objects.

| CSS property | Role prefix | Semantic fallback |
|---|---|---|
| `background`, `background-color`, `fill` (surfaces) | `surface…` | `palette.surface.*` (or a status palette) |
| `color`, icon `fill` | `content…` | `palette.content.*` |
| `border-color`, `outline-color`, `stroke` | `stroke…` | `palette.border.*` |
| `border-radius` | `shape…` | `shape.<component>` / `radius.*` |
| `opacity` | `opacity…` | none |
| spacing, `gap`, sizes | none in `components` | `spacing.*` |
| `box-shadow` | none in `components` | `shadows.*` |
| `transition` duration / easing | none in `components` | `animations.*` |
| border **width** | none | none → token gap |

A token whose role differs from the property it styles (a `surface` token used for `color`, a
`content` token used for `background`) is a semantic-role misuse even when the value looks right.

## Package → component group

| Package | Group | Package | Group |
|---|---|---|---|
| accordion | `accordion` | modal | `modal` |
| app-header | `header` (+ `navigationMenu`?) | pagination | `pagination` |
| avatar | `avatar` | progress-bar | `progressBar` |
| backdrop | `backdrop` | radio | `radioButton` |
| box | `container`? | segmented-control | `segmentedControl` |
| breadcrumb | `breadcrumb` | select | `selectField` (+ `option` for items) |
| button | `button` | sidebar | `navigationMenu`? |
| card | `card` | spinner | `loadingSpinner` |
| checkbox | `checkbox` | stepper | `stepper` |
| date-picker | `datepicker` | table | `table` |
| drawer | `drawer` | tabs | `tab` |
| dropdown | `option`? | tag | `tag` |
| empty-state | `emptyState` | text-area | `textarea` |
| icon | `icons` | text-field | `textField` |
| icon-button | `button` / `icons`? | toast | `toastMessages` |
| link | `link` | toggle | `toggle` |
| message | `messages` | tooltip | `tooltip` |

`?` = inferred from names; confirm by reading the keys. No group: `core`, `divider`, `form`,
`label-field`, `typography` (semantic tier only). Groups without a package yet: `badge`,
`definitionList`, `footer`, `numberField`, `searchField`, `slider`, `skeleton`, `timepicker`.

