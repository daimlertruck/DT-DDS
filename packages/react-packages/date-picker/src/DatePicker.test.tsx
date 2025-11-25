import { withProviders } from '@dt-dds/react-core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePicker } from './DatePicker';

describe('<DatePicker /> component', () => {
  const ProvidedDatePicker = withProviders(DatePicker);

  it('should open calendar after icon click', async () => {
    render(<ProvidedDatePicker label='Choose a date' mode='single' />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();
  });

  it('should close calendar after input click', async () => {
    render(<ProvidedDatePicker label='Choose a date' mode='single' />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();

    fireEvent.click(screen.getByTestId('choose-a-date-text-field-input'));

    expect(screen.getByTestId('calendar')).not.toBeVisible();
  });

  it('should close calendar after click outside', async () => {
    render(<ProvidedDatePicker label='Choose a date' mode='single' />);

    fireEvent.click(screen.getByTestId('extra-suffix'));

    expect(screen.getByTestId('calendar')).toBeVisible();

    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    expect(screen.getByTestId('calendar')).not.toBeVisible();
  });

  describe('Single Mode', () => {
    it('should have default value', () => {
      render(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          mode='single'
        />
      );

      expect(
        screen.getByTestId('choose-a-date-text-field-input')
      ).toHaveDisplayValue('02/12/2025');
    });

    it('should show error if min date changed', () => {
      const { rerender } = render(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          mode='single'
        />
      );

      expect(
        screen.queryByText('Please choose a date on or after 01/01/2026.')
      ).toBeNull();

      rerender(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          min='01/01/2026'
          mode='single'
        />
      );

      expect(
        screen.getByText('Please choose a date on or after 01/01/2026.')
      ).toBeVisible();
    });

    it('should show error if max date changed', () => {
      const { rerender } = render(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          mode='single'
        />
      );

      expect(
        screen.queryByText('Please choose a date on or before 01/01/2023.')
      ).toBeNull();

      rerender(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          max='01/01/2023'
          mode='single'
        />
      );

      expect(
        screen.getByText('Please choose a date on or before 01/01/2023.')
      ).toBeVisible();
    });

    it('should show error if date is higher than max', () => {
      render(
        <ProvidedDatePicker
          label='Choose a date'
          max='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022' },
      });

      expect(
        screen.getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05-05.' },
      });

      expect(screen.getByText('Invalid date format.')).toBeVisible();
    });

    it('should show date selected ', async () => {
      render(<ProvidedDatePicker label='Choose a date' mode='single' />);

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
      render(<ProvidedDatePicker label='Choose a date' mode='single' />);

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
      render(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 1, 12),
            to: new Date(2025, 1, 12),
          }}
          label='Choose a date'
          mode='range'
        />
      );

      const input = screen.getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;

      expect(input.value).toBe('02/12/2025 - 02/12/2025');
    });

    it('should show error if min date changed', () => {
      const { rerender } = render(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 1, 12),
            to: new Date(2025, 1, 12),
          }}
          label='Choose a date'
          mode='range'
        />
      );

      expect(
        screen.queryByText('Please choose a date on or after 01/01/2026.')
      ).toBeNull();

      rerender(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 1, 12),
            to: new Date(2025, 1, 13),
          }}
          label='Choose a date'
          min='01/01/2026'
          mode='range'
        />
      );

      expect(
        screen.getByText('Please choose a date on or after 01/01/2026.')
      ).toBeVisible();
    });

    it('should show error if max date changed', () => {
      const { rerender } = render(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 1, 12),
            to: new Date(2025, 1, 12),
          }}
          label='Choose a date'
          mode='range'
        />
      );

      expect(
        screen.queryByText('Please choose a date on or before 01/01/2025.')
      ).toBeNull();

      rerender(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2024, 1, 12),
            to: new Date(2025, 3, 12),
          }}
          label='Choose a date'
          max='01/01/2025'
          mode='range'
        />
      );

      expect(
        screen.getByText('Please choose a date on or before 01/01/2025.')
      ).toBeVisible();
    });

    it('should show error if date is higher than max', () => {
      render(
        <ProvidedDatePicker
          label='Choose a date'
          max='2024-01-12'
          mode='range'
        />
      );

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022-05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='range'
        />
      );

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2018-05/05/2026' },
      });

      expect(
        screen.getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      render(<ProvidedDatePicker label='Choose a date' mode='range' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05.05.2018-' },
      });

      expect(screen.getByText('Invalid date format.')).toBeVisible();
    });

    it('should show error if from date is than to date', () => {
      render(<ProvidedDatePicker label='Choose a date' mode='range' />);

      fireEvent.change(screen.getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2023-05/05/2022' },
      });

      expect(screen.getByText('Please choose a correct range.')).toBeVisible();
    });

    it('should show range selected', () => {
      render(<ProvidedDatePicker label='Choose a date' mode='range' />);

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
      render(<ProvidedDatePicker label='Choose a date' mode='range' />);

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
      render(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 8, 12),
            to: new Date(2025, 8, 12),
          }}
          label='Choose a date'
          mode='range'
        />
      );
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
      render(<ProvidedDatePicker label='Choose a date' mode='single' />);

      fireEvent.keyDown(screen.getByTestId('extra-suffix'), {
        key: 'Enter',
        code: 'Enter',
      });

      expect(screen.getByTestId('calendar')).toBeVisible();
    });

    it('should close calendar after escape click', async () => {
      render(<ProvidedDatePicker label='Choose a date' mode='single' />);

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(screen.getByTestId('calendar')).not.toBeVisible();
    });

    it('should select a date after enter click', async () => {
      const user = userEvent.setup();
      render(<ProvidedDatePicker label='Choose a date' mode='single' />);

      fireEvent.click(screen.getByTestId('extra-suffix'));

      expect(screen.getByTestId('calendar')).toBeVisible();

      (
        await screen.findByRole('button', {
          name: /15/,
        })
      ).focus();

      await user.keyboard('{Enter}');

      expect(screen.getByTestId('calendar')).not.toBeVisible();
      expect(
        screen.getByTestId('choose-a-date-text-field-input')
      ).toHaveDisplayValue(/15\//);
    });
  });
});
