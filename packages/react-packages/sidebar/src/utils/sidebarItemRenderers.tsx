import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import {
  createLinkStyledProps,
  createLinkWrapperProps,
  extractTextContent,
  partitionIconAndContent,
  wrapTextContent,
  wrapWithTooltip,
} from './sidebarItemContent';
import { isLinkElement } from './sidebarItemUtils';
import { extractIconsFromChildren, isIconElement } from './sidebarUtils';
import { SidebarItemLinkStyled } from '../components/SidebarItem/SidebarItem.styled';

import type { SectionVariant } from '../types';

// Renders collapsed content
export const renderCollapsed = (
  content: ReactNode,
  href?: string,
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
): ReactNode | null => {
  const childrenArray = Children.toArray(content);
  const hasLinkChild = childrenArray.some(isLinkElement);

  if (hasLinkChild) {
    const linkElement = childrenArray.find(isLinkElement);
    if (!linkElement || !isValidElement(linkElement)) {
      return null;
    }

    const linkChildren = linkElement.props.children;
    if (linkChildren === undefined || linkChildren === null) {
      return null;
    }

    const iconOnlyContent = extractIconsFromChildren(linkChildren);
    if (iconOnlyContent.length === 0) {
      return null;
    }

    const clonedLink = cloneElement(
      linkElement,
      isActive ? { 'aria-current': 'page' as const } : {},
      iconOnlyContent
    );
    const tooltipText = extractTextContent(Children.toArray(linkChildren));

    const color = isActive ? 'accent.default' : 'content.dark';
    const fontStyles = isActive && !isNested ? 'bodyLgBold' : 'bodyLgRegular';

    const wrappedLink = (
      <SidebarItemLinkStyled
        color={color}
        element='span'
        fontStyles={fontStyles}
        isDynamicLink
        {...createLinkWrapperProps(
          isActive,
          isSidebarCollapsed,
          isNested,
          sectionVariant
        )}
      >
        {clonedLink}
      </SidebarItemLinkStyled>
    );

    return wrapWithTooltip(wrappedLink, tooltipText);
  }

  const iconOnlyContent = childrenArray.filter(isIconElement);
  if (iconOnlyContent.length === 0) {
    return null;
  }

  const tooltipText = extractTextContent(childrenArray);
  const element = href ? 'a' : 'span';
  const color = isActive ? 'accent.default' : 'content.dark';
  const fontStyles = isActive && !isNested ? 'bodyLgBold' : 'bodyLgRegular';

  const styledLink = (
    <SidebarItemLinkStyled
      color={color}
      element={element}
      fontStyles={fontStyles}
      isDynamicLink={false}
      {...createLinkStyledProps(
        href,
        isActive,
        isSidebarCollapsed,
        isNested,
        sectionVariant
      )}
    >
      {iconOnlyContent}
    </SidebarItemLinkStyled>
  );

  return wrapWithTooltip(styledLink, tooltipText);
};

// Renders expanded content
export const renderExpanded = (
  content: ReactNode,
  href?: string,
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
): ReactNode => {
  const childrenArray = Children.toArray(content);
  const hasLinkChild = childrenArray.some(isLinkElement);

  const color = isActive ? 'accent.default' : 'content.dark';
  const footerFontStyles =
    sectionVariant === 'footer' ? 'bodyLgBold' : 'bodyLgRegular';
  const fontStyles = isActive && !isNested ? 'bodyLgBold' : footerFontStyles;

  if (hasLinkChild) {
    const linkElement = childrenArray.find(isLinkElement);
    if (!linkElement || !isValidElement(linkElement)) {
      const { firstIcon, textContent } = partitionIconAndContent(content);
      const wrappedTextContent = wrapTextContent(
        textContent,
        isSidebarCollapsed
      );
      const element = href ? 'a' : 'span';

      return (
        <SidebarItemLinkStyled
          color={color}
          element={element}
          fontStyles={fontStyles}
          isDynamicLink={false}
          {...createLinkStyledProps(
            href,
            isActive,
            isSidebarCollapsed,
            isNested,
            sectionVariant
          )}
        >
          {firstIcon}
          {wrappedTextContent}
        </SidebarItemLinkStyled>
      );
    }

    const nonLinkChildren = childrenArray.filter(
      (child) => !isLinkElement(child)
    );

    const linkChildren = Children.toArray(linkElement.props.children);
    const { firstIcon, textContent } = partitionIconAndContent(linkChildren);
    const wrappedTextContent = wrapTextContent(textContent, isSidebarCollapsed);

    const structuredLinkChildren = (
      <>
        {firstIcon}
        {wrappedTextContent}
      </>
    );

    const clonedLink = cloneElement(
      linkElement,
      isActive ? { 'aria-current': 'page' as const } : {},
      structuredLinkChildren
    );

    return (
      <SidebarItemLinkStyled
        color={color}
        element='span'
        fontStyles={fontStyles}
        isDynamicLink
        {...createLinkWrapperProps(
          isActive,
          isSidebarCollapsed,
          isNested,
          sectionVariant
        )}
      >
        {clonedLink}
        {nonLinkChildren}
      </SidebarItemLinkStyled>
    );
  }

  const { firstIcon, textContent } = partitionIconAndContent(content);
  const wrappedTextContent = wrapTextContent(textContent, isSidebarCollapsed);
  const element = href ? 'a' : 'span';

  return (
    <SidebarItemLinkStyled
      color={color}
      element={element}
      fontStyles={fontStyles}
      isDynamicLink={false}
      {...createLinkStyledProps(
        href,
        isActive,
        isSidebarCollapsed,
        isNested,
        sectionVariant
      )}
    >
      {firstIcon}
      {wrappedTextContent}
    </SidebarItemLinkStyled>
  );
};

// Renders main content
export const renderContent = (
  content: ReactNode,
  href?: string,
  isActive?: boolean,
  isSidebarCollapsed?: boolean,
  isNested?: boolean,
  sectionVariant?: SectionVariant
): ReactNode => {
  if (isSidebarCollapsed) {
    return renderCollapsed(
      content,
      href,
      isActive,
      isSidebarCollapsed,
      isNested,
      sectionVariant
    );
  }

  return renderExpanded(
    content,
    href,
    isActive,
    isSidebarCollapsed,
    isNested,
    sectionVariant
  );
};
