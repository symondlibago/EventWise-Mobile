// CreateServiceScreen.js
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Image } from "react-native";
import selectimage from "../../../../../assets/selectimage.png";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";

import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { createService } from "../../../../services/serviceProvider/serviceProviderServices";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import {Ionicons} from '@expo/vector-icons';
const CreateServiceScreen = ({ navigation }) => {
  const [serviceCategoryOther, setServiceCategoryOther] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service name is required"),
    serviceCategory: Yup.string().required("Service category is required"),
    serviceFeatures: Yup.string().required("Service features are required"),
    basePrice: Yup.number().required("Base price is required"),
    pax: Yup.number().required("Pax is required"),
    requirements: Yup.string().required("Requirements are required"),
  });

  const handleCreateService = async (values, resetForm) => {
    // console.log("Values in CreateServiceScreen:", values);
    setIsLoading(true);
    try {
      let servicePhotoURL = null;

      if (values.servicePhoto) {
        const fileName = `service_photo_${Date.now()}.jpg`;
        console.log("Uploading image to Supabase:", fileName);

        servicePhotoURL = await testUploadImageToSupabase(
          values.servicePhoto,
          fileName
        );
      }
      // Use the derived category if "Other" is selected
      const serviceCategory =
        values.serviceCategory === "Other"
          ? `Other - ${serviceCategoryOther}`
          : values.serviceCategory;
      const newService = {
        serviceName: values.serviceName,
        serviceCategory: values.serviceCategory,
        serviceFeatures: values.serviceFeatures,
        basePrice: values.basePrice,
        location: values.location,
        pax: values.pax,
        requirements: values.requirements,
        servicePhotoURL: servicePhotoURL || null,
        serviceCreatedDate: new Date().toISOString().split("T")[0],
      };

      // console.log("New service in ServiceManager:", newService);
      const result = await createService(newService);

      Alert.alert("Success", "Service added successfully!");
      navigation.goBack();
      console.log("Result from result:", result);
      setRefresh(!refresh); // Refresh the component

      // Call the resetForm function to reset the form
      resetForm();
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
  const handleImagePicker = async (setFieldValue) => {
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
  return (
    <ScrollView style={{ paddingBottom: 100, marginBottom: 20 }}>
    <View style={styles.container}>
      <ScrollView style={[{ width: "100%" }]}>
        <Formik
          initialValues={{
            serviceName: "",
            serviceCategory: "",
            serviceFeatures: "",
            basePrice: "",
            location: "",
            servicePhoto: null,
            pax: "",
            requirements: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateService(values, resetForm);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20, top: 20 }}>
                <Ionicons name="arrow-back" size={25} color="#eeba2b" />
              </TouchableOpacity>
              <Text style={styles.title}>Create Service</Text>
              <View style={styles.servicePhotoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      handleImagePicker(setFieldValue);
                      console.log("Image URI:", imageUri);
                    } catch (error) {}
                  }}
                >
                  <Image
                    source={
                      values.servicePhoto
                        ? { uri: values.servicePhoto }
                        : selectimage
                    }
                    style={styles.servicePhoto}
                  />
                </TouchableOpacity>
                {touched.servicePhoto && errors.servicePhoto && (
                  <Text style={styles.errorText}>{errors.servicePhoto}</Text>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Service Name"
                value={values.serviceName}
                onChangeText={handleChange("serviceName")}
                onBlur={handleBlur("serviceName")}
              />
              {errors.serviceName && touched.serviceName && (
                <Text style={styles.errorText}>{errors.serviceName}</Text>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Service Category</Text>
                <RNPickerSelect
                  onValueChange={(value) =>
                    setFieldValue("serviceCategory", value)
                  }
                  items={[
                    {
                      label: "Food Catering",
                      value: "Food Catering",
                    },
                    { label: "Accommodation", value: "Accommodation" },
                    { label: "Transportation", value: "Transportation" },
                    { label: "Photography", value: "Photography" },
                    { label: "Videography", value: "Videography" },
                    { label: "Host", value: "Host" },
                    { label: "Videography", value: "Videography" },
                    { label: "Decoration", value: "Decoration" },
                    { label: "Entertainment", value: "Entertainment" },
                    { label: "Sound", value: "Sound" },
                    { label: "Lighting", value: "Lighting" },
                    { label: "Decoration", value: "Decoration" },
                    { label: "Catering", value: "Catering" },
                    {
                      label: "Venue Management",
                      value: "Venue Management",
                    },
                    { label: "Marketing", value: "Marketing" },

                    { label: "Other", value: "Other" },
                  ]}
                  placeholder={{ label: "Select a category", value: null }}
                />
                {errors.serviceCategory && touched.serviceCategory && (
                  <Text style={styles.errorText}>{errors.serviceCategory}</Text>
                )}
                {values.serviceCategory === "Other" && (
                  <TextInput
                    style={styles.input}
                    placeholder="Specify other category"
                    value={serviceCategoryOther}
                    onChangeText={(text) => setServiceCategoryOther(text)}
                  />
                )}
                {values.serviceCategory === "Venue" ||
                  (values.serviceCategory === "Venue Management" && (
                    <TextInput
                      style={styles.input}
                      placeholder="Location"
                      value={values.location}
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                    />
                  ))}
                {errors.location && touched.location && (
                  <Text style={styles.errorText}>{errors.location}</Text>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Service Features"
                value={values.serviceFeatures}
                onChangeText={handleChange("serviceFeatures")}
                onBlur={handleBlur("serviceFeatures")}
                multiline
                numberOfLines={4}
              />
              {errors.serviceFeatures && touched.serviceFeatures && (
                <Text style={styles.errorText}>{errors.serviceFeatures}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Base Price"
                value={values.basePrice}
                onChangeText={handleChange("basePrice")}
                onBlur={handleBlur("basePrice")}
                keyboardType="numeric"
              />
              {errors.basePrice && touched.basePrice && (
                <Text style={styles.errorText}>{errors.basePrice}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Pax"
                value={values.pax}
                onChangeText={handleChange("pax")}
                onBlur={handleBlur("pax")}
                keyboardType="numeric"
              />
              {errors.pax && touched.pax && (
                <Text style={styles.errorText}>{errors.pax}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Requirements"
                value={values.requirements}
                onChangeText={handleChange("requirements")}
                onBlur={handleBlur("requirements")}
              />
              {errors.requirements && touched.requirements && (
                <Text style={styles.errorText}>{errors.requirements}</Text>
              )}
              <View style={[styles.createButtonContainer]}>
                <Button
                  mode="contained"
                  onPress={handleSubmit} // Call handleSubmit without passing parameters
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.createButton}
                >
                  <FontAwesome6 name="plus" size={16} color="#fff" />
                  <Text style={styles.createButtonText}>Create Service</Text>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 10,
    flex: 1,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  servicePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  createButton: {
    backgroundColor: "#EEBA2B",
    padding: 1,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: 200,
  },

  
});

export default CreateServiceScreen;
