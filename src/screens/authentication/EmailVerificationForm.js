import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Provider as PaperProvider,
  Checkbox,
} from "react-native-paper";
import useStore from "../../stateManagement/useStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendVerificationEmail, verifyCode } from "../../services/authServices";
const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  verificationCode: Yup.string()
    .min(6, "Code must be 6 characters")
    .required("Verification code is required"),
});

export default function EmailVerificationForm({ onNextStep }) {
  const { email, verificationCode, updateField } = useStore();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  // const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email, verificationCode },
      validationSchema: emailValidationSchema,
      onSubmit: async (values) => {
        try {
          if (emailVerificationSent) {
            // Submit the verification code
            const verificationResult = await verifyCode(
              values.email,
              values.verificationCode
            );
            if (verificationResult.success) {
              alert("Email verified successfully!");
            } else {
              alert("Invalid verification code.");
            }
          }
        } catch (error) {
          console.error(error);
          alert("Something went wrong.");
        }
      },
    });

  // Function to trigger email verification process
  // Triggered when user clicks "Verify email" button
  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const response = await sendVerificationEmail(values.email);
      if (response.message) {
        setIsCodeSent(true);
        alert("Verification code sent to your email.");
      } else {
        alert("Error sending verification code.");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      alert("Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  // Triggered when the user submits the verification code

  const handleVerificationCode = async () => {
    try {
      setLoading(true);
      console.log(values.email, values.verificationCode);
      updateField("email", values.email);
      const response = await verifyCode(values.email, values.verificationCode);
      console.log(response.success);
      if (response.success) {
        alert("Email verified successfully!");
        onNextStep(); // Call the onNextStep callback function
      } else {
        alert("Invalid verification code.");
      }
    } catch (error) {
      console.error("Error verifying codes:", error);
      alert("Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <TextInput
        label="Email Address"
        value={values.email}
        onChangeText={(text) => {
          handleChange("email")(text);
          updateField("email", text);
        }}
        onBlur={handleBlur("email")}
        style={styles.input}
        mode=" "
        error={touched.email && errors.email}
        helperText={touched.email && errors.email}
      />
      {touched.email && errors.email && (
        <Text style={styles.errorText}>{errors.email}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleVerifyEmail}
        style={styles.verificationButton}
        loading={loading}
        disabled={loading}
      >
        Verify
      </Button>

      {isCodeSent && (
        <>
          <View style={styles.verificationContainer}>
            <TextInput
              label="Enter Verification Code"
              value={values.verificationCode}
              onChangeText={(text) => {
                handleChange("verificationCode")(text);
                updateField("verificationCode", text);
              }}
              style={styles.verificationInput}
            />

            <Button
              mode="contained"
              // onPress={() => {
              //   console.log(values.email, values.verificationCode);
              // }}
              onPress={handleVerificationCode} //
              style={styles.verificationButton}
              loading={loading}
              disabled={loading}
            >
              Verify Code
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
    paddingTop: 150,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  stepContainer: {
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
