import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import { AvatarType } from './constants';
import avatarExampleImage from './images/example-avatar-image.png';

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
