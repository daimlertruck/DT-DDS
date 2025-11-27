import { ReactNode, HTMLAttributes } from 'react';

import { withResponsive, type ResponsiveProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';

import { AppNameContainer } from './AppName.styled';
import { useAppHeaderContext } from '../../context';

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
  const { state, isMobile } = useAppHeaderContext();

  const isStandardFontStyles = state.isStandard ? 'h5' : 'h5Bold';
  const fontStyles = !isMobile ? isStandardFontStyles : 'h6Bold';

  const content = children ?? name;

  if (!content) {
    return null;
  }

  if (children) {
    return (
      <AppNameContainer isMobile={isMobile} state={state} {...rest}>
        {content}
      </AppNameContainer>
    );
  }

  return (
    <AppNameContainer isMobile={isMobile} state={state} {...rest}>
      <Typography
        color='primary.default'
        element='span'
        fontStyles={fontStyles}
      >
        {content}
      </Typography>
    </AppNameContainer>
  );
};

AppNameBase.displayName = 'AppHeader.AppName';

export const AppName = withResponsive(AppNameBase);
