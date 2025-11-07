import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';

import useClickOutside from '../useClickOutside';

describe('useClickOutside', () => {
  test('should call the handler function when clicking outside the provided ref', () => {
    const handlerMock = jest.fn();
    const Component = () => {
      const ref = createRef<HTMLDivElement>();
      useClickOutside({
        refs: [ref],
        handler: handlerMock,
      });

      return (
        <div data-testid='outside'>
          <div data-testid='inside' ref={ref}></div>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);
    const outsideElement = getByTestId('outside');

    act(() => {
      fireEvent.mouseDown(outsideElement);
    });

    expect(handlerMock).toHaveBeenCalledTimes(1);
  });

  test('should not call the handler function when clicking inside the provided ref', () => {
    const handlerMock = jest.fn();
    const Component = () => {
      const ref = createRef<HTMLDivElement>();
      useClickOutside({
        refs: [ref],
        handler: handlerMock,
      });

      return (
        <div data-testid='outside'>
          <div data-testid='inside' ref={ref} />
        </div>
      );
    };

    const { getByTestId } = render(<Component />);
    const insideElement = getByTestId('inside');

    act(() => {
      fireEvent.mouseDown(insideElement);
    });

    expect(handlerMock).not.toHaveBeenCalled();
  });
});
