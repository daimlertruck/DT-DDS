import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  HTMLAttributes,
} from 'react';

import { useTheme } from '@emotion/react';

import { useMedia } from '@dt-dds/react-core';

import { AppHeaderStyled } from './AppHeader.styled';
import { COMPOUND_COMPONENT_NAMES } from './constants';
import {
  computeBarState,
  findChildByType,
  findChildByTypeAndProp,
  findChildIndexByTypeAndProp,
  extractProp,
  findChildIndices,
  shouldCenterLogo,
  areSiblings,
  groupSiblingComponents,
} from './utils';

import type { BarType, BarState } from './utils';
import type { Theme } from '@dt-dds/themes';

export type NavPosition = 'center' | 'left' | 'right';

const shouldGroupNavigationAndActions = (state: BarState): boolean => {
  if (!state.isNavRight || !state.isActionsPositionRight) {
    return false;
  }

  return state.isCompact || (state.isStandard && !state.hasAppName);
};

/**
 * Applies fixed positioning when
 * grouping Navigation and Actions with position="right".
 */
const groupNavigationAndActionsIfSiblings = (
  children: ReactNode,
  isMobile: boolean,
  theme: Theme
): ReactNode => {
  const indices = findChildIndices(children, [
    COMPOUND_COMPONENT_NAMES.NAVIGATION,
    COMPOUND_COMPONENT_NAMES.ACTIONS,
  ]);

  const navIndex = indices[COMPOUND_COMPONENT_NAMES.NAVIGATION] ?? -1;
  const actionsRightIndex = findChildIndexByTypeAndProp(
    children,
    COMPOUND_COMPONENT_NAMES.ACTIONS,
    'position',
    'right'
  );

  const areSiblingsAfterGrouping =
    navIndex !== -1 &&
    actionsRightIndex !== -1 &&
    areSiblings(navIndex, actionsRightIndex);

  if (!areSiblingsAfterGrouping) {
    return children;
  }

  return groupSiblingComponents(
    children,
    [COMPOUND_COMPONENT_NAMES.NAVIGATION, COMPOUND_COMPONENT_NAMES.ACTIONS],
    isMobile,
    {
      position: 'fixed',
      right: theme.spacing.spacing_60,
    }
  );
};

export interface AppHeaderContextValue {
  state: BarState;
  shouldCenterLogo: boolean;
  hasAppNameAsSibling: boolean;
  isMobile: boolean;
}

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  type?: BarType;
}

const AppHeaderContext = createContext<AppHeaderContextValue | null>(null);

export const useAppHeaderContext = (): AppHeaderContextValue => {
  const context = useContext(AppHeaderContext);
  if (!context) {
    throw new Error(
      'AppHeader compound components must be used within AppHeader'
    );
  }
  return context;
};

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

  const shouldCenterLogoValue = shouldCenterLogo(
    type,
    appName,
    appNameIndex,
    logoIndex
  );

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

  const state = computeBarState(
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
    let result = children;

    // Group AppName and Logo if needed
    if (hasAppNameAsSibling && state.isCompact && !isMobile) {
      result = groupSiblingComponents(
        result,
        [COMPOUND_COMPONENT_NAMES.APP_NAME, COMPOUND_COMPONENT_NAMES.LOGO],
        isMobile
      );
    }

    // Group Navigation and Actions if both are right-positioned and siblings
    if (shouldGroupNavigationAndActions(state)) {
      result = groupNavigationAndActionsIfSiblings(
        result,
        isMobile,
        theme as Theme
      );
    }

    return result;
  }, [children, hasAppNameAsSibling, state, isMobile, theme]);

  return (
    <AppHeaderContext.Provider value={contextValue}>
      <AppHeaderStyled isMobile={isMobile} style={style} {...rest}>
        {processedChildren}
      </AppHeaderStyled>
    </AppHeaderContext.Provider>
  );
};
