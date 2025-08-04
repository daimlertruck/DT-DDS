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
