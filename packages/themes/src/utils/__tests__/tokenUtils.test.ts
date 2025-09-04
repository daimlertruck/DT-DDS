import { TokenFile } from '../../types';
import {
  resolveTokenReference,
  getTokenValue,
} from '../theme-generator/tokenUtils';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation();
});

describe('tokenUtils', () => {
  describe('resolveTokenReference', () => {
    const mockTokens: TokenFile = {
      Core_colors: {
        Grey: {
          'grey-20': {
            $type: 'color',
            $value: '#f3f3f5',
          },
          'grey-10': {
            $type: 'color',
            $value: '#fafafa',
          },
        },
        Blue: {
          'blue-500': {
            $type: 'color',
            $value: '#007eca',
          },
        },
      },
      Fonts: {
        'daimlerTruck-primary': {
          $type: 'string',
          $value: 'Daimler CS',
        },
        'daimlerTruck-secondary': {
          $type: 'string',
          $value: 'Arial',
        },
      },
      Spacings: {
        'spacing-md': {
          $type: 'dimension',
          $value: '16px',
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

    it('should resolve deeply nested token reference', () => {
      const result = resolveTokenReference(
        mockTokens,
        '{Core_colors.Blue.blue-500}'
      );
      expect(result).toBe('#007eca');
    });

    it('should return inherit for missing token', () => {
      const result = resolveTokenReference(mockTokens, '{Missing.Token}');
      expect(result).toBe('inherit');
    });

    it('should return inherit for missing nested token', () => {
      const result = resolveTokenReference(
        mockTokens,
        '{Core_colors.Missing.token}'
      );
      expect(result).toBe('inherit');
    });

    it('should handle non-string references', () => {
      expect(() => resolveTokenReference(mockTokens, 123 as any)).toThrow();
    });

    it('should handle malformed references', () => {
      const result1 = resolveTokenReference(mockTokens, '{Malformed.Reference');
      expect(result1).toBe('inherit');

      const result2 = resolveTokenReference(mockTokens, 'Missing.Braces');
      expect(result2).toBe('inherit');

      const result3 = resolveTokenReference(mockTokens, '{}');
      expect(result3).toBe('inherit');
    });

    it('should handle deeply nested missing reference', () => {
      const result = resolveTokenReference(
        mockTokens,
        '{Deep.Nested.Missing.Reference}'
      );
      expect(result).toBe('inherit');
    });

    it('should handle references with special characters', () => {
      const tokensWithSpecialChars: TokenFile = {
        'Special-Category': {
          'special_token-name': {
            $type: 'color',
            $value: '#special',
          },
        },
      };

      const result = resolveTokenReference(
        tokensWithSpecialChars,
        '{Special-Category.special_token-name}'
      );
      expect(result).toBe('#special');
    });

    it('should return the reference unchanged if not a token reference', () => {
      const result = resolveTokenReference(mockTokens, '#direct-hex-value');
      expect(result).toBe('inherit');
    });
  });

  describe('getTokenValue', () => {
    it('should get token value from category', () => {
      const categoryTokens = {
        'existing-token': { $type: 'string', $value: 'existing-value' },
        'another-token': { $type: 'color', $value: '#123456' },
      };

      const result1 = getTokenValue(categoryTokens, 'existing-token');
      expect(result1).toBe('existing-value');

      const result2 = getTokenValue(categoryTokens, 'another-token');
      expect(result2).toBe('#123456');
    });

    it('should return undefined for missing properties', () => {
      const categoryTokens = {
        'existing-token': { $type: 'string', $value: 'existing' },
      };

      const result = getTokenValue(categoryTokens, 'missing-token');
      expect(result).toBeUndefined();
    });

    it('should return undefined for malformed tokens', () => {
      const categoryTokens: any = {
        'malformed-token': {
          $type: 'string',
        },
      };

      const result = getTokenValue(categoryTokens, 'malformed-token');
      expect(result).toBeUndefined();
    });

    it('should handle empty category', () => {
      const categoryTokens = {};
      const result = getTokenValue(categoryTokens, 'any-token');
      expect(result).toBeUndefined();
    });

    it('should handle null/undefined category', () => {
      expect(() => getTokenValue(null as any, 'any-token')).toThrow();
      expect(() => getTokenValue(undefined as any, 'any-token')).toThrow();
    });
  });
});
