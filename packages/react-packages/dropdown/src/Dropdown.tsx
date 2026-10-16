import {
  forwardRef,
  HTMLAttributes,
  RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';

import { FocusTrap } from 'focus-trap-react';

import { BaseProps, Portal, useClickOutside } from '@dt-dds/react-core';

import { DropdownOption } from './components';
import { DropdownStyled } from './Dropdown.styled';
import { useFloatingPosition } from './hooks';
import { DropdownPlacement } from './types';
import { setRef } from './utils';

export interface DropdownProps extends BaseProps, HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  matchWidth?: boolean;
  offsetX?: number;
  offsetY?: number;
  onClose?: () => void;
  as?: keyof JSX.IntrinsicElements;
  placement?: DropdownPlacement;
  isFocusable?: boolean;
}

export const Dropdown = Object.assign(
  forwardRef<HTMLElement, DropdownProps>(
    (
      {
        children,
        style,
        dataTestId = 'dropdown',
        isOpen = false,
        anchorRef,
        matchWidth = true,
        offsetX,
        offsetY,
        as = 'div',
        onClose,
        placement,
        isFocusable = true,
        ...rest
      },
      forwardedRef
    ) => {
      const localMenuRef = useRef<HTMLElement | null>(null);
      // State, not a ref: Portal mounts the menu after our layout effects.
      const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);

      const setMenuRef = useCallback(
        (node: HTMLElement | null) => {
          localMenuRef.current = node;
          setMenuElement(node);
          setRef(forwardedRef, node);
        },
        [forwardedRef]
      );

      const { style: floatingStyle } = useFloatingPosition<HTMLElement>(
        anchorRef,
        isOpen,
        {
          matchWidth,
          offsetX,
          offsetY,
          placement,
          menuElement,
        }
      );

      useClickOutside({
        refs: [localMenuRef, anchorRef],
        handler: () => onClose?.(),
      });

      const dropdownNode = (
        <DropdownStyled
          as={as}
          data-testid={dataTestId}
          ref={setMenuRef}
          role='menu'
          style={{ ...floatingStyle, ...style }}
          {...rest}
          {...(!isFocusable && {
            onMouseDown: (e) => e.preventDefault(),
          })}
        >
          {children}
        </DropdownStyled>
      );

      return (
        <Portal isOpen>
          {isFocusable ? (
            <FocusTrap
              active={isOpen}
              focusTrapOptions={{
                initialFocus: () => localMenuRef?.current ?? false,
                fallbackFocus: () => document.body,
                escapeDeactivates: true,
                allowOutsideClick: true,
                onDeactivate: () => {
                  onClose?.();
                },
                tabbableOptions: { displayCheck: 'none' },
              }}
            >
              {dropdownNode}
            </FocusTrap>
          ) : (
            dropdownNode
          )}
        </Portal>
      );
    }
  ),
  {
    Option: DropdownOption,
  }
);

Dropdown.displayName = 'Dropdown';
