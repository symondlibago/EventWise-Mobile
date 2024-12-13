import React, { useEffect, useState } from "react";
import selectimage from "../../../../../assets/selectimage.png";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";
import {
  createService,
  updateService,
  deleteService,
  fetchServices,
} from "../../../../services/serviceProvider/serviceProviderServices";
import { Modal } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { uploadImageToSupabase } from "../../../../services/organizer/uploadSupabaseService";
import AddPackageG from "../../../adminMain/screens/component/AddPackageGcp";
import useStore from "../../../../stateManagement/useStore";

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
  const [createServiceModalVisible, setCreateServiceModalVisible] =
    useState(false);
  const { services, newService, updateNewService, setServices } =
    useServiceStore();
  const [refresh, setRefresh] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const { fetchEventPackages } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleAddPackage = async (newPackage) => {
    try {
      await fetchEventPackages(); // Refresh the list after adding a package
    } catch (error) {
      console.error("Error fetching event packages:", error);
    }
  };
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

  const handleCreateService = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      let servicePhotoURL = null;

      if (values.servicePhoto) {
        const fileName = `cover_photo_${Date.now()}.jpg`;
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
        pax: values.pax,
        requirements: values.requirements,
        // servicePhotoURL,
        serviceCreatedDate: new Date().toISOString().split("T")[0],
      };

      console.log("New service in ServiceManager:", newService);
      const result = await createService(newService);

      Alert.alert("Success", "Service added successfully!");
      console.log("resule from result:", result);
      // resetForm();
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

  const handleUpdateService = async (id, updatedService) => {
    try {
      const response = await updateService(id, updatedService);
      setRefresh(!refresh); // Refresh the component
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setModalVisible(true);
  };

  const handleSaveService = async (values) => {
    try {
      const response = await updateService(editingService.id, values);
      setRefresh(!refresh); // Refresh the component
      setEditingService(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
      setRefresh(!refresh); // Refresh the component
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

  const renderServiceItem = ({ item }) => (
    <SafeAreaView style={styles.serviceItemContainer}>
      <View style={[styles.serviceCard]}>
        <Image
          style={[styles.serviceImage]}
          source={{ uri: item.servicePhoto }}
        />
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.serviceCategory}>{item.serviceCategory}</Text>
        <Text style={styles.servicePrice}>Price: ₱{item.basePrice}</Text>
        <Text style={styles.servicePax}>Pax: {item.pax}</Text>
        <Text style={styles.serviceDuration}>
          Service Features: {item.serviceFeatures}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleEditService(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteService(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={[styles.container, { display: "flex" }]}>
      <View>
        <Text style={styles.title}>Service Manager</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setCreateServiceModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Service</Text>
        </TouchableOpacity>
      </View>
      <View pointerEvents={createServiceModalVisible ? "none" : "auto"}>
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, zIndex: -1 }}
          accessibilityViewIsModal={true}
          accessibilityModalRoot={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={createServiceModalVisible}
        onRequestClose={() => setCreateServiceModalVisible(false)}
        contentContainerStyle={[
          styles.modalContaine,
          { backgroundColor: "blue", elevation: 1000 },
        ]}
      >
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Service</Text>
            <Formik
              initialValues={{
                serviceName: "",
                serviceCategory: "",
                serviceFeatures: "",
                servicePhoto: null,
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
                  {/* {imageUri && (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.selectedImage}
                    />
                  )} */}
                  <View>
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
                    onPress={handleSubmit}
                  >
                    <Text style={styles.createButtonText}>Create Service</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => {
                      setCreateServiceModalVisible(false);
                    }}
                  >
                    <Text style={styles.createButtonText}>Close</Text>
                  </TouchableOpacity>
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
      {/* <AddPackageG
        onClose={() => setIsModalVisible(false)}
        onAddPackage={handleAddPackage}
      /> */}

      {/* {services.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <Image
            source={{ uri: service.servicePhotoURL }}
            style={styles.serviceImage}
          />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.serviceName}</Text>
            <Text style={styles.serviceCategory}>
              Category: {service.serviceCategory}
            </Text>
            <Text style={styles.servicePrice}>
              Price: ₱{service.basePrice} (for {service.pax} pax)
            </Text>
            <Text style={styles.serviceFeatures}>
              Features: {service.serviceFeatures}
            </Text>
            <Text style={styles.serviceRequirements}>
              Requirements: {service.requirements}
            </Text>
          </View>
          <View style={styles.serviceActions}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleEditService(service)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteService(service.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "orange", // yellow button background color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
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
    margin: 20,
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
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
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
  },
  servicePhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ServiceManager;
