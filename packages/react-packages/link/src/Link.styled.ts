import styled from '@emotion/styled';

import { LinkSize, LinkColor, LinkVariant } from '.';

interface LinkStyledProps {
  disabled?: boolean;
  size?: LinkSize;
  variant?: LinkVariant;
  color?: LinkColor;
}

export const LinkStyled = styled.a<LinkStyledProps>`
  ${({ theme, disabled, size, variant = 'standalone', color = 'accent' }) => {
    const linkColor = variant === 'inline' ? 'accent' : color;

    return `
    color: ${theme.palette[linkColor].default};
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.spacing_20};


    ${
      size == 'large' &&
      `
        ${theme.fontStyles.bodyLgBold}
      `
    };

    ${
      size == 'medium' &&
      `
        ${theme.fontStyles.bodyMdBold}
      `
    };

    ${
      size == 'small' &&
      `
        ${theme.fontStyles.bodySmBold}
      `
    };

    ${
      disabled &&
      `
        color: ${theme.palette[linkColor].light};
        cursor: not-allowed;

      ${
        variant === 'inline' &&
        `       
          text-decoration: underline;
        `
      }
      `
    };

    ${
      !disabled &&
      `
       ${
         variant === 'inline'
           ? ` 
           text-decoration: underline;
            
           &:hover {
             color: ${theme.palette[linkColor].medium};
           }
         `
           : `
        &:hover {
          text-decoration: underline;
        }
        
        &:has(span):hover {
          text-decoration: none; 
          
          span {
            text-decoration: underline;
          }
        }

        &:active {
          color: ${theme.palette[linkColor].dark};
          text-decoration: none;
        }`
       }
      `
    };

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
    }
  `;
  }}
`;
