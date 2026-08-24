import { KeyboardEvent, ReactNode, useCallback, useState } from 'react';

import { AccordionStyled } from './Accordion.styled';
import { AccordionBody, AccordionHeader } from './components';

import type { BaseProps } from '@dt-dds/react-core';

export type Background = 'transparent' | 'light' | 'contrast';

export interface AccordionBaseProps extends BaseProps {
  headerContent: ReactNode;
  background?: Background;
  isDisabled?: boolean;
  hasBorderBottom?: boolean;
  className?: string;
}

type OnToggle = (isOpen: boolean) => void;

export interface AccordionControlledProps extends AccordionBaseProps {
  isOpen: boolean;
  onToggle: OnToggle;
  defaultIsOpen?: never;
}

export interface AccordionUncontrolledProps extends AccordionBaseProps {
  isOpen?: never;
  onToggle?: never;
  defaultIsOpen?: boolean;
}

export type AccordionProps =
  | AccordionControlledProps
  | AccordionUncontrolledProps;

interface AccordionComponent {
  (props: AccordionControlledProps): JSX.Element;
  (props: AccordionUncontrolledProps): JSX.Element;
}

export const Accordion: AccordionComponent = ({
  isOpen,
  defaultIsOpen = false,
  onToggle,
  headerContent,
  background = 'light',
  hasBorderBottom = false,
  isDisabled = false,
  children,
  dataTestId,
  style,
  className,
}: AccordionProps) => {
  const isControlled = isOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
  const resolvedOpen = isControlled ? isOpen : internalIsOpen;

  const handleHeaderClick = useCallback(() => {
    if (isDisabled) return;

    const nextOpen = !resolvedOpen;

    if (!isControlled) {
      setInternalIsOpen(nextOpen);
    }

    onToggle?.(nextOpen);
  }, [isDisabled, resolvedOpen, isControlled, onToggle]);

  const handleHeaderKeyPress = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        handleHeaderClick();
      }
    },
    [handleHeaderClick]
  );

  return (
    <AccordionStyled
      className={className}
      data-testid={dataTestId ?? 'accordion-container'}
      background={background}
      hasBorderBottom={hasBorderBottom}
      isDisabled={isDisabled}
      style={style}
    >
      <AccordionHeader
        handleHeaderClick={handleHeaderClick}
        handleHeaderKeyPress={handleHeaderKeyPress}
        isDisabled={isDisabled}
        isOpen={resolvedOpen}
      >
        {headerContent}
      </AccordionHeader>

      <AccordionBody isOpen={resolvedOpen}>{children}</AccordionBody>
    </AccordionStyled>
  );
};
