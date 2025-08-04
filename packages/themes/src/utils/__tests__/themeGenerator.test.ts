import { toKebabCase, extractThemeName } from '../theme-generator/fileUtils';
import { formatObject, fontWeightToNumber } from '../theme-generator/formatter';
import { generateColors } from '../theme-generator/generators/colors';
import { generateRadius } from '../theme-generator/generators/radius';
import { generateSpacing } from '../theme-generator/generators/spacing';
import { resolveTokenReference } from '../theme-generator/tokenUtils';

describe('Theme Generator', () => {
  describe('fileUtils', () => {
    describe('toKebabCase', () => {
      it('should convert camelCase to kebab-case', () => {
        expect(toKebabCase('camelCase')).toBe('camel-case');
      });

      it('should convert PascalCase to kebab-case', () => {
        expect(toKebabCase('PascalCase')).toBe('pascal-case');
      });

      it('should convert spaces to kebab-case', () => {
        expect(toKebabCase('Daimler Truck')).toBe('daimler-truck');
      });

      it('should handle underscores', () => {
        expect(toKebabCase('snake_case')).toBe('snake-case');
      });
    });

    describe('extractThemeName', () => {
      it('should extract theme name from filename', () => {
        expect(extractThemeName('Themes.Daimler Truck.tokens.json')).toBe(
          'Daimler Truck'
        );
      });

      it('should throw error for invalid filename', () => {
        expect(() => extractThemeName('invalid.json')).toThrow(
          'Invalid theme filename format'
        );
      });
    });
  });

  describe('tokenUtils', () => {
    describe('resolveTokenReference', () => {
      const mockTokens = {
        Core_colors: {
          Grey: {
            'grey-20': {
              $type: 'color',
              $value: '#f3f3f5',
            },
          },
        },
        Fonts: {
          'daimlerTruck-primary': {
            $type: 'string',
            $value: 'Daimler CS',
          },
        },
      };

      it('should resolve nested token reference', () => {
        const result = resolveTokenReference(
          mockTokens,
          '{Core_colors.Grey.grey-20}'
        );
        expect(result).toBe('#f3f3f5');
      });

      it('should resolve simple token reference', () => {
        const result = resolveTokenReference(
          mockTokens,
          '{Fonts.daimlerTruck-primary}'
        );
        expect(result).toBe('Daimler CS');
      });

      it('should return inherit for missing token', () => {
        const result = resolveTokenReference(mockTokens, '{Missing.Token}');
        expect(result).toBe('inherit');
      });
    });
  });

  describe('formatter', () => {
    describe('formatObject', () => {
      it('should format simple object', () => {
        const obj = { key: 'value', number: 42 };
        const result = formatObject(obj);
        expect(result).toContain("key: 'value'");
        expect(result).toContain('number: 42');
      });

      it('should handle nested objects', () => {
        const obj = { nested: { key: 'value' } };
        const result = formatObject(obj);
        expect(result).toContain('nested: {');
        expect(result).toContain("key: 'value'");
      });
    });

    describe('fontWeightToNumber', () => {
      it('should convert Bold to 700', () => {
        expect(fontWeightToNumber('Bold')).toBe(700);
      });

      it('should convert Regular to 400', () => {
        expect(fontWeightToNumber('Regular')).toBe(400);
      });

      it('should handle numeric strings', () => {
        expect(fontWeightToNumber('700')).toBe(700);
        expect(fontWeightToNumber('400')).toBe(400);
      });
    });
  });

  describe('generators', () => {
    const mockTokens = {
      Core_colors: {
        Grey: {
          'grey-20': { $type: 'color', $value: '#f3f3f5' },
          'grey-10': { $type: 'color', $value: '#fafafa' },
        },
      },
      Product_colors: {
        Petrol: {
          'petrol-00': { $type: 'color', $value: '#00677f' },
        },
      },
      Spacings: {
        'spacing-0': { $type: 'dimension', $value: '0px' },
        'spacing-10': { $type: 'dimension', $value: '2px' },
        'spacing-20': { $type: 'dimension', $value: '4px' },
        'spacing-30': { $type: 'dimension', $value: '8px' },
        'spacing-40': { $type: 'dimension', $value: '12px' },
        'spacing-50': { $type: 'dimension', $value: '16px' },
        'spacing-60': { $type: 'dimension', $value: '24px' },
        'spacing-70': { $type: 'dimension', $value: '32px' },
        'spacing-80': { $type: 'dimension', $value: '40px' },
        'spacing-90': { $type: 'dimension', $value: '48px' },
        'spacing-100': { $type: 'dimension', $value: '56px' },
        'spacing-200': { $type: 'dimension', $value: '64px' },
        'spacing-300': { $type: 'dimension', $value: '80px' },
        'spacing-400': { $type: 'dimension', $value: '96px' },
        'spacing-500': { $type: 'dimension', $value: '128px' },
      },
      Radius: {
        'radius-0': { $type: 'dimension', $value: '0px' },
        'radius-10': { $type: 'dimension', $value: '2px' },
        'radius-20': { $type: 'dimension', $value: '4px' },
        'radius-30': { $type: 'dimension', $value: '8px' },
        'radius-40': { $type: 'dimension', $value: '12px' },
        'radius-50': { $type: 'dimension', $value: '16px' },
        'radius-60': { $type: 'dimension', $value: '24px' },
        'radius-70': { $type: 'dimension', $value: '32px' },
        'radius-80': { $type: 'dimension', $value: '40px' },
        'radius-90': { $type: 'dimension', $value: '48px' },
        'radius-100': { $type: 'dimension', $value: '56px' },
        'radius-200': { $type: 'dimension', $value: '64px' },
        'radius-300': { $type: 'dimension', $value: '80px' },
        'radius-400': { $type: 'dimension', $value: '96px' },
        'radius-500': { $type: 'dimension', $value: '100px' },
      },
    };

    describe('generateColors', () => {
      it('should generate colors from tokens', () => {
        const result = generateColors(mockTokens);
        expect(result).toContain('export const colors');
        expect(result).toContain('grey_20');
        expect(result).toContain('#f3f3f5');
      });
    });

    describe('generateSpacing', () => {
      it('should generate spacing from tokens', () => {
        const result = generateSpacing(mockTokens, 'test-theme');
        expect(result).toContain('export const spacing');
        expect(result).toContain("none: '0px'");
        expect(result).toContain("'6xs': '2px'");
      });
    });

    describe('generateRadius', () => {
      it('should generate radius from tokens', () => {
        const result = generateRadius(mockTokens, 'test-theme');
        expect(result).toContain('export const radius');
        expect(result).toContain("none: '0px'");
        expect(result).toContain("'6xs': '2px'");
      });
    });
  });
});
