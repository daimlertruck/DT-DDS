import { useMedia } from '@dt-dds/react-core';
import { useTheme } from '@emotion/react';
import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import {
  toast,
  ToastOptions,
  Toaster as ToastProvider,
  ToasterProps as ToasterProviderProps,
} from 'react-hot-toast';

import { ToastPosition, ToastType } from './constants';
import Toast from './Toast';

const TOAST_DEFAULT_DURATION = 4000;
const TOAST_ERROR_DURATION = Infinity;
const smallPosition = ToastPosition.BottomCenter;
const defaultPosition = ToastPosition.BottomRight;

export interface EmitToastProps extends ToastOptions {
  type: ToastType;
  title: string;
  message: string;
  children?: ReactNode;
  dismissible?: boolean;
}

export const dismissToast = (id: string) => {
  toast.dismiss(id);
};

export const emitToast = ({
  type,
  title,
  message,
  children,
  dismissible,
  ...props
}: EmitToastProps) => {
  const duration =
    type === ToastType.Error ? TOAST_ERROR_DURATION : TOAST_DEFAULT_DURATION;
  toast.custom(
    (t) => {
      const clonedChildren = Children.map(children as ReactElement, (child) => {
        return (
          child &&
          cloneElement(child, {
            toastId: t.id,
            ...child.props,
          })
        );
      });

      return (
        <Toast
          dismissible={dismissible}
          id={t.id}
          isVisible={t.visible}
          message={message}
          onClose={() => toast.dismiss(t.id)}
          title={title}
          type={type}
        >
          {clonedChildren}
        </Toast>
      );
    },
    {
      duration,
      ...props,
    }
  );
};

const Toaster = ({ gutter = 8, ...props }: ToasterProviderProps) => {
  const theme = useTheme();
  const small = useMedia(`(max-width: ${theme.breakpoints.mq2}px)`);
  const position = small ? smallPosition : defaultPosition;
  const margin = small ? 8 : 16;

  return (
    <ToastProvider
      gutter={gutter}
      position={position}
      {...props}
      containerStyle={{
        bottom: 16,
        right: margin,
        top: margin,
        left: margin,
        ...props.containerStyle,
      }}
    />
  );
};

export default Toaster;
