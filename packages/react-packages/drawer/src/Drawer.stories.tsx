import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { Portal } from '@dt-dds/react-core';

import { DrawerProps } from './Drawer';

import { Drawer } from '.';

interface DrawerStoryProps extends DrawerProps {
  body: string;
  header: string;
  title: string;
}

const Template: StoryFn<DrawerStoryProps> = ({
  body,
  header,
  title,
  ...props
}) => {
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
            <Drawer.Title title={title} />
            <div>{header}</div>
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
    body: 'Drawer body content here.',
    header: 'Drawer header content here.',
    title: 'Drawer title',
  },
};
const meta: Meta<DrawerStoryProps> = {
  title: 'Data Display/Drawer',
  component: Drawer,
  render: Template,
};

export default meta;
