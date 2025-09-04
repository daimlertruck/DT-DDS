import { TokenFile } from '../../types';
import { generateBreakpoints } from '../theme-generator/generators/breakpoints';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('breakpoints generator', () => {
  describe('generateBreakpoints', () => {
    it('should generate breakpoints from tokens', () => {
      const tokensWithBreakpoints: TokenFile = {
        Grid: {
          MQ1: {
            'width-default-MQ1': { $type: 'dimension', $value: '360px' },
          },
          MQ2: {
            'width-default-MQ2': { $type: 'dimension', $value: '480px' },
          },
          MQ3: {
            'width-default-MQ3': { $type: 'dimension', $value: '768px' },
          },
          MQ4: {
            'width-default-MQ4': { $type: 'dimension', $value: '1024px' },
          },
          MQ5: {
            'width-default-MQ5': { $type: 'dimension', $value: '1280px' },
          },
          MQ6: {
            'width-default-MQ6': { $type: 'dimension', $value: '1440px' },
          },
        },
      };

      const result = generateBreakpoints(tokensWithBreakpoints, 'test-theme');
      expect(result).toContain('export const breakpoints');
      expect(result).toContain('mq1: 360');
      expect(result).toContain('mq2: 480');
      expect(result).toContain('mq3: 768');
      expect(result).toContain('mq4: 1024');
      expect(result).toContain('mq5: 1280');
      expect(result).toContain('mq6: 1440');
      expect(result).toContain('s: 480');
      expect(result).toContain('m: 768');
      expect(result).toContain('l: 1024');
      expect(result).toContain('xl: 1280');
      expect(result).toContain('md: 768');
      expect(result).toContain('lg: 1024');
      expect(result).toContain('xxl: 1440');
    });

    it('should handle missing breakpoints section', () => {
      const tokensWithoutBreakpoints: TokenFile = {
        Core_colors: {
          Grey: {
            'grey-20': { $type: 'color', $value: '#f3f3f5' },
          },
        },
      };

      const result = generateBreakpoints(
        tokensWithoutBreakpoints,
        'test-theme'
      );
      expect(result).toContain('export const breakpoints');
      expect(result).toContain('mq1: 360');
      expect(result).toContain('mq2: 480');
      expect(result).toContain('mq3: 768');
      expect(result).toContain('mq4: 1024');
      expect(result).toContain('mq5: 1280');
      expect(result).toContain('mq6: 1440');
    });

    it('should handle partial breakpoint sets', () => {
      const partialBreakpointTokens: TokenFile = {
        Grid: {
          MQ1: {
            'width-default-MQ1': { $type: 'dimension', $value: '360px' },
          },
          MQ4: {
            'width-default-MQ4': { $type: 'dimension', $value: '1024px' },
          },
        },
      };

      const result = generateBreakpoints(
        partialBreakpointTokens,
        'partial-theme'
      );
      expect(result).toContain('export const breakpoints');
      expect(result).toContain('mq1: 360');
      expect(result).toContain('mq4: 1024');
      expect(result).toContain('s: 480');
      expect(result).toContain('m: 768');
      expect(result).toContain('l: 1024');
    });

    it('should convert breakpoint names correctly', () => {
      const breakpointTokens: TokenFile = {
        Grid: {
          MQ1: {
            'width-default-MQ1': { $type: 'dimension', $value: '320px' },
          },
          MQ3: {
            'width-default-MQ3': { $type: 'dimension', $value: '768px' },
          },
          MQ4: {
            'width-default-MQ4': { $type: 'dimension', $value: '1024px' },
          },
          MQ6: {
            'width-default-MQ6': { $type: 'dimension', $value: '1440px' },
          },
        },
      };

      const result = generateBreakpoints(breakpointTokens, 'custom-theme');
      expect(result).toContain('mq1: 320');
      expect(result).toContain('mq3: 768');
      expect(result).toContain('mq4: 1024');
      expect(result).toContain('mq6: 1440');
    });

    it('should handle breakpoints with special naming', () => {
      const specialBreakpointTokens: TokenFile = {
        Grid: {
          MQ1: {
            'width-default-MQ1': { $type: 'dimension', $value: '0px' },
          },
          MQ6: {
            'width-default-MQ6': { $type: 'dimension', $value: '1200px' },
          },
        },
      };

      const result = generateBreakpoints(
        specialBreakpointTokens,
        'special-theme'
      );
      expect(result).toContain('mq1: 0');
      expect(result).toContain('mq6: 1200');
      expect(result).toContain('s: 480');
      expect(result).toContain('m: 768');
    });
  });
});
