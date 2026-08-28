import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { TooltipContentProps } from './components';
import Tooltip from './Tooltip';
import { withTooltipProvider } from './utils';

const mockMatchMedia = (matches: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

describe('<Tooltip /> component', () => {
  const ProvidedTooltip = withProviders(withTooltipProvider(Tooltip));
  it.each`
    direction   | background
    ${'right'}  | ${'opacity'}
    ${'left'}   | ${'opacity'}
    ${'bottom'} | ${'full'}
    ${'top'}    | ${'full'}
  `(
    'renders a tooltip with the direction as $direction and background as $background',
    async ({ direction, background }: TooltipContentProps) => {
      mockMatchMedia(true);

      const { getByTestId, findByTestId } = render(
        <ProvidedTooltip>
          Hover me
          <Tooltip.Content background={background} direction={direction}>
            Some content
          </Tooltip.Content>
        </ProvidedTooltip>
      );

      fireEvent.mouseEnter(getByTestId('tooltip-container'));

      expect(await findByTestId('tooltip-content')).toMatchSnapshot();
    }
  );

  it('should hide tooltip after the hide delay', async () => {
    mockMatchMedia(true);
    jest.useFakeTimers();

    const { getByTestId, queryByTestId } = render(
      <ProvidedTooltip hideDelay={1000}>
        Hover me
        <Tooltip.Content>Some content</Tooltip.Content>
      </ProvidedTooltip>
    );

    fireEvent.mouseEnter(getByTestId('tooltip-container'));

    fireEvent.mouseLeave(getByTestId('tooltip-container'));

    jest.advanceTimersByTime(1000);

    await waitForElementToBeRemoved(() => getByTestId('tooltip-content'));

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });

  it('should not show the tooltip if the user does not have hover capability', async () => {
    mockMatchMedia(false);

    const { getByTestId, queryByTestId } = render(
      <ProvidedTooltip>
        Hover me
        <Tooltip.Content>Some content</Tooltip.Content>
      </ProvidedTooltip>
    );

    fireEvent.mouseEnter(getByTestId('tooltip-container'));

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });
});
