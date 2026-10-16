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

  describe('resize observation', () => {
    const originalResizeObserver = window.ResizeObserver;
    const observe = jest.fn();

    beforeEach(() => {
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe,
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    });

    afterEach(() => {
      window.ResizeObserver = originalResizeObserver;
    });

    test('should observe the menu element after the dropdown opens', async () => {
      const user = userEvent.setup();

      render(<TestComponent />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      expect(observe).toHaveBeenCalledWith(screen.getByTestId(dropdownTestId));
    });
  });

  describe('mounted open', () => {
    let rectSpy: jest.SpyInstance;

    const toRect = (left: number, top: number, width: number, height: number) =>
      ({
        x: left,
        y: top,
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        toJSON: () => ({}),
      } as DOMRect);

    beforeEach(() => {
      rectSpy = jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          return this.getAttribute('role') === 'menu'
            ? toRect(0, 0, 250, 120)
            : toRect(100, 300, 120, 32);
        });
    });

    afterEach(() => {
      rectSpy.mockRestore();
    });

    const OpenOnMount = () => {
      const anchorRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={anchorRef} type='button'>
            Anchor
          </button>
          <Dropdown
            anchorRef={anchorRef}
            isFocusable={false}
            isOpen
            placement='top'
          >
            <DropdownOption>Option1</DropdownOption>
          </Dropdown>
        </>
      );
    };

    test("should position a Dropdown mounted open from the menu's measured height", () => {
      render(<OpenOnMount />);

      // top = 300 - 4 - 120 = 176 (296 if the menu were never measured)
      expect(screen.getByTestId(dropdownTestId)).toHaveStyle({ top: '176px' });
    });
  });
});
