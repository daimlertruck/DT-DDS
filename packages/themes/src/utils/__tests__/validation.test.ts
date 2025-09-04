import { TokenFile } from '../../types';
import {
  validateThemeCompleteness,
  validateShadows,
  validateShapes,
  validateTypography,
} from '../theme-generator/validation';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('validation', () => {
  describe('validateThemeCompleteness', () => {
    it('should return valid result for complete contextual colors', () => {
      const completeTokens: TokenFile = {
        Contextual_colors: {
          Surface: {
            'surface-default': {
              $type: 'color',
              $value: '#ffffff',
            },
            'surface-light': {
              $type: 'color',
              $value: '#f5f5f5',
            },
            'surface-medium': {
              $type: 'color',
              $value: '#e0e0e0',
            },
            'surface-dark': {
              $type: 'color',
              $value: '#333333',
            },
            'surface-contrast': {
              $type: 'color',
              $value: '#000000',
            },
          },
          Primary: {
            'primary-default': {
              $type: 'color',
              $value: '#007bff',
            },
            'primary-light': {
              $type: 'color',
              $value: '#66b3ff',
            },
            'primary-medium': {
              $type: 'color',
              $value: '#0056b3',
            },
            'primary-dark': {
              $type: 'color',
              $value: '#003d82',
            },
          },
        },
      };

      const result = validateThemeCompleteness(
        'complete-theme',
        completeTokens
      );
      expect(result.isValid).toBe(false);
      expect(result.missingCategories).toContain('Content');
      expect(result.missingCategories).toContain('Border');
    });

    it('should return invalid result when Contextual_colors is missing', () => {
      const incompleteTokens: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': {
              $type: 'color',
              $value: '#f3f3f5',
            },
          },
        },
      };

      const result = validateThemeCompleteness(
        'incomplete-theme',
        incompleteTokens
      );
      expect(result.isValid).toBe(false);
      expect(result.missingCategories).toContain('Contextual_colors');
      expect(result.totalMissing).toBeGreaterThan(0);
    });

    it('should return invalid result for empty tokens', () => {
      const emptyTokens: TokenFile = {};

      const result = validateThemeCompleteness('empty-theme', emptyTokens);
      expect(result.isValid).toBe(false);
      expect(result.missingCategories).toContain('Contextual_colors');
    });

    it('should identify missing tokens within existing categories', () => {
      const partialTokens: TokenFile = {
        Contextual_colors: {
          Surface: {
            'surface-default': {
              $type: 'color',
              $value: '#ffffff',
            },
          },
          Primary: {
            'primary-default': {
              $type: 'color',
              $value: '#007bff',
            },
          },
        },
      };

      const result = validateThemeCompleteness('partial-theme', partialTokens);
      expect(result.isValid).toBe(false);
      expect(result.missingTokens.length).toBeGreaterThan(0);
      expect(result.missingCategories.length).toBeGreaterThan(0);
    });

    it('should return valid result for complete theme with required tokens', () => {
      const completeTokens: TokenFile = {
        Contextual_colors: {
          Surface: {
            'surface-default': { $type: 'color', $value: '#ffffff' },
            'surface-light': { $type: 'color', $value: '#f5f5f5' },
            'surface-medium': { $type: 'color', $value: '#e0e0e0' },
            'surface-dark': { $type: 'color', $value: '#333333' },
            'surface-contrast': { $type: 'color', $value: '#000000' },
          },
          Content: {
            'content-default': { $type: 'color', $value: '#333333' },
            'content-light': { $type: 'color', $value: '#666666' },
            'content-medium': { $type: 'color', $value: '#999999' },
            'content-dark': { $type: 'color', $value: '#000000' },
            'content-contrast': { $type: 'color', $value: '#ffffff' },
          },
          Border: {
            'border-default': { $type: 'color', $value: '#cccccc' },
            'border-light': { $type: 'color', $value: '#e0e0e0' },
            'border-medium': { $type: 'color', $value: '#999999' },
            'border-dark': { $type: 'color', $value: '#666666' },
            'border-contrast': { $type: 'color', $value: '#000000' },
          },
          Primary: {
            'primary-default': { $type: 'color', $value: '#007bff' },
            'primary-light': { $type: 'color', $value: '#66b3ff' },
            'primary-medium': { $type: 'color', $value: '#0056b3' },
            'primary-dark': { $type: 'color', $value: '#003d82' },
          },
          Secondary: {
            'secondary-default': { $type: 'color', $value: '#6c757d' },
            'secondary-light': { $type: 'color', $value: '#adb5bd' },
            'secondary-medium': { $type: 'color', $value: '#495057' },
            'secondary-dark': { $type: 'color', $value: '#343a40' },
          },
          Accent: {
            'accent-default': { $type: 'color', $value: '#17a2b8' },
            'accent-light': { $type: 'color', $value: '#5bc0de' },
            'accent-medium': { $type: 'color', $value: '#138496' },
            'accent-dark': { $type: 'color', $value: '#0c5460' },
          },
          Informative: {
            'info-default': { $type: 'color', $value: '#17a2b8' },
            'info-light': { $type: 'color', $value: '#5bc0de' },
            'info-medium': { $type: 'color', $value: '#138496' },
            'info-dark': { $type: 'color', $value: '#0c5460' },
          },
          Success: {
            'success-default': { $type: 'color', $value: '#28a745' },
            'success-light': { $type: 'color', $value: '#7dd87d' },
            'success-medium': { $type: 'color', $value: '#1e7e34' },
            'success-dark': { $type: 'color', $value: '#155724' },
          },
          Warning: {
            'warning-default': { $type: 'color', $value: '#ffc107' },
            'warning-light': { $type: 'color', $value: '#ffda6a' },
            'warning-medium': { $type: 'color', $value: '#e0a800' },
            'warning-dark': { $type: 'color', $value: '#d39e00' },
          },
          Error: {
            'error-default': { $type: 'color', $value: '#dc3545' },
            'error-light': { $type: 'color', $value: '#f5c6cb' },
            'error-medium': { $type: 'color', $value: '#c82333' },
            'error-dark': { $type: 'color', $value: '#bd2130' },
          },
        },
      };

      const result = validateThemeCompleteness(
        'complete-theme',
        completeTokens
      );

      expect(result.isValid).toBe(true);
    });
  });

  describe('validateShadows', () => {
    it('should validate shadows with elevations', () => {
      const mockTokens: TokenFile = {
        Elevations: {
          100: {
            'x-100': {
              $type: 'dimension',
              $value: '0px',
            },
            'y-100': {
              $type: 'dimension',
              $value: '1px',
            },
            'blur-100': {
              $type: 'dimension',
              $value: '3px',
            },
            'spread-100': {
              $type: 'dimension',
              $value: '0px',
            },
            'shadow-100': {
              $type: 'color',
              $value: 'rgba(0, 0, 0, 0.1)',
            },
          },
        },
      };

      expect(() => validateShadows('test-theme', mockTokens)).not.toThrow();
    });

    it('should handle missing elevations gracefully', () => {
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

      expect(() => validateShadows('test-theme', mockTokens)).not.toThrow();
    });
  });

  describe('validateShapes', () => {
    it('should validate shapes with shape tokens', () => {
      const mockTokens: TokenFile = {
        Shape: {
          'border-radius-0': {
            $type: 'dimension',
            $value: '0px',
          },
          'border-radius-2': {
            $type: 'dimension',
            $value: '2px',
          },
        },
      };

      expect(() => validateShapes('test-theme', mockTokens)).not.toThrow();
    });

    it('should handle missing shape tokens gracefully', () => {
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

      expect(() => validateShapes('test-theme', mockTokens)).not.toThrow();
    });
  });

  describe('validateTypography', () => {
    it('should validate typography with typography tokens', () => {
      const mockTokens: TokenFile = {
        Typography: {
          'Font-family': {
            'font-family-primary': {
              $type: 'string',
              $value: 'Arial',
            },
          },
        },
      };

      expect(() => validateTypography('test-theme', mockTokens)).not.toThrow();
    });

    it('should handle missing typography tokens gracefully', () => {
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

      expect(() => validateTypography('test-theme', mockTokens)).not.toThrow();
    });
  });
});
