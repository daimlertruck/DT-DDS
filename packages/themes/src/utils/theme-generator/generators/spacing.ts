import { formatObject } from '../formatter';
import { getTokenValue, validateRequiredTokens } from '../tokenUtils';

import { TokenFile, TokenCategory } from './../../../types';

/**
 * Generates spacing.ts file content
 */
export function generateSpacing(tokens: TokenFile, themeName: string): string {
  const spacingTokens = tokens.Spacings as TokenCategory;
  if (!spacingTokens) {
    throw new Error(`Missing Spacings for theme '${themeName}'`);
  }

  // Validate required spacing tokens
  const requiredSpacingTokens = [
    'spacing-0',
    'spacing-10',
    'spacing-20',
    'spacing-30',
    'spacing-40',
    'spacing-50',
    'spacing-60',
    'spacing-70',
    'spacing-80',
    'spacing-90',
    'spacing-100',
    'spacing-200',
    'spacing-300',
    'spacing-400',
    'spacing-500',
  ];

  validateRequiredTokens(themeName, spacingTokens, requiredSpacingTokens);

  const spacing: any = {
    none: getTokenValue(spacingTokens, 'spacing-0'),
    '6xs': getTokenValue(spacingTokens, 'spacing-10'),
    '5xs': getTokenValue(spacingTokens, 'spacing-20'),
    '4xs': getTokenValue(spacingTokens, 'spacing-30'),
    '3xs': getTokenValue(spacingTokens, 'spacing-40'),
    '2xs': getTokenValue(spacingTokens, 'spacing-50'),
    xs: getTokenValue(spacingTokens, 'spacing-60'),
    m: getTokenValue(spacingTokens, 'spacing-70'),
    s: getTokenValue(spacingTokens, 'spacing-80'),
    l: getTokenValue(spacingTokens, 'spacing-90'),
    xl: getTokenValue(spacingTokens, 'spacing-100'),
    '2xl': getTokenValue(spacingTokens, 'spacing-200'),
    '3xl': getTokenValue(spacingTokens, 'spacing-300'),
    '4xl': getTokenValue(spacingTokens, 'spacing-400'),
    '5xl': getTokenValue(spacingTokens, 'spacing-500'),
    // Legacy
    xxxsmall: getTokenValue(spacingTokens, 'spacing-10'),
    xxsmall: getTokenValue(spacingTokens, 'spacing-20'),
    xsmall: getTokenValue(spacingTokens, 'spacing-30'),
    small: getTokenValue(spacingTokens, 'spacing-40'),
    xmedium: getTokenValue(spacingTokens, 'spacing-50'),
    medium: getTokenValue(spacingTokens, 'spacing-60'),
    gutter: getTokenValue(spacingTokens, 'spacing-70'),
    large: getTokenValue(spacingTokens, 'spacing-80'),
    xlarge: getTokenValue(spacingTokens, 'spacing-90'),
    xxlarge: getTokenValue(spacingTokens, 'spacing-100'),
    xxxlarge: getTokenValue(spacingTokens, 'spacing-200'),
    xxxxlarge: getTokenValue(spacingTokens, 'spacing-300'),
  };

  return `import { CustomTheme as Theme } from '../../types';

export const spacing: Theme['spacing'] = ${formatObject(spacing)} as const;
`;
}
