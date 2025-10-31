import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { lightColors, darkColors } from './color';
import { fontConfig } from './fonts';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
    onSurface: lightColors.fontColor,
  },
  font: fontConfig,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
    onSurface: darkColors.fontColor,
  },
  font: fontConfig,
};
