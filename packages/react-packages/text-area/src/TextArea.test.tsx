import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';

import { TextArea } from '.';

describe('<TextArea /> component', () => {
  const ProvidedTextArea = withProviders(TextArea);

  it('renders input with an empty value', () => {
    const { getByRole } = render(
      <ProvidedTextArea label='My awesome text area' name='awesome-textarea' />
    );

    const textareInput = getByRole('textbox');

    expect(textareInput).toHaveValue('');
  });

  it('renders input with an value', () => {
    const label = 'My Input with prefilled value';
    const initialValue = 'Initial Value';

    const { container } = render(
      <ProvidedTextArea label={label} value={initialValue} />
    );

    const input = screen.getByLabelText(label);
    const value = screen.getByDisplayValue(initialValue);

    expect(value).toEqual(input);
    expect(container).toMatchSnapshot();
  });

  it('renders input with max length of 200 characters', () => {
    const { getByTestId, getByRole } = render(
      <ProvidedTextArea label='Awesome text area' maxLength={200} />
    );

    const textarea = getByRole('textbox');
    const maxLength = getByTestId('typography');

    expect(textarea).toHaveProperty('maxLength', 200);
    expect(maxLength).toBeVisible();
  });

  it('fills input correctly with new value on change Event', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedTextArea label='My awesome text area' onChange={onChange} />
    );

    const textareaInput = getByRole('textbox');

    fireEvent.change(textareaInput, { target: { value: 'New input value' } });

    expect(onChange).toHaveBeenCalled();
    expect(textareaInput).toHaveValue('New input value');
  });

  it('should have active state on focus', () => {
    render(<ProvidedTextArea label='My awesome text area' />);

    const textarea = screen.getByTestId('textarea-container');

    fireEvent.focus(textarea);

    expect(textarea).toHaveStyle('border-width: 1px;');
    expect(textarea).toHaveStyle('border-style: solid');
  });

  it('renders disabled input', () => {
    const { container } = render(
      <ProvidedTextArea disabled label='My disabled input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders required text field', () => {
    render(
      <ProvidedTextArea
        label='Required text'
        message='This field is required.'
        required
      />
    );

    const label = screen.getByTestId('label-field');

    expect(label).toHaveTextContent('Required text*');
  });

  describe('onBlur event', () => {
    it('should have error state with error message', () => {
      render(
        <ProvidedTextArea
          label='Some text'
          message='This field is required.'
          required
        />
      );
      const input = screen.getByRole('textbox');

      fireEvent.blur(input, { currentTarget: { value: '' } });

      expect(input).toHaveStyle('outline: none;');
      expect(screen.getByText('This field is required.')).toBeInTheDocument();
    });

    it("should add 'blur' with empty value", () => {
      render(<ProvidedTextArea label='My awesome text area' />);

      const textarea = screen.getByTestId('textarea-container');

      fireEvent.blur(textarea, { currentTarget: { value: '' } });

      expect(textarea).toHaveStyle(
        `border: 1px solid ${theme.palette.primary.default}`
      );
    });

    it('should have active state', () => {
      const { getByRole, getByTestId } = render(
        <ProvidedTextArea label='Awesome text area' value='value' />
      );

      const textarea = getByRole('textbox');
      const label = getByTestId('label-field');

      fireEvent.blur(textarea, { currentTarget: { value: 'Some value' } });

      expect(label).toHaveStyle(`font-size: ${theme.fontStyles.body3}`);
      expect(label).toHaveStyle('transform: translateY(-45%)');
    });
  });

  it('should have hover style', () => {
    render(<ProvidedTextArea label='My awesome text area' />);

    const textarea = screen.getByTestId('textarea-container');

    fireEvent.mouseOver(textarea, { currentTarget: { value: '' } });

    expect(textarea).toHaveStyle(
      `border: 1px solid ${theme.palette.primary.default}`
    );
  });

  it('renders input with variant baseLine', () => {
    const { container } = render(
      <ProvidedTextArea label='My input' variant='bottom-line' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input with resize option', () => {
    const { container } = render(
      <ProvidedTextArea enableResize label='My input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input with light background fill', () => {
    const { container } = render(
      <ProvidedTextArea backgroundFill='light' label='My input' />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders input without required error when initial value is changed', async () => {
    const StatefulTextArea = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <button onClick={() => setValue('new initial value')} type='button'>
            Set initial value
          </button>
          <ProvidedTextArea
            label='my field'
            message='required field'
            required
            value={value}
          />
        </>
      );
    };

    render(<StatefulTextArea />);

    fireEvent.focus(screen.getByLabelText('my field*'));
    fireEvent.blur(screen.getByLabelText('my field*'));

    expect(screen.getByText('required field')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set initial value'));

    expect(screen.queryByText('new initial value')).toBeInTheDocument();
  });
});
