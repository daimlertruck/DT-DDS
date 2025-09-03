import { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './Avatar';
import { AvatarType, AvatarSize } from './constants';
import avatarExampleImage from './images/example-avatar-image.png';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  argTypes: {
    type: {
      mapping: AvatarType,
      options: Object.values(AvatarType).filter((x) => typeof x === 'string'),
      control: { type: 'inline-radio' },
    },
    size: {
      mapping: AvatarSize,
      options: Object.values(AvatarSize).filter((x) => typeof x === 'string'),
      control: { type: 'inline-radio' },
    },
    hasTooltip: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    customInitials: '',
    title: 'User Name',
    type: AvatarType.Primary,
    size: AvatarSize.Medium,
    hasTooltip: true,
  },
};

export const WithProfileImage: StoryObj<typeof Avatar> = {
  args: {
    title: 'User Name',
    type: AvatarType.Profile,
    size: AvatarSize.Large,
    imageSrc: avatarExampleImage,
    hasTooltip: true,
  },
};
