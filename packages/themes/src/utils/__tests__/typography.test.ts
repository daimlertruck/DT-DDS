import { TokenFile } from '../../types';
import { generateTypography } from '../theme-generator/generators/typography';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation();
});

describe('typography generator', () => {
  describe('generateTypography', () => {
    it('should generate typography with basic tokens', () => {
      const mockTokens: TokenFile = {
        Typography: {
          'Font-family': {
            'font-family-primary': { $type: 'string', $value: 'Test Font' },
          },
          Size: {
            Body: {
              medium: { $type: 'dimension', $value: '14px' },
            },
          } as any,
          Weight: {
            Body: {
              'medium-regular': { $type: 'string', $value: 'Regular' },
            },
          } as any,
          'Line-height': {
            Body: {
              medium: { $type: 'dimension', $value: '20px' },
            },
          } as any,
          'Letter-spacing': {
            Body: {
              medium: { $type: 'dimension', $value: '0px' },
            },
          } as any,
        },
      };

      const result = generateTypography(mockTokens, 'test-theme');
      expect(result).toContain('export const fontFamily');
      expect(result).toContain('export const fontStyles');
      expect(result).toContain('export const responsiveFontStyles');
      expect(result).toContain('Daimler CS'); // Hardcoded font family
      expect(result).toContain('bodyMdRegular');
    });

    it('should throw error when Typography section is missing', () => {
      const mockTokens: TokenFile = {
        Core_colors: {
          Grey: { 'grey-20': { $type: 'color', $value: '#f3f3f5' } },
        },
      };

      expect(() => generateTypography(mockTokens, 'test-theme')).toThrow(
        "Missing Typography tokens for theme 'test-theme'"
      );
    });

    it('should handle empty Typography section', () => {
      const mockTokens: TokenFile = {
        Typography: {},
      };

      expect(() => generateTypography(mockTokens, 'empty-theme')).not.toThrow();
    });
  });
});
