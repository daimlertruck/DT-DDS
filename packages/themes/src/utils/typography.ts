export const getTextStyles = (
  fontWeight: number,
  fontSize: string,
  lineHeight: string,
  letterSpacing: string = 'normal',
  textTransform: string = 'none'
) => `
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
    margin: 0;
    text-transform: ${textTransform};
  `;
