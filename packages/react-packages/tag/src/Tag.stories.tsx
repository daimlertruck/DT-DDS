import { Tag, TagProps } from './Tag';

import type { Meta, StoryObj } from '@storybook/react-vite';

const TagVariantOptions = {
  Solid: 'solid',
  Outlined: 'outlined',
};

const TagBorderOptions = {
  Rounded: 'rounded',
  Squared: 'squared',
};

const TagSizeOptions = {
  Small: 'small',
  Medium: 'medium',
};

const TooltipBackground = {
  Opacity: 'opacity',
  Full: 'full',
};

const TagColorOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  Informative: 'informative',
  Warning: 'warning',
  Success: 'success',
  Error: 'error',
};

const meta: Meta<TagProps> = {
  component: Tag,
  title: 'Data Display/Tag',
  argTypes: {
    onClick: {
      options: [true, undefined],
      control: {
        type: 'radio',
        labels: {
          true: 'Has onClick',
          undefined: 'Does not have onClick',
        },
      },
    },
    onClose: {
      options: [true, undefined],
      control: {
        type: 'radio',
        labels: {
          true: 'Has onClose',
          undefined: 'Does not have onClose',
        },
      },
    },
    variant: {
      options: Object.values(TagVariantOptions),
      control: { type: 'radio' },
    },
    border: {
      options: Object.values(TagBorderOptions),
      control: { type: 'radio' },
    },
    size: {
      options: Object.values(TagSizeOptions),
      control: { type: 'radio' },
    },
    color: {
      options: Object.values(TagColorOptions),
      control: { type: 'select' },
    },
    tooltipVariant: {
      options: Object.values(TooltipBackground),
      control: { type: 'radio' },
    },
  },
  render: ({ onClick, onClose, ...props }) => (
    <Tag
      {...props}
      {...(onClick &&
        ({
          onClick: () => console.log('clicked'),
        } as unknown as TagProps['onClick']))}
      {...(onClose &&
        ({
          onClose: () => console.log('closed'),
        } as unknown as TagProps['onClose']))}
    >
      {props.children}
    </Tag>
  ),
};

export default meta;

export const Default: StoryObj<TagProps> = {
  args: {
    children: 'tag label',
    variant: 'solid',
    size: 'small',
    color: 'primary',
    border: 'squared',
    tooltipVariant: 'opacity',
    isClickable: false,
    isDisabled: false,
    onClick: undefined,
    onClose: undefined,
  },
};
