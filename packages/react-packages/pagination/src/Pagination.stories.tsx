import { BaseProps } from '@dt-dds/react-core';

import { usePagination } from './hooks';
import {
  Pagination,
  PaginationInput,
  PaginationInputProps,
  ContentProps,
} from './Pagination';

import type { Meta, StoryFn } from '@storybook/react-vite';

type PaginationStoryProps = BaseProps & PaginationInputProps & ContentProps;

const Template: StoryFn<PaginationStoryProps> = ({ totalPages }) => {
  const { currentPage, handleChange, handleUserInput } = usePagination();

  return (
    <Pagination>
      <Pagination.PreviousItem
        disabled={currentPage <= 1 || currentPage > totalPages}
        onClick={() => handleChange(currentPage - 1)}
      />
      <PaginationInput
        onChange={handleChange}
        onHandleKeyDown={handleUserInput}
        totalPages={totalPages}
        value={currentPage}
      />
      <Pagination.Content
        onClick={() => handleChange(totalPages)}
        totalPages={totalPages}
      />
      <Pagination.NextItem
        disabled={currentPage >= totalPages || currentPage < 1}
        onClick={() => handleChange(currentPage + 1)}
      />
    </Pagination>
  );
};

const meta: Meta<PaginationStoryProps> = {
  title: 'Data Display/Pagination',
  component: Pagination,
  render: Template,
  argTypes: {},
};

export const Default = {
  args: {
    totalPages: 10,
  },
};

export default meta;
