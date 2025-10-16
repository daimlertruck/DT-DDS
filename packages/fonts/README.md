# Fonts Package

The Fonts Package simplifies the process of integrating Daimler Truck fonts into the different applications.

## Fonts Usage

1. Install the package. Example using yarn:

```bash
yarn add @dt-dds/fonts
```

2. Import the css file into your application:

```ts
import '@dt-dds/fonts/index.css';
```

or use the exported fonts object:

```ts
import { fonts } from '@dt-dds/fonts';
```

Additionally, the fonts are also directly accessible on the package:
- @dt-dds/fonts/DaimlerCS-Regular.woff
- @dt-dds/fonts/DaimlerCS-Regular.woff2
- @dt-dds/fonts/DaimlerCS-Bold.woff
- @dt-dds/fonts/DaimlerCS-Bold.woff2

## Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- [Yarn](https://yarnpkg.com/) from managing packages

## Commands

- `yarn build` - Build the package
- `yarn dev` - Run the package locally
- `yarn lint` - Lint all files within this package

## Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
typography
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

## Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE.md)
