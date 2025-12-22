import { defaultTheme } from '../../themes';
import { getContextualColor } from '../getContextualColor';

describe('getContextualColor', () => {
  it('should return the correct color for a valid PaletteKeys input', () => {
    const result = getContextualColor('primary.default', defaultTheme);
    expect(result).toEqual(defaultTheme.palette.primary.default);
  });

  it.each`
    color
    ${'invalid.default'}
    ${'primary.invalid'}
    ${'invalid'}
    ${undefined}
  `('should return undefined if color is $color', ({ color }) => {
    const result = getContextualColor(color, defaultTheme);
    expect(result).toBeUndefined();
  });
});
