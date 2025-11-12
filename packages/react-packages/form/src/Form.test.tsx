import { render, fireEvent, waitFor } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { TextField } from '@dt-dds/react-text-field';

import { Form } from './Form';

describe('<Form /> component', () => {
  const ProvidedForm = withProviders(Form);

  it('renders simple form', () => {
    const { container } = render(
      <ProvidedForm>
        <TextField label='label 1' />
        <TextField label='label 2' />
      </ProvidedForm>
    );

    expect(container).toMatchSnapshot();
  });

  describe('with Form.Group', () => {
    it('should render a form with display flex', () => {
      const { container } = render(
        <ProvidedForm>
          <Form.Group>
            <TextField label='label 1' />
            <TextField label='label 2' />
          </Form.Group>
        </ProvidedForm>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render a form with group title', () => {
      const { container } = render(
        <ProvidedForm>
          <Form.Group title='Group title'>
            <TextField label='label 1' />
            <TextField label='label 2' />
          </Form.Group>
        </ProvidedForm>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render a disabled form group', () => {
      const { container } = render(
        <ProvidedForm>
          <Form.Group isDisabled>
            <TextField label='label 1' />
          </Form.Group>
        </ProvidedForm>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render the tooltip after hover', async () => {
      const { getByTestId } = render(
        <ProvidedForm>
          <Form.Group title='Title' tooltip='Testing tooltip'>
            <TextField label='label 1' />
          </Form.Group>
        </ProvidedForm>
      );

      fireEvent.mouseEnter(getByTestId('tooltip-container'));

      await waitFor(() => getByTestId('tooltip-content'));

      expect(getByTestId('tooltip-content')).toBeInTheDocument();
    });
  });
});
