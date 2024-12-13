import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import AboutMe from "../screens/AboutMe";

import BottomTabNavigation from "./BottomTabNavigation";

// const Stack = createNativeStackNavigator();
// const ServiceProviderNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName="Main"
//     >
//       {/* <Stack.Screen name="Main" component={index} /> */}
//       <Stack.Screen name="Drawer" component={DrawerNavigations} />
//       {/* <Stack.Screen name="Main" component={BottomTabNavigation} /> */}
//     </Stack.Navigator>
//   );
// };
const Stack = createStackNavigator();

const ServiceProviderNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigation}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),
        // })}
      />
      <Stack.Screen name="AboutMe" component={AboutMe} />
    </Stack.Navigator>
  );
};

export default ServiceProviderNavigator;
