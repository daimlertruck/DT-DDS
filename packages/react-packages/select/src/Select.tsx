import { Box } from '@dt-dds/react-box';
import { BaseProps, Scale } from '@dt-dds/react-core';
import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';
import { LabelField } from '@dt-dds/react-label-field';
import { Tooltip } from '@dt-dds/react-tooltip';
import { useSelect } from 'downshift';
import {
  Children,
  isValidElement,
  useMemo,
  MouseEvent,
  KeyboardEvent,
  useRef,
  ReactNode,
} from 'react';

import { SelectOption } from './components/SelectOption';
import { SelectProvider } from './context';
import {
  SelectContainerStyled,
  SelectStyled,
  TypographyHelperTextStyled,
  SelectActionContainerStyled,
  TypographyValueStyled,
} from './Select.styled';
import { SelectOptionValue, SelectFill, SelectVariant } from './types';

interface BaseSelectProps extends BaseProps {
  helperText?: string;
  hasError?: boolean;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  variant?: SelectVariant;
  fill?: SelectFill;
  isFloatingLabel?: boolean;
  scale?: Scale;
  labelIcon?: ReactNode;
}

interface SingleSelectProps extends BaseSelectProps {
  isMulti?: false;
  value?: string;
  onChange: (value: string) => void;
}

interface MultiSelectProps extends BaseSelectProps {
  isMulti: true;
  value?: string[];
  onChange: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

const helperTextId = 'helper-text-id';

export const Select = ({
  dataTestId,
  style,
  value,
  label,
  isMulti,
  isRequired,
  children,
  isDisabled,
  labelIcon,
  hasError = false,
  helperText = '',
  variant = 'outlined',
  fill = 'default',
  isFloatingLabel = true,
  scale = 'standard',
  onChange,
}: SelectProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleClearKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleClearSelection(e);
    }
  };

  const handleClearSelection = (
    e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    e.stopPropagation();

    isMulti && onChange([]);
  };

  const options: SelectOptionValue[] = useMemo(() => {
    const tempOptions = Children.map(children, (child) => {
      if (isValidElement(child) && child.props.value != undefined) {
        return {
          value: child.props.value,
          isDisabled: child.props.isDisabled,
          label: child.props.children,
        };
      }

      return null;
    });
    return tempOptions?.filter(Boolean) ?? [];
  }, [children]);

  const selectedOptionsSet = useMemo(
    () => new Set(value ? [value].flat() : []),
    [value]
  );

  const selectedItems = useMemo(
    () => options.filter((o) => selectedOptionsSet.has(o.value)),
    [options, selectedOptionsSet]
  );

  const hasSelectedItems = !!selectedItems?.length;

  const selectedValueContainerText = () => {
    return selectedItems.length > 1
      ? `${selectedItems.length} options selected`
      : selectedItems[0]?.label;
  };

  const {
    isOpen,
    closeMenu,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<SelectOptionValue>({
    items: options,
    isItemDisabled(item) {
      return !!item.isDisabled;
    },
    defaultHighlightedIndex: isMulti || !selectedItems?.[0] ? 0 : undefined,
    selectedItem: !isMulti ? selectedItems?.[0] ?? null : null,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          return {
            ...changes,
            isOpen: false,
            selectedItem: state.selectedItem,
            highlightedIndex: state.highlightedIndex,
          };
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
          return isMulti
            ? {
                ...changes,
                isOpen: true,
                highlightedIndex: state.highlightedIndex,
              }
            : changes;
        default:
          return changes;
      }
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }

      if (isMulti) {
        const currentValue = Array.isArray(value) ? value : [];
        const isSelectedItem = selectedOptionsSet.has(selectedItem.value);

        const nextValue = isSelectedItem
          ? currentValue.filter((v) => v !== selectedItem.value)
          : [...currentValue, selectedItem.value];

        onChange(nextValue);
        return;
      }

      onChange(selectedItem.value);
    },
  });

  const disabled = isDisabled || options.length === 1;

  const toggleProps = getToggleButtonProps({
    disabled,
    tabIndex: disabled ? -1 : 0,
    ref: anchorRef,
  });

  return (
    <SelectProvider
      value={{
        highlightedIndex,
        getItemProps,
        selectedItems,
        isMulti: !!isMulti,
      }}
    >
      <Box
        dataTestId={dataTestId ?? 'select'}
        style={{ alignItems: 'start', gap: 4 }}
      >
        <SelectStyled style={style}>
          <LabelField
            {...getLabelProps()}
            hasError={hasError}
            icon={labelIcon}
            isActive={isFloatingLabel ? hasSelectedItems : isOpen}
            isCentered
            isDisabled={disabled}
            isFloating={isFloatingLabel}
            isRequired={isRequired}
            scale={scale}
            {...(isFloatingLabel && {
              style: { pointerEvents: 'none' },
            })}
          >
            {label}
          </LabelField>

          <SelectContainerStyled
            {...toggleProps}
            {...(!!helperText && { 'aria-describedby': helperTextId })}
            {...(hasError && { 'aria-invalid': hasError })}
            data-testid='select-container'
            fill={fill}
            isOpen={isOpen}
            scale={scale}
            variant={variant}
          >
            <TypographyValueStyled
              color='content.default'
              dataTestId='select-value'
              element='span'
              fontStyles='bodyMdRegular'
              isFloatingLabel={isFloatingLabel}
              scale={scale}
              {...(disabled && { color: 'content.light' })}
            >
              {selectedValueContainerText()}
            </TypographyValueStyled>

            <SelectActionContainerStyled
              hasItems={hasSelectedItems}
              isFloatingLabel={isFloatingLabel}
              scale={scale}
            >
              {isMulti && hasSelectedItems ? (
                <Tooltip>
                  <IconButton
                    dataTestId='clear-selection'
                    onClick={handleClearSelection}
                    onKeyDown={handleClearKeyDown}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Icon code='close_small' />
                  </IconButton>
                  <Tooltip.Content>Clear all</Tooltip.Content>
                </Tooltip>
              ) : null}
              <Icon code={isOpen ? 'expand_less' : 'expand_more'} />
            </SelectActionContainerStyled>
          </SelectContainerStyled>
        </SelectStyled>

        {helperText ? (
          <TypographyHelperTextStyled
            color={
              isDisabled
                ? 'content.light'
                : hasError
                ? 'error.default'
                : 'content.medium'
            }
            dataTestId='select-helper-text'
            element='span'
            fontStyles='bodySmRegular'
            id={helperTextId}
          >
            {helperText}
          </TypographyHelperTextStyled>
        ) : null}

        <Dropdown
          {...getMenuProps()}
          anchorRef={anchorRef}
          aria-multiselectable={isMulti}
          as='ul'
          isOpen={isOpen}
          onClose={closeMenu}
          style={{ maxHeight: 200 }}
        >
          {children}
        </Dropdown>
      </Box>
    </SelectProvider>
  );
};

Select.Option = SelectOption;
