import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Breadcrumb } from './Breadcrumb';

const ViewAgendaIcon = () => {
  return (
    <svg
      fill='none'
      height='17'
      viewBox='0 0 16 17'
      width='16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.6667 9.33329H3.33333C2.6 9.33329 2 9.93329 2 10.6666V13.3333C2 14.0666 2.6 14.6666 3.33333 14.6666H12.6667C13.4 14.6666 14 14.0666 14 13.3333V10.6666C14 9.93329 13.4 9.33329 12.6667 9.33329ZM12.6667 13.3333H3.33333V10.6666H12.6667V13.3333Z'
        fill='currentColor'
      />
      <path
        d='M12.6667 2.66663H3.33333C2.6 2.66663 2 3.26663 2 3.99996V6.66663C2 7.39996 2.6 7.99996 3.33333 7.99996H12.6667C13.4 7.99996 14 7.39996 14 6.66663V3.99996C14 3.26663 13.4 2.66663 12.6667 2.66663ZM12.6667 6.66663H3.33333V3.99996H12.6667V6.66663Z'
        fill='currentColor'
      />
    </svg>
  );
};

describe('<Breadcrumb /> component', () => {
  const ProvidedBreadcrumb = withProviders(Breadcrumb);

  beforeEach(() => {
    jest.mock('@dt-dds/react-core', () => ({
      useMedia: jest.fn(() => true),
    }));
  });

  it('renders nav element with the correct breadcrumb items', () => {
    const breadcrumbs = [
      { name: 'Name 1', showIcon: true },
      {
        name: 'Second page has a long text to describe its path',
      },
      { disabled: true, name: 'Name 3' },
      {
        name: 'Last page has a long text to describe its path',
      },
    ];

    const { container } = render(
      <ProvidedBreadcrumb separator='arrow'>
        {breadcrumbs.map((breadcrumb) => (
          <Breadcrumb.Item key={breadcrumb.name}>
            {breadcrumb.showIcon ? <ViewAgendaIcon /> : null}
            <a href='/'>{breadcrumb.name}</a>
          </Breadcrumb.Item>
        ))}
      </ProvidedBreadcrumb>
    );

    expect(container).toMatchSnapshot();
  });
});
