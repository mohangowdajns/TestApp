import { View, Text, StyleSheet } from 'react-native';
// import { Text } from 'react-native-paper';
import { useThemeContext } from '../../context/ThemeContext';
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
});

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const { fonts } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, fonts.displayLarge, { color: theme.colors.text }]}>🏠 Home</Text>
    </View>
  );
}
