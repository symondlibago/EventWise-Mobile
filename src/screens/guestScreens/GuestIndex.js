import { View, Text } from "react-native";
import React from "react";
import HomeGuest from "./screen/HomeGuest";
import FeedbackGuest from "./screen/FeedbackGuest";
import { createStackNavigator } from "@react-navigation/stack";

const GuestIndex = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeGuest" component={HomeGuest} />
      <Stack.Screen name="FeedbackGuest" component={FeedbackGuest} />
    </Stack.Navigator>
  );
};

export default GuestIndex;
