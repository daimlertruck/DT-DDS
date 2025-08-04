import { hexToRgba } from '../hexToRgba';

describe('hexToRgba', () => {
  it('should convert a hex color to RGBA format', () => {
    const hexColor = '#FF0000';
    const alpha = 0.5;
    const expectedRgba = 'rgba(255,0,0,0.5)';

    const result = hexToRgba(hexColor, alpha);

    expect(result).toBe(expectedRgba);
  });

  it('should handle empty string input', () => {
    const hexColor = '';
    const alpha = 0.8;
    const expectedRgba = 'rgba(undefined,undefined,undefined,0.8)';

    const result = hexToRgba(hexColor, alpha);

    expect(result).toBe(expectedRgba);
  });

  it('should handle missing alpha value', () => {
    const hexColor = '#00FF00';
    const expectedRgba = 'rgba(0,255,0,1)';

    const result = hexToRgba(hexColor);

    expect(result).toBe(expectedRgba);
  });
});
