import { Orientation } from '@dt-dds/react-core';
import styled from '@emotion/styled';

import { MessageType, OMessageType } from './types';

interface MessageStyledProps {
  messageType: MessageType;
  orientation?: Orientation;
}

export const MessageStyled = styled.div<MessageStyledProps>`
  display: grid;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing_40} ${theme.spacing.spacing_50}`};
  border-radius: ${({ theme }) => theme.shape.message};

  ${({ theme, messageType, orientation }) => {
    const isDefault = messageType === OMessageType.Default;

    const background = isDefault
      ? theme.palette.surface.light
      : theme.palette[messageType].light;

    const border = isDefault
      ? theme.palette.border.medium
      : theme.palette[messageType].default;

    const baseGrid = `
      grid-template-columns: ${
        isDefault
          ? '1fr fit-content(100%)'
          : 'fit-content(100%) 1fr fit-content(100%)'
      };
      background-color: ${background};
      border: 1px solid ${border};
      gap: ${theme.spacing.spacing_50}
    `;

    if (orientation === 'vertical') {
      return `
        ${baseGrid};
        grid-template-columns: 1fr fit-content(100%);
        gap: ${theme.spacing.spacing_30};

        & > :nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        ${
          isDefault
            ? `
                & > :nth-child(2) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `
            : `
                & > :nth-child(2) {
                  grid-column: 1;
                  grid-row: 2;
                }
                & > :nth-child(3) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `
        }
      `;
    }

    return baseGrid;
  }}
`;

export const MessageActionsStyled = styled.div<MessageStyledProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.spacing_20};

  button {
    ${({ theme, messageType }) => {
      const isDefault = messageType === 'default';
      const color = isDefault
        ? theme.palette.content.default
        : theme.palette[messageType].dark;

      const hoverBg = isDefault
        ? theme.palette.surface.medium
        : theme.palette[messageType].medium;

      return `
        color: ${color};

        &:hover {
          background-color: ${hoverBg};
          color: ${color};
        }
      `;
    }}
  }
`;

export const MessageButtonCloseStyled = styled.button<MessageStyledProps>`
  ${({ theme, messageType, orientation }) => `
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${orientation === 'horizontal' && 'align-self: center'};
  
    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${
        messageType === OMessageType.Default
          ? theme.palette.surface.medium
          : theme.palette[messageType].medium
      };
    }
  `}
`;
