import {
  TokenFile,
  NestedTokenCategory,
  ValidationResult,
} from './../../types';
import { getContextualColorValue } from './tokenUtils';

/**
 * Validates theme completeness by checking all required tokens
 */
export function validateThemeCompleteness(
  themeName: string,
  tokens: TokenFile
): ValidationResult {
  const missingTokens: string[] = [];
  const missingCategories: string[] = [];

  console.log(`🔍 Validating theme '${themeName}' completeness...`);

  // Get contextual colors
  const contextualColors = tokens.Contextual_colors as NestedTokenCategory;
  if (!contextualColors) {
    missingCategories.push('Contextual_colors');
    console.log('   ❌ Missing entire category: Contextual_colors');
  } else {
    console.log(
      `   Available categories: ${Object.keys(contextualColors).join(', ')}`
    );

    // Define required categories and their token mappings
    const categoryTokenMappings = {
      Surface: [
        'surface-default',
        'surface-light',
        'surface-medium',
        'surface-dark',
        'surface-contrast',
      ],
      Content: [
        'content-default',
        'content-light',
        'content-medium',
        'content-dark',
        'content-contrast',
      ],
      Border: [
        'border-default',
        'border-light',
        'border-medium',
        'border-dark',
        'border-contrast',
      ],
      Primary: [
        'primary-default',
        'primary-light',
        'primary-medium',
        'primary-dark',
      ],
      Secondary: [
        'secondary-default',
        'secondary-light',
        'secondary-medium',
        'secondary-dark',
      ],
      Accent: [
        'accent-default',
        'accent-light',
        'accent-medium',
        'accent-dark',
      ],
      Informative: ['info-default', 'info-light', 'info-medium', 'info-dark'],
      Success: [
        'success-default',
        'success-light',
        'success-medium',
        'success-dark',
      ],
      Warning: [
        'warning-default',
        'warning-light',
        'warning-medium',
        'warning-dark',
      ],
      Error: ['error-default', 'error-light', 'error-medium', 'error-dark'],
    };

    for (const [category, requiredTokenNames] of Object.entries(
      categoryTokenMappings
    )) {
      const categoryTokens = contextualColors[category];
      if (!categoryTokens) {
        missingCategories.push(category);
        console.log(`   ❌ Missing entire category: ${category}`);
        continue;
      }

      console.log(`   ✅ Found category: ${category}`);

      // Check each token in the category
      for (const tokenName of requiredTokenNames) {
        const value = getContextualColorValue(
          contextualColors,
          category,
          tokenName
        );
        if (value) {
          // Extract the display name (e.g., "default" from "surface-default")
          const displayName = tokenName.split('-').pop() || tokenName;
          console.log(
            `   ✅ Found token: ${category}.${displayName} = ${value}`
          );
        } else {
          const displayName = tokenName.split('-').pop() || tokenName;
          const tokenPath = `${category}.${displayName}`;
          missingTokens.push(tokenPath);
          console.log(`   ❌ Missing token: ${tokenPath}`);
        }
      }
    }
  }

  const totalMissing = missingTokens.length + missingCategories.length;

  if (totalMissing > 0) {
    console.log(
      `⚠️  Theme '${themeName}' is missing required tokens and will be skipped:`
    );
    console.log(`   - ${missingCategories.join('.*, ')}.*`);
    console.log(`   📋 Missing categories: ${missingCategories.join(', ')}`);
    console.log(`   📋 Total missing tokens: ${totalMissing}`);
  } else {
    console.log(`✅ Theme '${themeName}' is complete!`);
  }

  return {
    isValid: totalMissing === 0,
    missingTokens,
    missingCategories,
    totalMissing,
  };
}

/**
 * Validates shadows for a theme
 */
export function validateShadows(themeName: string, tokens: TokenFile): void {
  const elevations = tokens.Elevations as NestedTokenCategory;
  if (!elevations) {
    console.warn(`⚠️  No elevation tokens found for theme '${themeName}'`);
    return;
  }

  console.log(`🔍 Validating shadows for theme '${themeName}'...`);
  console.log(
    `   Available elevation tokens: ${Object.keys(elevations).join(', ')}`
  );
}

/**
 * Validates shapes for a theme
 */
export function validateShapes(themeName: string, tokens: TokenFile): void {
  const shapes = tokens.Shape as any;
  if (!shapes) {
    console.warn(`⚠️  No shape tokens found for theme '${themeName}'`);
    return;
  }

  console.log(`🔍 Validating shapes for theme '${themeName}'...`);
  console.log(`   Available shape tokens: ${Object.keys(shapes).join(', ')}`);
}

/**
 * Validates typography for a theme
 */
export function validateTypography(themeName: string, tokens: TokenFile): void {
  const typography = tokens.Typography as NestedTokenCategory;
  if (!typography) {
    console.warn(`⚠️  No typography tokens found for theme '${themeName}'`);
    return;
  }

  console.log(`🔍 Validating typography for theme '${themeName}'...`);
  console.log(
    `   Available typography categories: ${Object.keys(typography).join(', ')}`
  );
}
