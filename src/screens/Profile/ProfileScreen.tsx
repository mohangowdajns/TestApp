import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import { useThemeContext } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme, theme } = useThemeContext();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}
    >
      <Text variant="displayLarge">Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
}
