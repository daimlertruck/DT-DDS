import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import { AvatarType } from './constants';
import avatarExampleImage from './images/example-avatar-image.png';
import { MockIconButton } from './mocks';

const AvatarSizeOptions = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
};

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  argTypes: {
    type: {
      mapping: AvatarType,
      options: Object.values(AvatarType),
      control: { type: 'inline-radio' },
    },
    size: {
      options: Object.values(AvatarSizeOptions),
      control: { type: 'radio' },
    },
    hasTooltip: {
      control: { type: 'boolean' },
    },
    imageSrc: {
      control: 'text',
      description: 'URL of the image to display when type is Photo',
    },
    collapsedCount: {
      control: 'text',
      description:
        'Number to display when type is Collapsed (max 3 characters)',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    customInitials: '',
    title: 'User Name',
    type: AvatarType.Letter,
    size: 'medium',
    hasTooltip: false,
  },
};

export const WithPhoto: StoryObj<typeof Avatar> = {
  args: {
    type: AvatarType.Photo,
    size: 'medium',
    imageSrc: avatarExampleImage,
    hasTooltip: false,
  },
};

export const Collapsed: StoryObj<typeof Avatar> = {
  args: {
    type: AvatarType.Collapsed,
    size: 'medium',
    collapsedCount: '+1',
    hasTooltip: true,
  },
};

export const Thumbnail: StoryObj<typeof Avatar> = {
  args: {
    type: AvatarType.Thumbnail,
    size: 'medium',
    hasTooltip: false,
  },
};

export const WithIconButton: StoryObj<typeof Avatar> = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <MockIconButton ariaLabel='Letter Avatar'>
        <Avatar
          customInitials='JD'
          size='medium'
          title='John Doe'
          type={AvatarType.Letter}
        />
      </MockIconButton>

      <MockIconButton ariaLabel='Photo Avatar'>
        <Avatar
          imageSrc={avatarExampleImage}
          size='medium'
          title='Photo User'
          type={AvatarType.Photo}
        />
      </MockIconButton>

      <MockIconButton ariaLabel='Thumbnail Avatar'>
        <Avatar
          size='medium'
          title='Thumbnail User'
          type={AvatarType.Thumbnail}
        />
      </MockIconButton>

      <MockIconButton ariaLabel='Collapsed Avatar'>
        <Avatar
          collapsedCount='+5'
          size='medium'
          title='More Users'
          type={AvatarType.Collapsed}
        />
      </MockIconButton>
    </div>
  ),
};
