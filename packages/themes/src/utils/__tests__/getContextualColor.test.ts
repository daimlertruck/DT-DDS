import { theme as defaultTheme } from '../../themes';
import { getContextualColor } from '../getContextualColor';

describe('getContextualColor', () => {
  it('should return the correct color for a valid PaletteKeys input', () => {
    const result = getContextualColor('primary.default', defaultTheme);
    expect(result).toEqual(defaultTheme.palette.primary.default);
  });
});
