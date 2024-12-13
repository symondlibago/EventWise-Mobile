import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
const Register = () => {
  const navigator = useNavigation();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [page, setPage] = useState(1); // 1 for registration, 2 for verification

  // Navigation between pages
  const goToNextPage = () => setPage(2);
  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);

    closeMenu();
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  const handleRegistration = async () => {
    setLoading(true);
    setIsError(false);

    // Check if passwords match
    if (password !== repassword) {
      showToast("Passwords do not match.");
      setLoading(false);
      return; // Exit the function early
    }

    // Check if role is selected
    if (!selectedRole) {
      showToast("Please select a user role.");
      setLoading(false);
      return; // Exit the function early
    }

    try {
      const roleMapping = {
        "SERVICE PROVIDER": "3",
        CUSTOMER: "2",
      };

      const data = {
        name,
        lastname,
        username,
        email,
        phone_number: phoneNumber,
        password,
        password_confirmation: repassword,
        date_of_birth: date.toISOString().split("T")[0],
        gender,
        role: roleMapping[selectedRole],
        terms_accepted: termsAccepted,
      };

      console.log("Registration Data:", data); // Check the data being sent

      const response = await axios.post(
        "https://50bc-103-62-152-155.ngrok-free.app/api/pending",
        data
      );

      if (response.status === 201) {
        showToast(response.data.message || "Registration successful!");
        // Optionally navigate to another screen or reset the form
      }
    } catch (error) {
      if (error.response) {
        console.error("Registration Error:", error.response.data);
        showToast(
          `Error: ${
            error.response.data.message || "An unexpected error occurred."
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        showToast("No response from the server. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        showToast("An unexpected error occurred. Please try again.");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  const handleVerificationSubmit = () => {
    // Logic for verification
    if (verificationCode) {
      showToast("Verification successful! Proceeding to registration.");
      // Here, you can call an API or perform the final registration process.
    } else {
      showToast("Please enter the verification code.");
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
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 0 : heightPercentageToDP("10%")
          }
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.headerText}>
              {page === 1 ? "Registration" : "Verification"}
            </Text>

            <PaperProvider>
              {page === 1 ? (
                <View style={styles.inputContainer}>
                  {/* Registration Form */}
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    contentStyle={styles.menuContent}
                    anchor={
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={[
                            styles.menuStyle,
                            {
                              backgroundColor: "#C2B067",
                              padding: 1,
                              borderRadius: 30,
                              marginBottom: 5,
                              marginTop: 5,
                              margin: 18,
                              zIndex: 999,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              textAlign: "center",
                              margin: 10,
                            }}
                          >
                            {selectedRole ?? "User Role: "}
                          </Text>
                        </View>
                        <Icon
                          name="arrow-down-bold-circle"
                          size={40}
                          color="#000"
                          style={{ marginLeft: 10 }}
                          onPress={openMenu}
                        />
                      </View>
                    }
                    style={{
                      position: "absolute",
                      zIndex: 999,
                      top: 85,
                      left: 90,
                    }}
                  >
                    <View style={styles.menuItemContainer}>
                      <Text style={styles.menuTitle}>PLEASE SELECT</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.menuItemButton,
                        selectedRole === "SERVICE PROVIDER" &&
                          styles.selectedMenuItemButton,
                      ]}
                      onPress={() => handleRoleChange("SERVICE PROVIDER")}
                    >
                      <Text style={styles.menuItemText}>SERVICE PROVIDER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.menuItemButton,
                        selectedRole === "CUSTOMER" &&
                          styles.selectedMenuItemButton,
                      ]}
                      onPress={() => handleRoleChange("CUSTOMER")}
                    >
                      <Text style={styles.menuItemText}>CUSTOMER</Text>
                    </TouchableOpacity>
                  </Menu>

                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="First Name"
                    placeholder="Enter your firstname"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    left={<TextInput.Icon icon="rename-box" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
                    left={<TextInput.Icon icon="rename-box" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    left={<TextInput.Icon icon="account" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    inputMode="email"
                    left={<TextInput.Icon icon="email" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    left={<TextInput.Icon icon="phone" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={HideEntry}
                    right={
                      <TextInput.Icon
                        onPress={toggleSecureEntry}
                        icon={!HideEntry ? "eye" : "eye-off"}
                      />
                    }
                    left={<TextInput.Icon icon="lock" />}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    mode="contained-tonal"
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={repassword}
                    onChangeText={(text) => setRepassword(text)}
                    secureTextEntry={HideEntry}
                    right={
                      <TextInput.Icon
                        onPress={toggleSecureEntry}
                        icon={!HideEntry ? "eye" : "eye-off"}
                      />
                    }
                    left={<TextInput.Icon icon="lock" />}
                  />

                  {/* Gender Selection */}
                  <View
                    style={[styles.inputContainer, { alignItems: "center" }]}
                  >
                    <View style={styles.genderContainer}>
                      <Text style={styles.Gender}>Gender</Text>
                      <TouchableOpacity
                        style={[
                          styles.genderButton,
                          gender === "Male" && styles.selectedGender,
                        ]}
                        onPress={() => setGender("Male")}
                      >
                        <Text style={styles.genderText}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.genderButton,
                          gender === "Female" && styles.selectedGender,
                        ]}
                        onPress={() => setGender("Female")}
                      >
                        <Text style={styles.genderText}>Female</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Date of Birth */}
                  <View style={styles.dateContainer}>
                    <Text style={styles.Date}>Date of Birth</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setDatePickerVisibility(true)}
                    >
                      <Text style={styles.datePickerText}>
                        {date.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleDateConfirm}
                      onCancel={() => setDatePickerVisibility(false)}
                      maximumDate={new Date()}
                      textColor="#000"
                      theme={{
                        colors: {
                          primary: "#FFC42B",
                          text: "#000",
                          placeholder: "#FFC42B",
                          background: "#fff",
                        },
                      }}
                    />
                  </View>

                  {/* Terms Checkbox */}
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={termsAccepted ? "checked" : "unchecked"}
                      onPress={() => setTermsAccepted(!termsAccepted)}
                      color="black"
                    />
                    <Text style={styles.checkboxText}>
                      Agree with terms & conditions
                    </Text>
                  </View>

                  {/* Register Button */}
                  <Button
                    loading={loading}
                    disabled={loading}
                    mode="contained"
                    onPress={goToNextPage}
                    labelStyle={{ color: "white", fontWeight: "bold" }}
                    style={{
                      width: "50%", // Set the width to 50%
                      alignSelf: "center", // Center the button horizontally
                      marginTop: 20, // Optional: Add some space above the button
                      backgroundColor: "#eeba2b", // Button background color (can be customized)
                      borderRadius: 30, // Rounded corners (optional)
                    }}
                  >
                    Next
                  </Button>

                  <SafeAreaView
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "black" }}>
                      Already have an account?
                    </Text>
                    <Button
                      labelStyle={{ color: "#A97E00" }}
                      loading={loading}
                      disabled={loading}
                      onPress={() => navigator.navigate("Login")}
                    >
                      Login Now
                    </Button>
                  </SafeAreaView>

                  {/* Go Back Button */}
                  <Button
                    style={styles.goback}
                    labelStyle={{ color: "#000" }}
                    onPress={() => {
                      navigator.goBack();
                    }}
                  >
                    Go Back
                  </Button>
                </View>
              ) : (
                // Verification Form
                <View style={styles.verificationContainer}>
                  {/* Text above the TextInput */}
                  <Text style={styles.verificationInstruction}>
                    We sent a verification code to your email
                  </Text>

                  {/* TextInput */}
                  <TextInput
                    label="Enter Verification Code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    style={styles.verificationInput}
                  />

                  <TouchableOpacity>
                    <Text style={styles.verifyText}>Verify</Text>
                  </TouchableOpacity>

                  {/* Button */}
                  <Button
                    loading={loading}
                    disabled={loading}
                    style={styles.verificationButton}
                    mode="contained"
                    onPress={handleRegistration}
                    labelStyle={styles.buttonLabel} // Apply the custom text color
                  >
                    Register Account
                  </Button>

                  {/* Clickable "Verify" text below the TextInput */}
                </View>
              )}
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
    marginTop: 20, // Add space above the container
    paddingHorizontal: 20, // Padding for left and right spacing
    alignItems: "center", // Center content horizontally
  },

  // Instruction text above the TextInput
  verificationInstruction: {
    fontSize: 16, // Set text size
    color: "#000", // Set text color (black)
    marginBottom: 10, // Space between text and TextInput
    textAlign: "center", // Center the instruction text
  },

  // Verification Input Styles
  verificationInput: {
    width: widthPercentageToDP("80%"), // Fixed width
    marginBottom: 15, // Space between text input and button
    height: 50, // Fixed height for the text input
  },

  // Verification Button Styles
  verificationButton: {
    width: widthPercentageToDP("50%"), // Same width as text input
    marginTop: 15, // Space between button and input
    borderRadius: 30, // Rounded corners for button
    backgroundColor: "#eeba2b", // Button background color
    elevation: 5, // Adds shadow for Android
    shadowColor: "black", // Black shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow direction (vertical)
    shadowOpacity: 0.25, // Shadow opacity (how strong the shadow is)
    shadowRadius: 6, // Shadow blur radius (how spread out the shadow is)
  },

  // Button text styles
  buttonLabel: {
    color: "white", // White text color
    fontWeight: "bold", // Bold text
  },

  // Style for the "Verify" clickable text
  verifyText: {
    fontSize: 16, // Set text size
    color: "#000", // Set text color
    textDecorationLine: "underline", // Underline the text
    marginTop: 10, // Space between the button and the clickable text
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    alignItems: "center",
    paddingVertical: heightPercentageToDP("5%"),
  },
  headerText: {
    marginTop: heightPercentageToDP("4%"),
    color: "#fff",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  headerTe: {
    marginTop: heightPercentageToDP("1%"),
    marginBottom: heightPercentageToDP("5%"),
    color: "#fff",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  menuContent: {
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
    width: 250,
    marginLeft: -50,
  },
  menuItemContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  menuTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  menuItemButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C2B067",
    marginVertical: 5,
    width: 200,
  },
  selectedMenuItemButton: {
    backgroundColor: "#C2B067",
  },
  menuItemText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFC42B",
    borderRadius: 30,
    marginBottom: 10,
    width: widthPercentageToDP("80%"),
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  Gender: {
    padding: 10,
    borderRadius: 30,
    width: "23%",
    alignItems: "center",
    color: "#fff",
  },
  Date: {
    padding: 10,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
    color: "#fff",
  },
  genderButton: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "30%",
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#A97E00",
  },
  genderText: {
    color: "white",
    fontWeight: "bold",
  },
  datePickerButton: {
    width: widthPercentageToDP("55%"),
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("2%"),
  },
  datePickerText: {
    color: "white",
    fontWeight: "bold",
  },
  uploadButton: {
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "60%",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPercentageToDP("3%"),
  },
  checkboxWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    borderRadius: 12,
    marginRight: 10,
    height: 23,
  },
  checkboxText: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    width: widthPercentageToDP("30%"),
    height: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#EEBA2B",
  },
  menuStyle: {
    width: widthPercentageToDP("50%"),
  },

  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  menuContent: {
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
    width: 250,
    marginLeft: -50,
  },
  menuItemContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  Gender: {
    padding: 10,
    borderRadius: 30,
    width: "23%",
    alignItems: "center",
    color: "#000",
  },
  Date: {
    padding: 10,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
    color: "#000",
  },
  genderButton: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "30%",
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#A97E00",
  },
  genderText: {
    color: "#000",
    fontWeight: "bold",
  },
  datePickerButton: {
    width: widthPercentageToDP("55%"),
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("2%"),
  },
  datePickerText: {
    color: "#000",
    fontWeight: "bold",
  },
  uploadButton: {
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "60%",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#000",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPercentageToDP("3%"),
  },
  checkboxWrapper: {
    backgroundColor: "rgba(220, 220, 220, 0.80)",
    borderRadius: 12,
    marginRight: 10,
    height: 23,
  },
  checkboxText: {
    color: "#000",
    fontSize: 16,
  },
  buttonStyle: {
    width: widthPercentageToDP("50%"),
    height: heightPercentageToDP("6%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#EEBA2B",
  },
  menuStyle: {
    width: widthPercentageToDP("50%"),
  },
});

export default Register;
