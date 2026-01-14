import styled from '@emotion/styled';

export const SegmentedControlOptionStyled = styled.button<{
  showLabel: boolean;
}>`
  ${({ theme, showLabel }) => `
    ${theme.fontStyles.bodySmBold};

    display: flex;
    align-items: center;
    gap: ${theme.spacing.spacing_20};
    cursor: pointer;
    background-color: ${theme.palette.surface.contrast};
    color: ${theme.palette.informative.default};
    border: none;
    border-radius: ${theme.shape.button};
    padding: ${theme.spacing.spacing_20} ${
    theme.spacing[showLabel ? 'spacing_40' : 'spacing_20']
  };

  i {
    color: ${theme.palette.informative.default};
  }

    &:not(:disabled):hover {
      background-color: ${theme.palette.informative.light};
    }

    &:not(:disabled)[aria-pressed="true"] {
      background-color: ${theme.palette.informative.default};
      color: ${theme.palette.content.contrast};

      i {
        color: ${theme.palette.content.contrast};
      }
    }

    &:disabled {
        color: ${theme.palette.content.light};
        cursor: not-allowed;

        i {
          color: ${theme.palette.content.light};
        }
    }

  `}
`;
