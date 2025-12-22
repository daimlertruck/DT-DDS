import { useState } from 'react';

import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Data Display/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Size variant of the checkbox',
    },
    isChecked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
  },
  args: {
    size: 'large',
    isDisabled: false,
    isIndeterminate: false,
    hasError: false,
    isChecked: false,
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
  },
  render: (args) => {
    const CheckboxWrapper = () => {
      const [checked, setChecked] = useState(args.isChecked);
      return (
        <Checkbox
          {...args}
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };
    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: `
          const [checked, setChecked] = useState(false);

          return (
            <Checkbox
              label="Checkbox label"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          );`,
        language: 'tsx',
      },
    },
  },
};

export const IndeterminateToggle: Story = {
  render: (args) => {
    const CheckboxWrapper = () => {
      const [indeterminate, setIndeterminate] = useState(true);
      const [checked, setChecked] = useState(false);

      const handleChange = () => {
        if (indeterminate) {
          setIndeterminate(false);
          setChecked(true);
        } else if (checked) {
          setChecked(false);
        } else {
          setIndeterminate(true);
        }
      };

      return (
        <Checkbox
          {...args}
          isChecked={checked}
          isIndeterminate={indeterminate}
          label='Indeterminate → Checked → Unchecked'
          onChange={handleChange}
        />
      );
    };

    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: `
          const [indeterminate, setIndeterminate] = useState(true);
          const [checked, setChecked] = useState(false);

          const handleChange = () => {
            if (indeterminate) {
              setIndeterminate(false);
              setChecked(true);
            } else if (checked) {
              setChecked(false);
            } else {
              setIndeterminate(true);
            }
          };

          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              label="Indeterminate → Checked → Unchecked"
              onChange={handleChange}
            />
          );`,
        language: 'tsx',
      },
    },
  },
};

export const AllSizesAndStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Large</h3>
        <Checkbox isChecked label='Checked' size='large' />
        <Checkbox isChecked={false} label='Unchecked' size='large' />
        <Checkbox isIndeterminate label='Indeterminate' size='large' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='large' />
        <Checkbox
          isChecked={false}
          isDisabled
          label='Unchecked disabled'
          size='large'
        />
        <Checkbox hasError isChecked label='Checked error' size='large' />
        <Checkbox
          hasError
          isChecked={false}
          label='Unchecked error'
          size='large'
        />
        <Checkbox
          hasError
          isIndeterminate
          label='Indeterminate error'
          size='large'
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Small</h3>
        <Checkbox isChecked label='Checked' size='small' />
        <Checkbox isChecked={false} label='Unchecked' size='small' />
        <Checkbox isIndeterminate label='Indeterminate' size='small' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='small' />
        <Checkbox
          isChecked={false}
          isDisabled
          label='Unchecked disabled'
          size='small'
        />
        <Checkbox hasError isChecked label='Checked error' size='small' />
        <Checkbox
          hasError
          isChecked={false}
          label='Unchecked error'
          size='small'
        />
        <Checkbox
          hasError
          isIndeterminate
          label='Indeterminate error'
          size='small'
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Without Labels</h3>
        <Checkbox aria-label='Large checked' isChecked size='large' />
        <Checkbox aria-label='Large unchecked' isChecked={false} size='large' />
        <Checkbox aria-label='Small checked' isChecked size='small' />
        <Checkbox aria-label='Small unchecked' isChecked={false} size='small' />
      </div>
    </div>
  ),
};

export const LongLabelWrapping: Story = {
  render: () => (
    <div
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Checkbox
        isChecked
        label='This is a moderately long checkbox label that wraps in two lines'
      />
      <Checkbox
        isChecked
        label='Small checkbox with a long label that also wraps in two lines'
        size='small'
      />
    </div>
  ),
};
