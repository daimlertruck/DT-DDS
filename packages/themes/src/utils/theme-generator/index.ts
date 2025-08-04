import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { GenerationResult } from './../../types';
import { findThemeFiles, processThemeTokens, writeFile } from './fileUtils';
import { generateAnimations } from './generators/animations';
import { generateBreakpoints } from './generators/breakpoints';
import { generateColors, generatePalette } from './generators/colors';
import { generateIcons } from './generators/icons';
import { generateRadius } from './generators/radius';
import { generateShadows } from './generators/shadows';
import { generateShape } from './generators/shape';
import { generateSpacing } from './generators/spacing';
import { generateTypography } from './generators/typography';
import {
  validateThemeCompleteness,
  validateShadows,
  validateShapes,
  validateTypography,
} from './validation';

/**
 * Generates index.ts file for a theme
 */
function generateIndex(): string {
  return `import { CustomTheme } from '../../types';

import { animations } from './animations';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { palette } from './palette';
import { radius } from './radius';
import { shadows } from './shadows';
import { shape } from './shape';
import { spacing } from './spacing';
import { fontFamily, fontStyles, responsiveFontStyles } from './typography';
import { iconSizes } from './icons';

export const theme: CustomTheme = {
  animations,
  breakpoints,
  palette,
  colors,
  radius,
  shadows,
  spacing,
  fontFamily,
  fontStyles,
  responsiveFontStyles,
  shape,
  iconSizes,
  icons: 'outlined',
};

export default theme;
`;
}

/**
 * Generates theme exports for the main index.ts
 */
function generateThemeExports(themeNames: string[]): string {
  const exports = themeNames
    .map(
      (themeName) =>
        `export { default as ${themeName.replace(
          /-/g,
          ''
        )}Theme } from './${themeName}';`
    )
    .join('\n');

  return `${exports}

export * from './default';
`;
}

/**
 * Generates a complete theme for a given theme name
 */
function generateThemeForName(
  themeName: string,
  themeFile: string,
  semanticFile: string | null
): GenerationResult {
  try {
    console.log(`🎨 Generating theme: ${themeName}`);
    console.log(`   Theme file: ${themeFile}`);
    console.log(`   Semantic file: ${semanticFile || 'none'}`);

    // Process all tokens for this theme
    const tokens = processThemeTokens(themeName, themeFile, semanticFile);

    // Validate theme completeness
    const validation = validateThemeCompleteness(themeName, tokens);
    if (!validation.isValid) {
      console.log(`⏭️  Skipping theme '${themeName}' due to missing tokens`);
      return {
        success: false,
        themeName,
        error: `Missing required tokens: ${validation.missingCategories.join(
          ', '
        )}`,
      };
    }

    // Validate other aspects
    validateShadows(themeName, tokens);
    validateShapes(themeName, tokens);
    validateTypography(themeName, tokens);

    // Generate theme directory
    const themeDir = path.join(__dirname, '../../themes', themeName);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    const generatedFiles: string[] = [];

    // Generate all theme files
    const files = [
      { name: 'colors.ts', content: generateColors(tokens) },
      { name: 'palette.ts', content: generatePalette(tokens, themeName) },
      { name: 'spacing.ts', content: generateSpacing(tokens, themeName) },
      { name: 'radius.ts', content: generateRadius(tokens, themeName) },
      { name: 'shadows.ts', content: generateShadows(tokens, themeName) },
      { name: 'shape.ts', content: generateShape(tokens, themeName) },
      {
        name: 'breakpoints.ts',
        content: generateBreakpoints(tokens, themeName),
      },
      { name: 'typography.ts', content: generateTypography(tokens, themeName) },
      { name: 'icons.ts', content: generateIcons(tokens, themeName) },
      { name: 'animations.ts', content: generateAnimations() },
      { name: 'index.ts', content: generateIndex() },
    ];

    for (const file of files) {
      const filePath = path.join(themeDir, file.name);
      writeFile(filePath, file.content);
      generatedFiles.push(filePath);
    }

    console.log(`✅ Successfully generated theme: ${themeName}`);

    return {
      success: true,
      themeName,
      generatedFiles,
    };
  } catch (error) {
    console.error(`❌ Error generating theme '${themeName}':`, error);
    return {
      success: false,
      themeName,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Main theme generation function
 */
export function generateThemes(): void {
  console.log('🎨 Starting theme generation...\n');

  // Find all theme files
  const themeFiles = findThemeFiles();
  console.log(`🎨 Found ${themeFiles.length} theme(s) to generate:`);

  for (const theme of themeFiles) {
    console.log(
      `   - ${theme.themeName} (${theme.themeFile} + ${
        theme.semanticFile || 'no semantic file'
      })`
    );
  }
  console.log();

  const results: GenerationResult[] = [];

  // Generate each theme
  for (const theme of themeFiles) {
    const result = generateThemeForName(
      theme.themeName,
      theme.themeFile,
      theme.semanticFile
    );
    results.push(result);
  }

  // Generate main index.ts with all theme exports
  const successfulThemes = results
    .filter((r) => r.success)
    .map((r) => r.themeName);
  const failedThemes = results.filter((r) => !r.success);

  if (successfulThemes.length > 0) {
    const mainIndexPath = path.join(__dirname, '../../themes/index.ts');
    const mainIndexContent = generateThemeExports(successfulThemes);
    writeFile(mainIndexPath, mainIndexContent);
  }

  // Format and lint generated files
  if (successfulThemes.length > 0) {
    console.log('\n🎨 Formatting generated files with prettier...');
    try {
      execSync('npx prettier --write "src/themes/**/*.{ts,tsx}"', {
        cwd: path.join(__dirname, '../../'),
        stdio: 'inherit',
      });
      console.log('✅ Files formatted successfully');
    } catch (error) {
      console.warn('⚠️  Prettier formatting failed:', error);
    }

    console.log('\n🔍 Linting generated files with ESLint...');
    try {
      execSync('npx eslint --fix src/themes/', {
        cwd: path.join(__dirname, '../../'),
        stdio: 'inherit',
      });
      console.log('✅ Files linted successfully');
    } catch (error) {
      console.warn('⚠️  ESLint linting failed:', error);
    }
  }

  // Summary
  console.log('\n📊 Theme Generation Summary:');
  console.log(
    `   ✅ Successfully generated: ${successfulThemes.length} theme(s)`
  );
  console.log(`   ❌ Failed/Skipped: ${failedThemes.length} theme(s)`);

  if (failedThemes.length > 0) {
    console.log('\n🔍 Detailed Failure Analysis:');
    for (const failed of failedThemes) {
      console.log(`   ❌ ${failed.themeName}: ${failed.error}`);
    }
  }

  if (failedThemes.length > 0 && successfulThemes.length === 0) {
    console.log('\n⚠️  All themes failed to generate. Exiting with error.');
    process.exit(1);
  } else if (failedThemes.length > 0) {
    console.log('\n⚠️  Some themes failed to generate, but others succeeded.');
  } else {
    console.log('\n🎉 All themes generated successfully!');
  }
}

// Export individual functions for testing
export {
  generateThemeForName,
  generateColors,
  generatePalette,
  generateSpacing,
  generateRadius,
  generateShadows,
  generateShape,
  generateBreakpoints,
  generateTypography,
  generateIcons,
  generateAnimations,
};
