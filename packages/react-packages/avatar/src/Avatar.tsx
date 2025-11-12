import { useState } from 'react';

import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';

import { AvatarStyled } from './Avatar.styled';
import { AvatarType } from './constants';
import { AvatarProps } from './types';
import { acronymGenerator } from './utils';

export const Avatar = ({
  title,
  type = AvatarType.Letter,
  size = 'medium',
  imageSrc = '',
  dataTestId,
  customInitials,
  collapsedCount = '+1',
  hasTooltip = false,
  style,
}: AvatarProps) => {
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageError = () => {
    setHasImageError(true);
  };

  const shouldRenderPhotoFallback =
    type === AvatarType.Photo && (hasImageError || !imageSrc);

  const thumbnailIcon = <Icon code='person' color='primary' size={size} />;

  const renderImage = () => {
    if (shouldRenderPhotoFallback) {
      return thumbnailIcon;
    }

    return <img alt={title} onError={handleImageError} src={imageSrc} />;
  };

  const contentMap = {
    [AvatarType.Photo]: renderImage(),
    [AvatarType.Thumbnail]: thumbnailIcon,
    [AvatarType.Collapsed]: collapsedCount.substring(0, 3),
    [AvatarType.Letter]: customInitials
      ? customInitials.substring(0, 2)
      : acronymGenerator(title),
  };

  const renderAvatarContent = () => {
    const avatarType = shouldRenderPhotoFallback ? AvatarType.Thumbnail : type;

    return (
      <AvatarStyled
        data-avatar-type={avatarType}
        data-testid={dataTestId ?? 'avatar'}
        size={size}
        style={style}
        type={avatarType}
      >
        {contentMap[type]}
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
