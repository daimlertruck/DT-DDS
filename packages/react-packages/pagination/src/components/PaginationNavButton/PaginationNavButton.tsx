import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';

import { PaginationButtonStyled } from '../../Pagination.styled';
import { PaginationNavButtonProps } from '../../types';

export const PaginationNavButton = ({
  ariaLabel,
  tooltipLabel,
  icon,
  targetPage,
  isDisabled,
  testId,
  onClick,
}: PaginationNavButtonProps) => {
  const button = (
    <PaginationButtonStyled
      aria-label={ariaLabel}
      data-testid={testId}
      disabled={isDisabled}
      onClick={() => onClick(targetPage)}
    >
      <Icon code={icon} size='small' />
    </PaginationButtonStyled>
  );

  if (isDisabled) return button;

  return (
    <Tooltip>
      {button}
      <Tooltip.Content background='full' direction='top'>
        {tooltipLabel}
      </Tooltip.Content>
    </Tooltip>
  );
};

PaginationNavButton.displayName = 'PaginationNavButton';
