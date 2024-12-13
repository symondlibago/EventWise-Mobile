import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";

import { BackHandler } from "react-native";
import selectimage from "../../../../../assets/selectimage.png";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";
import {
  fetchMyServices,
  createService,
  updateService,
  deleteService,
} from "../../../../services/serviceProvider/serviceProviderServices";
import { Modal } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import ServiceHeader from "./ServiceHeader";
import { useNavigation } from "@react-navigation/native";
const validationSchema = Yup.object().shape({
  serviceName: Yup.string().required("Service name is required"),
  serviceCategory: Yup.string().required("Service category is required"),
  serviceFeatures: Yup.string().required("Service features are required"),
  basePrice: Yup.number()
    .required("Base price is required")
    .positive("Base price must be positive"),
  pax: Yup.number()
    .required("Pax is required")
    .positive("Pax must be positive"),
  requirements: Yup.string().required("Requirements are required"),
});

const ServiceManager = () => {
  const navigation = useNavigation();
  const [createServiceModalVisible, setCreateServiceModalVisible] =
    useState(false);
  const { services, setServices } = useServiceStore();
  const [refresh, setRefresh] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (createServiceModalVisible) {
          setCreateServiceModalVisible(false);
          return true;
        } else if (modalVisible) {
          setModalVisible(false);
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  }, [createServiceModalVisible, modalVisible]);
  useEffect(() => {
    const fetchMyServicesData = async () => {
      try {
        const data = await fetchMyServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyServicesData();
  }, [refresh, setServices]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Add a dependency array to specify when the effect should run
    if (count < 10) {
      setCount(count + 1);
    }
  }, [count]); // Add count to the dependency array

  const handleCreateService = async (values, resetForm) => {
    console.log("Values in CreateServiceScreen:", values);
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
        console.log("Image uploaded successfully. URL:", servicePhotoURL);
      }

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

      console.log("New service in ServiceManager:", newService);
      const result = await createService(newService);

      Alert.alert("Success", "Service added successfully!");
      console.log("Result from result:", result);
      setRefresh(!refresh); // Refresh the component
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

  const handleSaveService = async (values) => {
    try {
      // console.log("yati!?");
      const response = await updateService(editingService.id, values);
      setRefresh(!refresh); // Refresh the component
      setEditingService(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
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
    <SafeAreaView style={[styles.container, { display: "flex", flex: 1 }]}>
      <Text style={styles.title}>Services </Text>
      <ServiceHeader services={services} />
      <View style={styles.createButtonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateService")}
          loading={isLoading}
          disabled={isLoading} // corrected `disable` to `disabled`
          style={styles.createButton}
        >
          <FontAwesome6 
            name="plus" 
            size={16} 
            color="#fff" 
            style={{ marginRight: 10 }}  // Applying margin to the icon
          />
          <Text style={styles.createButtonText}>Create Services</Text>
        </Button>
      </View>
      <View pointerEvents={createServiceModalVisible ? "none" : "auto"}></View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={createServiceModalVisible}
        onRequestClose={() => setCreateServiceModalVisible(false)}
        contentContainerStyle={[styles.modalContainer, { flex: 1 }]}
      >
        <View
          style={[
            {
              height: "100%",
            },
          ]}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Service</Text>
            <Formik
              initialValues={{
                serviceName: "",
                serviceCategory: "",
                serviceFeatures: "",
                servicePhoto: null,
                location: "",
                basePrice: "",
                pax: "",
                requirements: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleCreateService}
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
                <View style={styles.modalForm}>
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
                      <Text style={styles.errorText}>
                        {errors.servicePhoto}
                      </Text>
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
                      style={{
                        inputAndroid: styles.input,
                        inputIOS: styles.input,
                      }}
                    />
                    {errors.serviceCategory && touched.serviceCategory && (
                      <Text style={styles.errorText}>
                        {errors.serviceCategory}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Inclusions (e.g., feature 1, feature 2..)"
                    value={values.serviceFeatures}
                    onChangeText={handleChange("serviceFeatures")}
                    onBlur={handleBlur("serviceFeatures")}
                    numberOfLines={12}
                  />
                  {errors.serviceFeatures && touched.serviceFeatures && (
                    <Text style={styles.errorText}>
                      {errors.serviceFeatures}
                    </Text>
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
                      onPress={() => navigation.navigate("CreateService")}
                      loading={isLoading}
                      disable={isLoading}
                      style={styles.createButton}
                    >
                      <FontAwesome6 name="plus" size={16} color="#fff" />
                      <Text style={styles.createButtonText}>
                        Create Services
                      </Text>
                    </Button>

                    <Button
                      mode="contained"
                      onPress={() => {
                        setCreateServiceModalVisible(false);
                      }}
                      loading={isLoading}
                      disable={isLoading}
                      style={styles.createButton}
                    >
                      <Text style={styles.createButtonText}>Close</Text>
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Service</Text>
            <Formik
              initialValues={{
                serviceName: editingService ? editingService.serviceName : "",
                serviceCategory: editingService
                  ? editingService.serviceCategory
                  : "",
                serviceFeatures: editingService
                  ? editingService.serviceFeatures
                  : "",
                basePrice: editingService ? editingService.basePrice : "",
                pax: editingService ? editingService.pax : "",
                requirements: editingService ? editingService.requirements : "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                handleSaveService(values);
                actions.resetForm();
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.modalForm}>
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
                  <TextInput
                    style={styles.input}
                    placeholder="Service Category"
                    value={values.serviceCategory}
                    onChangeText={handleChange("serviceCategory")}
                    onBlur={handleBlur("serviceCategory")}
                  />
                  {errors.serviceCategory && touched.serviceCategory && (
                    <Text style={styles.errorText}>
                      {errors.serviceCategory}
                    </Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Inclusions (e.g., feature 1, feature 2..)"
                    value={values.serviceFeatures}
                    onChangeText={handleChange("serviceFeatures")}
                    onBlur={handleBlur("serviceFeatures")}
                  />
                  {errors.serviceFeatures && touched.serviceFeatures && (
                    <Text style={styles.errorText}>
                      {errors.serviceFeatures}
                    </Text>
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
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => handleSaveService(values)}
                  >
                    <Text style={styles.createButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  createButtonContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  createButton: {
    backgroundColor: "#EEBA2B",
    padding: 1,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  serviceItemContainer: {
    alignItems: "center",
    height: 300,
    marginRight: 20,
  },
  serviceCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 250,
    gap: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceCategory: {
    fontSize: 16,
    color: "gray",
  },
  servicePrice: {
    fontSize: 16,
    color: "green",
  },
  servicePax: {
    fontSize: 16,
    color: "blue",
  },
  serviceDuration: {
    fontSize: 16,
    color: "purple",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalForm: {
    width: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "black",
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 20,
  },
  servicePhotoContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  servicePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ServiceManager;
