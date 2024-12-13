import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import MyButton from "../component/myButton";
import styles from "../../styles/styles";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { Picker } from "@react-native-picker/picker";
import MyModal from "../component/MyModal";
import MyButtonComponent from "../component/MyButtonComponent";

const AddAccountScreenAdmin = () => {
  // States for form fields
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

  const handleCoverPhotoSelection = async () => {
    // Request permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected image URI:", result.assets[0].uri); // Log selected URI
      setCoverPhoto(result.assets[0].uri); // Set the selected image URI
    } else {
      console.log("Image selection was canceled."); // Log if canceled
    }
  };

  const handleSave = async () => {
    try {
      // Validate form data (add validation logic as needed)
      if (!serviceName || !serviceType || !eventDescription) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      // Save form data (e.g., to a database or local storage)
      // ...

      // Show success modal
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          // backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      ]}
    >
      <View style={[styles.formContainer, { width: "85%", bottom: 20 }]}>
        <View style={styles.coverPhotoContainer}>
          <TouchableOpacity
            onPress={handleCoverPhotoSelection} // Trigger photo selection
          >
            <Image
              source={
                coverPhoto
                  ? { uri: coverPhoto } // Show selected image
                  : require("../../../../../assets/event2.png") // Default image
              }
              style={[
                {
                  width: "100%", // or a specific value
                  height: 200, // or a specific value
                  borderRadius: 10,
                },
              ]}
            />
            <Text style={styles.addPhotoText}>Add Cover Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Service Name"
            value={serviceName}
            onChangeText={setServiceName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type of Service</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Service Type"
            value={serviceType}
            onChangeText={setServiceType}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price Range</Text>
          <TextInput
            style={styles.textInput}
            value={priceRange}
            onChangeText={setPriceRange}
            placeholder="Select Price Range  25k-30k"
          />
        </View>
        {/* <View style={styles.inputGroup}>
          <Text style={styles.label}>Price Range</Text>
          <Picker
            selectedValue={priceRange}
            onValueChange={(itemValue) => setPriceRange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Price Range" value="" />
            <Picker.Item label="25k-30k" value="25k-30k" />
            <Picker.Item label="30k-35k" value="30k-35k" />
            <Picker.Item label="35k-40k" value="35k-40k" /> 
          </Picker>
        </View> */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Description</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            placeholder="Type event description..."
            value={eventDescription}
            onChangeText={setEventDescription}
          />
        </View>
        <View style={[styles.buttonContainer, { marginTop: -20 }]}>
          <MyButtonComponent
            title="Submit"
            icon="content-save"
            onPress={handleSave}
            backgroundColor="green"
            textColor="white"
            borderRadius={10}
            iconColor="white"
            fontSize={16}
          />
        </View>
      </View>

      <MyModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Success"
        message="You have Successfully Created an Account!"
        iconName="check-circle"
        iconSize={120}
        iconColor="blue"
        buttonLabel="OK"
        buttonStyle={{ backgroundColor: "green" }}
        textStyle={{ color: "white" }}
      />
    </SafeAreaView>
  );
};

export default AddAccountScreenAdmin;
