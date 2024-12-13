// App.js

import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./sidebar";
import NavBar from "./nav";
import EditScreen from "./edit";
import Profile from "./profile";
import Settings from "./settings";
import Feedback from "./feedback";
import Inventory from "./inventory";
import Attendees from "./attendee";
import Dashboard from "./dashboard";
import Schedule from "./schedule";
import Createpackage from "./createpackage";
import ChooseServiceProv from "./chooseserviceprov";
import Package from "./package";
import Equipment from "./equipment";
import Portfolio from "./portfolio";
import ServicePortfolio from "./serviceportfolio";
import EditProfile from "./editprofile";
import AddAnotherAcc from "./addanotheracc";
import CreateSchedule from "./createsched";
import Group from "./group";
import GroupAttendees from "./groupattendees";
import Messages from "./messages";
import Notification from "./notification";

const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Burger icon to open sidebar */}

      <Dashboard />
      <NavBar />
    </View>
  );
};

const Index = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="EditScreen"
        component={EditScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Inventory"
        component={Inventory}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Attendees"
        component={Attendees}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Createpackage"
        component={Createpackage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ChooseServiceProv"
        component={ChooseServiceProv}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Package"
        component={Package}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Equipment"
        component={Equipment}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Event"
        component={Package}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ServicePortfolio"
        component={ServicePortfolio}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="AddAnotherAcc"
        component={AddAnotherAcc}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="CreateSchedule"
        component={CreateSchedule}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Group"
        component={Group}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="GroupAttendees"
        component={GroupAttendees}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default Index;
