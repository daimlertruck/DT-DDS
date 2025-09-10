import styled from '@emotion/styled';

interface DropdownOptionStyledProps {
  disabled?: boolean;
  isSelected?: boolean;
}

export const DropdownOptionStyled = styled.li<DropdownOptionStyledProps>`
  ${({ theme, disabled, isSelected }) => `
    ${theme.fontStyles[isSelected ? 'bodyMdBold' : 'bodyMdRegular']};
    color: ${theme.palette.content.default};
    list-style: none;
    padding: ${theme.spacing.spacing_30} ${theme.spacing.spacing_50};
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
      background: ${
        disabled ? theme.palette.surface.light : theme.palette.primary.light
      };
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }

    ${
      disabled &&
      `
        color: ${theme.palette.content.light};
        background: ${theme.palette.surface.light};
      `
    }
  `}
`;
