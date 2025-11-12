import React from 'react';

import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Divider } from './Divider';

describe('<Divider /> component', () => {
  const ProvidedDivider = withProviders(Divider);

  it('renders divider component', () => {
    const { container } = render(<ProvidedDivider />);

    expect(container).toMatchSnapshot();
  });
});
