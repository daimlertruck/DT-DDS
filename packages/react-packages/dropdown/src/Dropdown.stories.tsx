import { createRef, useState, useRef } from 'react';

import { useTheme } from '@emotion/react';

import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

import { Dropdown, DropdownProps } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

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

const ICON_OPTIONS: Option[] = [
  {
    text: 'Very long text that should be truncated with ellipsis but extends beyond the intended width',
    value: '1',
  },
  { text: 'My profile', value: '2' },
];

// A component (not an inline render function) so that useTheme runs
// inside the Provider that the theme decorator renders.
const WithIconAndEllipsisDemo = (args: DropdownProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: 200,
        padding: theme.spacing.spacing_30,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
        style={{ width: 160 }}
        type='button'
      >
        {isOpen ? 'Close' : 'Open'} dropdown
      </button>
      {/* Mounted on open, so the menu appears after the first layout effect. */}
      {isOpen && (
        <Dropdown
          {...args}
          anchorRef={ref}
          isOpen
          onClose={() => setIsOpen(false)}
        >
          {ICON_OPTIONS.map((option) => (
            <Dropdown.Option
              key={option.value}
              onClick={() => console.log(`${option.text} clicked`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.spacing_30,
              }}
            >
              <Icon code='user_attributes' size='medium' />
              <Typography
                fontStyles='bodyMdRegular'
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {option.text}
              </Typography>
            </Dropdown.Option>
          ))}
        </Dropdown>
      )}
    </div>
  );
};

const withIconAndEllipsisCode = `
import { useRef, useState } from 'react';

import { useTheme } from '@emotion/react';

import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

const App = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} ref={ref} type='button'>
        {isOpen ? 'Close' : 'Open'} dropdown
      </button>
      {isOpen && (
        <Dropdown
          anchorRef={ref}
          as='ul'
          isFocusable={false}
          isOpen
          matchWidth={false}
          onClose={() => setIsOpen(false)}
        >
          <Dropdown.Option
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.spacing_30,
            }}
          >
            <Icon code='user_attributes' size='medium' />
            <Typography
              fontStyles='bodyMdRegular'
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Very long text that should be truncated with ellipsis
            </Typography>
          </Dropdown.Option>
        </Dropdown>
      )}
    </>
  );
};
`;

export const WithIconAndEllipsis: Story = {
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false,
  },
  parameters: {
    docs: {
      source: {
        code: withIconAndEllipsisCode,
        language: 'tsx',
      },
    },
  },
  render: (args) => <WithIconAndEllipsisDemo {...args} />,
};
