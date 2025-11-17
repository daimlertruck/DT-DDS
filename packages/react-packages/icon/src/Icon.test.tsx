import { withProviders } from '@dt-dds/react-core';
import { render } from '@testing-library/react';

import { Icon } from './Icon';

describe('Icon component tests', () => {
  const ProvidedIcon = withProviders(Icon);

  const CODE = 'warning';
  it('renders Icon component', () => {
    const { container } = render(<ProvidedIcon code={CODE} />);

    expect(container).toMatchSnapshot();
  });

  it('applies the specified color in the Icon component', () => {
    const { container } = render(<ProvidedIcon code={CODE} color='red' />);

    const iconElement = container.querySelector('i');
    expect(iconElement).toHaveStyleRule('color', 'red');
  });

  it.each`
    size             | fontSize
    ${'extra-small'} | ${'12px'}
    ${'small'}       | ${'16px'}
    ${'medium'}      | ${'20px'}
    ${'large'}       | ${'24px'}
    ${'extra-large'} | ${'32px'}
  `(
    'applies the font size $fontSize in the Icon component when size is $size',
    ({ size, fontSize }) => {
      const { container } = render(<ProvidedIcon code={CODE} size={size} />);

      expect(container.querySelector('i')).toHaveStyle(
        `font-size: ${fontSize}`
      );
    }
  );

  it('applies the filled style in the Icon component', () => {
    const { container } = render(<ProvidedIcon code={CODE} variant='filled' />);

    expect(container.querySelector('i')).toHaveStyle(
      "font-variation-settings: 'FILL' 1"
    );
  });
});
