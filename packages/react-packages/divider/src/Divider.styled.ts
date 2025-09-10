import styled from '@emotion/styled';

export const DividerStyled = styled.hr`
  border: 0px;
  border-top: ${({ theme }) => `1px ${theme.palette.border.default} solid`};
  margin-block: ${({ theme }) => theme.spacing.spacing_40};
  width: 100%;
`;
