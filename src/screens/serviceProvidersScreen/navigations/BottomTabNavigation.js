import { View, Text, Platform } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "../screens/Main/Home";
import Events from "../screens/Events";
import Schedule from "../screens/Schedule";
import Profile from "../screens/Profile";

import { Drawer } from "react-native-paper";
const Tab = createBottomTabNavigator();
const screenOptions = {
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
};
// const BottomTabNavigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (route.name === "Events") {
//             iconName = focused ? "list" : "list-outline";
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "golden",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={Home} options={screenOptions} />
//       <Tab.Screen name="Events" component={Events} options={screenOptions} />
//     </Tab.Navigator>
//   );
// };
const HomeTabNavigator = createBottomTabNavigator();
export const BottomTabNavigation = () => {
  return (
    <HomeTabNavigator.Navigator>
      <HomeTabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <HomeTabNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />
      <HomeTabNavigator.Screen
        name="Settings"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </HomeTabNavigator.Navigator>
  );
};
export default BottomTabNavigation;
