import { getPageNumbers } from '../getPageNumbers';

describe('getPageNumbers', () => {
  describe('When the current page is on the first two pages ', () => {
    it('should return the first three pages and ellipsis and the last page', () => {
      expect(getPageNumbers(1, 10)).toStrictEqual({
        pages: [1, 2, 3],
        shouldRenderFirstPage: false,
        shouldRenderLastPage: true,
        shouldRenderLeftEllipsis: false,
        shouldRenderRightEllipsis: true,
      });

      expect(getPageNumbers(2, 10)).toStrictEqual({
        pages: [1, 2, 3],
        shouldRenderFirstPage: false,
        shouldRenderLastPage: true,
        shouldRenderLeftEllipsis: false,
        shouldRenderRightEllipsis: true,
      });
    });
  });

  describe('When the current page is on the middle pages ', () => {
    it('should return the correct pages an ellipsis to the right and the last page', () => {
      expect(getPageNumbers(3, 10)).toStrictEqual({
        pages: [2, 3, 4],
        shouldRenderFirstPage: false,
        shouldRenderLastPage: true,
        shouldRenderLeftEllipsis: false,
        shouldRenderRightEllipsis: true,
      });

      expect(getPageNumbers(5, 10)).toStrictEqual({
        pages: [4, 5, 6],
        shouldRenderFirstPage: false,
        shouldRenderLastPage: true,
        shouldRenderLeftEllipsis: false,
        shouldRenderRightEllipsis: true,
      });

      expect(getPageNumbers(7, 10)).toStrictEqual({
        pages: [6, 7, 8],
        shouldRenderFirstPage: false,
        shouldRenderLastPage: true,
        shouldRenderLeftEllipsis: false,
        shouldRenderRightEllipsis: true,
      });
    });
  });

  describe('When the current page is on the last two pages ', () => {
    it('should return the last three pages an ellipsis to the left and the first page', () => {
      expect(getPageNumbers(9, 10)).toStrictEqual({
        pages: [8, 9, 10],
        shouldRenderFirstPage: true,
        shouldRenderLastPage: false,
        shouldRenderLeftEllipsis: true,
        shouldRenderRightEllipsis: false,
      });

      expect(getPageNumbers(10, 10)).toStrictEqual({
        pages: [8, 9, 10],
        shouldRenderFirstPage: true,
        shouldRenderLastPage: false,
        shouldRenderLeftEllipsis: true,
        shouldRenderRightEllipsis: false,
      });
    });
  });
});
