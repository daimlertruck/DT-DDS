import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Data Display/Button',
  component: Button,
};

export default meta;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => null,
    isLoading: false,
    variant: 'solid',
    color: 'primary',
    size: 'medium',
    isDisabled: false,
  },
  argTypes: {
    variant: {
      options: ['solid', 'outlined', 'text'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'secondary', 'error', 'contrast', 'accent'],
      control: { type: 'select' },
    },
    size: {
      options: ['medium', 'large', 'small'],
      control: { type: 'select' },
    },
    isDisabled: {
      control: 'boolean',
    },
  },
};

export const buttonWithDarkBackground: Story = {
  ...Default,
  render: ({ ...props }) => (
    <div
      style={{
        width: '200px',
        height: '100px',
        backgroundColor: '#000000',
        padding: '20px',
      }}
    >
      <Button {...props} />
    </div>
  ),
};
