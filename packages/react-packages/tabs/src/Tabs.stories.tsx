import { Meta, StoryFn } from '@storybook/react-vite';

import { Icon } from '@dt-dds/react-icon';

import { useTabs } from './hooks';
import { Tabs, TabsProps } from './Tabs';

type TabsStoryProps = TabsProps & {
  firstTabLabel: string;
};

const Template: StoryFn<TabsStoryProps> = ({ firstTabLabel, variant }) => {
  const { activeTab, handleChange } = useTabs(0);

  return (
    <Tabs activeTab={activeTab} handleChange={handleChange} variant={variant}>
      <Tabs.Item
        icon={<Icon code='menu' color='inherit' />}
        label={firstTabLabel}
      />
      <Tabs.Item label='Tab 2' />
      <Tabs.Item label='Tab 3' />
      <Tabs.Item isDisabled label='Tab 4' />
      <Tabs.Item label='Tab 5' />
      <Tabs.Item label='Tab 6' />
      <Tabs.Item label='Tab 7' />
    </Tabs>
  );
};

export const Default = {
  args: {
    firstTabLabel: 'Tab 1',
    variant: 'default',
  },
};

const meta: Meta<TabsStoryProps> = {
  title: 'Data Display/Tabs',
  component: Tabs,
  render: Template,
  parameters: {
    backgrounds: { default: 'light' },
  },
  argTypes: {
    variant: {
      options: ['default', 'contained'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
