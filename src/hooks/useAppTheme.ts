import { useTheme as usePaperTheme } from 'react-native-paper';
import { Theme } from '../theme/theme';

/**
 * Custom hook to use the app theme
 * Returns the theme object with all design tokens
 */
export const useAppTheme = (): Theme => {
  return usePaperTheme() as Theme;
};
