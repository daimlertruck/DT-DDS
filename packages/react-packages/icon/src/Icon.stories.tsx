import { Meta, StoryObj } from '@storybook/react-vite';

import { codes } from '@dt-dds/icons';

import { fontSize } from './Icon.styled';

import { Icon, IconProps } from '.';

const meta: Meta<IconProps> = {
  title: 'Data Display/Icon',
  component: Icon,
  argTypes: {
    code: {
      options: Object.keys(codes),
      control: { type: 'select' },
    },
    variant: {
      options: ['filled', 'outlined'],
      control: { type: 'radio' },
    },
    size: {
      options: Object.keys(fontSize),
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(color)$/i,
      },
    },
  },
};

export default meta;

export const Default: StoryObj<IconProps> = {
  args: {
    code: 'warning',
    size: 'l',
    variant: 'outlined',
    color: 'black',
  },
};
