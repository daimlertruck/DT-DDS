import styled from '@emotion/styled';

import { AvatarType } from './constants';
import { AvatarSize, AvatarStyledProps } from './types';

export const AvatarStyled = styled.div<AvatarStyledProps>`
  ${({ theme, type, size }) => {
    let styles = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border-radius: ${theme.radius.radius_500};
    `;

    const sizeStyles: Record<AvatarSize, string> = {
      small: `
        width: 20px;
        height: 20px;
        ${theme.fontStyles.bodyXsBold};
      `,
      medium: `
        width: ${theme.spacing.spacing_60};
        height: ${theme.spacing.spacing_60};
        ${theme.fontStyles.bodyXsBold};
      `,
      large: `
        width: ${theme.spacing.spacing_70};
        height: ${theme.spacing.spacing_70};
        ${theme.fontStyles.bodySmBold};
      `,
    };

    styles += sizeStyles[size];

    switch (type) {
      case AvatarType.Letter:
        styles += `
          color: ${theme.palette.content.contrast};
          background-color: ${theme.palette.primary.default};
        `;
        break;

      case AvatarType.Collapsed:
        styles += `
          color: ${theme.palette.content.medium};
          background-color: ${theme.palette.content.contrast};
        `;
        break;

      case AvatarType.Thumbnail:
        styles += `
          color: ${theme.palette.content.contrast};
          background-color: ${theme.palette.primary.default};
        `;
        break;

      case AvatarType.Photo:
        styles += `
          & > * {
            width: 100%;
            height: 100%;
            border-radius: ${theme.radius.radius_500};
          }
        `;
        break;
    }

    return styles;
  }}
`;
