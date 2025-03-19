import type { Meta, StoryObj } from '@storybook/react';

import { TextArea, TextAreaProps } from './TextArea';

const meta: Meta<TextAreaProps> = {
  title: 'Data Display/TextArea',
  component: TextArea,
  argTypes: {
    onChange: {
      options: [true, undefined],
      control: {
        type: 'radio',
        labels: {
          true: 'Has onChange',
          undefined: 'Does not have onChange',
        },
      },
    },
    maxLength: { control: { type: 'number', min: 1 } },
    variant: {
      options: {
        outlined: 'outlined',
        bottomLine: 'bottomLine',
      },
      control: { type: 'select' },
    },
    backgroundFill: {
      options: {
        default: 'default',
        contrast: 'contrast',
        light: 'light',
      },
      control: { type: 'select' },
    },
  },
  render: ({ onChange, ...props }) => (
    <TextArea
      {...props}
      {...(onChange &&
        ({
          onChange: (data: string) => console.log('data changed: ', data),
        } as unknown as TextAreaProps['onChange']))}
    />
  ),
};

export default meta;

export const Default: StoryObj<TextAreaProps> = {
  args: {
    label: 'Awesome TextArea',
    value: '',
    variant: 'outlined',
    backgroundFill: 'default',
    required: false,
    message: 'Additional info',
    onChange: undefined,
    enableResize: false,
    hasError: false,
    disabled: false,
  },
};
