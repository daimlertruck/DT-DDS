import { withProviders } from '@dt-dds/react-core';
import { render } from '@testing-library/react';

import { Typography } from './Typography';

describe('<Typography /> component', () => {
  const ProvidedTypography = withProviders(Typography);

  it('should render a red h1 html element with the given content', () => {
    const { container } = render(
      <ProvidedTypography
        color='red_90'
        dataTestId='typography-h1'
        element='h1'
        fontStyles='h4'
      >
        Some text
      </ProvidedTypography>
    );

    const h1Element = container.querySelector('h1');
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveStyle({ color: 'rgb(109, 0, 0)' });
  });

  it('should render a p html element with the primary color', () => {
    const { container } = render(
      <ProvidedTypography color='primary.default'>Some text</ProvidedTypography>
    );

    const pElement = container.querySelector('p');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });
  });

  it('should use default color when no color is provided', () => {
    const { container } = render(
      <ProvidedTypography>Default color text</ProvidedTypography>
    );

    const pElement = container.querySelector('p');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveAttribute('data-testid', 'typography');
  });

  it('should use element as fontStyles when fontStyles is not provided and element exists in theme', () => {
    const { container } = render(
      <ProvidedTypography element='h1'>Heading text</ProvidedTypography>
    );

    const h1Element = container.querySelector('h1');
    expect(h1Element).toBeInTheDocument();
  });

  it('should use bodyLgRegular as fallback fontStyles when element is not in theme', () => {
    const { container } = render(
      <ProvidedTypography element='span'>Span text</ProvidedTypography>
    );

    const spanElement = container.querySelector('span');
    expect(spanElement).toBeInTheDocument();
  });

  it('should use provided fontStyles over element-based fontStyles', () => {
    const { container } = render(
      <ProvidedTypography element='h1' fontStyles='bodyMdRegular'>
        Custom font text
      </ProvidedTypography>
    );

    const h1Element = container.querySelector('h1');
    expect(h1Element).toBeInTheDocument();
  });

  it('should handle unset color', () => {
    const { container } = render(
      <ProvidedTypography color='unset'>Unset color text</ProvidedTypography>
    );

    const pElement = container.querySelector('p');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveStyle({ color: 'unset' });
  });

  it('should handle inherit color', () => {
    const { container } = render(
      <ProvidedTypography color='inherit'>
        Inherit color text
      </ProvidedTypography>
    );

    const pElement = container.querySelector('p');
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveStyle({ color: 'inherit' });
  });
});
