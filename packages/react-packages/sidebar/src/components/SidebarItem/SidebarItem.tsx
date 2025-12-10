import {
  HTMLAttributes,
  ReactNode,
  useState,
  useMemo,
  useId,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react';

import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';

import {
  SidebarItemStyled,
  SidebarItemHeaderStyled,
  SidebarItemBodyStyled,
} from './SidebarItem.styled';
import {
  useSectionContext,
  useSidebarContext,
  useSubListContext,
} from '../../context';
import { useLocationPath, useDisclosureState } from '../../hooks';
import {
  isCurrentUrl,
  partitionChildren,
  containsActiveSidebarItem,
  isLinkTarget,
  renderContent,
} from '../../utils';

import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarItemProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  href?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  children: ReactNode;
}

export const SidebarItem = ({
  href,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  children,
  dataTestId,
  style,
  ...rest
}: SidebarItemProps) => {
  const { isExpanded: isSidebarExpanded, isMobile } = useSidebarContext();
  const sectionVariant = useSectionContext();
  const isNested = useSubListContext();
  const collapseToIcons = !isMobile && !isSidebarExpanded;

  const [isSidebarJustExpanded, setIsSidebarJustExpanded] = useState(false);
  const prevCollapseToIcons = useRef(collapseToIcons);

  useEffect(() => {
    if (prevCollapseToIcons.current && !collapseToIcons) {
      setIsSidebarJustExpanded(true);

      const timeout = setTimeout(() => {
        setIsSidebarJustExpanded(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    prevCollapseToIcons.current = collapseToIcons;
  }, [collapseToIcons]);

  const { subList, otherChildren } = useMemo(
    () => partitionChildren(children),
    [children]
  );

  const currentPath = useLocationPath();

  const isActive = useMemo(
    () => isCurrentUrl(href, currentPath),
    [href, currentPath]
  );

  const hasActiveDescendant = useMemo(() => {
    if (!subList.length) return false;
    return subList.some((node) =>
      containsActiveSidebarItem(node, currentPath, isCurrentUrl)
    );
  }, [subList, currentPath]);

  const shouldAutoExpand =
    (isActive && subList.length > 0) || hasActiveDescendant;
  const autoExpandKey = shouldAutoExpand
    ? [href ?? '', currentPath, String(hasActiveDescendant)].join('|')
    : null;

  const { expanded, toggle } = useDisclosureState({
    controlledExpanded,
    defaultExpanded: defaultExpanded || shouldAutoExpand,
    onToggle,
    shouldAutoExpand,
    autoExpandKey,
  });

  const submenuId = useId();
  const headerId = useId();
  const showDisclosure = subList.length > 0 && !collapseToIcons;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isLinkTarget(event.target)) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  const handleHeaderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isLinkTarget(event.target)) {
      return;
    }
    toggle();
  };

  const handleToggleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    toggle();
  };

  const handleToggleButtonKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    }
  };

  if (subList.length > 0) {
    const toggleIconCode = expanded
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';

    const headerContent = renderContent(
      otherChildren,
      href,
      isActive,
      collapseToIcons,
      isNested,
      sectionVariant
    );

    if (collapseToIcons && !headerContent) {
      return null;
    }

    return (
      <SidebarItemStyled
        as='li'
        data-testid={dataTestId ?? 'sidebar-item'}
        style={style}
        {...rest}
      >
        <SidebarItemHeaderStyled
          aria-controls={showDisclosure ? submenuId : undefined}
          aria-expanded={showDisclosure ? expanded : undefined}
          id={`header-${headerId}`}
          isActive={isActive}
          isInteractive={showDisclosure}
          isNested={isNested}
          isSidebarCollapsed={collapseToIcons}
          onClick={showDisclosure ? handleHeaderClick : undefined}
          onKeyDown={showDisclosure ? handleKeyDown : undefined}
          role={showDisclosure ? 'button' : undefined}
          sectionVariant={sectionVariant}
          tabIndex={showDisclosure ? 0 : undefined}
        >
          {headerContent}
          {showDisclosure ? (
            <IconButton
              aria-controls={submenuId}
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse submenu' : 'Expand submenu'}
              onClick={handleToggleButtonClick}
              onKeyDown={handleToggleButtonKeyDown}
              style={{
                display: 'flex',
                width: collapseToIcons ? 'auto' : '100%',
                height: 'auto',
                justifyContent: 'flex-end',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon code={toggleIconCode} />
            </IconButton>
          ) : null}
        </SidebarItemHeaderStyled>
        {showDisclosure ? (
          <SidebarItemBodyStyled
            aria-hidden={!expanded}
            aria-labelledby={headerId}
            id={submenuId}
            isExpanded={expanded}
            isSidebarJustExpanded={isSidebarJustExpanded}
          >
            <div>{subList}</div>
          </SidebarItemBodyStyled>
        ) : null}
      </SidebarItemStyled>
    );
  }

  const headerContent = renderContent(
    children,
    href,
    isActive,
    collapseToIcons,
    isNested,
    sectionVariant
  );

  if (collapseToIcons && !headerContent) {
    return null;
  }

  return (
    <SidebarItemStyled
      as='li'
      data-testid={dataTestId ?? 'sidebar-item'}
      style={style}
      {...rest}
    >
      <SidebarItemHeaderStyled
        isActive={isActive}
        isInteractive={false}
        isNested={isNested}
        isSidebarCollapsed={collapseToIcons}
        sectionVariant={sectionVariant}
      >
        {headerContent}
      </SidebarItemHeaderStyled>
    </SidebarItemStyled>
  );
};

SidebarItem.displayName = 'SidebarItem';
