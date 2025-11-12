import { StoryFn } from '@storybook/react-vite';

import { BaseProps } from '@dt-dds/react-core';
import { TextField } from '@dt-dds/react-text-field';

import { GroupProps } from './Form';

import { Form } from '.';

export default {
  title: 'Data Display/Form',
  component: Form,
};

const Template: StoryFn<BaseProps> = () => {
  return (
    <Form>
      <TextField label='label 1' />
    </Form>
  );
};

export const Default = Template.bind({});

Default.args = {};

const TemplateFormGroup: StoryFn<GroupProps> = ({
  isDisabled,
  title,
  tooltip,
}) => (
  <Form>
    <Form.Group title={title} tooltip={tooltip}>
      <TextField label='label 1' />
    </Form.Group>
    <Form.Group isDisabled={isDisabled}>
      <TextField label='label 2' />
      <TextField label='label 3' />
    </Form.Group>
  </Form>
);

export const FormGroup = TemplateFormGroup.bind({});

FormGroup.args = {
  title: '',
  tooltip: '',
  isDisabled: false,
};
