import { Fragment } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { Tabs } from './Tabs';
import { Variant } from './types';

const handleChangeMock = jest.fn();

describe('<Tabs /> component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    variant
    ${'default'}
    ${'contained'}
  `(
    'should match the snapshot by displaying $variant variant',
    ({ variant }) => {
      const { container } = renderComponent(handleChangeMock, variant);

      expect(container).toMatchSnapshot();
    }
  );

  it('should display side icons when scrollable', () => {
    expect(screen.queryByTestId('left-arrow')).toBeNull();
    expect(screen.queryByTestId('right-arrow')).toBeNull();

    Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
      writable: true,
      value: 10,
    });

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      writable: true,
      value: 10,
    });

    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      writable: true,
      value: 100,
    });

    renderComponent(handleChangeMock);

    expect(screen.queryByTestId('left-arrow')).toBeVisible();
    expect(screen.queryByTestId('right-arrow')).toBeVisible();
  });

  it.each`
    scroll
    ${'left'}
    ${'right'}
  `('should handle scroll after $scroll side icon click', ({ scroll }) => {
    const scrollMock = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scroll', {
      writable: true,
      value: scrollMock,
    });

    renderComponent(handleChangeMock);

    const scrollButton = screen.getByTestId(`${scroll}-arrow`);

    fireEvent.click(scrollButton);

    expect(scrollMock).toHaveBeenCalled();
  });

  it('should trigger handle change after item click', () => {
    const { getByTestId } = renderComponent(handleChangeMock);

    fireEvent.click(getByTestId('tab-item-1'));

    expect(handleChangeMock).toHaveBeenCalledWith(1);
  });
});

const renderComponent = (
  handleChange: () => void,
  variant: Variant = 'default'
) => {
  const ProvidedFragment = withProviders(Fragment);

  return render(
    <ProvidedFragment>
      <Tabs activeTab={0} handleChange={handleChange} variant={variant}>
        <Tabs.Item label='Tab 1' />
        <Tabs.Item label='Tab 2' />
        <Tabs.Item icon={<Icon code='menu' />} label='Tab 3' />
        <Tabs.Item isDisabled label='Tab 4' />
      </Tabs>
    </ProvidedFragment>
  );
};
