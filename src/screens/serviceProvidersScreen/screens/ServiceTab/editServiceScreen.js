// src/screens/EditServiceScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { updateService } from "../../../../services/serviceProvider/serviceProviderServices"; // import your updateService function
import { Ionicons } from "@expo/vector-icons";

const EditServiceScreen = ({ route, navigation }) => {
  const { service } = route.params; // Retrieve the service data passed through navigation

  // Set initial state from the passed service data
  const [serviceName, setServiceName] = useState(service.serviceName);
  const [serviceCategory, setServiceCategory] = useState(
    service.serviceCategory
  );
  const [basePrice, setBasePrice] = useState(service.basePrice.toString()); // Ensure price is a string for TextInput
  const [serviceFeatures, setServiceFeatures] = useState(
    service.serviceFeatures
  );

  // Handle the update logic
  const handleUpdateService = async () => {
    try {
      // Create the updated service data
      const updatedData = {
        serviceName,
        serviceCategory,
        basePrice: parseFloat(basePrice), // Ensure price is a number
        serviceFeatures,
      };
      await updateService(service.id, updatedData); // Update the service
      Alert.alert("Success", "Service updated successfully!");
      navigation.goBack(); // Navigate back after updating
    } catch (error) {
      console.error("Failed to update service", error);
      Alert.alert("Error", "Failed to update service");
    }
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
    </TouchableOpacity>
      <Text style={styles.header}>Edit Service</Text>

      <TextInput
        style={styles.input}
        value={serviceName}
        onChangeText={setServiceName}
        placeholder="Service Name"
      />
      <TextInput
        style={styles.input}
        value={serviceCategory}
        onChangeText={setServiceCategory}
        placeholder="Category"
      />
      <TextInput
        style={styles.input}
        value={basePrice}
        onChangeText={setBasePrice}
        placeholder="Base Price"
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.featuresInput]}
        value={serviceFeatures}
        onChangeText={setServiceFeatures}
        placeholder="Features"
        multiline
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateService}
      >
        <Text style={styles.buttonText}>Update Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  featuresInput: {
    height: 100, // To allow multiline input
    textAlignVertical: "top", // Align text to the top for multiline
  },
  updateButton: {
    backgroundColor: "#eeba2b",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditServiceScreen;
