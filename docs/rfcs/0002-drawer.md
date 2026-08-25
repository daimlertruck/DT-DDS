# RFC-0002: Drawer Position Control

**Author(s):** Bernardo Pedrosa
**Created:** 2026-08-25
**Updated:** 2026-08-25
**Component issue:** [218](https://github.com/daimlertruck/DT-DDS/issues/218)

## Overview

Add support for anchoring the Drawer to either the left or right edge of the viewport. This allows consumers to control which side the Drawer slides in from, while preserving the current default behavior for existing usages.

## Motivation

### Problem Statement

The Drawer component currently only supports anchoring and animating in from the right edge of the screen. There is no way for consumers to render a Drawer that opens from the left. This limits usage in layouts where a left-anchored panel is more appropriate (e.g., navigation drawers, filters panels aligned with a left-hand sidebar).

### Use Cases

- **Left-aligned navigation drawers:** Consumers building mobile navigation or filter panels that should open from the left, matching the visual direction of a left-hand sidebar.
- **Right-aligned detail/context panels:** Existing use cases such as detail views, forms, or supplementary content that open from the right (current default behavior).
- **Layout consistency:** Pages with content anchored to one side can open drawers "from" that side, matching user expectation of where the triggering control lives.

### Goals

- Support both left and right anchor positions for the Drawer.
- Preserve current default (right-anchored) behavior for existing consumers with no code changes required.
- Ensure the enter/exit transform animation direction matches the anchor side.

### Non-Goals

- Do not support top or bottom anchored drawers.
- Do not change the Drawer's width, overlay, or existing open/close interaction logic (Escape key, overlay click, close button).

## Design

### Visual Design

No new visual styles are introduced. The Drawer retains its existing background, border, and padding treatment. The only visual change is the anchor edge (`left: 0` vs `right: 0`) and the corresponding slide-in/slide-out transform direction.

#### Anatomy

```text
Drawer
├── Overlay
└── Content Container
    ├── Header (optional)
    │   ├── Title
    │   └── Close button
    └── Body
```

### Component API

#### Props

| Prop           | Type                           | Default   | Description                                                                         |
| -------------- | ------------------------------ | --------- | ----------------------------------------------------------------------------------- |
| `position`     | `'left' \| 'right'`            | `'right'` | Sets which edge of the viewport the Drawer is anchored to and slides in/out from.   |
| `isVisible`    | `boolean`                      | -         | Controls whether the Drawer is open. The Drawer is always controlled by the parent. |
| `setIsVisible` | `(isVisible: boolean) => void` | -         | Called when the user requests the Drawer to open or close.                          |
| `children`     | `ReactNode`                    | -         | Content rendered inside the Drawer, typically `Drawer.Header` and `Drawer.Body`.    |

> Note: Only the newly introduced `position` prop is documented in detail here. Existing props (`isVisible`, `setIsVisible`, `children`, and `Drawer.Header`/`Drawer.Title`/`Drawer.Body` subcomponents) remain unchanged.

#### Backwards Compatibility

Fully backwards compatible. `position` is optional and defaults to `'right'`, so existing consumers that do not pass `position` will need to verify whether their current visual expectation matches the new default.

#### Usage Examples

```tsx
// Default
<Drawer isVisible={isVisible} setIsVisible={setIsVisible}>
  <Drawer.Header>
    <Drawer.Title title='Filters' />
  </Drawer.Header>
  <Drawer.Body>Body content here.</Drawer.Body>
</Drawer>;

// left-anchored
<Drawer isVisible={isVisible} setIsVisible={setIsVisible} position='left'>
  <Drawer.Header>
    <Drawer.Title title='Vehicle details' />
  </Drawer.Header>
  <Drawer.Body>Body content here.</Drawer.Body>
</Drawer>;
```

### Behavior

#### Interaction Patterns

- **Mouse/Touch:** Clicking the overlay or the close button requests the Drawer to close, regardless of `position`.
- **Keyboard:** Pressing Escape requests the Drawer to close, regardless of `position`.
- **Animation direction:** The Drawer slides in from, and exits toward, the edge defined by `position`. A `position="left"` Drawer translates along the X axis toward `-100%` when hidden; a `position="right"` Drawer translates toward `100%` when hidden.

#### State Management

- **Anchor state:** `position` is a static layout prop; it is not expected to change while the Drawer is open. Changing `position` while the Drawer is visible is not a supported use case.
- **Visibility state:** Unchanged from current behavior. The Drawer remains fully controlled through `isVisible`/`setIsVisible`.

#### State Transitions

No changes to the existing state management.

#### Responsive Behavior

No changes to existing responsive behavior.

### Accessibility

#### ARIA Roles & Attributes to have into consideration

No changes to existing ARIA attributes. The Drawer's role, labelling, and focus trap behavior remain the same regardless of anchor side.

#### Keyboard Navigation

| Key    | Action                                   |
| ------ | ---------------------------------------- |
| Escape | Requests the Drawer to close.            |
| Tab    | Moves focus within the Drawer's content. |

No new keyboard interactions are introduced by the `position` prop.

#### Screen Reader Experience

No change. Screen readers announce the Drawer's open/closed state identically regardless of which edge it is anchored to; `position` is a purely visual/layout concern.

## Documentation

### Migration Guide

Current consumers do not need to make any changes, as `position` defaults to `'right'`.

- New consumers building left-anchored patterns need to pass `position="left"`.

## Alternatives Considered

N/A

## Dependencies & Related Components

N/A

## Appendix

### Priority

P1 - High. This impacts Developer Portal functionality and is needed to support an ongoing feature.
