import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Box } from '@dt-dds/react-box';
import { Button } from '@dt-dds/react-button';

import { AccordionProps, Background } from './Accordion';

import { Accordion } from '.';

const BACKGROUNDS: Background[] = ['transparent', 'light', 'contrast'];

const meta: Meta<AccordionProps> = {
  component: Accordion,
  title: 'Data Display/Accordion',
  argTypes: {
    background: {
      options: BACKGROUNDS,
      control: { type: 'select' },
    },
  },
};

export default meta;

export const Uncontrolled: StoryObj<AccordionProps> = {
  args: {
    defaultIsOpen: false,
    background: 'transparent',
    hasBorderBottom: false,
    isDisabled: false,
    headerContent: 'Header content here.',
    children: 'Body content',
  },
};

const ControlledAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ gap: '1rem', alignItems: 'flex-start' }}>
      <Button type='button' onClick={() => setIsOpen((prev) => !prev)}>
        Toggle accordion externally
      </Button>
      <Accordion
        isOpen={isOpen}
        onToggle={setIsOpen}
        headerContent='Controlled accordion'
      >
        Body content
      </Accordion>
    </Box>
  );
};

export const Controlled: StoryObj<AccordionProps> = {
  render: () => <ControlledAccordion />,
};
