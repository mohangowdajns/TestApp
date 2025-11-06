import { useThemeContext } from '../context/ThemeContext';
import { Theme } from '../theme/theme';

/**
 * Custom hook to use the app theme
 * Returns the theme object with all design tokens (colors, spacing, shadows, etc.)
 */
export const useAppTheme = (): Theme => {
  const { theme } = useThemeContext();
  return theme as Theme;
};
