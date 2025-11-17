import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';
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
      options: ['outlined', 'bottomLine'],
      control: { type: 'select' },
    },
    backgroundFill: {
      options: ['default', 'contrast', 'light'],
      control: { type: 'select' },
    },
    labelVariant: {
      options: ['default', 'floating'],
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
    enableResize: true,
    hasError: false,
    disabled: false,
    placeholder: 'this is a placeholder',
    hasLabel: true,
    labelVariant: 'default',
    readOnly: false,
  },
};

export const TestAreaWithLabelIcon: StoryObj<TextAreaProps> = {
  args: {
    label: 'My label',
    labelIcon: (
      <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
    ),
  },
};
