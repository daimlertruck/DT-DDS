# Next.js Pages Router + @dt-dds/react

This example demonstrates how to integrate [DT-DDS](https://github.com/daimlertruck/DT-DDS) with [Next.js](https://nextjs.org) using the Pages Router.

## Quick Start

```bash
yarn install
yarn dev
```

## Key Integration Points

### 1. Theme Provider (`_app.tsx`)

Wrap your app with the `Provider` and import the required CSS:

```tsx
import { Provider as ThemeProvider, theme } from '@dt-dds/react';
import '@dt-dds/fonts/index.css';
import '@dt-dds/icons/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### 2. SSR Styles (`_document.tsx`)

Extract Emotion CSS for server-side rendering to prevent FOUC (flash of unstyled content):

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { renderStatic, theme } from '@dt-dds/react';

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, ids } = await renderStatic(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### 3. Using Components

Import and use components from `@dt-dds/react`:

```tsx
import { Typography, Button } from '@dt-dds/react';

export default function Home() {
  return (
    <main>
      <Typography element='h1' fontStyles='h1Bold'>
        Welcome to DT-DDS
      </Typography>
      <Button>Get Started</Button>
    </main>
  );
}
```

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `yarn dev`   | Start development server |
| `yarn build` | Build for production     |
| `yarn start` | Start production server  |
| `yarn clean` | Clear `.next` cache      |
| `yarn lint`  | Run ESLint               |

## Learn More

- [@dt-dds/react Documentation](https://github.com/daimlertruck/DT-DDS#-installation)
- [Next.js Pages Router Docs](https://nextjs.org/docs/pages)
