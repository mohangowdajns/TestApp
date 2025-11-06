import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppTheme } from '../hooks/useAppTheme';
import {
  createProjectCardStyle,
  createProjectNameStyle,
  createProjectAddressStyle,
  createStatusBadgeStyle,
  createBadgeTextStyle,
  createStatCardStyle,
  createStatNumberStyle,
  createStatLabelStyle,
} from '../theme/components';

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'MainDrawer'>;

export default function LeadList() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const theme = useAppTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const projectsData = [
    {
      id: 1,
      name: 'Smith Residence Solar Installation',
      address: '1234 Oak Street, Sunnyville CA 90210',
      capacity: '8.5 kW',
      status: 'In Progress',
      completion: 75,
      estimatedCompletion: '2 weeks',
      panelsInstalled: 24,
      totalPanels: 32,
    },
    {
      id: 2,
      name: 'Johnson Commercial Building',
      address: '5678 Business Blvd, Commerce City CA 90211',
      capacity: '25.2 kW',
      status: 'Planning',
      completion: 15,
      estimatedCompletion: '6 weeks',
      panelsInstalled: 0,
      totalPanels: 84,
    },
    {
      id: 3,
      name: 'Green Valley School District',
      address: '9012 Education Way, Learning Heights CA 90212',
      capacity: '150 kW',
      status: 'Completed',
      completion: 100,
      estimatedCompletion: 'Completed',
      panelsInstalled: 500,
      totalPanels: 500,
    },
  ];

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: theme.animation.normal,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, theme.animation.normal]);

  const openWhatsApp = (phone: string, message: string) => {
    let url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Alert.alert('Error', 'WhatsApp is not installed on your device');
      } else {
        Linking.openURL(url).catch(() => {
          Alert.alert('Error', 'User not found on WhatsApp or invalid number');
        });
      }
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with + button */}
          <View style={[styles.headerRow, { paddingHorizontal: theme.spacing.md }]}>
            <View>
              <Text style={[theme.fonts.headlineMedium, { color: theme.colors.text }]}>
                Welcome to Solar Design Tool
              </Text>
              <Text
                style={[
                  theme.fonts.bodyMedium,
                  { color: theme.colors.textSecondary, marginTop: theme.spacing.xs },
                ]}
              >
                Manage your solar panel installations
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LeadForm', {
                  project: { id: 0, name: 'Add Lead', status: 'New' },
                })
              }
            >
              <Icon name="add-circle-outline" size={28} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View
            style={[
              styles.statsContainer,
              {
                paddingHorizontal: theme.spacing.md,
                marginBottom: theme.spacing.lg,
                gap: theme.spacing.sm,
              },
            ]}
          >
            <View style={createStatCardStyle(theme)}>
              <Icon name="wb-sunny" size={24} color={theme.colors.primary} />
              <Text style={createStatNumberStyle(theme)}>183.7 kW</Text>
              <Text style={createStatLabelStyle(theme)}>Total Capacity</Text>
            </View>
            <View style={createStatCardStyle(theme)}>
              <Icon name="build" size={24} color={theme.colors.warning} />
              <Text style={createStatNumberStyle(theme)}>12</Text>
              <Text style={createStatLabelStyle(theme)}>Active Projects</Text>
            </View>
            <TouchableOpacity
              style={createStatCardStyle(theme)}
              onPress={() => openWhatsApp('+919113024417', 'Hello, I need help!')}
            >
              <FontAwesome name="whatsapp" size={30} color="#25D366" />
              <Text style={[createStatNumberStyle(theme), { color: '#25D366' }]}>Chat</Text>
              <Text style={createStatLabelStyle(theme)}>WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Projects */}
          <View style={[styles.projectsSection, { paddingHorizontal: theme.spacing.md }]}>
            <Text
              style={[
                theme.fonts.titleLarge,
                { color: theme.colors.text, marginBottom: theme.spacing.md },
              ]}
            >
              Recent Projects
            </Text>
            {projectsData.map(project => (
              <TouchableOpacity
                key={project.id}
                style={createProjectCardStyle(theme)}
                onPress={() => navigation.navigate('LeadForm', { project })}
              >
                <View style={styles.projectHeader}>
                  <View style={styles.projectInfo}>
                    <Text style={createProjectNameStyle(theme)}>{project.name}</Text>
                    <Text style={createProjectAddressStyle(theme)}>{project.address}</Text>
                    <View style={[styles.projectMeta, { gap: theme.spacing.md }]}>
                      <View style={createStatusBadgeStyle(theme, project.status)}>
                        <Text style={createBadgeTextStyle(theme)}>{project.status}</Text>
                      </View>
                      <Text style={[theme.fonts.bodyMedium, { color: theme.colors.text }]}>
                        {project.capacity}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  headerRow: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectsSection: { paddingBottom: 40 },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectInfo: { flex: 1, marginRight: 12 },
  projectMeta: { flexDirection: 'row', alignItems: 'center' },
});
