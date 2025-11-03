import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  handlePress: () => void;
  title: string;
}

export default function CustomButton({
  handlePress,
  title,
}: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#42A5F5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
