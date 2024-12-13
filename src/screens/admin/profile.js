import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList, // Add this import
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient

import NavBar from "./nav";

const eventsData = [
  {
    id: "1",
    title: "Mr. & Mrs. Malik Wedding",
    image: require("./assets/event1.png"),
    date: "2024-07-01",
    address: "CDO",
    buttons: ["Edit", "Equipment"],
  },
  {
    id: "2",
    title: "Elizabeth Birthday",
    image: require("./assets/event2.png"),
    date: "2024-08-12",
    address: "CDO",
    buttons: ["Attendee", "Feedback", "Inventory"],
  },
  {
    id: "3",
    title: "Class of 1979 Reunion",
    image: require("./assets/event3.png"),
    date: "2024-09-25",
    address: "CDO",
    buttons: ["Edit", "Equipment"],
  },
  {
    id: "4",
    title: "Corporate Party",
    image: require("./assets/event1.png"),
    date: "2024-10-30",
    address: "CDO",
    buttons: ["Edit", "Equipment"],
  },
  {
    id: "5",
    title: "Annual Gala",
    image: require("./assets/event2.png"),
    date: "2024-11-15",
    address: "CDO",
    buttons: ["Attendee", "Feedback", "Equipment"],
  },
  {
    id: "6",
    title: "New Year Celebration",
    image: require("./assets/event3.png"),
    date: "2024-12-31",
    address: "CDO",
    buttons: ["Attendee", "Feedback", "Inventory"],
  },
  {
    id: "7",
    title: "Music Festival",
    image: require("./assets/event1.png"),
    date: "2024-06-22",
    address: "CDO",
    buttons: ["Attendee"],
  },
  {
    id: "8",
    title: "Art Exhibition",
    image: require("./assets/event2.png"),
    date: "2024-07-05",
    address: "CDO",
    buttons: ["Attendee", "Equipment"],
  },
];

const Profile = () => {
  const navigation = useNavigation();

  // Function to render each event item
  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#2A2600", "#000000"]} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }} // Bottom
      style={styles.gradientContainer}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {/* Header with Logo and Icons */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <View style={styles.iconsContainer}>
            <Ionicons
              name="chatbubble-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
            <Ionicons
              name="notifications-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require("./assets/profile-picture.jpg")}
            style={styles.profilePicture}
          />
          <Text style={styles.nameText}>Organizer</Text>
          <Text style={styles.addressText}>Service Provider Address</Text>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>Open</Text>
              <Text style={styles.scheduleTime}>6:00 AM</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>Close</Text>
              <Text style={styles.scheduleTime}>9:00 PM</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")} // Update to navigate to the Settings page
            >
              <Ionicons name="pencil" size={24} color="white" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.portfolioButton}
              onPress={() => navigation.navigate("Portfolio")} // Update the onPress event
            >
              <Ionicons name="enter-outline" size={24} color="white" />
              <Text style={styles.portfolioButtonText}>Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Event Text */}
        <Text style={styles.popularEventText}>Popular Events</Text>

        {/* Horizontal Scrolling Event List */}
        <FlatList
          data={eventsData}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsListContainer}
        />

        <NavBar />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  menuButton: {
    padding: 5,
  },
  profileSection: {
    borderColor: "#C2B067", // Border color of the rectangle
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    backgroundColor: "transparent", // Make the background color transparent
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  scheduleContainer: {
    marginTop: 10,
    width: "100%",
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  scheduleText: {
    color: "#fff",
  },
  scheduleTime: {
    color: "#FFC42B",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#61481C",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFC42B",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  portfolioButton: {
    backgroundColor: "#CEB64C",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  portfolioButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  popularEventText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 30,
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    color: "#2A93D5",
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20, // Adjust this based on your needs
  },
});

export default Profile;
