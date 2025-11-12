import { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '@dt-dds/react-icon';

import { IconButton, IconButtonProps } from './IconButton';

const variantOptions = ['contrast', 'default'];

const sizeOptions = ['extra-small', 'small', 'medium', 'large', 'extra-large'];

const meta: Meta<IconButtonProps> = {
  component: IconButton,
  title: 'Data Display/IconButton',
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    variant: {
      options: variantOptions,
      control: { type: 'select' },
    },
    size: {
      options: sizeOptions,
      control: { type: 'select' },
    },
  },
  render: (props) => {
    return (
      <div
        style={{
          backgroundColor: props.variant === 'default' ? 'white' : 'black',
        }}
      >
        <IconButton {...props}>
          <Icon code='edit' />
        </IconButton>
      </div>
    );
  },
};

export default meta;

export const Default: StoryObj<IconButtonProps> = {
  args: {
    onClick: () => null,
    isDisabled: false,
    variant: 'default',
    size: 'large',
  },
};
