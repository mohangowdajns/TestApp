import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pages</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3A5FE8' }]} // blue
        onPress={() => navigation.navigate('SolarPage')}
      >
        <Text style={styles.buttonText}>Site-Survey Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28A745' }]} // green
        onPress={() => navigation.navigate('SolarPage1')}
      >
        <Text style={styles.buttonText}>Go Solar Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF9800' }]} // orange
        onPress={() => navigation.navigate('SolarPage2')}
      >
        <Text style={styles.buttonText}>Document Proposal</Text>
      </TouchableOpacity>

          <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff0084ff' }]} // orange
        onPress={() => navigation.navigate('SolarPage3')}
      >
        <Text style={styles.buttonText}>Marketing Portal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    color: '#222',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3, // for Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
