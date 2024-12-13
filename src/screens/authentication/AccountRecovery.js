import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const AccountRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordRecovery = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://your-laravel-api-url/api/password/recovery",
        { email }
      );
      Alert.alert("Success", response.data.message);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred."
      );

    } finally {
      setLoading(false);
    }
  };

  // Function to handle verifying the reset code
  const handleVerifyCode = async () => {
    setLoading(true);
    setIsError(false);
  
    if (!resetCode.trim()) {
      setIsError(true);
      showToast("Please enter the reset code.");
      setLoading(false);
      return;
    }
  
    try {
      const result = await verifyPasswordResetCode(email, resetCode);
  
      if (result?.message === "Invalid reset code") {
        setIsError(true);
        showToast("Invalid reset code.");
      } else {
        showToast("Code verified successfully!");
        navigation.navigate("PasswordResetScreen", {
          email: email.trim(),
          resetCode: resetCode.trim(),
        });
      }
    } catch (error) {
      console.error("Error verifying reset code:", error);
      showToast("An error occurred while verifying the reset code.");
    } finally {
      setLoading(false);
    }
  };  

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={loading ? "Sending..." : "Send Recovery Email"}
        onPress={handlePasswordRecovery}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default AccountRecovery;
