/* eslint-disable @typescript-eslint/no-var-requires */
import { renderStatic } from '../renderer';

// Mock @emotion/css and @emotion/server
jest.mock('@emotion/css', () => ({
  cache: {
    inserted: {},
    sheet: {},
  },
}));

jest.mock('@emotion/server/create-instance', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    extractCritical: jest.fn(),
  })),
}));

describe('renderer', () => {
  const mockExtractCritical = jest.fn();
  const mockCreateEmotionServer =
    require('@emotion/server/create-instance').default;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateEmotionServer.mockReturnValue({
      extractCritical: mockExtractCritical,
    });
  });

  it('should extract critical CSS and return html, ids, and css', async () => {
    const mockHtml = '<div>Test HTML</div>';
    const mockIds = ['css-123'];
    const mockCss = '.css-123 { color: red; }';

    mockExtractCritical.mockReturnValue({
      ids: mockIds,
      css: mockCss,
    });

    const result = await renderStatic(mockHtml);

    expect(mockCreateEmotionServer).toHaveBeenCalled();
    expect(mockExtractCritical).toHaveBeenCalledWith(mockHtml);
    expect(result).toEqual({
      html: mockHtml,
      ids: mockIds,
      css: mockCss,
    });
  });

  it('should throw error when html is undefined', async () => {
    mockExtractCritical.mockReturnValue({
      ids: [],
      css: '',
    });

    await expect(renderStatic(undefined)).rejects.toThrow(
      'did you forget to return html from renderToString?'
    );
  });

  it('should handle null html without throwing error', async () => {
    mockExtractCritical.mockReturnValue({
      ids: [],
      css: '',
    });

    const result = await renderStatic(null);

    expect(result).toEqual({
      html: null,
      ids: [],
      css: '',
    });
  });
});
