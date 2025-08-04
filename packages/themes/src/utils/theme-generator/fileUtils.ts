import * as fs from 'fs';
import * as path from 'path';

import { TokenFile, ThemeFileInfo } from './../../types';

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Extracts theme name from filename
 */
export function extractThemeName(filename: string): string {
  // Extract name from "Themes.{Name}.tokens.json"
  const match = filename.match(/Themes\.(.+)\.tokens\.json/);
  if (!match) {
    throw new Error(`Invalid theme filename format: ${filename}`);
  }
  return match[1];
}

/**
 * Finds the semantic file for a given theme
 */
export function findSemanticFile(
  themeName: string,
  themeFile: string,
  tokensDir: string
): string | null {
  const files = fs.readdirSync(tokensDir);

  // Extract the original theme name from the theme file
  const originalThemeName = extractThemeName(themeFile);

  const semanticFiles = files.filter(
    (file) =>
      file.includes('Semantic') &&
      file.includes(originalThemeName) &&
      file.includes('Default theme')
  );

  return semanticFiles.length > 0 ? semanticFiles[0] : null;
}

/**
 * Discovers all theme files in the tokens directory
 */
export function findThemeFiles(): ThemeFileInfo[] {
  const tokensDir = path.join(__dirname, '../../tokens');
  console.log(`🔍 Debug: __dirname = ${__dirname}`);
  console.log(`🔍 Debug: tokensDir = ${tokensDir}`);
  console.log(`🔍 Debug: tokensDir exists = ${fs.existsSync(tokensDir)}`);

  const files = fs.readdirSync(tokensDir);

  const themeFiles = files.filter(
    (file) => file.startsWith('Themes.') && file.endsWith('.tokens.json')
  );

  return themeFiles.map((themeFile) => {
    const themeName = extractThemeName(themeFile);
    const kebabThemeName = toKebabCase(themeName);
    const semanticFile = findSemanticFile(kebabThemeName, themeFile, tokensDir);

    return {
      themeName: kebabThemeName,
      themeFile,
      semanticFile,
    };
  });
}

/**
 * Reads and parses a token file
 */
export function readTokenFile(filePath: string): TokenFile | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  Could not read token file: ${filePath}`);
    return null;
  }
}

/**
 * Processes and merges all token files for a theme
 */
export function processThemeTokens(
  themeName: string,
  themeFile: string,
  semanticFile: string | null
): TokenFile {
  const tokensDir = path.join(__dirname, '../../tokens');
  console.log(`🔍 Debug: processThemeTokens tokensDir = ${tokensDir}`);
  const allTokens: TokenFile = {};

  // Read the theme file
  const themeFilePath = path.join(tokensDir, themeFile);
  console.log(`🔍 Debug: themeFilePath = ${themeFilePath}`);
  const themeTokens = readTokenFile(themeFilePath);
  if (themeTokens) {
    Object.assign(allTokens, themeTokens);
  }

  // Read the semantic file if it exists
  if (semanticFile) {
    const semanticFilePath = path.join(tokensDir, semanticFile);
    console.log(`🔍 Debug: semanticFilePath = ${semanticFilePath}`);
    const semanticTokens = readTokenFile(semanticFilePath);
    if (semanticTokens) {
      Object.assign(allTokens, semanticTokens);
    }
  }

  // Also include primitive tokens
  const primitiveFile = path.join(tokensDir, 'Primitives.Value.tokens.json');
  console.log(`🔍 Debug: primitiveFile = ${primitiveFile}`);
  const primitiveTokens = readTokenFile(primitiveFile);
  if (primitiveTokens) {
    Object.assign(allTokens, primitiveTokens);
  }

  // Include text styles tokens (but preserve theme's Typography section)
  const textStylesFile = path.join(tokensDir, 'text.styles.tokens.json');
  console.log(`🔍 Debug: textStylesFile = ${textStylesFile}`);
  const textStylesTokens = readTokenFile(textStylesFile);
  if (textStylesTokens) {
    // Merge text styles without overwriting theme's Typography section
    for (const [key, value] of Object.entries(textStylesTokens)) {
      if (key === 'Typography' && allTokens.Typography) {
        // Merge Typography sections carefully
        Object.assign(allTokens.Typography, value);
      } else {
        allTokens[key] = value;
      }
    }
  }

  return allTokens;
}

/**
 * Writes content to a file with proper formatting
 */
export function writeFile(filePath: string, content: string): void {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Add newline at the end if not present
  if (!content.endsWith('\n')) {
    content += '\n';
  }

  fs.writeFileSync(filePath, content);
  console.log(`Generated: ${filePath}`);
}
