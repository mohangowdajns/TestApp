import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../screens/Auth/LoginScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import MainTabs from './MainTabs'; // bottom tabs
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from '../screens/Maps/MapScreen.tsx';
import { PaperProvider } from 'react-native-paper';

// Stack type
export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      //  Custom sidebar design
      drawerContent={drawerProps => (
        <View style={{ flex: 1 }}>
          {/* Profile section */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Arka</Text>
            <Text style={styles.email}>arka@example.com</Text>
          </View>

          {/* Default items (Home, Notifications, Settings) */}
          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>

          {/* Footer with Logout */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => drawerProps.navigation.navigate('Login')}
            >
              <Icon name="logout" size={22} color="#E53935" />
              <Text style={styles.logoutText}> Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Text style={{ fontSize: 22 }}>☰</Text>
          </TouchableOpacity>
        ),
        drawerActiveTintColor: '#3A5FE8',
        drawerLabelStyle: { fontSize: 15, fontWeight: '500' },
      })}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3A5FE8',
    paddingVertical: 40,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  email: { fontSize: 14, color: '#e0e0e0' },
  footer: { borderTopWidth: 1, borderTopColor: '#ddd', padding: 15 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center' },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#E53935',
    fontWeight: '600',
  },
});
