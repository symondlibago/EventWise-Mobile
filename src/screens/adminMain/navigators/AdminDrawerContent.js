import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, BackHandler } from "react-native";
import { Linking } from "react-native";
import logo from "../../../../assets/logo.png";
import profilepic from "../../../../assets/profilepic.jpg";
import logoWhite from "../../../../assets/logoWhite.png";
import { Avatar } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import useStore from "../../../stateManagement/useStore";
const AdminDrawerContent = (props) => {
  const { userName } = useStore();
  const { selectedDrawerScreen, setSelectedDrawerScreen } = useStore();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const DrawerItem = ({ iconComponent, label, screenName }) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        screenName === selectedDrawerScreen && { backgroundColor: "#FFC42B" },
      ]}
      onPress={() => {
        switch (screenName) {
          case "HomeAdmin":
            setSelectedDrawerScreen(screenName);
            navigation.navigate("HomeAdmin");
            break;
          case "Attendee Tracker":
            setSelectedDrawerScreen(screenName);
            navigation.navigate("Attendee Tracker");
            break;
          case "Inventory Tracker":
            setSelectedDrawerScreen(screenName);
            navigation.navigate("Inventory Tracker");
            break;
          case "GroupAdmin":
            setSelectedDrawerScreen(screenName);
            navigation.navigate("GroupAdmin");
            break;
          case "AboutAdmin":
            setSelectedDrawerScreen(screenName);
            navigation.navigate("AboutAdmin");
            break;
          default:
            break;
        }
      }}
    >
      {/* <MaterialCommunityIcons
        name={icon}
        size={24}
        color={screenName === selectedDrawerScreen ? "black" : "dark-gray"}
        style={styles.drawerIcon}
      /> */}
      {iconComponent}
      <Text
        style={[
          styles.drawerItemText,
          { color: screenName === selectedDrawerScreen ? "white" : "black" },
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
      colors={["#FFFF", "#FFC42B"]}
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 2.1 }} // Bottom
      style={styles.drawerContent}
    >
      {/* <View style={styles.drawerSeparator} /> */}
      <View style={styles.drawerHeader}>
        <Image source={logoWhite} style={styles.logo} resizeMode="center" />
      </View>
      <View style={styles.userInfo}>
        <Avatar.Image
          size={50}
          source={profilepic}
          style={styles.profilePicture}
        />
        <TouchableOpacity
          style={styles.userInfoTop}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.userName}>{userName}</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="black"
              style={styles.userInfoIcon}
            />
          </View>

          <Text style={styles.userRole}>Admin</Text>
        </TouchableOpacity>
        {/* Switch profile section */}
      </View>

      <DrawerContentScrollView
        {...props}
        style={{
          display: "flex",
          flex: 1,
          marginTop: -5,
        }}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItem
          label="Home"
          iconComponent={
            <Ionicons
              name={
                selectedDrawerScreen === "HomeAdmin" ? "home" : "home-outline"
              }
              size={24}
              color={
                selectedDrawerScreen === "HomeAdmin" ? "black" : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          icon={"view-dashboard"}
          screenName={"HomeAdmin"}
          onPress={() => props.navigation.navigate("HomeAdmin")}
        />
        <DrawerItem
          label="Attendee Tracker"
          iconComponent={
            <Ionicons
              name={
                selectedDrawerScreen === "Attendee Tracker"
                  ? "people-circle-sharp"
                  : "people-circle-outline"
              }
              size={24}
              color={
                selectedDrawerScreen === "Attendee Tracker"
                  ? "black"
                  : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          onPress={() =>
            props.navigation.navigate("AtendeeTrackerStackNavigator")
          }
          screenName={"Attendee Tracker"}
          icon={"people-group"}
        />
        <DrawerItem
          label="Equipment Tracker"
          iconComponent={
            <MaterialCommunityIcons
              name={
                selectedDrawerScreen === "Inventory Tracker"
                  ? "toolbox"
                  : "toolbox-outline"
              }
              size={24}
              color={
                selectedDrawerScreen === "Inventory Tracker"
                  ? "black"
                  : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          screenName={"Inventory Tracker"}
          onPress={() => props.navigation.navigate("OptionsSP")}
        />
        <DrawerItem
          label="GroupAdmin"
          iconComponent={
            <MaterialIcons
              name={selectedDrawerScreen === "GroupAdmin" ? "groups" : "groups"}
              size={24}
              color={
                selectedDrawerScreen === "GroupAdmin" ? "black" : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          screenName={"GroupAdmin"}
          onPress={() => props.navigation.navigate("GroupAdmin")}
        />
        <DrawerItem
          label="AboutAdmin"
          iconComponent={
            <AntDesign
              name={
                selectedDrawerScreen === "AboutAdmin"
                  ? "exclamationcircle"
                  : "exclamationcircleo"
              }
              size={24}
              color={
                selectedDrawerScreen === "AboutAdmin" ? "black" : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          screenName={"AboutAdmin"}
          onPress={() => props.navigation.navigate("AboutAdmin")}
        />
      </DrawerContentScrollView>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <DropdownItem
            icon="person"
            label="Profile"
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("ProfileAdmin");
              // console.log("Profile");
            }}
          />
          <DropdownItem
            icon="settings"
            label="Settings"
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("SettingsAdmin");
              // console.log("Settings");
            }}
          />
          <DropdownItem
            icon="log-out"
            label="Logout"
            onPress={() => {
              setDropdownVisible(false);
              Alert.alert("Logged Out Successfully!");
              navigation.navigate("Login"); // navigate to a different screen
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          />
        </View>
      )}
      {/* Footer Content */}

      <View style={styles.sidebarFooter}>
        <Text style={{ ...styles.footerText, color: "black" }}>
          Version 1.0.0
        </Text>
        {/* <View style={styles.socialIcons}>
          <Ionicons name="logo-facebook" size={24} color="#3b5998" />
          <Ionicons name="logo-twitter" size={24} color="#00acee" />
          <Ionicons name="logo-instagram" size={24} color="#C13584" />
        </View> */}
        <Text style={{ ...styles.footerText, color: "black" }}>
          © 2024{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            EventWise
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AdminDrawerContent;
