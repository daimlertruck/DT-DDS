import { formatObject } from '../formatter';
import { getTokenValue, validateRequiredTokens } from '../tokenUtils';

import { TokenFile, TokenCategory } from './../../../types';

/**
 * Generates radius.ts file content
 */
export function generateRadius(tokens: TokenFile, themeName: string): string {
  const radiusTokens = tokens.Radius as TokenCategory;
  if (!radiusTokens) {
    throw new Error(`Missing Radius for theme '${themeName}'`);
  }

  // Validate required radius tokens
  const requiredRadiusTokens = [
    'radius-0',
    'radius-10',
    'radius-20',
    'radius-30',
    'radius-40',
    'radius-50',
    'radius-60',
    'radius-70',
    'radius-80',
    'radius-90',
    'radius-100',
    'radius-200',
    'radius-300',
    'radius-400',
    'radius-500',
  ];

  validateRequiredTokens(themeName, radiusTokens, requiredRadiusTokens);

  const radius: any = {
    none: getTokenValue(radiusTokens, 'radius-0'),
    '6xs': getTokenValue(radiusTokens, 'radius-10'),
    '5xs': getTokenValue(radiusTokens, 'radius-20'),
    '4xs': getTokenValue(radiusTokens, 'radius-30'),
    '3xs': getTokenValue(radiusTokens, 'radius-40'),
    '2xs': getTokenValue(radiusTokens, 'radius-50'),
    xs: getTokenValue(radiusTokens, 'radius-60'),
    s: getTokenValue(radiusTokens, 'radius-70'),
    m: getTokenValue(radiusTokens, 'radius-80'),
    l: getTokenValue(radiusTokens, 'radius-90'),
    xl: getTokenValue(radiusTokens, 'radius-100'),
    full: getTokenValue(radiusTokens, 'radius-500'),
  };

  return `import { CustomTheme as Theme } from '../../types';

export const radius: Theme['radius'] = ${formatObject(radius)} as const;
`;
}
