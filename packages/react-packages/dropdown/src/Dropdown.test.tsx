import { act, RefObject, useRef, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withProviders } from '@dt-dds/react-core';

import { Dropdown as DropdownRaw } from './Dropdown';

jest.mock('@dt-dds/react-core', () => {
  const real = jest.requireActual('@dt-dds/react-core');
  return {
    ...real,
    useClickOutside: () => {},
  };
});

const Dropdown = withProviders(DropdownRaw);
const DropdownOption = withProviders(DropdownRaw.Option);

const dropdownTestId = 'dropdown';

const onClickMock = jest.fn();

const TestComponent = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        ref={anchorRef}
        type='button'
      >
        Open Menu
      </button>

      <Dropdown
        anchorRef={anchorRef}
        isOpen={isOpen}
        matchWidth={false}
        onClose={() => setIsOpen(false)}
      >
        <DropdownOption>Option1</DropdownOption>
        <DropdownOption isDisabled>Option2</DropdownOption>
        <DropdownOption isDisabled>Option3</DropdownOption>
        <DropdownOption onClick={onClickMock}>Option4</DropdownOption>
      </Dropdown>
    </>
  );
};

describe('<Dropdown /> ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should have correct styles', () => {
    const anchorRef = {
      current: document.createElement('div'),
    } as RefObject<HTMLElement>;

    const { container } = render(
      <Dropdown anchorRef={anchorRef} dataTestId={dropdownTestId} isOpen>
        Hello dropdown
      </Dropdown>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render correct aria, role and styles', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    const anchorRef = { current: anchor } as RefObject<HTMLElement>;

    render(
      <Dropdown anchorRef={anchorRef} dataTestId={dropdownTestId} isOpen>
        <div data-testid='content'>hello</div>
      </Dropdown>
    );

    const el = screen.getByTestId(dropdownTestId);

    expect(el).toHaveStyle({
      position: 'fixed',
      visibility: 'visible',
    });
  });

  test('should have visibility hidden if isOpen is false', () => {
    const anchor = document.createElement('div');
    document.body.appendChild(anchor);
    const anchorRef = { current: anchor } as RefObject<HTMLElement>;

    render(
      <Dropdown
        anchorRef={anchorRef}
        dataTestId={dropdownTestId}
        isOpen={false}
      >
        <div data-testid='content'>hello</div>
      </Dropdown>
    );

    const el = screen.getByTestId(dropdownTestId);

    expect(screen.queryByTestId('content')).not.toBeVisible();
    expect(el).toHaveStyle({
      visibility: 'hidden',
    });
  });

  test('should navigate dropdown options if not disabled and trigger onClick', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    const [optionOne, optionTwoDisabled, optionThreeReadonly, optionFour] =
      screen.getAllByTestId('dropdown-option');

    trigger.focus();

    await act(async () => {
      await user.keyboard('{Enter}');
    });

    await user.tab();

    expect(optionOne).toHaveFocus();
    expect(optionTwoDisabled).not.toHaveFocus();
    expect(optionThreeReadonly).not.toHaveFocus();
    expect(optionFour).not.toHaveFocus();

    await user.tab();

    expect(optionOne).not.toHaveFocus();
    expect(optionTwoDisabled).not.toHaveFocus();
    expect(optionThreeReadonly).not.toHaveFocus();
    expect(optionFour).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
