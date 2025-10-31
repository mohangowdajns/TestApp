import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-get-random-values';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
