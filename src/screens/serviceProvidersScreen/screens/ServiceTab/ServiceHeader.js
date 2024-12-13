import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { create } from "zustand";
const ServiceHeader = ({ services }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Services ({services.length})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceHeader;
