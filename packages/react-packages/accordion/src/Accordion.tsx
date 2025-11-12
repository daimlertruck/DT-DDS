import { KeyboardEvent, ReactNode, useEffect, useState } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { AccordionStyled } from './Accordion.styled';
import { AccordionHeader, AccordionBody } from './components';

export interface AccordionBaseProps extends BaseProps {
  isOpen?: boolean;
  headerContent: ReactNode;
  hasBackground?: boolean;
  isDisabled?: boolean;
  hasBorderBottom?: boolean;
  className?: string;
}

export const Accordion = ({
  isOpen = false,
  headerContent,
  hasBackground = true,
  hasBorderBottom = false,
  isDisabled = false,
  children,
  dataTestId,
  style,
  className,
}: AccordionBaseProps) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const handleHeaderClick = () => {
    if (isDisabled) {
      return;
    }

    setIsOpenState((prev) => !prev);
  };

  const handleHeaderKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleHeaderClick();
    }
  };

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  return (
    <AccordionStyled
      className={className}
      data-testid={dataTestId ?? 'accordion-container'}
      hasBackground={hasBackground}
      hasBorderBottom={hasBorderBottom}
      isDisabled={isDisabled}
      style={style}
    >
      <AccordionHeader
        handleHeaderClick={handleHeaderClick}
        handleHeaderKeyPress={handleHeaderKeyPress}
        isDisabled={isDisabled}
        isOpenState={isOpenState}
      >
        {headerContent}
      </AccordionHeader>

      <AccordionBody isOpenState={isOpenState}>{children}</AccordionBody>
    </AccordionStyled>
  );
};
