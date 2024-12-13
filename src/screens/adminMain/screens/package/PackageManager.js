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
import { usePackageStore } from "../../../../stateManagement/admin/usePackageStore";

import { Modal } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";
import { fetchPackages } from "../../../../services/organizer/adminPackageServices";
const validationSchema = Yup.object().shape({
  packageName: Yup.string().required("Package name is required"),
  packageCategory: Yup.string().required("Package category is required"),
  packageFeatures: Yup.string().required("Package features are required"),
  basePrice: Yup.number()
    .required("Base price is required")
    .positive("Base price must be positive"),
  pax: Yup.number()
    .required("Pax is required")
    .positive("Pax must be positive"),
  requirements: Yup.string().required("Requirements are required"),
});

const PackageManager = () => {
  const navigation = useNavigation();
  const [createPackageModalVisible, setCreatePackageModalVisible] =
    useState(false);
  const { currentPackages, setCurrentPackages } = usePackageStore();
  const [refresh, setRefresh] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (createPackageModalVisible) {
          setCreatePackageModalVisible(false);
          return true;
        } else if (modalVisible) {
          setModalVisible(false);
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  }, [createPackageModalVisible, modalVisible]);

  useEffect(() => {
    const fetchMyPackagesData = async () => {
      try {
        const data = await fetchPackages();
        setCurrentPackages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyPackagesData();
  }, [refresh, setCurrentPackages]);

  const handleCreatePackage = async (values, resetForm) => {
    console.log("Values in CreatePackageScreen:", values);
    setIsLoading(true);

    try {
      let packagePhotoURL = null;

      if (values.packagePhoto) {
        const fileName = `package_photo_${Date.now()}.jpg`;
        console.log("Uploading image to Supabase:", fileName);

        packagePhotoURL = await testUploadImageToSupabase(
          values.packagePhoto,
          fileName
        );
        console.log("Image uploaded successfully. URL:", packagePhotoURL);
      }

      const newPackage = {
        packageName: values.packageName,
        packageCategory: values.packageCategory,
        packageFeatures: values.packageFeatures,
        basePrice: values.basePrice,
        location: values.location,
        pax: values.pax,
        requirements: values.requirements,
        packagePhotoURL: packagePhotoURL || null,
        packageCreatedDate: new Date().toISOString().split("T")[0],
      };

      console.log("New package in PackageManager:", newPackage);
      const result = await createPackage(newPackage);

      Alert.alert("Success", "Package added successfully!");
      console.log("Result from result:", result);
      setRefresh(!refresh); // Refresh the component
      resetForm();
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

  const handleSavePackage = async (values) => {
    try {
      const response = await updatePackage(editingPackage.id, values);
      setRefresh(!refresh); // Refresh the component
      setEditingPackage(null);
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

        setFieldValue("packagePhoto", uri);
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
      <Text style={styles.title}>Packages </Text>

      <View style={styles.createButtonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreatePackageScreen")}
          loading={isLoading}
          disable={isLoading}
          style={styles.createButton}
        >
          <FontAwesome6 name="plus" size={16} color="#fff" />
          <Text style={styles.createButtonText}>Create Packages</Text>
        </Button>
      </View>
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

export default PackageManager;
