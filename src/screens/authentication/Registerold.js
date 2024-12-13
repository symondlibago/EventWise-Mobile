import React, { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { sendVerificationEmail, verifyCode } from "../../services/authServices";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Provider as PaperProvider,
  Checkbox,
} from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { signup } from "../../services/authServices";

import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  verificationCode: Yup.string()
    .min(6, "Code must be 6 characters")
    .required("Verification code is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});
import useStore from "../../stateManagement/useStore";
const Register = () => {
  const {
    updateField,
    name,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
    username,
    password,
    confirmPassword,
    selectedRole,
    role_id,
    termsAccepted,
  } = useStore();
  const [step, setStep] = useState(1);

  const [emailVerified, setEmailVerified] = useState(false); // Track verification status
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [canResendCode, setCanResendCode] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  // const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [HideEntry, setHideEntry] = useState(true);
  const [HideEntry2, setHideEntry2] = useState(true);

  const handleSubmitRegister = async (values) => {
    try {
      const response = await signup(values);
      console.log("--------------------------------");
      console.log("handle submit test: signup response:", response);
      alert(response.message);
      Toast.show(
        response.message,
        {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        },
        () => {
          console.log("Toast hidden");
        }
      );
      navigation.navigate("Login");
      console.log("--------------------------------");
    } catch (error) {
      alert(error);
      console.error(
        "Error in handleSubmitregister================:",
        error,
        values
      );

      Toast.show(
        error.response.data.message,
        {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        },
        () => {
          console.log("Toast hidden");
        }
      );
    }
  };

  const CustomIcon = ({ name, size, color }) => {
    return <Icon name={name} size={size} color={color} />;
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  const toggleSecureEntry2 = () => {
    setHideEntry2(!HideEntry2);
  };
  const handleDateConfirm = (date, setFieldValue) => {
    setFieldValue("dateOfBirth", date);
    setDatePickerVisibility(false);
  };

  const openDatePicker = () => setDatePickerVisibility(true);

  const openRoleMenu = () => setRoleMenuVisible(true);
  const closeRoleMenu = () => setRoleMenuVisible(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const handleRegistration = async (values) => {
    // ...
    console.log("handleRegistration called with values:", values);

    try {
      const response = await signup(values);
      console.log("signup response:", response);
    } catch (error) {
      console.error("Error in handleRegistration:", error);
    }
  };
  const [emailSent, setEmailSent] = useState(false);

  const handleVerifyEmail = async (values) => {
    if (emailSent) {
      alert("Email has already been sent. Please try again later.");
      return;
    }

    try {
      setLoading(true);
      const response = await sendVerificationEmail(values.email);

      if (
        response.message.includes("success") ||
        response.message.includes("Verification code sent")
      ) {
        setIsCodeSent(true);
        alert("Verification code sent to your email.");
        setCountdown(15); // Reset countdown to 15 seconds
        console.log(isCodeSent);
        setEmailSent(true); // Set emailSent to true
        const intervalId = setInterval(() => {
          if (countdown > 0) {
            setCountdown((prevCountdown) => prevCountdown - 1);
          } else {
            clearInterval(intervalId); // Clear interval when countdown reaches 0
            setCanResendCode(true);
          }
        }, 1000); // 1 second
      } else if (response.message.includes("Email is already in use")) {
        alert("Email is already in use. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.message === "Email is already in use") {
        alert("Email is already in use. Please try again.");
      } else {
        console.error("Error during email verification:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await sendVerificationEmail(values.email);
      if (
        response.message.includes("success") ||
        response.message.includes("Verification code sent")
      ) {
        setIsCodeSent(true);
        alert("Verification code sent to your email.");
        setCountdown(15); // Reset countdown to 15 seconds
        console.log(isCodeSent);
        setEmailSent(true); // Set emailSent to true
        const intervalId = setInterval(() => {
          if (countdown > 0) {
            setCountdown((prevCountdown) => prevCountdown - 1);
          } else {
            clearInterval(intervalId); // Clear interval when countdown reaches 0
            setCanResendCode(true);
          }
        }, 1000); // 1 second
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.message === "Email is already in use") {
        alert("Email is already in use. Please try again.");
      } else {
        console.error("Error during email verification:", error);
      }
    }
  };
  // Triggered when the user submits the verification code

  const handleVerificationCode = async (values) => {
    try {
      // handleNextStep();
      setLoading(true);
      console.log(values.email, values.verificationCode);
      updateField("email", values.email);
      const response = await verifyCode(values.email, values.verificationCode);
      console.log(response.success);
      if (response.success) {
        alert("Email verified successfully!");
        // onNextStep(); // Call the onNextStep callback function
        handleNextStep(); //
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
    <ImageBackground
      source={require("../customerScreens/pictures/authbg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContainer}
          >
            <Text
              variant="headlineMedium"
              style={{
                fontSize: widthPercentageToDP("9%"),
                color: "#fff",
                marginBottom: heightPercentageToDP("15%"),
                fontWeight: "bold",
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              Registration Form
            </Text>
            <PaperProvider>
              <Formik
                initialValues={{
                  name,
                  gender,
                  dateOfBirth,
                  email,
                  phoneNumber,
                  username,
                  password,
                  confirmPassword,
                  selectedRole,
                  role_id,
                  termsAccepted,
                }}
                validationSchema={validationSchema}
                onSubmit={() => handleSubmitRegister(values)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    {step === 1 ? (
                      <View style={styles.stepContainer}>
                        <View styles={styles.inputContainer}>
                          <TextInput
                            label="Full Name"
                            value={values.name}
                            onChangeText={(text) => {
                              handleChange("name")(text);
                              updateField("name", text);
                            }}
                            onBlur={handleBlur("name")}
                            style={styles.input}
                            mode="outlined"
                          />
                          {touched.name && errors.fullName && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                          )}

                          <Menu
                            visible={roleMenuVisible}
                            onDismiss={closeRoleMenu}
                            anchor={
                              <TouchableOpacity onPress={openRoleMenu}>
                                <TextInput
                                  label="Gender"
                                  value={values.gender}
                                  editable={false}
                                  style={[styles.input]}
                                  mode="outlined"
                                />
                              </TouchableOpacity>
                            }
                            contentStyle={{
                              width: 200,
                              bottom: 220,
                              right: 20,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Menu.Item
                                onPress={() => {
                                  setFieldValue("gender", "Male");
                                  updateField("gender", "Male");
                                  setRoleMenuVisible(false);
                                }}
                                title="Male"
                              />
                              <Menu.Item
                                onPress={() => {
                                  setFieldValue("gender", "Female");
                                  updateField("gender", "Female");
                                  setRoleMenuVisible(false);
                                }}
                                title="Female"
                              />
                              <Menu.Item
                                onPress={() => {
                                  setFieldValue("gender", "Other");
                                  updateField("gender", "Other");
                                  setRoleMenuVisible(false);
                                }}
                                title="Other"
                              />
                            </View>
                          </Menu>

                          <TouchableOpacity onPress={openDatePicker}>
                            <TextInput
                              label="Date of Birth"
                              value={values.dateOfBirth.toLocaleDateString()}
                              editable={false}
                              style={styles.input}
                              mode="outlined"
                            />
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                              setFieldValue("dateOfBirth", date);
                              updateField("dateOfBirth", date);
                              setDatePickerVisibility(false);
                            }}
                            onCancel={() => setDatePickerVisibility(false)}
                          />

                          <TextInput
                            label="Phone Number"
                            value={values.phoneNumber}
                            onChangeText={(text) => {
                              handleChange("phoneNumber")(text);
                              updateField("phoneNumber", text);
                            }}
                            onBlur={handleBlur("phoneNumber")}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="phone-pad"
                          />
                          {touched.phoneNumber && errors.phoneNumber && (
                            <Text style={styles.errorText}>
                              {errors.phoneNumber}
                            </Text>
                          )}

                          <Button
                            mode="contained"
                            onPress={() => {
                              handleNextStep(values);
                            }}
                            style={{
                              width: widthPercentageToDP("50%"),
                              height: heightPercentageToDP("6%"),
                              marginBottom: heightPercentageToDP("5%"),
                              marginTop: heightPercentageToDP("2%"),
                              alignSelf: "center",
                              backgroundColor: "#EEBA2B",
                            }}
                          >
                            Next
                          </Button>
                          <Button
                            mode="contained"
                            onPress={() => {
                              navigation.goBack();
                            }}
                            style={{
                              width: widthPercentageToDP("50%"),
                              height: heightPercentageToDP("6%"),
                              marginBottom: heightPercentageToDP("5%"),
                              marginTop: heightPercentageToDP("-3%"),
                              alignSelf: "center",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <Text style={styles.buttonText}>Go back</Text>
                          </Button>
                        </View>
                      </View>
                    ) : step === 2 ? (
                      <View style={styles.stepContainer}>
                        <View>
                          <Text style={styles.headerText}>
                            Email Verification
                          </Text>
                          {!isCodeSent && (
                            <>
                              <View style={styles.verificationContainer}>
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

                                <Button
                                  mode="contained"
                                  onPress={() => handleVerifyEmail(values)}
                                  style={styles.verificationButton}
                                  loading={loading}
                                  disabled={loading}
                                >
                                  Verify
                                </Button>
                                <Button
                                  mode="contained"
                                  onPress={handlePreviousStep}
                                  style={styles.verificationButtonBack}
                                >
                                  <Text style={styles.buttonText}>Go back</Text>
                                </Button>
                              </View>
                            </>
                          )}
                          {isCodeSent && (
                            <View style={styles.verificationContainer}>
                              <TextInput
                                label="Enter Verification Code"
                                value={values.verificationCode}
                                onChangeText={(text) => {
                                  handleChange("verificationCode")(text);
                                  updateField("verificationCode", text);
                                }}
                                style={styles.input}
                              />
                              <Button
                                mode="contained"
                                onPress={() => handleVerificationCode(values)}
                                style={styles.verificationButton}
                                loading={loading}
                                disabled={loading}
                              >
                                Verify Code
                              </Button>

                              <Button
                                mode="contained"
                                onPress={() => handleVerifyEmail(values)}
                                style={styles.verificationButton}
                                loading={loading}
                                disabled={countdown > 0 || loading}
                              >
                                {countdown > 0
                                  ? `Resend Code in ${countdown}s`
                                  : "Resend Code"}
                              </Button>
                              <Button
                                mode="contained"
                                onPress={handlePreviousStep}
                                style={styles.verificationButton}
                              >
                                <Text style={styles.buttonText}>Go back</Text>
                              </Button>
                            </View>
                          )}
                        </View>
                      </View>
                    ) : step === 3 ? (
                      <View style={styles.stepContainer}>
                        <TextInput
                          label="Username"
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          style={styles.input}
                          mode="outlined"
                        />
                        {touched.username && errors.username && (
                          <Text style={styles.errorText}>
                            {errors.username}
                          </Text>
                        )}

                        <TextInput
                          label="Password"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          style={styles.input}
                          mode="outlined"
                          secureTextEntry={HideEntry2}
                          right={
                            <TextInput.Icon
                              onPress={toggleSecureEntry2}
                              icon={() => (
                                <CustomIcon
                                  name={!HideEntry2 ? "eye" : "eye-off"}
                                  size={24}
                                  color="black"
                                />
                              )}
                            />
                          }
                        />
                        {touched.password && errors.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}

                        <TextInput
                          label="Confirm Password"
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          style={styles.input}
                          mode="outlined"
                          secureTextEntry={HideEntry}
                          right={
                            <TextInput.Icon
                              onPress={toggleSecureEntry}
                              icon={() => (
                                <CustomIcon
                                  name={!HideEntry ? "eye" : "eye-off"}
                                  size={24}
                                  color="black"
                                />
                              )}
                            />
                          }
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <Text style={styles.errorText}>
                            {errors.confirmPassword}
                          </Text>
                        )}

                        <Menu
                          visible={roleMenuVisible}
                          onDismiss={closeRoleMenu}
                          anchor={
                            <TouchableOpacity onPress={openRoleMenu}>
                              <TextInput
                                label="User Role"
                                value={values.selectedRole}
                                editable={false}
                                style={styles.input}
                                mode="outlined"
                              />
                            </TouchableOpacity>
                          }
                          contentStyle={{ width: 200, bottom: 220, right: 20 }}
                        >
                          <Menu.Item
                            onPress={() => {
                              setFieldValue(
                                "selectedRole",
                                "Service Providerss"
                              );
                              setFieldValue("role_id", 3);
                              updateField("role_id", 3);
                              setRoleMenuVisible(false); // Close the menu when selecting 'Service Provider'
                            }}
                            title="Service Provider"
                          />
                          <Menu.Item
                            onPress={() => {
                              setFieldValue("selectedRole", "Customer");
                              setFieldValue("role_id", 2);
                              updateField("role_id", 2);
                              setRoleMenuVisible(false); // Close the menu when selecting 'Customer'
                            }}
                            title="Customer"
                          />
                        </Menu>

                        {touched.selectedRole && errors.selectedRole && (
                          <Text style={styles.errorText}>
                            {errors.selectedRole}
                          </Text>
                        )}

                        <View style={styles.checkboxContainer}>
                          <Checkbox
                            status={
                              values.termsAccepted ? "checked" : "unchecked"
                            }
                            onPress={() =>
                              setFieldValue(
                                "termsAccepted",
                                !values.termsAccepted
                              )
                            }
                          />
                          <Text>I agree to the Terms and Conditions</Text>
                        </View>
                        {touched.termsAccepted && errors.termsAccepted && (
                          <Text style={styles.errorText}>
                            {errors.termsAccepted}
                          </Text>
                        )}

                        <View
                          style={[
                            styles.buttonContainer,
                            {
                              alignSelf: "center",
                              flexDirection: "column",
                              bottom: 15,
                              justifyContent: "space-around",
                              alignItems: "center",
                            },
                          ]}
                        >
                          <Button
                            mode="contained"
                            onPress={() => {
                              handleSubmitRegister(values);
                            }}
                            style={{
                              width: widthPercentageToDP("50%"),
                              height: heightPercentageToDP("6%"),
                              // marginBottom: heightPercentageToDP("5%"),
                              marginTop: heightPercentageToDP("2%"),
                              alignSelf: "center",
                              backgroundColor: "#EEBA2B",
                            }}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                          <Button
                            mode="outlined"
                            onPress={handlePreviousStep}
                            style={[styles.button, { width: "100%" }]}
                          >
                            Back
                          </Button>
                        </View>
                      </View>
                    ) : null}
                  </>
                )}
              </Formik>
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
    width: 320,
  },
  verificationCode: {
    marginTop: 12,
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
    display: "flex",
    alignItems: "center",
    // backgroundColor: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  verificationButton: {
    // display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#EEBA2B",
    width: 250,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  inputContainer: { backgroundColor: "red" },
  verificationContainer: {
    // backgroundColor: "red",
    // display: "inline-block",
    alignItems: "center",
  }, //
  verificationButtonBack: {
    // display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#EEBA2B",
    width: 250,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Register;
