import { fireEvent, render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Checkbox } from './Checkbox';

describe('<CheckBox /> component', () => {
  const ProvidedCheckBox = withProviders(Checkbox);

  it('renders checkbox with label', () => {
    const { container } = render(
      <ProvidedCheckBox
        isChecked={false}
        isDisabled={false}
        onChange={() => null}
      >
        Label
      </ProvidedCheckBox>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders checkbox without label', () => {
    const { container } = render(
      <ProvidedCheckBox
        isChecked={false}
        isDisabled={false}
        onChange={() => null}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders checkbox checked', () => {
    const { container } = render(
      <ProvidedCheckBox isChecked isDisabled={false} onChange={() => null} />
    );
    expect(container).toMatchSnapshot();
  });

  it('onChange is triggered', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ProvidedCheckBox
        isChecked={false}
        isDisabled={false}
        onChange={onChangeMock}
      />
    );
    const checkBox = getByRole('checkbox');

    expect(checkBox).toBeInTheDocument();

    fireEvent.click(checkBox);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('renders checkbox disabled', () => {
    const onChangeMock = jest.fn();
    const { container, getByRole } = render(
      <ProvidedCheckBox isChecked={false} isDisabled onChange={onChangeMock} />
    );
    const checkBox = getByRole('checkbox');

    expect(checkBox).toBeInTheDocument();

    fireEvent.click(checkBox);

    expect(onChangeMock).toHaveBeenCalledTimes(0);
    expect(container).toMatchSnapshot();
  });
});
