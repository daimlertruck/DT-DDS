import styled from '@emotion/styled';

import { AvatarType, AvatarSize } from './constants';

export interface AvatarStyledProps {
  type: AvatarType;
  size: AvatarSize;
  isActive?: boolean;
}

export const AvatarStyled = styled.div<AvatarStyledProps>`
  ${({ theme, type, size, isActive }) => {
    let styles = `
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: ${theme.radius.radius_500};
        cursor: pointer;
      }
    `;

    switch (size) {
      case AvatarSize.Small:
        styles += `
          width: 16px;
          height: 16px;
          font-size: 8px;
          line-height: 10px;
          
          & > * {
            padding: 3px 2px 2px 2px;
          }
        `;
        break;

      case AvatarSize.Medium:
        styles += `
          width: 24px;
          height: 24px;
          font-size: 10px;
          line-height: 14px;
        `;
        break;

      case AvatarSize.Large:
        styles += `
          width: 32px;
          height: 32px;
          font-size: 12px;
          line-height: 16px;
        `;
        break;
    }

    switch (type) {
      case AvatarType.Primary:
        styles += `
          color: ${theme.palette.content.contrast};
          
          & > * {
            background-color: ${
              isActive
                ? theme.palette.primary.dark
                : theme.palette.primary.default
            };

            &:hover {
              background-color: ${theme.palette.primary.dark};
            }
          }
        `;
        break;

      case AvatarType.Secondary:
        styles += `
          color: ${theme.palette.content.contrast};
          
          & > * {
            background-color: ${theme.palette.secondary.default};

            &:hover {
              background-color: ${theme.palette.secondary.dark};
            }
          }
        `;
        break;

      case AvatarType.Tertiary:
        styles += `
          color: ${theme.palette.primary.default};
          
          & > * {
            background-color: ${theme.palette.content.contrast};

            &:hover {
              background-color: ${theme.palette.primary.light};
            }
          }
        `;
        break;

      case AvatarType.Profile:
        styles += `
          & > * {
            padding: initial;
          }
        `;
        break;
    }

    return styles;
  }}
`;
