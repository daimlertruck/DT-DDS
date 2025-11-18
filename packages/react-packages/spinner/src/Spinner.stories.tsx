import { Spinner } from './Spinner';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: 'Data Display/Spinner',
  component: Spinner,
  parameters: {
    backgrounds: {
      values: [{ name: 'black', value: '#000' }],
    },
  },
  argTypes: {
    size: {
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large'],
      control: { type: 'select' },
    },
    colorScheme: {
      options: ['positive', 'negative'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    size: 'medium',
    colorScheme: 'positive',
    loadingText: '',
  },
};
