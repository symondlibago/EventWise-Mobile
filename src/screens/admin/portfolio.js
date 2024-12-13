// portfolio.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Ionicons and MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./assets/event1.png'), date: '2024-07-01', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '2', title: 'Elizabeth Birthday', image: require('./assets/event2.png'), date: '2024-08-12', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Inventory'] },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./assets/event3.png'), date: '2024-09-25', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '4', title: 'Corporate Party', image: require('./assets/event1.png'), date: '2024-10-30', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '5', title: 'Annual Gala', image: require('./assets/event2.png'), date: '2024-11-15', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Equipment'] },
  { id: '6', title: 'New Year Celebration', image: require('./assets/event3.png'), date: '2024-12-31', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Inventory'] },
  { id: '7', title: 'Music Festival', image: require('./assets/event1.png'), date: '2024-06-22', address: 'CDO', buttons: ['Attendee'] },
  { id: '8', title: 'Art Exhibition', image: require('./assets/event2.png'), date: '2024-07-05', address: 'CDO', buttons: ['Attendee', 'Equipment'] },
];

const Portfolio = () => {
  const navigation = useNavigation();

  // Function to render each event item
  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      {/* Header with Logo and Icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <Ionicons name="chatbubble-outline" size={30} color="white" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="white" style={styles.icon} />
        </View>
      </View>

      {/* Main Content */}
      <Text style={styles.portfolioText}>Portfolio</Text>

      {/* Vertical Scrolling Event List */}
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsListContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 40,

  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  menuButton: {
    padding: 5,
  },
  portfolioText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  eventItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,  // Increase space between events
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150, // Increase image height
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    color: '#2A93D5',
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20,
  },
});

export default Portfolio;
