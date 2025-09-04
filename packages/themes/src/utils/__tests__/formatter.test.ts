import { formatObject, fontWeightToNumber } from '../theme-generator/formatter';

describe('formatter', () => {
  describe('formatObject', () => {
    it('should format simple object', () => {
      const obj = { key: 'value', number: 42 };
      const result = formatObject(obj);
      expect(result).toContain("key: 'value'");
      expect(result).toContain('number: 42');
    });

    it('should handle nested objects', () => {
      const obj = { nested: { key: 'value' } };
      const result = formatObject(obj);
      expect(result).toContain('nested: {');
      expect(result).toContain("key: 'value'");
    });

    it('should handle arrays', () => {
      const obj = { list: ['item1', 'item2'] };
      const result = formatObject(obj);
      expect(result).toContain('list: {');
      expect(result).toContain("'0': 'item1'");
      expect(result).toContain("'1': 'item2'");
    });

    it('should handle boolean values', () => {
      const obj = { enabled: true, disabled: false };
      const result = formatObject(obj);
      expect(result).toContain('enabled: true');
      expect(result).toContain('disabled: false');
    });

    it('should handle null and undefined values', () => {
      const obj = { nullValue: null, undefinedValue: undefined };
      const result = formatObject(obj);
      expect(result).toContain('nullValue: null');
      expect(result).toContain('undefinedValue: undefined');
    });

    it('should handle complex nested structures', () => {
      const obj = {
        theme: {
          colors: {
            primary: '#007eca',
            secondary: '#00677f',
          },
          spacing: [4, 8, 16, 32],
          config: {
            enabled: true,
            version: 1.0,
          },
        },
      };
      const result = formatObject(obj);
      expect(result).toContain('theme: {');
      expect(result).toContain('colors: {');
      expect(result).toContain("primary: '#007eca'");
      expect(result).toContain('spacing: {');
      expect(result).toContain("'0': 4");
      expect(result).toContain("'1': 8");
      expect(result).toContain("'2': 16");
      expect(result).toContain("'3': 32");
      expect(result).toContain('enabled: true');
    });
  });

  describe('fontWeightToNumber', () => {
    it('should convert Bold to 700', () => {
      expect(fontWeightToNumber('Bold')).toBe(700);
    });

    it('should convert Regular to 400', () => {
      expect(fontWeightToNumber('Regular')).toBe(400);
    });

    it('should convert Medium to 500', () => {
      expect(fontWeightToNumber('Medium')).toBe(500);
    });

    it('should convert Light to 400 (default)', () => {
      expect(fontWeightToNumber('Light')).toBe(400);
    });

    it('should handle numeric strings', () => {
      expect(fontWeightToNumber('700')).toBe(700);
      expect(fontWeightToNumber('400')).toBe(400);
      expect(fontWeightToNumber('300')).toBe(400);
      expect(fontWeightToNumber('500')).toBe(500);
    });

    it('should handle unknown weight names', () => {
      expect(fontWeightToNumber('Unknown')).toBe(400); // Default fallback
    });

    it('should handle empty strings', () => {
      expect(fontWeightToNumber('')).toBe(400); // Default fallback
    });

    it('should handle case variations', () => {
      expect(fontWeightToNumber('BOLD')).toBe(700);
      expect(fontWeightToNumber('bold')).toBe(700);
      expect(fontWeightToNumber('rEgUlAr')).toBe(400);
    });
  });
});
