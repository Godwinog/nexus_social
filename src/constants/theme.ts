import { COLORS } from './colors';

export const LIGHT_THEME = {
  colors: {
    background: COLORS.LIGHT_BG,
    surface: COLORS.LIGHT_SURFACE,
    text: COLORS.LIGHT_TEXT,
    subtitle: COLORS.LIGHT_SUBTITLE,
    border: COLORS.LIGHT_BORDER,
    primary: COLORS.PRIMARY,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
};

export const DARK_THEME = {
  colors: {
    background: COLORS.DARK_BG,
    surface: COLORS.DARK_SURFACE,
    text: COLORS.DARK_TEXT,
    subtitle: COLORS.DARK_SUBTITLE,
    border: COLORS.DARK_BORDER,
    primary: COLORS.PRIMARY,
  },
  spacing: LIGHT_THEME.spacing,
  borderRadius: LIGHT_THEME.borderRadius,
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.6)',
  },
};
