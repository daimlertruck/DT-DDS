import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import { Children, ReactElement, useEffect } from 'react';

import { useDropdownContext } from '../../context';
import { DropdownFill, DropdownVariant } from '../../types';
import { DropdownMenu } from '../menu/DropdownMenu';

import { SelectDropdownStyled } from './DropdownSelect.styled';

export type DropdownSelectProps = {
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  hasBorder?: boolean;
  hasError?: boolean;
  hasDeselect?: boolean;
  variant?: DropdownVariant;
  fill?: DropdownFill;
} & BaseProps;

export const DropdownSelect = ({
  children,
  label,
  style,
  dataTestId = 'dropdown-select',
  isDisabled = false,
  isRequired,
  hasBorder = true,
  hasError = false,
  hasDeselect = false,
  variant = 'outlined',
  fill = 'default',
}: DropdownSelectProps) => {
  const { state, setState, isOpen, setIsOpen } = useDropdownContext();
  const theme = useTheme();

  const childCount = Children.count(children);
  const hasOneChild = childCount === 1;
  const disabled = isDisabled || hasOneChild;
  const disabledIconColor = disabled
    ? theme.palette.content.light
    : theme.palette.content.default;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsOpen((prev) => !prev);
  };

  const handleDeselectClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setState({ text: '', value: '' });
  };

  useEffect(() => {
    const hasOption = Children.toArray(children).find(
      (child) => (child as ReactElement).props.option.value === state.value
    );

    if (!hasOption) {
      setState({ text: '', value: '' });
    }
  }, [children, setState, state.value]);

  useEffect(() => {
    if (hasOneChild) {
      const options = Children.map(
        children,
        (child) => child && (child as ReactElement).props.option
      );

      if (options && options[0]) {
        const option = {
          text: options[0].text ?? options[0].value,
          value: options[0].value,
        };

        setState(option);
      }
    }
  }, [hasOneChild, setState, children]);

  return (
    <>
      <SelectDropdownStyled
        data-testid={dataTestId}
        disabled={disabled}
        fill={fill}
        hasBorder={hasBorder}
        hasError={hasError}
        isOpen={isOpen}
        onClick={handleClick}
        style={style}
        variant={variant}
      >
        <div style={{ overflow: 'hidden' }}>
          <Typography
            color={disabled ? 'content.light' : 'content.default'}
            fontStyles='bodySmRegular'
          >
            {label}
            {isRequired ? (
              <Typography
                color='error.default'
                element='span'
                fontStyles='bodySmRegular'
              >
                *
              </Typography>
            ) : null}
          </Typography>
          <Typography
            color={disabled ? 'content.light' : 'content.default'}
            fontStyles='bodyMdRegular'
            style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {!state.value ? 'Select an option' : state.text}
          </Typography>
        </div>
        <Box style={{ flexDirection: 'row', gap: '0.5rem' }}>
          {hasDeselect && !!state.value ? (
            <IconButton onClick={handleDeselectClick}>
              <Icon
                code='close'
                color={disabledIconColor}
                dataTestId='deselect-value'
                size='s'
              />
            </IconButton>
          ) : null}
          <Icon
            code={isOpen ? 'expand_less' : 'expand_more'}
            color={disabledIconColor}
            size='l'
          />
        </Box>
      </SelectDropdownStyled>
      {isOpen ? (
        <DropdownMenu dataTestId={dataTestId}>{children}</DropdownMenu>
      ) : null}
    </>
  );
};
