import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';
import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ExtraComponent, TextField, TextFieldProps } from './TextField';

const TextFieldTypeOptions = {
  Text: 'text',
  Date: 'date',
  DatetimeLocal: 'datetime-local',
  Email: 'email',
  Month: 'month',
  Number: 'number',
  Password: 'password',
  Search: 'search',
  Tel: 'tel',
  Time: 'time',
  Url: 'url',
  Week: 'week',
};

type TextFieldPropsWithExtrasProp = TextFieldProps & {
  extras: 'suffix' | 'prefix' | 'both' | 'none';
};

const extraPrefix: ExtraComponent = {
  component: <Icon code='home_work' size='l' />,
};

const extraSuffix: ExtraComponent = {
  component: <Icon code='home_work' size='l' />,
};

const meta: Meta<TextFieldPropsWithExtrasProp> = {
  component: TextField,
  title: 'Data Display/TextField',
  argTypes: {
    onChange: {
      options: [true, undefined],
      control: {
        type: 'radio',
        labels: {
          true: 'Has onChange',
          undefined: 'Does not have onChange',
        },
      },
    },
    maxLength: { control: { type: 'number', min: 1 } },
    extras: {
      options: ['suffix', 'prefix', 'both', 'none'],
      control: {
        type: 'select',
      },
    },
    type: {
      options: TextFieldTypeOptions,
      control: { type: 'select' },
    },
    variant: {
      options: {
        outlined: 'outlined',
        bottomLine: 'bottomLine',
      },
      control: { type: 'select' },
    },
    backgroundFill: {
      options: {
        default: 'default',
        contrast: 'contrast',
        light: 'light',
      },
      control: { type: 'select' },
    },
  },
  render: ({ onChange, extras, ...props }) => {
    return (
      <TextField
        {...props}
        {...(onChange &&
          ({
            onChange: (data: string) => console.log('data changed: ', data),
          } as unknown as TextFieldProps['onChange']))}
        {...(extras === 'prefix' && { extraPrefix })}
        {...(extras === 'suffix' && { extraSuffix })}
        {...(extras === 'both' && { extraSuffix, extraPrefix })}
      />
    );
  },
};

export default meta;

export const Default: StoryObj<TextFieldPropsWithExtrasProp> = {
  args: {
    type: TextFieldTypeOptions.Text,
    name: 'field-name',
    label: 'My label',
    id: '',
    message: 'Additional info',
    initialValue: '',
    maxLength: undefined,
    required: true,
    requiredMessage: '',
    onChange: undefined,
    hasError: false,
    disabled: false,
    isFloatingLabel: true,
    readOnly: false,
    placeholder: 'My field placeholder',
    variant: 'outlined',
    backgroundFill: 'default',
    extras: 'none',
  },
};

export const SearchField: StoryObj<TextFieldPropsWithExtrasProp> = {
  args: {
    type: TextFieldTypeOptions.Search,
    isFloatingLabel: false,
    name: 'search',
    label: 'Search',
    extraSuffix: {
      onClick: (text: string) => console.log('search', text),
      component: <Icon code='search' />,
    },
    onResetInput: () => console.log('reset'),
  },
};

export const ChatInputField: StoryObj<TextFieldPropsWithExtrasProp> = {
  args: {
    type: TextFieldTypeOptions.Text,
    isFloatingLabel: false,
    name: 'chat-box',
    label: 'Write your sentence',
    extraSuffix: {
      onClick: (text: string) => console.log('chat', text),
      component: <Icon code='send' />,
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        console.log('ev', event);
      }
    },
  },
};

export const WithLabelIcon: StoryObj<TextFieldPropsWithExtrasProp> = {
  args: {
    type: TextFieldTypeOptions.Text,
    isFloatingLabel: false,
    name: 'field-name',
    label: 'My label',
    labelIcon: (
      <Tooltip>
        <Icon code='info' size='s' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
    ),
    message: 'Additional info',
  },
};
