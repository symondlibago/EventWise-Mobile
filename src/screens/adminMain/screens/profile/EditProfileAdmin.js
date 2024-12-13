import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getUser, updateUser } from "../../../../services/authServices"; // Add updateUser function

const EditProfileAdmin = () => {
  const navigation = useNavigation();

  // States for user data
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setEmail(userData.email || "");
        setUsername(userData.username || "");
        setPhoneNumber(userData.phone_number || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      const updatedData = { email, username, password, phone_number };
      await updateUser(updatedData); // Call the update API
      Alert.alert("Success", "Profile updated successfully");
      navigation.navigate("MyProfileAdmin"); // Navigate back to the profile page
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("MyProfileAdmin")}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require("../../../../../assets/profilepic.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>
        <View style={styles.line} />

        <Text style={styles.settingText}>Account Details</Text>
        <View style={styles.content}>
          <Text style={styles.settingsText}>Edit Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.settingsText}>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.settingsText}>Change Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new Password"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.settingsText}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Phone Number"
            placeholderTextColor="white"
            value={phone_number}
            onChangeText={setPhoneNumber}
          />

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Ensure scrollability
    padding: 20,
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Space below the header
  },
  backButton: {
    marginRight: 10, // Space between button and text
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Set text color to black
    flex: 1, // Take remaining space to center
    textAlign: 'center', // Center the text
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
    backgroundColor: '#FFFFFF', // White fading effect
  },
  content: {
    paddingBottom: 100, // Adds extra padding to ensure scrolling past the bottom buttons
  },
  settingsText: {
    fontSize: 15,
    color: '#000000', // Set text color to black
    marginVertical: 10,
  },
  settingText: {
    fontSize: 20,
    color: '#000000', // Set text color to black
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: '#c2b067',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    color: 'white', // Set text color to white
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    shadowColor: '#000000', // Add shadow for visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    color: '#000000', // Set text color to black
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#000000', // Set text color to black
  },
  submitButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  createPortfolioButton: {
    backgroundColor: '#FFC42B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createPortfolioText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EditProfileAdmin;
