import { useMemo, HTMLAttributes } from 'react';

import { useTheme } from '@emotion/react';

import { useMedia } from '@dt-dds/react-core';

import { AppHeaderStyled } from './AppHeader.styled';
import { COMPOUND_COMPONENT_NAMES } from './constants';
import { AppHeaderContextProvider } from './context';
import {
  computeHeaderState,
  findChildByType,
  findChildByTypeAndProp,
  extractProp,
  findChildIndices,
  shouldCenterLogo,
  areSiblings,
  groupSiblingComponents,
  shouldGroupNavigationAndActions,
  groupNavigationAndActionsIfSiblings,
} from './utils';

import type { NavPosition } from './components/Navigation';
import type { AppHeaderContextValue } from './context';
import type { HeaderType } from './utils';
import type { Theme } from '@dt-dds/themes';

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  type?: HeaderType;
}

export const AppHeader = ({
  type = 'standard',
  style,
  children,
  ...rest
}: AppHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq3}px)`);

  const navPosition = extractProp<NavPosition>(
    findChildByType(children, COMPOUND_COMPONENT_NAMES.NAVIGATION),
    'position',
    'center'
  );

  const appName = extractProp<string | undefined>(
    findChildByType(children, COMPOUND_COMPONENT_NAMES.APP_NAME),
    'name',
    undefined
  );

  const childIndices = findChildIndices(children, [
    COMPOUND_COMPONENT_NAMES.APP_NAME,
    COMPOUND_COMPONENT_NAMES.LOGO,
    COMPOUND_COMPONENT_NAMES.NAVIGATION,
    COMPOUND_COMPONENT_NAMES.ACTIONS,
  ]);

  const appNameIndex = childIndices[COMPOUND_COMPONENT_NAMES.APP_NAME] ?? -1;
  const logoIndex = childIndices[COMPOUND_COMPONENT_NAMES.LOGO] ?? -1;

  const shouldCenterLogoValue = shouldCenterLogo(type, appName);

  const hasAppNameAsSibling =
    appNameIndex !== -1 &&
    logoIndex !== -1 &&
    areSiblings(appNameIndex, logoIndex);

  const hasActionsPositionRight =
    findChildByTypeAndProp(
      children,
      COMPOUND_COMPONENT_NAMES.ACTIONS,
      'position',
      'right'
    ) !== null;

  const state = computeHeaderState(
    type,
    navPosition,
    appName,
    hasActionsPositionRight
  );

  const contextValue: AppHeaderContextValue = useMemo(
    () => ({
      state,
      shouldCenterLogo: shouldCenterLogoValue,
      hasAppNameAsSibling,
      isMobile,
    }),
    [state, shouldCenterLogoValue, hasAppNameAsSibling, isMobile]
  );

  const processedChildren = useMemo(() => {
    // Group AppName and Logo
    let result = groupSiblingComponents(
      children,
      [COMPOUND_COMPONENT_NAMES.APP_NAME, COMPOUND_COMPONENT_NAMES.LOGO],
      isMobile
    );

    // Group Navigation and Actions if both are right-positioned and siblings
    if (shouldGroupNavigationAndActions(state)) {
      result = groupNavigationAndActionsIfSiblings(
        result,
        isMobile,
        theme as Theme
      );
    }

    return result;
  }, [children, state, isMobile, theme]);

  return (
    <AppHeaderContextProvider value={contextValue}>
      <AppHeaderStyled isMobile={isMobile} style={style} {...rest}>
        {processedChildren}
      </AppHeaderStyled>
    </AppHeaderContextProvider>
  );
};
