// src/components/AddService.js
import selectimage from "../../../../../assets/selectimage.png";
import React, { useState } from "react";
import { submitService } from "../../../../services/serviceProvider/serviceProviderServices";
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
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import useStore from "../../../../stateManagement/useStore";
import RNPickerSelect from "react-native-picker-select";
// import { testUploadImageToSupabase } from "../../../../services/serviceProvider/testUploadSupabaseService/testUploadSupabaseService";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { fetchServices } from "../../../../services/serviceProvider/serviceProviderServices";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";

const validationSchema = Yup.object().shape({
  serviceName: Yup.string().required("Service name is required"),
  serviceCategory: Yup.string().required("Service category is required"),
  serviceFeatures: Yup.string().required("Service features are required"),
  servicePhoto: Yup.mixed().required("Cover Photo is required"),
  basePrice: Yup.number()
    .required("Base price is required")
    .positive("Base price must be positive"),
  pax: Yup.number()
    .required("Pax is required")
    .positive("Pax must be positive"),
  requirements: Yup.string().required("Requirements are required"),
});

const AddService = ({ onClose }) => {
  const { servicesList } = useStore();
  const [refresh, setRefresh] = useState(false);
  const { services, setServices } = useServiceStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServicesData();
  }, [refresh, setServices]);

  const pickImage = async () => {
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
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;

        const manipulatedResult = await ImageManipulator.manipulateAsync(
          selectedUri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        let uri = manipulatedResult.uri;
        if (Platform.OS === "android" && !uri.startsWith("file://")) {
          uri = `file://${uri}`;
        }

        setFieldValue("servicePhoto", uri);
        setImageUri(uri);
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  const handleAddService = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      let servicePhotoUrl = null;

      if (values.servicePhoto) {
        const fileName = `service_photo_${Date.now()}.jpg`;
        console.log("Uploading image to Supabase:", fileName);

        servicePhotoUrl = await testUploadImageToSupabase(
          values.servicePhoto,
          fileName
        );
        console.log("Image uploaded successfully. URL:", servicePhotoUrl);
      }

      const newService = {
        serviceName: values.serviceName,
        serviceCategory: values.serviceCategory,
        serviceFeatures: values.serviceFeatures,
        servicePhoto: servicePhotoUrl,
        basePrice: values.basePrice,
        pax: values.pax,
        requirements: values.requirements,
        serviceCreatedDate: new Date().toISOString().split("T")[0],
      };

      console.log("new service in AddService:", newService);

      const result = await submitService(newService);

      console.log("Result from submitService:", result);
      Alert.alert("Success", "Service added successfully!");
      resetForm();
      onClose();
      const { fetchServices } = useStore.getState();
      await fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while adding the service. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        serviceName: "",
        serviceCategory: "",
        serviceFeatures: "",
        servicePhoto: null,
        basePrice: 0,
        pax: 0,
        requirements: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleAddService}
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
            {currentSlide === 0 && (
              <View>
                <Text style={styles.modalHeader}>Add Service</Text>
                <TextInput
                  placeholder="Enter Service Name"
                  value={values.serviceName}
                  onChangeText={handleChange("serviceName")}
                  style={styles.inputStyle}
                />
                {touched.serviceName && errors.serviceName && (
                  <Text style={styles.errorText}>{errors.serviceName}</Text>
                )}
                <RNPickerSelect
                  onValueChange={(value) =>
                    setFieldValue("serviceCategory", value)
                  }
                  placeholder={{
                    label: "Select Service Category",
                    value: null,
                  }}
                  items={[
                    { label: "Category 1", value: "Category 1" },
                    { label: "Category 2", value: "Category 2" },
                    { label: "Category 3", value: "Category 3" },
                  ]}
                  style={styles.picker}
                  value={values.serviceCategory}
                />
                {touched.serviceCategory && errors.serviceCategory && (
                  <Text style={styles.errorText}>{errors.serviceCategory}</Text>
                )}
                <TouchableOpacity
                  onPress={() => handleCoverPhotoSelection(setFieldValue)}
                  style={styles.coverPhotoContainer}
                >
                  <Image
                    source={
                      values.servicePhoto
                        ? { uri: values.servicePhoto }
                        : selectimage
                    }
                    style={styles.coverPhoto}
                  />
                  <Text style={styles.addPhotoText}>Add Cover Photo</Text>
                </TouchableOpacity>
                {touched.servicePhoto && errors.servicePhoto && (
                  <Text style={styles.errorText}>{errors.servicePhoto}</Text>
                )}
                <TextInput
                  placeholder="Enter Service Features"
                  value={values.serviceFeatures}
                  onChangeText={handleChange("serviceFeatures")}
                  style={styles.inputStyle}
                />
                {touched.serviceFeatures && errors.serviceFeatures && (
                  <Text style={styles.errorText}>{errors.serviceFeatures}</Text>
                )}
                <TextInput
                  placeholder="Enter Base Price"
                  value={String(values.basePrice)}
                  onChangeText={handleChange("basePrice")}
                  style={styles.inputStyle}
                />
                {touched.basePrice && errors.basePrice && (
                  <Text style={styles.errorText}>{errors.basePrice}</Text>
                )}
                <TextInput
                  placeholder="Enter Pax"
                  value={String(values.pax)}
                  onChangeText={handleChange("pax")}
                  style={styles.inputStyle}
                />
                {touched.pax && errors.pax && (
                  <Text style={styles.errorText}>{errors.pax}</Text>
                )}
                <TextInput
                  placeholder="Enter Requirements"
                  value={values.requirements}
                  onChangeText={handleChange("requirements")}
                  style={styles.inputStyle}
                />
                {touched.requirements && errors.requirements && (
                  <Text style={styles.errorText}>{errors.requirements}</Text>
                )}
                <Button
                  title="Next"
                  onPress={() => {
                    if (
                      !values.serviceName ||
                      !values.serviceCategory ||
                      !values.serviceFeatures ||
                      !values.basePrice ||
                      !values.pax ||
                      !values.requirements
                    ) {
                      Alert.alert(
                        "Incomplete Fields",
                        "Please fill in all the fields before proceeding."
                      );
                    } else {
                      setCurrentSlide(1);
                    }
                  }}
                  color="#1E90FF"
                />
              </View>
            )}

            {currentSlide === 1 && (
              <View>
                <Text style={styles.modalHeader}>Review Service Details</Text>

                <Text style={styles.reviewText}>
                  Service Name: {values.serviceName}
                </Text>
                <Text style={styles.reviewText}>
                  Service Category: {values.serviceCategory}
                </Text>
                <Text style={styles.reviewText}>
                  Service Features: {values.serviceFeatures}
                </Text>
                <Text style={styles.reviewText}>
                  Base Price: {values.basePrice}
                </Text>
                <Text style={styles.reviewText}>Pax: {values.pax}</Text>
                <Text style={styles.reviewText}>
                  Requirements: {values.requirements}
                </Text>

                <Button
                  title="Add Service"
                  onPress={handleSubmit}
                  color="#1E90FF"
                />
                <Button
                  title="Back"
                  onPress={() => setCurrentSlide(0)}
                  color="#FFA500"
                />
                <Button title="Close" onPress={onClose} color="#FF3B30" />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  modalContainer: {
    width: Platform.OS === "android" ? "95%" : "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputStyle: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  picker: {
    inputIOS: {
      color: "black",
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      marginBottom: 10,
    },
    inputAndroid: {
      color: "black",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      marginBottom: 10,
    },
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
  reviewText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
});

export default AddService;
