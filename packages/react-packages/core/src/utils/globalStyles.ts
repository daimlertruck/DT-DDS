import { CustomTheme as Theme } from '@dt-dds/themes';
import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

// Pass theme as argument
export const globalStyles = (theme: Theme) => css`
  ${emotionNormalize}

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: greyscale;
    font-family: ${theme.fontFamily.default};
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fontFamily.default};
    width: 100%;
    min-height: 100vh;

    ${theme.fontStyles.body1}
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;
