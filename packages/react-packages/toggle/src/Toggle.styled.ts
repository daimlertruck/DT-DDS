import styled from '@emotion/styled';

interface ToggleWrapperStyledProps {
  hasLabel: boolean;
}

const TOGGLE_WIDTH = 48;
const TOGGLE_RADIUS = 20;

export const ToggleWrapperStyled = styled.div<ToggleWrapperStyledProps>`
  ${({ theme, hasLabel }) => `
    display: flex;
    gap: ${hasLabel ? theme.spacing.spacing_30 : theme.spacing.spacing_0};
    border-radius: ${TOGGLE_RADIUS}px;
    align-items: center;
    width: fit-content;
  `};
`;

export const ToggleSwitchStyled = styled.label`
  ${({ theme }) => `
    position: relative;
    width: ${TOGGLE_WIDTH}px;
    height: 24px;
    border-radius: ${TOGGLE_RADIUS}px;
    transition: background 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${theme.palette.content.contrast};
      transition: transform 0.3s ease;
      margin: 2px;
    }
  `};
`;

export const ToggleCheckBoxStyled = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  ${({ theme, disabled }) => `
    & + label {
      background: ${
        disabled ? theme.palette.surface.default : theme.palette.surface.medium
      };
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }


    &:focus-visible + label {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 1px;
    }

    &:checked + label {
      background: ${
        disabled ? theme.palette.accent.light : theme.palette.accent.default
      };
    }

    &:checked + label::after {
      transform: translateX(${TOGGLE_WIDTH / 2}px);
    }

    & ~ span {
      ${theme.fontStyles.bodyMdRegular};
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      color: ${
        disabled ? theme.palette.content.light : theme.palette.content.default
      };
      user-select: none;
    }
  `}
`;
