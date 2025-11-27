import { ReactNode, HTMLAttributes } from 'react';

import { withResponsive, type ResponsiveProps } from '@dt-dds/react-core';

import { LogoContainer } from './Logo.styled';
import { useAppHeaderContext } from '../../context';

export interface LogoProps
  extends ResponsiveProps,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const LogoBase = ({
  children,
  ...rest
}: Omit<LogoProps, keyof ResponsiveProps>) => {
  const { shouldCenterLogo, isMobile } = useAppHeaderContext();

  const shouldCenter = shouldCenterLogo && !isMobile;

  return (
    <LogoContainer shouldCenterLogo={shouldCenter} {...rest}>
      {children}
    </LogoContainer>
  );
};

LogoBase.displayName = 'AppHeader.Logo';

export const Logo = withResponsive(LogoBase);
