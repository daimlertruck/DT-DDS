import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { IconButton, IconButtonProps } from './IconButton';

const handleClickMock = jest.fn();

describe('<IconButton /> component', () => {
  const ProvidedIconButton = withProviders(IconButton);

  const renderComponent = (props?: IconButtonProps) => {
    const { container } = render(
      <ProvidedIconButton {...props} onClick={handleClickMock}>
        <Icon code='edit' dataTestId='icon' />
      </ProvidedIconButton>
    );

    return {
      button: screen.getByTestId('icon-button'),
      icon: screen.getByTestId('icon'),
      container,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with custom aria-label', () => {
    renderComponent({ ariaLabel: 'edit button' });

    const button = screen.getByLabelText('edit button');

    expect(button).toBeVisible();
  });

  it('calls onClick when clicked', () => {
    const { button } = renderComponent();

    expect(button).toHaveStyle('cursor: pointer');

    fireEvent.click(button);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick if disabled and has cursor not-allowed', () => {
    const { button } = renderComponent({ isDisabled: true });

    expect(button).toHaveStyle('cursor: not-allowed');

    fireEvent.click(button);

    expect(handleClickMock).toHaveBeenCalledTimes(0);
  });

  it.each`
    size             | fontSize
    ${'extra-small'} | ${12}
    ${'small'}       | ${16}
    ${'medium'}      | ${20}
    ${'large'}       | ${24}
    ${'extra-large'} | ${32}
  `(
    'should have correct font size when size is $size',
    ({ size, fontSize }) => {
      const { icon } = renderComponent({ size });

      expect(icon).toHaveStyle({ fontSize: `${fontSize}px` });
    }
  );

  it.each`
    variant       | isDisabled
    ${'default'}  | ${false}
    ${'default'}  | ${true}
    ${'contrast'} | ${false}
    ${'contrast'} | ${true}
  `(
    'should have style if variant is $variant and isDisabled is $isDisabled',
    ({ variant, color, isDisabled }) => {
      const { container } = renderComponent({
        variant,
        color,
        isDisabled,
      });

      expect(container).toMatchSnapshot();
    }
  );
});
