import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const Createpackage = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState(null); // State to manage selected button
  const [eventName, setEventName] = useState(''); // State for event name
  const [eventDate, setEventDate] = useState(''); // State for event date
  const [venue, setVenue] = useState(''); // State for venue

  // List of event types
  const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut"];

  const handleCancel = () => {
    // Handle Cancel button press
    console.log('Cancel button pressed');
    // Optionally navigate back or to a different screen
    navigation.goBack();
  };

  const handleNext = () => {
    // Handle Next button press
    console.log('Next button pressed');
    navigation.navigate('ChooseServiceProv'); // Navigate to ChooseServiceProv screen
  };

  // Handle icon press for Messages and Notifications
  const handleIconPress = (page) => {
    navigation.navigate(page);
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header section with a menu icon, logo, and icons */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => handleIconPress('Messages')}>
              <Ionicons name="chatbubble-outline" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress('Notification')}>
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
            <Text style={styles.headerText}>Create Event</Text>
            {/* Fading Line */}
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}  // White fading effect
              start={{ x: 0, y: 0.5 }}  // Horizontal gradient
              end={{ x: 1, y: 0.5 }}    // Horizontal gradient
              style={styles.line}
            />
            {/* Event Types Section */}
            <Text style={styles.eventTypesText}>Choose Event Type</Text>
            <ScrollView
              horizontal
              contentContainerStyle={styles.scrollViewContentHorizontal}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollViewHorizontal}
            >
              {eventTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.eventTypeButton,
                    { 
                      backgroundColor: selectedType === type ? '#FFC42B' : 'transparent',
                      borderColor: selectedType === type ? '#FFC42B' : '#FFFFFF',
                    }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[
                    styles.eventTypeText,
                    {
                      color: selectedType === type ? '#000000' : '#FFFFFF'
                    }
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Gray Rectangle for Event Name */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type of Event Name"
                placeholderTextColor="#B0B0B0"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type of your Description"
                placeholderTextColor="#B0B0B0"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            {/* Gray Rectangle for Event Date */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.dateInput]}
                placeholder="Choose Event Date"
                placeholderTextColor="#B0B0B0"
                value={eventDate}
                onChangeText={setEventDate}
              />
              <Ionicons name="calendar-outline" size={24} color="#B0B0B0" style={styles.iconRight} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Invitation Message"
                placeholderTextColor="#B0B0B0"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="People to invite"
                placeholderTextColor="#B0B0B0"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            {/* Gray Rectangle for Venue */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.venueInput]}
                placeholder="Choose Package"
                placeholderTextColor="#B0B0B0"
                value={venue}
                onChangeText={setVenue}
              />
              <Ionicons name="chevron-down-outline" size={24} color="#B0B0B0" style={styles.iconRight} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.venueInput]}
                placeholder="Choose Venue"
                placeholderTextColor="#B0B0B0"
                value={venue}
                onChangeText={setVenue}
              />
              <Ionicons name="chevron-down-outline" size={24} color="#B0B0B0" style={styles.iconRight} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.nextButton]}
                onPress={handleNext} // Call handleNext function
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    textAlign: 'center', // Center align Create Event text
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,  // Space between text and line
  },
  eventTypesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    marginLeft: 10, // Align text to the left
  },
  scrollViewHorizontal: {
    maxHeight: 100, // Set a max height to avoid overflow
  },
  scrollViewContentHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',  // Center the event type buttons horizontally
  },
  scrollViewContent: {
    paddingBottom: 80, // Add padding to the bottom to ensure the last content is not cut off
  },
  eventTypeButton: {
    borderWidth: 1,
    borderColor: '#FFC42B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  eventTypeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  textInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
  },
  dateInput: {
    paddingRight: 30, // Add space for the calendar icon
  },
  venueInput: {
    paddingRight: 30, // Add space for the down icon
  },
  iconRight: {
    position: 'absolute',
    right: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: '#6E6E6E',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  nextButton: {
    backgroundColor: '#CEB64C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Createpackage;
