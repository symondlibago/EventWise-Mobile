import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import selectimage from "../../../../../assets/selectimage.png";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import {
  createPackage,
  fetchServices,
} from "../../../../services/organizer/adminPackageServices";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useServicesStore } from "../../../../stateManagement/admin/useServicesStore";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";

const CreatePackageScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { services, setServices } = useServicesStore();
  const [selected, setSelected] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Filtered services
  const [paxValue, setPaxValue] = useState("");
  // Validation schema
  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required("Package name is required"),
    eventType: Yup.string().required("Event type is required"),
    services: Yup.array().nullable(), // should be required
    totalPrice: Yup.number()
      .required("Total price is required")
      .min(1, "Price must be at least 1"),
      pax: Yup.number()
      .required("Pax is required")
      .min(1, "Pax must be at least 1"),
  });
  // Fetch services on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
        setFilteredServices(fetchedServices); // Initialize filteredServices
      } catch (error) {
        console.error("Error fetching services:", error);
        Alert.alert("Error", "Unable to load services. Please try again.");
      }
    };
    loadServices();
  }, [setServices]);

  useEffect(() => {
    if (paxValue) {
      const filtered = services.filter(
        (service) => service.pax <= parseInt(paxValue, 10)
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services); // Show all services if paxValue is empty
    }
  }, [paxValue, services]);


  // console.log("Fetched services: " + services);
  const handleCreatePackage = async (values, resetForm) => {
    console.log("Creating package with values:", values);
    setIsLoading(true);
    try {
      let coverPhotoURL = null;

      if (values.coverPhoto) {
        const fileName = `package_cover_${Date.now()}.jpg`;
        console.log("Uploading image to server:", fileName);

        // Replace with your actual image upload logic
        coverPhotoURL = await testUploadImageToSupabase(
          values.coverPhoto,
          fileName
        );
      }

      const newPackage = {
        packageName: values.packageName,
        eventType: values.eventType,
        services: selected,
        totalPrice: values.totalPrice,
        pax: values.pax,
        coverPhotoURL: coverPhotoURL || null,
      };

      console.log("New package data:", newPackage);
      const result = await createPackage(newPackage);

      Alert.alert("Success", "Package created successfully!");
      navigation.goBack();
      console.log("Server response:", result);
      resetForm();
    } catch (error) {
      console.error("Error creating package:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while creating the package. Please try again."
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

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={[{ width: "100%" }]}>
        <Formik
          initialValues={{
            packageName: "",
            eventType: "",
            services: [],
            totalPrice: "",
            coverPhoto: null,
            pax: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreatePackage(values, resetForm);
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
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 20, top: 20 }}
              >
                <Ionicons name="arrow-back" size={25} color="#eeba2b" />
              </TouchableOpacity>
              <Text style={styles.title}>Create Package</Text>
              <View style={styles.coverPhotoContainer}>
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
                      values.coverPhoto
                        ? { uri: values.coverPhoto }
                        : selectimage
                    }
                    style={styles.servicePhoto}
                  />
                </TouchableOpacity>
                {touched.coverPhoto && errors.coverPhoto && (
                  <Text style={styles.errorText}>{errors.coverPhoto}</Text>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Package Name"
                value={values.packageName}
                onChangeText={handleChange("packageName")}
                onBlur={handleBlur("packageName")}
              />
              {errors.packageName && touched.packageName && (
                <Text style={styles.errorText}>{errors.packageName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Pax"
                value={values.pax}
                onChangeText={(value) => {
                  setFieldValue("pax", value); // Update Formik field
                  setPaxValue(value); // Update Pax value for filtering
                }}
                onBlur={handleBlur("pax")}
                keyboardType="numeric"
              />
              {errors.pax && touched.pax && (
                <Text style={styles.errorText}>{errors.pax}</Text>
              )}

              
              <RNPickerSelect
                onValueChange={(value) => setFieldValue("eventType", value)}
                items={[
                  { label: "Wedding", value: "Wedding" },
                  { label: "Birthday", value: "Birthday" },
                  { label: "Corporate Event", value: "Corporate Event" },
                  { label: "Other", value: "Other" },
                ]}
                placeholder={{ label: "Select event type", value: null }}
              />
              {errors.eventType && touched.eventType && (
                <Text style={styles.errorText}>{errors.eventType}</Text>
              )}
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={filteredServices.map((service) => ({
                  label: `${service.serviceName} - ${service.basePrice} - Pax: ${service.pax}`,
                  value: service.id,
                  category: service.serviceCategory,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Select services"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={(items) => {
                  setSelected(items);
                  setFieldValue("services", items);
                }}
                renderItem={renderItem}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item.label}</Text>
                      <AntDesign color="black" name="delete" size={17} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <TextInput
                style={styles.input}
                placeholder="Total Price"
                value={values.totalPrice}
                onChangeText={handleChange("totalPrice")}
                onBlur={handleBlur("totalPrice")}
                keyboardType="numeric"
              />
              {errors.totalPrice && touched.totalPrice && (
                <Text style={styles.errorText}>{errors.totalPrice}</Text>
              )}
              <View style={styles.createButtonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={isLoading}
                  disabled={isLoading}
                  style={styles.createButton}
                >
                  <FontAwesome6 name="plus" size={16} color="#fff" />
                  <Text style={styles.createButtonText}>Create Package</Text>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
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
  backButton: {
    backgroundColor: "transparent",
    width: 80,
    borderRadius: 100,
    left: -120,
  },
  dropdown: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
    width: "100%",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default CreatePackageScreen;
