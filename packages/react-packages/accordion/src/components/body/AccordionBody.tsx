import { BaseProps } from '@dt-dds/react-core';

import { BodyStyled } from './AccordionBody.styled';

export interface AccordionBodyProps extends BaseProps {
  isOpen: boolean;
  id?: string;
}

export const AccordionBody = ({
  isOpen,
  id,
  children,
  dataTestId,
  style,
}: AccordionBodyProps) => (
  <BodyStyled
    aria-expanded={isOpen}
    data-testid={dataTestId ?? 'accordion-body'}
    id={id}
    isOpen={isOpen}
    style={style}
  >
    <div>{children}</div>
  </BodyStyled>
);
