// createschedule.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import necessary icons
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import NavBar from './nav';

const { width } = Dimensions.get('window');

const CreateSchedule = () => {
  const navigation = useNavigation(); // Hook to use navigation
  const [highlightedButton, setHighlightedButton] = useState(null);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleToggleButton = (button) => {
    setHighlightedButton(button);
  };

  const handleToggleReminder = () => {
    setIsReminderSet((prevState) => !prevState);
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <Ionicons name="chatbubble-outline" size={30} color="white" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="white" style={styles.icon} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Button with two icons */}
        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              highlightedButton === 'list' && styles.iconButtonHighlighted,
            ]}
            onPress={() => navigation.navigate('Schedule')}
          >
            <MaterialIcons name="playlist-add-check" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              highlightedButton === 'calendar' && styles.iconButtonHighlighted,
            ]}
            onPress={() => handleToggleButton('calendar')}
          >
            <Ionicons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#A97E00',
            dayTextColor: '#FFFFFF',
            monthTextColor: '#A97E00',
            arrowColor: '#A97E00',
          }}
          markingType={'simple'}
          markedDates={{
            '2024-07-01': { marked: true, dotColor: 'red' },
            '2024-08-12': { marked: true, dotColor: 'blue' },
            // Add more dates here
          }}
        />

        {/* Event Details */}
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventTitle}>Event Title</Text>
          <View style={styles.eventRow}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text style={styles.eventText}>All day</Text>
            <View style={styles.eventDateContainer}>
              <Text style={styles.eventText}>{moment().format('ddd D MMM')}</Text>
            </View>
            <TouchableOpacity onPress={handleToggleReminder}>
              <Ionicons
                name={isReminderSet ? 'toggle-sharp' : 'toggle-outline'}
                size={24}
                color={isReminderSet ? '#FFC42B' : 'gray'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.eventRow}>
            <Text style={styles.eventText}>Starts</Text>
            <Text style={styles.eventText}>Time</Text>
          </View>
          <View style={styles.eventRow}>
            <Text style={styles.eventText}>Ends</Text>
            <Text style={styles.eventText}>Time</Text>
          </View>
          <View style={styles.eventRow}>
            <Text style={styles.eventText}>Repeat</Text>
            <Text style={styles.eventText}>Never</Text>
          </View>
          <View style={styles.eventRow}>
            <Ionicons name="pricetags-outline" size={20} color="white" />
            <View style={styles.colorCirclesContainer}>
              <View style={[styles.colorCircle, { backgroundColor: 'red' }]} />
              <View style={[styles.colorCircle, { backgroundColor: 'blue' }]} />
              <View style={[styles.colorCircle, { backgroundColor: 'green' }]} />
            </View>
          </View>
          <View style={styles.eventRow}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.eventText}>Add Location</Text>
          </View>
          <View style={styles.eventRow}>
            <Ionicons name="notifications-outline" size={20} color="white" />
            <Text style={styles.eventText}>Add Notification</Text>
          </View>
        </View>
      </ScrollView>

      <NavBar />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  menuButton: {
    marginLeft: 0,
  },
  logo: {
    width: 120,
    height: 40,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  scrollContainer: {
    padding: 20,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  iconButtonHighlighted: {
    backgroundColor: '#FFC42B',
  },
  calendar: {
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  eventDetailsContainer: {
    backgroundColor: '#C2B06717',
    borderColor: '#C2B067',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventText: {
    fontSize: 16,
    color: 'white',
  },
  eventDateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  colorCirclesContainer: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    
  },
});

export default CreateSchedule;
