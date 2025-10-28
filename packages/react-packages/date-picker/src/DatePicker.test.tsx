import { withProviders } from '@dt-dds/react-core';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { DatePicker } from './DatePicker';

describe('<DatePicker /> component', () => {
  const ProvidedDatePicker = withProviders(DatePicker);

  it('should render date input correctly', () => {
    const { container } = render(
      <ProvidedDatePicker
        initialValue=''
        label='Choose a date'
        max='2025-03-30'
        min='2023-03-30'
        required
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('fills input correctly with new value on change Event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ProvidedDatePicker
        initialValue=''
        label='Choose a date'
        max='2025-03-30'
        min='2023-03-30'
        onChange={onChange}
        required
      />
    );

    const input = container.querySelector('input') as HTMLElement;
    fireEvent.change(input, { target: { value: '2023-05-05' } });

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('2023-05-05');
  });

  describe('onFocus event', () => {
    it('should call showPicker', () => {
      const refSpy = jest
        .spyOn(React, 'useRef')
        .mockReturnValue({ current: { showPicker: jest.fn() } });

      const { container } = render(
        <ProvidedDatePicker
          initialValue=''
          label='Choose a date'
          max='2025-03-30'
          min='2023-03-30'
          required
        />
      );
      const input = container.querySelector('input') as HTMLElement;
      fireEvent.focus(input);

      expect(refSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur event', () => {
    it('should keep active state on date type input', () => {
      const { container } = render(
        <ProvidedDatePicker
          initialValue=''
          label='Choose a date'
          max='2025-03-30'
          min='2023-03-30'
          required
        />
      );
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;

      fireEvent.blur(input);

      expect(label).toHaveStyle('transform: translateY(-50%)');
    });

    it('should render error message when date is below min', () => {
      const { container } = render(
        <ProvidedDatePicker
          initialValue='2023-02-01'
          label='Choose a date'
          min='2023-03-30'
        />
      );

      const input = container.querySelector('input') as HTMLElement;

      fireEvent.blur(input);
      expect(container).toMatchSnapshot();
    });

    it('should render error message when date is higher than max', () => {
      const { container } = render(
        <ProvidedDatePicker
          initialValue='2026-02-01'
          label='Choose a date'
          max='2025-03-30'
        />
      );

      const input = container.querySelector('input') as HTMLElement;

      fireEvent.blur(input);
      expect(container).toMatchSnapshot();
    });
  });
});
