import { View, Text, Platform } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../screens/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "../screens/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabNavigation from "./BottomTabNavigation";
import ServiceProviderNavigator from "./ServiceProviderNavigator";
const AppDrawer = createDrawerNavigator();
import DrawerItem from "@react-navigation/drawer";

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       {" "}
//       <DrawerItem
//         label="Home"
//         onPress={() => props.navigation.navigate("Home")}
//       />
//       <DrawerItem
//         label="Profile"
//         onPress={() => props.navigation.navigate("Profile")}
//       />
//       <DrawerItem
//         label="Settings"
//         onPress={() => props.navigation.navigate("Settings")}
//       />
//     </DrawerContentScrollView>
//   );
// }
// const DrawerNavigations = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => {
//         return (
//           <SafeAreaView>
//             <View
//               style={{
//                 height: 200,
//                 width: "100%",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "#FFC42B",
//               }}
//             ></View>
//             <DrawerItemList {...props} />
//           </SafeAreaView>
//         );
//       }}
// screenOptions={{
//   drawerStyle: {
//     backgroundColor: "white",
//     width: Platform.OS === "ios" ? 240 : 280,
//   },
//   drawerIcon: ({ focused, color, size }) => {
//     let iconName;
//     if (focused) {
//       iconName = "home";
//     } else {
//       iconName = "home-outline";
//     }
//     return <Ionicons name={iconName} size={size} color={color} />;
//   },
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={BottomTabNavigation}
//         options={{ headerShown: false }}
//       />
//       <Drawer.Screen name="Profile" component={Profile} />
//       {/* <Drawer.Screen name="BottomTabs" component={BottomTabNavigation} /> */}
//     </Drawer.Navigator>
//   );
// };
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
    </DrawerContentScrollView>
  );
}
const DrawerNavigations = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <AppDrawer.Screen name="Stack" component={ServiceProviderNavigator} />
    </AppDrawer.Navigator>
  );
};
export default DrawerNavigations;
