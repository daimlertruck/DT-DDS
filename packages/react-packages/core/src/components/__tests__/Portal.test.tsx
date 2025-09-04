/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from '@testing-library/react';

import { Portal } from '../Portal';

jest.mock('react-dom', () => ({
  createPortal: jest.fn((children: any) => children),
}));

describe('Portal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when isOpen is true', () => {
    render(
      <Portal isOpen>
        <div data-testid='portal-content'>Portal Content</div>
      </Portal>
    );

    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  it('should not render children when isOpen is false', () => {
    render(
      <Portal isOpen={false}>
        <div data-testid='portal-content'>Portal Content</div>
      </Portal>
    );

    expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument();
  });

  it('should call createPortal with correct parameters when isOpen is true', () => {
    const { createPortal } = require('react-dom');
    const children = <div>Test Content</div>;

    render(<Portal isOpen>{children}</Portal>);

    expect(createPortal).toHaveBeenCalledWith(children, document.body);
  });

  it('should not call createPortal when isOpen is false', () => {
    const { createPortal } = require('react-dom');

    render(
      <Portal isOpen={false}>
        <div>Test Content</div>
      </Portal>
    );

    expect(createPortal).not.toHaveBeenCalled();
  });
});
