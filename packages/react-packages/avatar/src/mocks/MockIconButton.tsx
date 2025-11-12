import { ComponentPropsWithoutRef } from 'react';

import styled from '@emotion/styled';

const MockIconButtonStyled = styled.button(
  ({ theme }) => `
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: 'pointer';

      &:hover:not(:disabled) {
        [data-avatar-type='letter'] {
          background-color: ${theme.palette.primary.dark};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${theme.palette.primary.light};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${theme.palette.primary.dark};
        }
      }
    `
);

export interface IconButtonMockProps
  extends ComponentPropsWithoutRef<'button'> {
  isDisabled?: boolean;
  ariaLabel?: string;
  dataTestId?: string;
}

export const MockIconButton = ({
  children,
  isDisabled,
  ariaLabel,
  dataTestId,
  ...props
}: IconButtonMockProps) => {
  return (
    <MockIconButtonStyled
      aria-label={ariaLabel}
      data-testid={dataTestId || 'icon-button'}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </MockIconButtonStyled>
  );
};
