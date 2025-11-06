import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

export type TabParamList = {
  Dashboard: undefined;
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Dashboard") iconName = "dashboard";
          else if (route.name === "Home") iconName = "home";
          else if (route.name === "Profile") iconName = "person";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3A5FE8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t("dashboard") }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t("home") }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t("profile") }}
      />
    </Tab.Navigator>
  );
}
