type Palette = {
  [category in 'surface' | 'border' | 'content']: {
    default: string;
    light: string;
    medium: string;
    dark: string;
    contrast: string;
  };
} & {
  [category in
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'informative'
    | 'accent']: {
    default: string;
    light: string;
    medium: string;
    dark: string;
  };
};

export type CustomTheme = {
  palette: Palette;
  colors: {
    [key: string]: string;
  };
  fontFamily: {
    default: string;
  };
  responsiveFontStyles: {
    [key: string]: string;
  };
  fontStyles: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    h1Bold: string;
    h2Bold: string;
    h3Bold: string;
    h4Bold: string;
    h5Bold: string;
    h6Bold: string;
    h1XsRegular: string;
    h2XsRegular: string;
    h3XsRegular: string;
    h4XsRegular: string;
    h5XsRegular: string;
    h6XsRegular: string;
    h1XsBold: string;
    h2XsBold: string;
    h3XsBold: string;
    h4XsBold: string;
    h5XsBold: string;
    h6XsBold: string;
    bodyLgRegular: string;
    bodyLgBold: string;
    bodyMdRegular: string;
    bodyMdBold: string;
    bodySmRegular: string;
    bodySmBold: string;
    bodyXsRegular: string;
    bodyXsBold: string;
    buttonLg: string;
    buttonMd: string;
    buttonSm: string;
    linkLgRegular: string;
    linkLgBold: string;
    linkMdRegular: string;
    linkMdBold: string;
    linkSmRegular: string;
    linkSmBold: string;
    // Legacy (keeping for backward compatibility)
    body1Bold?: string;
    body1?: string;
    body2Bold?: string;
    body2?: string;
    body3Bold?: string;
    body3?: string;
    body4Bold?: string;
    body4?: string;
    link1Bold?: string;
    link1?: string;
    link2Bold?: string;
    link2?: string;
    link3Bold?: string;
    link3?: string;
    button1?: string;
    button2?: string;
    button3?: string;
    p?: string;
    pSmall?: string;
    pXSmall?: string;
    pXXSmall?: string;
    tag?: string;
  };
  shadows: {
    elevation_100: string;
    elevation_200: string;
    elevation_300: string;
    elevation_400: string;
    elevation_500: string;
    elevation_600: string;
    elevation_inset: string;
    none: string;
    // Legacy (keeping for backward compatibility)
    0?: string;
    0.5?: string;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    xs?: string;
    s: string;
    m?: string;
    l?: string;
    xl?: string;
    '2xl'?: string;
    inner?: string;
  };
  spacing: {
    spacing_0: string;
    spacing_10: string;
    spacing_20: string;
    spacing_30: string;
    spacing_40: string;
    spacing_50: string;
    spacing_60: string;
    spacing_70: string;
    spacing_80: string;
    spacing_90: string;
    spacing_100: string;
    spacing_200: string;
    spacing_300: string;
    spacing_400: string;
    spacing_500: string;
    // Legacy (keeping for backward compatibility)
    none?: number | string;
    '6xs'?: string;
    '5xs'?: string;
    '4xs'?: string;
    '3xs'?: string;
    '2xs'?: string;
    xs?: string;
    m?: string;
    s?: string;
    l?: string;
    xl?: string;
    '2xl'?: string;
    '3xl'?: string;
    '4xl'?: string;
    '5xl'?: string;
    xxxsmall?: string;
    xxsmall?: string;
    xsmall?: string;
    small?: string;
    xmedium?: string;
    medium?: string;
    gutter?: string;
    large?: string;
    xlarge?: string;
    xxlarge?: string;
    xxxlarge?: string;
    xxxxlarge?: string;
  };
  animations: {
    emphasizedDecelerate: {
      duration: string;
      timingFunction: string;
    };
  };
  breakpoints: {
    mq1: number;
    mq2: number;
    mq3: number;
    mq4: number;
    mq5: number;
    mq6: number;
    // Legacy (keeping for backward compatibility)
    s?: number;
    m?: number;
    l?: number;
    xl?: number;
    md?: number;
    lg?: number;
    xxl?: number;
  };
  radius: {
    radius_0: string;
    radius_10: string;
    radius_20: string;
    radius_30: string;
    radius_40: string;
    radius_50: string;
    radius_60: string;
    radius_70: string;
    radius_80: string;
    radius_90: string;
    radius_100: string;
    radius_200: string;
    radius_300: string;
    radius_400: string;
    radius_500: string;
    // Legacy (keeping for backward compatibility)
    none?: string;
    '6xs'?: string;
    '5xs'?: string;
    '4xs'?: string;
    '3xs'?: string;
    '2xs'?: string;
    xs?: string;
    s?: string;
    m?: string;
    l?: string;
    xl?: string;
    full?: string;
  };
  shape: {
    // Existing shapes
    button: string;
    checkbox: string;
    modal: string;
    emptyState: string;
    dropdown: string;
    message: string;
    toast: string;
    tooltip: string;
    progressbar: string;
    accordion: string;
    formField: string;
    segmentedControl: string;
    // New shapes from JSON
    avatar: string;
    badge: string;
    card: string;
    container: string;
    datepicker: string;
    drawer: string;
    timepicker: string;
    pagination: string;
    radioButton: string;
    tab: string;
    toggle: string;
    tagRounded: string;
    tagSquared: string;
    switch: string;
    definitionList: string;
    header: string;
    navigationMenu: string;
    option: string;
    kpiCard: string;
    footer: string;
    slider: string;
    skeleton: string;
  };
  iconSizes: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  icons?: 'outlined' | 'sharp';
  components?: {
    [componentName: string]: {
      [tokenKey: string]:
        | string
        | {
            [nestedKey: string]:
              | string
              | {
                  [deepNestedKey: string]: string;
                };
          };
    };
  };
};

export type Colors = keyof Pick<
  CustomTheme['palette'],
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'informative'
  | 'warning'
  | 'accent'
>;

export type Breakpoints = keyof CustomTheme['breakpoints'];

type FlattenKeys<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${FlattenKeys<T[K]> extends never
        ? ''
        : `.${FlattenKeys<T[K]>}`}`;
    }[keyof T]
  : never;

export type PaletteKeys = FlattenKeys<CustomTheme['palette']>;
