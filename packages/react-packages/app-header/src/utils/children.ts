import React, { Children, ReactNode } from 'react';

export const getDisplayName = (
  element: React.ReactElement
): string | undefined => {
  return (element.type as { displayName?: string })?.displayName;
};

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

export const findChildByTypeAndProp = <T>(
  children: ReactNode,
  type: string,
  propName: string,
  propValue: T
): React.ReactElement | null => {
  return findChildRecursive(children, (child) => {
    if (getDisplayName(child) !== type) return false;
    const props = child.props as Record<string, unknown>;
    return propName in props && props[propName] === propValue;
  });
};

export const findChildIndexByTypeAndProp = <T>(
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
    const props = child.props as Record<string, unknown>;
    return propName in props && props[propName] === propValue;
  });
};

export const extractProp = <T>(
  element: React.ReactElement | null,
  propName: string,
  defaultValue: T
): T => {
  if (!React.isValidElement(element)) {
    return defaultValue;
  }

  const props = element.props as Record<string, T | undefined>;
  return propName in props && props[propName] !== undefined
    ? (props[propName] as T)
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
