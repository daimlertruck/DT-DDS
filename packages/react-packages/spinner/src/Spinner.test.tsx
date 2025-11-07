import { withProviders } from '@dt-dds/react-core';
import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('<Spinner /> component', () => {
  const ProvidedSpinner = withProviders(Spinner);

  it('should render the default options correctly', () => {
    const { container } = render(<ProvidedSpinner />);

    expect(container).toMatchSnapshot();
  });

  it('should render with custom dataTestId', () => {
    render(<ProvidedSpinner dataTestId='custom-spinner' />);

    expect(screen.getByTestId('custom-spinner')).toBeVisible();
    expect(screen.getByTestId('custom-spinner-element')).toBeVisible();
  });

  it.each([
    ['extra-small', '14px'],
    ['small', '28px'],
    ['medium', '42px'],
    ['large', '50px'],
    ['extra-large', '58px'],
  ])('should render %s size with correct dimensions', (size, expectedSize) => {
    render(<ProvidedSpinner size={size as any} />);

    const spinnerElement = screen.getByTestId('spinner-element');
    const styles = window.getComputedStyle(spinnerElement);

    expect(styles.width).toBe(expectedSize);
    expect(styles.height).toBe(expectedSize);
  });

  it('should accept and render both color scheme options', () => {
    const { rerender } = render(<ProvidedSpinner colorScheme='positive' />);
    expect(screen.getByTestId('spinner-element')).toBeVisible();

    rerender(<ProvidedSpinner colorScheme='negative' />);
    expect(screen.getByTestId('spinner-element')).toBeVisible();
  });

  it('should not render loading text by default', () => {
    render(<ProvidedSpinner />);

    expect(screen.queryByText(/loading/i)).toBeNull();
  });

  it('should render loading text when provided', () => {
    const loadingText = 'Loading...';
    render(<ProvidedSpinner loadingText={loadingText} />);

    expect(screen.getByText(loadingText)).toBeVisible();
  });

  it('should apply custom styles to container', () => {
    const customStyle = { backgroundColor: 'red', padding: '20px' };
    render(<ProvidedSpinner style={customStyle} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle({ backgroundColor: 'red', padding: '20px' });
  });

  it('should have animation applied to spinner element', () => {
    render(<ProvidedSpinner />);

    const spinnerElement = screen.getByTestId('spinner-element');
    const styles = window.getComputedStyle(spinnerElement);

    expect(styles.animation).toContain('1s');
    expect(styles.animation).toContain('infinite');
  });
});
