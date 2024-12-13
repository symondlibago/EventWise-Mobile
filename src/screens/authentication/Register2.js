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
  Image,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Divider,
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
import * as ImagePicker from "expo-image-picker";
import { signup } from "../../services/authServices";

const Register2 = () => {
  const navigator = useNavigation();
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
  const [validID, setvalidID] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [image, setImage] = React.useState(null);

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

  // const handleRegistration = async () => {
  //   // Reset error state before starting validation
  //   setIsError(false);

  //   // Form validation
  //   if (
  //     username.trim() === "" ||
  //     email.trim() === "" ||
  //     password.trim() === "" ||
  //     repassword.trim() === "" ||
  //     phoneNumber.trim() === "" ||
  //     !selectedRole ||
  //     !termsAccepted
  //   ) {
  //     showToast(
  //       "Please fill in all required fields and accept the terms and conditions"
  //     );
  //     setIsError(true);
  //     setLoading(false);
  //     return;
  //   }

  //   if (password !== repassword) {
  //     showToast("Passwords do not match");
  //     setIsError(true);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // setLoading(true);

  //     // const data = {
  //     //   name: username,
  //     //   email,
  //     //   password,
  //     //   role_id: selectedRole,
  //     //   phoneNumber,
  //     //   dateOfBirth: date,
  //     //   gender,
  //     //   validID,
  //     // };

  //     // const response = await fetch("apiurl", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify(data),
  //     // });

  //     // const resultJson = await response.json();
  //     const roleMapping = {
  //       "SERVICE PROVIDER": "3",
  //       CUSTOMER: "2",
  //     };
  //     const data = {
  //       name: username,
  //       email,
  //       password,
  //       role_id: roleMapping[selectedRole],
  //       phoneNumber,
  //       dateOfBirth: date,
  //       gender,
  //       validID,
  //     };
  //     const result = await signup(data);

  //     console.log("result", result);
  //     showToast(result?.message);

  //     if (result?.message != null) {
  //       showToast(result?.message);
  //     } else {
  //       showToast(result?.error);
  //     }

  //     // if (result.message != null) {
  //     //   showToast(result?.message);
  //     // } else {
  //     //   navigator.navigate("Login");
  //     // }

  //     // if (response.ok) {
  //     //   // Handle success response
  //     //   showToast(resultJson?.message || "Registration successful!");
  //     //   navigator.navigate("Login");
  //     // } else {
  //     //   // Handle failure response
  //     //   showToast(
  //     //     resultJson?.message || "Registration failed. Please try again."
  //     //   );
  //     //   setIsError(true);
  //     // }
  //   } catch (error) {
  //     console.error("Registration Error:", error);

  //     // showToast("Email already exists. Please try again.");

  //     setIsError(true);
  //     console.log("data:" + JSON.stringify(data));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleRegistration = async () => {
    // Reset error state before starting validation
    setIsError(false);

    // Form validation
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      repassword.trim() === "" ||
      phoneNumber.trim() === "" ||
      !selectedRole ||
      !termsAccepted
    ) {
      showToast(
        "Please fill in all required fields and accept the terms and conditions"
      );
      setIsError(true);
      setLoading(false);
      return;
    }

    if (password !== repassword) {
      showToast("Passwords do not match");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      // setLoading(true);

      // const data = {
      //   name: username,
      //   email,
      //   password,
      //   role_id: selectedRole,
      //   phoneNumber,
      //   dateOfBirth: date,
      //   gender,
      //   validID,
      // };

      // const response = await fetch("apiurl", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // const resultJson = await response.json();
      const roleMapping = {
        "SERVICE PROVIDER": "3",
        CUSTOMER: "2",
      };
      const data = {
        name: username,
        email,
        password,
        role_id: roleMapping[selectedRole],
        phoneNumber,
        dateOfBirth: date,
        gender,
        validID,
      };
      const result = await signup(data);

      console.log("result", result);
      showToast(result?.message);

      if (result?.message != null) {
        showToast(result?.message);
      } else {
        showToast(result?.error);
      }

      // if (result.message != null) {
      //   showToast(result?.message);
      // } else {
      //   navigator.navigate("Login");
      // }

      // if (response.ok) {
      //   // Handle success response
      //   showToast(resultJson?.message || "Registration successful!");
      //   navigator.navigate("Login");
      // } else {
      //   // Handle failure response
      //   showToast(
      //     resultJson?.message || "Registration failed. Please try again."
      //   );
      //   setIsError(true);
      // }
    } catch (error) {
      console.error("Registration Error:", error);

      // showToast("Email already exists. Please try again.");

      setIsError(true);
      console.log("data:" + JSON.stringify(data));
    } finally {
      setLoading(false);
    }
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
            <Text style={styles.headerText}>Registration</Text>
            <Text style={styles.headerTe}>Form</Text>

            <PaperProvider>
              <View
                style={[
                  styles.inputContainer,
                  {
                    alignItems: "center",
                  },
                ]}
              >
                <View style={styles.genderContainer}>
                  <Text style={styles.Gender}>Gender </Text>
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
                <View style={styles.dateContainer}>
                  <Text style={styles.Date}>Date of Birth </Text>
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

                <TextInput
                  style={styles.inputStyle}
                  mode="contained-tonal"
                  label="Enter Valid ID No."
                  placeholder="Enter valid ID number"
                  error={isError}
                  value={validID}
                  onChangeText={(text) => setvalidID(text)}
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                />

                <View>
                  <TouchableOpacity
                    style={[styles.uploadButton]}
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                  >
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                    <Text style={styles.uploadText}>Upload Valid ID Photo</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                  <View style={styles.checkboxWrapper}>
                    <View
                      style={{
                        transform: [{ scale: 0.8 }],
                        marginTop: -5,
                        marginBottom: -5,
                      }}
                    >
                      <Checkbox
                        status={termsAccepted ? "checked" : "unchecked"}
                        onPress={() => setTermsAccepted(!termsAccepted)}
                        color="black"
                      />
                    </View>
                  </View>
                  <Text style={styles.checkboxText}>
                    Agree with terms & conditions
                  </Text>
                </View>

                <Button
                  loading={loading}
                  disabled={loading}
                  style={styles.buttonStyle}
                  mode="contained"
                  onPress={handleRegistration}
                  labelStyle={{ color: "white", fontWeight: "bold" }}
                >
                  Register Account
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
                <View>
                  <Button
                    style={{ ...styles.goback }}
                    labelStyle={{ color: "#000" }}
                    onPress={() => {
                      navigator.goBack();
                    }}
                  >
                    Go Back
                  </Button>
                </View>
              </View>
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register2;
const styles = StyleSheet.create({
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
    marginTop: heightPercentageToDP("3%"),
    color: "#fff",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  headerTe: {
    marginTop: heightPercentageToDP("1%"),
    marginBottom: heightPercentageToDP("15%"),
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
