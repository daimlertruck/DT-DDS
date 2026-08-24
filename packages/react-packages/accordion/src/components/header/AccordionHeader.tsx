import { KeyboardEvent } from 'react';

import { useTheme } from '@emotion/react';

import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { HeaderStyled } from './AccordionHeader.styled';

export interface AccordionHeaderProps extends BaseProps {
  handleHeaderClick: () => void;
  handleHeaderKeyPress: (e: KeyboardEvent<HTMLDivElement>) => void;
  isOpen: boolean;
  isDisabled: boolean;
}

export const AccordionHeader = ({
  handleHeaderClick,
  handleHeaderKeyPress,
  isOpen,
  isDisabled,
  children,
  dataTestId,
  style,
}: AccordionHeaderProps) => {
  const theme = useTheme();

  return (
    <HeaderStyled
      aria-disabled={isDisabled}
      aria-expanded={isOpen}
      data-testid={dataTestId ?? 'accordion-header'}
      onClick={handleHeaderClick}
      onKeyDown={handleHeaderKeyPress}
      role='button'
      style={style}
      tabIndex={isDisabled ? -1 : 0}
    >
      {children}
      <Icon
        code={isOpen ? 'unfold_less' : 'unfold_more'}
        color={theme.palette.content.dark}
        size='large'
      />
    </HeaderStyled>
  );
};
