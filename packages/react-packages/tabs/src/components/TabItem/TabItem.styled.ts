import styled from '@emotion/styled';

import { Variant } from '../../types';

interface TabItemStyledProps {
  active?: boolean;
  variant: Variant;
}

export const TabItemStyled = styled.button<TabItemStyledProps>`
  border: none;
  display: flex;
  align-items: center;

  ${({ theme, active, disabled, variant }) => `
    ${active ? theme.fontStyles.bodyMdBold : theme.fontStyles.bodyMdRegular}
    ${
      variant === 'default'
        ? `
          background-color: transparent;
          ${
            active
              ? `border-bottom: 2px solid ${theme.palette.accent.default};`
              : ''
          }
          `
        : `
          background-color: ${
            active ? theme.palette.surface.contrast : 'transparent'
          };`
    }
    
    color: ${
      disabled ? theme.palette.content.light : theme.palette.accent.default
    };
    padding: ${theme.spacing.spacing_40} ${theme.spacing.s};
    cursor: ${active ? 'default' : disabled ? 'not-allowed' : 'pointer'};
    white-space: nowrap;
    gap: ${theme.spacing.spacing_30};
    
    ${
      !active &&
      !disabled &&
      `
        &:hover {
          background-color: ${theme.palette.accent.light};
        }        
      `
    }
  `}
`;
