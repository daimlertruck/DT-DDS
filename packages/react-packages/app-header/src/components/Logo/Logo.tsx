import { ReactNode, HTMLAttributes } from 'react';

import { LogoContainer } from './Logo.styled';
import { useAppHeaderContext } from '../../AppHeader';
import { withResponsive, ResponsiveProps } from '../../utils/responsive';

export interface LogoProps
  extends ResponsiveProps,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const LogoBase = ({
  children,
  ...rest
}: Omit<LogoProps, keyof ResponsiveProps>) => {
  const { state, shouldCenterLogo, hasAppNameAsSibling, isMobile } =
    useAppHeaderContext();

  const shouldCenter = shouldCenterLogo || (isMobile && state.isStandard);

  return (
    <LogoContainer
      hasAppNameAsSibling={hasAppNameAsSibling}
      shouldCenterLogo={shouldCenter}
      state={state}
      {...rest}
    >
      {children}
    </LogoContainer>
  );
};

LogoBase.displayName = 'AppHeader.Logo';

export const Logo = withResponsive(LogoBase);
