import { TOAST_Z_INDEX, useMedia } from '@dt-dds/react-core';
import { useTheme } from '@emotion/react';
import {
  toast,
  ToasterProps as ToasterProviderProps,
  ToastOptions,
  Toaster as ToastProvider,
} from 'react-hot-toast';

import { Action, ToastPosition, ToastType } from './constants';
import Toast from './Toast';

const TOAST_DEFAULT_DURATION = 4000;
const TOAST_ERROR_DURATION = Infinity;
const smallPosition = ToastPosition.BottomCenter;
const defaultPosition = ToastPosition.BottomRight;

export interface EmitToastProps extends ToastOptions {
  type: ToastType;
  title: string;
  message: string;
  actions?: [Action] | [Action, Action];
  dismissible?: boolean;
}

export const dismissToast = (id: string) => {
  toast.dismiss(id);
};

export const emitToast = ({
  type,
  title,
  message,
  actions,
  dismissible,
  ...props
}: EmitToastProps) => {
  const duration =
    type === ToastType.Error ? TOAST_ERROR_DURATION : TOAST_DEFAULT_DURATION;

  toast.custom(
    (t) => {
      return (
        <Toast
          actions={actions}
          dismissible={dismissible}
          id={t.id}
          isVisible={t.visible}
          message={message}
          onClose={() => toast.dismiss(t.id)}
          title={title}
          type={type}
        />
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
        zIndex: TOAST_Z_INDEX,
      }}
    />
  );
};

export default Toaster;
