import { createRef, useState, useRef } from 'react';

import { Dropdown } from '.';

import type { Meta, StoryObj } from '@storybook/react';

type Option = { text: string; value: string; disabled?: boolean };

const OPTIONS: Option[] = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3 with a large text message label', value: '3' },
  { text: 'Option 4', value: '4', disabled: true },
];

const meta = {
  title: 'Data Display/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      options: ['bottom', 'top', 'right', 'left'],
      control: { type: 'select' },
    },
    matchWidth: {
      control: { type: 'boolean' },
    },
    offsetX: {
      control: { type: 'number' },
    },
    offsetY: {
      control: { type: 'number' },
    },
    isFocusable: {
      control: { type: 'boolean' },
    },
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLButtonElement | null>(null);

    return (
      <div style={{ height: 200, padding: 16 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
          style={{ marginBottom: 12 }}
          type='button'
        >
          {isOpen ? 'Close' : 'Open'} dropdown
        </button>
        <Dropdown
          {...args}
          anchorRef={ref}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {OPTIONS.map((option) => (
            <Dropdown.Option
              isDisabled={option.disabled}
              key={option.value}
              onClick={() => console.log(`${option.text} clicked`)}
            >
              {option.text}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </div>
    );
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false,
  },
};
