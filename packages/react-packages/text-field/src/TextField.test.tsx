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

    expect(
      screen.getByTestId('my-input-with-prefilled-value-text-field')
    ).toHaveAttribute('id', 'my-id');
  });

  it('renders input with a default id', () => {
    render(<ProvidedTextField initialValue='Initial Value' label='My Input' />);

    expect(screen.getByTestId('my-input-text-field')).toHaveAttribute(
      'id',
      'my-input'
    );
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

    expect(screen.getByTestId('hidden-text-text-field')).toHaveAttribute(
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
      `border: 1px solid ${theme.palette.accent.default}`
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
      const input = screen.getByTestId('some-text-text-field');
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

    const input = screen.getByTestId('search-for-anything-text-field');

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

    const input = screen.getByTestId('search-for-anything-text-field');

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

    const input = screen.getByTestId('search-for-anything-text-field');

    fireEvent.change(input, {
      target: { value: 'search' },
    });

    fireEvent.click(screen.getByText('close_small'));

    expect(handleClick).toHaveBeenCalled();
  });

  test('should call onChange handler when provided', () => {
    const handleChange = jest.fn();

    render(<ProvidedTextField label='Test input' onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('should call onFocus handler when provided', () => {
    const handleFocus = jest.fn();

    render(<ProvidedTextField label='Test input' onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalled();
  });

  test('should call onBlur handler when provided', () => {
    const handleBlur = jest.fn();

    render(<ProvidedTextField label='Test input' onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });

  test('should not set activeInput on focus when readOnly is true', () => {
    render(<ProvidedTextField label='Readonly input' readOnly />);

    const input = screen.getByRole('textbox');
    const label = screen.getByTestId('label-field');

    fireEvent.focus(input);

    expect(label).not.toHaveStyle('transform: translateY(-45%)');
  });

  test('should handle Enter key on extra prefix when onClick is provided', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraPrefix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Test input'
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    const extraPrefix = screen.getByTestId('extra-preffix');
    fireEvent.keyDown(extraPrefix, { code: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith('test');
  });

  test('should handle Enter key on extra suffix when onClick is provided', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraSuffix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Test input'
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    const extraSuffix = screen.getByTestId('extra-suffix');
    fireEvent.keyDown(extraSuffix, { code: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith('test');
  });

  test('should handle Enter key on reset icon', () => {
    render(
      <ProvidedTextField
        initialValue='test value'
        label='Search input'
        type='search'
      />
    );

    const input = screen.getByRole('searchbox');

    const resetIcon = screen.getByTestId('reset-icon');

    fireEvent.keyDown(resetIcon, { code: 'Enter' });

    expect(input).toHaveValue('');
  });

  test('should not call extra prefix onClick when key is not Enter', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraPrefix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Test input'
      />
    );

    const extraPrefix = screen.getByTestId('extra-preffix');
    fireEvent.keyDown(extraPrefix, { code: 'Space' });

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should not call extra suffix onClick when key is not Enter', () => {
    const handleClick = jest.fn();

    render(
      <ProvidedTextField
        extraSuffix={{
          component: <Icon code='search' />,
          onClick: handleClick,
        }}
        label='Test input'
      />
    );

    const extraSuffix = screen.getByTestId('extra-suffix');
    fireEvent.keyDown(extraSuffix, { code: 'Space' });

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should handle blur without required error when field has value', () => {
    render(
      <ProvidedTextField
        label='Required field'
        required
        requiredMessage='This is required'
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'has value' } });
    fireEvent.blur(input);

    expect(screen.queryByText('This is required')).not.toBeInTheDocument();
  });

  test('should use requiredMessage over message prop when hasRequiredError is true', () => {
    render(
      <ProvidedTextField
        label='Required field'
        message='Info message'
        required
        requiredMessage='Required message'
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(screen.getByText('Required message')).toBeInTheDocument();
    expect(screen.queryByText('Info message')).not.toBeInTheDocument();
  });

  describe('labelIcon feature tests', () => {
    test('renders label with icon', () => {
      render(
        <ProvidedTextField
          label='My input with icon'
          labelIcon={<Icon code='info' size='s' />}
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toHaveTextContent('My input with icon');
      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByTestId('icon')).toHaveTextContent('info');
    });

    test('renders label without icon when labelIcon prop is not provided', () => {
      render(<ProvidedTextField label='My input without icon' />);

      const label = screen.getByTestId('label-field');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('My input without icon');
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    test('renders label with icon and required indicator', () => {
      render(
        <ProvidedTextField
          label='My required input with icon'
          labelIcon={<Icon code='warning' size='s' />}
          required
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toHaveTextContent('My required input with icon*');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon and maintains floating label behavior', () => {
      render(
        <ProvidedTextField
          isFloatingLabel
          label='My floating label with icon'
          labelIcon={<Icon code='info' size='s' />}
        />
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByTestId('label-field');

      fireEvent.focus(input);

      expect(label).toHaveStyle('transform: translateY(-45%)');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon and error state', () => {
      render(
        <ProvidedTextField
          hasError
          label='My input with icon and error'
          labelIcon={<Icon code='info' size='s' />}
          message='Error message'
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    test('renders label with icon when disabled', () => {
      render(
        <ProvidedTextField
          disabled
          label='Disabled input with icon'
          labelIcon={<Icon code='lock' size='s' />}
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    test('renders label with icon when readonly', () => {
      render(
        <ProvidedTextField
          label='Readonly input with icon'
          labelIcon={<Icon code='visibility' size='s' />}
          readOnly
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon for different input types', () => {
      render(
        <ProvidedTextField
          label='Password with icon'
          labelIcon={<Icon code='password' size='s' />}
          type='password'
        />
      );

      expect(screen.getByTestId('label-field')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon and updates on value change', () => {
      render(
        <ProvidedTextField
          initialValue='Initial value'
          label='Input with icon'
          labelIcon={<Icon code='info' size='s' />}
        />
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue('Initial value');
    });

    test('renders label with icon for non-floating label', () => {
      render(
        <ProvidedTextField
          isFloatingLabel={false}
          label='Non-floating label with icon'
          labelIcon={<Icon code='help' size='s' />}
        />
      );

      expect(screen.getByTestId('label-field')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon for search type input', () => {
      render(
        <ProvidedTextField
          label='Search with icon'
          labelIcon={<Icon code='info' size='s' />}
          type='search'
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('renders label with icon alongside extra prefix', () => {
      render(
        <ProvidedTextField
          extraPrefix={{
            component: <Icon code='search' />,
          }}
          label='Input with prefix and label icon'
          labelIcon={<Icon code='info' size='s' />}
        />
      );

      expect(screen.getByTestId('label-field')).toBeInTheDocument();
      expect(screen.getByTestId('extra-preffix')).toBeInTheDocument();
      expect(screen.getAllByTestId('icon').length).toBeGreaterThanOrEqual(2);
    });

    test('renders label with icon alongside extra suffix', () => {
      render(
        <ProvidedTextField
          extraSuffix={{
            component: <Icon code='arrow_forward' />,
          }}
          label='Input with suffix and label icon'
          labelIcon={<Icon code='info' size='s' />}
        />
      );

      expect(screen.getByTestId('label-field')).toBeInTheDocument();
      expect(screen.getByTestId('extra-suffix')).toBeInTheDocument();
      expect(screen.getAllByTestId('icon').length).toBeGreaterThanOrEqual(2);
    });
  });
});
