import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import LoginScreen from "../screens/Auth/LoginScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import MainTabs from "./MainTabs";
import MapScreen from "../screens/Maps/MapScreen";
import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import PaymentScreen from "../screens/Payments/PaymentScreen";
import { useAuthStore } from "../store/authStore";

export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  LeadForm: { project: { id: number; name: string; status: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  const { t } = useTranslation();
  const { isLoggedIn, logout } = useAuthStore();

  console.log("isLoggedIn on startup:", isLoggedIn);

  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => (
        <SafeAreaView style={{ flex: 1 }}>
          {/* Profile Header */}
          <View style={styles.header}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Arka</Text>
            <Text style={styles.email}>arka@example.com</Text>
          </View>

          {/* Drawer Items */}
          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>

          {/* Logout Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                logout();
                drawerProps.navigation.navigate("Login" as never);
              }}
            >
              <Icon name="logout" size={22} color="#E53935" />
              <Text style={styles.logoutText}>{t("logout")}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    >
      {/* Home / Main Tabs */}
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          const translatedTitle = t(routeName.toLowerCase());
          return {
            title: translatedTitle || t("home"),
            drawerIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          };
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: t("notifications"),
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("settings"),
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: t("map"),
          drawerIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="LeadList"
        component={LeadList}
        options={{
          title: t("leads"),
          drawerIcon: ({ color, size }) => (
            <Icon name="add-business" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: t("payments"), // ✅ lowercase key matches i18n JSON
          drawerIcon: ({ color, size }) => (
            <Icon name="payment" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { isLoggedIn } = useAuthStore();

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "MainDrawer" : "Login"} // ✅ fixed initial route
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen
        name="LeadForm"
        component={LeadForm}
        options={{ headerShown: true, title: "Lead Form" }}
      />
    </Stack.Navigator>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3A5FE8",
    paddingVertical: 40,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  email: { fontSize: 14, color: "#e0e0e0" },
  footer: { borderTopWidth: 1, borderTopColor: "#ddd", padding: 15 },
  logoutBtn: { flexDirection: "row", alignItems: "center" },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#E53935",
    fontWeight: "600",
  },
});
