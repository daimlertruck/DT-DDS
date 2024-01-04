import styled from '@emotion/styled';

import { AvatarType, AvatarSize } from './constants';

export interface AvatarStyledProps {
  type: AvatarType;
  size: AvatarSize;
}

export const AvatarStyled = styled.div<AvatarStyledProps>`
  ${({ theme, type, size }) => {
    let styles = `
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: ${theme.radius.full};
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

      default:
        '';
        break;
    }

    switch (type) {
      case AvatarType.Primary:
        styles += `
          color: ${theme.colors.white};
          
          & > * {
            background-color: ${theme.palette.primary};

            &:hover {
              background-color: ${theme.palette.primaryDark_300};
            }
          }
        `;
        break;

      case AvatarType.Secondary:
        styles += `
          color: ${theme.palette.textSecondary};
          
          & > * {
            background-color: ${theme.palette.neutralDark_100};

            &:hover {
              background-color: ${theme.palette.neutralDark_200};
            }
          }
        `;
        break;

      case AvatarType.Tertiary:
        styles += `
          color: ${theme.palette.primary};
          
          & > * {
            background-color: ${theme.colors.white};

            &:hover {
              color: ${theme.palette.primaryDark_300};
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

      default:
        '';
        break;
    }

    return styles;
  }}
`;
