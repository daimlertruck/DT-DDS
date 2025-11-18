import React, { ReactNode, Children } from 'react';

import { Box } from '@dt-dds/react-box';
import { theme } from '@dt-dds/themes';

export type BarType = 'standard' | 'compact';

export interface BarState {
  isStandard: boolean;
  isCompact: boolean;
  isNavCenter: boolean;
  isNavLeft: boolean;
  isNavRight: boolean;
  isNavCompact: boolean;
  hasAppName: boolean;
  isActionsPositionRight: boolean;
}

export const computeBarState = (
  type: BarType,
  navPosition: 'center' | 'left' | 'right',
  appName: string | undefined,
  hasActionsPositionRight: boolean
): BarState => ({
  isStandard: type === 'standard',
  isCompact: type === 'compact',
  isNavCenter: navPosition === 'center',
  isNavLeft: navPosition === 'left',
  isNavRight: navPosition === 'right',
  isNavCompact: type === 'compact' || !appName,
  hasAppName: !!appName,
  isActionsPositionRight: hasActionsPositionRight,
});

export const getDisplayName = (
  element: React.ReactElement
): string | undefined => {
  return (element.type as any)?.displayName;
};

/**
 * Recursively searches through children to find a matching element.
 * Returns the first element that matches the predicate, or null if none found.
 */
const findChildRecursive = (
  children: ReactNode,
  matcher: (element: React.ReactElement) => boolean
): React.ReactElement | null => {
  const childrenArray = Children.toArray(children);

  for (const child of childrenArray) {
    if (React.isValidElement(child)) {
      if (matcher(child)) {
        return child;
      }

      const childProps = child.props as { children?: ReactNode };
      if (childProps?.children) {
        const found = findChildRecursive(childProps.children, matcher);
        if (found) {
          return found;
        }
      }
    }
  }

  return null;
};

export const findChildByType = (
  children: ReactNode,
  type: string
): React.ReactElement | null => {
  return findChildRecursive(
    children,
    (child) => getDisplayName(child) === type
  );
};

export const findChildByTypeAndProp = <T,>(
  children: ReactNode,
  type: string,
  propName: string,
  propValue: T
): React.ReactElement | null => {
  return findChildRecursive(children, (child) => {
    if (getDisplayName(child) !== type) return false;
    const props = child.props as any;
    return propName in props && props[propName] === propValue;
  });
};

/**
 * Finds the index of a child component by type and prop value.
 * Returns -1 if not found.
 */
export const findChildIndexByTypeAndProp = <T,>(
  children: ReactNode,
  type: string,
  propName: string,
  propValue: T
): number => {
  const childrenArray = Children.toArray(children);
  return childrenArray.findIndex((child) => {
    if (!React.isValidElement(child)) return false;
    const displayName = getDisplayName(child);
    if (displayName !== type) return false;
    const props = child.props as any;
    return propName in props && props[propName] === propValue;
  });
};

export const extractProp = <T,>(
  element: React.ReactElement | null,
  propName: string,
  defaultValue: T
): T => {
  if (!React.isValidElement(element)) {
    return defaultValue;
  }

  const props = element.props as any;
  return propName in props && props[propName] !== undefined
    ? props[propName]
    : defaultValue;
};

export const findChildIndices = (
  children: ReactNode,
  targetNames: readonly string[]
): Record<string, number> => {
  const indices: Record<string, number> = {};
  const childrenArray = Children.toArray(children);

  childrenArray.forEach((child, index) => {
    if (React.isValidElement(child)) {
      const displayName = getDisplayName(child);
      if (displayName && targetNames.includes(displayName)) {
        indices[displayName] = index;
      }
    }
  });

  return indices;
};

export const areSiblings = (index1: number, index2: number): boolean => {
  return Math.abs(index1 - index2) === 1;
};

export const shouldCenterLogo = (
  type: 'standard' | 'compact',
  appName: string | undefined,
  appNameIndex: number,
  logoIndex: number
): boolean => {
  return (
    type === 'standard' &&
    !!appName &&
    appNameIndex !== -1 &&
    logoIndex !== -1 &&
    appNameIndex < logoIndex
  );
};

export const groupSiblingComponents = (
  children: ReactNode,
  componentNames: readonly string[],
  isMobile: boolean,
  additionalStyles?: React.CSSProperties
): ReactNode[] => {
  const childrenArray = Children.toArray(children);
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
              flexFlow: 'row nowrap',
              alignItems: 'center',
              gap: isMobile
                ? theme.spacing.spacing_20
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
