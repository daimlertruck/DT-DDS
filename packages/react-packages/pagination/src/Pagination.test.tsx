import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Pagination } from './Pagination';

const ProvidedPagination = withProviders(Pagination);

describe('<Pagination />', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getRenderedPaginationTokens = () =>
    screen
      .getByTestId('pagination')
      .querySelectorAll(
        '[data-testid="pagination-current-page"], [data-testid^="pagination-page-"], [data-testid="pagination-ellipsis"]'
      );

  const getRenderedPaginationTokenTexts = () =>
    Array.from(getRenderedPaginationTokens()).map(
      (element) => element.textContent?.trim() ?? ''
    );

  it('should match snapshot', () => {
    const { container } = render(<ProvidedPagination {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onPageChange when navigating pages', () => {
    const onPageChange = jest.fn();
    render(
      <ProvidedPagination {...defaultProps} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByTestId('pagination-next-page'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByTestId('pagination-last-page'));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('should disable first/previous buttons on first page', () => {
    render(<ProvidedPagination {...defaultProps} currentPage={1} />);

    expect(screen.getByTestId('pagination-first-page')).toBeDisabled();
    expect(screen.getByTestId('pagination-previous-page')).toBeDisabled();
  });

  it('should disable next/last buttons on last page', () => {
    render(<ProvidedPagination {...defaultProps} currentPage={5} />);

    expect(screen.getByTestId('pagination-next-page')).toBeDisabled();
    expect(screen.getByTestId('pagination-last-page')).toBeDisabled();
  });

  it('should call onPageChange when clicking page number', () => {
    const onPageChange = jest.fn();
    render(
      <ProvidedPagination {...defaultProps} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByTestId('pagination-page-3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should not call onPageChange when clicking current page', () => {
    const onPageChange = jest.fn();
    render(
      <ProvidedPagination
        {...defaultProps}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByTestId('pagination-current-page'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should display items info correctly', () => {
    render(<ProvidedPagination {...defaultProps} showItemsInfo />);

    expect(screen.getByTestId('pagination-items-info')).toHaveTextContent(
      'Showing 10 of 50 entries'
    );
  });

  it('should handle undefined totalItems', () => {
    render(
      <ProvidedPagination
        {...defaultProps}
        showItemsInfo
        totalItems={undefined}
      />
    );

    expect(
      screen.queryByTestId('pagination-items-info')
    ).not.toBeInTheDocument();
  });

  it('should render ellipsis for large page ranges', () => {
    render(<ProvidedPagination {...defaultProps} totalPages={20} />);

    expect(screen.getByTestId('pagination-ellipsis')).toBeVisible();
  });

  it('should render the ascending sequence near the start', () => {
    render(
      <ProvidedPagination {...defaultProps} currentPage={2} totalPages={10} />
    );

    expect(screen.getByTestId('pagination-current-page')).toHaveTextContent(
      '2'
    );
    expect(screen.getAllByTestId('pagination-ellipsis')).toHaveLength(1);
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
  });

  it('should render sliding window pages with one right ellipsis', () => {
    render(
      <ProvidedPagination {...defaultProps} currentPage={5} totalPages={10} />
    );

    expect(getRenderedPaginationTokenTexts()).toEqual([
      '4',
      '5',
      '6',
      '...',
      '10',
    ]);
    expect(getRenderedPaginationTokens()).toHaveLength(5);
  });

  it('should keep right ellipsis for page 7 before switching to last three pages', () => {
    render(
      <ProvidedPagination {...defaultProps} currentPage={7} totalPages={10} />
    );

    expect(getRenderedPaginationTokenTexts()).toEqual([
      '6',
      '7',
      '8',
      '...',
      '10',
    ]);

    expect(getRenderedPaginationTokens()).toHaveLength(5);
  });

  it('should render first page and last three pages near the end', () => {
    render(
      <ProvidedPagination {...defaultProps} currentPage={9} totalPages={10} />
    );

    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '8',
      '9',
      '10',
    ]);
    expect(getRenderedPaginationTokens()).toHaveLength(5);
  });

  it('should follow descending sequence when navigating from last page to first page', () => {
    const { rerender } = render(
      <ProvidedPagination {...defaultProps} currentPage={10} totalPages={10} />
    );

    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '8',
      '9',
      '10',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={9} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '8',
      '9',
      '10',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={8} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '7',
      '8',
      '9',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={7} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '6',
      '7',
      '8',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={6} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '5',
      '6',
      '7',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={5} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '4',
      '5',
      '6',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={4} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '...',
      '3',
      '4',
      '5',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={3} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={2} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);

    rerender(
      <ProvidedPagination {...defaultProps} currentPage={1} totalPages={10} />
    );
    expect(getRenderedPaginationTokenTexts()).toEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
  });

  it('should render aria-label on navigation button', () => {
    render(<ProvidedPagination {...defaultProps} currentPage={2} />);

    const firstPageButton = screen.getByTestId('pagination-first-page');
    expect(firstPageButton).toHaveAttribute('aria-label', 'Go to first page');
  });

  it('should use custom itemsPerPageOptions', () => {
    const customOptions = [5, 15, 25];

    render(
      <ProvidedPagination
        {...defaultProps}
        itemsPerPageOptions={customOptions}
        showItemsPerPage
      />
    );

    customOptions.forEach((option) => {
      expect(screen.getByText(`${option} per page`)).toBeInTheDocument();
    });
  });
});
