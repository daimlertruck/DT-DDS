import styled from '@emotion/styled';

export const SegmentedControlStyled = styled.div`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    padding: ${theme.spacing.spacing_20};
    border: 1px solid ${theme.palette.border.medium};
    border-radius: ${theme.shape.segmentedControl};
  `}
`;
