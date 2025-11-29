import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateRange } from 'react-day-picker';

import { withProviders } from '@dt-dds/react-core';

import { DatePicker } from './DatePicker';
import { DatePickerProps } from './types';

import { enUS, format } from '.';

const ProvidedDatePicker = withProviders(DatePicker);

const SingleDatePicker = (props: Partial<DatePickerProps>) => {
  const [value, setValue] = useState<string>(props.value ?? '');

  return (
    <ProvidedDatePicker
      {...props}
      label='Choose a date'
      mode='single'
      onChange={(event) => setValue(event.target.value)}
      onDateSelected={(date) =>
        setValue(
          format(date as Date, 'P', {
            locale: enUS,
          })
        )
      }
      value={value}
    />
  );
};

const RangeDatePicker = (props: Partial<DatePickerProps>) => {
  const [value, setValue] = useState<string>(props.value ?? '');

  return (
    <ProvidedDatePicker
      {...props}
      label='Choose a date'
      mode='range'
      onChange={(event) => setValue(event.target.value)}
      onDateSelected={(date) => {
        const range = date as DateRange;
        const { from, to } = range;

        if (!from) return;

        const formattedFrom = format(from, 'P', { locale: enUS });
        const formattedTo = to ? format(to, 'P', { locale: enUS }) : '';

        const dateValue = `${formattedFrom} - ${formattedTo}`;
        setValue(dateValue);
      }}
      value={value}
    />
  );
};

describe('<DatePicker /> component', () => {
  it('should open calendar after icon click', async () => {
    render(<SingleDatePicker />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();
  });

  it('should close calendar after input click', async () => {
    render(<SingleDatePicker />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();

    fireEvent.click(screen.getByTestId('choose-a-date-text-field-input'));

    expect(screen.getByTestId('calendar')).not.toBeVisible();
  });

  it('should close calendar after click outside', async () => {
    render(<SingleDatePicker />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();

    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    expect(screen.getByTestId('calendar')).not.toBeVisible();
  });

  describe('Single Mode', () => {
    it('should have default value', () => {
      render(<SingleDatePicker value='02/12/2025' />);

      expect(
        screen.getByTestId('choose-a-date-text-field-input')
      ).toHaveDisplayValue('02/12/2025');
    });

    it('should show error if min date changed', () => {
      const { rerender } = render(<SingleDatePicker value='01/01/2025' />);

      expect(
        screen.queryByText('Please choose a date on or after 01/01/2026.')
      ).toBeNull();

      rerender(<SingleDatePicker min='01/01/2026' />);

      expect(
        screen.getByText('Please choose a date on or after 01/01/2026.')
      ).toBeVisible();
    });

    it('should show error if max date changed', () => {
      const { rerender } = render(<SingleDatePicker value='01/02/2023' />);

      expect(
        screen.queryByText('Please choose a date on or before 01/01/2023.')
      ).toBeNull();

      rerender(<SingleDatePicker max='01/01/2023' />);

      expect(
        screen.getByText('Please choose a date on or before 01/01/2023.')
      ).toBeVisible();
    });

    it('should show error if date is higher than max', () => {
      render(<SingleDatePicker max='2024-01-12' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      render(<SingleDatePicker min='2024-01-12' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022' },
      });

      expect(
        screen.getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      render(<SingleDatePicker min='2024-01-12' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05-05.' },
      });

      expect(screen.getByText('Invalid date format.')).toBeVisible();
    });

    it('should show date selected ', async () => {
      render(<SingleDatePicker />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '12/12/2025' },
      });

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      const selectedDay = screen.getByRole('gridcell', {
        name: '12',
      });

      expect(selectedDay).toHaveAttribute('aria-selected', 'true');
    });

    it('should select date and appear on input', () => {
      render(<SingleDatePicker label='Choose a date' mode='single' />);

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      fireEvent.click(
        screen.getByRole('gridcell', { name: '1' })
          .firstChild as HTMLButtonElement
      );

      expect(
        screen.getByTestId('choose-a-date-text-field-input')
      ).toHaveDisplayValue(/01\//);
    });
  });

  describe('Range Mode', () => {
    const clickFirstToThirdDayRange = () => {
      const visibleCells = screen
        .getAllByRole('gridcell')
        .filter((cell) => !cell.className.includes('rdp-outside'));
      const firstDayCell = visibleCells[0];
      const thirdDayCell = visibleCells[2];

      const firstDayButton = firstDayCell.querySelector(
        'button'
      ) as HTMLButtonElement;
      const thirdDayButton = thirdDayCell.querySelector(
        'button'
      ) as HTMLButtonElement;

      fireEvent.click(firstDayButton);
      fireEvent.click(thirdDayButton);
    };

    it('should have default value', () => {
      render(<RangeDatePicker value='02/12/2025 - 02/12/2025' />);

      const input = screen.getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;

      expect(input.value).toBe('02/12/2025 - 02/12/2025');
    });

    it('should show error if min date changed', () => {
      const { rerender } = render(
        <RangeDatePicker value='02/12/2025 - 02/12/2025' />
      );

      expect(
        screen.queryByText('Please choose a date on or after 01/01/2026.')
      ).toBeNull();

      rerender(
        <RangeDatePicker min='01/01/2026' value='02/12/2025 - 02/13/2025' />
      );

      expect(
        screen.getByText('Please choose a date on or after 01/01/2026.')
      ).toBeVisible();
    });

    it('should show error if max date changed', () => {
      const { rerender } = render(
        <RangeDatePicker value='02/12/2025 - 02/12/2025' />
      );

      expect(
        screen.queryByText('Please choose a date on or before 01/01/2025.')
      ).toBeNull();

      rerender(
        <RangeDatePicker max='01/01/2025' value='01/12/2024 - 04/12/2025' />
      );

      expect(
        screen.getByText('Please choose a date on or before 01/01/2025.')
      ).toBeVisible();
    });

    it('should show error if date is higher than max', () => {
      render(<RangeDatePicker max='2024-01-12' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022-05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      render(<RangeDatePicker min='2024-01-12' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2018-05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      render(<RangeDatePicker label='Choose a date' mode='range' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05.05.2018-' },
      });

      expect(screen.getByText('Invalid date format.')).toBeVisible();
    });

    it('should show error if from date is than to date', () => {
      render(<RangeDatePicker />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2023-05/05/2022' },
      });

      expect(screen.getByText('Please choose a correct range.')).toBeVisible();
    });

    it('should show range selected', () => {
      render(<RangeDatePicker />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/12/2025-05/14/2025' },
      });

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();
      expect(
        screen.getByRole('gridcell', {
          name: '12',
        })
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByRole('gridcell', {
          name: '13',
        })
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByRole('gridcell', {
          name: '14',
        })
      ).toHaveAttribute('aria-selected', 'true');
    });

    it('should select date and appear on input', () => {
      render(<RangeDatePicker />);

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      clickFirstToThirdDayRange();

      expect(screen.getByTestId('calendar')).not.toBeVisible();

      const input = screen.getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;
      expect(input.value).toContain('01');
      expect(input.value).toContain('-');
      expect(input.value).toContain('03');
    });

    it('should change range after having default values', () => {
      render(<RangeDatePicker value='09/12/2025 - 09/12/2025' />);
      expect(
        (
          screen.getByTestId(
            'choose-a-date-text-field-input'
          ) as HTMLInputElement
        ).value
      ).toBe('09/12/2025 - 09/12/2025');

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      clickFirstToThirdDayRange();

      expect(screen.getByTestId('calendar')).not.toBeVisible();

      const input = screen.getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;
      expect(input.value).toContain('01');
      expect(input.value).toContain('-');
      expect(input.value).toContain('03');
    });
  });

  describe('keyboard interaction', () => {
    it('should open calendar after icon enter click', async () => {
      render(<SingleDatePicker />);

      await userEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();
    });

    it('should close calendar after escape click', async () => {
      render(<SingleDatePicker />);

      await userEvent.click(screen.getByTestId('extra-suffix'));
      expect(screen.getByTestId('calendar')).toBeVisible();

      await userEvent.keyboard('{Escape}');

      expect(screen.getByTestId('calendar')).not.toBeVisible();
    });

    it('should select a date after enter click', async () => {
      render(<SingleDatePicker />);

      await userEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      (
        await screen.findByRole('button', {
          name: /15/,
        })
      ).focus();

      await userEvent.keyboard('{Enter}');

      expect(screen.getByTestId('calendar')).not.toBeVisible();
      expect(
        screen.getByTestId('choose-a-date-text-field-input')
      ).toHaveDisplayValue(/15\//);
    });
  });
});
