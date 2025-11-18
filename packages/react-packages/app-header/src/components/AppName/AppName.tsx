import { ReactNode, HTMLAttributes } from 'react';

import { Typography } from '@dt-dds/react-typography';

import { AppNameContainer } from './AppName.styled';
import { useAppHeaderContext } from '../../AppHeader';
import { withResponsive, ResponsiveProps } from '../../utils/responsive';

export interface AppNameProps
  extends ResponsiveProps,
    HTMLAttributes<HTMLDivElement> {
  name?: string;
  children?: ReactNode;
}

const AppNameBase = ({
  name,
  children,
  ...rest
}: Omit<AppNameProps, keyof ResponsiveProps>) => {
  const { state, hasAppNameAsSibling, isMobile } = useAppHeaderContext();

  const content = children ?? name;

  if (!content) {
    return null;
  }

  if (children) {
    return (
      <AppNameContainer
        hasAppNameAsSibling={hasAppNameAsSibling}
        isMobile={isMobile}
        state={state}
        {...rest}
      >
        {content}
      </AppNameContainer>
    );
  }

  return (
    <AppNameContainer
      hasAppNameAsSibling={hasAppNameAsSibling}
      isMobile={isMobile}
      state={state}
      {...rest}
    >
      <Typography
        color='primary.default'
        element='span'
        fontStyles={state.isStandard ? 'h5' : 'h5Bold'}
      >
        {content}
      </Typography>
    </AppNameContainer>
  );
};

AppNameBase.displayName = 'AppHeader.AppName';

export const AppName = withResponsive(AppNameBase);
