import { TokenFile } from '../../types';
import { generateIcons } from '../theme-generator/generators/icons';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation();
});

describe('icons generator', () => {
  describe('generateIcons', () => {
    it('should generate icons from tokens', () => {
      const mockTokens: TokenFile = {
        Icon_size: {
          'icon-size-xsmall': {
            $type: 'dimension',
            $value: '12px',
          },
          'icon-size-small': {
            $type: 'dimension',
            $value: '16px',
          },
          'icon-size-medium': {
            $type: 'dimension',
            $value: '20px',
          },
          'icon-size-large': {
            $type: 'dimension',
            $value: '24px',
          },
          'icon-size-xlarge': {
            $type: 'dimension',
            $value: '32px',
          },
        },
      };

      const result = generateIcons(mockTokens, 'test-theme');
      expect(result).toContain('export const iconSizes');
      expect(result).toContain("xsmall: '12px'");
      expect(result).toContain("small: '16px'");
      expect(result).toContain("medium: '20px'");
      expect(result).toContain("large: '24px'");
      expect(result).toContain("xlarge: '32px'");
    });

    it('should generate fallback icons when Icon_size section is missing', () => {
      const mockTokens: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': {
              $type: 'color',
              $value: '#f3f3f5',
            },
          },
        },
      };

      const result = generateIcons(mockTokens, 'test-theme');
      expect(result).toContain('export const iconSizes');
      expect(result).toContain("xsmall: '12px'");
      expect(result).toContain("small: '16px'");
      expect(result).toContain("medium: '20px'");
      expect(result).toContain("large: '24px'");
      expect(result).toContain("xlarge: '32px'");
    });

    it('should handle empty Icon_size section', () => {
      const mockTokens: TokenFile = {
        Icon_size: {},
      };

      const result = generateIcons(mockTokens, 'empty-theme');
      expect(result).toContain('export const iconSizes');
      expect(result).toContain('{}');
    });
  });
});
