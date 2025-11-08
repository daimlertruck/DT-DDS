import { Checkbox } from '@dt-dds/react-checkbox';
import styled from '@emotion/styled';

export const SelectCheckboxStyled = styled(Checkbox)`
  ${({ theme }) => `
    pointer-events: none;
    padding: ${theme.spacing.spacing_40} ${theme.spacing.spacing_50};

    &[data-selected="true"] span {
      ${theme.fontStyles.bodyMdBold};
    }

    span {
      color: inherit;
    }
  `}
`;
