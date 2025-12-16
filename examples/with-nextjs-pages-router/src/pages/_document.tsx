import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentProps } from 'next/document';
import { renderStatic, theme } from '@dt-dds/react';

const globalStyles = `
  html, body {
    margin: 0;
    padding: 0;
    background-color: ${theme.palette.surface.default};
  }
`;

// Custom Document for SSR Emotion styles extraction.
export default class AppDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
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
          <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
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
