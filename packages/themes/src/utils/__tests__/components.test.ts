import { TokenFile } from '../../types';
import { generateComponents } from '../theme-generator/generators/components';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
});

describe('components generator', () => {
  describe('generateComponents', () => {
    it('should generate components from tokens', () => {
      const mockComponentTokens: TokenFile = {
        Accordion: {
          'surface-accordion-bg-true-default': {
            $type: 'color',
            $value: '#fafafa',
          },
          'surface-accordion-bg-true-hover': {
            $type: 'color',
            $value: '#f3f3f5',
          },
          'content-accordion-text-default': {
            $type: 'color',
            $value: '#000000',
          },
        },
        Button: {
          Primary: {
            'surface-button-primary-solid-default': {
              $type: 'color',
              $value: '#000000',
            },
            'content-button-primary-solid-default': {
              $type: 'color',
              $value: '#ffffff',
            },
            'surface-button-primary-solid-hover': {
              $type: 'color',
              $value: '#333333',
            },
          },
          Secondary: {
            'surface-button-secondary-outline-default': {
              $type: 'color',
              $value: 'transparent',
            },
            'content-button-secondary-outline-default': {
              $type: 'color',
              $value: '#007eca',
            },
          },
        },
      };

      const result = generateComponents(mockComponentTokens);
      expect(result).toContain('export const components = {');
      expect(result).toContain('accordion: {');
      expect(result).toContain('button: {');
      expect(result).toContain('primary: {');
      expect(result).toContain('secondary: {');
    });

    it('should convert kebab-case keys to camelCase', () => {
      const mockComponentTokens: TokenFile = {
        Accordion: {
          'surface-accordion-bg-true-default': {
            $type: 'color',
            $value: '#fafafa',
          },
        },
        Button: {
          'surface-button-primary-solid-default': {
            $type: 'color',
            $value: '#000000',
          },
        },
      };

      const result = generateComponents(mockComponentTokens);
      expect(result).toContain('surfaceAccordionBgTrueDefault');
      expect(result).toContain('surfaceButtonPrimarySolidDefault');
    });

    it('should handle nested component structures', () => {
      const mockComponentTokens: TokenFile = {
        Button: {
          Primary: {
            'surface-button-primary-solid-default': {
              $type: 'color',
              $value: '#000000',
            },
          },
          Secondary: {
            'surface-button-secondary-outline-default': {
              $type: 'color',
              $value: 'transparent',
            },
          },
        },
      };

      const result = generateComponents(mockComponentTokens);
      expect(result).toContain('primary: {');
      expect(result).toContain('secondary: {');
      expect(result).toContain('surfaceButtonPrimarySolidDefault');
      expect(result).toContain('surfaceButtonSecondaryOutlineDefault');
    });

    it('should handle direct hex values', () => {
      const mockComponentTokens: TokenFile = {
        Button: {
          'surface-button-primary': {
            $type: 'color',
            $value: '#000000',
          },
          'content-button-primary': {
            $type: 'color',
            $value: '#ffffff',
          },
        },
      };

      const result = generateComponents(mockComponentTokens);
      expect(result).toContain('#000000');
      expect(result).toContain('#ffffff');
    });

    it('should handle token references in component values', () => {
      const componentTokensWithRefs: TokenFile = {
        Button: {
          'surface-button-primary': {
            $type: 'color',
            $value: '{Core_colors.Blue.blue-500}',
          },
          'content-button-primary': {
            $type: 'color',
            $value: '{Core_colors.White.white}',
          },
        },
        Core_colors: {
          Blue: {
            'blue-500': { $type: 'color', $value: '#007eca' },
          },
          White: {
            white: { $type: 'color', $value: '#ffffff' },
          },
        },
      };

      const result = generateComponents(componentTokensWithRefs);
      expect(result).toContain('button: {');
      expect(result).toContain("surfaceButtonPrimary: '#007eca'");
      expect(result).toContain("contentButtonPrimary: '#ffffff'");
    });

    it('should handle complex nested component structures', () => {
      const complexComponentTokens: TokenFile = {
        Modal: {
          Header: {
            'surface-modal-header-bg': {
              $type: 'color',
              $value: '#ffffff',
            },
            'content-modal-header-text': {
              $type: 'color',
              $value: '#000000',
            },
          },
          Body: {
            'surface-modal-body-bg': { $type: 'color', $value: '#fafafa' },
          },
          Footer: {
            'surface-modal-footer-bg': { $type: 'color', $value: '#f0f0f0' },
          },
        },
      };

      const result = generateComponents(complexComponentTokens);
      expect(result).toContain('modal: {');
      expect(result).toContain('header: {');
      expect(result).toContain('body: {');
      expect(result).toContain('footer: {');
      expect(result).toContain("surfaceModalHeaderBg: '#ffffff'");
      expect(result).toContain("contentModalHeaderText: '#000000'");
      expect(result).toContain("surfaceModalBodyBg: '#fafafa'");
    });

    it('should handle empty component tokens', () => {
      const emptyTokens: TokenFile = {};
      const result = generateComponents(emptyTokens);
      expect(result).toContain('export const components = {');
    });

    it('should handle components with no valid tokens', () => {
      const invalidComponentTokens: TokenFile = {
        Button: {},
      };

      const result = generateComponents(invalidComponentTokens);
      expect(result).toContain('export const components = {');
      expect(result).toContain('button: {');
    });
  });
});
