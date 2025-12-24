import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Checkbox } from './Checkbox';

describe('<Checkbox /> component', () => {
  const ProvidedCheckBox = withProviders(Checkbox);

  it('renders checkbox correctly', () => {
    const { container } = render(
      <ProvidedCheckBox
        isChecked={false}
        isDisabled={false}
        label='Label'
        onChange={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with children instead of label', () => {
    const { getByRole, getByText } = render(
      <ProvidedCheckBox isChecked={false} onChange={() => null}>
        <span>Child content</span>
      </ProvidedCheckBox>
    );

    expect(getByText('Child content')).toBeVisible();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ProvidedCheckBox
        isChecked={false}
        isDisabled={false}
        onChange={onChangeMock}
      />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ProvidedCheckBox isChecked={false} isDisabled onChange={onChangeMock} />
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(checkbox).toBeDisabled();
  });

  it('sets indeterminate state correctly', () => {
    const { getByRole } = render(
      <ProvidedCheckBox
        isChecked={false}
        isIndeterminate
        onChange={() => null}
      />
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('sets error state correctly', () => {
    const { getByRole } = render(
      <ProvidedCheckBox hasError isChecked={false} onChange={() => null} />
    );

    expect(getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders without label and uses aria-label', () => {
    const { getByRole } = render(
      <ProvidedCheckBox
        aria-label='Custom label'
        isChecked={false}
        onChange={() => null}
      />
    );

    expect(getByRole('checkbox')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('renders check icon when checked', () => {
    const { container } = render(
      <ProvidedCheckBox isChecked onChange={() => null} />
    );

    const iconElement = container.querySelector('i');
    expect(iconElement).toBeVisible();
  });

  it('renders with small size', () => {
    render(
      <ProvidedCheckBox
        isChecked={false}
        label='Small checkbox'
        onChange={() => null}
        size='small'
      />
    );

    const checkboxBox = screen.getByTestId('checkbox-box');

    expect(checkboxBox).toHaveStyle({
      height: '20px',
      width: '20px',
    });
  });

  it('applies custom style prop', () => {
    const customStyle = { marginTop: '10px' };
    const { getByTestId } = render(
      <ProvidedCheckBox
        isChecked={false}
        onChange={() => null}
        style={customStyle}
      />
    );

    const label = getByTestId('checkbox');
    expect(label).toHaveStyle('margin-top: 10px');
  });

  it('passes through additional props to input', () => {
    const { getByRole } = render(
      <ProvidedCheckBox
        data-custom='test-value'
        isChecked={false}
        name='test-checkbox'
        onChange={() => null}
      />
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'test-checkbox');
    expect(checkbox).toHaveAttribute('data-custom', 'test-value');
  });
});
