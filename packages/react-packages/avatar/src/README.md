# Avatar

Avatars can be used to display circular user profile in user menu, tables etc.

## Usage

```jsx
import { Avatar, AvatarType, AvatarSize } from '@dt-dds/react';

export const App = () => {
  return (
    <div>
      <Avatar
        type={AvatarType.Primary}
        size={AvatarSize.Medium}
        title='User Name'
      />
    </div>
  );
};
```

## API

### Avatar

This component can contain upto two simple characters by passing a string in prop `title`

| Property         | Type               | Default | Description                                                         |
| ---------------- | ------------------ | ------- | ------------------------------------------------------------------- |
| `title`          | `ReactNode`        | -       | Letter characters shown in the avatar                               |
| `type`           | `enum<AvatarType>` | primary | You can choose type of the Avatar you want for different use cases  |
| `size`           | `enum<AvatarSize>` | medium  | Sets the Avatar size given the available options                    |
| `imageSrc`       | `string`           | -       | Optional profile image path (will only work with "Profile" type)    |
| `dataTestId`     | `string`           | avatar  | Avatar test identifier                                              |
| `customInitials` | `string`           | -       | Custom initials will replace avatar name acronym, limited to 2 char |
| `hasTooltip`     | `boolean`.         | `true`  | Enables or disables the avatar tooltip.                             |
