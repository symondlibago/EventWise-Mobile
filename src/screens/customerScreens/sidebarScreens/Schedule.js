import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Modal, Button } from 'react-native';
import Header from "../elements/Header";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { Calendar } from "react-native-calendars";

const { width } = Dimensions.get('window');

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const schedules = {
    "2024-09-01": [
      {
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        title: "Team Meeting",
        description: "Discuss project status.",
      },
      {
        startTime: "02:00 PM",
        endTime: "03:00 PM",
        title: "Client Call",
        description: "Review client requirements.",
      },
    ],
    "2024-09-02": [
      {
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        title: "Code Review",
        description: "Review recent PRs with the team.",
      },
      {
        startTime: "04:00 PM",
        endTime: "05:30 PM",
        title: "Design Discussion",
        description: "Discuss new UI designs.",
      },
    ],
    "2024-09-03": [
      {
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        title: "Marketing Strategy",
        description: "Plan Q4 campaigns.",
      },
    ],
  };

  // Dynamically mark the dates that have schedules
  useEffect(() => {
    const newMarkedDates = {};
    Object.keys(schedules).forEach((date) => {
      newMarkedDates[date] = {
        marked: true,
        dotColor: "blue",
        selectedColor: "green",
      };
    });
    setMarkedDates(newMarkedDates);
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <ScrollView>
       

        {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity
              style={[styles.buttonView, { backgroundColor: '#C2B067' }]}
              onPress={() => navigation.navigate('Schedule')}
              >
              <Icon name="calendar-month" size={24} color="#000" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.container}>
      {/* Calendar Component */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked,
            selectedColor: "blue",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "red",
          arrowColor: "blue",
        }}
      />

      {/* Detailed Agenda for Selected Day */}
      <View style={styles.agendaContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate || "Select a date to view schedule"}
        </Text>

        {selectedDate && schedules[selectedDate] ? (
          <ScrollView style={styles.agendaScroll}>
            {schedules[selectedDate].map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventContainer}
                onPress={() => handleEventPress(event)}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Time: </Text>
                  <Text style={styles.eventTime}>
                    {event.startTime} - {event.endTime}
                  </Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Description: </Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noEventsText}>No events for this date.</Text>
        )}
      </View>

      {/* Modal for Detailed Event Information */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalTime}>
                  Time: {selectedEvent.startTime} - {selectedEvent.endTime}
                </Text>
                <Text style={styles.modalDescription}>
                  Description: {selectedEvent.description}
                </Text>
                <Button title="Close" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  // buttonsContainer: {
  //   flexDirection: 'row',
  //   marginTop: -10,
  //   marginBottom: 15,
  //   alignSelf: "center",
  //   backgroundColor: 'rgba(194, 176, 103, 0.2)',
  //   borderRadius: 25,
  //   paddingLeft: 1,
  //   paddingRight: 1,
  // },
  // buttonView: {
  //   borderRadius: 50,
  //   paddingLeft: 20,
  //   paddingRight: 20,  
  // },
  agendaContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  agendaScroll: {
    flex: 1,
  },
  eventContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  eventDetailRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    fontFamily: "Poppins",
  },
  eventTime: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins",
  },
  noEventsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  modalTime: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Poppins",
  },
});

export default Schedule;
