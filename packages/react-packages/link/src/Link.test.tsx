import { withProviders } from '@dt-dds/react-core';
import { render } from '@testing-library/react';

import { Link } from '.';

describe('<Link /> component', () => {
  const ProvidedLink = withProviders(Link);

  it('should render a html link element with the correct title', () => {
    const { container } = render(
      <ProvidedLink href='/'>Redirect To</ProvidedLink>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render a disabled html link element', () => {
    const { container } = render(
      <ProvidedLink href='/' isDisabled>
        Redirect To
      </ProvidedLink>
    );

    expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed');
  });

  it('should render an html link element as secondary', () => {
    const { container } = render(
      <ProvidedLink color='secondary' href='/'>
        Redirect To
      </ProvidedLink>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render an html link element with Icon', () => {
    const { getByTestId } = render(
      <ProvidedLink href='/' icon='10k'>
        Redirect To
      </ProvidedLink>
    );

    expect(getByTestId('icon')).toHaveTextContent('10k');
  });

  it('Should render an html link element as inline', () => {
    const { container } = render(
      <ProvidedLink href='/' icon='10k' variant='inline'>
        Redirect To
      </ProvidedLink>
    );

    expect(container.firstChild).toHaveStyleRule(
      'text-decoration',
      'underline'
    );
  });
});
