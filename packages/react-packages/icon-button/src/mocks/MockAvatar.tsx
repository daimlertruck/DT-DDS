import { Icon } from '@dt-dds/react-icon';
import { theme } from '@dt-dds/themes';
import styled from '@emotion/styled';
import React from 'react';

export type MockAvatarType = 'letter' | 'photo' | 'collapsed' | 'thumbnail';
export type MockAvatarSize = 'small' | 'medium' | 'large';

interface MockProps {
  type?: MockAvatarType;
  size?: MockAvatarSize;
  text?: string;
  src?: string;
  style?: React.CSSProperties;
}

const MockAvatarStyled = styled.div<Omit<MockProps, 'text' | 'src' | 'style'>>`
  ${({ type, size = 'medium' }) => {
    let styles = `
      width: 100%; height: 100%; display: flex; 
      align-items: center; justify-content: center;
      text-transform: uppercase; overflow: hidden;
      border-radius: ${theme.radius.radius_500};
    `;

    const sizeMap: Record<MockAvatarSize, string> = {
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
    styles += sizeMap[size];

    switch (type) {
      case 'letter':
      case 'thumbnail':
        styles += `
          color: ${theme.palette.content.contrast};
          background-color: ${theme.palette.primary.default};
        `;
        break;
      case 'collapsed':
        styles += `
          color: ${theme.palette.content.medium};
          background-color: ${theme.palette.content.contrast};
        `;
        break;
    }

    return styles;
  }}
`;

export const MockAvatar = ({
  type = 'letter',
  size = 'medium',
  text,
  src,
  style,
}: MockProps) => {
  let content: React.ReactNode = text;
  const iconSize = size === 'large' ? 'medium' : 'small';

  if (type === 'thumbnail') {
    content = <Icon code='person' color='contrast' size={iconSize} />;
  } else if (type === 'photo' && src) {
    content = (
      <img
        alt=''
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <MockAvatarStyled
      data-avatar-type={type}
      size={size}
      style={style}
      type={type}
    >
      {content}
    </MockAvatarStyled>
  );
};
