import { RefObject, useRef, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withProviders } from '@dt-dds/react-core';

import { Dropdown as DropdownRaw } from './Dropdown';

jest.mock('./hooks', () => ({
  useFloatingPosition: () => ({
    style: {
      position: 'fixed',
      top: 10,
      left: 20,
      width: 200,
      maxWidth: 200,
      zIndex: 1234,
    },
  }),
}));

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

describe('<Dropdown /> ', () => {
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

    expect(el).toHaveAttribute('role', 'menu');
    expect(el).toHaveAttribute('aria-hidden', 'false');

    expect(el).toHaveStyle({
      position: 'fixed',
      top: '10px',
      left: '20px',
      width: '200px',
      maxWidth: '200px',
      zIndex: '1234',
    });

    expect(screen.getByTestId('content')).toHaveTextContent('hello');
  });

  test('should have aria-hidden true if isOpen is false', () => {
    const anchor = document.createElement('div');
    document.body.appendChild(anchor);
    const anchorRef = { current: anchor } as RefObject<HTMLElement>;

    render(
      <Dropdown
        anchorRef={anchorRef}
        dataTestId={dropdownTestId}
        isOpen={false}
      />
    );

    const dropdown = screen.getByTestId(dropdownTestId);

    expect(dropdown).toHaveAttribute('aria-hidden', 'true');
  });

  test('should navigate dropdown options', async () => {
    const user = userEvent.setup();

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
            onClose={() => setIsOpen(false)}
          >
            <DropdownOption>Option1</DropdownOption>
            <DropdownOption>Option2</DropdownOption>
          </Dropdown>
        </>
      );
    };

    render(<TestComponent />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    const dropdownOptions = screen.getAllByTestId('dropdown-option');

    trigger.focus();

    await user.tab();

    expect(dropdownOptions[0]).toHaveFocus();
    expect(dropdownOptions[1]).not.toHaveFocus();

    await user.tab();

    expect(dropdownOptions[0]).not.toHaveFocus();
    expect(dropdownOptions[1]).toHaveFocus();
  });
});
