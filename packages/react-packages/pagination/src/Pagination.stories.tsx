import { useState, useEffect } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { Pagination } from './Pagination';
import { PaginationProps } from './types';

import type { Meta, StoryObj } from '@storybook/react';

type PaginationStoryProps = PaginationProps & BaseProps;

const PaginationWrapper = (props: PaginationStoryProps) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [itemsPerPage, setItemsPerPage] = useState(props.itemsPerPage);

  useEffect(() => {
    setItemsPerPage(props.itemsPerPage);
  }, [props.itemsPerPage]);

  return (
    <div style={{ padding: '40px', width: '100%' }}>
      <Pagination
        {...props}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
          props.onItemsPerPageChange?.(val);
        }}
        onPageChange={(val) => {
          setCurrentPage(val);
          props.onPageChange?.(val);
        }}
      />
    </div>
  );
};

const meta: Meta<PaginationStoryProps> = {
  title: 'Data Display/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      source: {
        code: `
          const [currentPage, setCurrentPage] = useState(1);
          const [itemsPerPage, setItemsPerPage] = useState(10);

          return (
            <Pagination
              totalPages={10}
              totalItems={100}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onItemsPerPageChange={(items) => {
                setItemsPerPage(items);
                setCurrentPage(1);
              }}
            />
          );`,
        language: 'tsx',
      },
    },
  },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
    },
    totalItems: {
      control: { type: 'number', min: 0, max: 1000 },
    },
    itemsPerPage: {
      control: { type: 'number', min: 1, max: 100 },
    },
    showItemsPerPage: {
      control: 'boolean',
    },
    showItemsInfo: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<PaginationStoryProps>;

export const Default: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false,
  },
};

export const WithItemsPerPage: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100],
  },
};

export const FewPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false,
  },
};
