import { getPageNumbers } from '../getPageNumbers';

describe('getPageNumbers', () => {
  it('returns all pages when total pages <= 5', () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageNumbers(3, 3)).toEqual([1, 2, 3]);
  });

  it('returns first 3 pages, ellipsis, and last page when on page 1-3', () => {
    expect(getPageNumbers(1, 10)).toEqual([1, 2, 3, 'ellipsis', 10]);
    expect(getPageNumbers(3, 20)).toEqual([1, 2, 3, 'ellipsis', 20]);
  });

  it('returns first page, ellipsis, and last 3 pages when near the end', () => {
    expect(getPageNumbers(9, 10)).toEqual([1, 'ellipsis', 8, 9, 10]);
    expect(getPageNumbers(18, 20)).toEqual([1, 'ellipsis', 18, 19, 20]);
  });

  it('returns first, ellipsis, middle 3 pages, ellipsis, and last when in the middle', () => {
    expect(getPageNumbers(5, 10)).toEqual([
      1,
      'ellipsis',
      4,
      5,
      6,
      'ellipsis',
      10,
    ]);
    expect(getPageNumbers(10, 20)).toEqual([
      1,
      'ellipsis',
      9,
      10,
      11,
      'ellipsis',
      20,
    ]);
  });
});
