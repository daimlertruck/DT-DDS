import {
  useMemo,
  useCallback,
  HTMLAttributes,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useTheme } from '@emotion/react';

import { useMedia } from '@dt-dds/react-core';

import {
  SidebarBackdrop,
  SidebarDivider,
  SidebarSection,
  SidebarItem,
  SidebarSubList,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarToggle,
} from './components';
import {
  SIDEBAR_DEFAULT_PLACEMENT,
  SIDEBAR_MOBILE_PLACEMENT,
  SIDEBAR_DEFAULT_OFFSET_TOP,
  SIDEBAR_BACKDROP_SHOW_DELAY,
  SIDEBAR_BACKDROP_HIDE_DELAY,
} from './constants';
import { SidebarContextValue, SidebarContextProvider } from './context';
import { SidebarStyled } from './Sidebar.styled';

import type { SidebarPlacement } from './types';
import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarProps extends BaseProps, HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  isExpanded: boolean;
  offsetTop?: number;
  placement?: SidebarPlacement;
  onToggle?: (expanded: boolean) => void;
}

export const Sidebar = ({
  dataTestId,
  offsetTop = 0,
  children,
  ariaLabel,
  style,
  isExpanded,
  placement = SIDEBAR_DEFAULT_PLACEMENT,
  onToggle,
  ...rest
}: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq3}px)`);

  // Backdrop visibility and sidebar expansion state for animation
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [shouldShowSidebar, setShouldShowSidebar] = useState(
    !isMobile && isExpanded
  );
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isMobile) {
      setIsBackdropVisible(false);
      setShouldShowSidebar(isExpanded);
      return;
    }

    if (isExpanded) {
      setIsBackdropVisible(true);
      timeoutRef.current = window.setTimeout(() => {
        setShouldShowSidebar(true);
      }, SIDEBAR_BACKDROP_SHOW_DELAY);
    } else {
      setShouldShowSidebar(false);
      timeoutRef.current = window.setTimeout(() => {
        setIsBackdropVisible(false);
      }, SIDEBAR_BACKDROP_HIDE_DELAY);
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isExpanded, isMobile]);

  // Handle Escape key to close sidebar
  useEffect(() => {
    if (!isMobile || !isExpanded) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onToggle?.(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobile, isExpanded, onToggle]);

  const handleToggle = useCallback(() => {
    onToggle?.(!isExpanded);
  }, [onToggle, isExpanded]);

  const contextValue: SidebarContextValue = useMemo(
    () => ({
      isExpanded,
      isMobile,
      onToggle: handleToggle,
    }),
    [isExpanded, isMobile, handleToggle]
  );

  return (
    <SidebarContextProvider value={contextValue}>
      {isMobile ? (
        <SidebarBackdrop
          dataTestId='mobile-backdrop'
          isOpen={isBackdropVisible}
          onBackdropClick={handleToggle}
        >
          <SidebarStyled
            aria-label={ariaLabel}
            data-testid={dataTestId}
            isExpanded={shouldShowSidebar}
            isMobile={isMobile}
            offsetTop={SIDEBAR_DEFAULT_OFFSET_TOP}
            placement={SIDEBAR_MOBILE_PLACEMENT}
            style={style}
            {...rest}
          >
            {children}
          </SidebarStyled>
        </SidebarBackdrop>
      ) : (
        <SidebarStyled
          aria-label={ariaLabel}
          data-testid={dataTestId}
          isExpanded={isExpanded}
          isMobile={isMobile}
          offsetTop={offsetTop}
          placement={placement}
          style={style}
          {...rest}
        >
          {children}
        </SidebarStyled>
      )}
    </SidebarContextProvider>
  );
};

Sidebar.Content = SidebarContent;
Sidebar.Divider = SidebarDivider;
Sidebar.Section = SidebarSection;
Sidebar.Item = SidebarItem;
Sidebar.SubList = SidebarSubList;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Toggle = SidebarToggle;
