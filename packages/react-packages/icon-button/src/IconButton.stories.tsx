import { Icon } from '@dt-dds/react-icon';
import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';

import { IconButton, IconButtonProps } from './IconButton';
import { MockAvatar } from './mocks/MockAvatar';

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

export const WithAvatarIntegration: StoryObj<IconButtonProps> = {
  render: (props) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton {...props} ariaLabel='Letter Avatar'>
        <MockAvatar text='JD' type='letter' />
      </IconButton>

      <IconButton {...props} ariaLabel='Thumbnail Avatar'>
        <MockAvatar type='thumbnail' />
      </IconButton>

      <IconButton {...props} ariaLabel='Collapsed Avatar'>
        <MockAvatar text='+1' type='collapsed' />
      </IconButton>
    </div>
  ),
  args: {
    variant: 'default',
    size: 'large',
    isDisabled: false,
  },
};

const avatarHoverOverride = css`
  &:hover:not(:disabled) {
    [data-avatar-type='letter'] {
      background-color: #a020f0;
    }
  }
`;

export const WithCustomAvatarHover: StoryObj<IconButtonProps> = {
  render: (props) => {
    return (
      <div style={{ padding: '24px', backgroundColor: 'white' }}>
        <IconButton {...props} ariaLabel='Avatar with custom hover'>
          <MockAvatar text='AB' type='letter' />
        </IconButton>
      </div>
    );
  },
  args: {
    onClick: () => console.log('Custom Hover Clicked'),
    variant: 'default',
    size: 'large',
    cssOverrides: avatarHoverOverride,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates using `cssOverrides` to change the background color of the nested Avatar component upon hover. The default primary.dark color is overridden with a custom purple.',
      },
    },
  },
};
