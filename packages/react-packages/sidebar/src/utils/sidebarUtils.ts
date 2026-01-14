import {
  ReactNode,
  Children,
  isValidElement,
  ElementType,
  ReactElement,
  Fragment,
} from 'react';

import { type SidebarItemProps } from '../components/';
import {
  SIDEBAR_DEFAULT_OFFSET_POSITION,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MINI,
} from '../constants';

export const calculateSidebarWidth = (
  isMobile: boolean,
  isExpanded: boolean
): number => {
  if (isMobile || isExpanded) {
    return SIDEBAR_WIDTH;
  }
  return SIDEBAR_WIDTH_MINI;
};

export const calculateSidebarPosition = (
  isMobile: boolean,
  isExpanded: boolean
): number => {
  if (isMobile) {
    return isExpanded ? SIDEBAR_DEFAULT_OFFSET_POSITION : -SIDEBAR_WIDTH;
  }
  return SIDEBAR_DEFAULT_OFFSET_POSITION;
};

type SidebarItemElement = ReactElement<SidebarItemProps>;

// Checks if a ReactNode is a SidebarItem element
export const isSidebarItemElement = (
  child: ReactNode
): child is SidebarItemElement => {
  if (!isValidElement(child)) return false;
  const componentType = child.type as ElementType & { displayName?: string };
  if (componentType?.displayName === 'SidebarItem') return true;
  if (typeof child.type === 'function' && child.type.name === 'SidebarItem')
    return true;
  return false;
};

// Checks if a ReactNode is a SidebarSubList element
export const isSidebarSubList = (child: ReactNode): boolean => {
  if (!isValidElement(child)) return false;

  const componentType = child.type as ElementType & { displayName?: string };
  if (componentType?.displayName === 'SidebarSubList') return true;

  if (typeof child.type === 'function' && child.type.name === 'SidebarSubList')
    return true;

  return false;
};

// Finds all direct SidebarItem elements in children
const findDirectSidebarItems = (node: ReactNode): ReactNode[] => {
  const items: ReactNode[] = [];

  if (!isValidElement(node)) return items;

  if (isSidebarItemElement(node)) {
    items.push(node);
    return items;
  }

  if (node.type === Fragment && node.props?.children) {
    const fragmentChildren = Children.toArray(node.props.children);
    fragmentChildren.forEach((child) => {
      if (isValidElement(child) && isSidebarItemElement(child)) {
        items.push(child);
      }
    });
    return items;
  }

  if (node.props?.children) {
    const children = Children.toArray(node.props.children);
    children.forEach((child) => {
      if (isValidElement(child) && isSidebarItemElement(child)) {
        items.push(child);
      }
    });
  }

  return items;
};

// Checks if a ReactNode is an Icon element
export const isIconElement = (child: ReactNode): boolean => {
  if (!isValidElement(child)) return false;

  const componentType = child.type as ElementType & { displayName?: string };
  if (
    componentType?.displayName === 'Icon' ||
    componentType?.displayName === 'IconButton' ||
    componentType?.displayName === 'Sidebar.Toggle'
  )
    return true;
  if (
    typeof child.type === 'function' &&
    (child.type.name === 'Icon' ||
      child.type.name === 'IconButton' ||
      child.type.name === 'SidebarToggle')
  )
    return true;

  if (typeof child.type === 'string' && child.type === 'i') return true;
  return false;
};

// Checks if a ReactNode is a SidebarToggle element
export const isSidebarToggleElement = (child: ReactNode): boolean => {
  if (!isValidElement(child)) return false;

  const componentType = child.type as ElementType & { displayName?: string };
  if (componentType?.displayName === 'Sidebar.Toggle') return true;

  if (typeof child.type === 'function' && child.type.name === 'SidebarToggle')
    return true;

  return false;
};

// Extracts icon elements from a node tree
const extractIconsFromNode = (
  node: ReactNode,
  icons: ReactNode[] = []
): ReactNode[] => {
  if (!isValidElement(node)) return icons;

  if (isIconElement(node)) {
    icons.push(node);
    return icons;
  }

  if (isSidebarSubList(node)) return icons;

  if (isSidebarItemElement(node)) return icons;

  if (node.type === Fragment && node.props?.children) {
    const fragmentChildren = Children.toArray(node.props.children);
    fragmentChildren.forEach((child) => extractIconsFromNode(child, icons));
    return icons;
  }

  const nodeChildren = node.props?.children;
  if (nodeChildren !== undefined && nodeChildren !== null) {
    const nestedChildren = Children.toArray(nodeChildren);
    nestedChildren.forEach((child) => extractIconsFromNode(child, icons));
  }

  return icons;
};

// Extracts all icon elements from children recursively
export const extractIconsFromChildren = (
  children: ReactNode | ReactNode[]
): ReactNode[] => {
  const icons: ReactNode[] = [];
  const childrenArray = Children.toArray(children);
  childrenArray.forEach((child) => {
    extractIconsFromNode(child, icons);
  });
  return icons;
};

// Checks if any icon exists in children
const hasIconInChildren = (children: ReactNode | ReactNode[]): boolean => {
  return extractIconsFromChildren(children).length > 0;
};

// Checks if any direct SidebarItem child has an icon element
export const hasFirstItemIcon = (children: ReactNode): boolean => {
  const childrenArray = Children.toArray(children);

  return childrenArray.some((child) => {
    const directItems = findDirectSidebarItems(child);

    return directItems.some((item) => {
      if (isValidElement(item)) {
        const itemChildren = item.props.children || [];
        return hasIconInChildren(itemChildren);
      }
      return false;
    });
  });
};
