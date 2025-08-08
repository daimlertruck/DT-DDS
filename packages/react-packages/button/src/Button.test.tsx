import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from './Button';

describe('<Button /> component', () => {
  const ProvidedButton = withProviders(Button);

  it('renders button html element with the correct title', () => {
    const { container } = render(
      <ProvidedButton dataTestId='primary' onClick={() => null}>
        Primary
      </ProvidedButton>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders button html element with contrast styles', () => {
    const { container } = render(
      <ProvidedButton
        color='contrast'
        dataTestId='contrast'
        onClick={() => null}
      >
        Contrast
      </ProvidedButton>
    );

    expect(container.firstChild).toHaveStyleRule(
      'color',
      theme.palette.content.dark
    );
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      theme.palette.surface.contrast
    );
  });

  it('renders a disabled button html element with the correct title', () => {
    render(
      <ProvidedButton
        color='secondary'
        dataTestId='secondary'
        isDisabled
        onClick={() => null}
        variant='outlined'
      >
        Secondary
      </ProvidedButton>
    );

    const secondaryButton = screen.getByTestId('secondary-button');
    expect(secondaryButton).toHaveTextContent('Secondary');
    expect(secondaryButton).toBeDisabled();
  });

  it('triggers the button action correctly', () => {
    const callbackFn = jest.fn();

    render(
      <ProvidedButton
        color='error'
        dataTestId='error'
        onClick={callbackFn}
        variant='solid'
      >
        Error
      </ProvidedButton>
    );

    const button = screen.getByTestId('error-button');
    fireEvent.click(button);

    expect(callbackFn).toBeCalledTimes(1);
  });

  describe('when loading is true', () => {
    it('renders a spinner light theme', () => {
      const { container } = render(
        <ProvidedButton isLoading onClick={() => null}>
          Button loading
        </ProvidedButton>
      );

      expect(container).toMatchSnapshot();
    });

    it('renders a spinner dark theme when variant is outlined', () => {
      const { container } = render(
        <ProvidedButton isLoading onClick={() => null} variant='outlined'>
          Button loading
        </ProvidedButton>
      );

      expect(container).toMatchSnapshot();
    });
  });

  test('should have media query rule', () => {
    const { container } = render(
      <ProvidedButton onClick={() => null} variant='outlined'>
        Button loading
      </ProvidedButton>
    );

    expect(container.firstChild).toHaveStyleRule('width', '100%', {
      media: '(max-width: 480px)',
    });
  });
});
