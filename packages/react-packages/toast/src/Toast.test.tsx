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
  `(
    'should render a toast with title & message when type $type',
    ({ type }) => {
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
    }
  );

  it.each`
    type
    ${ToastType.Success}
    ${ToastType.Warning}
    ${ToastType.Info}
    ${ToastType.Error}
  `(
    'should render a toast with title & message & action Buttons when type $type',
    ({ type }) => {
      const { container } = render(
        <ProvidedToast
          id={TOAST_ID}
          message={MESSAGE}
          onClose={onCloseFn}
          title={TITLE}
          type={type}
        >
          <button type='button'>Text</button>
          <button type='button'>Text2</button>
        </ProvidedToast>
      );

      const button1 = screen.getByText('Text', { exact: true });
      const button2 = screen.getByText('Text2', { exact: true });
      expect(button1).toBeDefined();
      expect(button2).toBeDefined();
      expect(container).toMatchSnapshot();
    }
  );

  describe('Close button on Toast ', () => {
    it.each`
      type
      ${ToastType.Success}
      ${ToastType.Warning}
      ${ToastType.Info}
      ${ToastType.Error}
    `(
      'with dismissible as true should fire the mock function when type $type',
      ({ type }) => {
        render(
          <ProvidedToast
            dismissible
            id={TOAST_ID}
            message={MESSAGE}
            onClose={onCloseFn}
            title={TITLE}
            type={type}
          />
        );

        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);

        expect(onCloseFn).toBeCalled();
      }
    );

    it.each`
      type
      ${ToastType.Success}
      ${ToastType.Warning}
      ${ToastType.Info}
      ${ToastType.Error}
    `(
      'with dismissible is false should not be able to find the close button when type $type',
      ({ type }) => {
        render(
          <ProvidedToast
            dismissible={false}
            id={TOAST_ID}
            message={MESSAGE}
            onClose={onCloseFn}
            title={TITLE}
            type={type}
          />
        );

        const closeBtn = screen.queryByRole('button');
        expect(closeBtn).toBeNull();
      }
    );
  });

  it('dismisses the toast with the specified ID when dismissToast function is called', () => {
    const spy = jest.spyOn(toast, 'dismiss');

    dismissToast('testToastId');

    expect(spy).toHaveBeenCalledWith('testToastId');
  });
});

describe('emitToast', () => {
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
  `('should emit the toast of type $type', async ({ type }) => {
    const ProvidedToaster = withProviders(Toaster);

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

  test('should emit the toast of type error and have a close button', async () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Error,
      title: 'Error Title',
      message: 'Error Message',
    };

    render(<ProvidedToaster />);

    act(() => {
      void emitToast(mockProps);
    });

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error Message')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    fireEvent.click(buttons[0]);

    expect(buttons[0]).toBeInTheDocument();
  });

  it('should emit toast with children and clone them with toastId', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Children',
      message: 'Message with Children',
      children: <button type='button'>Action Button</button>,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('should emit toast with multiple children and clone them', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Multiple Children',
      message: 'Message with Multiple Children',
      children: [
        <button key='1' type='button'>
          Button 1
        </button>,
        <button key='2' type='button'>
          Button 2
        </button>,
      ],
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('should emit toast with custom duration', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Custom Duration',
      message: 'Message with Custom Duration',
      duration: 5000,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Title with Custom Duration')).toBeInTheDocument();
  });

  it('should emit toast with dismissible prop', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Dismissible',
      message: 'Message with Dismissible',
      dismissible: true,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Title with Dismissible')).toBeInTheDocument();
    // Use getAllByRole to get all buttons and check that at least one exists
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle null children in emitToast', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Null Children',
      message: 'Message with Null Children',
      children: null,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Title with Null Children')).toBeInTheDocument();
    expect(screen.getByText('Message with Null Children')).toBeInTheDocument();
  });

  it('should handle undefined children in emitToast', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Title with Undefined Children',
      message: 'Message with Undefined Children',
      children: undefined,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(
      screen.getByText('Title with Undefined Children')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Message with Undefined Children')
    ).toBeInTheDocument();
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

  it('forwards gutter prop', () => {
    const props = renderWithMocks({ small: false, gutter: 16 });
    expect(props.gutter).toBe(16);
  });

  it('uses default gutter=8 when not provided', () => {
    const props = renderWithMocks({ small: false });
    expect(props.gutter).toBe(8);
  });

  it('sets position bottom-center on small screens, bottom-right otherwise', () => {
    const smallProps = renderWithMocks({ small: true });
    expect(smallProps.position).toBe('bottom-center');

    const largeProps = renderWithMocks({ small: false });
    expect(largeProps.position).toBe('bottom-right');
  });

  it('computes containerStyle margins and merges user styles', () => {
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

describe('emitToast with Children.map functionality', () => {
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

  it('should handle single child element in Children.map', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Single Child Test',
      message: 'Testing single child',
      children: <button type='button'>Single Button</button>,
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Single Button')).toBeInTheDocument();
  });

  it('should handle array of children in Children.map', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Array Children Test',
      message: 'Testing array of children',
      children: [
        <button key='1' type='button'>
          First Button
        </button>,
        <button key='2' type='button'>
          Second Button
        </button>,
        <button key='3' type='button'>
          Third Button
        </button>,
      ],
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('First Button')).toBeInTheDocument();
    expect(screen.getByText('Second Button')).toBeInTheDocument();
    expect(screen.getByText('Third Button')).toBeInTheDocument();
  });

  it('should handle mixed children types in Children.map', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Mixed Children Test',
      message: 'Testing mixed children types',
      children: [
        <button key='1' type='button'>
          Button
        </button>,
        <span key='2'>Text Span</span>,
        <div key='3'>Div Element</div>,
      ],
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Text Span')).toBeInTheDocument();
    expect(screen.getByText('Div Element')).toBeInTheDocument();
  });

  it('should handle children with existing props in cloneElement', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Props Test',
      message: 'Testing children with existing props',
      children: (
        <button
          className='existing-class'
          data-testid='test-button'
          type='button'
        >
          Button with Props
        </button>
      ),
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Button with Props')).toBeInTheDocument();
  });

  it('should handle children with complex nested structure', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Complex Children Test',
      message: 'Testing complex nested children',
      children: (
        <div>
          <button type='button'>Nested Button</button>
          <span>Nested Text</span>
        </div>
      ),
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Nested Button')).toBeInTheDocument();
    expect(screen.getByText('Nested Text')).toBeInTheDocument();
  });

  it('should test the conditional child rendering in Children.map', () => {
    const ProvidedToaster = withProviders(Toaster);

    const mockProps = {
      type: ToastType.Success,
      title: 'Conditional Child Test',
      message: 'Testing conditional child rendering',
      children: false ? (
        <button type='button'>Hidden Button</button>
      ) : (
        <button type='button'>Visible Button</button>
      ),
    };

    render(<ProvidedToaster />);

    act(() => {
      emitToast(mockProps);
    });

    expect(screen.getByText('Visible Button')).toBeInTheDocument();
  });
});
