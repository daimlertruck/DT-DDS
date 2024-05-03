import { Meta, StoryObj } from '@storybook/react';

import { LabelField, LabelFieldProps } from './LabelField';

const meta: Meta<LabelFieldProps> = {
  title: 'Data Display/LabelField',
  component: LabelField,
  argTypes: {},
  render: ({ children, ...props }) => (
    <LabelField {...props}>{children}</LabelField>
  ),
};

export default meta;

export const Default: StoryObj<LabelFieldProps> = {
  args: {
    children: 'My Label',
    isActive: false,
    isDisabled: false,
    isRequired: false,
    hasError: false,
  },
};
