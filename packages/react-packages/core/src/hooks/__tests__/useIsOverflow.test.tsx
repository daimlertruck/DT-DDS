import React from 'react';

import { renderHook } from '@testing-library/react';

import { BaseProps } from '../../types';
import { withProviders } from '../../utils';
import useDebounceResize from '../useDebounceResize';
import { useIsOverflow } from '../useIsOverflow';
import useMedia from '../useMedia';

jest.mock('../useDebounceResize.ts');
jest.mock('../useMedia.ts');

const mockUseDebounceResize = useDebounceResize as jest.Mock<() => void>;
const mockUseMedia = useMedia as jest.Mock<boolean>;

describe('useIsOverflow', () => {
  beforeEach(() => {
    mockUseDebounceResize.mockImplementation((callback) => callback());
    jest
      .spyOn(React, 'useRef')
      .mockReturnValue({ current: { clientWidth: 1, scrollWidth: 0 } });
  });

  it('should not modify children if not on desktop', () => {
    mockUseMedia.mockReturnValue(false);
    const { result } = renderComponent();

    expect(result.current.overflow).toBe(false);
  });

  it('on Desktop and scroll width is larger than the container', () => {
    mockUseMedia.mockReturnValue(true);
    jest
      .spyOn(React, 'useRef')
      .mockReturnValue({ current: { clientWidth: 0, scrollWidth: 1 } });

    const { result } = renderComponent();

    expect(result.current.overflow).toBe(true);
  });
});

const ProvidedTable = withProviders(({ children }: BaseProps) => (
  <table>{children}</table>
));

const wrapper = ({ children }: BaseProps) => (
  <ProvidedTable>{children}</ProvidedTable>
);

const renderComponent = () => {
  const result = renderHook(() => useIsOverflow(), {
    wrapper,
  });

  return result;
};
