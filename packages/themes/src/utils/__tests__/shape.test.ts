import { TokenFile } from '../../types';
import { generateShape } from '../theme-generator/generators/shape';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('shape generator', () => {
  describe('generateShape', () => {
    it('should throw error for missing Shape section', () => {
      const tokensWithoutShape: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': {
              $type: 'color',
              $value: '#f3f3f5',
            },
          },
        },
      };

      expect(() => generateShape(tokensWithoutShape, 'test-theme')).toThrow(
        "Missing Shape tokens for theme 'test-theme'"
      );
    });

    it('should throw error for empty Shape section', () => {
      const emptyShapeTokens: TokenFile = {
        Shape: {},
      };

      expect(() => generateShape(emptyShapeTokens, 'empty-theme')).toThrow(
        "Missing required token: shape-button in theme 'empty-theme'"
      );
    });

    it('should throw error for missing required shape tokens', () => {
      const partialShapeTokens: TokenFile = {
        Shape: {
          'shape-button': {
            $type: 'dimension',
            $value: '4px',
          },
          'shape-card': {
            $type: 'dimension',
            $value: '8px',
          },
        },
      };

      expect(() => generateShape(partialShapeTokens, 'partial-theme')).toThrow(
        "Missing required token: shape-checkbox in theme 'partial-theme'"
      );
    });

    it('should generate correct shape for valid tokens', () => {
      const validTokens: TokenFile = {
        Radius: {
          'radius-0': {
            $type: 'dimension',
            $value: '0px',
          },
        },
        Shape: {
          'shape-button': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-checkbox': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-modal': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-emptyState': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-inputFields': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-messages': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-toast': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-tooltip': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-progressBar': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-accordion': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-segmentedControl': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-avatar': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-badge': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-card': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-container': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-datepicker': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-drawer': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-timepicker': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-pagination': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-radioButton': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-tab': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-toggle': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-tag-rounded': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-tag-squared': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-switch': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-definitionList': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-header': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-navigationMenu': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-option': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-KPIcard': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-footer': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-slider': {
            $type: 'dimension',
            $value: '{Radius.radius-0}',
          },
          'shape-skeleton': {
            $type: 'dimension',
            $value: '50%',
          },
        },
      };

      const result = generateShape(validTokens, 'test-theme');

      expect(result).toContain("button: '0px'");
      expect(result).toContain("checkbox: '0px'");
      expect(result).toContain("avatar: '0px'");
      expect(result).toContain("skeleton: 'inherit'");
    });
  });
});
