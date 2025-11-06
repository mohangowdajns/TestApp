import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';
import { lightColors, darkColors } from './color';
import { fontConfig } from './fonts';

// Spacing system (8px base unit)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Border radius system
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// Elevation/Shadow system for Material Design
export const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
} as const;

// Layout constants
export const layout = {
  headerHeight: 56,
  bottomTabHeight: 60,
  drawerWidth: 280,
  buttonHeight: 44,
  inputHeight: 48,
  iconSize: 24,
  iconSizeLarge: 32,
  iconSizeSmall: 20,
  avatarSize: 40,
  avatarSizeLarge: 56,
  avatarSizeSmall: 32,
} as const;

// Animation durations (in milliseconds)
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Create light theme - for PaperProvider (must follow MD3 structure)
const lightPaperTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: lightColors.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: lightColors.primaryLight,
    onPrimaryContainer: lightColors.primary,
    secondary: lightColors.info,
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E3F2FD',
    onSecondaryContainer: lightColors.info,
    tertiary: lightColors.accent,
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#D4F8F7',
    onTertiaryContainer: lightColors.accent,
    error: lightColors.error,
    onError: '#FFFFFF',
    errorContainer: '#FFEBEE',
    onErrorContainer: lightColors.error,
    background: lightColors.background,
    onBackground: lightColors.text,
    surface: lightColors.surface,
    onSurface: lightColors.text,
    surfaceVariant: lightColors.surfaceVariant,
    onSurfaceVariant: lightColors.textSecondary,
    outline: lightColors.border,
    outlineVariant: lightColors.divider,
    scrim: lightColors.scrim,
    inverseSurface: lightColors.inverseSurface,
    inverseOnSurface: '#F5F5F5',
    inversePrimary: lightColors.primaryLight,
    shadow: 'rgba(0, 0, 0, 0.1)',
    surfaceDim: '#F0F0F0',
    surfaceBright: '#FFFFFF',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F9F9F9',
    surfaceContainer: '#F5F5F5',
    surfaceContainerHigh: '#EEEEEE',
    surfaceContainerHighest: '#E8E8E8',
    // Custom colors for convenience
    text: lightColors.text,
    textSecondary: lightColors.textSecondary,
    textTertiary: lightColors.textTertiary,
    divider: lightColors.divider,
    success: lightColors.success,
    warning: lightColors.warning,
    info: lightColors.info,
    border: lightColors.border,
  },
  fonts: fontConfig,
} as const;

// Create dark theme - for PaperProvider (must follow MD3 structure)
const darkPaperTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: darkColors.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: darkColors.primaryDark,
    onPrimaryContainer: darkColors.primaryLight,
    secondary: darkColors.info,
    onSecondary: '#FFFFFF',
    secondaryContainer: '#1B4A7A',
    onSecondaryContainer: darkColors.info,
    tertiary: darkColors.accent,
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#00434A',
    onTertiaryContainer: darkColors.accent,
    error: darkColors.error,
    onError: '#FFFFFF',
    errorContainer: '#5F1E1A',
    onErrorContainer: darkColors.error,
    background: darkColors.background,
    onBackground: darkColors.text,
    surface: darkColors.surface,
    onSurface: darkColors.text,
    surfaceVariant: darkColors.surfaceVariant,
    onSurfaceVariant: darkColors.textSecondary,
    outline: darkColors.border,
    outlineVariant: darkColors.divider,
    scrim: darkColors.scrim,
    inverseSurface: darkColors.inverseSurface,
    inverseOnSurface: '#121212',
    inversePrimary: darkColors.primaryLight,
    shadow: 'rgba(0, 0, 0, 0.4)',
    surfaceDim: '#121212',
    surfaceBright: '#383838',
    surfaceContainerLowest: '#0F0F0F',
    surfaceContainerLow: '#1A1A1A',
    surfaceContainer: '#1E1E1E',
    surfaceContainerHigh: '#2A2A2A',
    surfaceContainerHighest: '#353535',
    // Custom colors for convenience
    text: darkColors.text,
    textSecondary: darkColors.textSecondary,
    textTertiary: darkColors.textTertiary,
    divider: darkColors.divider,
    success: darkColors.success,
    warning: darkColors.warning,
    info: darkColors.info,
    border: darkColors.border,
  },
  fonts: fontConfig,
} as const;

// Extended theme with custom properties for component usage
export const lightTheme = {
  ...lightPaperTheme,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
} as const;

export const darkTheme = {
  ...darkPaperTheme,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
} as const;

// Paper provider themes (without custom properties)
export const paperLightTheme = lightPaperTheme;
export const paperDarkTheme = darkPaperTheme;

export type Theme = typeof lightTheme;
