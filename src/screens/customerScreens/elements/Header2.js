import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "./SidebarMenu";
import { useNavigation } from "@react-navigation/native";

const Header2 = ({ onBackPress, showBackButton }) => {
  const navigation = useNavigation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleSidebar} style={styles.dropdownButton}>
          <Icon name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../../../assets/ew.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("InboxView");
            }}
            style={styles.iconMessage}
          >
            <Icon name="chatbubble-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
            style={styles.iconButton}
          >
            <Icon name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Image
        source={require("../pictures/line.png")}
        style={styles.line}
        resizeMode="contain"
      />
      {/* Sidebar Menu */}
      <SidebarMenu visible={isSidebarVisible} onClose={toggleSidebar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    zIndex: 1,
    marginTop: -20,
  },
  backButton: {
    position: "absolute",
    marginTop: 35,
    left: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  dropdownButton: {
    padding: 10,
  },
  logo: {
    flex: 1,
    height: "120%",
    resizeMode: "contain",
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row", // Ensures horizontal alignment
    alignItems: "center",
    marginLeft: "auto", // Aligns the icons to the right
  },
  iconMessage: {
    padding: 10,
  },
  iconButton: {
    padding: 10,
  },
});


export default Header2;
