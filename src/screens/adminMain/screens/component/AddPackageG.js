// src/components/AddPackageG.js
import selectimage from "../../../../../assets/selectimage.png";
import React, { useState } from "react";
import { submitPackage } from "../../../../services/organizer/organizerServices";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import styles from "./styles"; // Ensure this path is correct
import useStore from "../../../../stateManagement/useStore";
import RNPickerSelect from "react-native-picker-select"; // Dropdown for eventType

// Yup Validation Schema
const AddPackageSchema = Yup.object().shape({
  packageName: Yup.string().required("Package Name is required"),
  eventType: Yup.string().required("Event Type is required"),
  coverPhoto: Yup.mixed().nullable(), // Changed to mixed for file
  totalPrice: Yup.number().required("Total price is required").min(1),
});

const AddPackageG = ({ onClose }) => {
  const { servicesList } = useStore(); // Assuming servicesList is available in store
  const [isLoading, setIsLoading] = useState(false);

  // Handle Cover Photo Selection with Image Compression
  const handleCoverPhotoSelection = async (setFieldValue) => {
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
        aspect: [4, 3],
        quality: 0.7, // Compress the image
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;

        // Optionally, manipulate the image
        const manipulatedResult = await ImageManipulator.manipulateAsync(
          selectedUri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        let uri = manipulatedResult.uri;
        if (Platform.OS === "android" && !uri.startsWith("file://")) {
          uri = `file://${uri}`;
        }

        setFieldValue("coverPhoto", uri); // Set manipulated image URI
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  // Handle Form Submission
  const handleAddPackage = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      // Build package object
      const newPackage = {
        packageName: values.packageName,
        eventType: values.eventType,
        services: values.selectedServices,
        totalPrice: values.totalPrice,
        coverPhoto: values.coverPhoto,
        packageCreatedDate: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
      };

      // Call the service function to submit the package
      const result = await submitPackage(newPackage);

      console.log("result", result);
      // Show success and reset form
      Alert.alert("Success", "Package added successfully!");
      resetForm(); // Reset form after successful creation
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding package:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while adding the package. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total price based on selected services
  const calculateTotalPrice = (selectedServices) => {
    const total = selectedServices.reduce((acc, serviceName) => {
      const service = servicesList.find(
        (service) => service.serviceName === serviceName
      );
      return acc + (service ? service.basePrice : 0);
    }, 0);
    return total;
  };

  return (
    <Formik
      initialValues={{
        packageName: "",
        eventType: "",
        selectedServices: [], // Initialize as an empty array
        totalPrice: 0,
        coverPhoto: null,
      }}
      validationSchema={AddPackageSchema}
      onSubmit={handleAddPackage}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
      }) => (
        <ScrollView contentContainerStyle={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add Event Package</Text>

            {/* Package Name */}
            <TextInput
              placeholder="Enter Package Name"
              value={values.packageName}
              onChangeText={handleChange("packageName")}
              style={styles.inputStyle}
            />
            {touched.packageName && errors.packageName && (
              <Text style={styles.errorText}>{errors.packageName}</Text>
            )}

            {/* Event Type Dropdown */}
            <RNPickerSelect
              onValueChange={(value) => setFieldValue("eventType", value)}
              placeholder={{ label: "Select Event Type", value: null }}
              items={[
                { label: "Birthday", value: "Birthday" },
                { label: "Wedding", value: "Wedding" },
                { label: "Conference", value: "Conference" },
              ]}
              style={styles.picker}
              value={values.eventType}
            />
            {touched.eventType && errors.eventType && (
              <Text style={styles.errorText}>{errors.eventType}</Text>
            )}

            {/* Cover Photo Selection */}
            <TouchableOpacity
              onPress={() => handleCoverPhotoSelection(setFieldValue)}
              style={styles.coverPhotoContainer}
            >
              <Image
                source={
                  values.coverPhoto ? { uri: values.coverPhoto } : selectimage // Corrected usage
                }
                style={styles.coverPhoto}
              />
              <Text style={styles.addPhotoText}>Add Cover Photo</Text>
            </TouchableOpacity>
            {touched.coverPhoto && errors.coverPhoto && (
              <Text style={styles.errorText}>{errors.coverPhoto}</Text>
            )}

            {/* Services Selection */}
            <Text style={styles.serviceHeader}>Select Services:</Text>
            {servicesList.map((service) => (
              <TouchableOpacity
                key={service.serviceId}
                onPress={() => {
                  const updatedServices = values.selectedServices.includes(
                    service.serviceName
                  )
                    ? values.selectedServices.filter(
                        (s) => s !== service.serviceName
                      )
                    : [...values.selectedServices, service.serviceName];

                  setFieldValue("selectedServices", updatedServices);
                  setFieldValue(
                    "totalPrice",
                    calculateTotalPrice(updatedServices)
                  );
                }}
                style={styles.serviceItem}
              >
                <Text>
                  {values.selectedServices.includes(service.serviceName)
                    ? `✓ ${service.serviceName}`
                    : service.serviceName}{" "}
                  (${service.basePrice})
                </Text>
              </TouchableOpacity>
            ))}

            {/* Total Price */}
            <TextInput
              placeholder="Total Price"
              value={String(values.totalPrice)}
              style={styles.inputStyle}
              editable={false} // Disable manual editing
            />
            {touched.totalPrice && errors.totalPrice && (
              <Text style={styles.errorText}>{errors.totalPrice}</Text>
            )}

            {/* Submit and Close Buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Add Package" onPress={handleSubmit} />
              <Button title="Close" onPress={onClose} color="#FF3B30" />
            </View>

            {/* Loading Indicator */}
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default AddPackageG;
