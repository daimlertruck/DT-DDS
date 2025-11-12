import { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '@dt-dds/react-icon';

import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';

const breadcrumbs = [
  { name: 'Name 1', showIcon: true },
  {
    name: 'Second page has a long text to describe its path',
  },
  { name: 'Name 3' },
  {
    name: 'Last page has a long text to describe its path',
  },
];

const meta: Meta<BreadcrumbProps> = {
  title: 'Data Display/Breadcrumb',
  component: Breadcrumb,
  render: ({ separator }) => {
    return (
      <Breadcrumb separator={separator}>
        {breadcrumbs.map((breadcrumb) => (
          <Breadcrumb.Item key={breadcrumb.name}>
            {breadcrumb.showIcon ? (
              <Icon code='view_agenda' color='primary' />
            ) : null}
            <a href='/'>{breadcrumb.name}</a>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  },
  argTypes: {
    separator: {
      options: ['slash', 'arrow'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const Default: StoryObj<BreadcrumbProps> = {
  args: {
    separator: 'slash',
  },
};
