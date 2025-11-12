import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Data Display/Checkbox',
  component: Checkbox,
  argTypes: {},
};

export default meta;

export const Default: Story = {
  args: {
    isDisabled: false,
    isChecked: false,
    children: 'Label',
    onChange: () => null,
  },
};
