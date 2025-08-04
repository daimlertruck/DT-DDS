import { formatObject } from '../formatter';
import { getTokenValue } from '../tokenUtils';

import { TokenFile } from './../../../types';

/**
 * Generates breakpoints.ts file content
 */
export function generateBreakpoints(
  tokens: TokenFile,
  themeName: string
): string {
  const gridTokens = tokens.Grid as any;

  if (!gridTokens) {
    console.warn(
      `⚠️  No Grid tokens found for theme '${themeName}', using fallback values`
    );
    return generateFallbackBreakpoints();
  }

  // Extract breakpoint values from Grid tokens
  const breakpoints: { [key: string]: number } = {};

  // Map MQ tokens to breakpoint names
  const mqMappings = {
    MQ1: 'mq1',
    MQ2: 'mq2',
    MQ3: 'mq3',
    MQ4: 'mq4',
    MQ5: 'mq5',
    MQ6: 'mq6',
  };

  // Extract default width values for each MQ
  for (const [mqKey, breakpointKey] of Object.entries(mqMappings)) {
    const mqTokens = gridTokens[mqKey];
    if (mqTokens) {
      const widthDefault = getTokenValue(
        mqTokens,
        'width-default-MQ1'.replace('MQ1', mqKey)
      );
      if (widthDefault) {
        // Convert "360px" to 360
        const numericValue = parseInt(widthDefault.replace('px', ''), 10);
        if (!isNaN(numericValue)) {
          breakpoints[breakpointKey] = numericValue;
        }
      }
    }
  }

  // Add legacy mappings
  breakpoints.s = breakpoints.mq2 || 480;
  breakpoints.m = breakpoints.mq3 || 768;
  breakpoints.l = breakpoints.mq4 || 1024;
  breakpoints.xl = breakpoints.mq5 || 1280;
  breakpoints.md = breakpoints.mq3 || 768;
  breakpoints.lg = breakpoints.mq4 || 1024;
  breakpoints.xxl = breakpoints.mq6 || 1440;

  return `import { CustomTheme as Theme } from '../../types';

export const breakpoints: Theme['breakpoints'] = ${formatObject(breakpoints)};
`;
}

/**
 * Fallback breakpoints when Grid tokens are not available
 */
function generateFallbackBreakpoints(): string {
  const breakpoints = {
    mq1: 360,
    mq2: 480,
    mq3: 768,
    mq4: 1024,
    mq5: 1280,
    mq6: 1440,
    // Legacy
    s: 480,
    m: 768,
    l: 1024,
    xl: 1280,
    md: 768,
    lg: 1024,
    xxl: 1440,
  };

  return `import { CustomTheme as Theme } from '../../types';

export const breakpoints: Theme['breakpoints'] = ${formatObject(breakpoints)};
`;
}
