// about.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the burger icon
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const About = () => {
  const navigation = useNavigation(); // Hook to use navigation

  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>ABOUT US</Text>
        </View>

        {/* Body */}
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.visionbg}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1713720664394-26c796720ed6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />
            <Text style={styles.visionTitle}>Vision</Text>
            <Text style={styles.visionText}>
              A world where everyone can create stress-free, unforgettable events.
            </Text>
          </View>

          <View style={styles.missionbg}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1713720664394-26c796720ed6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />
            <Text style={styles.missionTitle}>Mission</Text>
            <Text style={styles.missionText}>
              To empower users with user-friendly tools and resources to plan and execute
              flawless events.
            </Text>
          </View>

          <View style={styles.goalbg}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1713720664394-26c796720ed6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />
            <Text style={styles.goalTitle}>Goals</Text>
            <Text style={styles.goalText}>
              - Become the leading event planning platform for all event types.
              - Foster a community of event planners who share ideas and inspiration.
              - Continuously innovate and develop new features to enhance the user experience.
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Background color of the screen
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 80, // Add padding to avoid overlap with menu button
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 32,
    color: '#daa520',
    textDecorationLine: 'underline',
  },
  body: {
    padding: 20,
    marginBottom: 50,
    flex: 1, // This allows the scrollview to take up remaining space
  },
  visionbg: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  missionbg: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  goalbg: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  visionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  visionText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  missionText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  goalText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  image: {
    width: 300,
    height: 230,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'white', // Change text color to white
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default About;
