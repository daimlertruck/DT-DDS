# @dt-dds/themes

DT-DDS Themes Package

This package contains the themes system for DT-DDS, including:

- Theme definitions and types
- Theme generation utilities
- Token processing and validation
- Theme utilities and helpers

## Installation

```bash
yarn add @dt-dds/themes
```

## Usage

```typescript
import { daimlerTruckTheme } from '@dt-ui/themes';

const theme: CustomTheme = daimlerTruckTheme;
```

## Development

```bash
# Install dependencies
yarn install

# Build the package
yarn build

# Run tests
yarn test

# Generate themes from tokens
yarn build:theme
```

## Theme Generation

The theme generation system automatically processes JSON token files and generates corresponding TypeScript theme files that match the `CustomTheme` type structure. It supports multiple themes and handles token validation, reference resolution, and fallback values.

### JSON token files

The JSON token files are being generated from Figma Variables, with the use of the following plugin [Design Token Manager](https://www.figma.com/community/plugin/1263743870981744253/design-tokens-manager).

The exported JSON file format follows the spec of the [Design Tokens format](https://www.designtokens.org/tr/drafts/format/) purposed by the W3C work group.

## GitHub Actions Workflow

### Automatic Theme Generation

Includes a GitHub Actions workflow (`.github/workflows/theme-generation.yml`) that automatically generates themes when token files are modified in pull requests.

#### How it works:

1. **Trigger**: The workflow runs when a PR is opened, updated, or reopened and contains changes to:
   - `packages/themes/src/tokens/**/*.json`
   - `packages/themes/src/utils/theme-generator/**/*`
   - `packages/themes/src/types/theme.ts`
   - `packages/themes/package.json`

2. **Process**:
   - Checks out the PR branch
   - Installs dependencies
   - Runs `yarn build:theme`
   - Commits generated theme files back to the PR
   - Comments on the PR with status information

3. **Outcomes**:
   - **Success with changes**: Theme files are updated and committed to the PR
   - **Success without changes**: No theme changes needed
   - **Failure**: Error details are posted as a comment

#### Benefits:

- **Designer-friendly**: Designers can focus on token files without worrying about theme generation
- **Automatic**: No manual intervention required
- **Transparent**: Clear feedback on what was generated
- **Safe**: Only runs on PRs, not on main branch

#### Example Workflow:

1. Designer creates a new branch
2. Designer modifies token JSON files
3. Designer commits and pushes changes
4. Designer creates a PR
5. GitHub Actions automatically:
   - Detects token file changes
   - Runs theme generation
   - Commits generated theme files to the PR
   - Comments on the PR with results
6. Designer reviews both token changes and generated theme files
7. PR can be merged with both token and theme changes

## Manual Theme Generation

To generate themes manually, run:

```bash
cd packages/themes
yarn build:theme
```

This will:

- Discover all theme files in `src/tokens/`
- Process each theme with its semantic file
- Generate theme files in `src/themes/`
- Format and lint the generated files

## Token Matrix

### Core Colors

- `Core_colors.Grey.grey-*` (00-120)
- `Core_colors.Petrol.petrol-*` (00-100)
- `Core_colors.Blue.blue-*` (00-100)
- `Core_colors.Green.green-*` (00-100)
- `Core_colors.Orange.orange-*` (00-100)
- `Core_colors.Red.red-*` (00-100)

### Product Colors

- `Product_colors.Bright_yellow.brightyellow-*` (00-100)
- `Product_colors.True_blue.trueblue-*` (00-100)

### Semantic Colors

- `Contextual_colors.Surface.*` (default, light, medium, dark, contrast)
- `Contextual_colors.Content.*` (default, light, medium, dark, contrast)
- `Contextual_colors.Border.*` (default, light, medium, dark, contrast)
- `Contextual_colors.Primary.*` (default, light, medium, dark)
- `Contextual_colors.Secondary.*` (default, light, medium, dark)
- `Contextual_colors.Accent.*` (default, light, medium, dark)
- `Contextual_colors.Informative.*` (default, light, medium, dark)
- `Contextual_colors.Success.*` (default, light, medium, dark)
- `Contextual_colors.Warning.*` (default, light, medium, dark)
- `Contextual_colors.Error.*` (default, light, medium, dark)

### Typography

- `Typography.Font-family.*`
- `Typography.Weight.*`
- `Typography.Size.*`
- `Typography.Line-height.*`
- `Typography.Letter-spacing.*`
- `Typography.Headings.*` (h1-regular, h1-bold, h1-xs-regular, h1-xs-bold, etc.)
- `Typography.Body.*` (body-lg-regular, body-lg-bold, body-md-regular, etc.)
- `Typography.Buttons.*` (button-lg, button-md, button-sm)
- `Typography.Links.*` (link-lg-regular, link-lg-bold, link-md-regular, etc.)

### Spacing

- `Spacings.spacing-*` (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500)

### Radius

- `Radius.radius-*` (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500)

### Shadows/Elevations

- `Elevations.*` (100, 200, 300, 400, 500, 600, inset)

### Shapes

- `Shape.shape-*` (avatar, accordion, badge, button, card, checkbox, container, datepicker, drawer, emptyState, timepicker, messages, inputFields, modal, progressBar, pagination, radioButton, tab, toggle, toast, tag-rounded, segmentedControl, tag-squared, switch, tooltip, definitionList, header, navigationMenu, option, KPIcard, footer, slider, skeleton)

### Breakpoints

- `Grid.MQ*.width-default-MQ*` (MQ1-MQ6)

### Icon Sizes

- `Icon_size.icon-size-*` (xsmall, small, medium, large, xlarge)

### Fonts

- `Fonts.*` (daimlerTruck-primary, truckAPI-primary, dtCompanion-primary, [brand]-secondary)

## File Structure

```
src/
├── tokens/
│   ├── Primitives.Value.tokens.json
│   ├── text.styles.tokens.json
│   ├── Themes.*.tokens.json
│   └── Semantic *.Default theme.tokens.json
├── themes/
│   ├── default/
│   │   ├── colors.ts
│   │   ├── palette.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── shape.ts
│   │   ├── breakpoints.ts
│   │   ├── typography.ts
│   │   ├── icons.ts
│   │   ├── animations.ts
│   │   └── index.ts
│   └── [generated-themes]/
└── utils/
    └── theme-generator/
        ├── tokenUtils.ts
        ├── fileUtils.ts
        ├── validation.ts
        ├── formatter.ts
        ├── generators/
        │   ├── colors.ts
        │   ├── spacing.ts
        │   ├── radius.ts
        │   ├── shadows.ts
        │   ├── shape.ts
        │   ├── breakpoints.ts
        │   ├── typography.ts
        │   ├── icons.ts
        │   └── animations.ts
        ├── index.ts
        └── runner.ts
```

## Validation

The system includes comprehensive validation:

- **Theme Completeness**: Checks for required token categories
- **Token Validation**: Ensures tokens exist and have valid values
- **Reference Resolution**: Handles nested token references
- **Fallback Handling**: Provides fallback values for missing tokens

## Error Handling

- **Missing Tokens**: Themes with missing required tokens are skipped with warnings
- **Invalid References**: Unresolvable token references fall back to `inherit`
- **Syntax Errors**: JSON parsing errors are caught and reported
- **Type Errors**: TypeScript compilation errors are reported

## Contributing

When modifying the theme generation system:

1. Update the appropriate generator in `src/utils/theme-generator/generators/`
2. Update the `CustomTheme` type in `src/types/theme.ts`
3. Update the default theme files if needed
4. Run `yarn build:theme` to test changes
5. Update this documentation

## &copy; License

Licensed under [MIT License](LICENSE.md)
