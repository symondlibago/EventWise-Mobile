import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventPackageCard = ({ event, likedEvents, toggleLike }) => {
  const navigation = useNavigation();
  const [eventDetails, setEventDetails] = useState({});

  return (
    <View style={styles.eventCard}>
      <Image
        source={
          eventDetails.image
            ? { uri: eventDetails.image }
            : require("../../../../../assets/event2.png")
        }
        style={styles.image}
      />

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

      <Text style={styles.eventTitle}>
        {eventDetails.title || "Event Title"}
      </Text>

      <View style={styles.eventPackageDetailRow}>
        <View style={styles.eventDetailContainer}>
          <Text style={styles.eventDetailText}>
            Date: {eventDetails.date || "N/A"}
          </Text>
        </View>
      </View>

      <Text style={styles.priceText}>Price: ${eventDetails.price || "0"}</Text>
      <Text style={styles.descriptionText}>
        {eventDetails.type || "Event Type"}
      </Text>

      {/* Button to navigate to event details screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("EventDetails", { eventId: event.id })
        }
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 20,
  },
  heartLiked: {
    backgroundColor: "#FFDD00", // Yellow for liked state
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  eventPackageDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  eventDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    fontSize: 14,
    color: "#555",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default EventPackageCard;
