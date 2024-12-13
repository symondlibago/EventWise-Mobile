// eventwise_mobile/src/screens/adminMain/screens/component/EventGuestListCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EventGuestListCard = ({ eventData }) => {
  return (
    <View style={styles.container}>
      {eventData.map((event, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{event.eventName}</Text>
          <Text style={styles.subtitle}>Total Guests: {event.totalGuests}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
});

export default EventGuestListCard;
