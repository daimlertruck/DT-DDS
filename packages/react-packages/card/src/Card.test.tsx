import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Card } from './Card';

describe('<Card /> component', () => {
  const ProvidedCard = withProviders(Card);
  it('renders div html element with the correct items', () => {
    const { container } = render(
      <ProvidedCard>
        <Card.Title>Card Title</Card.Title>
        <Card.Detail>Card Description</Card.Detail>
      </ProvidedCard>
    );

    expect(container).toMatchSnapshot();
  });
});
