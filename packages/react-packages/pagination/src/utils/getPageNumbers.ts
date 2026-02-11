import { FIRST_PAGE } from '../constants';

interface PageRenderData {
  shouldRenderFirstPage: boolean;
  shouldRenderLastPage: boolean;
  shouldRenderLeftEllipsis: boolean;
  shouldRenderRightEllipsis: boolean;
  pages: number[];
}

type PaginationDirection = 'FORWARD' | 'BACKWARD';

const getCompactPageNumbers = (
  firstPage: number,
  lastPage: number
): PageRenderData => ({
  pages: Array.from(
    { length: Math.max(lastPage - firstPage + 1, 0) },
    (_, index) => firstPage + index
  ),
  shouldRenderFirstPage: false,
  shouldRenderLastPage: false,
  shouldRenderLeftEllipsis: false,
  shouldRenderRightEllipsis: false,
});

const getForwardPageNumbers = (
  currentPage: number,
  firstPage: number,
  lastPage: number
): PageRenderData => {
  if (currentPage <= firstPage + 1) {
    return {
      pages: [firstPage, firstPage + 1, firstPage + 2],
      shouldRenderFirstPage: false,
      shouldRenderLastPage: true,
      shouldRenderLeftEllipsis: false,
      shouldRenderRightEllipsis: true,
    };
  }

  if (currentPage <= lastPage - 3) {
    return {
      pages: [currentPage - 1, currentPage, currentPage + 1],
      shouldRenderFirstPage: false,
      shouldRenderLastPage: true,
      shouldRenderLeftEllipsis: false,
      shouldRenderRightEllipsis: true,
    };
  }

  return {
    pages: [lastPage - 2, lastPage - 1, lastPage],
    shouldRenderFirstPage: true,
    shouldRenderLastPage: false,
    shouldRenderLeftEllipsis: true,
    shouldRenderRightEllipsis: false,
  };
};

const getBackwardPageNumbers = (
  currentPage: number,
  firstPage: number,
  lastPage: number
): PageRenderData => {
  if (currentPage <= firstPage + 2) {
    return {
      pages: [firstPage, firstPage + 1, firstPage + 2],
      shouldRenderFirstPage: false,
      shouldRenderLastPage: true,
      shouldRenderLeftEllipsis: false,
      shouldRenderRightEllipsis: true,
    };
  }

  if (currentPage >= lastPage - 1) {
    return {
      pages: [lastPage - 2, lastPage - 1, lastPage],
      shouldRenderFirstPage: true,
      shouldRenderLastPage: false,
      shouldRenderLeftEllipsis: true,
      shouldRenderRightEllipsis: false,
    };
  }

  return {
    pages: [currentPage - 1, currentPage, currentPage + 1],
    shouldRenderFirstPage: true,
    shouldRenderLastPage: false,
    shouldRenderLeftEllipsis: true,
    shouldRenderRightEllipsis: false,
  };
};

export const getPageNumbers = (
  currentPage: number,
  lastPage: number,
  direction: PaginationDirection = 'FORWARD'
): PageRenderData => {
  const firstPage = FIRST_PAGE;
  const cursor = Math.max(Math.min(currentPage, lastPage), firstPage);

  if (lastPage <= firstPage + 4) {
    return getCompactPageNumbers(firstPage, lastPage);
  }

  if (direction === 'BACKWARD') {
    return getBackwardPageNumbers(cursor, firstPage, lastPage);
  } else {
    return getForwardPageNumbers(cursor, firstPage, lastPage);
  }
};
