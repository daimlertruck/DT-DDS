import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';

import { CardStyled, CardTitleStyled, CardDetailStyled } from './Card.styled';

export const Card = ({ children, dataTestId }: BaseProps) => (
  <CardStyled data-testid={dataTestId ?? 'card'}>{children}</CardStyled>
);

Card.Title = ({ children }: BaseProps) => {
  return (
    <CardTitleStyled>
      <Typography color='grey_90' element='h2' fontStyles='h4'>
        {children}
      </Typography>
    </CardTitleStyled>
  );
};

Card.Detail = ({ children }: BaseProps) => {
  return <CardDetailStyled>{children}</CardDetailStyled>;
};
