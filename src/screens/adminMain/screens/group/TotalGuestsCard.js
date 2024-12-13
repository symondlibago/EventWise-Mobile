import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons

const TotalGuestsCard = ({ event, navigation }) => {
  const handlePress = () => {
    // Navigate to the guest list screen
    navigation.navigate("GuestListAdmin", {
      eventId: event.id,
      pax: event.pax,
      location: event.location,
      date: event.date,
      time: event.time,
      name: event.name,
      description: event.description,
      status: event.status,
      image: event.image,
    });
  };

  // Dynamic color based on event status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "#4CAF50"; // Green
      case "tentative":
        return "#FF9800"; // Orange
      case "canceled":
        return "#F44336"; // Red
      default:
        return "#607D8B"; // Default Grey
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardHeader}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={[styles.status, { color: getStatusColor(event.status) }]}>
          {event.status}
        </Text>
      </View>
      <View style={styles.eventDetailsRow}>
        <MaterialCommunityIcons name="map-marker" size={16} color="#eeba2b" />
        <Text style={styles.eventDetails}>{event.location}</Text>
      </View>
      <View style={styles.eventDetailsRow}>
        <MaterialCommunityIcons name="calendar" size={16} color="#eeba2b" />
        <Text style={styles.eventDetails}>{event.date}</Text>
      </View>
      <View style={styles.eventDetailsRow}>
        <MaterialCommunityIcons name="clock" size={16} color="#eeba2b" />
        <Text style={styles.eventDetails}>{event.time}</Text>
      </View>
      <Text style={styles.eventDescription} numberOfLines={2}>
        {event.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.totalGuests}>Guests: {event.pax}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#757575" />
      </View>
    </TouchableOpacity>
  );
};

export default TotalGuestsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  eventDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  eventDescription: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
  },
  totalGuests: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
