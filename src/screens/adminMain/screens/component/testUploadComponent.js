// src/components/TestUploadComponent.js

import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";

const TestUploadComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTestUpload = async () => {
    if (!imageUri) {
      Alert.alert("No Image Selected", "Please select an image to upload.");
      return;
    }

    const fileName = `test_upload_${Date.now()}.jpg`; // Correctly using backticks

    setIsLoading(true);
    try {
      console.log("Starting upload for:", fileName);
      const signedURL = await testUploadImageToSupabase(imageUri, fileName);
      Alert.alert("Upload Successful", `Image URL: ${signedURL}`);
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert(
        "Upload Failed",
        error.response?.data?.message || error.message || "An error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image for Test Upload" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
      <Button title="Upload Image to Supabase" onPress={handleTestUpload} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default TestUploadComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
    resizeMode: "cover",
  },
});
