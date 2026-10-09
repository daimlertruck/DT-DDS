# Form

The Form component is used to gather user input and submit it to the backend. It supports various form controls and can group multiple fields using Form.Group. Each group can have a title, be disabled, and include a tooltip for extra information. The form's onSubmit function handles form submissions, and additional customization can be applied through the style and dataTestId properties.

## Usage

```jsx
import { Form, TextField } from '@dt-dds/react';

export const App = () => {
  return (
    <Form>
      <TextField label='label 1' />
    </Form>
  );
};
```

Also, you can use form groups to group a bunch of fields.

```jsx
import { Form, TextField } from '@dt-dds/react';

export const App = () => {
  return (
    <Form>
      <Form.FormGroup>
        <TextField label='label 1' />
        <TextField label='label 2' />
      </Form.FormGroup>
    </Form>
  );
};
```

## API

### Form

| Property     | Type                                           | Default | Description                     |
| ------------ | ---------------------------------------------- | ------- | ------------------------------- |
| `children`   | `ReactNode`                                    | -       | Child components to be rendered |
| `dataTestId` | `string`                                       | toggle  | Toggle test identifier          |
| `style`      | `React.CSSProperties`                          | -       | Gives the Form css properties   |
| `onSubmit`   | `(event: FormEvent<HTMLFormElement>) => void;` | -       | The HTML form submit handler.   |

### Form.Group

| Property   | Type        | Default | Description                                                                                                                               |
| ---------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered                                                                                                           |
| `title`    | `string`    | -       | Title to be shown at the top of the group                                                                                                 |
| `disabled` | `boolean`   | -       | If group is disabled, a opacity is set and the pointer events set to none                                                                 |
| `tooltip`  | `string`    | -       | If a string is passed to this prop, a info svg will be rendered wrapped in a tooltip. The tooltip content will be the value of this prop. |

## &copy; License

Licensed under [MIT License](LICENSE)
