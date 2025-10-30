import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Avatar, Card, Switch, List, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/useTheme';
import { NavigationProp } from '../../types/navagation';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [selectedTab, setSelectedTab] = useState('Expense');

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [200, 250, 280, 292.49],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileContent}>
          <Avatar.Image
            size={70}
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Text
              style={[styles.editButtonText, { color: theme.colors.primary }]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.profileName}>Ryan Reynolds</Text>
        <Text style={styles.profileDate}>Joined since 2022</Text>
      </View>

      {/* Monthly Tracker Card */}
      <Card
        style={[styles.trackerCard, { backgroundColor: theme.colors.surface }]}
      >
        <Card.Content>
          <Text
            style={[styles.trackerTitle, { color: theme.colors.onSurface }]}
          >
            Monthly Tracker
          </Text>

          {/* Tabs */}
          <View
            style={[
              styles.tabContainer,
              { backgroundColor: isDarkMode ? '#333' : '#F5F5F5' },
            ]}
          >
            {['Expense', 'Income', 'Invest'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && [
                    styles.tabActive,
                    { backgroundColor: theme.colors.background },
                  ],
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: theme.colors.onSurfaceVariant },
                    selectedTab === tab && [
                      styles.tabTextActive,
                      { color: theme.colors.onSurface },
                    ],
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Amount */}
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, { color: theme.colors.onSurface }]}>
              $292.49
            </Text>
            <TouchableOpacity>
              <Text style={[styles.arrowIcon, { color: theme.colors.primary }]}>
                →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width-38 }
            height={120}
            chartConfig={{
              backgroundColor: theme.colors.primary,
              backgroundGradientFrom: theme.colors.primary,
              backgroundGradientTo: theme.colors.primary,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#FFFFFF',
              },
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: 'rgba(255, 255, 255, 0.2)',
              },
            }}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
          />
        </Card.Content>
      </Card>

      {/* Menu Items */}
      <View
        style={[
          styles.menuContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <List.Item
          title="My Card"
          left={() => (
            <List.Icon
              icon="credit-card-outline"
              color={theme.colors.primary}
            />
          )}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
          titleStyle={[styles.menuTitle, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title="Security Settings"
          left={() => (
            <List.Icon
              icon="shield-check-outline"
              color={theme.colors.primary}
            />
          )}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
          titleStyle={[styles.menuTitle, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title="Notification"
          left={() => (
            <List.Icon icon="bell-outline" color={theme.colors.primary} />
          )}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
          titleStyle={[styles.menuTitle, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title="Transaction History"
          left={() => <List.Icon icon="history" color={theme.colors.primary} />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
          style={styles.menuItem}
          titleStyle={[styles.menuTitle, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title="Dark Mode"
          left={() => (
            <List.Icon
              icon="moon-waning-crescent"
              color={theme.colors.primary}
            />
          )}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
          style={styles.menuItem}
          titleStyle={[styles.menuTitle, { color: theme.colors.onSurface }]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#FFFFFF',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  trackerCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
  },
  trackerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '600',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 24,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: -16,
  },
  menuContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
