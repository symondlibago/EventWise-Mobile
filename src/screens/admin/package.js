import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "./nav"; // Import NavBar

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

const Package = ({ navigation }) => {
  // Added navigation prop
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [likedEvents, setLikedEvents] = useState({});

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = eventsData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(eventsData);
    }
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.itemContainer}>
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
      <TouchableOpacity
        style={[
          styles.heartIcon,
          likedEvents[item.id] ? styles.heartLiked : null,
        ]}
        onPress={() => toggleLike(item.id)}
      >
        <MaterialCommunityIcons
          name={likedEvents[item.id] ? "heart" : "heart-outline"}
          color={likedEvents[item.id] ? "#FF0000" : "#888"}
          size={20}
        />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        {item.buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              if (button === "Equipment") {
                navigation.navigate("Equipment"); // Navigate to Equipment screen
              }
              if (button === "Edit") {
                navigation.navigate("EditScreen"); // Navigate to Equipment screen
              }
              if (button === "Attendee") {
                navigation.navigate("Attendees"); // Navigate to Equipment screen
              }
              if (button === "Inventory") {
                navigation.navigate("Inventory"); // Navigate to Equipment screen
              }
              if (button === "Feedback") {
                navigation.navigate("Feedback"); // Navigate to Feedback screen
              }
              // Add other button actions as needed
            }}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
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
      <View style={styles.container}>
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
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBox}
            placeholder="Search Event"
            placeholderTextColor="#888"
            onChangeText={(text) => handleSearch(text)}
            value={search}
          />
        </View>
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
        <NavBar />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40, // Adjust margin for the header
  },
  menuButton: {
    marginLeft: 10,
  },
  logo: {
    width: 120,
    height: 40,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10, // Adjust top margin for the search container
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  detailContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#DADADA",
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  heartLiked: {
    backgroundColor: "#DADADA",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#FFC42B", // Updated button color
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
  },
});

export default Package;
