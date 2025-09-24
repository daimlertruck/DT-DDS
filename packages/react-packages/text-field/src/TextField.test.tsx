import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { defaultTheme as theme } from '@dt-dds/themes';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { TextField } from './TextField';

describe('<TextField /> component', () => {
  const ProvidedTextField = withProviders(TextField);

  const hasInputValue = (e: HTMLElement, inputValue: string) => {
    return screen.getByDisplayValue(inputValue) === e;
  };

  const renderInput = () => {
    const { container } = render(
      <ProvidedTextField label='My Awesome Input' />
    );
    const input = container.querySelector('input') as HTMLElement;
    return { input };
  };

  it('renders input with an empty initial value', () => {
    const { input } = renderInput();
    expect(input).toHaveValue('');
  });

  it('renders input with an initial value', () => {
    render(
      <ProvidedTextField
        initialValue='Initial Value'
        label='My Input with prefilled value'
      />
    );

    const input = screen.getByLabelText('My Input with prefilled value');
    expect(hasInputValue(input, 'Initial Value')).toBe(true);
  });

  it('renders input with a custom id', () => {
    render(
      <ProvidedTextField
        id='my-id'
        initialValue='Initial Value'
        label='My Input with prefilled value'
      />
    );

    expect(screen.getByTestId('input-field')).toHaveAttribute('id', 'my-id');
  });

  it('renders input with a default id', () => {
    render(<ProvidedTextField initialValue='Initial Value' label='My Input' />);

    expect(screen.getByTestId('input-field')).toHaveAttribute('id', 'my-input');
  });

  it('fills input correctly with new value on change Event', () => {
    const { input } = renderInput();
    fireEvent.change(input, { target: { value: 'New input value' } });

    expect(hasInputValue(input, 'New input value')).toBe(true);
  });

  it('should render the TextField with error styles and message', () => {
    const { container } = render(
      <ProvidedTextField
        hasError
        initialValue='Initial Value'
        label='My Input with Error Message'
        message='My Error Message'
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the TextField with info message', () => {
    const { container } = render(
      <ProvidedTextField
        hasError={false}
        label='My Input with info message'
        message='My Infor Message'
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders disabled input', () => {
    const { container } = render(
      <ProvidedTextField disabled label='My disabled input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders hidden text input', () => {
    render(<ProvidedTextField label='Hidden text' type='password' />);

    expect(screen.getByTestId('input-field')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('renders required text field', () => {
    render(
      <ProvidedTextField
        label='Required text'
        required
        requiredMessage='This field is required.'
      />
    );

    expect(screen.getByTestId('label-field')).toHaveTextContent(
      'Required text*'
    );
  });

  it('should have active state on focus', () => {
    render(<ProvidedTextField label='Some text' />);

    const input = screen.getByRole('textbox');
    const label = screen.getByTestId('label-field');
    const inputWrapper = screen.getByTestId('input-wrapper');

    fireEvent.focus(input);

    expect(label).toHaveStyle('font-size: 12px');
    expect(label).toHaveStyle('transform: translateY(-45%)');
    expect(input).toHaveStyle('outline: 0;');
    expect(inputWrapper).toHaveStyle('border-width: 1px;');
    expect(inputWrapper).toHaveStyle('border-style: solid');
  });

  it('should have hover style', () => {
    render(<ProvidedTextField label='Some text' />);

    const inputWrapper = screen.getByTestId('input-wrapper');

    fireEvent.mouseOver(inputWrapper, { currentTarget: { value: '' } });

    expect(inputWrapper).toHaveStyle(
      `border: 1px solid ${theme.palette.border.dark}`
    );
  });

  describe('onBlur event', () => {
    it('should have error state with error message', () => {
      render(
        <ProvidedTextField
          label='Some text'
          required
          requiredMessage='This field is required.'
        />
      );
      const input = screen.getByRole('textbox');

      fireEvent.blur(input, { currentTarget: { value: '' } });

      expect(input).toHaveStyle('outline: 0;');
      expect(screen.getByText('This field is required.')).toBeInTheDocument();
    });

    it('should have active state', () => {
      render(
        <ProvidedTextField initialValue='Value' label='Some text' required />
      );
      const input = screen.getByTestId('input-field');
      const label = screen.getByTestId('label-field');

      fireEvent.blur(input, { currentTarget: { value: 'Some value' } });

      expect(label).toHaveStyle('font-size: 12px');
      expect(label).toHaveStyle('transform: translateY(-45%)');
    });
  });

  it('renders input with extras suffix and prefix elements', () => {
    const icon = <Icon code='home_work' />;
    const { container } = render(
      <ProvidedTextField
        extraPrefix={{ component: icon }}
        extraSuffix={{ component: icon }}
        label='My input'
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input with variant baseLine', () => {
    const { container } = render(
      <ProvidedTextField label='My input' variant='bottom-line' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input with light background fill', () => {
    const { container } = render(
      <ProvidedTextField backgroundFill='light' label='My input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input without floating label', () => {
    const { container } = render(
      <ProvidedTextField isFloatingLabel={false} label='My input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input without required error when initial value is changed', async () => {
    const StatefulTextField = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <button onClick={() => setValue('new initial value')} type='button'>
            Set initial value
          </button>
          <ProvidedTextField
            initialValue={value}
            label='my field'
            required
            requiredMessage='required field'
          />
        </>
      );
    };

    render(<StatefulTextField />);

    fireEvent.focus(screen.getByLabelText('my field*'));
    fireEvent.blur(screen.getByLabelText('my field*'));

    expect(screen.getByText('required field')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set initial value'));

    expect(screen.queryByText('required field')).not.toBeInTheDocument();
  });

  test('should call onClick when extra suffix is clicked', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraSuffix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Search for anything'
        type='search'
      />
    );

    const input = screen.getByTestId('input-field');

    fireEvent.change(input, {
      target: { value: 'search' },
    });

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('should call onClick when extra preffix is clicked', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraPrefix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Search for anything'
        type='search'
      />
    );

    const input = screen.getByTestId('input-field');

    fireEvent.change(input, {
      target: { value: 'search' },
    });

    fireEvent.click(screen.getByTestId('extra-preffix'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('should clear input after reset icon clicked', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraPrefix={{
          component: <Icon code='search' />,
          onClick: jest.fn(),
        }}
        label='Search for anything'
        onResetInput={handleClick}
        type='search'
      />
    );

    const input = screen.getByTestId('input-field');

    fireEvent.change(input, {
      target: { value: 'search' },
    });

    fireEvent.click(screen.getByText('close_small'));

    expect(handleClick).toHaveBeenCalled();
  });
});
