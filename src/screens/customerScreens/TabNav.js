import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Notifications from "expo-notifications"; // Import Expo notifications
import { Audio } from "expo-av"; // Import Expo Audio
import FlashMessage, { showMessage } from "react-native-flash-message";

import Home from "./screens/Home";
import Event from "./screens/Event";
import Schedule from "./sidebarScreens/Schedule";
import BookStackScreen from "./BookStackScreen";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const notificationListener = useRef(null); // Track notification listener

  // Function to play a custom notification sound
  const playNotificationSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/audio/sword-sound-effect-2-234986.mp3") // Replace with your sound file path
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  };

  useEffect(() => {
    // Add a notification listener
    if (!notificationListener.current) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          const { title, body } = notification.request.content;
          console.log("Foreground notification:", title, body);

          // Play notification sound
          playNotificationSound();

          // Show notification using FlashMessage
          showMessage({
            message: title,
            description: body,
            type: "info",
            icon: "default",
            duration: 5000, // Duration in milliseconds
          });
        });
    }

    // Cleanup listener on component unmount
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
        notificationListener.current = null;
      }
    };
  }, []);

  const getIconName = (routeName) => {
    switch (routeName) {
      case "Home":
        return "home-outline";
      case "Schedule":
        return "calendar-clock-outline";
      case "Event":
        return "calendar-text-outline";
      case "Book":
        return "bookmark-box-multiple";
      default:
        return "help";
    }
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = getIconName(route.name);
            const isHovered = hoveredTab === route.name;
            const tabColor = focused || isHovered ? "#eeba2b" : color;

            return (
              <View
                style={{ width: "100%", alignItems: "center" }}
                onMouseEnter={() => setHoveredTab(route.name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {focused && (
                  <View
                    style={{
                      marginTop: 5,
                      height: 3,
                      width: "50%",
                      backgroundColor: "#eeba2b",
                      borderRadius: 30,
                    }}
                  />
                )}
                {route.name === "Home" ? (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={tabColor}
                    style={{ paddingTop: 5 }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={tabColor}
                    style={{ paddingTop: 5 }}
                  />
                )}
              </View>
            );
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            padding: 5,
            height: 70,
            zIndex: 8,
          },
          headerShown: false,
          tabBarLabel: ({ focused, color }) => {
            const isHovered = hoveredTab === route.name;
            const labelColor = focused || isHovered ? "#eeba2b" : color;

            return (
              <Text
                style={{
                  color: labelColor,
                  fontSize: focused ? 16 : 16,
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  marginBottom: 5,
                }}
                onMouseEnter={() => setHoveredTab(route.name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {route.name}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Event" component={Event} />
        <Tab.Screen name="Book" component={BookStackScreen} />
      </Tab.Navigator>
      <FlashMessage
        position="top"
        titleStyle={styles.flashMessageTitle} // Custom styles for the title
        style={styles.flashMessageContainer} // Custom container style
        descriptionStyle={styles.flashMessageDescription} // Custom description style
      />
    </>
  );
};

const styles = StyleSheet.create({
  flashMessageContainer: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    flexDirection: "row",
    alignItems: "center", // Centering the icon and text
    justifyContent: "space-between",
    backgroundColor: "#4CAF50", // Optional background color for flash message
  },
  flashMessageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // White color for the title
  },
  flashMessageDescription: {
    fontSize: 14,
    color: "#ffffff", // White color for the description text
  },
});

export default TabNav;
