import styled from '@emotion/styled';

import { Typography } from '@dt-dds/react-typography';
import { CustomTheme as Theme } from '@dt-dds/themes';

import {
  SIDEBAR_DEFAULT_TRANSITION,
  SIDEBAR_WIDTH_MAX_TEXT_LENGTH,
} from '../../constants';

import type { SectionVariant } from '../../types';

export const SidebarItemStyled = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SidebarItemHeaderStyled = styled.div<{
  isActive?: boolean;
  isSidebarCollapsed?: boolean;
  isInteractive?: boolean;
  isNested?: boolean;
  sectionVariant?: SectionVariant;
}>`
  ${({
    theme,
    isActive,
    isSidebarCollapsed,
    isInteractive = true,
    isNested = false,
    sectionVariant,
  }) => {
    const padding = isNested
      ? `${theme.spacing.spacing_30} ${theme.spacing.spacing_80}`
      : `${theme.spacing.spacing_30} ${theme.spacing.spacing_60}`;

    // To compensate for the scrollbar width
    const paddingRight = `${
      isSidebarCollapsed ? 'auto' : theme.spacing.spacing_30
    }`;

    const justifyContent = `${isSidebarCollapsed ? 'center' : 'space-between'}`;

    return `
      cursor: ${isInteractive ? 'pointer' : 'default'};
      display: flex;
      align-items: center;
      padding: ${padding};
      padding-right: ${paddingRight};
      color: ${
        isActive ? theme.palette.accent.default : theme.palette.content.default
      };
      justify-content: ${justifyContent};

      &[role="button"] {
        justify-content: ${justifyContent};
      }

      ${
        sectionVariant === 'default' &&
        `
        transition: ${SIDEBAR_DEFAULT_TRANSITION};

        &:hover,
        &:focus-visible,
        &:active {
          background-color: ${theme.palette.accent.light};
        }
      `
      }
    `;
  }}
`;

// Item body (Sublist container)
export const SidebarItemBodyStyled = styled.div<{
  isExpanded: boolean;
  isSidebarJustExpanded?: boolean;
}>`
  ${({ isExpanded, isSidebarJustExpanded }) => {
    const shouldDelay = isSidebarJustExpanded && isExpanded;

    return `
      display: grid;
      grid-template-rows: ${isExpanded ? '1fr' : '0fr'};
      transition: ${SIDEBAR_DEFAULT_TRANSITION};
      overflow: hidden;

      & > * {
        min-height: 0;
        opacity: ${shouldDelay ? '0' : isExpanded ? '1' : '0'};
        visibility: ${
          shouldDelay ? 'hidden' : isExpanded ? 'visible' : 'hidden'
        };
        ${
          shouldDelay
            ? `
          transition: none;
          animation: fadeInDelayed 0s ease-in-out 0s forwards;
          @keyframes fadeInDelayed {
            from {
              opacity: 0;
              visibility: hidden;
            }
            to {
              opacity: 1;
              visibility: visible;
            }
          }
        `
            : `
          transition: ${SIDEBAR_DEFAULT_TRANSITION};
        `
        }
      }
    `;
  }}
`;

// Default Item link styles
const defaultSidebarItemLinkStyles = ({
  theme,
  isActive,
  isSidebarCollapsed,
  sectionVariant,
}: {
  theme: Theme;
  isActive?: boolean;
  isSidebarCollapsed?: boolean;
  isNested?: boolean;
  sectionVariant?: SectionVariant;
}) => `
  display: flex;
  align-items: center;
  width: ${isSidebarCollapsed ? 'auto' : '100%'};
  gap: ${theme.spacing.spacing_40};
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: ${SIDEBAR_DEFAULT_TRANSITION};

  ${
    sectionVariant === 'header'
      ? `
        justify-content: space-between;
        flex-direction: row-reverse;

        &:has(> :only-child:not(button)) {
          flex-direction: row;
        }

        svg,
        img {
          max-height: 24px;
          width: auto;
        }
      `
      : ''
  }
  ${
    isSidebarCollapsed
      ? `
        justify-content: center;
        padding: ${theme.spacing.spacing_10};
      `
      : ''
  }

  > i:first-of-type {
    opacity: 1;
    visibility: visible;
    color: ${
      isActive ? theme.palette.accent.default : theme.palette.content.dark
    };

    transition: ${SIDEBAR_DEFAULT_TRANSITION};
  }

  &:hover,
  &:focus-visible,
  &:active,
  &:hover > i:first-of-type {
    color: ${theme.palette.accent.default};
  }
`;

export const SidebarItemLinkStyled = styled(Typography)<{
  isActive?: boolean;
  isSidebarCollapsed?: boolean;
  isDynamicLink?: boolean;
  isNested?: boolean;
  sectionVariant?: SectionVariant;
}>`
  ${({
    theme,
    isActive,
    isSidebarCollapsed,
    isDynamicLink,
    isNested,
    sectionVariant,
  }) =>
    isDynamicLink
      ? `
      > a,
      > *[href] {
        ${defaultSidebarItemLinkStyles({
          theme,
          isActive,
          isSidebarCollapsed,
          isNested,
          sectionVariant,
        })}
      }
    `
      : defaultSidebarItemLinkStyles({
          theme,
          isActive,
          isSidebarCollapsed,
          isNested,
          sectionVariant,
        })}
`;

// Item text content wrapper
export const SidebarItemTextContent = styled.span<{
  isSidebarCollapsed?: boolean;
}>`
  ${({ isSidebarCollapsed }) => `
    max-width: ${SIDEBAR_WIDTH_MAX_TEXT_LENGTH}px;
    opacity: ${isSidebarCollapsed ? '0' : '1'};
    visibility: ${isSidebarCollapsed ? 'hidden' : 'visible'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;
