import { View, Text } from 'react-native';
// import { Text } from 'react-native-paper';
import { useThemeContext } from '../../context/ThemeContext';
import { useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const { fonts } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}
    >
      <Text style={{ ...fonts.displayLarge, color: theme.colors.text }}>
        🏠 Home
      </Text>
      <Text></Text>
    </View>
  );
}
