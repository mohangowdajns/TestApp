import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card, Button, ProgressBar } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.nameText}>Dr. James Andrea</Text>
      </View>

      {/* Recommendation Card */}
      <Card style={styles.recommendationCard}>
        <Card.Content style={styles.recommendationContent}>
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>75%</Text>
            </View>
          </View>
          <View style={styles.recommendationTextContainer}>
            <View style={styles.textRow}>
              <Text style={styles.recommendationTitle}>Recommendation</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
            <Text style={styles.recommendationSubtitle}>
              Complete your profile so that we can assist you better
            </Text>
            <ProgressBar
              progress={0.75}
              color="#E91E63"
              style={styles.progressBar}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Refer Care Plan Section */}
      <View style={styles.referSection}>
        <Text style={styles.referTitle}>Refer care plan</Text>
        <Text style={styles.referDescription}>
          Start by recommending care plans to your patients. Help them access
          personalized care and track progress.
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewMoreLink}>View more →</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          style={styles.referButton}
          labelStyle={styles.referButtonText}
          onPress={() => console.log('Refer Care Plan')}
        >
          Refer Care Plan
        </Button>
      </View>

      {/* Image Section */}
      <View style={styles.imageSection}>
        <View style={styles.circleImagesContainer}>
          <View style={[styles.circleImage, styles.circleImage1]}>
            <Text style={styles.imageEmoji}>🥗</Text>
          </View>
          <View style={[styles.circleImage, styles.circleImage2]}>
            <Text style={styles.imageEmoji}>👵</Text>
          </View>
          <View style={[styles.circleImage, styles.circleImage3]}>
            <Text style={styles.imageEmoji}>🏥</Text>
          </View>
        </View>
        <View style={styles.doctorImagePlaceholder}>
          <Text style={styles.doctorEmoji}>👨‍⚕️👩‍⚕️</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  avatar: {
    backgroundColor: '#E0E0E0',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  recommendationCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  progressCircleContainer: {
    marginRight: 16,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  recommendationTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  recommendationSubtitle: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFE4F1',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#CCC',
  },

  referSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  referTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  referDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  viewMoreLink: {
    fontSize: 14,
    color: '#E91E63',
    marginBottom: 16,
  },
  referButton: {
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingVertical: 4,
  },
  referButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  imageSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  circleImagesContainer: {
    flex: 1,
    position: 'relative',
    height: 140,
  },
  circleImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 3,
  },
  circleImage1: {
    top: 0,
    left: 0,
  },
  circleImage2: {
    top: 30,
    left: 40,
  },
  circleImage3: {
    top: 60,
    left: 10,
  },
  imageEmoji: {
    fontSize: 32,
  },
  doctorImagePlaceholder: {
    width: 140,
    height: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorEmoji: {
    fontSize: 48,
  },
});

export default HomeScreen;
