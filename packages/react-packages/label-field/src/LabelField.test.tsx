import { withProviders } from '@dt-dds/react-core';
import { render } from '@testing-library/react';

import { LabelField } from './LabelField';

describe('<LabelField /> component', () => {
  const ProvidedLabelField = withProviders(LabelField);
  const INPUT_ID = 'input-id';

  describe('when the LabelField is active', () => {
    it('it should render a small font-size and -45º translation', () => {
      const { container } = render(
        <>
          <ProvidedLabelField htmlFor={INPUT_ID} isActive>
            My Awesome Input
          </ProvidedLabelField>
          <input id={INPUT_ID} />
        </>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the LabelField is inactive', () => {
    it('it should render a bigger font-size and 0 translation', () => {
      const { container } = render(
        <>
          <ProvidedLabelField htmlFor={INPUT_ID} isActive={false}>
            My Awesome Input
          </ProvidedLabelField>
          <input id={INPUT_ID} />
        </>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('it renders a disabled label field', () => {
    const { container } = render(
      <>
        <ProvidedLabelField htmlFor={INPUT_ID} isDisabled>
          My Awesome Input
        </ProvidedLabelField>
        <input id={INPUT_ID} />
      </>
    );

    expect(container).toMatchSnapshot();
  });

  it('it renders a label field as error', () => {
    const { getByTestId } = render(
      <>
        <ProvidedLabelField hasError htmlFor={INPUT_ID}>
          My Awesome Input
        </ProvidedLabelField>
        <input id={INPUT_ID} />
      </>
    );

    const LabelField = getByTestId('label-field');

    expect(LabelField).toHaveStyle('color: rgb(160, 0, 0)');
  });

  it('it renders a label field as required', () => {
    const { container } = render(
      <>
        <ProvidedLabelField htmlFor={INPUT_ID} isRequired>
          My Awesome Input
        </ProvidedLabelField>
        <input id={INPUT_ID} />
      </>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render label not floating and active', () => {
    const { getByTestId } = render(
      <>
        <ProvidedLabelField htmlFor={INPUT_ID} isActive isFloating={false}>
          My Awesome Input
        </ProvidedLabelField>
        <input id={INPUT_ID} />
      </>
    );

    const labelField = getByTestId('label-field');

    expect(labelField).toHaveStyle('color: rgb(0, 141, 252)');
  });
});
