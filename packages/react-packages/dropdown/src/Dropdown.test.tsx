import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { withDropdownProvider } from './utils';

import { Dropdown, DropdownFill, DropdownVariant } from '.';

interface RenderDropdownProps {
  fill?: DropdownFill;
  variant?: DropdownVariant;
  isSelectDisabled?: boolean;
  isOptionDisabled?: boolean;
  hasBorder?: boolean;
  hasDeselect?: boolean;
  defaultValue?: { text: string; value: string };
  hasError?: boolean;
  isRequired?: boolean;
  options?: Array<{ text: string; value: string }>;
}

describe('<Dropdown /> component', () => {
  const onClickMock = jest.fn();

  const dropdownSelectId = 'dropdown-select';
  const menuRole = 'menu';
  const optionRole = 'option';
  const dropdownTextId = 'dropdown-text';

  const OPTIONS = [
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' },
  ];

  const ProvidedDropdown = withProviders(withDropdownProvider(Dropdown));

  const renderDropdown = ({
    fill,
    variant,
    isSelectDisabled,
    isOptionDisabled,
    hasBorder,
    hasDeselect,
    defaultValue,
    hasError,
    isRequired,
    options = OPTIONS,
  }: RenderDropdownProps = {}) =>
    render(
      <ProvidedDropdown defaultValue={defaultValue} name='test-dropdown'>
        <Dropdown.Container>
          <Dropdown.Select
            fill={fill}
            hasBorder={hasBorder}
            hasDeselect={hasDeselect}
            hasError={hasError}
            isDisabled={isSelectDisabled}
            isRequired={isRequired}
            label='Label'
            variant={variant}
          >
            {options.map((option) => (
              <Dropdown.Option
                isDisabled={isOptionDisabled}
                key={option.value}
                onClick={onClickMock}
                option={option}
              >
                {option.text ?? option.value}
              </Dropdown.Option>
            ))}
          </Dropdown.Select>
          <Dropdown.Detail hasError={hasError} isDisabled={isSelectDisabled}>
            A short message.
          </Dropdown.Detail>
        </Dropdown.Container>
      </ProvidedDropdown>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dropdown correctly', () => {
    const { container } = renderDropdown();

    const select = screen.getByTestId(dropdownSelectId);
    fireEvent.click(select);

    expect(container).toMatchSnapshot();
  });

  it('should change dropdown option by triggering onClick', () => {
    renderDropdown();

    const select = screen.getByTestId(dropdownSelectId);
    const menu = screen.getByRole(menuRole);

    expect(select.textContent).toContain('Label');
    expect(select.textContent).toContain('Select an option');

    fireEvent.click(select);

    const optionsEl = within(menu).getAllByRole(optionRole);

    expect(optionsEl.length).toEqual(2);

    const option = optionsEl[0];

    fireEvent.click(option);

    expect(option).toHaveTextContent('Option 1');
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not change option when the clicked option is disabled', () => {
    renderDropdown({ isOptionDisabled: true });

    const select = screen.getByTestId(dropdownSelectId);
    const menu = screen.getByRole(menuRole);

    fireEvent.click(select);

    const optionsEl = within(menu).getAllByRole(optionRole);
    const option = optionsEl[0];

    expect(select).toHaveTextContent('Select an option');

    fireEvent.click(option);

    expect(onClickMock).toHaveBeenCalledTimes(0);

    expect(select).toHaveTextContent('Select an option');
  });

  it('should render the disabled dropdown', () => {
    renderDropdown({ isSelectDisabled: true });

    const select = screen.getByTestId(dropdownSelectId);
    const dropdownText = within(screen.getByTestId(dropdownTextId)).getByTestId(
      'typography'
    );

    expect(select).toBeDisabled();
    expect(dropdownText).toHaveAttribute('color', 'content.light');
  });

  it('should render the error state', () => {
    renderDropdown({ hasError: true });

    const select = screen.getByTestId(dropdownSelectId);
    const dropdownText = within(screen.getByTestId(dropdownTextId)).getByTestId(
      'typography'
    );

    expect(select).toHaveStyle(`border-color: ${theme.palette.error.default}`);
    expect(dropdownText).toHaveAttribute('color', 'error.default');
  });

  it('should select by default if there is only one option', () => {
    renderDropdown({ options: [OPTIONS[0]] });

    const select = screen.getByTestId(dropdownSelectId);
    const dropdownText = within(screen.getByTestId(dropdownTextId)).getByTestId(
      'typography'
    );

    expect(select).toHaveTextContent('Option 1');
    expect(dropdownText).toHaveAttribute('color', 'content.medium');
  });

  it('should render a dropdown without border', () => {
    renderDropdown({ hasBorder: false });

    const select = screen.getByTestId(dropdownSelectId);

    expect(select).toHaveStyle('border: none');
  });

  it.each`
    fill          | expectedBackgroundColor
    ${'light'}    | ${theme.palette.surface.light}
    ${'contrast'} | ${theme.palette.surface.contrast}
    ${'default'}  | ${theme.palette.surface.default}
  `(
    'renders select with $fill background fill',
    ({ fill, expectedBackgroundColor }) => {
      renderDropdown({ fill });

      const select = screen.getByTestId(dropdownSelectId);

      expect(select).toHaveStyle(
        `background-color: ${expectedBackgroundColor}`
      );
    }
  );

  it.each`
    variant          | expectedBorderWidth
    ${'outlined'}    | ${'border-width: 1px'}
    ${'bottom-line'} | ${'border-width: 0 0 1px'}
  `(
    'renders select with $variant variant with correct border width',
    ({ variant, expectedBorderWidth }) => {
      renderDropdown({ variant });

      const select = screen.getByTestId(dropdownSelectId);

      expect(select).toHaveStyle(expectedBorderWidth);
    }
  );

  it('should reset dropdown value when deselecting', () => {
    renderDropdown({ hasDeselect: true, defaultValue: OPTIONS[1] });

    const select = screen.getByTestId(dropdownSelectId);
    const deselect = screen.getByTestId('deselect-value');

    expect(select).toHaveTextContent('Option 2');

    fireEvent.click(deselect);

    expect(select).toHaveTextContent('Select an option');
  });

  it('should renders dropdown as required', () => {
    renderDropdown({ isRequired: true });

    const select = screen.getByTestId(dropdownSelectId);

    expect(select.textContent).toContain('Label*');
  });
});
