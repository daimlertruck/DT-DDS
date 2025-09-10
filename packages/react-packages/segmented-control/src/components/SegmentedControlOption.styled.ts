import styled from '@emotion/styled';

export const SegmentedControlOptionStyled = styled.button<{
  showLabel: boolean;
}>`
  ${({ theme, showLabel }) => `
    ${theme.fontStyles.bodyMdRegular};

    display: flex;
    align-items: center;
    gap: ${theme.spacing.spacing_20};
    cursor: pointer;
    background-color: ${theme.palette.surface.contrast};
    color: ${theme.palette.content.default};
    border: none;
    border-radius: ${theme.shape.button};
    padding: ${theme.spacing.spacing_20} ${
    theme.spacing[showLabel ? 'spacing_40' : 'spacing_20']
  };

    &:not(:disabled):hover {
      background-color: ${theme.palette.primary.light};
      color: ${theme.palette.content.default};

      i {
        color: ${theme.palette.content.dark};
      }
    }

    &:not(:disabled)[aria-pressed="true"] {
      background-color: ${theme.palette.primary.default};
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
