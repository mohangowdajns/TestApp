import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from '../theme/theme';

interface CustomButtonProps {
  handlePress: () => void;
  title: string;
  variant?: 'filled' | 'outlined' | 'text';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function CustomButton({
  handlePress,
  title,
  variant = 'filled',
  disabled = false,
  style,
}: CustomButtonProps) {
  const theme = useTheme() as Theme;

  const getButtonStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: theme.colors.primary,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
        };
      case 'filled':
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return theme.colors.onSurfaceVariant;
    }
    switch (variant) {
      case 'outlined':
      case 'text':
        return theme.colors.primary;
      case 'filled':
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        theme.shadows.md,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontFamily: theme.fonts.labelLarge.fontFamily,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
