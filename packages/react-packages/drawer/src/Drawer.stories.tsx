import { ReactNode, useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Code, codes } from '@dt-dds/icons';
import { Portal } from '@dt-dds/react-core';

import { DrawerProps } from './Drawer';

import { Drawer } from '.';

interface DrawerStoryProps extends DrawerProps {
  body: ReactNode;
  title: string;
  icon?: Code;
}

const Template: StoryFn<DrawerStoryProps> = ({
  body,
  title,
  icon,
  ...props
}: DrawerStoryProps) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerVisible((prevState) => !prevState);
  };
  return (
    <>
      <button onClick={toggleDrawer} type='button'>
        Open Drawer
      </button>
      <Portal isOpen={isDrawerVisible}>
        <Drawer
          {...props}
          isVisible={isDrawerVisible}
          setIsVisible={setIsDrawerVisible}
        >
          <Drawer.Header>
            <Drawer.Title icon={icon} title={title} />
          </Drawer.Header>
          <Drawer.Body>
            <div>{body}</div>
          </Drawer.Body>
        </Drawer>
      </Portal>
    </>
  );
};
export const Default = {
  args: {
    body: 'This is the body of the drawer.',
    title: 'Drawer title',
    icon: null,
  },
};
const meta: Meta<DrawerStoryProps> = {
  title: 'Data Display/Drawer',
  component: Drawer,
  argTypes: {
    icon: {
      options: Object.keys(codes),
      control: { type: 'select' },
    },
  },
  render: Template,
};

export default meta;
