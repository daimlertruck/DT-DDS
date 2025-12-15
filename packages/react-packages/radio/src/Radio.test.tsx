import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { theme } from '@dt-dds/themes';

import { Radio, RadioGroup } from '.';

describe('<Radio /> component', () => {
  const ProvidedRadioGroup = withProviders(RadioGroup);
  const ProvidedRadio = withProviders(Radio);

  it('should change the selected option', () => {
    render(
      <ProvidedRadioGroup name='radio-group-name' onChange={() => {}}>
        <ProvidedRadio label='Label 1' value='1' />
        <ProvidedRadio isDefaultChecked label='Label 2' value='2' />
      </ProvidedRadioGroup>
    );

    expect(screen.getByLabelText('Label 2')).toBeChecked();

    fireEvent.click(screen.getByText('Label 1'));
    expect(screen.getByLabelText('Label 1')).toBeChecked();
    expect(screen.getByLabelText('Label 2')).not.toBeChecked();
  });

  it('should render large radio', () => {
    render(
      <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
        <ProvidedRadio dataTestId='radio-1' label='Label 1' value='1' />
      </ProvidedRadioGroup>
    );

    expect(screen.getByTestId('radio-1')).toHaveStyle('width: 24px');
    expect(screen.getByTestId('radio-1')).toHaveStyle('height: 24px');
  });

  it('should render small radio', () => {
    render(
      <ProvidedRadioGroup
        name='radio-group-name'
        onChange={() => null}
        size='small'
      >
        <ProvidedRadio dataTestId='radio-1' label='Label 1' value='1' />
      </ProvidedRadioGroup>
    );

    expect(screen.getByTestId('radio-1')).toHaveStyle('width: 20px');
    expect(screen.getByTestId('radio-1')).toHaveStyle('height: 20px');
    expect(screen.getByTestId('radio-1')).toHaveStyle({
      width: '20px',
      height: '20px',
    });
  });

  describe('disabled state', () => {
    it('should render not selected radio', () => {
      render(
        <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
          <ProvidedRadio
            dataTestId='radio-1'
            isDisabled
            label='Label 1'
            value='1'
          />
        </ProvidedRadioGroup>
      );

      expect(screen.getByTestId('radio-1')).toHaveStyle('cursor: not-allowed');
      expect(screen.getByTestId('radio-1')).toHaveStyle({
        'border-color': theme.palette.informative.light,
        'background-color': theme.palette.informative.light,
      });
    });

    it('should render selected radio', () => {
      render(
        <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
          <ProvidedRadio
            dataTestId='radio-1'
            isDisabled
            label='Label 1'
            value='1'
          />
        </ProvidedRadioGroup>
      );

      const radio = screen.getByTestId('radio-1');
      const innerCircleBackground = window
        .getComputedStyle(radio, '::before')
        .getPropertyValue('background');

      expect(radio).toHaveStyle('cursor: not-allowed');
      expect(screen.getByTestId('radio-1')).toHaveStyle({
        'border-color': theme.palette.informative.light,
        'background-color': theme.palette.informative.light,
      });
      expect(innerCircleBackground).toBe('rgb(255, 255, 255)');
    });
  });

  describe('error state', () => {
    it('should render a radio not selected', () => {
      render(
        <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
          <ProvidedRadio
            dataTestId='radio-1'
            hasError
            label='Label 1'
            value='1'
          />
        </ProvidedRadioGroup>
      );

      expect(screen.getByTestId('radio-1')).toHaveStyle({
        'border-color': theme.palette.error.default,
        'background-color': theme.palette.surface.contrast,
      });
    });

    it('should render a radio checked', () => {
      render(
        <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
          <ProvidedRadio
            dataTestId='radio-1'
            hasError
            isChecked
            label='Label 1'
            value='1'
          />
        </ProvidedRadioGroup>
      );

      expect(screen.getByTestId('radio-1')).toHaveStyle({
        'border-color': theme.palette.error.default,
        'background-color': theme.palette.error.default,
      });
    });

    it('should render radio without label', () => {
      render(
        <ProvidedRadioGroup name='radio-group-name' onChange={() => null}>
          <ProvidedRadio dataTestId='radio-1' hasError value='1' />
        </ProvidedRadioGroup>
      );

      expect(screen.queryByTestId('typography')).toBeNull();
    });
  });
});
