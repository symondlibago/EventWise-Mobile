import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ScheduleApp() {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeButton, setActiveButton] = useState(route.params?.activeButton || "calendar");
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTypeVisible, setEventTypeVisible] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  const schedules = {
    "2024-09-21": [
      {
        time: "09:00 AM",
        title: "Team Meeting",
        description: "Discuss project status.",
        timeline: [
          { time: "09:00 AM", description: "Event Start" },
          { time: "09:15 AM", description: "Introduction to the team" },
          { time: "09:30 AM", description: "Updates from each member" },
          { time: "10:00 AM", description: "Discussion on blockers" },
          { time: "10:30 AM", description: "Wrap up and next stepsss" },
        ],
      },
    ],
  };

  const markedDates = Object.keys(schedules).reduce((acc, date) => {
    acc[date] = { marked: true, dots: [{ color: "#eeba2b" }] };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const toggleEventTypeOverlay = () => {
    setEventTypeVisible(!eventTypeVisible);
  };

  const handleSave = () => {
    if (!eventType || !selectedDate || !eventVenue || !eventStartTime || !eventEndTime) {
      alert("Please fill in all fields");
      return;
    }
    // Save logic here...
  };

  useEffect(() => {
    if (route.params?.activeButton) {
      setActiveButton(route.params.activeButton);
    }
  }, [route.params?.activeButton]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
  style={[styles.iconButton, activeButton === "calendar" && styles.activeButton]}
  onPress={() => {
    setActiveButton("calendar");
    navigation.navigate("ScheduleApp", { activeButton: "calendar" });
  }}
>
  <Ionicons name="calendar-outline" size={24} color={activeButton === "calendar" ? "#fff" : "#888"} />
</TouchableOpacity>

<TouchableOpacity
  style={[styles.iconButton, activeButton === "checklist" && styles.activeButton]}
  onPress={() => {
    setActiveButton("checklist");
    navigation.navigate("ScheduleApp", { activeButton: "checklist" });
  }}
>
  <Ionicons name="checkbox-outline" size={24} color={activeButton === "checklist" ? "#fff" : "#888"} />
</TouchableOpacity>

      </View>

      {activeButton === "calendar" ? (
        <>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            markingType="multi-dot"
          />

          <ScrollView style={styles.agendaContainer}>
            {selectedDate && schedules[selectedDate] ? (
              <>
                <Text style={styles.agendaTitle}>
                  Agenda for {moment(selectedDate).format("MMMM D, YYYY")}
                </Text>
                {schedules[selectedDate].map((event, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openModal(event)}
                    style={styles.eventContainer}
                  >
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <Text style={styles.noEventsText}>
                {selectedDate ? "No events for this date." : "Select a date to see the schedule."}
              </Text>
            )}
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Time Frame</Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.closeButton}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalDate}>
                  {moment(selectedDate).format("MMMM D, YYYY")}
                </Text>
                <Text style={styles.modalTime}>{selectedEvent?.time}</Text>
                <View style={styles.horizontalDivider} />
                <View style={styles.modalBody}>
                  <View style={styles.timeContainer}>
                    {selectedEvent?.timeline.map((timeEvent, index) => (
                      <View key={index} style={styles.timeEntry}>
                        <Text style={styles.eventTime}>{timeEvent.time}</Text>
                        <View style={styles.circleContainer}>
                          <View style={styles.topLine} />
                          <View style={styles.circle} />
                          <View style={styles.bottomLine} />
                        </View>
                        <View style={styles.timeDetails}>
                          <Text style={styles.modalDescription}>
                            {timeEvent.description}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={styles.formContainer}>
          <TextInput style={styles.inputField} placeholder="Enter Your Name" />
          <View style={styles.dateContainer}>
            <TextInput 
              style={styles.inputFielddate}   
              placeholder="Enter Date" 
              value={selectedDate ? moment(selectedDate).format("MMMM D, YYYY") : ""}
              editable={false}
              
            />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calendarIconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.dropdownField} onPress={toggleEventTypeOverlay}>
  <Text style={styles.dropdownText}>{eventType || "Choose Event Type"}</Text>
  <Ionicons name="caret-down" size={16} style={styles.iconRight} />
</TouchableOpacity>
{eventTypeVisible && (
  <ScrollView style={styles.eventTypeDropdown}>
    {["Wedding", "Birthday", "Meeting", "Party"].map((type) => (
      <TouchableOpacity
        key={type}
        onPress={() => {
          setEventType(type);
          setEventTypeVisible(false);
        }}
        style={styles.eventTypeOption}
      >
        <Text style={styles.eventTypeText}>{type}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)}


          <TextInput style={styles.inputField} placeholder="Enter Event Venue" value={eventVenue} onChangeText={setEventVenue} />
          <TextInput style={styles.inputField} placeholder="Enter Event Start Time" value={eventStartTime} onChangeText={setEventStartTime} />
          <TextInput style={styles.inputField} placeholder="Enter Event End Time" value={eventEndTime} onChangeText={setEventEndTime} />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {/* Calendar Modal for Date Selection */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Calendar
                  onDayPress={handleDayPress}
                  markedDates={markedDates}
                />
                <TouchableOpacity style={styles.closeCalendarButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeCalendarText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  checklistButton: {
    left: 50, // Adjust to position overlap
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconButton: {
    width: 100,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    marginHorizontal: -15,
  },
  activeButton: {
    backgroundColor: "#EEBA2B",
  },
  agendaContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  eventTime: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eventTitle: {
    fontSize: 14,
    color: "#333",
  },
  eventDescription: {
    fontSize: 12,
    color: "#666",
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  inputFielddate : {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 20,
    color: "#EEBA2B",
  },
  modalDate: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  modalBody: {
    marginTop: 10,
  },
  timeContainer: {
    marginTop: 10,
  },
  timeEntry: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circleContainer: {
    alignItems: "center",
    width: 30,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EEBA2B",
  },
  topLine: {
    height: 20,
    width: 2,
    backgroundColor: "#EEBA2B",
  },
  bottomLine: {
    height: 20,
    width: 2,
    backgroundColor: "#EEBA2B",
  },
  timeDetails: {
    marginLeft: 10,
    flex: 1,
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
  },
  formContainer: {
    padding: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 50, // Equal height for all text fields
    
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    height: 50,
  },
  calendarIconContainer: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  dropdownField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    color: "#999",
  },
  iconRight: {
    marginLeft: 10,
  },
  eventTypeDropdown: {
    position: "absolute", // Keep it absolutely positioned
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    maxHeight: 150,
    zIndex: 100,
    marginTop: 5, // Ensure it's slightly below the text field
    elevation: 5,
    top: 200, // Adjust this to be the height of your text input to position below it
    right: 20,
  },
  
  
  

  eventTypeOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventTypeText: {
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#EEBA2B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeCalendarButton: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#EEBA2B",
    borderRadius: 5,
  },
  closeCalendarText: {
    color: "#fff",
  },
});
