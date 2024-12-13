import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import NavBar from './nav';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./assets/event1.png'), date: '2024-07-01', address: 'CDO', attendees: 150 },
  { id: '2', title: 'Elizabeth Birthday', image: require('./assets/event2.png'), date: '2024-08-12', address: 'CDO', attendees: 80 },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./assets/event3.png'), date: '2024-09-25', address: 'CDO', attendees: 200 },
  { id: '4', title: 'Corporate Party', image: require('./assets/event1.png'), date: '2024-10-30', address: 'CDO', attendees: 120 },
  { id: '5', title: 'Annual Gala', image: require('./assets/event2.png'), date: '2024-11-15', address: 'CDO', attendees: 300 },
  { id: '6', title: 'New Year Celebration', image: require('./assets/event3.png'), date: '2024-12-31', address: 'CDO', attendees: 500 },
  { id: '7', title: 'Music Festival', image: require('./assets/event1.png'), date: '2024-06-22', address: 'CDO', attendees: 1000 },
  { id: '8', title: 'Art Exhibition', image: require('./assets/event2.png'), date: '2024-07-05', address: 'CDO', attendees: 150 },
];

const Group = () => {
  const navigation = useNavigation();

  const handleIconPress = (page) => {
    navigation.navigate(page);
  };

  const handleEventPress = () => {
    navigation.navigate('GroupAttendees');
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header section with a single burger icon, logo, and icons */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => handleIconPress('GroupAttendees')}>
              <Ionicons name="chatbubble-outline" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress('GroupAttendees')}>
              <Ionicons name="notifications-outline" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Centered Create Event Text */}
            <Text style={styles.headerText}>Groups</Text>
            {/* Fading Line */}
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}  // White fading effect
              start={{ x: 0, y: 0.5 }}  // Horizontal gradient
              end={{ x: 1, y: 0.5 }}    // Horizontal gradient
              style={styles.line}
            />
            {/* Event Types Section */}
            <Text style={styles.eventTypesText}>In Every Event</Text>
            {/* Event List */}
            {eventsData.map(event => (
              <TouchableOpacity 
                key={event.id} 
                style={styles.eventItem} 
                onPress={handleEventPress} // Navigate to GroupAttendees on press
              >
                <Image source={event.image} style={styles.eventImage} />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <View style={styles.eventLocationContainer}>
                    <Ionicons name="calendar-outline" size={20} color="black" />
                    <Text style={styles.eventLocation}>{event.address}</Text>
                  </View>
                </View>
                <View style={styles.attendanceContainer}>
                  <Text style={styles.attendanceText}>{event.attendees} Attendees</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* Navbar */}
        <NavBar />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    marginLeft: 0,
  },
  logo: {
    width: 120,
    height: 40,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
  },
  eventTypesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    marginLeft: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for event item
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Black text color
  },
  eventDate: {
    fontSize: 14,
    color: '#000000', // Black text color
  },
  eventLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#000000', // Black text color
    marginLeft: 5,
  },
  attendanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  attendanceText: {
    fontSize: 14,
    color: '#FFC42B',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
});

export default Group;
