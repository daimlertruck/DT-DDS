import React, { ReactNode } from 'react';

import { Box } from '@dt-dds/react-box';
import { theme } from '@dt-dds/themes';

import { COMPOUND_COMPONENT_NAMES } from '../constants';
import {
  findChildIndices,
  findChildIndexByTypeAndProp,
  getDisplayName,
} from './children';

import type { HeaderState } from './headerState';
import type { Theme } from '@dt-dds/themes';

export const areSiblings = (index1: number, index2: number): boolean => {
  return Math.abs(index1 - index2) === 1;
};

export const groupSiblingComponents = (
  children: ReactNode,
  componentNames: readonly string[],
  isMobile: boolean,
  additionalStyles?: React.CSSProperties
): ReactNode[] => {
  const childrenArray = React.Children.toArray(children);
  const result: ReactNode[] = [];
  let i = 0;

  while (i < childrenArray.length) {
    const child = childrenArray[i];
    const nextChild =
      i + 1 < childrenArray.length ? childrenArray[i + 1] : null;

    if (React.isValidElement(child) && React.isValidElement(nextChild)) {
      const currentName = getDisplayName(child);
      const nextName = getDisplayName(nextChild);

      const shouldGroup =
        currentName &&
        nextName &&
        componentNames.includes(currentName) &&
        componentNames.includes(nextName) &&
        areSiblings(i, i + 1);

      if (shouldGroup) {
        result.push(
          <Box
            key={`group-${i}`}
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              height: isMobile ? '48px' : 'auto',
              gap: isMobile
                ? theme.spacing.spacing_0
                : theme.spacing.spacing_30,
              ...additionalStyles,
            }}
          >
            {child}
            {nextChild}
          </Box>
        );
        i += 2;
        continue;
      }
    }

    result.push(child);
    i++;
  }

  return result;
};

export const shouldGroupNavigationAndActions = (
  state: HeaderState
): boolean => {
  if (!state.isNavRight || !state.isActionsPositionRight) {
    return false;
  }

  return state.isCompact || (state.isStandard && !state.hasAppName);
};

/**
 * Applies fixed positioning when
 * grouping Navigation and Actions with position="right".
 * Accepts either ReactNode or ReactNode[] and always returns ReactNode[].
 */
export const groupNavigationAndActionsIfSiblings = (
  children: ReactNode | ReactNode[],
  isMobile: boolean,
  themeInstance: Theme
): ReactNode[] => {
  const normalizedChildren: ReactNode = children;

  const indices = findChildIndices(normalizedChildren, [
    COMPOUND_COMPONENT_NAMES.NAVIGATION,
    COMPOUND_COMPONENT_NAMES.ACTIONS,
  ]);

  const navIndex = indices[COMPOUND_COMPONENT_NAMES.NAVIGATION] ?? -1;
  const actionsRightIndex = findChildIndexByTypeAndProp(
    normalizedChildren,
    COMPOUND_COMPONENT_NAMES.ACTIONS,
    'position',
    'right'
  );

  const areSiblingsAfterGrouping =
    navIndex !== -1 &&
    actionsRightIndex !== -1 &&
    areSiblings(navIndex, actionsRightIndex);

  if (!areSiblingsAfterGrouping) {
    return Array.isArray(children)
      ? children
      : React.Children.toArray(children);
  }

  return groupSiblingComponents(
    normalizedChildren,
    [COMPOUND_COMPONENT_NAMES.NAVIGATION, COMPOUND_COMPONENT_NAMES.ACTIONS],
    isMobile,
    {
      position: 'fixed',
      right: themeInstance.spacing.spacing_60,
    }
  );
};
