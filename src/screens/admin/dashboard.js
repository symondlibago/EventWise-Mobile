import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Provider as PaperProvider } from "react-native-paper";
import Createpackage from "./createpackage";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import Package from "./package";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const Dashboard = () => {
  const navigation = useNavigation();

  const [likedEvents, setLikedEvents] = useState({});
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
  ]);

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleButtonPress = (index) => {
    setButtonStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleIconPress = (page) => {
    navigation.navigate(page);
  };

  const events = [
    {
      id: 1,
      image: require("./assets/event1.png"),
      title: "Wedding Package",
    },
    {
      id: 2,
      image: require("./assets/event2.png"),
      title: "Birthday Package",
    },
    {
      id: 3,
      image: require("./assets/event3.png"),
      title: "Reunion Package",
    },
  ];

  const markedDates = {
    "2023-07-16": {
      dots: [
        { key: "vacation", color: "red" },
        { key: "massage", color: "blue" },
        { key: "workout", color: "green" },
      ],
    },
    "2023-07-20": {
      dots: [
        { key: "vacation", color: "red" },
        { key: "workout", color: "green" },
      ],
    },
    "2023-07-25": {
      dots: [{ key: "massage", color: "blue" }],
    },
    // Add more marked dates as needed
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={["#2A2600", "#000000"]} // Define the gradient colors
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom
          style={styles.gradientContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={32} color="white" />
            </TouchableOpacity>
            <Image source={require("./assets/logo.png")} style={styles.logo} />
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleIconPress("Messages")}>
                <Ionicons
                  name="chatbubble-outline"
                  size={30}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress("Notification")}>
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Packages section */}
          <Text style={styles.sectionText}>Event Packages</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Image source={event.image} style={styles.eventImage} />
                <TouchableOpacity
                  onPress={() => toggleLike(event.id)}
                  style={[
                    styles.heartIcon,
                    likedEvents[event.id] ? styles.heartLiked : null,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={likedEvents[event.id] ? "heart" : "heart-outline"}
                    color={likedEvents[event.id] ? "#FF0000" : "#888"}
                    size={20}
                  />
                </TouchableOpacity>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetailRow}>
                  <View style={styles.eventDetailContainer}>
                    <Text style={styles.eventDetailText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetailContainer}>
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Find Events and Create buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.findEventsButton}
              onPress={() => navigation.navigate(Createpackage)} // Navigate to Find Event screen
            >
              <MaterialCommunityIcons name="plus" color="#000" size={20} />

              <Text style={styles.findEventsButtonText}>Create Package</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate(Package)} // Navigate to Create screen
            >
              <MaterialCommunityIcons name="magnify" color="#000" size={20} />

              <Text style={styles.createButtonText}>Package</Text>
            </TouchableOpacity>
          </View>

          {/* Event Calendar */}
          <Text style={styles.sectionText}>Event Calendar</Text>
          <View style={styles.profileCalendarContainer}>
            <View style={styles.profileSection}>
              <Avatar.Image
                size={50}
                source={require("./assets/pro_pic.png")}
                style={styles.profilePicture}
              />
              <View style={styles.welcomeUsername}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.usernameText}>Username</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Cagayan de Oro</Text>
                <MaterialCommunityIcons
                  name="map-marker"
                  color="#FFC42B"
                  size={23}
                  style={styles.locationIcon}
                />
              </View>
            </View>
            <Calendar
              theme={{
                backgroundColor: "#6B6B6B",
                calendarBackground: "#6B6B6B",
                textSectionTitleColor: "#FFC42B",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#FFC42B",
                dayTextColor: "#ffffff",
                textDisabledColor: "#d9e1e8",
                dotColor: "#FFC42B",
                selectedDotColor: "#ffffff",
                arrowColor: "#FFC42B",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#FFC42B",
                indicatorColor: "#FFC42B",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              markingType={"multi-dot"}
              markedDates={markedDates}
            />
          </View>
        </LinearGradient>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginVertical: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  eventCard: {
    width: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  heartLiked: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    padding: 5,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  eventDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  eventDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    fontSize: 12,
    color: "#FFF",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  findEventsButton: {
    backgroundColor: "#FFC42B",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  findEventsButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  createButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  createButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  profileCalendarContainer: {
    backgroundColor: "#6B6B6B",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2600",
    padding: 10,
    borderRadius: 10,
  },
  profilePicture: {
    marginRight: 10,
  },
  welcomeUsername: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 12,
    color: "#FFF",
  },
  usernameText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "600",
  },
  spacer: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#FFF",
    textDecorationLine: "underline",
  },
  locationIcon: {
    marginLeft: 5,
  },
});

export default Dashboard;
