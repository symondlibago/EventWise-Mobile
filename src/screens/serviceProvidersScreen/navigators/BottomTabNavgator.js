import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  ServiceStackNavigator,
} from "../navigators/StackNavigator";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Platform.OS === "ios" ? 90 : 70,
    backgroundColor: "#ffffff",
  },
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
      return <Ionicons name={iconName} size={size} color={color} />;
    } else if (route.name === "Schedule") {
      iconName = focused ? "calendar" : "calendar-outline"; // Valid icon for Ionicons
      return <Ionicons name={iconName} size={size} color={color} />;
    } else if (route.name === "Events") {
      iconName = focused ? "event" : "event-available"; // Use valid MaterialIcon
      return <MaterialIcons name={iconName} size={size} color={color} />;
    } else if (route.name === "Others") {
      iconName = focused ? "clipboard" : "clipboard"; // Use valid Feather icon
      return <Feather name={iconName} size={size} color={color} />;
    }

    return null;
  },
  tabBarActiveTintColor: "#FCC42B",
  tabBarInactiveTintColor: "black",
});

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
      <Tab.Screen name="Events" component={EventStackNavigator} />
      <Tab.Screen name="Others" component={ServiceStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
