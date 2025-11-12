import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withProviders } from '@dt-dds/react-core';

import { DropdownOption as DropdownOptionRaw } from '.';

const DropdownOption = withProviders(DropdownOptionRaw);

const dropdownOptionId = 'dropdown-option';

describe('<DropdownOption /> ', () => {
  it('should have correct styles', () => {
    const { container } = render(
      <DropdownOption>Hello dropdown</DropdownOption>
    );

    expect(container).toMatchSnapshot();
  });

  it('should have correct attributes set', () => {
    render(
      <DropdownOption isDisabled isHighlighted isSelected>
        Hello dropdown
      </DropdownOption>
    );

    const dropdownOption = screen.getByTestId(dropdownOptionId);

    expect(dropdownOption).toHaveAttribute('aria-disabled', 'true');
    expect(dropdownOption).toHaveAttribute('aria-selected', 'true');
    expect(dropdownOption).toHaveAttribute('data-highlighted', 'true');
  });

  it.each`
    timesCalled | isDisabled
    ${1}        | ${false}
    ${0}        | ${true}
  `(
    'should trigger onClick callback $timesCalled times if isDisabled is $isDisabled',
    async ({ isDisabled, timesCalled }) => {
      const onClickMock = jest.fn();

      render(
        <DropdownOption isDisabled={isDisabled} onClick={onClickMock}>
          Hello dropdown
        </DropdownOption>
      );

      const dropdownOption = screen.getByTestId(dropdownOptionId);

      await userEvent.click(dropdownOption);

      expect(onClickMock).toHaveBeenCalledTimes(timesCalled);
    }
  );
});
