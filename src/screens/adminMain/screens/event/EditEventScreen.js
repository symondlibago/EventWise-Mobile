import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateEvent } from "../../../../services/organizer/adminEventServices";
import {Ionicons} from '@expo/vector-icons';
import axios from "axios";
const EditEventScreen = ({ route, navigation }) => {
  const { eventData } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  // State for editable fields
  const [name, setName] = useState(eventData?.name || "");
  const [type, setType] = useState(eventData?.type || "");
  const [pax, setPax] = useState(eventData?.pax.toString() || "");
  const [status, setStatus] = useState(eventData?.status || "");
  const [totalPrice, setTotalPrice] = useState(
    eventData?.totalPrice?.toString() || ""
  );
  const [date, setDate] = useState(eventData?.date || "");
  const [time, setTime] = useState(eventData?.time || "");
  const [location, setLocation] = useState(eventData?.location || "");
  const [description, setDescription] = useState(eventData?.description || "");

  const [paymentStatus, setPaymentStatus] = useState(eventData?.payment_status || "");

  // Function to handle event update
  const handleSubmit = async () => {
    if (!status || !paymentStatus) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Payload for event update
      const eventPayload = {
        name,
        type,
        pax: parseInt(pax, 10),
        status,
        totalPrice: parseFloat(totalPrice),
        date,
        time,
        location,
        description,
        payment_status: paymentStatus
      };
  
      // Update event details
      await updateEvent(eventData.id, eventPayload);
  
      Alert.alert("Success", "Event updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update the event.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 100 }}>
   
      <ScrollView
        style={[styles.container, { height: "100%", paddingBottom: 200 }]}
      > 
       <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10}/>
            </TouchableOpacity>
        <Text style={styles.heading}>Edit Event</Text>

        {/* Event Name */}
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter event name"
        />

        {/* Event Type */}
        <Text style={styles.label}>Event Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setType(value)}
          items={[
            { label: "Wedding", value: "Wedding" },
            { label: "Birthday", value: "Birthday" },
            { label: "Conference", value: "Conference" },
          ]}
          value={type}
          placeholder={{ label: "Select Event Type", value: null }}
          style={pickerSelectStyles}
        />

        {/* Pax */}
        <Text style={styles.label}>Number of Guests (PAX)</Text>
        <TextInput
          style={styles.input}
          value={pax}
          onChangeText={setPax}
          keyboardType="numeric"
          placeholder="Enter number of guests"
        />

        {/* Status */}
        <Text style={styles.label}>Event Status</Text>
        <RNPickerSelect
          onValueChange={(value) => setStatus(value)}
          items={[
            { label: "Scheduled", value: "Scheduled" },
            { label: "Tentative", value: "Tentative" },
            { label: "Completed", value: "Completed" },
          ]}
          value={status}
          placeholder={{ label: "Select Status", value: null }}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>Payment Status</Text>
        <RNPickerSelect
          onValueChange={(value) => setPaymentStatus(value)}
          items={[
            { label: "Downpayment", value: "Downpayment" },
            { label: "Paid", value: "Paid" },
          ]}
          value={paymentStatus}
          placeholder={{ label: "Select Payment Status", value: null }}
          style={pickerSelectStyles}
        />


        {/* Total Price */}
        <Text style={styles.label}>Total Price (₱)</Text>
        <TextInput
          style={styles.input}
          value={totalPrice}
          onChangeText={setTotalPrice}
          keyboardType="numeric"
          placeholder="Enter total price"
        />

        {/* Date */}
        <Text style={styles.label}>Event Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Enter event date (YYYY-MM-DD)"
        />

        {/* Time */}
        <Text style={styles.label}>Event Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Enter event time (HH:MM:SS)"
        />

        {/* Location */}
        <Text style={styles.label}>Event Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter event location"
        />

        {/* Description */}
        <Text style={styles.label}>Event Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter event description"
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#ff9900",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default EditEventScreen;
