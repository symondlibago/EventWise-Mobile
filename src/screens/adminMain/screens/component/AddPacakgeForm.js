import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  addEventPackage,
  resetFields,
  onClose,
} from "./your-package-functions";
import { PackageController } from "./your-package-controller";

const packageController = new PackageController();

const AddPackageForm = () => {
  const [packageName, setPackageName] = useState("");
  const [packageEventType, setPackageEventType] = useState("");
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [packageCreatedDate, setPackageCreatedDate] = useState(new Date());

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required("Package name is required"),
    eventType: Yup.string().required("Event type is required"),
    totalPrice: Yup.number().required("Total price is required"),
  });

  const formik = useFormik({
    initialValues: {
      packageName,
      eventType: packageEventType,
      totalPrice,
      coverPhoto,
      packageCreatedDate,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.packageName || !values.eventType) {
          Alert.alert("Error", "Please fill in all required fields.");
          return;
        }

        const newPackage = {
          packageId: Date.now().toString(),
          packageName: values.packageName,
          eventType: values.eventType,
          services: selectedServices,
          totalPrice: values.totalPrice,
          coverPhoto: values.coverPhoto,
          packageCreatedDate: values.packageCreatedDate
            .toISOString()
            .split("T")[0], // Format date as YYYY-MM-DD
        };

        const response = await packageController.store(newPackage);
        console.log("Package added:", response);
        resetFields();
        onClose();
        Alert.alert("Success", "Package added successfully!");
      } catch (error) {
        console.error("Error adding package:", error);
        Alert.alert("Error", "Error adding package. Please try again.");
      }
    },
  });

  return (
    <View>
      <TextInput
        value={formik.values.packageName}
        onChangeText={(text) => {
          setPackageName(text);
          formik.setFieldValue("packageName", text);
        }}
        placeholder="Package name"
      />
      <TextInput
        value={formik.values.eventType}
        onChangeText={(text) => {
          setPackageEventType(text);
          formik.setFieldValue("eventType", text);
        }}
        placeholder="Event type"
      />
      {/* Add other form fields */}
      <Button title="Submit" onPress={formik.handleSubmit} />
    </View>
  );
};

export default AddPackageForm;
