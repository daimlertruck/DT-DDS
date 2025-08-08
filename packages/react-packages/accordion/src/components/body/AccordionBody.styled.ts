import styled from '@emotion/styled';

interface BodyStyledProps {
  isOpenState: boolean;
}

export const BodyStyled = styled.div<BodyStyledProps>`
  ${({ theme, isOpenState }) => `
    ${theme.fontStyles.bodyLgRegular};
    display: grid;
    grid-template-rows: ${isOpenState ? '1fr' : '0fr'};
    transition: grid-template-rows 0.3s ease-in-out, padding 0.3s ease-in-out;
    color: ${theme.palette.content.dark};
    
    padding: 0 ${theme.spacing['2xs']} ${
    isOpenState ? theme.spacing['2xs'] : 0
  };
      
    & > div {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `}
`;
