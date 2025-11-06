import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SolarPage from "../../components/SolarPage";

export default function DashboardScreen() {
  return <SolarPage />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
