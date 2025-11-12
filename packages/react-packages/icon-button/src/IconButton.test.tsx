import { fireEvent, render, screen } from '@testing-library/react';

import { css } from '@emotion/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { IconButton, IconButtonProps } from './IconButton';
import { MockAvatar, MockAvatarType } from './mocks/MockAvatar';

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

  it('applies custom cssOverrides', () => {
    const customCss = css`
      border: 2px solid hotpink;
      background-color: orange;
    `;

    render(
      <ProvidedIconButton ariaLabel='override test' cssOverrides={customCss}>
        <Icon code='edit' dataTestId='icon' />
      </ProvidedIconButton>
    );

    const button = screen.getByTestId('icon-button');

    expect(button).toHaveStyle('border: 2px solid hotpink');
    expect(button).toHaveStyle('background-color: orange');
  });

  describe('IconButton with Avatar integration', () => {
    it.each`
      type           | mockText
      ${'letter'}    | ${'AB'}
      ${'collapsed'} | ${'+1'}
      ${'thumbnail'} | ${''}
      ${'photo'}     | ${''}
    `(
      'should apply correct styles for Avatar type $type',
      ({ type, mockText }: { type: MockAvatarType; mockText: string }) => {
        const { container } = render(
          <ProvidedIconButton ariaLabel='test button'>
            <MockAvatar text={mockText} type={type} />
          </ProvidedIconButton>
        );

        expect(container).toMatchSnapshot();
      }
    );
  });
});
