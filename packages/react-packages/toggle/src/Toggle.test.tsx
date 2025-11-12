import { render, fireEvent } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Toggle } from './Toggle';

describe('<Toggle /> component', () => {
  const ProvidedToggle = withProviders(Toggle);
  const LABEL = 'Toggle';

  it.each`
    isChecked    | isDisabled   | label        | description
    ${true}      | ${true}      | ${LABEL}     | ${'disabled and checked'}
    ${false}     | ${true}      | ${LABEL}     | ${'disabled and not checked'}
    ${true}      | ${false}     | ${LABEL}     | ${'checked'}
    ${undefined} | ${undefined} | ${undefined} | ${'on default state'}
  `(
    'should render a toggle $description',
    ({ isChecked, isDisabled, label }) => {
      const { container } = render(
        <ProvidedToggle
          isChecked={isChecked}
          isDisabled={isDisabled}
          label={label}
          onClick={() => null}
        />
      );

      expect(container).toMatchSnapshot();
    }
  );

  it('should trigger onClick event after mouse click', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ProvidedToggle
        isChecked={false}
        isDisabled={false}
        label={LABEL}
        onClick={onClick}
      />
    );

    getByTestId('toggle').click();

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick event after mouse click', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ProvidedToggle
        isChecked={false}
        isDisabled
        label={LABEL}
        onClick={onClick}
      />
    );

    getByTestId('toggle').click();

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick event after Enter key is pressed', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ProvidedToggle
        isChecked={false}
        isDisabled
        label={LABEL}
        onClick={onClick}
      />
    );

    fireEvent.keyDown(getByTestId('toggle'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onClick event after Enter key is pressed', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ProvidedToggle
        isChecked={false}
        isDisabled={false}
        label={LABEL}
        onClick={onClick}
      />
    );

    fireEvent.keyDown(getByTestId('toggle'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
    });

    expect(onClick).toHaveBeenCalled();
  });
});
