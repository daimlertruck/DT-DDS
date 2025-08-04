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
  shadows: {
    none: string;
    0: string;
    0.5: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  spacing: {
    none: number | string;
    '6xs': string;
    '5xs': string;
    '4xs': string;
    '3xs': string;
    '2xs': string;
    xs: string;
    m: string;
    s: string;
    l: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    // Legacy
    xxxsmall: string;
    xxsmall: string;
    xsmall: string;
    small: string;
    xmedium: string;
    medium: string;
    gutter: string;
    large: string;
    xlarge: string;
    xxlarge: string;
    xxxlarge: string;
    xxxxlarge: string;
  };
  fontStyles: {
    // Headings - Regular variants
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    // Headings - Bold variants
    h1Bold: string;
    h2Bold: string;
    h3Bold: string;
    h4Bold: string;
    h5Bold: string;
    h6Bold: string;
    // Headings - XS Regular variants
    h1XsRegular: string;
    h2XsRegular: string;
    h3XsRegular: string;
    h4XsRegular: string;
    h5XsRegular: string;
    h6XsRegular: string;
    // Headings - XS Bold variants
    h1XsBold: string;
    h2XsBold: string;
    h3XsBold: string;
    h4XsBold: string;
    h5XsBold: string;
    h6XsBold: string;
    // Body - Large variants
    bodyLgRegular: string;
    bodyLgBold: string;
    // Body - Medium variants
    bodyMdRegular: string;
    bodyMdBold: string;
    // Body - Small variants
    bodySmRegular: string;
    bodySmBold: string;
    // Body - XS variants
    bodyXsRegular: string;
    bodyXsBold: string;
    // Buttons
    buttonLg: string;
    buttonMd: string;
    buttonSm: string;
    // Links - Large variants
    linkLgRegular: string;
    linkLgBold: string;
    // Links - Medium variants
    linkMdRegular: string;
    linkMdBold: string;
    // Links - Small variants
    linkSmRegular: string;
    linkSmBold: string;
    // Legacy (keeping for backward compatibility)
    body1Bold: string;
    body1: string;
    body2Bold: string;
    body2: string;
    body3Bold: string;
    body3: string;
    body4Bold: string;
    body4: string;
    link1Bold: string;
    link1: string;
    link2Bold: string;
    link2: string;
    link3Bold: string;
    link3: string;
    button1: string;
    button2: string;
    button3: string;
    p: string;
    pSmall: string;
    pXSmall: string;
    pXXSmall: string;
    tag: string;
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
    // Legacy
    s: number;
    m: number;
    l: number;
    xl: number;
    md: number;
    lg: number;
    xxl: number;
  };
  radius: {
    none: string;
    '6xs': string;
    '5xs': string;
    '4xs': string;
    '3xs': string;
    '2xs': string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    full: string;
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
  fontFamily: {
    default: string;
  };
  responsiveFontStyles: { [key: string]: string };
  iconSizes: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  icons?: 'outlined' | 'rounded';
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
