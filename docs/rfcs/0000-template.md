# RFC-0000: [Component Name]

**Author(s):** [Name(s)]  
**Created:** YYYY-MM-DD  
**Updated:** YYYY-MM-DD
**RFC PR:** <link to PR>
**Component issue:** <link to issue>

## Overview

A brief 2-3 sentence overview of the component being proposed, its primary purpose, and why it's needed in the design system.

## Motivation

### Problem Statement
What user or business problem does this component solve? What gaps in the current design system does it fill?

### Use Cases (optional)
- **Use Case 1:** Description of primary use case
- **Use Case 2:** Description of secondary use case
- **Use Case 3:** Additional scenarios where this component applies

### Goals
- Goal 1: What we want to achieve
- Goal 2: Success criteria
- Goal 3: Performance or accessibility targets

### Non-Goals
- What this component explicitly will NOT do
- Features intentionally left out of scope

## Design

### Visual Design

#### Variants (if applicable)
List all visual variants the component will support:
- **Variant Name:** Description and when to use
- **Size variants:** small, medium, large, etc.
- **State variants:** default, hover, active, disabled, error, etc.

#### Anatomy
Describe the component structure and its sub-parts:
```
ComponentName
├── SubElement1
├── SubElement2
│   └── NestedElement
└── SubElement3
```

#### Design Tokens
Which design tokens will this component use?
- **Colors:** token names and usage
- **Typography:** token names and usage
- **Spacing:** token names and usage
- **Shadows/Elevation:** token names and usage
- **Border radius:** token names and usage

#### Figma Reference
[Link to Figma designs]

### Component API

#### Props

(Example from Card component; you can have several sections with the different compound components)

| Prop          | Type                         | Default      | Description                                                                |
| ------------- | ---------------------------- | ------------ | -------------------------------------------------------------------------- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction                                                           |
| `type`        | `'clickable' \| 'none'`      | `'none'`     | `'clickable'` adds hover/focus styles and makes the whole card interactive |
| `value`       | `T`                          | —            | Identifier for this card; used by `Card.Group` to track selection          |
| `selected`    | `boolean`                    | `false`      | Selected state (applies active border + surface token)                     |
| `disabled`    | `boolean`                    | `false`      | Disabled state                                                             |
| `children`    | `ReactNode`                  | —            | `Card.Image` and/or `Card.Content`                                         |
| `onClick`     | `() => void`                 | —            | Click handler (relevant when `type='clickable'` or used inside a group)    |

#### Usage Examples

(example from Card component)

```tsx
// Basic vertical card
<Card>
  <Card.Image src="..." alt="A descriptive text" />
  <Card.Content title="Card title" description="Lorem ipsum dolor sit amet.">
    <Tag label="Tag" />
  </Card.Content>
</Card>

// Horizontal clickable card
<Card orientation="horizontal" type="clickable" onClick={() => {}}>
  <Card.Image src="..." alt="..." />
  <Card.Content title="Card title" description="Description text." />
</Card>

// Group with radio selection (string values)
<Card.Group selectionType="radio" onChange={(value) => console.log(value)}>
  <Card value="a"><Card.Content title="Option A" /></Card>
  <Card value="b"><Card.Content title="Option B" /></Card>
  <Card value="c"><Card.Content title="Option C" /></Card>
</Card.Group>

// Group with multi-select and object values
<Card.Group<{ id: string; label: string }>
  selectionType="select"
  onChange={(values) => console.log(values)}
>
  <Card value={{ id: 'a', label: 'Option A' }}><Card.Content title="Option A" /></Card>
  <Card value={{ id: 'b', label: 'Option B' }}><Card.Content title="Option B" /></Card>
</Card.Group>
```

### Behavior

#### Interaction Patterns
- **Mouse/Touch:** How the component responds to pointer interactions
- **Keyboard:** Keyboard navigation and shortcuts (e.g., Tab, Enter, Escape)
- **Focus Management:** How focus is handled within and around the component

#### State Management
- **Internal State:** What state the component manages internally
- **External State:** What state must be provided/controlled externally
- **State Transitions:** How the component moves between states

#### Responsive Behavior
How does the component adapt to different screen sizes and viewports?

### Accessibility

#### ARIA Roles & Attributes to have into consideration
```html
<div role="..." aria-label="..." aria-describedby="...">
  <!-- Component markup with ARIA -->
</div>
```

#### Keyboard Navigation
| Key | Action |
|-----|--------|
| Tab | Description |
| Enter/Space | Description |
| Arrow Keys | Description |
| Escape | Description |

#### Screen Reader Experience
How will screen readers announce and interact with this component?

## Documentation

### Migration Guide (if replacing existing component)
How do teams migrate from the old component to this new one?

## Alternatives Considered (optional)

### Alternative 1: [Name]
**Description:** What was considered  
**Pros:** Benefits  
**Cons:** Drawbacks  
**Why not chosen:** Reasoning

### Alternative 2: [Name]
**Description:** What was considered  
**Pros:** Benefits  
**Cons:** Drawbacks  
**Why not chosen:** Reasoning

## Dependencies & Related Components (optional)

### Depends On
- **Component/Token Name:** How it's used

### Used By
- **Component/Token Name:** How it's used

### Related Components
- **Component Name:** How they relate or differ

## Appendix

### References
- Links to research
- Design inspiration
- Related RFCs
- External documentation

### Glossary
- **Term:** Definition
