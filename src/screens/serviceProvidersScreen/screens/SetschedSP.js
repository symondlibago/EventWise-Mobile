import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";

export default function SetSchedSP({ navigation }) {
  // Set calendar as the default active button
  const [activeButton, setActiveButton] = useState("calendar");

  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTypeVisible, setEventTypeVisible] = useState(false);
  const [eventType, setEventType] = useState("");

  const eventTypes = ["Wedding", "Birthday", "Meeting", "Party"];

  const toggleEventTypeOverlay = () => {
    setEventTypeVisible(!eventTypeVisible);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setDatePickerVisible(false); // Close date picker after selecting a date
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.iconButton, activeButton === "checklist" && styles.activeButton]}
          onPress={() => {
            setActiveButton("checklist");
            navigation.navigate("SchedSP");
          }}
        >
          <Ionicons name="checkbox-outline" size={24} color={activeButton === "checklist" ? "#fff" : "#888"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, activeButton === "calendar" && styles.activeButton]}
          onPress={() => {
            setActiveButton("calendar");
            navigation.navigate("SetSchedSP");
          }}
        >
          <Ionicons name="calendar-outline" size={24} color={activeButton === "calendar" ? "#fff" : "#888"} />
        </TouchableOpacity>
      </View>

      {/* Event Details Form */}
      <View style={styles.formContainer}>
        <TextInput style={styles.inputField} placeholder="Enter Your Name" />
        
        <TouchableOpacity style={styles.dropdownField} onPress={toggleEventTypeOverlay}>
          <Text style={styles.dropdownText}>{eventType || "Choose Event Type"}</Text>
          <Ionicons name="caret-down" size={16} style={styles.iconRight} />
        </TouchableOpacity>

        {eventTypeVisible && (
          <View style={styles.overlay}>
            <TouchableOpacity onPress={toggleEventTypeOverlay} style={styles.closeButton}>
              <Ionicons name="caret-up" size={16} color="#fff" />
            </TouchableOpacity>
            {eventTypes.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  setEventType(type);
                  toggleEventTypeOverlay();
                }}
                style={styles.eventTypeOption}
              >
                <Text style={styles.eventTypeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.dropdownField} onPress={toggleDatePicker}>
          <Text style={styles.dropdownText}>{selectedDate || "Choose Event Date"}</Text>
          <Ionicons name="caret-down" size={16} style={styles.iconRight} />
        </TouchableOpacity>

        {datePickerVisible && (
          <View style={styles.datePickerOverlay}>
            <TouchableOpacity onPress={toggleDatePicker} style={styles.closeButton}>
              <Ionicons name="caret-up" size={16} color="#fff" />
            </TouchableOpacity>
            <Calendar onDayPress={handleDateSelect} style={styles.calendar} />
          </View>
        )}

        <TextInput style={styles.inputField} placeholder="Enter Event Venue" />
        <TextInput style={styles.inputField} placeholder="Enter Event Start Time" />
        <TextInput style={styles.inputField} placeholder="Enter Event End Time" />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  formContainer: {
    flex: 1,
  },
  inputField: {
    borderColor: "#C2B067",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(194, 176, 103, 0.17)",
  },
  dropdownField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align the text and the icon to the right
    borderColor: "#C2B067",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(194, 176, 103, 0.17)",
  },
  dropdownText: {
    flex: 1, // Ensures text takes up space while icon stays on the right
  },
  iconRight: {
    marginLeft: 10,
  },
  overlay: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: "#EEBA2B",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  eventTypeOption: {
    paddingVertical: 10,
  },
  eventTypeText: {
    color: "#fff",
  },
  datePickerOverlay: {
    position: "absolute",
    top: 150,
    left: 20,
    right: 1,
    backgroundColor: "#EEBA2B",
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#EEBA2B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
