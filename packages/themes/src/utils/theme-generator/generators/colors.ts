import { formatObject } from '../formatter';
import { resolveTokenReference } from '../tokenUtils';
import { TokenFile } from './../../../types';

/**
 * Generates colors.ts file content
 */
export function generateColors(tokens: TokenFile): string {
  const colors: { [key: string]: string } = {};

  // Extract core colors
  if (tokens.Core_colors) {
    for (const [colorGroup, colorTokens] of Object.entries(
      tokens.Core_colors
    )) {
      const groupName = colorGroup.toLowerCase();
      for (const [colorName, colorToken] of Object.entries(
        colorTokens as any
      )) {
        const cleanName = colorName.replace(`${groupName}-`, '');
        const key = `${groupName}_${cleanName}`;
        colors[key] = (colorToken as any).$value;
      }
    }
  }

  // Extract product colors
  if (tokens.Product_colors) {
    for (const [colorGroup, colorTokens] of Object.entries(
      tokens.Product_colors
    )) {
      const groupName = colorGroup.toLowerCase().replace(/_/g, '');
      for (const [colorName, colorToken] of Object.entries(
        colorTokens as any
      )) {
        // Remove the prefix from the color name (e.g., "brightyellow-00" -> "00")
        const cleanName = colorName.replace(`${groupName}-`, '');
        const key = `${groupName}_${cleanName}`;
        colors[key] = (colorToken as any).$value;
      }
    }
  }

  return `import { CustomTheme as Theme } from '../../types';

export const colors: Theme['colors'] = ${formatObject(colors)} as const;
`;
}

/**
 * Gets the category mappings for palette generation
 */
function getCategoryMappings() {
  return {
    Surface: {
      default: 'surface-default',
      light: 'surface-light',
      medium: 'surface-medium',
      dark: 'surface-dark',
      contrast: 'surface-contrast',
    },
    Content: {
      default: 'content-default',
      light: 'content-light',
      medium: 'content-medium',
      dark: 'content-dark',
      contrast: 'content-contrast',
    },
    Border: {
      default: 'border-default',
      light: 'border-light',
      medium: 'border-medium',
      dark: 'border-dark',
      contrast: 'border-contrast',
    },
    Primary: {
      default: 'primary-default',
      light: 'primary-light',
      medium: 'primary-medium',
      dark: 'primary-dark',
    },
    Secondary: {
      default: 'secondary-default',
      light: 'secondary-light',
      medium: 'secondary-medium',
      dark: 'secondary-dark',
    },
    Accent: {
      default: 'accent-default',
      light: 'accent-light',
      medium: 'accent-medium',
      dark: 'accent-dark',
    },
    Informative: {
      default: 'info-default',
      light: 'info-light',
      medium: 'info-medium',
      dark: 'info-dark',
    },
    Success: {
      default: 'success-default',
      light: 'success-light',
      medium: 'success-medium',
      dark: 'success-dark',
    },
    Warning: {
      default: 'warning-default',
      light: 'warning-light',
      medium: 'warning-medium',
      dark: 'warning-dark',
    },
    Error: {
      default: 'error-default',
      light: 'error-light',
      medium: 'error-medium',
      dark: 'error-dark',
    },
  };
}

/**
 * Resolves a token value if it exists
 */
function resolveTokenValue(tokens: TokenFile, tokenValue: string): string {
  return tokenValue ? resolveTokenReference(tokens, tokenValue) : '';
}

/**
 * Processes a single category for palette generation
 */
function processCategory(
  category: string,
  mappings: any,
  categoryTokens: any,
  tokens: TokenFile
): any {
  const result: any = {
    default: resolveTokenValue(
      tokens,
      categoryTokens[mappings.default]?.$value
    ),
    light: resolveTokenValue(tokens, categoryTokens[mappings.light]?.$value),
    medium: resolveTokenValue(tokens, categoryTokens[mappings.medium]?.$value),
    dark: resolveTokenValue(tokens, categoryTokens[mappings.dark]?.$value),
  };

  // Add contrast for surface, content, and border
  if (['Surface', 'Content', 'Border'].includes(category)) {
    const contrastMapping = mappings as typeof mappings & { contrast: string };
    result.contrast = resolveTokenValue(
      tokens,
      categoryTokens[contrastMapping.contrast]?.$value
    );
  }

  return result;
}

/**
 * Generates palette.ts file content
 */
export function generatePalette(tokens: TokenFile, themeName: string): string {
  const contextualColors = tokens.Contextual_colors as any;
  if (!contextualColors) {
    throw new Error(`Missing Contextual_colors for theme '${themeName}'`);
  }

  const palette: any = {};
  const categoryMappings = getCategoryMappings();

  for (const [category, mappings] of Object.entries(categoryMappings)) {
    const categoryTokens = contextualColors[category];
    if (!categoryTokens) continue;

    palette[category.toLowerCase()] = processCategory(
      category,
      mappings,
      categoryTokens,
      tokens
    );
  }

  return `import { CustomTheme as Theme } from '../../types';

export const palette: Theme['palette'] = ${formatObject(palette)} as const;
`;
}
