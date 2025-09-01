export interface TokenValue {
  $type: string;
  $value: string;
  $description?: string;
}

export interface TokenCategory {
  [key: string]: TokenValue;
}

export interface NestedTokenCategory {
  [key: string]: TokenCategory;
}

export interface TokenFile {
  [category: string]: TokenCategory | NestedTokenCategory;
}

export interface ThemeFileInfo {
  themeName: string;
  themeFile: string;
  semanticFile: string | null;
}

export interface GenerationResult {
  success: boolean;
  themeName: string;
  error?: string;
  generatedFiles?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  missingTokens: string[];
  missingCategories: string[];
  totalMissing: number;
}

export interface TokenReference {
  category: string;
  subcategory?: string;
  property?: string;
}

export interface ResolvedToken {
  value: string;
  isResolved: boolean;
}

export interface TokenResolutionContext {
  semanticTokens: TokenFile;
  primitiveTokens: TokenFile;
}

export interface ComponentTokenValue {
  $type: string;
  $value: string;
  $description?: string;
}

export interface ComponentTokens {
  [key: string]: ComponentTokenValue | ComponentTokens;
}

export interface ProcessedComponentTokens {
  [key: string]: string | ProcessedComponentTokens;
}

export interface ComponentGenerationResult {
  components: ProcessedComponentTokens;
  code: string;
}

export type TokenProcessor<T> = (
  tokens: T,
  context: TokenResolutionContext
) => T;
export type TokenResolver = (
  reference: string,
  context: TokenResolutionContext
) => ResolvedToken;
export type TokenTransformer<T, U> = (input: T) => U;
