import { useState } from 'react';

import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Portal } from '@dt-dds/react-core';

import { Backdrop, BackdropProps } from './Backdrop';
import { BackdropType } from './constants';

type Story = StoryObj<BackdropProps>;

const Template: StoryFn<typeof Backdrop> = ({ ...props }: BackdropProps) => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const toggleBackdrop = () => setIsBackdropOpen(!isBackdropOpen);

  return (
    <>
      <button onClick={toggleBackdrop} type='button'>
        Open Backdrop
      </button>
      <Portal isOpen={isBackdropOpen}>
        <Backdrop {...props} isOpen={isBackdropOpen}>
          <>{props.children}</>
          <button onClick={toggleBackdrop} type='button'>
            Close Backdrop
          </button>
        </Backdrop>
      </Portal>
    </>
  );
};

export const Default = {
  args: {
    isOpen: false,
    type: BackdropType.Dark,
    children: <div>Example content.</div>,
  },
};

export const Open: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open Backdrop' })
    );
    await expect(
      await page.findByRole('button', { name: 'Close Backdrop' })
    ).toBeVisible();
  },
};

const meta: Meta<BackdropProps> = {
  title: 'Data Display/Backdrop',
  component: Backdrop,
  render: Template,
  argTypes: {
    type: {
      mapping: BackdropType,
      options: Object.values(BackdropType).filter((x) => typeof x === 'string'),
      control: { type: 'inline-radio' },
    },
    children: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
