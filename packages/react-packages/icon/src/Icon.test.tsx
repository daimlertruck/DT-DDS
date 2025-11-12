import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

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
    size    | fontSize
    ${'xs'} | ${'12px'}
    ${'s'}  | ${'16px'}
    ${'m'}  | ${'20px'}
    ${'l'}  | ${'24px'}
    ${'xl'} | ${'32px'}
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
