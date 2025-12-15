import styled from '@emotion/styled';

import { RadioSize } from './types';

const RADIO_SIZES: Record<
  RadioSize,
  {
    outerCircle: number;
    innerCircle: number;
  }
> = {
  large: {
    outerCircle: 24,
    innerCircle: 10,
  },
  small: {
    outerCircle: 20,
    innerCircle: 8,
  },
};

interface RadioInputStyledProps {
  radioSize: RadioSize;
}

export const RadioInputStyled = styled.input<RadioInputStyledProps>`
  ${({ theme, radioSize }) => `
    background: ${theme.palette.surface.contrast};
    border: 1px solid ${theme.palette.informative.default};
    border-radius: 50%;
    width: ${RADIO_SIZES[radioSize].outerCircle}px;
    height: ${RADIO_SIZES[radioSize].outerCircle}px;
    appearance: none;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled + label {
      color: ${theme.palette.content.light};
    }

    &:hover {
      background: ${theme.palette.informative.light};
    }

    &:checked:not(:disabled):hover {
      background: ${theme.palette.informative.dark};
      border-color: ${theme.palette.informative.dark};
    }

    &:checked {
      background: ${theme.palette.informative.default};
    }

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${theme.palette.informative.light};
      background-color: ${theme.palette.informative.light};
    }

    &:checked:before {
      content: "";
      width: ${RADIO_SIZES[radioSize].innerCircle}px;
      height: ${RADIO_SIZES[radioSize].innerCircle}px;
      background: ${theme.palette.surface.contrast};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &[data-error="true"] {
      border-color: ${theme.palette.error.default};
    }

    &[data-error="true"]:hover {
      background-color: ${theme.palette.error.light};
    }

    &[data-error="true"]:disabled {
      background-color: ${theme.palette.error.light};
      border-color: ${theme.palette.error.light};
    }

    &[data-error="true"]:checked {
      background-color: ${theme.palette.error.default};
    }

    &[data-error="true"]:checked:disabled {
      background-color: ${theme.palette.error.light};
      border-color: ${theme.palette.error.light};
    }
    
    &[data-error="true"]:checked:not(:disabled):hover {
      background-color: ${theme.palette.error.dark};
      border-color: ${theme.palette.error.dark};
    }

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 2px;
    }
  `}
`;
