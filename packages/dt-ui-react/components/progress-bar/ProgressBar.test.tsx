import { withProviders } from '@dt-ui/react-core';
import { render } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('<ProgressBar /> component', () => {
  const ProvidedProgressBar = withProviders(ProgressBar);

  it('should render the default options correctly', () => {
    const { container } = render(
      <ProvidedProgressBar state='active' value={40} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('should render the sizes correctly', () => {
    it('should render the small size correctly when the prop is provided', () => {
      const { container } = render(
        <ProvidedProgressBar size='small' state='active' value={40} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render the large size correctly when the prop is provided', () => {
      const { container } = render(
        <ProvidedProgressBar size='large' state='active' value={40} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('should render the states correctly', () => {
    it('should render the success state correctly when the prop is provided', () => {
      const { container } = render(
        <ProvidedProgressBar state='success' value={40} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render the error state correctly when the prop is provided', () => {
      const { container } = render(
        <ProvidedProgressBar state='error' value={40} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('should render the percentage', () => {
    const { container } = render(
      <ProvidedProgressBar state='active' value={40} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the label when prop is provided', () => {
    const { container } = render(
      <ProvidedProgressBar
        label='Progress Bar Label'
        state='active'
        value={40}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the helper text when prop is provided', () => {
    const { container } = render(
      <ProvidedProgressBar
        helperText='Progress Bar Helper'
        state='active'
        value={40}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
