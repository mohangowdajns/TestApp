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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../hooks/useAppTheme';

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
  ConfirmOtp: undefined;
  MainDrawer: undefined;
  AddLead: { project: { id: number; name: string; status: string } };
  LeadForm: { project: { id: number; name: string; status: string } };
  PaymentScreen: { project: { id: number; name: string; status: string } };
  SolarPanel3D: { project: { id: number; name: string; status: string } };
  TestGLView: { project: { id: number; name: string; status: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Drawer header component
function DrawerHeader() {
  const theme = useAppTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
      <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
      <Text style={[styles.name, styles.nameText, { color: theme.colors.onPrimary }]}>Arka</Text>
      <Text style={[styles.email, styles.emailText]}>arka@example.com</Text>
    </View>
  );
}

// Drawer footer component
function DrawerFooter({ drawerProps }: { drawerProps: any }) {
  const theme = useAppTheme();
  const { logout } = useAuthStore();

  return (
    <View style={[styles.footer, { borderTopColor: theme.colors.divider }]}>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logout();
          drawerProps.navigation.navigate('Login' as never);
        }}
      >
        <Icon name="logout" size={22} color={theme.colors.error} />
        <Text style={[styles.logoutText, { color: theme.colors.error }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Drawer content component
function DrawerContent(drawerProps: any) {
  return (
    <SafeAreaView style={styles.drawerSafe} edges={['top', 'bottom', 'left', 'right']}>
      <DrawerHeader />
      <DrawerContentScrollView {...drawerProps}>
        <DrawerItemList {...drawerProps} />
      </DrawerContentScrollView>
      <DrawerFooter drawerProps={drawerProps} />
    </SafeAreaView>
  );
}

// Header left button component
const HeaderLeftButton = React.memo(({ navigation }: { navigation: any }) => (
  <TouchableOpacity
    style={styles.headerLeftButton}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  >
    <Text style={styles.hamburger}>☰</Text>
  </TouchableOpacity>
));

// Icon renderers for drawer screens
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" size={size} color={color} />
);

const NotificationsIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="notifications" size={size} color={color} />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="settings" size={size} color={color} />
);

const MapIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="map" size={size} color={color} />
);

const LeadsIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="add-business" size={size} color={color} />
);

const PaymentIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="payment" size={size} color={color} />
);

function MainDrawer() {
  const { t } = useTranslation();
  const theme = useAppTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={({ navigation }) => {
        return {
          headerLeft: () => <HeaderLeftButton navigation={navigation} />,
          drawerActiveTintColor: theme.colors.primary,
          drawerLabelStyle: { fontSize: 15, fontWeight: '500' },
        };
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          title: t('home'),
          drawerIcon: HomeIcon,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: t('notifications'),
          drawerIcon: NotificationsIcon,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
          drawerIcon: SettingsIcon,
        }}
      />
      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: t('map'),
          drawerIcon: MapIcon,
        }}
      />
      <Drawer.Screen
        name="Lead List"
        component={LeadList}
        options={{
          title: t('leads'),
          drawerIcon: LeadsIcon,
        }}
      />
      <Drawer.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: t('Payments'),
          drawerIcon: PaymentIcon,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { paperTheme } = useThemeContext();
  const { isLoggedIn } = useAuthStore();
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? 'MainDrawer' : 'Login'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name={'ConfirmOtp' as 'Login'}
              component={ConfirmOtp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainDrawer"
              component={MainDrawer}
              options={{ headerShown: false }}
            />
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
  name: { fontWeight: 'bold', color: '#fff' },
  nameText: { fontSize: 18 },
  email: { color: '#e0e0e0' },
  emailText: { fontSize: 14 },
  footer: { borderTopWidth: 1, padding: 15 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center' },
  logoutText: {
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  drawerSafe: { flex: 1 },
  headerLeftButton: { marginLeft: 15 },
  hamburger: { fontSize: 22 },
});
