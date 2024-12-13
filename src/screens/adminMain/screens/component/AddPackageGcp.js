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
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import useStore from "../../../../stateManagement/useStore";
import RNPickerSelect from "react-native-picker-select";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { fetchServices } from "../../../../services/serviceProvider/serviceProviderServices";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";
// Yup Validation Schema
const AddPackageSchema = Yup.object().shape({
  packageName: Yup.string().required("Package Name is required"),
  eventType: Yup.string().required("Event Type is required"),
  coverPhoto: Yup.mixed().required("Cover Photo is required"),
  totalPrice: Yup.number().required("Total price is required").min(1),
});

const AddPackageG = ({ onClose }) => {
  const { servicesList } = useStore();
  const [refresh, setRefresh] = useState(false);
  const { services, setServices } = useServiceStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // console.log("Local storage>>>>>:", servicesList);
  // console.log("fetch services info", services);

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
  // handle default category selection
  useEffect(() => {
    if (!selectedCategory) {
      const firstCategory = Object.keys(
        servicesList.reduce((acc, service) => {
          if (!acc[service.serviceCategory]) {
            acc[service.serviceCategory] = [];
          }
          acc[service.serviceCategory].push(service);
          return acc;
        }, {})
      )[0];

      setSelectedCategory(firstCategory);
    }
  }, [selectedCategory, servicesList]);
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

        setFieldValue("coverPhoto", uri);
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

  const handleAddPackage = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      let coverPhotoUrl = null;

      if (values.coverPhoto) {
        const fileName = `cover_photo_${Date.now()}.jpg`;
        console.log("Uploading image to Supabase:", fileName);

        coverPhotoUrl = await testUploadImageToSupabase(
          values.coverPhoto,
          fileName
        );
        console.log(
          "AddpackageImage uploaded successfully. URL:",
          coverPhotoUrl
        );
      }

      const newPackage = {
        packageName: values.packageName,
        eventType: values.eventType,
        services: values.selectedServices,
        totalPrice: values.totalPrice,
        coverPhotoUrl,
        packageCreatedDate: new Date().toISOString().split("T")[0],
      };

      console.log("new package in ADdpackageGcp:", newPackage);

      const result = await submitPackage(newPackage);

      // console.log("Package result:", result);
      Alert.alert("Success", "Package added successfully!");
      resetForm();
      onClose();
      const { fetchEventPackages } = useStore.getState();
      await fetchEventPackages();
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
        selectedServices: [],
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
            {currentSlide === 0 && (
              <>
                <Text style={styles.modalHeader}>Add Event Package</Text>

                <TextInput
                  placeholder="Enter Package Name"
                  value={values.packageName}
                  onChangeText={handleChange("packageName")}
                  style={styles.inputStyle}
                />
                {touched.packageName && errors.packageName && (
                  <Text style={styles.errorText}>{errors.packageName}</Text>
                )}

                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("eventType", value)}
                  placeholder={{ label: "Select Event Type", value: null }}
                  items={[
                    { label: "Birthday", value: "Birthday" },
                    { label: "Wedding", value: "Wedding" },
                    { label: "Conference", value: "Conference" },
                    { label: "Festivals", value: "Festivals" },
                    { label: "Community events", value: "Community events" },
                    { label: "Company parties", value: "Company parties" },
                  ]}
                  style={styles.picker}
                  value={values.eventType}
                />
                {touched.eventType && errors.eventType && (
                  <Text style={styles.errorText}>{errors.eventType}</Text>
                )}

                <TouchableOpacity
                  onPress={() => handleCoverPhotoSelection(setFieldValue)}
                  style={styles.coverPhotoContainer}
                >
                  <Image
                    source={
                      values.coverPhoto
                        ? { uri: values.coverPhoto }
                        : selectimage
                    }
                    style={styles.coverPhoto}
                  />
                  <Text style={styles.addPhotoText}>Add Cover Photo</Text>
                </TouchableOpacity>
                {touched.coverPhoto && errors.coverPhoto && (
                  <Text style={styles.errorText}>{errors.coverPhoto}</Text>
                )}

                <Button
                  title="Next"
                  onPress={() => {
                    if (
                      !values.packageName ||
                      !values.eventType ||
                      !values.coverPhoto
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
              </>
            )}

            {currentSlide === 1 && (
              <>
                <Text style={styles.serviceHeader}>Select Services:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScrollView}
                >
                  {Object.keys(
                    servicesList.reduce((acc, service) => {
                      if (!acc[service.serviceCategory]) {
                        acc[service.serviceCategory] = [];
                      }
                      acc[service.serviceCategory].push(service);
                      return acc;
                    }, {})
                  ).map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      style={
                        selectedCategory === category
                          ? styles.selectedCategoryButton
                          : styles.categoryButton
                      }
                    >
                      <Text style={styles.categoryButtonText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <SafeAreaView style={styles.serviceContainer}>
                  <ScrollView
                    style={[styles.scrollViewContent, { height: 500 }]}
                    showsVerticalScrollIndicator={false}
                  >
                    {selectedCategory &&
                      servicesList
                        .filter(
                          (service) =>
                            service.serviceCategory === selectedCategory
                        )
                        .map((service) => (
                          <TouchableOpacity
                            key={service.serviceId}
                            onPress={() => {
                              const updatedServices =
                                values.selectedServices.includes(
                                  service.serviceName
                                )
                                  ? values.selectedServices.filter(
                                      (s) => s !== service.serviceName
                                    )
                                  : [
                                      ...values.selectedServices,
                                      service.serviceName,
                                    ];

                              setFieldValue(
                                "selectedServices",
                                updatedServices
                              );
                              setFieldValue(
                                "totalPrice",
                                calculateTotalPrice(updatedServices)
                              );
                            }}
                            style={[styles.serviceItem, { display: "flex" }]}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",

                                borderRadius: 5,
                              }}
                            >
                              <Ionicons
                                name={
                                  values.selectedServices.includes(
                                    service.serviceName
                                  )
                                    ? "checkmark-circle"
                                    : "checkmark-circle-outline"
                                }
                                size={24}
                                color="#1E90FF"
                                style={{}}
                              />
                              <Text
                                style={{
                                  width: "90%",
                                  fontSize: 14,
                                  color: "#000",
                                }}
                              >
                                {` ${service.serviceName}`} ({service.basePrice}
                                )
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                  </ScrollView>
                </SafeAreaView>
                <TextInput
                  placeholder="Total Price"
                  value={String(values.totalPrice)}
                  style={styles.inputStyle}
                  editable={false}
                />
                {touched.totalPrice && errors.totalPrice && (
                  <Text style={styles.errorText}>{errors.totalPrice}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <Button title="Add Package" onPress={handleSubmit} />
                  <Button
                    title="Back"
                    onPress={() => setCurrentSlide(0)}
                    color="#FFA500"
                  />
                  <Button title="Close" onPress={onClose} color="#FF3B30" />
                </View>

                {isLoading && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </>
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
  serviceContainer: {
    height: 300,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  serviceHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryScrollView: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F7F7F7", // use a light gray background
    borderRadius: 5,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#F0F0F0", // use a light gray background
    marginRight: 10,
  },
  selectedCategoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#1E90FF",
    marginRight: 10,
  },
  categoryButtonText: {
    color: "#000",
  },
  serviceItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default AddPackageG;
