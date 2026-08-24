# RFC-0001: Controlled Accordion State

**Author(s):** Joel Pereira
**Created:** 2026-08-24
**Updated:** 2026-08-24
**Component issue:** [213](https://github.com/daimlertruck/DT-DDS/issues/213)

## Overview

Add support for externally controlling the accordion's open and closed state. This allows parent components to programmatically manage individual or grouped accordions, enabling features such as Expand All, Collapse All, and state-based styling while preserving the current uncontrolled behavior.

## Motivation

### Problem Statement

The accordion component does not expose a complete way to coordinate its expanded or collapsed state from outside the component. It accepts an initial `isOpen` value and reacts to prop changes, but user interaction remains internal because there is no callback that tells the parent when the state changes.

This prevents consumers from implementing a global control that can expand or collapse all accordions in a group and keep parent state synchronized with user actions.

### Use Cases

- **Expand All / Collapse All:** A parent view can open or close all accordions in a page section.
- **State synchronization:** A parent component can keep accordion state in URL params, persisted settings, or shared page state.
- **State-based styling:** Consumers can style surrounding UI based on whether one or more accordions are open.

### Goals

- Support both uncontrolled and controlled accordion usage.
- Preserve the existing uncontrolled behavior for current consumers.

### Non-Goals

- Do not change the layout or animation behavior.
- Do not change existing keyboard and screen reader behavior except where needed to reflect controlled state accurately.

## Design

### Visual Design

Apply variant of colors (transparent, surface light and surface contrast)

#### Anatomy

```text
Accordion
├── Header
│   ├── Header content
│   └── Open/closed indicator
└── Body
    └── Collapsible content
```

### Component API

#### Props

| Prop              | Type                                     | Default               | Description                                                                                           |
| ----------------- | ---------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| `isOpen`          | `boolean`                                | -                     | Controls whether the accordion is expanded. When provided, the accordion is controlled by the parent. |
| `defaultOpen`     | `boolean`                                | `false`               | Defines the initial open state when the accordion is uncontrolled.                                    |
| `onToggle`        | `(open: boolean) => void`                | -                     | Called when the user requests the accordion to open or close.                                         |
| `headerContent`   | `ReactNode`                              | -                     | Content rendered inside the accordion header.                                                         |
| `background`      | `'transparent' \| 'light' \| 'contrast'` | `'light'`             | Sets the accordion background color.                                                                  |
| `isDisabled`      | `boolean`                                | `false`               | Disables user interaction with the accordion.                                                         |
| `hasBorderBottom` | `boolean`                                | `false`               | Sets the accordion bottom border.                                                                     |
| `children`        | `ReactNode`                              | -                     | Content rendered inside the accordion body.                                                           |
| `dataTestId`      | `string`                                 | `accordion-container` | Accordion test identifier.                                                                            |
| `style`           | `React.CSSProperties`                    | -                     | Inline styles applied to the accordion container.                                                     |
| `className`       | `string`                                 | -                     | CSS class applied to the accordion container.                                                         |

#### Backwards Compatibility

N/A

#### Usage Examples

```tsx
// Uncontrolled
<Accordion defaultOpen headerContent='Vehicle details'>
  Body content here.
</Accordion>;

// Controlled
const [isOpen, setIsOpen] = useState(false);

<Accordion isOpen={isOpen} onToggle={setIsOpen} headerContent='Vehicle details'>
  Body content here.
</Accordion>;
```

### Behavior

#### Interaction Patterns

- **Mouse/Touch:** Selecting the accordion header requests the next open state unless the accordion is disabled.
- **Keyboard:** Pressing Enter or Space on the header requests the next open state unless the accordion is disabled.
- **Focus Management:** Focus should remain on the accordion header after toggling.

#### State Management

- **Uncontrolled:** When `isOpen` is not provided, the accordion manages its own internal state. `defaultOpen` defines only the initial state.
- **Controlled:** When `isOpen` is provided, the rendered state always follows the `isOpen` prop. User interaction calls `onToggle(nextOpen)`, and the parent is responsible for updating `isOpen`.
- **Disabled:** When `isDisabled` is true, user interaction should not change internal state and should not call `onToggle`.

#### State Transitions

| Current state | User action | Next requested state |
| ------------- | ----------- | -------------------- |
| Closed        | Toggle      | Open                 |
| Open          | Toggle      | Closed               |
| Disabled      | Toggle      | No change            |

#### Responsive Behavior

No responsive behavior changes are required.

### Accessibility

#### ARIA Roles & Attributes to have into consideration

The accordion header should expose the current state through `aria-expanded` and connect to the collapsible body content with `aria-controls` when possible.

```html
<button aria-expanded="true" aria-controls="accordion-body-id">
  Accordion header
</button>
<div id="accordion-body-id">Accordion body</div>
```

#### Keyboard Navigation

| Key         | Action                                             |
| ----------- | -------------------------------------------------- |
| Tab         | Moves focus to and away from the accordion header. |
| Enter/Space | Requests the accordion to open or close.           |

#### Screen Reader Experience

Screen readers should announce the accordion header as interactive and communicate whether the related body content is expanded or collapsed. Controlled state changes from parent components must update the announced expanded state.

## Documentation

### Migration Guide

Current consumers if using previous `isOpen` property, need to use also `onToggle` or discard the `isOpen` and use the uncontrolled version.

New approach:

- `defaultOpen` for an uncontrolled initial open state.
- `isOpen` with `onToggle` when the parent component owns the accordion state.

## Alternatives Considered

N/A

## Dependencies & Related Components

N/A

## Appendix

### Priority

P1 - High. This impacts Developer Portal functionality and is needed to support Expand All / Collapse All controls.
