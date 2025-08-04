import { formatObject } from '../formatter';
import { getTokenValue } from '../tokenUtils';

import { TokenFile, NestedTokenCategory } from './../../../types';

/**
 * Generates shadows.ts file content
 */
export function generateShadows(tokens: TokenFile, themeName: string): string {
  const elevations = tokens.Elevations as NestedTokenCategory;
  if (!elevations) {
    throw new Error(`Missing Elevations for theme '${themeName}'`);
  }

  console.log(`🔍 Validating shadows for theme '${themeName}'...`);
  console.log(
    `   Available elevation tokens: ${Object.keys(elevations).join(', ')}`
  );

  function getShadowValue(elevationKey: string): string {
    const elevation = elevations[elevationKey];
    if (!elevation) {
      throw new Error(`Missing elevation: ${elevationKey}`);
    }

    let x, y, blur, spread, shadow;

    if (elevationKey === 'inset') {
      // Inset uses different token naming
      x = getTokenValue(elevation, 'x-0');
      y = getTokenValue(elevation, 'y-0');
      blur = getTokenValue(elevation, 'blur-0');
      spread = getTokenValue(elevation, 'spread-0');
      shadow = getTokenValue(elevation, 'shadow-0');
    } else {
      // Regular elevations
      x = getTokenValue(elevation, `x-${elevationKey}`);
      y = getTokenValue(elevation, `y-${elevationKey}`);
      blur = getTokenValue(elevation, `blur-${elevationKey}`);
      spread = getTokenValue(elevation, `spread-${elevationKey}`);

      // Handle different shadow token naming for elevation 600
      if (elevationKey === '600') {
        shadow = getTokenValue(elevation, 'shadow-elevations-600');
      } else {
        shadow = getTokenValue(elevation, `shadow-${elevationKey}`);
      }
    }

    if (!x || !y || !blur || !spread || !shadow) {
      throw new Error(
        `Incomplete shadow values for elevation: ${elevationKey}`
      );
    }

    return `${x} ${y} ${blur} ${spread} ${shadow}`;
  }

  const shadows: any = {
    none: 'none',
    0: getShadowValue('100'),
    '0.5': getShadowValue('100'),
    1: getShadowValue('200'),
    2: getShadowValue('300'),
    3: getShadowValue('400'),
    4: getShadowValue('500'),
    5: getShadowValue('600'),
    xs: getShadowValue('100'),
    s: getShadowValue('200'),
    m: getShadowValue('300'),
    l: getShadowValue('400'),
    xl: getShadowValue('500'),
    '2xl': getShadowValue('600'),
    inner: getShadowValue('inset'),
  };

  return `import { CustomTheme as Theme } from '../../types';

export const shadows: Theme['shadows'] = ${formatObject(shadows)} as const;
`;
}
