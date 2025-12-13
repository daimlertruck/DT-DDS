import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';

import { useTheme } from '@emotion/react';

import { Icon } from '@dt-dds/react-icon';

import {
  CheckboxStyled,
  CheckboxInputStyled,
  CheckboxLabelStyled,
  CheckboxBoxStyled,
} from './Checkbox.styled';
import { CheckboxProps } from './types';
import { mergeRefs } from './utils';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      dataTestId = 'checkbox',
      onChange,
      isChecked = false,
      isDisabled = false,
      isIndeterminate = false,
      hasError = false,
      size = 'large',
      label,
      children,
      style,
      id,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const internalRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = mergeRefs(internalRef, ref);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      onChange?.(event);
    };

    const hasLabel = Boolean(label || children);
    const inputId = id || (hasLabel ? dataTestId : undefined);
    const iconCode = isIndeterminate ? 'remove' : isChecked ? 'check' : null;
    const iconSize = size === 'small' ? 'medium' : 'large';

    return (
      <CheckboxStyled
        $disabled={isDisabled}
        data-testid={dataTestId}
        htmlFor={inputId}
        style={style}
      >
        <CheckboxInputStyled
          aria-checked={isIndeterminate ? 'mixed' : undefined}
          aria-invalid={hasError}
          aria-label={!hasLabel ? ariaLabel || 'Checkbox' : undefined}
          checked={isChecked}
          disabled={isDisabled}
          id={inputId}
          onChange={handleChange}
          ref={mergedRef}
          type='checkbox'
          {...rest}
        />

        <CheckboxBoxStyled
          $checked={isChecked}
          $disabled={isDisabled}
          $error={hasError}
          $indeterminate={isIndeterminate}
          $size={size}
        >
          {iconCode ? (
            <Icon
              code={iconCode}
              color={theme.palette.content.contrast}
              size={iconSize}
            />
          ) : null}
        </CheckboxBoxStyled>

        {hasLabel ? (
          <CheckboxLabelStyled $disabled={isDisabled} $size={size}>
            {label || children}
          </CheckboxLabelStyled>
        ) : null}
      </CheckboxStyled>
    );
  }
);

Checkbox.displayName = 'Checkbox';
