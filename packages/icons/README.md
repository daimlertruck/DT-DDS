# Icons Package

The Icons Package simplifies the process of integrating Material Icons into the different applications, providing a convenient way to enhance the visual appeal of your user interface with a wide variety of icons.

## Icons Usage

1. Install the package. Example using yarn:

```
yarn add @dt-dds/icons
```

2. Import the css file into your application:

```
import '@dt-dds/icons/index.css';
```

3. Create your icon element like:

```bash
<i class="dtui-symbols-outlined">
{code}
</i>
```

Where:

- **code**: is the name of the icon, that you can find in [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols).
- The class **dtui-symbols-outlined** should be something like:

```
    font-family: DTUI-icons-outlined;
    font-weight: normal;
    font-style: normal;
    font-size: ${fontSize};
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
```

You can learn more on how to customize the usage of the fonts in [Material Symbols Developer Docs](https://developers.google.com/fonts/docs/material_symbols).

In DT-DDS, we are currently supporting two font-family keys:

- **DTUI-icons-outlined**
- **DTUI-icons-sharp**

## Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Yarn](https://yarnpkg.com/) from managing packages

## Commands

- `yarn lint` - Lint all files within this package

## Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE.md)
