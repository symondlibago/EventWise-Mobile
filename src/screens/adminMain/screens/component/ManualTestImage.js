// src/components/ManualTestImage.js

import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ManualTestImage = () => {
  const signedURL =
    "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/object/sign/capstone/test_uploads/cover_photo_1731095553255.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYXBzdG9uZS90ZXN0X3VwbG9hZHMvY292ZXJfcGhvdG9fMTczMTA5NTU1MzI1NS5qcGciLCJpYXQiOjE3MzExNTk4NzYsImV4cCI6MTczMTc2NDY3Nn0.nsWNvrDcbifzo35iHKvmdM0C_OIW7IG8MCozy6UGBb8&t=2024-11-09T13%3A44%3A36.413Z";
  return (
    <View style={styles.container}>
      <Image source={{ uri: signedURL }} style={styles.testImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  testImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default ManualTestImage;
