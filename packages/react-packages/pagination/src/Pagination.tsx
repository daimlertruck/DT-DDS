import { useCallback, useEffect, useRef } from 'react';

import { Select } from '@dt-dds/react-select';

import { PaginationNavButton } from './components';
import { Buffer } from './components/Buffer/Buffer';
import { FIRST_PAGE, ITEMS_PER_PAGE_OPTIONS } from './constants';
import {
  PaginationStyled,
  PaginationPageButtonStyled,
  ItemsInfoTextStyled,
  ItemsPerPageWrapperStyled,
  InfoWrapperStyled,
  NavigationWrapperStyled,
} from './Pagination.styled';
import { PaginationProps } from './types';
import { getPageNumbers } from './utils';

const renderPage = (
  page: number,
  isCurrentPage: boolean,
  handleClick: (page: number) => void
) => (
  <PaginationPageButtonStyled
    $isActive={isCurrentPage}
    aria-current={isCurrentPage ? 'page' : false}
    aria-label={`Go to page ${page}`}
    data-testid={
      isCurrentPage ? 'pagination-current-page' : `pagination-page-${page}`
    }
    key={page}
    onClick={() => handleClick(page)}
    title={`Go to page ${page}`}
  >
    {page}
  </PaginationPageButtonStyled>
);

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = false,
  showItemsInfo = true,
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS,
  dataTestId,
}: PaginationProps) => {
  const LAST_PAGE = totalPages;
  const previousPageRef = useRef(currentPage);
  const paginationDirection =
    currentPage < previousPageRef.current ? 'BACKWARD' : 'FORWARD';

  useEffect(() => {
    if (currentPage < 2 || currentPage > LAST_PAGE - 1) {
      previousPageRef.current = currentPage;
    }
  }, [currentPage, LAST_PAGE]);

  const isLastPage = currentPage === LAST_PAGE;
  const isFirstPage = currentPage === FIRST_PAGE;
  const {
    pages,
    shouldRenderFirstPage,
    shouldRenderLastPage,
    shouldRenderLeftEllipsis,
    shouldRenderRightEllipsis,
  } = getPageNumbers(currentPage, LAST_PAGE, paginationDirection);
  const itemsBeforeCurrentPage = (currentPage - FIRST_PAGE) * itemsPerPage;
  const remainingItems = Math.max(
    0,
    (totalItems ?? 0) - itemsBeforeCurrentPage
  );

  const shownItems = Math.min(itemsPerPage, remainingItems);

  const hasInfoSection =
    showItemsPerPage || (showItemsInfo && totalItems !== undefined);

  const handlePageChange = useCallback(
    (page: number) => {
      const canNavigateToPage =
        page !== currentPage && page >= FIRST_PAGE && page <= LAST_PAGE;

      if (canNavigateToPage) {
        onPageChange(page);
      }
    },
    [currentPage, LAST_PAGE, onPageChange]
  );

  const handleItemsPerPageChange = useCallback(
    (value: string) => {
      onItemsPerPageChange?.(Number(value));
    },
    [onItemsPerPageChange]
  );

  return (
    <PaginationStyled data-testid={dataTestId ?? 'pagination'}>
      {hasInfoSection ? (
        <InfoWrapperStyled>
          {showItemsPerPage ? (
            <ItemsPerPageWrapperStyled>
              <Select
                dataTestId='pagination-items-per-page'
                fill='contrast'
                isFloatingLabel={false}
                label=''
                onChange={handleItemsPerPageChange}
                placeholder='Items per page'
                scale='compact'
                value={itemsPerPage.toString()}
              >
                {itemsPerPageOptions.map((option, index) => (
                  <Select.Option
                    index={index}
                    key={option}
                    value={option.toString()}
                  >
                    {option} per page
                  </Select.Option>
                ))}
              </Select>
            </ItemsPerPageWrapperStyled>
          ) : null}

          {showItemsInfo && totalItems !== undefined ? (
            <ItemsInfoTextStyled data-testid='pagination-items-info'>
              Showing <strong>{shownItems}</strong> of{' '}
              <strong>{totalItems}</strong> entries
            </ItemsInfoTextStyled>
          ) : null}
        </InfoWrapperStyled>
      ) : null}

      <NavigationWrapperStyled>
        <PaginationNavButton
          ariaLabel='Go to first page'
          icon='first_page'
          isDisabled={isFirstPage}
          onClick={handlePageChange}
          targetPage={FIRST_PAGE}
          testId='pagination-first-page'
          tooltipLabel='First page'
        />

        <PaginationNavButton
          ariaLabel='Go to previous page'
          icon='chevron_left'
          isDisabled={isFirstPage}
          onClick={handlePageChange}
          targetPage={currentPage - 1}
          testId='pagination-previous-page'
          tooltipLabel='Previous page'
        />

        {shouldRenderFirstPage
          ? renderPage(FIRST_PAGE, isFirstPage, handlePageChange)
          : null}

        {shouldRenderLeftEllipsis ? (
          <Buffer
            lowerLimit={FIRST_PAGE}
            onClick={handlePageChange}
            upperLimit={pages[0]}
          />
        ) : null}

        {pages.map((page) =>
          renderPage(page, page === currentPage, handlePageChange)
        )}

        {shouldRenderRightEllipsis ? (
          <Buffer
            lowerLimit={pages[pages.length - 1]}
            onClick={handlePageChange}
            upperLimit={LAST_PAGE}
          />
        ) : null}

        {shouldRenderLastPage
          ? renderPage(LAST_PAGE, isLastPage, handlePageChange)
          : null}

        <PaginationNavButton
          ariaLabel='Go to next page'
          icon='chevron_right'
          isDisabled={isLastPage}
          onClick={handlePageChange}
          targetPage={currentPage + 1}
          testId='pagination-next-page'
          tooltipLabel='Next page'
        />

        <PaginationNavButton
          ariaLabel='Go to last page'
          icon='last_page'
          isDisabled={isLastPage}
          onClick={handlePageChange}
          targetPage={totalPages}
          testId='pagination-last-page'
          tooltipLabel='Last page'
        />
      </NavigationWrapperStyled>
    </PaginationStyled>
  );
};
