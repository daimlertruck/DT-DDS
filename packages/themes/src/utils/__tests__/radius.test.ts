import { TokenFile } from '../../types';
import { generateRadius } from '../theme-generator/generators/radius';

describe('radius generator', () => {
  describe('generateRadius', () => {
    it('should generate radius from tokens', () => {
      const mockTokens: TokenFile = {
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

      const result = generateRadius(mockTokens, 'test-theme');
      expect(result).toContain('export const radius');
      expect(result).toContain("none: '0px'");
      expect(result).toContain("'6xs': '2px'");
      expect(result).toContain("xs: '24px'");
      expect(result).toContain("s: '32px'");
      expect(result).toContain("xl: '56px'");
      expect(result).toContain("full: '100px'");
    });

    it('should throw error when required radius-0 token is missing', () => {
      const mockTokens: TokenFile = {
        Radius: {
          'radius-10': { $type: 'dimension', $value: '2px' },
        },
      };

      expect(() => generateRadius(mockTokens, 'test-theme')).toThrow(
        "Missing required token: radius-0 in theme 'test-theme'"
      );
    });

    it('should throw error when Radius section is empty', () => {
      const mockTokens: TokenFile = {
        Radius: {},
      };

      expect(() => generateRadius(mockTokens, 'empty-theme')).toThrow(
        "Missing required token: radius-0 in theme 'empty-theme'"
      );
    });
  });
});
