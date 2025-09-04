import { TokenFile } from '../../types';
import { generateSpacing } from '../theme-generator/generators/spacing';

describe('spacing generator', () => {
  describe('generateSpacing', () => {
    it('should generate spacing from tokens', () => {
      const mockTokens: TokenFile = {
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
      };

      const result = generateSpacing(mockTokens, 'test-theme');
      expect(result).toContain('export const spacing');
      expect(result).toContain("none: '0px'");
      expect(result).toContain("'6xs': '2px'");
      expect(result).toContain("xs: '24px'");
      expect(result).toContain("m: '32px'");
      expect(result).toContain("xl: '56px'");
      expect(result).toContain("'5xl': '128px'");
    });

    it('should throw error when required spacing-0 token is missing', () => {
      const mockTokens: TokenFile = {
        Spacings: {
          'spacing-10': { $type: 'dimension', $value: '2px' },
        },
      };

      expect(() => generateSpacing(mockTokens, 'test-theme')).toThrow(
        "Missing required token: spacing-0 in theme 'test-theme'"
      );
    });

    it('should throw error when Spacings section is empty', () => {
      const mockTokens: TokenFile = {
        Spacings: {},
      };

      expect(() => generateSpacing(mockTokens, 'empty-theme')).toThrow(
        "Missing required token: spacing-0 in theme 'empty-theme'"
      );
    });
  });
});
