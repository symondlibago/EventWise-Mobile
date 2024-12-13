import React, { useContext } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Platform,
  View,
  Alert,
} from "react-native";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { AuthContext } from "../../services/authContext";
import { getUser } from "../../services/authServices";
import { getAccountProfile } from "../../services/authServices";
import useStore from "../../stateManagement/useStore";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// forb test

const Login = ({ navigation }) => {
  const navigator = useNavigation();
  const [HideEntry, setHideEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const setUserId = useStore((state) => state.setUserId);
  const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const setUser = useStore((state) => state.setUser);
  const CustomIcon = ({ name, size, color }) => {
    return <Icon name={name} size={size} color={color} />;
  };

  // symon
  // const navigateBasedOnRole = (role) => {
  //   if (role === "service provider") {
  //       navigation.navigate('ServiceProviderStack');
  //   } else if (role === "admin") {
  //       // navigate to the admin page
  //   } else if (role === "client") {
  //       // navigate to the client page
  //   } else {
  //       // handle unknown role or default case
  //       showToast("Unknown role");
  //   }
  const navigateBasedOnRole = (role_id) => {
    try {
      if (role_id === 1) {
        console.log("Navigating to CustomAdminStack...");
        navigation.navigate("CustomAdminStack");
        Toast.show("User logged in successfully", 3000);
        Alert.alert("Welcome!", "You are now logged in as an Admin.");
      } else if (role_id === 2) {
        console.log("Navigating to CustomCustomerStack...");
        navigation.navigate("CustomCustomerStack");
        Toast.show("User logged in successfully", 3000);
        Alert.alert("Welcome!", "You are now logged in as a Customer.");
      } else if (role_id === 3) {
        console.log("Navigating to ServiceProvider...");
        navigation.navigate("ServiceProviderStack");
        Toast.show("User logged in successfully", 3000);
        Alert.alert("Welcome!", "You are now logged in as a Service Provider.");
      } else if (role_id === 4) {
        console.log("Navigating to GuestStack...");
        navigation.navigate("GuestStack");
        Toast.show("User logged in successfully", 3000);
        Alert.alert("Welcome!", "You are now logged in as a Guest.");
      } else {
        Toast.show("Role invalid", 3000);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      Toast.show("Error occured during login", 3000);
    }
  };
  // React.useEffect(() => {
  //   if (activeProfile) {
  //     navigateBasedOnRole(activeProfile);
  //   }
  // }, [activeProfile]);
  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!username || !password) {
        Toast.show("Please input required data", 3000);
        setIsError(true);
        return;
      }

      const result = await signIn(username, password);
      Toast.show(result?.message, 3000);

      // Store the token in AsyncStorage

      const user = await getUser();
      setUserId(user.id); // Set the user ID globally
      const response = await getAccountProfile();
      const userProfiles = response.data.filter(
        (profile) => profile.user_id === user.id
      );

      // Set profiles and active profile
      // console.log("Login response: " + JSON.stringify(response));
      // console.log(Boolean(response));

      // setActiveProfile(userProfiles[0].role_id);
      // // Navigate based on the role directly
      // navigateBasedOnRole(userProfiles[0].role_id);
      // setUser(
      //   userProfiles[0].role_id === 2
      //     ? setUser(userProfiles[0].service_provider_name)
      //     : setUser(userProfiles[1].service_provider_name)
      // );
      if (userProfiles.length > 0) {
        // Set the active profile and navigate based on role
        const activeProfile = userProfiles[0]; // Assuming the first profile is the active one
        setActiveProfile(activeProfile.role_id);
        setUserId(user.id); // `setUserId` updates the global state with the current user ID

        navigateBasedOnRole(activeProfile.role_id);

        // Set user based on role_id
        if (activeProfile.role_id === 2) {
          setUser(activeProfile.service_provider_name); // For role 2, set the user to service provider name
        } else if (userProfiles.length > 1) {
          setUser(userProfiles[1].service_provider_name); // For other roles, use the second profile if available
        } else {
          // Default or fallback, you can handle cases where there’s no valid profile
          setUser("Default User Name");
        }
      } else {
        console.error("No profiles found for this user.");
        // Handle the case where no profiles are found (maybe show an error message)
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show("An error occured during Login", 3000);
    } finally {
      setLoading(false);
    }
  };

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  return (
    <PaperProvider>
      <ImageBackground
        source={require("../customerScreens/pictures/authbg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
            // keyboardVerticalOffset={
            //   Platform.OS === "ios" ? 0 : heightPercentageToDP("15%")
            // }
            keyboardVerticalOffset={heightPercentageToDP("-25%")}
            enabled
          >
            <SafeAreaView style={styles.welcome}>
              <Text
                variant="headlineMedium"
                style={{
                  fontSize: widthPercentageToDP("9%"),
                  color: "#fff",
                  marginBottom: heightPercentageToDP("15%"),
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                Login
              </Text>
            </SafeAreaView>

            <SafeAreaView
              style={{ ...styles.input, gap: heightPercentageToDP("1%") }}
            >
              <TextInput
                style={styles.inputStyle}
                mode="contained-tonal"
                label="Email"
                placeholder="Enter your email"
                inputMode="username"
                value={username}
                error={isError}
                onChangeText={(text) => {
                  setUsername(text);
                }}
                theme={{
                  colors: {
                    primary: "#000",
                    text: "#000",
                    placeholder: "#000",
                    label: "#000",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="account" size={24} color="black" />
                    )}
                  />
                }
              />
              <TextInput
                mode="contained-tonal"
                style={styles.inputStyle}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
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
                theme={{
                  colors: {
                    primary: "#000",
                    text: "#000",
                    placeholder: "#000",
                    label: "#000",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="lock" size={24} color="black" />
                    )}
                  />
                }
              />
              <View style={styles.forgotPasswordContainer}>
                <Text style={{ color: "black" }}>Forgot Password? </Text>
                <Button
                  labelStyle={{ color: "#EEBA2B" }}
                  onPress={() => {
                    navigator.navigate("AccountRecovery");
                  }}
                >
                  Recover
                </Button>
              </View>
              <Button
                style={{ ...styles.buttonStyle, backgroundColor: "#EEBA2B" }}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                labelStyle={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: widthPercentageToDP("4%"),
                }}
              >
                Login
              </Button>

              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                }}
              >
                <Text style={{ color: "black" }}>Not a member? </Text>
                <Button
                  mode="text"
                  labelStyle={{ color: "#EEBA2B" }}
                  onPress={() => {
                    navigator.navigate("Register");
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  Register Now
                </Button>
              </SafeAreaView>
              <View>
                <Button
                  style={{ ...styles.goback }}
                  labelStyle={{ color: "#000" }}
                  onPress={() => {
                    // navigator.navigate("AdminStack");
                    navigator.navigate("Landing");
                  }}
                >
                  Go Back
                </Button>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: heightPercentageToDP("8%"),
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("100%"),

    position: "absolute",
  },
  logo: {
    top: heightPercentageToDP("5%"),
  },
  welcome: {
    top: heightPercentageToDP("-5%"),
  },
  input: {
    marginBottom: heightPercentageToDP("12%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("3%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  buttonStyle: {
    width: widthPercentageToDP("50%"),
    height: heightPercentageToDP("6%"),
    marginBottom: heightPercentageToDP("5%"),
    marginTop: heightPercentageToDP("-10%"),
    alignSelf: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("10%"),
    marginTop: -15,
  },
});

export default Login;