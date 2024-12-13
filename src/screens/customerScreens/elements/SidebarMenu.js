import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SidebarMenu = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [hoveredOption, setHoveredOption] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedProfilePicture = await AsyncStorage.getItem(
          "profilePicture"
        );

        setUsername(storedUsername || "Customer");
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const handlePress = (screen, item) => {
    setActiveOption(item);
    onClose();
    if (item === "Logout") {
      navigation.navigate("Landing");
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["#FFF", "#FFC42B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.sidebar}
        >
          <View style={styles.closeButton} onTouchStart={onClose}>
            <Icon name="close" size={25} color="#000" />
          </View>

          <View style={styles.drawerHeader}>
          <View style={styles.userProfile}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("../pictures/user.png")
              }
              style={styles.accountImage}
            />
          </View>

          <View style={styles.drawerInfo}>
            <Text style={styles.userName}>{username}</Text>
            <Text style={styles.userRole}>Customer</Text>
          </View>
        </View>


          {["Profile", "Settings", "About", "Logout"].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  hoveredOption === item && styles.optionHovered,
                  activeOption === item && styles.optionActive,
                ]}
                onPress={() =>
                  handlePress(item === "Logout" ? "Landing" : item, item)
                }
                onPressIn={() => setHoveredOption(item)}
                onPressOut={() => setHoveredOption(null)}
              >
                <Ionicons
                  name={getIconName(item)}
                  size={24}
                  color={
                    activeOption === item || hoveredOption === item
                      ? "#FFF"
                      : "#000"
                  }
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.text,
                    (activeOption === item || hoveredOption === item) && {
                      color: "#FFF",
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}

          <View style={styles.divider} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
            <Text style={styles.footerText}>
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                EventWise
              </Text>{" "}
              © 2024
            </Text>
            <Text style={styles.footerText}>
              Powered by{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                EventTech
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const getIconName = (item) => {
  switch (item) {
    case "Profile":
      return "person";
    case "Settings":
      return "settings";
    case "About":
      return "information-circle";
    case "Logout":
      return "log-out-outline";
    default:
      return "help";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "70%",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#FFC42B",
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    zIndex: 1,
    marginTop: -20,
    marginLeft: -5,
  },
  drawerHeader: {
    flexDirection: "row", // Aligns the profile picture and text horizontally
    alignItems: "center", // Centers the items vertically in the row
    marginBottom: 40,
  },
  userProfile: {
    marginRight: 15, // Adds space between the profile picture and the text
  },
  accountImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Ensures the image is circular
  },
  drawerInfo: {
    flexDirection: "column", // Aligns the text vertically
  },
  drawer2: {
    marginLeft: 40,
    marginTop: 40,
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  userRole: {
    fontSize: 16,
    color: "#8d8d8d",
    fontFamily: "Poppins",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionHovered: {
    backgroundColor: "#eeba2b",
    borderColor: "#eeba2b",
    borderWidth: 1,
    width: "70%",
  },
  optionActive: {
    backgroundColor: "#eeba2b",
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  divider: {
    marginTop: 130,
    height: 1,
    backgroundColor: "#9a9a9a",
    marginVertical: 10,
  },
  footer: {
    alignItems: "center",
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#8d8d8d",
    fontFamily: "Poppins",
  },
});

export default SidebarMenu;
