import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { defaultTheme as theme } from '@dt-dds/themes';
import { fireEvent, render, screen } from '@testing-library/react';

import { TextArea } from '.';

describe('<TextArea /> component', () => {
  const ProvidedTextArea = withProviders(TextArea);

  it('should render default text area', () => {
    const { container } = render(
      <ProvidedTextArea
        label='My awesome text area'
        name='awesome-textarea'
        value='some value'
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render text area with floating label', () => {
    const { container } = render(
      <ProvidedTextArea
        label='My awesome text area'
        labelVariant='floating'
        name='awesome-textarea'
        value='some value'
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render input with max length of 200 characters', () => {
    const { getByTestId, getByRole } = render(
      <ProvidedTextArea label='Awesome text area' maxLength={200} />
    );

    const textarea = getByRole('textbox');
    const maxLength = getByTestId('char-counter');

    expect(textarea).toHaveProperty('maxLength', 200);
    expect(maxLength).toBeVisible();
  });

  it('should render disabled input', () => {
    const { getByRole } = render(
      <ProvidedTextArea disabled label='My disabled input' />
    );

    expect(getByRole('textbox')).toHaveProperty('disabled');
  });

  it('renders required text field', () => {
    const { getByTestId } = render(
      <ProvidedTextArea
        label='Required text'
        message='This field is required.'
        required
      />
    );

    const label = getByTestId('label-field');

    expect(label).toHaveTextContent('Required text*');
  });

  it('should render border after hover ', () => {
    const { getByTestId } = render(
      <ProvidedTextArea label='My awesome text area' />
    );

    const textarea = getByTestId('my-awesome-text-area-textarea');

    fireEvent.mouseOver(textarea, { currentTarget: { value: '' } });

    expect(textarea).toHaveStyle(
      `border: 1px solid ${theme.palette.informative.default}`
    );
  });

  it('should render input with variant bottomLine', () => {
    const { getByTestId } = render(
      <ProvidedTextArea label='My input' variant='bottom-line' />
    );

    const textarea = getByTestId('my-input-textarea');

    expect(textarea).toHaveStyle(
      `border-bottom: 1px solid ${theme.palette.border.medium}`
    );
  });

  it('should have error state with error message', () => {
    const { getByTestId } = render(
      <ProvidedTextArea
        label='My input'
        message='This field is required.'
        required
      />
    );
    const input = getByTestId('my-input-textarea');

    fireEvent.blur(input, { currentTarget: { value: '' } });

    expect(input).toHaveStyle('outline: none;');
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });

  it('should trigger onChange', () => {
    const onChangeMock = jest.fn();

    const { getByTestId } = render(
      <ProvidedTextArea
        label='My input'
        message='This field is required.'
        onChange={onChangeMock}
        required
      />
    );
    const textarea = getByTestId('my-input-textarea');

    fireEvent.change(textarea, { target: { value: 'New input value' } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should trigger onChange', () => {
    const onFocusMock = jest.fn();

    const { getByTestId } = render(
      <ProvidedTextArea label='My input' onFocus={onFocusMock} />
    );
    const textarea = getByTestId('my-input-textarea');

    fireEvent.focus(textarea);

    expect(onFocusMock).toHaveBeenCalled();
  });

  it('renders input with light background fill', () => {
    const { getByTestId } = render(
      <ProvidedTextArea backgroundFill='light' label='My input' />
    );

    expect(getByTestId('my-input-textarea')).toHaveStyle(
      `background-color: ${theme.palette.surface.light}`
    );
  });

  describe('TextArea labelIcon feature tests', () => {
    test('renders label with icon', () => {
      render(
        <ProvidedTextArea
          label='My textarea with icon'
          labelIcon={<Icon code='info' size='small' />}
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toHaveTextContent('My textarea with icon');
      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByTestId('icon')).toHaveTextContent('info');
    });

    test('renders label without icon when labelIcon prop is not provided', () => {
      render(<ProvidedTextArea label='My textarea without icon' />);

      const label = screen.getByTestId('label-field');
      expect(label).toBeVisible();
      expect(label).toHaveTextContent('My textarea without icon');
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    test('renders label with icon and required indicator', () => {
      render(
        <ProvidedTextArea
          label='My required textarea with icon'
          labelIcon={<Icon code='warning' size='small' />}
          required
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toHaveTextContent('My required textarea with icon*');
      expect(screen.getByTestId('icon')).toBeVisible();
    });

    test('renders label with icon and maintains floating label behavior', () => {
      render(
        <ProvidedTextArea
          label='My floating label with icon'
          labelIcon={<Icon code='info' size='small' />}
          labelVariant='floating'
        />
      );

      const textarea = screen.getByRole('textbox');
      const label = screen.getByTestId('label-field');

      fireEvent.focus(textarea);

      expect(label).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
    });

    test('renders label with icon and error state', () => {
      render(
        <ProvidedTextArea
          hasError
          label='My textarea with icon and error'
          labelIcon={<Icon code='info' size='small' />}
          message='Error message'
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByText('Error message')).toBeVisible();
    });

    test('renders label with icon when hasLabel is true', () => {
      render(
        <ProvidedTextArea
          hasLabel
          label='Textarea with label and icon'
          labelIcon={<Icon code='help' size='small' />}
        />
      );

      expect(screen.getByTestId('label-field')).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
    });

    test('does not render icon when hasLabel is false', () => {
      render(
        <ProvidedTextArea
          hasLabel={false}
          label='Textarea without label'
          labelIcon={<Icon code='help' size='small' />}
        />
      );

      expect(screen.queryByTestId('label-field')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    test('renders label with icon for default label variant', () => {
      render(
        <ProvidedTextArea
          label='Default variant with icon'
          labelIcon={<Icon code='info' size='small' />}
          labelVariant='default'
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
    });

    test('renders label with icon when disabled', () => {
      render(
        <ProvidedTextArea
          disabled
          label='Disabled textarea with icon'
          labelIcon={<Icon code='lock' size='small' />}
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    test('renders label with icon when readonly', () => {
      render(
        <ProvidedTextArea
          label='Readonly textarea with icon'
          labelIcon={<Icon code='visibility' size='small' />}
          readOnly
        />
      );

      const label = screen.getByTestId('label-field');
      expect(label).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
    });

    test('renders label with icon and maxLength counter', () => {
      render(
        <ProvidedTextArea
          label='Textarea with icon and counter'
          labelIcon={<Icon code='edit' size='small' />}
          maxLength={100}
        />
      );

      expect(screen.getByTestId('label-field')).toBeVisible();
      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByTestId('char-counter')).toHaveTextContent('0 / 100');
    });

    test('renders label with icon and updates on value change', () => {
      render(
        <ProvidedTextArea
          label='Textarea with icon'
          labelIcon={<Icon code='info' size='small' />}
          value='Initial value'
        />
      );

      expect(screen.getByTestId('icon')).toBeVisible();
      expect(screen.getByRole('textbox')).toHaveValue('Initial value');
    });
  });
});
