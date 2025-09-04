import { TokenFile } from '../../types';
import { generateShadows } from '../theme-generator/generators/shadows';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('shadows generator', () => {
  describe('generateShadows', () => {
    it('should handle missing Elevations', () => {
      const tokensWithoutShadows: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': {
              $type: 'color',
              $value: '#f3f3f5',
            },
          },
        },
      };

      expect(() => generateShadows(tokensWithoutShadows, 'test-theme')).toThrow(
        "Missing Elevations for theme 'test-theme'"
      );
    });

    it('should throw for incomplete shadow values', () => {
      const incompleteShadowTokens: TokenFile = {
        Elevations: {
          '100': {
            'x-100': {
              $type: 'dimension',
              $value: '0px',
            },
            // Missing other required tokens
          },
        },
      };

      expect(() =>
        generateShadows(incompleteShadowTokens, 'incomplete-theme')
      ).toThrow('Incomplete shadow values for elevation: 100');
    });

    it('should throw for missing elevation key', () => {
      const missingElevationTokens: TokenFile = {
        Elevations: {
          '100': {
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
              $value: '2px',
            },
            'spread-100': {
              $type: 'dimension',
              $value: '0px',
            },
            'shadow-100': {
              $type: 'color',
              $value: '#000000',
            },
          },
          // Missing 200, 300, 400, 500, 600, inset
        },
      };

      expect(() =>
        generateShadows(missingElevationTokens, 'missing-theme')
      ).toThrow('Missing elevation: 200');
    });

    it('should generate correct shadows for valid tokens', () => {
      const validTokens: TokenFile = {
        Elevations: {
          '100': {
            'x-100': { $type: 'dimension', $value: '0px' },
            'y-100': { $type: 'dimension', $value: '1px' },
            'blur-100': { $type: 'dimension', $value: '2px' },
            'spread-100': { $type: 'dimension', $value: '0px' },
            'shadow-100': { $type: 'color', $value: '#000000' },
          },
          '200': {
            'x-200': { $type: 'dimension', $value: '0px' },
            'y-200': { $type: 'dimension', $value: '2px' },
            'blur-200': { $type: 'dimension', $value: '4px' },
            'spread-200': { $type: 'dimension', $value: '0px' },
            'shadow-200': { $type: 'color', $value: '#000000' },
          },
          '300': {
            'x-300': { $type: 'dimension', $value: '0px' },
            'y-300': { $type: 'dimension', $value: '3px' },
            'blur-300': { $type: 'dimension', $value: '6px' },
            'spread-300': { $type: 'dimension', $value: '0px' },
            'shadow-300': { $type: 'color', $value: '#000000' },
          },
          '400': {
            'x-400': { $type: 'dimension', $value: '0px' },
            'y-400': { $type: 'dimension', $value: '4px' },
            'blur-400': { $type: 'dimension', $value: '8px' },
            'spread-400': { $type: 'dimension', $value: '0px' },
            'shadow-400': { $type: 'color', $value: '#000000' },
          },
          '500': {
            'x-500': { $type: 'dimension', $value: '0px' },
            'y-500': { $type: 'dimension', $value: '5px' },
            'blur-500': { $type: 'dimension', $value: '10px' },
            'spread-500': { $type: 'dimension', $value: '0px' },
            'shadow-500': { $type: 'color', $value: '#000000' },
          },
          '600': {
            'x-600': { $type: 'dimension', $value: '0px' },
            'y-600': { $type: 'dimension', $value: '6px' },
            'blur-600': { $type: 'dimension', $value: '12px' },
            'spread-600': { $type: 'dimension', $value: '0px' },
            'shadow-elevations-600': { $type: 'color', $value: '#000000' },
          },
          inset: {
            'x-0': { $type: 'dimension', $value: '0px' },
            'y-0': { $type: 'dimension', $value: '1px' },
            'blur-0': { $type: 'dimension', $value: '2px' },
            'spread-0': { $type: 'dimension', $value: '0px' },
            'shadow-0': { $type: 'color', $value: '#000000' },
          },
        },
      };

      const result = generateShadows(validTokens, 'test-theme');

      expect(result).toContain("'0': '0px 1px 2px 0px #000000'");
      expect(result).toContain("'1': '0px 2px 4px 0px #000000'");
      expect(result).toContain("'5': '0px 6px 12px 0px #000000'");
      expect(result).toContain("inner: '0px 1px 2px 0px #000000'");
    });
  });
});
