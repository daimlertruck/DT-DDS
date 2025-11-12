import { render } from '@testing-library/react';

import { Button } from '@dt-dds/react-button';
import { withProviders } from '@dt-dds/react-core';

import { EmptyState } from './EmptyState';
import { NoDataIcon } from '../../../dt-dds-react/core';

describe('<EmptyState /> component', () => {
  const ProvidedEmptyState = withProviders(EmptyState);
  const title = 'Title here';
  const description = 'Some description here.';

  it('should render Empty State', () => {
    const { container } = render(
      <ProvidedEmptyState>
        <EmptyState.Content description={description} title={title} />
      </ProvidedEmptyState>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render Empty State with a Button', () => {
    const { getByTestId } = render(
      <ProvidedEmptyState>
        <EmptyState.Content description={description} title={title} />
        <Button dataTestId='action' onClick={() => {}} variant='solid'>
          Button
        </Button>
      </ProvidedEmptyState>
    );

    expect(getByTestId('action-button')).toBeVisible();
  });

  it('should render Empty State with image', () => {
    const { container } = render(
      <ProvidedEmptyState>
        <NoDataIcon />
        <EmptyState.Content description={description} title={title} />
      </ProvidedEmptyState>
    );

    expect(container).toMatchSnapshot();
  });
});
