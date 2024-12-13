import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../elements/Header";

const BookCP = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const navigation = useNavigation();

  const eventTypeOptions = [
    { label: "Wedding", value: "Wedding" },
    { label: "Birthday", value: "Birthday" },
    { label: "Reunion", value: "Reunion" },
    { label: "Debut", value: "Debut" },
    { label: "Kid's Party", value: "KidsParty" },
    { label: "Valentines", value: "Valentines" },
    { label: "Christmas", value: "Christmas" },
    { label: "Alumni", value: "Alumni" },
    { label: "Party", value: "Party" },
  ];

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const savedEventName = await AsyncStorage.getItem("eventName");
        const savedEventType = await AsyncStorage.getItem("eventType");
        const savedEventDate = await AsyncStorage.getItem("selectedDate");
        if (savedEventName) setEventName(savedEventName);
        if (savedEventType) setEventType(savedEventType);
        if (savedEventDate) setSelectedDate(savedEventDate);
      } catch (error) {
        console.error("Error loading event details:", error);
      }
    };

    loadEventDetails();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleNext = async () => {
    if (!eventName || !eventType || !selectedDate) {
      Alert.alert("Missing Fields", "Please fill out all fields.");
      return;
    }

    try {
      await AsyncStorage.setItem("eventName", eventName);
      await AsyncStorage.setItem("eventType", eventType);
      await AsyncStorage.setItem("selectedDate", selectedDate);

      navigation.navigate("BookingContinuation2");
    } catch (error) {
      console.error("Error saving event details:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Book Event</Text>
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name (e.g. Mr. & Mrs. Malik Wedding)"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>

          <View style={styles.formGroup}>
            <Dropdown
              data={eventTypeOptions}
              labelField="label"
              valueField="value"
              value={eventType}
              onChange={(item) => setEventType(item.value)}
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              selectedTextStyle={styles.dropdownText}
              placeholderStyle={styles.dropdownPlaceholder}
              itemStyle={styles.dropdownItem}
              itemTextStyle={styles.dropdownItemText}
              placeholder="Choose Event Type"
              renderRightIcon={() => (
                <Icon
                  name="caret-down"
                  size={16}
                  color="#000"
                  style={styles.dropdownIcon}
                />
              )}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.dropdownButton}>
              <Text style={styles.calendarButtonText}>
                {selectedDate ? ` ${selectedDate}` : "Choose Event Date"}
              </Text>
              <TouchableOpacity onPress={toggleCalendar}>
                <Icon
                  name="caret-down"
                  size={16}
                  color="#000"
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            </View>
            {isCalendarVisible && (
              <View style={styles.dropdownCalendarContainer}>
                <Calendar
                  onDayPress={handleDateChange}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      marked: true,
                      selectedColor: "#e6b800",
                    },
                  }}
                  theme={{
                    backgroundColor: "#23232e",
                    calendarBackground: "#23232e",
                    textSectionTitleColor: "#cdb6c1",
                    selectedDayBackgroundColor: "#e6b800",
                    selectedDayTextColor: "#23232e",
                    todayTextColor: "#e6b800",
                    dayTextColor: "#fff",
                    textDisabledColor: "#424242",
                    dotColor: "#e6b800",
                    selectedDotColor: "#23232e",
                    arrowColor: "#e6b800",
                    monthTextColor: "#fff",
                  }}
                />
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    color: "#000",
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins",
    borderColor: "#C2B067",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  calendarButton: {
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins",
    borderColor: "#C2B067",
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -18,
  },
  dropdownButton: {
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Poppins",
    borderColor: "#C2B067",
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -18,
  },
  calendarButtonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  dropdownCalendarContainer: {
    marginHorizontal: 20,
    padding: 5,
  },
  selectedItemsContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  selectedText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  placeholderText: {
    color: "gray",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  nextButton: {
    backgroundColor: "#FFC42B",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginTop: 40,
    marginHorizontal: 100,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  dropdown: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderColor: "#C2B067",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownIcon: {
    marginLeft: 10,
    zIndex: 3,
  },
  dropdown: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "rgba(194, 176, 103, .2)",
    borderColor: "#C2B067",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "black",
  },
  dropdownPlaceholder: {
    color: "gray",
  },
  dropdownContainer: {
    borderRadius: 10,
    backgroundColor: "#EEBA2B",
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 8,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BookCP;
