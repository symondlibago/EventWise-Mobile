// src/screens/ServiceCardDetailsScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceCardDetails = ({ route, navigation }) => {
  const { service } = route.params; // Retrieve the service data passed through navigation

  return (
    <ScrollView style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
    </TouchableOpacity>
      <View style={styles.card}>
        {/* Displaying service photo */}
        <Image
          source={{ uri: service.servicePhotoURL }}
          style={styles.servicePhoto}
        />

        <Text style={styles.title}>{service.serviceName}</Text>
        <Text style={styles.category}>Category: {service.serviceCategory}</Text>
        <Text style={styles.price}>Price: ₱{service.basePrice}</Text>
        <Text style={styles.pax}>Max Pax: {service.pax}</Text>
        <Text style={styles.requirements}>
          Requirements: {service.requirements}
        </Text>
        <Text style={styles.status}>
          Availability Status:{" "}
          {service.availability_status === 1 ? "Available" : "Unavailable"}
        </Text>

        <Text style={styles.sectionTitle}>Service Features:</Text>
        <Text style={styles.features}>{service.serviceFeatures}</Text>

        <Text style={styles.sectionTitle}>Created At:</Text>
        <Text style={styles.createdAt}>
          {new Date(service.created_at).toLocaleString()}
        </Text>

        <Text style={styles.sectionTitle}>Last Updated:</Text>
        <Text style={styles.updatedAt}>
          {new Date(service.updated_at).toLocaleString()}
        </Text>

        {/* Edit Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditService", { service })}
          >
            <Text style={styles.buttonText}>Edit Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 100,
  },
  servicePhoto: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 10,
  },
  pax: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  requirements: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  features: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  createdAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  updatedAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#eeba2b",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceCardDetails;
