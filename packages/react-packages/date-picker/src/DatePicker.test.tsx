import { withProviders } from '@dt-dds/react-core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePicker } from './DatePicker';

describe('<DatePicker /> component', () => {
  const ProvidedDatePicker = withProviders(DatePicker);

  it('should open calendar after icon click', async () => {
    const { getByTestId } = render(
      <ProvidedDatePicker label='Choose a date' mode='single' />
    );

    fireEvent.click(getByTestId('extra-suffix'));

    expect(getByTestId('calendar')).toBeVisible();
  });

  it('should close calendar after input click', async () => {
    const { getByTestId } = render(
      <ProvidedDatePicker label='Choose a date' mode='single' />
    );

    fireEvent.click(getByTestId('extra-suffix'));

    expect(getByTestId('calendar')).toBeVisible();

    fireEvent.click(getByTestId('choose-a-date-text-field-input'));

    expect(getByTestId('calendar')).not.toBeVisible();
  });

  it('should close calendar after click outside', async () => {
    const { getByTestId } = render(
      <ProvidedDatePicker label='Choose a date' mode='single' />
    );

    fireEvent.click(getByTestId('extra-suffix'));

    expect(getByTestId('calendar')).toBeVisible();

    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);

    expect(getByTestId('calendar')).not.toBeVisible();
  });

  describe('Single Mode', () => {
    it('should have default value', () => {
      const { getByTestId } = render(
        <ProvidedDatePicker
          initialValue={new Date(2025, 1, 12)}
          label='Choose a date'
          mode='single'
        />
      );

      expect(getByTestId('choose-a-date-text-field-input')).toHaveDisplayValue(
        '02/12/2025'
      );
    });

    it('should show error if date is higher than max', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker
          label='Choose a date'
          max='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2026' },
      });

      expect(
        getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022' },
      });

      expect(
        getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='single'
        />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05-05.' },
      });

      expect(getByText('Invalid date format.')).toBeVisible();
    });

    it('should show date selected ', async () => {
      const { getByTestId, getByRole } = render(
        <ProvidedDatePicker label='Choose a date' mode='single' />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '12/12/2025' },
      });

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      const selectedDay = getByRole('gridcell', {
        name: '12',
      });

      expect(selectedDay).toHaveAttribute('aria-selected', 'true');
    });

    it('should select date and appear on input', () => {
      const { getByTestId, getByRole } = render(
        <ProvidedDatePicker label='Choose a date' mode='single' />
      );

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      fireEvent.click(
        getByRole('gridcell', { name: '1' }).firstChild as HTMLButtonElement
      );

      expect(getByTestId('choose-a-date-text-field-input')).toHaveDisplayValue(
        /01\//
      );
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
      const { getByTestId } = render(
        <ProvidedDatePicker
          initialValue={{
            from: new Date(2025, 1, 12),
            to: new Date(2025, 1, 12),
          }}
          label='Choose a date'
          mode='range'
        />
      );

      const input = getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;

      expect(input.value).toBe('02/12/2025 - 02/12/2025');
    });

    it('should show error if date is higher than max', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker
          label='Choose a date'
          max='2024-01-12'
          mode='range'
        />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2022-05/05/2026' },
      });

      expect(
        getByText('Please choose a date on or before 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is lower than min', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker
          label='Choose a date'
          min='2024-01-12'
          mode='range'
        />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2018-05/05/2026' },
      });

      expect(
        getByText('Please choose a date on or after 01/12/2024.')
      ).toBeVisible();
    });

    it('should show error if date is invalid', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker label='Choose a date' mode='range' />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05.05.2018-' },
      });

      expect(getByText('Invalid date format.')).toBeVisible();
    });

    it('should show error if from date is than to date', () => {
      const { getByTestId, getByText } = render(
        <ProvidedDatePicker label='Choose a date' mode='range' />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/05/2023-05/05/2022' },
      });

      expect(getByText('Please choose a correct range.')).toBeVisible();
    });

    it('should show range selected', () => {
      const { getByTestId, getByRole } = render(
        <ProvidedDatePicker label='Choose a date' mode='range' />
      );

      fireEvent.change(getByTestId('choose-a-date-text-field-input'), {
        target: { value: '05/12/2025-05/14/2025' },
      });

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();
      expect(
        getByRole('gridcell', {
          name: '12',
        })
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        getByRole('gridcell', {
          name: '13',
        })
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        getByRole('gridcell', {
          name: '14',
        })
      ).toHaveAttribute('aria-selected', 'true');
    });

    it('should select date and appear on input', () => {
      const { getByTestId } = render(
        <ProvidedDatePicker label='Choose a date' mode='range' />
      );

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      clickFirstToThirdDayRange();

      expect(getByTestId('calendar')).not.toBeVisible();

      const input = getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;
      expect(input.value).toContain('01');
      expect(input.value).toContain('-');
      expect(input.value).toContain('03');
    });

    it('should change range after having default values', () => {
      const { getByTestId } = render(
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
        (getByTestId('choose-a-date-text-field-input') as HTMLInputElement)
          .value
      ).toBe('09/12/2025 - 09/12/2025');

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      clickFirstToThirdDayRange();

      expect(getByTestId('calendar')).not.toBeVisible();

      const input = getByTestId(
        'choose-a-date-text-field-input'
      ) as HTMLInputElement;
      expect(input.value).toContain('01');
      expect(input.value).toContain('-');
      expect(input.value).toContain('03');
    });
  });

  describe('keyboard interaction', () => {
    it('should open calendar after icon enter click', async () => {
      const { getByTestId } = render(
        <ProvidedDatePicker label='Choose a date' mode='single' />
      );

      fireEvent.keyDown(getByTestId('extra-suffix'), {
        key: 'Enter',
        code: 'Enter',
      });

      expect(getByTestId('calendar')).toBeVisible();
    });

    it('should close calendar after escape click', async () => {
      const { getByTestId } = render(
        <ProvidedDatePicker label='Choose a date' mode='single' />
      );

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(getByTestId('calendar')).not.toBeVisible();
    });

    it('should select a date after enter click', async () => {
      const user = userEvent.setup();
      const { getByTestId } = render(
        <ProvidedDatePicker label='Choose a date' mode='single' />
      );

      fireEvent.click(getByTestId('extra-suffix'));

      expect(getByTestId('calendar')).toBeVisible();

      (
        await screen.findByRole('button', {
          name: /15/,
        })
      ).focus();

      await user.keyboard('{Enter}');

      expect(getByTestId('calendar')).not.toBeVisible();
      expect(getByTestId('choose-a-date-text-field-input')).toHaveDisplayValue(
        /15\//
      );
    });
  });
});
