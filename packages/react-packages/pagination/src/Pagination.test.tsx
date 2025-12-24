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

    fireEvent.click(screen.getByTestId('pagination-page-2'));
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
