import Head from 'next/head';
import { useState } from 'react';
import {
  Typography,
  Form,
  TextField,
  Button,
  emitToast,
  ToastType,
  daimlertruckTheme as theme,
} from '@dt-dds/react';

const titleStyle = {
  marginBottom: '25px',
};

const formStyle = {
  width: '100%',
  padding: '25px 20vw',
  margin: '0 auto',
  backgroundColor: theme.palette.surface.contrast,
};

const buttonWrapperStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export default function Forms() {
  const [inputValues, setInputValues] = useState({
    field1: '',
    field2: '',
    field3: '',
  });

  const handleChange =
    (fieldKey: keyof typeof inputValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues((prev) => ({
        ...prev,
        [fieldKey]: event.target.value,
      }));
    };

  const handleSubmit = () => {
    setInputValues({
      field1: '',
      field2: '',
      field3: '',
    });
    emitToast({
      type: ToastType.Success,
      title: 'Form submitted',
      message: 'Toast Message example',
      dismissible: true,
    });
  };

  return (
    <>
      <Head>
        <title>Demo App - Forms</title>
        <meta name='description' content='Demo App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div>
        <Typography
          element='h2'
          fontStyles='h4Bold'
          color='grey_90'
          style={titleStyle}
        >
          Forms
        </Typography>

        <Form style={formStyle}>
          <Form.Group
            title={'Example form'}
            tooltip={'Extended Information about the form'}
          >
            <TextField
              label='label 1'
              required={true}
              initialValue={inputValues.field1}
              onChange={handleChange('field1')}
              value={inputValues.field1}
            />
          </Form.Group>
          <Form.Group isDisabled={false}>
            <TextField
              label='label 2'
              required={true}
              initialValue={inputValues.field2}
              onChange={handleChange('field2')}
              value={inputValues.field2}
            />
            <TextField
              label='label 3'
              initialValue={inputValues.field3}
              onChange={handleChange('field3')}
              value={inputValues.field3}
            />
          </Form.Group>

          <div style={buttonWrapperStyle}>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
