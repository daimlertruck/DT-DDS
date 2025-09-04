import { TokenFile } from '../../types';
import {
  generateColors,
  generatePalette,
} from '../theme-generator/generators/colors';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('colors generator', () => {
  describe('generateColors', () => {
    it('should generate colors from Core_colors tokens', () => {
      const mockTokens: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': { $type: 'color', $value: '#f3f3f5' },
            'grey-10': { $type: 'color', $value: '#fafafa' },
            'grey-00': { $type: 'color', $value: '#ffffff' },
          },
          Blue: {
            'blue-500': { $type: 'color', $value: '#007eca' },
            'blue-600': { $type: 'color', $value: '#005ba3' },
          },
        },
      };

      const result = generateColors(mockTokens);
      expect(result).toContain('export const colors');
      expect(result).toContain('grey_20');
      expect(result).toContain('grey_10');
      expect(result).toContain('grey_00');
      expect(result).toContain('blue_500');
      expect(result).toContain('blue_600');
      expect(result).toContain('#f3f3f5');
      expect(result).toContain('#007eca');
    });

    it('should handle Product_colors with underscores and camelCase', () => {
      const mockTokens: TokenFile = {
        Product_colors: {
          Petrol: {
            'petrol-00': { $type: 'color', $value: '#00677f' },
            'petrol-50': { $type: 'color', $value: '#004d4d' },
          },
          BrightYellow: {
            'brightyellow-00': { $type: 'color', $value: '#ffff00' },
            'brightyellow-50': { $type: 'color', $value: '#cccc00' },
          },
          True_Blue: {
            'trueblue-00': { $type: 'color', $value: '#0066cc' },
          },
        },
      };

      const result = generateColors(mockTokens);
      expect(result).toContain('petrol_00');
      expect(result).toContain('petrol_50');
      expect(result).toContain('brightyellow_00');
      expect(result).toContain('brightyellow_50');
      expect(result).toContain('trueblue_00');
      expect(result).toContain('#00677f');
      expect(result).toContain('#ffff00');
      expect(result).toContain('#0066cc');
    });

    it('should handle both Core_colors and Product_colors together', () => {
      const mockTokens: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': { $type: 'color', $value: '#f3f3f5' },
          },
        },
        Product_colors: {
          Petrol: {
            'petrol-00': { $type: 'color', $value: '#00677f' },
          },
        },
      };

      const result = generateColors(mockTokens);
      expect(result).toContain('grey_20');
      expect(result).toContain('petrol_00');
      expect(result).toContain('#f3f3f5');
      expect(result).toContain('#00677f');
    });

    it('should handle empty or missing color sections', () => {
      const emptyTokens: TokenFile = {};
      const result = generateColors(emptyTokens);
      expect(result).toContain('export const colors');
      expect(result).toContain('as const');
    });

    it('should handle empty color categories', () => {
      const tokensWithEmptyCategories: TokenFile = {
        Core_colors: {},
        Product_colors: {},
      };

      const result = generateColors(tokensWithEmptyCategories);
      expect(result).toContain('export const colors');
    });
  });

  describe('generatePalette', () => {
    const contextualColorTokens: TokenFile = {
      Contextual_colors: {
        Surface: {
          'surface-default': { $type: 'color', $value: '#ffffff' },
          'surface-light': { $type: 'color', $value: '#fafafa' },
          'surface-medium': { $type: 'color', $value: '#f3f3f5' },
          'surface-dark': { $type: 'color', $value: '#e0e0e0' },
          'surface-contrast': { $type: 'color', $value: '#000000' },
        },
        Content: {
          'content-default': { $type: 'color', $value: '#000000' },
          'content-light': { $type: 'color', $value: '#666666' },
          'content-medium': { $type: 'color', $value: '#333333' },
          'content-dark': { $type: 'color', $value: '#000000' },
          'content-contrast': { $type: 'color', $value: '#ffffff' },
        },
        Border: {
          'border-default': { $type: 'color', $value: '#e0e0e0' },
          'border-light': { $type: 'color', $value: '#f3f3f5' },
          'border-medium': { $type: 'color', $value: '#cccccc' },
          'border-dark': { $type: 'color', $value: '#999999' },
          'border-contrast': { $type: 'color', $value: '#000000' },
        },
        Action: {
          'action-default': { $type: 'color', $value: '#007eca' },
          'action-light': { $type: 'color', $value: '#4da6e8' },
          'action-medium': { $type: 'color', $value: '#005ba3' },
          'action-dark': { $type: 'color', $value: '#003d73' },
        },
      },
    };

    it('should generate palette with all contextual color categories', () => {
      const result = generatePalette(contextualColorTokens, 'test-theme');
      expect(result).toContain('export const palette');
      expect(result).toContain('surface: {');
      expect(result).toContain('content: {');
      expect(result).toContain('border: {');
    });

    it('should include contrast values for Surface, Content, and Border', () => {
      const result = generatePalette(contextualColorTokens, 'test-theme');
      expect(result).toContain('contrast:');
      expect(result).toContain('inherit'); // surface contrast
      expect(result).toContain('inherit'); // content contrast
    });

    it('should handle missing contextual colors', () => {
      const tokensWithoutContextual: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': { $type: 'color', $value: '#f3f3f5' },
          },
        },
      };

      expect(() =>
        generatePalette(tokensWithoutContextual, 'test-theme')
      ).toThrow("Missing Contextual_colors for theme 'test-theme'");
    });

    it('should skip categories that are missing from contextual colors', () => {
      const partialContextualTokens: any = {
        Contextual_colors: {
          Surface: contextualColorTokens.Contextual_colors!.Surface,
        },
      };

      const result = generatePalette(partialContextualTokens, 'partial-theme');
      expect(result).toContain('surface: {');
      expect(result).not.toContain('content: {');
      expect(result).not.toContain('border: {');
      expect(result).not.toContain('action: {');
    });

    it('should handle empty contextual color categories', () => {
      const emptyContextualTokens: TokenFile = {
        Contextual_colors: {
          Surface: {},
          Content: {},
        },
      };

      const result = generatePalette(emptyContextualTokens, 'test-theme');
      expect(result).toContain('export const palette');
    });
  });
});
