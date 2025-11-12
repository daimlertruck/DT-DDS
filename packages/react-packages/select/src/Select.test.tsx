import { act, useState } from 'react';

import { render, fireEvent, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withProviders } from '@dt-dds/react-core';
import { theme } from '@dt-dds/themes';

import { SelectOption as SelectOptionRaw } from './components/SelectOption';
import { SelectProps, Select as SelectRaw } from './Select';

type Item = {
  value: string;
  label: string;
  disabled?: boolean;
  valueLabel?: string;
};

const items: Item[] = [
  { value: 'opt1', label: 'Option 1', disabled: false },
  { value: 'opt2', label: 'Option 2', disabled: false },
  {
    value: 'opt3',
    label: 'A text message to see how big labels will be handled',
    disabled: false,
  },
  { value: 'opt4', label: 'Option 3', disabled: true },
  {
    value: 'opt5',
    label: 'Option 4 on menu',
    disabled: false,
    valueLabel: 'Option 4 on input',
  },
];

const Select = withProviders(SelectRaw);
const SelectOption = withProviders(SelectOptionRaw);

const SingleSelect = ({
  children,
  value: initialValue = '',
  isRequired,
  hasError,
  isDisabled,
  isFloatingLabel,
  label = 'Select label',
  scale = 'standard',
  placeholder,
}: Partial<SelectProps>) => {
  const [value, setValue] = useState(initialValue as string);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      hasError={hasError}
      helperText='you need to make a selection'
      isDisabled={isDisabled}
      isFloatingLabel={isFloatingLabel}
      isMulti={false}
      isRequired={isRequired}
      label={label}
      onChange={handleChange}
      placeholder={placeholder}
      scale={scale}
      value={value}
    >
      {children ??
        items.map((it, index) => (
          <SelectOption
            index={index}
            isDisabled={it.disabled}
            key={it.value}
            value={it.value}
            {...(it?.valueLabel && { valueLabel: it?.valueLabel })}
          >
            {it.label}
          </SelectOption>
        ))}
    </Select>
  );
};

const MultiSelect = ({
  children,
  value: initialValue = [],
  isRequired,
  hasError,
  isDisabled,
  isFloatingLabel = false,
  label = 'Select label',
  scale = 'compact',
  variant = 'bottom-line',
}: Partial<SelectProps>) => {
  const [value, setValue] = useState(initialValue as string[]);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <Select
      hasError={hasError}
      helperText='you need to make a selection'
      isDisabled={isDisabled}
      isFloatingLabel={isFloatingLabel}
      isMulti
      isRequired={isRequired}
      label={label}
      onChange={handleChange}
      scale={scale}
      value={value}
      variant={variant}
    >
      {children ??
        items.map((it, index) => (
          <SelectOption
            index={index}
            isDisabled={it.disabled}
            key={it.value}
            value={it.value}
          >
            {it.label}
          </SelectOption>
        ))}
    </Select>
  );
};

const renderSelect = (props: Partial<SelectProps> = {}) => {
  const { container } = render(<SingleSelect {...props} />);

  const select = () => screen.getByRole('combobox');
  const menu = () => screen.getByRole('listbox');
  const options = () => within(menu()).getAllByRole('option');
  const label = () => screen.getByTestId('label-field');
  const helper = () => screen.getByTestId('select-helper-text');
  const value = () => within(select()).getByTestId('select-value');

  fireEvent.click(select());

  return { container, select, menu, options, label, helper, value };
};

const renderMultiSelect = (props: Partial<SelectProps> = {}) => {
  const { container } = render(<MultiSelect {...props} />);

  const select = () => screen.getByRole('combobox');
  const menu = () => screen.getByRole('listbox');
  const options = () => within(menu()).getAllByRole('option');
  const label = () => screen.getByTestId('label-field');
  const helper = () => screen.getByTestId('select-helper-text');
  const value = () => within(select()).getByTestId('select-value');
  const clear = () => within(select()).queryByTestId('clear-selection');

  fireEvent.click(select());

  return { container, select, menu, options, label, helper, value, clear };
};

describe('<Select />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Single Select', () => {
    test('should render with correct styles', () => {
      const { container } = renderSelect();

      expect(container).toMatchSnapshot();
    });

    test('should open the menu and display all options with proper ARIA role.', () => {
      const { select, menu, options } = renderSelect();

      expect(select()).toBeVisible();
      expect(menu()).toBeVisible();
      expect(options()).toHaveLength(5);

      expect(menu()).not.toHaveAttribute('aria-multiselectable', 'true');
    });

    test('should have value label different from option on menu', () => {
      const { options, value } = renderSelect();

      const option = options()[4];

      expect(option).toHaveTextContent('Option 4 on menu');

      fireEvent.click(option);

      expect(value()).toHaveTextContent('Option 4 on input');
    });

    test('should have placeholder and update selected values', () => {
      const { select, options, value } = renderSelect({
        placeholder: 'Select an option',
        isFloatingLabel: false,
      });

      expect(value()).toHaveTextContent('Select an option');
      expect(value()).toHaveAttribute('color', 'content.medium');

      fireEvent.click(options()[0]);

      expect(value()).toHaveTextContent('Option 1');
      expect(value()).toHaveAttribute('color', 'content.default');

      fireEvent.click(select());

      expect(options()[0]).toHaveAttribute('aria-selected', 'true');
      expect(options()[1]).toHaveAttribute('aria-selected', 'false');
    });

    test('should have label with pointer-events none if it has floating label', () => {
      const { label } = renderSelect({ isFloatingLabel: true });

      expect(label()).toHaveStyle('pointer-events: none;');
    });

    test('should be disabled if there is only one option', () => {
      render(
        <SingleSelect>
          <SelectOption index={0} value={items[0].value} />
        </SingleSelect>
      );

      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('disabled');
    });

    test('should render error attributes if hasError is true', () => {
      const { select, helper } = renderSelect({ hasError: true });

      const errorColor = theme.palette.error.default;

      const icon = within(select()).getByTestId('icon');

      expect(select()).toHaveAttribute('aria-invalid', 'true');
      expect(icon).toHaveStyle(`color: ${errorColor}`);
      expect(helper()).toHaveStyle(`color: ${errorColor}`);
    });

    test('should render disabled attributes if isDisabled is true', () => {
      const { select, helper, value } = renderSelect({
        isDisabled: true,
        isFloatingLabel: false,
      });

      const disabledColor = theme.palette.content.light;

      expect(select()).toHaveAttribute('disabled');
      expect(value()).toHaveStyle(`color: ${disabledColor}`);
      expect(helper()).toHaveStyle(`color: ${disabledColor}`);
    });

    test('should associate helper text via aria-describedby', () => {
      const { select, helper } = renderSelect();

      const describedBy = select().getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      expect(helper()).toBeVisible();
      expect(helper()).toHaveTextContent('you need to make a selection');
      expect(helper()).toHaveAttribute('id', describedBy);
    });

    test('should associate the label via aria-labelledby', () => {
      const { select, label } = renderSelect({ label: 'select' });

      const labelledBy = select().getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();

      expect(label()).toHaveTextContent('select');
      expect(label()).toHaveAttribute('id', labelledBy);
    });

    describe('Keyboard navigation', () => {
      test('ArrowDown opens the menu and Enter selects the second option', async () => {
        const { select, value } = renderSelect();

        fireEvent.click(select());

        select().focus();
        expect(select()).toHaveAttribute('aria-expanded', 'false');

        await act(async () => {
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{ArrowDown}');
        });

        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });

        expect(value()).toHaveTextContent('Option 2');
        expect(select()).toHaveAttribute('aria-expanded', 'false');
      });

      test('Space toggles and Enter selects; Tab closes without changing selection', async () => {
        const { select, value } = renderSelect();

        fireEvent.click(select());

        select().focus();
        expect(select()).toHaveAttribute('aria-expanded', 'false');

        await act(async () => {
          await userEvent.keyboard('{Spacebar}');
        });

        expect(select()).toHaveAttribute('aria-expanded', 'true');

        await act(async () => {
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.tab();
        });

        expect(select()).toHaveAttribute('aria-expanded', 'false');

        expect(value()).toHaveTextContent('');
      });
    });
  });

  describe('MultiSelect', () => {
    test('should allow multiple selections, show “2 options selected”', () => {
      const { select, menu, options, value } = renderMultiSelect();

      fireEvent.click(options()[0]);
      expect(value()).toHaveTextContent('Option 1');

      fireEvent.click(select());

      fireEvent.click(options()[1]);

      expect(value()).toHaveTextContent('2 options selected');

      fireEvent.click(select());

      expect(menu()).toHaveAttribute('aria-multiselectable', 'true');
    });

    test('should be able to deselect options', () => {
      const { select, options, value } = renderMultiSelect();

      fireEvent.click(options()[0]);
      fireEvent.click(select());
      fireEvent.click(options()[1]);

      expect(value()).toHaveTextContent('2 options selected');

      fireEvent.click(select());
      fireEvent.click(options()[1]);

      expect(value()).toHaveTextContent('Option 1');

      fireEvent.click(select());
      fireEvent.click(options()[0]);

      expect(value()).toHaveTextContent('');
    });

    test('should clear selections when clicking clear all button', () => {
      const { options, value, clear } = renderMultiSelect();

      fireEvent.click(options()[0]);
      fireEvent.click(options()[1]);
      expect(value()).toHaveTextContent('2 options selected');

      fireEvent.click(clear()!);

      expect(value()).toHaveTextContent('');
      expect(clear()).toBeNull();
    });

    describe('Keyboard navigation', () => {
      test('ArrowDown opens the menu and Enter selects options without closing the menu', async () => {
        const { select, value } = renderMultiSelect();

        fireEvent.click(select());

        select().focus();

        expect(select()).toHaveAttribute('aria-expanded', 'false');

        await act(async () => {
          await userEvent.keyboard('{ArrowDown}');
        });

        expect(select()).toHaveAttribute('aria-expanded', 'true');

        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });

        expect(select()).toHaveAttribute('aria-expanded', 'true');

        await act(async () => {
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{Enter}');
        });

        expect(value()).toHaveTextContent('2 options selected');

        await act(async () => {
          await userEvent.keyboard('{Escape}');
        });

        expect(select()).toHaveAttribute('aria-expanded', 'false');
      });

      test('Enter clears the selection when clicking clear button', async () => {
        const { select, value } = renderMultiSelect();

        fireEvent.click(select());

        select().focus();

        await act(async () => {
          await userEvent.keyboard('{ArrowDown}');
        });

        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });

        await act(async () => {
          await userEvent.keyboard('{Escape}');
          await userEvent.tab();
          await userEvent.keyboard('{Shift}');
        });

        expect(value()).toHaveTextContent('Option 1');

        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });

        expect(select()).toHaveAttribute('aria-expanded', 'false');
        expect(value()).toHaveTextContent('');
      });
    });
  });
});
