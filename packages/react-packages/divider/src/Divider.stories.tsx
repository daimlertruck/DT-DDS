import { Divider } from './Divider';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Divider> = {
  title: 'Data Display/Divider',
  component: Divider,
};

export default meta;

export const Default: StoryObj<typeof Divider> = {
  args: {},
};
