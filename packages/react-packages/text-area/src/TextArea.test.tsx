import { withProviders } from '@dt-dds/react-core';
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
});
