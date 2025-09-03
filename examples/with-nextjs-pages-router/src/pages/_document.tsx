import { renderStatic, theme } from '@dt-dds/react';
import Document, {
  DocumentContext,
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import * as React from 'react';

const globalCss = `
  html, body {
    background-color: ${theme.palette.surface.light};
  }
`;

export default class AppDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, ids } = await renderStatic(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
          <style dangerouslySetInnerHTML={{ __html: globalCss }} />
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
