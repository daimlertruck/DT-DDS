import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Backdrop } from './Backdrop';
import { BackdropType } from './constants';

describe('<Backdrop /> component', () => {
  const ProvidedBackdrop = withProviders(Backdrop);

  it('expects rendered element to match snapshot', () => {
    const { container } = render(
      <ProvidedBackdrop isOpen type={BackdropType.Dark}>
        <div>Example text</div>
      </ProvidedBackdrop>
    );

    expect(container).toMatchSnapshot();
  });

  it('expects rendered element with type "light" to match snapshot', () => {
    const { container } = render(
      <ProvidedBackdrop isOpen type={BackdropType.Light}>
        <div>Example text</div>
      </ProvidedBackdrop>
    );

    expect(container).toMatchSnapshot();
  });

  it('expects the child element to have the correct text', () => {
    const exampleText = 'Example text';

    render(
      <ProvidedBackdrop isOpen type={BackdropType.Dark}>
        <div>{exampleText}</div>
      </ProvidedBackdrop>
    );

    const divElement = screen.getByTestId('backdrop');
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveTextContent(exampleText);
  });

  it('expects to not have backdrop open', () => {
    const exampleText = 'Example text';

    render(
      <ProvidedBackdrop isOpen={false}>
        <div>{exampleText}</div>
      </ProvidedBackdrop>
    );

    expect(screen.queryByTestId('backdrop')).toBeNull();
  });
});
