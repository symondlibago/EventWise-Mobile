import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import styles from "../../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, Button } from "react-native";

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEventsVisible, setIsEventsVisible] = useState(false);
  const toggleEvents = () => {
    setIsEventsVisible(!isEventsVisible);
  };

  // handling events schedule to navigate to the main screen of Schedule
  const handleEventSchedule = () => {
    if (
      schedules[formatDate(selectedDate)] &&
      schedules[formatDate(selectedDate)].length > 0
    ) {
      console.log("test");
      navigation.navigate("Schedule");
      toggleEvents();
    } else {
      console.log("No events for today");
      // You can handle this case by showing a message or doing something else
      navigation.navigate("Schedule");
    }
  };
  // Get today's date
  const today = moment().format("YYYY-MM-DD");

  // Sample schedules for different dates
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

  const formatDate = (date) => moment(date).format("YYYY-MM-DD");

  // Marked Dates - Dates that have events
  const markedDates = Object.keys(schedules).map((date) => {
    return {
      date,
      dots: [
        {
          color: "#007aff",
          selectedColor: "#007aff", // Dot color when the date is selected
        },
      ],
    };
  });

  let customDatesStyles = [
    {
      dateNameStyle: {
        color: "white",
      },
      dateNumberStyle: {
        color: "white",
        fontWeight: "bold",
      },
      dateContainerStyle: {
        backgroundColor: "#eeba2b",
        borderWidth: 0.8,
        borderColor: "#eeba2b",
        borderRadius: 30,
      },

      //   startDate: today,
    },
  ];
  let startDate = moment();
  //   for (let i = 0; i < 1; i++) {
  //     customDatesStyles.push({
  //       startDate: startDate.clone().add(i, "days"), // Single date since no endDate provided
  //       dateNameStyle: styles.dateNameStyle,
  //       dateNumberStyle: styles.dateNumberStyle,
  //       // Random color...
  //       dateContainerStyle: {
  //         // backgroundColor: `#${`#00000${(
  //         //   (Math.random() * (1 << 24)) |
  //         //   0
  //         // ).toString(16)}`.slice(-6)}`,
  //         backgroundColor: "red",
  //       },
  //     });
  //   }
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {}]}>
        <Text style={styles.title}>Date Today</Text>
        {schedules[formatDate(selectedDate)] &&
          schedules[formatDate(selectedDate)].length > 0 && (
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {schedules[formatDate(selectedDate)].length}
                </Text>
              </View>
            </View>
          )}
        <TouchableOpacity
          style={styles.scheduleTitleContainer}
          onPress={handleEventSchedule}
        >
          <Text style={styles.subtitle}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Strip */}
      <CalendarStrip
        style={styles.calendar}
        iconLeft={null}
        iconRight={null}
        customDatesStyles={customDatesStyles}
        scrollable
        // calendarHeaderStyle={{
        //   color: "#333",
        //   fontSize: 10,
        //   // backgroundColor: "green",
        //   display: "flex",
        //   width: "100%",
        //   marginTop: 10,
        //   right: 110,
        // }}
        calendarHeaderContainerStyle={{
          display: "flex",
          // right: 110,
          width: 0,
          height: 0,
        }}
        dateNumberStyle={{ color: "#333" }}
        dateNameStyle={{ color: "#333" }}
        onDateSelected={(date) => setSelectedDate(date.toDate())}
        selectedDate={selectedDate}
        daySelectionAnimation={{
          type: "background",
          duration: 1100,
          highlightColor: "rgba(218,218,218,0.6)", //color sa day selected (gray)
        }}
        highlightDateNumberStyle={{ color: "black" }}
        highlightDateNameStyle={{ color: "black" }}
        markedDates={markedDates} // Adding dots and marking the current date
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markingType="multi-dot"
      />

      {/* Schedule Content */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {/* <ScrollView style={styles.placeholder}> */}
        <View style={styles.placeholderInset}>
          {/* {schedules[formatDate(selectedDate)] ? (
              schedules[formatDate(selectedDate)].map((event, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.scheduleTime}>{event.time}</Text>
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.scheduleTitle}>{event.title}</Text>
                    <Text style={styles.scheduleDescription}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No events for today</Text>
            )} */}
          {schedules[formatDate(selectedDate)] &&
            schedules[formatDate(selectedDate)].length > 0 && (
              <>
                {/* Toggle Button */}
                <TouchableOpacity
                  onPress={toggleEvents}
                  style={styles.toggleButton}
                >
                  <Text style={styles.toggleButtonText}>
                    {isEventsVisible ? (
                      <Text>
                        <MaterialCommunityIcons
                          name={"arrow-up"}
                          color={"rgba(34,7,177,1)"}
                          size={14}
                        />
                        Hide Events
                      </Text>
                    ) : (
                      <Text>
                        <MaterialCommunityIcons
                          name={"arrow-down"}
                          color={"rgba(34,7,177,1)"}
                          size={14}
                        />
                        Show Events
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>

                {/* Dropdown Content */}
              </>
            )}
        </View>
        {/* </ScrollView> */}
      </View>

      {isEventsVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isEventsVisible}
          onRequestClose={toggleEvents}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalView, { width: "90%" }]}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
              ></ScrollView>
              <View>
                {schedules[formatDate(selectedDate)].map((event, index) => (
                  <TouchableOpacity
                    style={styles.scheduleTitleContainer}
                    onPress={handleEventSchedule}
                  >
                    <View key={index} style={styles.scheduleItem}>
                      {/* Event Title */}
                      <Text style={styles.scheduleTitle}>{event.title}</Text>

                      {/* Event Time */}
                      <View style={styles.scheduleDetailRow}>
                        <Text style={styles.label}>Time: </Text>
                        <Text style={styles.scheduleTime}>
                          {event.startTime} - {event.endTime}
                        </Text>
                      </View>

                      {/* Event Description */}
                      <View style={styles.scheduleDetailRow}>
                        <Text style={styles.label}>Description: </Text>
                        <Text style={styles.scheduleDescription}>
                          {event.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Button to close modal */}
              <Button title="Close" onPress={toggleEvents} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
