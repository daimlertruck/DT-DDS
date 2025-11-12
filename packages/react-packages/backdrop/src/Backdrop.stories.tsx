import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { Portal } from '@dt-dds/react-core';

import { Backdrop, BackdropProps } from './Backdrop';
import { BackdropType } from './constants';

const Template: StoryFn<typeof Backdrop> = ({ ...props }) => {
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
