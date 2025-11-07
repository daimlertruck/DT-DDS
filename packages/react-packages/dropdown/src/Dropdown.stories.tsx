import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useRef, useState } from 'react';

import { Dropdown } from '.';

type Option = { text: string; value: string; disabled?: boolean };

const OPTIONS: Option[] = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3 with a large text message label', value: '3' },
  { text: 'Option 4', value: '4', disabled: true },
];

type CustomDropdownProps = Omit<
  ComponentProps<typeof Dropdown>,
  'isOpen' | 'anchorRef' | 'onClose' | 'children'
> & {
  options: Option[];
};

const meta: Meta<CustomDropdownProps> = {
  title: 'Data Display/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      options: ['bottom', 'top', 'right', 'left'],
      control: { type: 'select' },
    },
    as: {
      options: ['div', 'ul'],
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
  },
  render: ({
    options,
    as = 'ul',
    matchWidth = true,
    offsetX,
    offsetY,
    ...rest
  }) => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    return (
      <div style={{ height: 320, padding: 16 }}>
        <button
          onClick={() => setOpen((v) => !v)}
          ref={anchorRef}
          style={{ marginBottom: 12 }}
          type='button'
        >
          {open ? 'Close' : 'Open'} dropdown
        </button>

        <Dropdown
          {...rest}
          anchorRef={anchorRef}
          as={as}
          isOpen={open}
          matchWidth={matchWidth}
          offsetX={offsetX}
          offsetY={offsetY}
          onClose={() => setOpen(false)}
        >
          {options.map((option) => (
            <Dropdown.Option isDisabled={option.disabled} key={option.value}>
              {option.text ?? option.value}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </div>
    );
  },
};

export default meta;

export const Default: StoryObj<CustomDropdownProps> = {
  args: {
    options: OPTIONS,
    as: 'ul',
    matchWidth: true,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
  },
};
