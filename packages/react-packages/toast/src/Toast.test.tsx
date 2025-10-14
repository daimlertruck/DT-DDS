import { withProviders } from '@dt-dds/react-core';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { toast, ToasterProps } from 'react-hot-toast';

import { emitToast, Toaster } from '..';

import { ToastType } from './constants';
import Toast from './Toast';
import { dismissToast } from './Toaster';

// Mock useMedia hook
jest.mock('@dt-dds/react-core', () => ({
  ...jest.requireActual('@dt-dds/react-core'),
  useMedia: jest.fn(),
}));

jest.useFakeTimers();

describe('<Toast /> component', () => {
  const TOAST_ID = 'myId';
  const TITLE = 'my title text';
  const MESSAGE = 'my message text';
  const onCloseFn = jest.fn();
  const ProvidedToast = withProviders(Toast);

  beforeEach(() => {
    jest.clearAllTimers();
  });

  it.each`
    type
    ${ToastType.Success}
    ${ToastType.Warning}
    ${ToastType.Info}
    ${ToastType.Error}
  `('should render toast with title & message for type $type', ({ type }) => {
    const { container } = render(
      <ProvidedToast
        id={TOAST_ID}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={type}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render toast with action buttons', () => {
    render(
      <ProvidedToast
        actions={[
          {
            onClick: () => console.log('Action 1 clicked'),
            label: 'Action 1',
          },
          {
            onClick: () => console.log('Action 2 clicked'),
            label: 'Action 2',
          },
        ]}
        id={TOAST_ID}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={ToastType.Success}
      />
    );

    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('should show close button when dismissible is true', () => {
    render(
      <ProvidedToast
        dismissible
        id={TOAST_ID}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={ToastType.Success}
      />
    );

    const closeBtn = screen.getByTestId('close-button');
    fireEvent.click(closeBtn);
    expect(onCloseFn).toHaveBeenCalled();
  });

  it('should not show close button when dismissible is false', () => {
    render(
      <ProvidedToast
        dismissible={false}
        id={TOAST_ID}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={ToastType.Success}
      />
    );

    const closeBtn = screen.queryByTestId('close-button');
    expect(closeBtn).toBeNull();
  });

  it('should dismiss toast with specified ID', () => {
    const spy = jest.spyOn(toast, 'dismiss');
    dismissToast('testToastId');
    expect(spy).toHaveBeenCalledWith('testToastId');
  });

  it('should not show toast if isVisible is false', () => {
    render(
      <ProvidedToast
        dismissible={false}
        id={TOAST_ID}
        isVisible={false}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={ToastType.Success}
      />
    );

    expect(screen.getByTestId('toast-myId')).toHaveStyleRule('opacity', '0');
  });
});

describe('emitToast', () => {
  const ProvidedToaster = withProviders(Toaster);

  beforeEach(() => {
    act(() => {
      toast.dismiss();
    });
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      toast.dismiss();
    });
  });

  it.each`
    type
    ${ToastType.Success}
    ${ToastType.Warning}
    ${ToastType.Info}
    ${ToastType.Error}
  `('should emit toast of type $type', ({ type }) => {
    const toastCustomSpy = jest.spyOn(toast, 'custom');
    const mockProps = {
      type,
      title: `Title-${type}`,
      message: `Message-${type}`,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(toastCustomSpy).toHaveBeenCalled();
    expect(screen.getByText(`Title-${type}`)).toBeInTheDocument();
    expect(screen.getByText(`Message-${type}`)).toBeInTheDocument();
  });

  it('should set infinite duration for error toasts', () => {
    const toastCustomSpy = jest.spyOn(toast, 'custom');
    const mockProps = {
      type: ToastType.Error,
      title: 'Error Title',
      message: 'Error Message',
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(toastCustomSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: Infinity,
      })
    );
    toastCustomSpy.mockRestore();
  });

  it('should set custom duration for non-error toasts', () => {
    const toastCustomSpy = jest.spyOn(toast, 'custom');
    const mockProps = {
      type: ToastType.Success,
      title: 'Success Title',
      message: 'Success Message',
      duration: 5000,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(toastCustomSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: 5000,
      })
    );
    toastCustomSpy.mockRestore();
  });

  it('should handle null and undefined children gracefully', () => {
    const ProvidedToaster = withProviders(Toaster);

    // Test null children
    const nullProps = {
      type: ToastType.Success,
      title: 'Null Test',
      message: 'Testing null children',
      children: null,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(nullProps);
    });

    expect(screen.getByText('Null Test')).toBeInTheDocument();

    // Test undefined children
    act(() => {
      toast.dismiss();
    });

    const undefinedProps = {
      type: ToastType.Success,
      title: 'Undefined Test',
      message: 'Testing undefined children',
      children: undefined,
    };

    act(() => {
      emitToast(undefinedProps);
    });

    expect(screen.getByText('Undefined Test')).toBeInTheDocument();
  });
});

describe('<Toaster /> props', () => {
  const ToasterRenderSpy = jest.fn<ToasterProps, [ToasterProps]>();
  const { useMedia }: { useMedia: jest.Mock<boolean, []> } =
    jest.requireMock('@dt-dds/react-core');

  interface RenderOptions {
    small?: boolean;
    userContainerStyle?: React.CSSProperties;
    gutter?: number;
  }

  const renderWithMocks = (options: RenderOptions = {}): ToasterProps => {
    const { small = false, userContainerStyle, gutter } = options;
    ToasterRenderSpy.mockClear();
    useMedia.mockReset();
    useMedia.mockReturnValue(small);

    let ToasterComp: React.ComponentType<Partial<ToasterProps>>;

    jest.isolateModules(() => {
      jest.doMock('react-hot-toast', () => {
        const original = jest.requireActual('react-hot-toast') as {
          Toaster: React.ComponentType<ToasterProps>;
        };
        return {
          ...original,
          Toaster: (props: ToasterProps) => {
            ToasterRenderSpy(props);
            return null;
          },
        };
      });

      jest.doMock('@emotion/react', () => ({
        ...jest.requireActual('@emotion/react'),
        useTheme: () => ({ breakpoints: { s: 600 } }),
      }));

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const module = require('./Toaster');
      ToasterComp = module.default as React.ComponentType<
        Partial<ToasterProps>
      >;
    });

    const props: Partial<ToasterProps> = {};
    if (typeof gutter !== 'undefined') props.gutter = gutter;
    if (userContainerStyle) {
      props.containerStyle = userContainerStyle;
    }

    render(<ToasterComp {...props} />);
    expect(ToasterRenderSpy).toHaveBeenCalledTimes(1);
    return ToasterRenderSpy.mock.calls[0][0];
  };

  it('should use default gutter when not provided', () => {
    const props = renderWithMocks({ small: false });
    expect(props.gutter).toBe(8);
  });

  it('should forward custom gutter prop', () => {
    const props = renderWithMocks({ small: false, gutter: 16 });
    expect(props.gutter).toBe(16);
  });

  it('should set position based on screen size', () => {
    const smallProps = renderWithMocks({ small: true });
    expect(smallProps.position).toBe('bottom-center');

    const largeProps = renderWithMocks({ small: false });
    expect(largeProps.position).toBe('bottom-right');
  });

  it('should merge container styles correctly', () => {
    const props = renderWithMocks({
      small: true,
      userContainerStyle: { top: 24, backgroundColor: 'red' },
    });

    expect(props.containerStyle).toMatchObject({
      bottom: 16,
      right: 8,
      top: 24,
      left: 8,
      backgroundColor: 'red',
    });
  });
});
