import { SegmentedControl } from './SegmentedControl';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof SegmentedControl>;

const meta: Meta<typeof SegmentedControl> = {
  title: 'Data Display/SegmentedControl',
  component: SegmentedControl,
  argTypes: {},
  render: (props) => (
    <SegmentedControl {...props}>
      <SegmentedControl.Option iconCode='list' label='List' value='list' />
      <SegmentedControl.Option
        iconCode='grid_view'
        label='Gallery'
        value='gallery'
      />
      <SegmentedControl.Option
        iconCode='view_column'
        label='Columns'
        value='columns'
      />
      <SegmentedControl.Option
        disabled
        iconCode='table_rows'
        label='Rows'
        value='rows'
      />
      <SegmentedControl.Option label='Diagram' value='diagram' />
    </SegmentedControl>
  ),
};

export default meta;

export const Default: Story = {
  argTypes: {
    selectedValue: {
      options: ['none', 'list', 'gallery', 'columns', 'rows', 'diagram'],
      control: { type: 'select' },
    },
  },
  args: {
    showLabel: false,
    selectedValue: 'none',
    onChangeControl: (value: string) => console.log('value changed to', value),
  },
};
