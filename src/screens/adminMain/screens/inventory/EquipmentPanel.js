import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native";
import { fetchEvents } from "../../../../services/organizer/adminEventServices";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

const EquipmentPanel = () => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(false);
  const { currentEvents, setCurrentEvents } = useEventStore();
  const navigation = useNavigation(); // Navigation hook for screen navigation

  // Fetch events on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents();
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  // Pull-to-refresh function
  const refreshEvents = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedEvents = await fetchEvents();
      setCurrentEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setRefreshing(false);
    }
  }, [setCurrentEvents]);

  // Event press handler for navigation
  const handleEventPress = (eventId) => {
    navigation.navigate("EquipmentPanelDetails", { eventId });  // Pass eventId to the details screen
  };  

  // Search function
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortEvents = (option) => {
    let sortedEvents = [...filteredEvents];
    const today = new Date();
    switch (option) {
      case "today":
        sortedEvents = sortedEvents.filter((event) =>
          new Date(event.date).toDateString() === today.toDateString()
        );
        break;
      case "thisWeek":
        sortedEvents = sortedEvents.filter((event) => {
          const eventDate = new Date(event.date);
          const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
          const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
          return eventDate >= weekStart && eventDate <= weekEnd;
        });
        break;
      case "nextWeek":
        sortedEvents = sortedEvents.filter((event) => {
          const eventDate = new Date(event.date);
          const nextWeekStart = new Date(today.setDate(today.getDate() + 7 - today.getDay()));
          const nextWeekEnd = new Date(today.setDate(nextWeekStart.getDate() + 6));
          return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
        });
        break;
      default:
        break;
    }
    return sortedEvents;
  };

  const displayedEvents = sortEvents(sortOption);

 return (
  
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Events Equipment</Text>

    {/* Search bar and sorting dropdown */}
    <View style={styles.searchSortContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search event name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <DropDownPicker
        open={openDropdown}
        value={sortOption}
        items={[
          { label: "All", value: "all" },
          { label: "Today", value: "today" },
          { label: "This Week", value: "thisWeek" },
          { label: "Next Week", value: "nextWeek" },
        ]}
        setOpen={setOpenDropdown}
        setValue={setSortOption}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropdownList}
      />
    </View>

    <ScrollView
      style={styles.scrollView} // Add this for ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshEvents}
          colors={["#ff9900"]}
          tintColor="#ff9900"
        />
      }
    >
      <FlatList
        data={displayedEvents}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <TouchableOpacity onPress={() => handleEventPress(item.id)}>
              <Text style={styles.eventName}>{item.name}</Text>
              <View style={styles.iconRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#eeba2b" />
                <Text style={styles.eventDetails}>{item.date}</Text>
              </View>
              <View style={styles.iconRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#eeba2b" />
                <Text style={styles.eventDetails}>{item.location}</Text>
              </View>
              <View style={styles.iconRow}>
                <MaterialCommunityIcons name="clock" size={16} color="#eeba2b" />
                <Text style={styles.eventDetails}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  </SafeAreaView>
);

};

export default EquipmentPanel;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#f9f9f9",
    padding: 8,
    marginBottom: -90,
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the content to expand vertically
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  searchSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    flexBasis: 120,
  },
  dropdownList: {
    borderColor: "#ccc",
  },
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 12,
    color: "#555",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center", // Align icon and text vertically
    marginBottom: 5,
  },
});
