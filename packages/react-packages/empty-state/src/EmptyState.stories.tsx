import { Button } from '@dt-dds/react-button';
import { Link } from '@dt-dds/react-link';

import { NoDataIcon } from '../../../dt-dds-react/core';

import { EmptyState, EmptyStateContentProps } from '.';

import type { Meta, StoryObj } from '@storybook/react';

type EmptyStateProps = EmptyStateContentProps & { addActionButton?: boolean };

const meta: Meta<EmptyStateProps> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  argTypes: {
    addActionButton: {
      control: { type: 'boolean' },
      summary: { defaultValue: false },
      description: 'Add action button to empty state',
    },
  },
  render: ({ title, description, addActionButton }) => (
    <EmptyState>
      {addActionButton ? (
        <Button onClick={() => {}} variant='solid'>
          Action
        </Button>
      ) : null}
      <EmptyState.Content description={description} title={title} />
      {addActionButton ? (
        <Button onClick={() => {}} variant='solid'>
          Action
        </Button>
      ) : null}
    </EmptyState>
  ),
};

export default meta;

export const Default: StoryObj<EmptyStateProps> = {
  args: {
    title: 'Title here',
    description: 'Some description here.',
    addActionButton: false,
  },
};

export const EmptyStateWithImageAndCustomDescription: StoryObj<EmptyStateProps> =
  {
    args: {
      title: 'Title here',
      description: (
        <>
          This is a custom description with a{' '}
          <Link href='/' rel='noopener' target='_blank'>
            link
          </Link>
          .
        </>
      ),
    },
    render: ({ title, description }) => (
      <EmptyState>
        <NoDataIcon />
        <EmptyState.Content description={description} title={title} />
      </EmptyState>
    ),
  };
