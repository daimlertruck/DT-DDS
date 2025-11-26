import styled from '@emotion/styled';

export const DropdownOptionStyled = styled.li`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular};

    display: block;
    color: ${theme.palette.content.default};
    padding: ${theme.spacing.spacing_40} ${theme.spacing.spacing_50};   
    list-style: none;
    text-overflow: ellipsis;
    overflow-x: hidden;
    text-wrap: nowrap;

    &:not([aria-disabled="true"]) {
      &[aria-selected="true"], &[aria-selected="true"] span {
        ${theme.fontStyles.bodyMdBold};
      }

      &:hover, &[data-highlighted="true"] {
        background: ${theme.palette.accent.light};
        cursor: pointer;
      }

      &:focus-visible {
        outline: 2px solid ${theme.palette.primary.default};
        outline-offset: -2px; 
      }
    }

    &[aria-disabled="true"] {
      color: ${theme.palette.content.light};
      cursor: not-allowed;

      &[aria-selected="true"] {
        background-color: ${theme.palette.surface.light};
      }
    }
  `}
`;
