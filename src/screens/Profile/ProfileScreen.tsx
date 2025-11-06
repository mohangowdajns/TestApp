
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NotificationsScreen from "../Notifications/NotificationsScreen";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <NotificationsScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
