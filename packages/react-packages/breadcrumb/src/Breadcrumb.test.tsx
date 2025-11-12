import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Breadcrumb } from './Breadcrumb';
import { ViewAgendaIcon } from '../../../dt-dds-react/core';

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
