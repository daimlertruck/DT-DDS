import { formatObject } from '../formatter';
import { getTokenValue } from '../tokenUtils';

import { TokenFile } from './../../../types';

/**
 * Generates icons.ts file content
 */
export function generateIcons(tokens: TokenFile, themeName: string): string {
  const iconSizeTokens = tokens.Icon_size as any;

  if (!iconSizeTokens) {
    console.warn(
      `⚠️  No Icon_size tokens found for theme '${themeName}', using fallback values`
    );
    return generateFallbackIcons();
  }

  // Extract icon size values from Icon_size tokens
  const icons: { [key: string]: string } = {};

  // Map icon size tokens to theme properties
  const iconSizeMappings = {
    'icon-size-xsmall': 'xsmall',
    'icon-size-small': 'small',
    'icon-size-medium': 'medium',
    'icon-size-large': 'large',
    'icon-size-xlarge': 'xlarge',
  };

  // Extract values for each icon size
  for (const [tokenName, propertyName] of Object.entries(iconSizeMappings)) {
    const value = getTokenValue(iconSizeTokens, tokenName);
    if (value) {
      icons[propertyName] = value;
    }
  }

  return `import { CustomTheme as Theme } from '../../types';

export const iconSizes: Theme['iconSizes'] = ${formatObject(icons)};
`;
}

/**
 * Fallback icon sizes when Icon_size tokens are not available
 */
function generateFallbackIcons(): string {
  const icons = {
    xsmall: '12px',
    small: '16px',
    medium: '20px',
    large: '24px',
    xlarge: '32px',
  };

  return `import { CustomTheme as Theme } from '../../types';

export const iconSizes: Theme['iconSizes'] = ${formatObject(icons)};
`;
}
