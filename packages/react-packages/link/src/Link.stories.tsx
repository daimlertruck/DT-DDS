import { codes } from '@dt-dds/icons';

import { Link, LinkProps } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const TEXT_SIZES = ['small', 'medium', 'large'];

const meta: Meta<LinkProps> = {
  component: Link,
  title: 'Data Display/Link',
  argTypes: {
    children: { control: 'text' },
    target: { control: 'text' },
    href: { control: 'text' },
    size: {
      options: TEXT_SIZES,
      control: { type: 'select' },
      description: 'Sets the size of text',
    },
    isDisabled: {
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      description: 'Sets the link disabled',
    },
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      description: 'Sets the link color',
    },
    fontWeight: {
      options: ['regular', 'bold'],
      control: { type: 'select' },
      description: 'Sets the font weight',
    },
    variant: {
      options: ['standalone', 'inline'],
      control: { type: 'select' },
      description: 'Sets the link variant',
    },
    icon: {
      options: Object.keys(codes),
      control: { type: 'select' },
      description: 'Adds an Icon to the link',
    },
  },
  render: ({ ...props }) => {
    return <Link {...props} />;
  },
};

export default meta;

export const Default: StoryObj<LinkProps> = {
  args: {
    children: 'Redirect to',
    href: 'https://www.google.com/',

    size: 'medium',
    isDisabled: false,
    color: 'primary',
    variant: 'standalone',
  },
};

export const Inline: StoryObj<LinkProps> = {
  args: {
    children: 'link example',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    fontWeight: 'regular',
    variant: 'inline',
  },
};

export const Standalone: StoryObj<LinkProps> = {
  args: {
    children: 'Link',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    fontWeight: 'bold',
    variant: 'standalone',
    icon: 'arrow_forward',
  },
};
