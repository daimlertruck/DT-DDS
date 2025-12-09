import { Children, isValidElement, ReactNode } from 'react';

import { Tooltip } from '@dt-dds/react-tooltip';

import { isIconElement, isSidebarToggleElement } from './sidebarUtils';
import { SidebarItemTextContent } from '../components/SidebarItem/SidebarItem.styled';

import type { SectionVariant } from '../types';

// Extracts the first string content from children array
export const extractTextContent = (
  children: ReactNode[]
): string | undefined => {
  const directString = children.find(
    (child): child is string => typeof child === 'string'
  );
  if (directString) {
    return directString;
  }

  for (const child of children) {
    if (isSidebarToggleElement(child)) return 'Expand sidebar';

    if (isValidElement(child) && child.props.children) {
      const nestedChildren = Children.toArray(child.props.children);
      const nestedString = nestedChildren.find(
        (nested): nested is string => typeof nested === 'string'
      );
      if (nestedString) {
        return nestedString;
      }
    }
  }

  return undefined;
};

// Separates the first icon from the rest of the content
export const partitionIconAndContent = (
  children: ReactNode
): { firstIcon: ReactNode | null; textContent: ReactNode[] } => {
  const childrenArray = Children.toArray(children);
  const firstIconIndex = childrenArray.findIndex(isIconElement);

  if (firstIconIndex === -1) {
    return { firstIcon: null, textContent: childrenArray };
  }

  const firstIcon = childrenArray[firstIconIndex];
  const textContent = [
    ...childrenArray.slice(0, firstIconIndex),
    ...childrenArray.slice(firstIconIndex + 1),
  ];

  return { firstIcon, textContent };
};

// Wraps text content in styled component for animation
export const wrapTextContent = (
  textContent: ReactNode[],
  isSidebarCollapsed?: boolean
): ReactNode | null =>
  textContent.length > 0 ? (
    <SidebarItemTextContent isSidebarCollapsed={isSidebarCollapsed}>
      {textContent}
    </SidebarItemTextContent>
  ) : null;

// Conditionally wraps content in a Tooltip with text appearing on the right
export const wrapWithTooltip = (
  content: ReactNode,
  tooltipText?: string
): ReactNode =>
  tooltipText ? (
    <Tooltip>
      {content}
      <Tooltip.Content background='full' direction='right'>
        {tooltipText}
      </Tooltip.Content>
    </Tooltip>
  ) : (
    content
  );

// Factory helpers for wrapper components
export const createWrapperProps = (
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
) => ({
  isActive,
  isSidebarCollapsed,
  isNested,
  sectionVariant,
});

export const createLinkWrapperProps = (
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
) => ({
  isActive,
  isSidebarCollapsed,
  isNested,
  sectionVariant,
});

export const createLinkStyledProps = (
  href?: string,
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
) => ({
  href,
  isActive,
  isSidebarCollapsed,
  isNested,
  sectionVariant,
  ...(href && isActive && { 'aria-current': 'page' as const }),
});
