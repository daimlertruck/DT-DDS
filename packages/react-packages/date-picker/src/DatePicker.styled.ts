import styled from '@emotion/styled';
import { DayPicker } from 'react-day-picker';

export const DatePickerStyled = styled(DayPicker)`
  ${({ theme }) => `
 
    .rdp-months {
      border: 1px solid ${theme.palette.border.medium};
      padding: ${theme.spacing.spacing_50};
    }

    .rdp-month_caption {
      color: ${theme.palette.content.dark};
      height: auto;
      margin-top: ${theme.spacing.spacing_10};
      ${theme.fontStyles.bodyLgBold};
    }

    .rdp-month_grid {
      border-collapse: separate;
      border-spacing: 0;
      margin-top: ${theme.spacing.spacing_30};
    }

    .rdp-weekday {
      ${theme.fontStyles.bodyMdRegular};
      color: ${theme.palette.content.default};
    }

    .rdp-day {
      ${theme.fontStyles.bodySmRegular};
      width: unset;
      height: unset;
      border: 1px solid transparent;
    }

    .rdp-day_button {
      width: 0;
      height: 0;
      padding: ${theme.spacing.spacing_50};
      border-radius: 0;
      border: 0;
    }

    .rdp-day_button:disabled {
      cursor: not-allowed;
    }

    .rdp-today:not(.rdp-outside):not(.rdp-range_middle) {
      border: 1px solid ${theme.palette.informative.default};
      color: ${theme.palette.content.default};
    }

    .rdp-selected,
    .rdp-day.rdp-today.rdp-selected:not(.rdp-range_middle) {
      background: ${theme.palette.primary.default};
      color: ${theme.palette.content.contrast};
      font-weight: normal;
      border: 1px solid transparent;
    }

    .rdp-disabled {
      opacity: unset;
      color: ${theme.palette.content.light};
      cursor: not-allowed;
    }

    .rdp-range_middle {
      background: ${theme.palette.accent.light};
      color: ${theme.palette.content.default};
      border: 1px solid transparent;
    }

    .rdp-range_start .rdp-day_button,
    .rdp-range_end .rdp-day_button {
      background: none;
      border-radius: 0;
      color: inherit;
    }

    .rdp-day:not(.rdp-disabled):not(.rdp-selected):hover {
      background-color: ${theme.palette.accent.light};
      color: ${theme.palette.content.default};
    }

    .rdp-day_button:focus-visible,
    .rdp-button_next:focus-visible,
    .rdp-button_previous:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
    }

    .rdp-button_next,
    .rdp-button_previous {
      height: fit-content !important;
      width: fit-content !important;
    }
  
    .rdp-button_next:disabled, 
    .rdp-button_previous:disabled, 
    .rdp-button_next[aria-disabled="true"], 
    .rdp-button_previous[aria-disabled="true"] {
      cursor: not-allowed !important;
      color: ${theme.palette.content.light};
    }
  `}
`;
