import React from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { usePagination } from './hooks';
import { Pagination, PaginationInput } from './Pagination';

describe('<Pagination /> component', () => {
  const totalPages = 3;
  it('should render the pagination content', async () => {
    const currentPage = 1;
    const ProvidedPagination = withProviders(Pagination);
    const onClick = jest.fn();
    const { container } = render(
      <ProvidedPagination>
        <Pagination.PreviousItem disabled onClick={onClick} />
        <PaginationInput
          onChange={onClick}
          onHandleKeyDown={onClick}
          totalPages={totalPages}
          value={currentPage}
        />
        <Pagination.Content onClick={onClick} totalPages={totalPages} />
        <Pagination.NextItem onClick={onClick} />
      </ProvidedPagination>
    );

    expect(container).toMatchSnapshot();
  });

  describe('change page', () => {
    let hook: RenderHookResult<
      {
        currentPage: number;
        handleChange: (value: number) => void;
        handleUserInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
      },
      unknown
    >;
    beforeEach(() => {
      hook = renderHook(() => usePagination());
      const ProvidedPagination = withProviders(Pagination);
      const { result } = hook;

      render(
        <ProvidedPagination>
          <Pagination.PreviousItem
            onClick={() =>
              act(() => {
                result.current.handleChange(result.current.currentPage - 1);
              })
            }
          />
          <PaginationInput
            onChange={(value) => act(() => result.current.handleChange(value))}
            onHandleKeyDown={(e) =>
              act(() => {
                result.current.handleUserInput(e);
              })
            }
            totalPages={totalPages}
            value={result.current.currentPage}
          />
          <Pagination.Content
            onClick={() =>
              act(() => {
                result.current.handleChange(totalPages);
              })
            }
            totalPages={totalPages}
          />
          <Pagination.NextItem
            onClick={() =>
              act(() => {
                result.current.handleChange(result.current.currentPage + 1);
              })
            }
          />
        </ProvidedPagination>
      );
    });

    it('should increase page number when next item is clicked', () => {
      fireEvent.click(screen.getByTestId('pagination-next-item'));
      expect(hook.result.current.currentPage).toEqual(2);
    });

    it('should decrease page number when previous item is clicked', () => {
      act(() =>
        hook.result.current.handleChange(hook.result.current.currentPage + 1)
      );

      fireEvent.click(screen.getByTestId('pagination-previous-item'));
      expect(hook.result.current.currentPage).toEqual(1);
    });

    it('should change to last page when button is clicked', () => {
      fireEvent.click(screen.getByTestId('pagination-last-page'));
      expect(hook.result.current.currentPage).toEqual(3);
    });

    it('should change to page with number inserted on input', async () => {
      fireEvent.change(screen.getByTestId('pagination-input'), {
        target: { value: '2' },
      });
      await waitFor(() => expect(hook.result.current.currentPage).toEqual(2));
    });
  });
});
