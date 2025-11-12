import { ProgressBar, ProgressBarProps } from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof ProgressBar>;

const meta: Meta<ProgressBarProps> = {
  title: 'Data Display/ProgressBar',
  component: ProgressBar,
  argTypes: {
    size: {
      options: ['small', 'large'],
      defaultValue: 'small',
      control: { type: 'radio' },
    },
    state: {
      options: ['active', 'success', 'error'],
      defaultValue: 'active',
      control: { type: 'radio' },
    },
    info: {
      options: ['none', 'text', 'icon', 'both'],
      defaultValue: 'none',
      control: { type: 'radio' },
    },
  },
  render: ({ ...props }) => (
    <div style={{ width: '250px' }}>
      <ProgressBar {...props} />
    </div>
  ),
};

export default meta;

export const Default: Story = {
  args: {
    size: 'small',
    state: 'active',
    value: 40,
    label: 'Progress bar label',
    helperText: 'Additional Info',
    info: 'both',
  },
};
