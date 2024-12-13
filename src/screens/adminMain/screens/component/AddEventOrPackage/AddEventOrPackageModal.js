// AddEventOrPackageModal.js

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStore from "../../../../../stateManagement/useStore";
import event2 from "../../../../../../assets/event2.png"; // Ensure correct path
import selectimage from "../../../../../../assets/selectimage.png";

const AddEventOrPackageModal = ({ visible, onClose, type }) => {
  const { addEvent, addEventPackage } = useStore();

  // Separate state variables for clarity
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  // this is actual implementation
  // const handleAdd = () => {
  //   // Basic validation
  //   if (!title || !date || !location) {
  //     Alert.alert("Error", "Please fill in all required fields.");
  //     return;
  //   }

  //   const newItem = {
  //     title,
  //     date,
  //     time,
  //     location,
  //     description,
  //     coverPhoto, // Include coverPhoto
  //   };

  //   if (type === "event") {
  //     addEvent(newItem);
  //   } else {
  //     addEventPackage({ ...newItem, packageType: "General" }); // Adjust as needed
  //   }

  //   // Reset fields after adding
  //   setTitle("");
  //   setDate("");
  //   setTime("");
  //   setLocation("");
  //   setPrice("");
  //   setDescription("");
  //   setCoverPhoto(null);
  //   onClose();
  // };
  const handleAdd = () => {
    // Basic validation
    if (!title || !date || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newItem = {
      title,
      date,
      time,
      location,
      description,
      coverPhoto,
      ...(type === "package" && { price }),
    };
    // for future use
    // if (type === "event") {
    //   addEvent(newItem);
    // } else {
    //   addEventPackage({ ...newItem, packageType: "General" });
    // }

    // Reset fields after adding
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setPrice("");
    setDescription("");
    setCoverPhoto(null);
    onClose();
  };
  const handleCoverPhotoSelection = async () => {
    try {
      // Request permission to access the gallery
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        console.log("Selected image URI:", selectedUri); // Debugging
        setCoverPhoto(selectedUri); // Update state with selected image URI
      } else {
        console.log("Image selection was canceled."); // Debugging
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {type === "event" ? "Add Event" : "Add Event Package"}
          </Text>

          {/* Cover Photo Section */}
          <TouchableOpacity
            onPress={handleCoverPhotoSelection}
            style={styles.coverPhotoContainer}
          >
            <Image
              source={
                coverPhoto
                  ? { uri: coverPhoto } // Display selected image
                  : selectimage // Default image
              }
              style={styles.coverPhoto}
            />
            <Text style={styles.addPhotoText}>Add Cover Photo</Text>
          </TouchableOpacity>

          {/* Event Details Inputs */}
          <TextInput
            placeholder={type === "event" ? "Event Name" : "Package Name"}
            value={title}
            onChangeText={setTitle}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder="Date (e.g., June 12, 2024)"
            value={date}
            onChangeText={setDate}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder="Time (e.g., 10:00 AM)"
            value={time}
            onChangeText={setTime}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder="Location"
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

          {/* Additional Inputs for Package Type */}
          {type === "package" && (
            <>
              <TextInput
                placeholder="Price (e.g., $1000)"
                value={price}
                onChangeText={setPrice}
                style={styles.inputStyle}
              />
              <TextInput
                placeholder="Package Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.inputStyle, { height: 80 }]}
                multiline
              />
            </>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={handleAdd} />
            <Button title="Close" onPress={onClose} color="#FF3B30" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEventOrPackageModal;

// Define local styles to avoid conflicts with imported styles
const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  coverPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverPhoto: {
    width: 250,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    backgroundColor: "#e1e4e8",
  },
  addPhotoText: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "bold",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

// Merge with imported styles if needed
const styles = StyleSheet.create({
  ...localStyles,
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  coverPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverPhoto: {
    width: 250,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    backgroundColor: "#e1e4e8",
  },
  addPhotoText: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "bold",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
