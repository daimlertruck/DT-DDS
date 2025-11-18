import { forwardRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { BackdropStyled } from './Backdrop.styled';
import { BackdropType } from './constants';

export interface BackdropProps extends BaseProps {
  isOpen: boolean;
  type?: BackdropType;
}

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      isOpen = false,
      type = BackdropType.Dark,
      children,
      dataTestId,
    }: BackdropProps,
    ref
  ) => {
    return (
      <>
        {isOpen ? (
          <BackdropStyled
            data-testid={dataTestId ?? 'backdrop'}
            ref={ref}
            type={type}
          >
            {children}
          </BackdropStyled>
        ) : null}
      </>
    );
  }
);
