import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  GroupStackNavigator,
  FeedbackStackNavigator,
} from "../navigators/StackNavigator";
import { Text } from "react-native";
const Tab = createBottomTabNavigator();
import styles from "../styles/styles";

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: true,
  tabBarStyle: styles.tabBarStyle,

  // to be put focused then lift
  // tabBarLabelStyle: {
  //   fontSize: 14, // Font size for the label
  //   bottom: 21, // This elevates the label upwards
  // },

  tabBarLabel: ({ children, color, focused }) => (
    <Text
      style={{
        color: focused ? "#eeba2b" : "black",
        fontSize: focused ? 14 : 13,
        fontWeight: focused ? "bold" : "normal",
        bottom: 21,
      }}
    >
      {children}
    </Text>
  ),
  tabBarActiveTintColor: "golden",
  tabBarInactiveTintColor: "gray",
  tabBarIcon: ({ focused, color, size }) => {
    const iconstyle = {
      position: "absolute",
      backgroundColor: focused ? "golden" : "white",
      // height: "100%",
      top: 14,
    };
    const colorIcon = focused ? "#eeba2b" : "black";
    const sizeIcon = focused ? 34 : 30;
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
      return (
        <Ionicons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Schedule") {
      iconName = focused ? "calendar" : "calendar-outline";
      return (
        <Ionicons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Event") {
      // Use MaterialCommunityIcons for this case
      iconName = focused ? "clipboard-list" : "clipboard-list-outline";
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Feedback") {
      iconName = focused
        ? "account-box-multiple"
        : "account-box-multiple-outline";
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    }
  },
});
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
      <Tab.Screen name="Event" component={EventStackNavigator} />
      <Tab.Screen name="Feedback" component={FeedbackStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
