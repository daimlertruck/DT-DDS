import {
  TokenValue,
  TokenCategory,
  NestedTokenCategory,
  TokenFile,
} from './../../types';

/**
 * Safely extracts the $value from a TokenCategory
 */
export function getTokenValue(
  tokens: TokenCategory,
  property: string
): string | undefined {
  const token = tokens[property];
  return token?.$value;
}

/**
 * Safely extracts the $value from a nested TokenCategory (like contextual colors)
 */
export function getContextualColorValue(
  contextualColors: NestedTokenCategory,
  category: string,
  property: string
): string | undefined {
  const categoryTokens = contextualColors[category];
  if (!categoryTokens) return undefined;

  const token = categoryTokens[property];
  return token?.$value;
}

/**
 * Resolves token references recursively
 */
export function resolveTokenReference(
  tokens: TokenFile,
  reference: string
): string {
  // Remove the curly braces
  const cleanReference = reference.replace(/[{}]/g, '');

  // Split the reference by dots
  const parts = cleanReference.split('.');

  // Navigate through the token structure
  let current: any = tokens;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      console.warn(
        `⚠️  Could not resolve token reference: ${reference} (failed at: ${part})`
      );
      return 'inherit'; // Fallback value
    }
  }

  // Extract the $value
  if (current && typeof current === 'object' && '$value' in current) {
    const value = (current as TokenValue).$value;

    // Check if the resolved value is another reference (starts and ends with {})
    if (
      typeof value === 'string' &&
      value.startsWith('{') &&
      value.endsWith('}')
    ) {
      return resolveTokenReference(tokens, value);
    }

    return value;
  }

  console.warn(`⚠️  Could not find $value for token reference: ${reference}`);
  return 'inherit'; // Fallback value
}

/**
 * Validates a single token value
 */
export function validateToken(
  themeName: string,
  tokenPath: string,
  value: string | undefined
): string {
  if (value === undefined || value === null || value === '') {
    throw new Error(
      `Missing required token: ${tokenPath} in theme '${themeName}'`
    );
  }

  // Accept string values that start and end with {} as valid token references
  if (
    typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    return value; // This is a valid reference
  }

  return value;
}

/**
 * Validates required tokens in a category
 */
export function validateRequiredTokens(
  themeName: string,
  tokens: TokenCategory,
  requiredTokens: string[]
): void {
  for (const tokenName of requiredTokens) {
    const value = getTokenValue(tokens, tokenName);
    validateToken(themeName, tokenName, value);
  }
}
