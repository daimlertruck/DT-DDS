import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';
import { render, fireEvent, within } from '@testing-library/react';

import { Select, SelectOptionValue } from '.';

const items: SelectOptionValue[] = [
  { value: 'opt1', label: 'Option 1', disabled: false },
  { value: 'opt2', label: 'Option 2', disabled: false },
  {
    value: 'opt3',
    label: 'A text message to see how big labels will be handled',
    disabled: false,
  },
  { value: 'opt4', label: 'Option 3', disabled: true },
  { value: 'opt5', label: 'Option 4', disabled: false },
];

describe('<Select /> component', () => {
  const ProvidedSelect = withProviders(Select);
  const ProvidedSelectOption = withProviders(Select.Option);
  it('should render Select', () => {
    const { container, getByRole } = render(
      <ProvidedSelect helperText='you need to make a selection' label='select'>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    expect(container).toMatchSnapshot();
  });
  it('When only one option is available should be automatically selected and the select be marked as disabled', () => {
    const { getByRole } = render(
      <ProvidedSelect helperText='you need to make a selection' label='select'>
        <ProvidedSelectOption
          index={0}
          key={items[0].value}
          label={items[0].label}
          value={items[0].value}
        />
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    expect(select).toHaveTextContent('Option 1');

    expect(select).toHaveAttribute('disabled');
  });

  it('Select value should change between selections', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedSelect label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            disabled={item.disabled}
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const menu = getByRole('listbox');
    let optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(select).toHaveTextContent('Option 1');
    expect(onChange).toHaveBeenCalledWith(items[0].value);

    fireEvent.click(select);
    optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(optionsEl[1]);
    expect(select).toHaveTextContent('Option 2');
    expect(onChange).toHaveBeenCalledWith(items[1].value);
  });

  it('Select should trigger onChange with the selected item', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedSelect label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            disabled={item.disabled}
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const menu = getByRole('listbox');
    const optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(onChange).toHaveBeenCalledWith(items[0].value);
  });

  it('should render Select as multi select', () => {
    const { container } = render(
      <ProvidedSelect isMulti label='select'>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render Select as multi select with inital value selected', () => {
    const { getByRole } = render(
      <ProvidedSelect initialValue={['opt1']} isMulti label='select'>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');
    expect(select).toHaveTextContent('Option 1');
  });

  it('Select value should accept several selections when isMulti', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedSelect isMulti label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const menu = getByRole('listbox');
    const optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(select).toHaveTextContent('Option 1');

    fireEvent.click(optionsEl[1]);
    expect(select).toHaveTextContent('2 options selected');
    expect(onChange).toHaveBeenCalledWith([items[0].value, items[1].value]);
  });

  it('onChange should only be called once when selecting an option', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedSelect isMulti label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);
    const menu = getByRole('listbox');
    const optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should be able to deselect options in multi selection', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <ProvidedSelect isMulti label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const menu = getByRole('listbox');
    const optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(select).toHaveTextContent('Option 1');

    fireEvent.click(optionsEl[1]);
    expect(select).toHaveTextContent('2 options selected');
    expect(onChange).toHaveBeenCalledWith([items[0].value, items[1].value]);
    fireEvent.click(optionsEl[1]);
    expect(select).toHaveTextContent('Option 1');
    expect(onChange).toHaveBeenCalledWith([items[0].value]);
    fireEvent.click(optionsEl[0]);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should clear all selections in multiple select and be hidden when there are no selected options', () => {
    const onChange = jest.fn();
    const { getByRole, getByTestId, queryByTestId } = render(
      <ProvidedSelect isMulti label='select' onChange={onChange}>
        {items.map((item, index) => (
          <ProvidedSelectOption
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProvidedSelect>
    );

    const select = getByRole('combobox');

    fireEvent.click(select);

    const menu = getByRole('listbox');
    const optionsEl = within(menu).getAllByRole('option');
    expect(optionsEl.length).toEqual(5);

    fireEvent.click(optionsEl[0]);
    expect(select).toHaveTextContent('Option 1');
    expect(onChange).toHaveBeenCalledWith([items[0].value]);

    fireEvent.click(getByTestId('clear-selection'));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(queryByTestId('clear-selection')).not.toBeInTheDocument();
  });

  it.each`
    variant          | expectedBorderWidth
    ${'outlined'}    | ${'border-width: 1px'}
    ${'bottom-line'} | ${'border-width: 0 0 1px'}
  `(
    'renders select with $variant variant with correct border width',
    ({ variant, expectedBorderWidth }) => {
      const { getByTestId } = render(
        <ProvidedSelect label='select' variant={variant}>
          {items.map((item, index) => (
            <ProvidedSelectOption
              index={index}
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ProvidedSelect>
      );

      const select = getByTestId('select-container');

      expect(select).toHaveStyle(expectedBorderWidth);
    }
  );

  it.each`
    fill          | expectedBackgroundColor
    ${'light'}    | ${theme.palette.surface.light}
    ${'contrast'} | ${theme.palette.surface.contrast}
    ${'default'}  | ${theme.palette.surface.default}
  `(
    'renders select with $fill background fill',
    ({ fill, expectedBackgroundColor }) => {
      const { getByTestId } = render(
        <ProvidedSelect fill={fill} label='select'>
          {items.map((item, index) => (
            <ProvidedSelectOption
              index={index}
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ProvidedSelect>
      );

      const select = getByTestId('select-container');

      expect(select).toHaveStyle(
        `background-color: ${expectedBackgroundColor}`
      );
    }
  );
});
