import { fireEvent, render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Tag, TagProps } from './Tag';

describe('<Tag /> component', () => {
  const ProvidedTag = withProviders(Tag);

  it.each`
    isDisabled | expectedClickTimes
    ${true}    | ${0}
    ${false}   | ${1}
  `(
    'should trigger the onClick function $expectedClickTimes times if isDisabled is $isDisabled, and close button should not exist if onClose is undefined',
    ({ isDisabled, expectedClickTimes }) => {
      const onClick = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <ProvidedTag dataTestId='tag' isDisabled={isDisabled} onClick={onClick}>
          Click me
        </ProvidedTag>
      );

      fireEvent.click(getByTestId('tag'));

      expect(onClick).toHaveBeenCalledTimes(expectedClickTimes);
      expect(queryByTestId('tag-close-button')).toBeNull();
    }
  );

  it.each`
    isDisabled | expectedCloseTimes
    ${true}    | ${0}
    ${false}   | ${1}
  `(
    'should trigger the close button $expectedCloseTimes times if isDisabled is $isDisabled and trigger onClose but not onClick',
    ({ isDisabled, expectedCloseTimes }) => {
      const onClick = jest.fn();
      const onClose = jest.fn();

      const { getByTestId } = render(
        <ProvidedTag
          dataTestId='tag'
          isDisabled={isDisabled}
          onClick={onClick}
          onClose={onClose}
        >
          Click me
        </ProvidedTag>
      );

      fireEvent.click(getByTestId('tag'));
      fireEvent.click(getByTestId('tag-close-button'));

      expect(onClick).toHaveBeenCalledTimes(0);
      expect(onClose).toHaveBeenCalledTimes(expectedCloseTimes);
    }
  );

  it.each`
    variant       | color            | border       | size        | isClickable | isDisabled | onClick      | onClose
    ${'solid'}    | ${'primary'}     | ${'rounded'} | ${'medium'} | ${false}    | ${false}   | ${undefined} | ${undefined}
    ${'outlined'} | ${'secondary'}   | ${'squared'} | ${'small'}  | ${true}     | ${false}   | ${undefined} | ${undefined}
    ${'solid'}    | ${'informative'} | ${'rounded'} | ${'medium'} | ${false}    | ${false}   | ${jest.fn()} | ${undefined}
    ${'solid'}    | ${'warning'}     | ${'rounded'} | ${'medium'} | ${false}    | ${false}   | ${undefined} | ${jest.fn()}
    ${'solid'}    | ${'error'}       | ${'rounded'} | ${'medium'} | ${false}    | ${true}    | ${jest.fn()} | ${jest.fn()}
  `(
    'should render the tag with variant $variant, color $color, border $border, size $size, isClickable as $isClickable, isDisabled as $isDisabled, onClick and onClose',
    ({
      variant,
      color,
      border,
      size,
      isClickable,
      isDisabled,
      onClick,
      onClose,
    }: TagProps) => {
      const { getByTestId } = render(
        <ProvidedTag
          border={border}
          color={color}
          dataTestId='tag'
          isClickable={isClickable}
          isDisabled={isDisabled}
          onClick={onClick}
          onClose={onClose}
          size={size}
          variant={variant}
        >
          Click me
        </ProvidedTag>
      );

      expect(getByTestId('tag')).toMatchSnapshot();
    }
  );
});
