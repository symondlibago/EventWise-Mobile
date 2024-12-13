import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import { useState } from "react";

const EventBookings = () => {
  return (
    <SafeAreaView style={[styles.container, { display: "flex", flex: 1 }]}>
      <Text style={styles.header}>Event Requests</Text>
    </SafeAreaView>
  );
};

export default EventBookings;
const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    color: "gray",
  },
  eventLocation: {
    fontSize: 12,
    color: "gray",
  },
  eventPackage: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});
