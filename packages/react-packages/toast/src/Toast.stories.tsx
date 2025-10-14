import { Portal } from '@dt-dds/react-core';
import type { Meta, StoryObj } from '@storybook/react';
import { ToasterProps } from 'react-hot-toast';

import { ToastType } from './constants';
import Toast from './Toast';

import { emitToast, Toaster } from './';

type Story = StoryObj<typeof Toast>;

const meta: Meta<typeof Toast> = {
  title: 'Data Display/Toast',
  component: Toast,
  argTypes: {
    type: {
      mapping: ToastType,
      options: Object.values(ToastType).filter((x) => typeof x === 'string'),
      control: { type: 'inline-radio' },
    },
  },
  render: ({ actions, type, title, message, dismissible, ...props }) => (
    <>
      <button
        onClick={() =>
          emitToast({ type, title, message, dismissible, actions })
        }
        type='button'
      >
        Click me
      </button>
      <Portal isOpen>
        <Toaster {...(props as ToasterProps)} />
      </Portal>
    </>
  ),
};

export default meta;

export const Default: Story = {
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked'),
  },
};

export const WithActions: Story = {
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    actions: [
      {
        onClick: () => console.log('Action 1 clicked'),
        label: 'Action 1',
        tooltip: {
          message: 'View Action 1',
        },
      },
      {
        onClick: () => console.log('Action 2 clicked'),
        label: 'Action 2',
      },
    ],
  },
};
