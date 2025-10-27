import { Tooltip } from '@dt-dds/react-tooltip';
import { useState } from 'react';

import { AvatarThumbnail } from '../../../dt-dds-react/core';

import { AvatarStyled, AvatarStyledProps } from './Avatar.styled';
import { AvatarType, AvatarSize } from './constants';
import { acronymGenerator } from './utils';

export interface AvatarProps extends AvatarStyledProps {
  title: string;
  imageSrc?: string;
  dataTestId?: string;
  customInitials?: string;
  hasTooltip?: boolean;
  isActive?: boolean;
}

const Avatar = ({
  title,
  type = AvatarType.Primary,
  size = AvatarSize.Medium,
  imageSrc = '',
  dataTestId,
  customInitials,
  hasTooltip = true,
  isActive = false,
}: AvatarProps) => {
  const [showThumbnail, setShowThumbnail] = useState(false);

  const handleImageError = () => {
    setShowThumbnail(true);
  };

  const renderProfileImage = () => {
    if (showThumbnail) {
      return <AvatarThumbnail />;
    }
    return <img alt={title} onError={handleImageError} src={imageSrc} />;
  };

  const renderAvatarContent = () => {
    return (
      <AvatarStyled
        data-testid={dataTestId ?? 'avatar'}
        size={size}
        type={type}
        isActive={isActive}
      >
        {type === AvatarType.Profile ? (
          renderProfileImage()
        ) : (
          <div>
            {customInitials
              ? customInitials.substring(0, 2)
              : acronymGenerator(title)}
          </div>
        )}
      </AvatarStyled>
    );
  };

  return hasTooltip ? (
    <Tooltip>
      {renderAvatarContent()}
      <Tooltip.Content>{title}</Tooltip.Content>
    </Tooltip>
  ) : (
    renderAvatarContent()
  );
};

export default Avatar;
