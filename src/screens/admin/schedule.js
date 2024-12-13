import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import NavBar from './nav';
import CreateSchedule from './createsched';

const { width } = Dimensions.get('window');

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', day: 'Mon', location: 'CDO', date: '2024-07-01', status: 'Ongoing' },
  { id: '2', title: 'Elizabeth Birthday', day: 'Thu', location: 'CDO', date: '2024-08-12', status: 'Upcoming' },
  { id: '3', title: 'Class of 1979 Reunion', day: 'Wed', location: 'CDO', date: '2024-09-25', status: 'Upcoming' },
  { id: '4', title: 'Corporate Party', day: 'Tue', location: 'CDO', date: '2024-10-30', status: 'Upcoming' },
  { id: '5', title: 'Annual Gala', day: 'Fri', location: 'CDO', date: '2024-11-15', status: 'Upcoming' },
  { id: '6', title: 'New Year Celebration', day: 'Tue', location: 'CDO', date: '2024-12-31', status: 'Upcoming' },
  { id: '7', title: 'Music Festival', day: 'Sat', location: 'CDO', date: '2024-06-22', status: 'Ongoing' },
  { id: '8', title: 'Art Exhibition', day: 'Fri', location: 'CDO', date: '2024-07-05', status: 'Upcoming' },
];

const Schedule = () => {
  const navigation = useNavigation();
  const currentWeek = Array.from({ length: 7 }).map((_, index) => moment().startOf('week').add(index, 'days'));
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleCreateSchedule = () => {
    Alert.alert('Create Schedule', 'Functionality to create a new schedule.');
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
        {/* Week Section */}
        <View style={styles.weekSection}>
          <Text style={styles.weekText}>Calendar</Text>
          <Text style={styles.dateText}>{moment().format('D-MMMM YYYY')}</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate(CreateSchedule)}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.createButtonText}>Create Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {currentWeek.map((day, index) => (
              <View key={index} style={styles.tableHeaderItem}>
                <Text style={styles.tableHeaderText}>{day.format('ddd')}</Text>
                <Text style={styles.tableHeaderDate}>{day.format('D')}</Text>
              </View>
            ))}
          </View>
          <View style={styles.tableBody}>
            {currentWeek.map((day, index) => (
              <View key={index} style={styles.tableCell}>
                {Math.random() > 0.5 && (
                  <View style={styles.event}>
                    <View style={styles.eventCircle} />
                    <Text style={styles.eventText}>1-5pm</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* My Schedule Section */}
        <View style={styles.allContainer}>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>My Schedule</Text>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Category</Text>
                <Ionicons name="chevron-down" size={16} color="black" />
              </TouchableOpacity>
            </View>
            {eventsData.map((event) => (
              <View key={event.id} style={styles.eventDateTextContainer}>
                <View style={styles.eventDateTextInnerContainer}>
                  <Text style={styles.eventDateText}>{moment(event.date).format('D MMM YYYY')}</Text>
                  <Text style={styles.ongoingEventText}>{event.status}</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <View style={styles.dayCircle}>
                    <Text style={styles.dayText}>{event.day}</Text>
                  </View>
                  <View style={styles.eventDetailsWrapper}>
                    <View style={styles.eventDetailsContainer}>
                      <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.eventLocation}>
                          <Ionicons name="location-outline" size={16} color="gray" />
                          <Text style={styles.eventLocationText}>{event.location}</Text>
                        </View>
                        <View style={styles.profilePictures}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                              key={index}
                              source={require('./assets/pro_pic.png')} // Updated to use pro_pic.png
                              style={[styles.profilePicture, { left: index * 15 }]}
                            />
                          ))}
                        </View>
                      </View>
                      <View style={styles.reminderContainer}>
                        <Text style={styles.reminderText}>Set reminder</Text>
                        <TouchableOpacity onPress={handleToggleReminder}>
                          <Ionicons
                            name={isReminderSet ? 'toggle-sharp' : 'toggle-outline'}
                            size={24}
                            color={isReminderSet ? '#FFC42B' : 'gray'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
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
  weekSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  weekText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
  },
  dateText: {
    fontSize: 16,
    color: '#FFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC42B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 5,
  },
  table: {
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeaderItem: {
    alignItems: 'center',
  },
  tableHeaderText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableHeaderDate: {
    color: '#FFF',
    fontSize: 14,
  },
  tableBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableCell: {
    width: width / 7,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  event: {
    backgroundColor: '#FFC42B',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCircle: {
    backgroundColor: '#FFF',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginBottom: 5,
  },
  eventText: {
    color: '#000',
    fontSize: 12,
  },
  scheduleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC42B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: 'white',
  },
  eventDateTextContainer: {
    marginBottom: 20,
  },
  eventDateTextInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDateText: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  ongoingEventText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 5,
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCircle: {
    backgroundColor: '#FFC42B',
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dayText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetailsWrapper: {
    flex: 1,
  },
  allContainer: {
    flex: 1,
    backgroundColor: '#b4b4b4',
    padding: 20,
    borderRadius: 8,
  },
  eventDetailsContainer: {
    backgroundColor: '#C2B0672B',  // Background color with 17% opacity
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C2B067',       // Border color
    shadowColor: '#000',          // Shadow color for inner shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,           // Set opacity of the shadow
    shadowRadius: 3,
    elevation: 0,                 // Set to 0 to avoid the default elevation shadow
    overflow: 'hidden',          // Ensure the inner shadow is clipped within the border radius
  },
  
  eventDetails: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventLocationText: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 5,
  },
  profilePictures: {
    flexDirection: 'row',
    marginTop: 5,
  },
  profilePicture: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    position: 'absolute',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
  },
});

export default Schedule;
