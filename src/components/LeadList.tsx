import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";


type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, "MainDrawer">;

export default function LeadList() {
  const navigation = useNavigation<HomeScreenNavProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const projectsData = [
    {
      id: 1,
      name: "Smith Residence Solar Installation",
      address: "1234 Oak Street, Sunnyville CA 90210",
      capacity: "8.5 kW",
      status: "In Progress",
      completion: 75,
      estimatedCompletion: "2 weeks",
      panelsInstalled: 24,
      totalPanels: 32,
    },
    {
      id: 2,
      name: "Johnson Commercial Building",
      address: "5678 Business Blvd, Commerce City CA 90211",
      capacity: "25.2 kW",
      status: "Planning",
      completion: 15,
      estimatedCompletion: "6 weeks",
      panelsInstalled: 0,
      totalPanels: 84,
    },
    {
      id: 3,
      name: "Green Valley School District",
      address: "9012 Education Way, Learning Heights CA 90212",
      capacity: "150 kW",
      status: "Completed",
      completion: 100,
      estimatedCompletion: "Completed",
      panelsInstalled: 500,
      totalPanels: 500,
    },
  ];

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);



  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "orange";
      case "Planning":
        return "blue";
      default:
        return "gray";
    }
  };

  const openWhatsApp = (phone: string, message: string) => {
    let url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "WhatsApp is not installed on your device");
        } else {
          Linking.openURL(url).catch(() => {
            Alert.alert("Error", "User not found on WhatsApp or invalid number");
          });
        }
      })

  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header with + button */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.welcomeText}>Welcome to Solar Design Tool</Text>
              <Text style={styles.subtitleText}>
                Manage your solar panel installations
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LeadForm", {
                  project: { id: 0, name: "Add Lead", status: "New" },
                })
              }
            >
              <Icon name="add-circle-outline" size={28} color="#3A5FE8" />
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="wb-sunny" size={24} color="#3A5FE8" />
              <Text style={styles.statNumber}>183.7 kW</Text>
              <Text style={styles.statLabel}>Total Capacity</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="build" size={24} color="orange" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active Projects</Text>
            </View>
            <TouchableOpacity
              style={styles.statCard}
              onPress={() => openWhatsApp("+919113024417", "Hello, I need help!")}
            >
              <FontAwesome name="whatsapp" size={30} color="#25D366" />
              <Text style={styles.statNumber}>Chat</Text>
              <Text style={styles.statLabel}>WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Projects */}
          <View style={styles.projectsSection}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            {projectsData.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                onPress={() =>
                  navigation.navigate("LeadForm", { project }) //  Directly open lead form
                }
              >
                <View style={styles.projectHeader}>
                  <View style={styles.projectInfo}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text style={styles.projectAddress}>{project.address}</Text>
                    <View style={styles.projectMeta}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(project.status) },
                        ]}
                      >
                        <Text style={styles.statusText}>{project.status}</Text>
                      </View>
                      <Text style={styles.capacityText}>{project.capacity}</Text>
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
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  headerRow: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  subtitleText: { fontSize: 14, color: "gray" },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: { fontSize: 18, fontWeight: "bold", marginTop: 4 },
  statLabel: { fontSize: 12, color: "gray" },
  projectsSection: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectInfo: { flex: 1, marginRight: 12 },
  projectName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  projectAddress: { fontSize: 14, color: "gray", marginBottom: 8 },
  projectMeta: { flexDirection: "row", alignItems: "center", gap: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: "500", color: "#fff" },
  capacityText: { fontSize: 14, fontWeight: "500", color: "#333" },
});
