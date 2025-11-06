import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from './context/ThemeContext';
import i18n from "./i18n/i18n";
import AppNavigator from "./navigation/AppNavigator";


export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
  <SafeAreaProvider>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="dark-content"
    />

    <NavigationContainer>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
      
    </NavigationContainer>
  </SafeAreaProvider>
</I18nextProvider>

  );
}
