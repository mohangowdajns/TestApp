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
import { PaperProvider } from 'react-native-paper';
import ConfirmOtp from '../screens/ConfirmOtp/ConfirmOtp.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import LoginScreen from '../screens/Auth/LoginScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import MainTabs from './MainTabs';
import MapScreen from '../screens/Maps/MapScreen';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';
import PaymentScreen from '../screens/Payments/PaymentScreen';
import { useAuthStore } from '../store/authStore';

export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  ConfirmOtp: undefined;
  AddLead: { project: { id: number; name: string; status: string } };
  LeadForm: { project: { id: number; name: string; status: string } };
  PaymentScreen: { project: { id: number; name: string; status: string } };
  SolarPanel3D: { project: { id: number; name: string; status: string } };
  TestGLView: { project: { id: number; name: string; status: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  const { t } = useTranslation();
  const { isLoggedIn, logout } = useAuthStore();
  console.log('isLoggedIn on startup:', isLoggedIn);
  return (
    <Drawer.Navigator
      drawerContent={drawerProps => (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
          {/* Profile section */}
          <View style={styles.header}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
            <Text style={styles.name}>Arka</Text>
            <Text style={styles.email}>arka@example.com</Text>
          </View>

          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>

          {/* Footer with Logout */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                logout();
                drawerProps.navigation.navigate('Login' as never);
              }}
            >
              <Icon name="logout" size={22} color="#E53935" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
          title: t('home'),
          drawerIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: t('notifications'),
          drawerIcon: ({ color, size }) => <Icon name="notifications" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
          drawerIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: t('map'),
          drawerIcon: ({ color, size }) => <Icon name="map" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Lead List"
        component={LeadList}
        options={{
          title: t('leads'),
          drawerIcon: ({ color, size }) => <Icon name="add-business" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: t('Payments'),
          drawerIcon: ({ color, size }) => <Icon name="payment" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { theme } = useThemeContext();
  const { isLoggedIn } = useAuthStore();
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? 'MainDrawer' : 'Login'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
            <Stack.Screen
              name="LeadForm"
              component={LeadForm}
              options={{ headerShown: true, title: 'Lead Form' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
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
