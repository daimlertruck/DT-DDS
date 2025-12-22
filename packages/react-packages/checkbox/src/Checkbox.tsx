import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import { useTheme } from '@emotion/react';

import { Icon } from '@dt-dds/react-icon';

import {
  CheckboxStyled,
  CheckboxInputStyled,
  CheckboxLabelStyled,
  CheckboxBoxStyled,
} from './Checkbox.styled';
import { LABEL_LINE_HEIGHT, LABEL_HEIGHT_BUFFER } from './constants';
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
    const labelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    useLayoutEffect(() => {
      if (!labelRef.current) return;

      const labelContainer = labelRef.current.closest('label');
      if (!labelContainer) return;

      const el = labelRef.current;
      const maxSingleLineHeight = LABEL_LINE_HEIGHT[size] + LABEL_HEIGHT_BUFFER;

      const isWrapped = el.offsetHeight > maxSingleLineHeight;

      labelContainer.style.alignItems = isWrapped ? 'flex-start' : 'center';
    }, [label, children]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      onChange?.(event);
    };

    const getIconCode = () => {
      if (isIndeterminate) return 'remove';
      if (isChecked) return 'check';
      return null;
    };

    const hasLabel = Boolean(label || children);
    const inputId = id || (hasLabel ? dataTestId : undefined);
    const iconCode = getIconCode();
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
          data-testid='checkbox-box'
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
          <CheckboxLabelStyled
            $disabled={isDisabled}
            $size={size}
            ref={labelRef}
          >
            {label || children}
          </CheckboxLabelStyled>
        ) : null}
      </CheckboxStyled>
    );
  }
);

Checkbox.displayName = 'Checkbox';
