# Component → APG pattern fallback map (legacy READMEs)

The **README spec declares the APG pattern**; this map is the fallback for READMEs without the
declaration (the skill's step 1 says how to use it and how to rate a mismatch).

Declaration line the reviewer recognises (first line under `## Accessibility`; the README template
`turbo/generators/new-component-package/templates/README.md.hbs` does not carry it yet):

```markdown
**APG pattern:** [Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
```

Use `**APG pattern:** none — <reason>` for components with no interactive pattern.

APG base URL: `https://www.w3.org/WAI/ARIA/apg/patterns/` (+ slug). "—" = no APG pattern; the
notes give the ARIA or HTML contract to check instead.

| Package | APG pattern (slug) | #223 family | Notes |
|---|---|---|---|
| accordion | Accordion (`accordion/`) | disclosure | Header `button` with `aria-expanded` + `aria-controls` → panel |
| app-header | Landmarks (`landmarks/`) | navigation | `banner` + named `navigation` |
| avatar | — | static display | Image alternative; Button (`button/`) when clickable |
| backdrop | — | dialog | Background of a modal dialog: inert / hidden from AT while the dialog is open |
| box | — | static display | Layout primitive; usually no findings |
| breadcrumb | Breadcrumb (`breadcrumb/`) | navigation | Named `nav`, `aria-current="page"` on the last item |
| button | Button (`button/`) | actions | Native `button`; toggle buttons use `aria-pressed` |
| card | — | static display | Link or Button when interactive; region only when named |
| checkbox | Checkbox (`checkbox/`) | form controls | Native input; mixed state via `indeterminate` / `aria-checked="mixed"` |
| core | — | excluded | `Provider` only; no UI |
| date-picker | Dialog (Modal), Date Picker Dialog example (`dialog-modal/examples/datepicker-dialog/`) | listbox/combobox | Alternative: Date Picker Combobox (`combobox/examples/combobox-datepicker/`); grid keyboard inside the calendar |
| divider | — | static display | `separator` (native `hr`); decorative → hidden from AT |
| drawer | Dialog (Modal) (`dialog-modal/`) | dialog | `role="dialog"`, `aria-modal`, name via title, focus in/trap/restore, Escape |
| dropdown | Menu Button (`menu-button/`) for actions; Listbox (`listbox/`) for selection | listbox/combobox | Code mixes `menu`/`menuitem` with `aria-selected`: the pattern choice is itself a finding |
| empty-state | — | static display | Heading and text structure |
| form | — | form controls | Form landmark only when named; error summary / focus on submit |
| icon | — | static display | Decorative → `aria-hidden`; meaningful → `role="img"` + name |
| icon-button | Button (`button/`) | actions | Icon-only → accessible name required (2.5.3 / 4.1.2) |
| label-field | — | form controls | Label and description association for form controls |
| link | Link (`link/`) | navigation | Native `a[href]`; link purpose (2.4.4) |
| message | Alert (`alert/`) | feedback | Inline status (`status`) or alert; dismiss button named |
| modal | Dialog (Modal) (`dialog-modal/`); Alert Dialog (`alertdialog/`) for confirmations | dialog | Same contract as drawer |
| pagination | — | navigation | Named `navigation` landmark, `aria-current="page"`, named prev/next buttons |
| progress-bar | — | feedback | ARIA `progressbar` role + `aria-valuenow/min/max` + name (Meter `meter/` is for gauges) |
| radio | Radio Group (`radio/`) | form controls | Named group; arrow keys move selection (native radios) |
| segmented-control | Radio Group (`radio/`) for single-select; Toolbar (`toolbar/`) of toggle buttons otherwise | form controls | Code uses `group` + `aria-pressed`: confirm the intended pattern |
| select | Combobox (`combobox/`), select-only | listbox/combobox | Downshift `useSelect` (ADR-0007); check the rendered ARIA, not only the hook |
| sidebar | Landmarks (`landmarks/`) + Disclosure (`disclosure/`) | navigation | Named `navigation`/`complementary`; collapsible groups as disclosures |
| spinner | — | feedback | `status` live region with a name; not focusable |
| stepper | — | navigation | Ordered list, `aria-current="step"` |
| table | Table (`table/`) | static display | Native table semantics, header cells, caption or name |
| tabs | Tabs (`tabs/`) | tabs | `tablist`/`tab`/`tabpanel`, roving tabindex, arrow keys |
| tag | — | actions | Button (`button/`) when clickable or removable |
| text-area | — | form controls | Native `textarea`: label, description, error (`aria-invalid` + `aria-describedby`) |
| text-field | — | form controls | Native `input`: label, description, error |
| toast | Alert (`alert/`) | feedback | `status` for non-urgent, `alert` for urgent; never steals focus; pause on hover/focus (2.2.1) |
| toggle | Switch (`switch/`) | form controls | `role="switch"` or native checkbox with switch semantics; `aria-checked` |
| tooltip | Tooltip (`tooltip/`) | overlay | `aria-describedby`; hover/focus, dismissible with Escape (1.4.13) |
| typography | — | static display | Heading levels and semantics |

## #223 audit families

One report per family, shared findings first ("repeats in: modal, drawer"), then per-package
sections.

| Family | Packages |
|---|---|
| dialog | modal, drawer, backdrop |
| disclosure | accordion |
| tabs | tabs |
| listbox/combobox | select, dropdown, date-picker |
| form controls | checkbox, radio, toggle, text-field, text-area, label-field, form, segmented-control |
| navigation | breadcrumb, pagination, sidebar, app-header, link, stepper |
| feedback | message, toast, spinner, progress-bar |
| actions | button, icon-button, tag |
| overlay | tooltip |
| static display | avatar, box, card, divider, empty-state, icon, typography, table |
| excluded | core |
