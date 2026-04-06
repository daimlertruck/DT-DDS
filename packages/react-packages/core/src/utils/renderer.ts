import { cache } from '@emotion/css';
import createEmotionServer from '@emotion/server/create-instance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderStatic = async (html: any) => {
  const { extractCritical } = createEmotionServer(cache);
  const { ids, css } = extractCritical(html);

  if (html === undefined) {
    throw new Error('did you forget to return html from renderToString?');
  }

  return { html, ids, css };
};
