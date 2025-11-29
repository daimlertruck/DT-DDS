import { enUS } from 'date-fns/locale';

import { isDateMatchingFormat, validateDateInRange } from './utils';

describe('validateDateInRange', () => {
  const locale = enUS;
  it('should return valid when is within min and max range', () => {
    const result = validateDateInRange({
      date: new Date('2024-01-10'),
      minDate: new Date('2024-01-01'),
      maxDate: new Date('2024-01-20'),
      locale,
    });

    expect(result).toEqual({ valid: true });
  });

  it('should return valid when no min and max are provided', () => {
    const result = validateDateInRange({
      date: new Date('2024-01-10'),
      locale,
    });

    expect(result).toEqual({ valid: true });
  });

  it('returns invalid when date is before minDate', () => {
    const minDate = new Date('2024-01-10');
    const date = new Date('2024-01-05');

    const result = validateDateInRange({
      date,
      minDate,
      locale,
    });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.message).toBe(
        'Please choose a date on or after 01/10/2024.'
      );
    }
  });

  it('should return invalid when date is after maxDate', () => {
    const maxDate = new Date('2024-01-10');
    const date = new Date('2024-01-15');

    const result = validateDateInRange({
      date,
      maxDate,
      locale,
    });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.message).toBe(
        'Please choose a date on or before 01/10/2024.'
      );
    }
  });
});

describe('isDateMatchingFormat', () => {
  it.each([
    [true, '12/12/2025', 'dd/MM/yyyy'],
    [false, '12/12/202', 'dd/MM/yyyy'],
    [false, '2/2/2025', 'dd/MM/yyyy'],
    [false, '2025/22/22', 'dd/MM/yyyy'],
  ])(
    'should return %s for date "%s" with format "%s"',
    (expected, date, format) => {
      expect(isDateMatchingFormat(date, format)).toBe(expected);
    }
  );
});
