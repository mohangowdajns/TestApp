import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import LeadFormScreen from "../components/LeadForm";

export type TabParamList = {
  Dashboard: undefined;
  Home: undefined;
  Leads: undefined;
  Profile: undefined;
  Notifications:undefined
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
          initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTitleAlign: "center",
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Dashboard") iconName = "dashboard";
          else if (route.name === "Leads") iconName = "assignment";
          // else if (route.name === "Profile") iconName = "person";
           else if (route.name === "Notifications") iconName = "notifications";
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
        name="Leads"
        component={LeadFormScreen}
        options={{ title: t("leads") }}
      />
      <Tab.Screen
        name="Notifications"
        component={ProfileScreen}
        options={{ title: t("notifications") }}
      />
    </Tab.Navigator>

  );
}
