import { useMemo, useCallback } from 'react';

import { Select } from '@dt-dds/react-select';

import { PaginationNavButton } from './components';
import { FIRST_PAGE, ITEMS_PER_PAGE_OPTIONS } from './constants';
import {
  PaginationStyled,
  PaginationPageButtonStyled,
  TruncationTextStyled,
  ItemsInfoTextStyled,
  ItemsPerPageWrapperStyled,
  InfoWrapperStyled,
  NavigationWrapperStyled,
} from './Pagination.styled';
import { PaginationProps } from './types';
import { getPageNumbers } from './utils';

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
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const isFirstPage = currentPage === FIRST_PAGE;
  const isLastPage = currentPage === totalPages;

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
        page !== currentPage && page >= FIRST_PAGE && page <= totalPages;

      if (canNavigateToPage) {
        onPageChange(page);
      }
    },
    [currentPage, totalPages, onPageChange]
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

        {pageNumbers.map((page) => {
          if (page === 'ellipsis') {
            return (
              <TruncationTextStyled
                data-testid='pagination-ellipsis'
                key={`ellipsis-${page}`}
              >
                ...
              </TruncationTextStyled>
            );
          }

          return (
            <PaginationPageButtonStyled
              $isActive={page === currentPage}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
              data-testid={`pagination-page-${page}`}
              key={page}
              onClick={() => handlePageChange(page as number)}
              title={`Go to page ${page}`}
            >
              {page}
            </PaginationPageButtonStyled>
          );
        })}

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
