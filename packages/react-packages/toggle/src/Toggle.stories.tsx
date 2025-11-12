import { useState } from 'react';

import { Toggle, ToggleProps } from './Toggle';

import type { Meta, StoryObj } from '@storybook/react-vite';

const ToggleComponent = (props: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  return <Toggle {...props} isChecked={isChecked} onClick={handleClick} />;
};

const meta: Meta<ToggleProps> = {
  title: 'Data Display/Toggle',
  component: Toggle,
  argTypes: {},
  render: ({ ...props }) => <ToggleComponent {...props} />,
};

export default meta;

export const Default: StoryObj<ToggleProps> = {
  args: {
    isDisabled: false,
    label: 'Toggle',
  },
};
