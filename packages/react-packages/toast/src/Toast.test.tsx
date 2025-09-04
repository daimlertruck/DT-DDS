import { withProviders } from '@dt-dds/react-core';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { toast } from 'react-hot-toast';

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
    const { container } = render(
      <ProvidedToast
        id={TOAST_ID}
        message={MESSAGE}
        onClose={onCloseFn}
        title={TITLE}
        type={ToastType.Success}
      >
        <button type='button'>Action 1</button>
        <button type='button'>Action 2</button>
      </ProvidedToast>
    );

    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
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

    const closeBtn = screen.getByRole('button');
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

    const closeBtn = screen.queryByRole('button');
    expect(closeBtn).toBeNull();
  });

  it('should dismiss toast with specified ID', () => {
    const spy = jest.spyOn(toast, 'dismiss');
    dismissToast('testToastId');
    expect(spy).toHaveBeenCalledWith('testToastId');
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
    const mockProps = {
      type,
      title: `Title-${type}`,
      message: `Message-${type}`,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

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

    const options = toastCustomSpy.mock.calls[0][1];
    expect(options.duration).toBe(Infinity);
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

    const options = toastCustomSpy.mock.calls[0][1];
    expect(options.duration).toBe(5000);
    toastCustomSpy.mockRestore();
  });

  it('should handle children in toast callback', () => {
    const toastCustomSpy = jest.spyOn(toast, 'custom');
    const mockProps = {
      type: ToastType.Success,
      title: 'Test Title',
      message: 'Test Message',
      children: <button type='button'>Test Button</button>,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(toastCustomSpy).toHaveBeenCalled();

    // Verify the callback function is called with correct parameters
    const callbackFunction = toastCustomSpy.mock.calls[0][0];
    const mockToast = { id: 'test-toast-id', visible: true };
    const result = callbackFunction(mockToast);

    expect(result).toBeDefined();
    expect(result.props.title).toBe('Test Title');
    expect(result.props.message).toBe('Test Message');
    expect(result.props.type).toBe(ToastType.Success);
    expect(result.props.children).toBeDefined();

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

describe('<Toaster /> component', () => {
  const { useMedia }: { useMedia: jest.Mock } =
    jest.requireMock('@dt-dds/react-core');

  beforeEach(() => {
    useMedia.mockReset();
  });

  it('should render with default props', () => {
    useMedia.mockReturnValue(false);
    const ProvidedToaster = withProviders(Toaster);
    const { container } = render(<ProvidedToaster />);
    expect(container).toBeInTheDocument();
  });

  it('should handle small screen breakpoint', () => {
    useMedia.mockReturnValue(true);
    const ProvidedToaster = withProviders(Toaster);
    const { container } = render(<ProvidedToaster />);
    expect(container).toBeInTheDocument();
  });

  it('should handle custom props', () => {
    useMedia.mockReturnValue(false);
    const customStyle = { backgroundColor: 'red', top: 20 };
    const ProvidedToaster = withProviders(Toaster);
    const { container } = render(
      <ProvidedToaster
        containerStyle={customStyle}
        gutter={16}
        position='top-right'
        reverseOrder
      />
    );
    expect(container).toBeInTheDocument();
  });
});

describe('<Toaster /> props', () => {
  const ToasterRenderSpy: jest.Mock = jest.fn();
  const { useMedia }: { useMedia: jest.Mock } =
    jest.requireMock('@dt-dds/react-core');

  const renderWithMocks = (
    options: {
      small?: boolean;
      userContainerStyle?: Record<string, any>;
      gutter?: number;
    } = {}
  ) => {
    const { small = false, userContainerStyle, gutter } = options;
    ToasterRenderSpy.mockClear();
    useMedia.mockReset();
    useMedia.mockReturnValue(small);

    let ToasterComp: any;

    jest.isolateModules(() => {
      jest.doMock('react-hot-toast', () => {
        const original = jest.requireActual('react-hot-toast');
        return {
          ...original,
          Toaster: (props: any) => {
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
      ToasterComp = require('./Toaster').default;
    });

    const props: any = {};
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
