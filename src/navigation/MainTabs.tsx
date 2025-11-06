import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PricingScreen from '../screens/Pricing/PricingScreen';
import GenerateProposalScreen from '../screens/GenerateProposal/GenerateProposalScreen';

export type TabParamList = {
  Dashboard: undefined;
  Home: undefined;
  Profile: undefined;
  Pricing: undefined;
  GenerateProposal: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const getTabIcon = (routeName: string, color: string, size: number) => {
  let iconName = 'home';
  if (routeName === 'Dashboard') iconName = 'dashboard';
  else if (routeName === 'Home') iconName = 'home';
  else if (routeName === 'Profile') iconName = 'person';
  else if (routeName === 'Pricing') iconName = 'local-offer';
  else if (routeName === 'GenerateProposal') iconName = 'description';
  return <Icon name={iconName} size={size} color={color} />;
};

export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => getTabIcon(route.name, color, size),
        tabBarActiveTintColor: '#3A5FE8',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t('dashboard') }}
      />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
      <Tab.Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }} />
      <Tab.Screen
        name="GenerateProposal"
        component={GenerateProposalScreen}
        options={{ title: 'Proposal' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile') }} />
    </Tab.Navigator>
  );
}
