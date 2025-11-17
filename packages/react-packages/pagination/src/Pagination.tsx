import { BaseProps, debounce } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import React, { useEffect, useMemo, useState } from 'react';

import {
  PaginationStyled,
  InputStyled,
  LastPageStyled,
  ArrowStyled,
} from './Pagination.styled';

export interface ContentProps {
  totalPages: number;
  onClick: () => void;
}

export interface ArrowProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface PaginationInputProps {
  totalPages: number;
  onChange: (value: number) => void;
  onHandleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: number;
}

export const Pagination = ({ children, dataTestId }: BaseProps) => {
  return (
    <PaginationStyled data-testid={dataTestId ?? 'pagination-wrapper'}>
      {children}
    </PaginationStyled>
  );
};

Pagination.Content = ({ totalPages, onClick }: ContentProps) => {
  return (
    <Typography fontStyles='bodyXsRegular'>
      of{' '}
      <LastPageStyled
        data-testid='pagination-last-page'
        onClick={onClick}
        title='Go to last page'
      >
        {totalPages}
      </LastPageStyled>
    </Typography>
  );
};

Pagination.NextItem = ({ onClick, disabled }: ArrowProps) => {
  return (
    <ArrowStyled
      data-testid='pagination-next-item'
      disabled={disabled}
      onClick={onClick}
      title='Go to next page'
    >
      <Icon code='arrow_forward_ios' size='small' />
    </ArrowStyled>
  );
};

Pagination.PreviousItem = ({ onClick, disabled }: ArrowProps) => {
  return (
    <ArrowStyled
      data-testid='pagination-previous-item'
      disabled={disabled}
      onClick={onClick}
      title='Go to previous page'
    >
      <Icon code='arrow_back_ios' size='small' />
    </ArrowStyled>
  );
};

export const PaginationInput = ({
  totalPages,
  onHandleKeyDown,
  value,
  onChange,
}: PaginationInputProps) => {
  const [inputValue, setInputValue] = useState(1);
  const [hasError, setHasError] = useState(false);

  const debouncedFn = useMemo(() => debounce((fn) => fn(), 500), []);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue && inputValue <= totalPages) {
      debouncedFn(() => {
        onChange(inputValue);
      });
    }
  }, [debouncedFn, inputValue, onChange, totalPages]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputValue(value);

    if (value > totalPages || value === 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <InputStyled
      data-testid='pagination-input'
      hasError={hasError}
      onChange={handleChange}
      onKeyDown={onHandleKeyDown}
      value={inputValue}
    />
  );
};
