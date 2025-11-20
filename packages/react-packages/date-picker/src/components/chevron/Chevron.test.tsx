import { withProviders } from '@dt-dds/react-core';
import { render } from '@testing-library/react';

import { Chevron } from './Chevron';

describe('<Chevron /> component', () => {
  const ProvidedChevron = withProviders(Chevron);

  const testCases: [
    orientation: 'up' | 'right' | 'down' | 'left',
    expectedIcon: string
  ][] = [
    ['up', 'arrow_upward'],
    ['right', 'chevron_right'],
    ['down', 'arrow_downward'],
    ['left', 'chevron_left'],
  ];

  it.each(testCases)(
    'should render chevron with orientation %s',
    (orientation, expectedIcon) => {
      const { getByTestId } = render(
        <ProvidedChevron orientation={orientation} />
      );
      expect(getByTestId('icon')).toHaveTextContent(expectedIcon);
    }
  );
});
