import React from 'react';
import { View, Text } from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';

export default function DashboardScreen() {
  const { theme } = useThemeContext();
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{ color: theme.colors.text, fontSize: 22, fontWeight: '600' }}
      >
        {' '}
        Dashboard
      </Text>
    </View>
  );
}
