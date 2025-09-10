import styled from '@emotion/styled';

export const BreadcrumbStyled = styled.nav`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular}
    color: ${theme.palette.secondary.default};
    overflow: hidden;
  `}
`;

export const ListStyled = styled.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({ theme }) => theme.spacing.spacing_30};
`;

export const ItemStyled = styled.li`
  ${({ theme }) => `
    display: flex;

    &:not(:last-child) {
      ${theme.fontStyles.linkMdRegular}
      color: ${theme.palette.accent.default};
      cursor: pointer;

      svg {
        color: ${theme.palette.accent.default};
      }
      
      & * {
        text-decoration: underline;
      }
      
      &:hover {
        color: ${theme.palette.accent.dark};

        svg {
          color: ${theme.palette.accent.dark};
        }
      }
    }

    a {
      color: inherit;
    }

    svg {
      color: ${theme.palette.secondary.default};
    }

    &:last-child * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`;

export const ItemContainerStyled = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    gap: ${theme.spacing.spacing_20};
  `}
`;
