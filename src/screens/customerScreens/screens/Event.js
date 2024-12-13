import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import Header from "../elements/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  myBookEvents,
  myEvents,
} from "../../../services/organizer/adminEventServices";

const Event = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const loadEvents = async () => {
    try {
      const fetchedEvents = await myBookEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      showToast("Failed to load events");
    }
  };

  const refreshEvents = async () => {
    setRefreshing(true); // Start refreshing
    try {
      await loadEvents(); // Re-fetch the events
    } catch (error) {
      showToast("Error refreshing events");
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };

  useEffect(() => {
    refreshEvents(); // Initial load
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      (event.name &&
        event.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location &&
        event.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDropdownToggle = (index) => {
    if (activeEventIndex === index) {
      setDropdownVisible((prev) => !prev);
      setActiveEventIndex(null);
    } else {
      setActiveEventIndex(index);
      setDropdownVisible(true);
    }
  };

  const handleLocationPress = (event) => {
    navigation.navigate("Venue", {
      selectedVenue: event.venue,
      selectedAddress: event.address,
      selectedPackage: require("../pictures/v1.png"),
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshEvents}
              colors={["#ff9900"]}
              tintColor="#ff9900"
            />
          }
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <View key={index} style={styles.eventFolder}>
              <Image
  source={{
    uri: event?.coverPhoto || "defaultImageURL",
  }}
  style={styles.eventImage}
  resizeMode="cover"
/>

                <View style={styles.eventDetailsContainer}>
                  <Text style={styles.eventName}>
                    {event.name || "No event name"}
                  </Text>
                  <View style={styles.eventInfo}>
                    <View style={styles.eventDetails}>
                      <Icon name="calendar" size={16} color="#eeba2b" />
                      <Text style={styles.eventDate}>
                        {event.date || "No date"}
                      </Text>
                    </View>
                    <View style={styles.eventDetails}>
                      <Icon name="map-marker" size={16} color="#eeba2b" />
                      <TouchableOpacity
                        onPress={() => handleLocationPress(event)}
                      >
                        <Text style={styles.eventLocation}>
                          {event.location || "No location"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.eventDetails}>
                      <Icon name="list-status" size={16} color="#eeba2b" />
                      <Text style={styles.eventDate}>
                        {event.payment_status || "No Payment Status"}
                      </Text>
                    </View>
                    
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EventDetails", {
                          eventId: event.id,
                        })
                      }
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDropdownToggle(index)}
                      style={styles.button}
                    >
                      <Icon name="dots-vertical" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>

                  {isDropdownVisible && activeEventIndex === index && (
                    <View style={styles.dropdown}>
                      <TouchableOpacity
                        onPress={() => setDropdownVisible(false)}
                        style={styles.closeButton}
                      >
                        <Icon name="close" size={20} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDropdownVisible(false);
                          navigation.navigate("InventoryTracker", {
                            eventId: event.id,
                          });
                        }}
                        style={styles.dropdownItem}
                      >
                        <Icon
                          name="calendar-multiple-check"
                          size={16}
                          color="#fff"
                          style={styles.dropdownIcon}
                        />
                        <Text style={styles.dropdownText}>Inventory</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("FeedbackInputs", {
                            eventId: event.id,
                          })
                        }
                        style={styles.dropdownItem}
                      >
                        <Icon
                          name="comment-account-outline"
                          size={16}
                          color="#fff"
                          style={styles.dropdownIcon}
                        />
                        <Text style={styles.dropdownText}>Feedback</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDropdownVisible(false);
                          navigation.navigate("GuestList", {
                            eventid: event.id,
                            eventName: event.name,
                          });
                        }}
                        style={styles.dropdownItem}
                      >
                        <Icon
                          name="account-multiple-outline"
                          size={16}
                          color="#fff"
                          style={styles.dropdownIcon}
                        />
                        <Text style={styles.dropdownText}>Guest</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.errorText}>No events found.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    borderColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  eventFolder: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#eeba2b",
    borderWidth: 2,
  },
  eventDetailsContainer: {
    marginLeft: 0,
  },
  eventName: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  eventDetails: {
    flexDirection: "row",
    marginBottom: 5,
  },
  eventDate: {
    marginLeft: 5,
    color: "#555",
  },
  eventLocation: {
    marginLeft: 5,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAllButton: {
    color: "#FFC42B",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    padding: 10,
    zIndex: 1,
  },
  errorText: {
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  dropdown: {
    position: "absolute",
    top: -12,
    right: 0,
    backgroundColor: "#efbc31",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    zIndex: 2,
    minWidth: "50%",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
    zIndex: 3,
  },
});

export default Event;
