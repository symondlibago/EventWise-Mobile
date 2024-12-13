import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header2 from "../elements/Header2";

const ProfileOrganizer = () => {
  const navigator = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        const storedBirthday = await AsyncStorage.getItem("birthday");
        const storedProfilePicture = await AsyncStorage.getItem("profilePicture");

        setUsername(storedUsername || "Customer Name");
        setEmail(storedEmail || "My Email");
        setPhoneNumber(storedPhoneNumber || "My Phone number");
        setBirthday(storedBirthday || "My Birthday");
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          <View style={styles.userProfile}>
              <Image source={require("../pictures/adminProf.png")}  style={styles.avatarImage} />
            <Text style={styles.userName}>Admin Name</Text>
            <Text style={styles.userName}>admin@gmail.com</Text>
            <Text style={styles.userName}>09123456789</Text>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </View>

          <View style={styles.admintime}>
            <Text style={styles.timeo}>Time Open: 8:00 am</Text>
            <Text style={styles.timeo}>Time Close: 8:00 pm</Text>
          </View>
        </View>

        <Text style={styles.venueTitle}>Popular Services</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.packageList}>
            <Image source={require("../pictures/s1.png")} style={styles.packageImage} />
            <Image source={require("../pictures/s2.png")} style={styles.packageImage} />
            <Image source={require("../pictures/s3.png")} style={styles.packageImage} />
        </ScrollView>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  userProfile: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: -90,
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    color: "#000",
  },
  admintime: {
    alignItems: "flext-start",
    marginTop: -9,
  },
  timeo: {
    marginTop: 6,
    fontSize: 16,
    color: "#000",
  },
  line: {
    marginTop: 8,
  },
  lineSec: {
    marginTop: 25,
  },
  editButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 30,
    position: "relative",
    flexDirection: "row",
    width: 170,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  box: {
    borderWidth: 1.5,
    borderColor: "#d9cda0",
    backgroundColor: '#f2eee1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    top: 70,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#000", 
    fontWeight: "bold",
    marginVertical: 20,
  },
  venueTitle: {
    fontSize: 20,
    color: "#000",
    marginTop: 80,
  },
  packageList: {
    marginVertical: 10,
    marginLeft: -30,
  },
  packageImage: {
    width: 300,
    height: 250,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: -70,
  },
});

export default ProfileOrganizer;
