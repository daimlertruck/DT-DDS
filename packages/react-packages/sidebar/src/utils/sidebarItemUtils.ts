import { Children, Fragment, isValidElement, ReactNode } from 'react';

import { isSidebarItemElement, isSidebarSubList } from './sidebarUtils';

// Checks if a ReactNode is a link element
export const isLinkElement = (child: ReactNode): boolean => {
  if (!isValidElement(child)) return false;

  return child.type === 'a' || 'href' in (child.props || {});
};

// Recursively finds SubList in children
export const findSubListInChildren = (node: ReactNode): boolean => {
  if (!isValidElement(node)) return false;

  if (isSidebarSubList(node)) return true;

  if (node.type === Fragment && node.props.children) {
    return Children.toArray(node.props.children).some(findSubListInChildren);
  }

  return false;
};

// Flattens children array
export const flattenChildren = (children: ReactNode): ReactNode[] => {
  return Children.toArray(children).flatMap((child) => {
    if (
      isValidElement(child) &&
      child.type === Fragment &&
      child.props.children
    ) {
      return flattenChildren(child.props.children);
    }
    return [child];
  });
};

// Partitions children into SubList and other children
export const partitionChildren = (children: ReactNode) => {
  const allChildren = flattenChildren(children);

  return allChildren.reduce<{
    subList: ReactNode[];
    otherChildren: ReactNode[];
  }>(
    (acc, child) => {
      if (findSubListInChildren(child)) {
        acc.subList.push(child);
      } else {
        acc.otherChildren.push(child);
      }
      return acc;
    },
    { subList: [], otherChildren: [] }
  );
};

// Checks if a node contains an active SidebarItem
export const containsActiveSidebarItem = (
  node: ReactNode,
  currentPath: string,
  isCurrentUrl: (href?: string, currentPath?: string) => boolean
): boolean => {
  if (!isValidElement(node)) return false;

  if (isSidebarItemElement(node)) {
    return isCurrentUrl(node.props.href, currentPath);
  }

  if (!node.props?.children) return false;
  return Children.toArray(node.props.children).some((childNode) =>
    containsActiveSidebarItem(childNode, currentPath, isCurrentUrl)
  );
};

// Checks if an event target is a link element
export const isLinkTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;

  return !!target.closest('a');
};
