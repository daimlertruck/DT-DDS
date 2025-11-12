import { render, fireEvent } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { SegmentedControl } from './SegmentedControl';

const ProvidedSegmentedControl = withProviders(SegmentedControl);

describe('SegmentedControl', () => {
  it('renders without errors', () => {
    const { getByTestId, getByRole, container } = rendersSegmentedControl();

    const control = getByTestId('segmented-control');

    fireEvent.click(getByRole('button', { name: 'Gallery' }));
    expect(control).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls handleChange handler when an option is clicked', () => {
    const handleChange = jest.fn();
    const { getByRole } = rendersSegmentedControl(handleChange);

    fireEvent.click(getByRole('button', { name: 'Gallery' }));
    expect(handleChange).toHaveBeenCalledWith('gallery');
  });

  it('renders options with tooltips when showLabel is false', () => {
    const { getByTestId, getByRole } = rendersSegmentedControl();

    fireEvent.mouseOver(getByRole('button', { name: 'Gallery' }));
    expect(getByTestId('tooltip-content')).toHaveTextContent('Gallery');
  });

  it('renders disabled option correctly', () => {
    const { getByRole } = render(
      <ProvidedSegmentedControl
        dataTestId='segmented-control'
        selectedValue='list'
      >
        <SegmentedControl.Option iconCode='list' label='List' value='list' />
        <SegmentedControl.Option
          disabled
          iconCode='grid_view'
          label='Gallery'
          value='gallery'
        />
      </ProvidedSegmentedControl>
    );

    const galleryOption = getByRole('button', { name: 'Gallery' });
    expect(galleryOption).toBeDisabled();
  });

  it('renders label when icon is not present even with showLabel flag as false', () => {
    const { getByRole } = render(
      <ProvidedSegmentedControl
        dataTestId='segmented-control'
        selectedValue='list'
        showLabel={false}
      >
        <SegmentedControl.Option label='List' value='list' />
      </ProvidedSegmentedControl>
    );

    expect(getByRole('button', { name: 'List' })).toHaveTextContent('List');
  });
});

const rendersSegmentedControl = (handleChange?: () => void) => {
  return render(
    <ProvidedSegmentedControl
      dataTestId='segmented-control'
      {...(handleChange && { onChangeControl: handleChange })}
    >
      <SegmentedControl.Option iconCode='list' label='List' value='list' />
      <SegmentedControl.Option
        iconCode='grid_view'
        label='Gallery'
        value='gallery'
      />
    </ProvidedSegmentedControl>
  );
};
