import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import AddEvent from "../component/AddEvent";
import API_URL from "../../../../constants/constant";

const ProfileMyEvents = () => {
  const [eventsByDate, setEventsByDate] = useState({}); // Grouped events by date
  const [selectedMonth, setSelectedMonth] = useState(null); // Currently selected month
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for modal

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const fetchEventsByMonth = async (month) => {
    try {
      const response = await fetch(`${API_URL}/api/events/month/${month}`);
      const text = await response.text();
      const data = JSON.parse(text);
      const groupedEvents = data.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
      }, {});

      setEventsByDate(groupedEvents);
      setSelectedMonth(month);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Events Archived</Text>
      {/* Add Event Button */}
      <View style={styles.addEventContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.addEventButtonContainer}>
            <TouchableOpacity
              onPress={() => setIsAddModalVisible(true)} // Open add event modal
              style={styles.addEventButton}
            >
              <Text style={styles.addEventButtonText}>Add Event</Text>
            </TouchableOpacity>
          </View>
          {/* Month Buttons */}
          {months.map((month) => (
            <TouchableOpacity
              key={month.value}
              onPress={() => fetchEventsByMonth(month.value)}
            >
              <View style={styles.monthButton}>
                <Text style={styles.monthButtonText}>{month.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal to display events */}
      <Modal
  visible={isModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalContainer}>
  <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>
        Events in {months[selectedMonth - 1]?.name}
      </Text>
    </View>

    <ScrollView style={styles.scrollView}>
      {Object.keys(eventsByDate).map((date) => (
        <View key={date} style={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          {eventsByDate[date].map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
            >
              <Image
                source={{ uri: event.coverPhoto }}
                style={styles.eventImage}
              />
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDetails}>
                {event.date} at {event.time} | {event.location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  </View>
</Modal>

      {/* Add Event Modal */}
      <AddEvent
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        type="event"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addEventContainer: {
    height: 120,
    width: "100%",
  },
  addEventButtonContainer: {
    marginVertical: -10,
    marginRight: 10,
  },
  addEventButton: {
    backgroundColor: "#2A93D5",
    borderRadius: 15,
    padding: 15,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  addEventButtonText: {
    color: "white",
    fontSize: 16,
  },
  monthButton: {
    justifyContent: "center",
    height: 120,
    width: 140,
    backgroundColor: "#eeba2b",
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  monthButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1, // Ensure title takes remaining space
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    backgroundColor: "transparent", // No background color
    borderRadius: 20, // Optional for rounded corners
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Customize color of "X"
  },
  scrollView: {
    flex: 1,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventCard: {
    backgroundColor: "#eeba2b",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  eventName: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  eventDetails: {
    color: "white",
    fontSize: 14,
  },
});

export default ProfileMyEvents;
