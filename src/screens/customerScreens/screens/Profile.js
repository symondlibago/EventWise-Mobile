import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../elements/Header";
import useStore from "../../../stateManagement/useStore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../../constants/constant";
import { useNavigation } from "@react-navigation/native";
import { getUser} from "../../../services/authServices";


const Profile = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const navigator = useNavigation();
  const switchProfile = useStore((state) => state.switchProfile);
  const activeProfile = useStore((state) => state.activeProfile);
  const [user, setUser] = useState(null);
  const accountProfiles = useStore((state) => state.accountProfiles);
  

  const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      Accept: "application/json",
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();  // Assuming this function returns user data
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateProfile = async () => {
    try {
      const response = await api.post("auth/createProfileServiceProvider", {
        service_provider_name: serviceName,
        description: description,
      });
      Alert.alert("Success", "Service provider profile created successfully!");
      setServiceName("");
      setDescription("");
      setModalVisible(false); // Close modal after successful submission
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create service provider profile."
      );
    }
  };

  const handleSwitchProfile = (profile) => {
    try {
      switchProfile(profile.role_id);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
      <View style={styles.profileBox}>
  {/* Check if user is not null before accessing its properties */}
  {user ? (
    <>
      <Image
        source={require("../pictures/user.png")}
        style={styles.profilePicture}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.phone}>{user.phone_number}</Text>
      <Text style={styles.username}>
        {activeProfile && activeProfile === 2 ? "Customer" : "Service Provider"}
      </Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigator.navigate("EditProfile")}
      >
        <FontAwesome name="pencil-square" size={16} color={"#fff"} />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </>
  ) : (
    // You can show a loading indicator or a placeholder message here
    <Text>Loading...</Text>
  )}
</View>

        
        <View style={styles.switchAccountContainer}>
        <Text style={styles.header}>Switch Account</Text>

        {accountProfiles.map((profile) => (
            <TouchableOpacity
              key={profile.role_id}
              style={styles.profileContainer}
              onPress={() => handleSwitchProfile(profile)}
            >
              <View style={styles.row}>
                <Text style={styles.profileName}>{profile.service_provider_name}</Text>
                <View
                  style={[
                    styles.circle,
                    activeProfile === profile.role_id && styles.filledCircle,
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}


                 <TouchableOpacity
          style={styles.addProfileButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plus-circle" size={24} color="#fff" />
          <Text style={styles.addProfileText}>Create New Profile</Text>
        </TouchableOpacity>
        </View>

 
      </View>

      {/* Modal for Creating New Profile */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Create New Profile</Text>
            <Text style={styles.label}>Service Provider Name</Text>
            <TextInput
              style={styles.input}
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="Enter service provider name"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreateProfile}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  profileBox: {
    borderColor: "#C2B067",
    borderWidth: 2,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
    top: 50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    position: "absolute",
    top: -50,
  },
  name: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  switchProfileButton: {
    top: 70,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchProfileText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#eeba2b",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  addProfileButton: {
    marginTop: 20,
    backgroundColor: "#eeba2b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center"
  },
  addProfileText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  profileContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 300,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  switchAccountContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8, // Optional, for rounded corners
    padding: 15, // Optional, for spacing inside the container
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 5, // Shadow for Android
    backgroundColor: "#fff", // Required to make shadow visible
    marginVertical:90,
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment
    justifyContent: "space-between", // Ensures spacing between name and circle
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    marginLeft: 10, // Adds space between the name and circle
  },
  filledCircle: {
    backgroundColor: "#eeba2b", // Fill color when selected
  },
  
  
});

export default Profile;