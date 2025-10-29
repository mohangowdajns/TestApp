import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeContext';
import 'react-native-get-random-values';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />;
    </ThemeProvider>
  );
}
