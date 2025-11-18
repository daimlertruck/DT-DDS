import { ReactNode } from 'react';

import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';

import { EmptyStateStyled, EmptyStateContentStyled } from './EmptyState.styled';

export interface EmptyStateContentProps extends Omit<BaseProps, 'children'> {
  title: string;
  description: ReactNode;
}

export const EmptyState = ({ children, dataTestId, style }: BaseProps) => (
  <EmptyStateStyled data-testid={dataTestId ?? 'empty-state'} style={style}>
    {children}
  </EmptyStateStyled>
);

EmptyState.Content = ({
  dataTestId,
  style,
  title,
  description,
}: EmptyStateContentProps) => {
  return (
    <EmptyStateContentStyled
      data-testid={dataTestId ?? 'empty-state-content'}
      style={style}
    >
      <Typography color='content.dark' element='h2' fontStyles='h4Bold'>
        {title}
      </Typography>
      <Typography color='content.default' fontStyles='bodyMdRegular'>
        {description}
      </Typography>
    </EmptyStateContentStyled>
  );
};
