import { ReactNode, HTMLAttributes } from 'react';

import { useTheme } from '@emotion/react';

import {
  useMedia,
  withResponsive,
  type ResponsiveProps,
} from '@dt-dds/react-core';

import { ActionsContainer } from './Actions.styled';
import { useAppHeaderContext } from '../../context';

export interface ActionsProps
  extends ResponsiveProps,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position?: 'left' | 'right';
}

/**
 * AppHeader.Actions - Container for AppHeader controls such as:
 * - User profile/avatar
 * - CTA buttons
 * - Search button
 * - Hamburger menu button
 * - Multi-language selector
 * - Settings/notifications
 * - etc.
 */
const ActionsBase = ({
  children,
  position = 'right',
  ...rest
}: Omit<ActionsProps, keyof ResponsiveProps>) => {
  const theme = useTheme();
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq3}px)`);
  const { state } = useAppHeaderContext();

  return (
    <ActionsContainer
      isMobile={isMobile}
      position={position}
      state={state}
      {...rest}
    >
      {children}
    </ActionsContainer>
  );
};

ActionsBase.displayName = 'AppHeader.Actions';

export const Actions = withResponsive(ActionsBase);
