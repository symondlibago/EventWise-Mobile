import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient
import styles from "./style";
import logo from "./assets/logo.png";

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState("Home");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const DrawerItem = ({ icon, label, screenName }) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        screenName === selectedItem && { backgroundColor: "#FFC42B" },
      ]}
      onPress={() => {
        if (screenName === "Events") {
          navigation.navigate("MyEventScreen");
          setSelectedItem(screenName);
        } else {
          navigation.navigate(screenName);
          setSelectedItem(screenName);
        }
      }}
    >
      <Ionicons
        name={icon}
        size={24}
        color={screenName === selectedItem ? "black" : "white"}
        style={styles.drawerIcon}
      />
      <Text
        style={[
          styles.drawerItemText,
          { color: screenName === selectedItem ? "black" : "white" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const DropdownItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={20}
        color="black"
        style={styles.dropdownIcon}
      />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#2A2600", "#000000"]} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }} // Bottom
      style={styles.drawerContent}
    >
      <View style={styles.drawerHeader}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.drawerSeparator} />
      <View style={styles.drawerItemsContainer}>
        <DrawerItem icon="grid" label="Dashboard" screenName="Dashboard" />
        <DrawerItem
          icon="person"
          label="Attendee Tracker"
          screenName="Package"
        />
        <DrawerItem
          icon="archive"
          label="Inventory Tracker"
          screenName="Package"
        />
        <DrawerItem
          icon="chatbubble-ellipses"
          label="Feedback"
          screenName="Feedback"
        />
      </View>
      <View style={styles.flexibleSpace} />
      <View style={styles.userInfo}>
        <TouchableOpacity
          style={styles.userInfoTop}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.userName}>Avril Carasco</Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color="white"
            style={styles.userInfoIcon}
          />
        </TouchableOpacity>
        <Text style={styles.userRole}>Admins</Text>
        {/* Switch profile section */}
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <DropdownItem
              icon="person"
              label="Profile"
              onPress={() => {
                setDropdownVisible(false);
                navigation.navigate("Profile");
              }}
            />
            <DropdownItem
              icon="settings"
              label="Settings"
              onPress={() => {
                setDropdownVisible(false);
                navigation.navigate("Settings");
              }}
            />
            <DropdownItem
              icon="log-out"
              label="Logout"
              onPress={() => {
                setDropdownVisible(false);
                // Handle logout functionality here
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Content</Text>
      </View>
    </LinearGradient>
  );
};

export default CustomDrawerContent;
