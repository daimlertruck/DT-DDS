import { FIRST_PAGE } from '../constants';

interface PageRenderData {
  shouldRenderFirstPage: boolean;
  shouldRenderLastPage: boolean;
  shouldRenderLeftEllipsis: boolean;
  shouldRenderRightEllipsis: boolean;
  pages: number[];
}

export const getPageNumbers = (
  currentPage: number,
  lastPage: number
): PageRenderData => {
  const firstPage = FIRST_PAGE;
  let shouldRenderFirstPage: boolean;
  let shouldRenderLastPage: boolean;
  let shouldRenderLeftEllipsis: boolean;
  let shouldRenderRightEllipsis: boolean;
  const cursor = Math.min(currentPage, lastPage);
  let pages = [cursor - 1, cursor, cursor + 1];

  if (pages.includes(firstPage)) {
    pages = [firstPage, firstPage + 1, firstPage + 2];
    shouldRenderFirstPage = false;
    shouldRenderLastPage = true;
    shouldRenderLeftEllipsis = false;
    shouldRenderRightEllipsis = lastPage > 4;
  } else if (pages.includes(lastPage - 1)) {
    pages = [lastPage - 2, lastPage - 1, lastPage];
    shouldRenderFirstPage = true;
    shouldRenderLastPage = false;
    shouldRenderLeftEllipsis = true;
    shouldRenderRightEllipsis = false;
  } else {
    shouldRenderFirstPage = false;
    shouldRenderLastPage = true;
    shouldRenderLeftEllipsis = false;
    shouldRenderRightEllipsis = lastPage - pages[2] > 1;
  }

  return {
    pages,
    shouldRenderFirstPage,
    shouldRenderLastPage,
    shouldRenderLeftEllipsis,
    shouldRenderRightEllipsis,
  };
};
