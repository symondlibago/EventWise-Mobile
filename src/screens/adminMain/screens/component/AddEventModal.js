// AddEventModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import useStore from "../../../../stateManagement/useStore";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

import selectimage from "../../../../../assets/selectimage.png";

const AddEventModal = ({ visible, onClose }) => {
  const { addEventPackage, servicesList, eventPackages } = useStore();

  // State variables for multi-step form
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Details
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // Step 2: Package Selection
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customizedPackage, setCustomizedPackage] = useState({});
  const [customPackagePrice, setCustomPackagePrice] = useState(0);

  // Step 3: Guests
  const [guestList, setGuestList] = useState([]);
  const [guestName, setGuestName] = useState("");

  // Handle date picker change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  // Handle package customization
  const handleServiceToggle = (category, serviceName, servicePrice) => {
    setCustomizedPackage((prevCustomizedPackage) => {
      const categoryServices = prevCustomizedPackage[category] || [];
      let updatedCategoryServices;

      if (categoryServices.includes(serviceName)) {
        updatedCategoryServices = categoryServices.filter(
          (name) => name !== serviceName
        );
        setCustomPackagePrice((prevTotal) => prevTotal - servicePrice);
      } else {
        updatedCategoryServices = [...categoryServices, serviceName];
        setCustomPackagePrice((prevTotal) => prevTotal + servicePrice);
      }

      return {
        ...prevCustomizedPackage,
        [category]: updatedCategoryServices,
      };
    });
  };

  // Handle adding guests
  const addGuest = () => {
    if (guestName.trim() !== "") {
      setGuestList((prevGuestList) => [...prevGuestList, guestName.trim()]);
      setGuestName("");
    }
  };

  // Handle selecting an image
  const handleImageSelection = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setImageUri(selectedUri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "An error occurred while selecting the image.");
    }
  };

  // Handle submitting the event
  const handleBookEvent = async () => {
    try {
      if (!eventName || !eventType || !location || !description) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      const eventData = {
        eventName,
        eventType,
        eventDate: eventDate.toISOString().split("T")[0],
        location,
        description,
        imageUri,
        selectedPackage: selectedPackage || customizedPackage,
        guestList,
      };

      // Add the event to the store or backend
      console.log("Booking event:", eventData);
      Alert.alert("Success", "Event booked successfully!");
      resetFields();
      onClose();
    } catch (error) {
      console.error("Error booking event:", error);
      Alert.alert(
        "Error",
        "An error occurred while booking the event. Please try again."
      );
    }
  };

  // Reset all form fields
  const resetFields = () => {
    setCurrentStep(1);
    setEventName("");
    setEventType("");
    setEventDate(new Date());
    setLocation("");
    setDescription("");
    setImageUri(null);
    setSelectedPackage(null);
    setCustomizedPackage({});
    setCustomPackagePrice(0);
    setGuestList([]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <ScrollView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add Event</Text>

          {/* Step Indicator */}
          <Text style={styles.stepIndicator}>Step {currentStep} of 5</Text>

          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <>
              <TextInput
                placeholder="Enter Event Name"
                value={eventName}
                onChangeText={setEventName}
                style={styles.inputStyle}
              />

              <RNPickerSelect
                onValueChange={(value) => setEventType(value)}
                placeholder={{ label: "Select Event Type", value: null }}
                items={[
                  { label: "Birthday", value: "Birthday" },
                  { label: "Wedding", value: "Wedding" },
                  { label: "Conference", value: "Conference" },
                ]}
                style={styles.picker}
                value={eventType}
                useNativeAndroidPickerStyle={false}
              />

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.datePickerText}>
                  {eventDate
                    ? eventDate.toLocaleDateString()
                    : "Select Event Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={eventDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              <TextInput
                placeholder="Enter Event Venue"
                value={location}
                onChangeText={setLocation}
                style={styles.inputStyle}
              />

              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.inputStyle, { height: 80 }]}
                multiline
              />

              {/* Image Picker */}
              <TouchableOpacity
                onPress={handleImageSelection}
                style={styles.coverPhotoContainer}
              >
                <Image
                  source={imageUri ? { uri: imageUri } : selectimage}
                  style={styles.coverPhoto}
                />
                <Text style={styles.addPhotoText}>Add Cover Photo</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <Button title="Next" onPress={() => setCurrentStep(2)} />
                <Button title="Close" onPress={onClose} color="#FF3B30" />
              </View>
            </>
          )}

          {/* Step 2: Package Selection */}
          {/* Remaining steps continue as before... */}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  stepIndicator: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  inputStyle: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  datePicker: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  coverPhotoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  coverPhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  addPhotoText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddEventModal;
