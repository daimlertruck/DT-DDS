import { toKebabCase, extractThemeName } from '../theme-generator/fileUtils';

describe('fileUtils', () => {
  describe('toKebabCase', () => {
    it('should convert various string formats to kebab-case', () => {
      expect(toKebabCase('camelCase')).toBe('camel-case');
      expect(toKebabCase('PascalCase')).toBe('pascal-case');
      expect(toKebabCase('snake_case')).toBe('snake-case');
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('Mixed_Case String')).toBe('mixed-case-string');
      expect(toKebabCase('XMLHttpRequest')).toBe('xmlhttp-request');
    });
  });

  describe('extractThemeName', () => {
    it('should extract theme names from valid filenames', () => {
      expect(extractThemeName('Themes.Daimler Truck.tokens.json')).toBe(
        'Daimler Truck'
      );
      expect(extractThemeName('Themes.Default.tokens.json')).toBe('Default');
      expect(extractThemeName('Themes.Light.tokens.json')).toBe('Light');
    });

    it('should throw error for invalid filename formats', () => {
      expect(() => extractThemeName('invalid-filename.json')).toThrow(
        'Invalid theme filename format: invalid-filename.json'
      );
      expect(() => extractThemeName('Themes..tokens.json')).toThrow(
        'Invalid theme filename format: Themes..tokens.json'
      );
    });
  });
});
