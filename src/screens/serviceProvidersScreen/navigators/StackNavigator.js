import React from "react";
import CreateServiceScreen from "../screens/ServiceTab/createServiceScreen";
import { createStackNavigator } from "@react-navigation/stack";

//Main Stack Home
import HomeSP from "../screens/HomeSP";

// Schedule Stack imports

import ProfileEditSP from "../screens/Drawer/ProfileEditSP";
import AboutMeSP from "../screens/AboutMeSP";
import ProfileSwitchSP from "../screens/Drawer/ProfileSwitchSP";
import MessageSP from "../screens/MessageSP";
import NotificationSP from "../screens/NotificationSP";
import EventsSP from "../screens/EventsSP";
import SchedSp from "../screens/SchedSP";
import EventDetailsSP from "../screens/EventDetailsSP";
import InventorySP from "../screens/InventorySP";
import EquipmentSP from "../screens/EquipmentSP";
import ServiceSP from "../screens/ServiceSP";
import ProfileSP from "../screens/ProfileSP";
import EditProfileSP from "../screens/EditProfileSP";
import AddAnotherAccSP from "../screens/AddAcountSP";
import SettingSP from "../screens/SettingsSP";
import ServicePortfolioSP from "../screens/ServicePortfolioSP";
import FeedbackSP from "../screens/FeedbackSP";
import CustomHeader from "../screens/CustomHeaderSP";
import SetSchedSP from "../screens/SetschedSP";
import ServiceCardDetails from "../screens/ServiceTab/ServiceCardDetails";
import ServiceDetails from "../screens/ServiceTab/ServiceCardDetails";
import EditServiceScreen from "../screens/ServiceTab/editServiceScreen";
import GuestList from "../screens/GuestSP";
import EquipmentInventory from "../screens/EquipmentInventory";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeSP" component={HomeSP} />
      <Stack.Screen name="EventDetailsSP" component={EventDetailsSP} />
      <Stack.Screen name="AboutMeSP" component={AboutMeSP} />
      <Stack.Screen name="MessageSP" component={MessageSP} />
      <Stack.Screen name="NotificationSP" component={NotificationSP} />
      <Stack.Screen name="InventorySP" component={InventorySP} />
      <Stack.Screen name="EquipmentSP" component={EquipmentSP} />
      <Stack.Screen
        name="EquipmentInventory"
        component={EquipmentInventory}
      />
      <Stack.Screen name="ProfileSP" component={ProfileSP} />
      <Stack.Screen name="EditProfileSP" component={EditProfileSP} />
      <Stack.Screen name="AddAnotherAccSP" component={AddAnotherAccSP} />
      <Stack.Screen name="SettingSP" component={SettingSP} />
      <Stack.Screen name="ServicePortfolioSP" component={ServicePortfolioSP} />
      <Stack.Screen name="FeedbackSP" component={FeedbackSP} />
      <Stack.Screen name="CustomHeader" component={CustomHeader} />
      <Stack.Screen name="EventsSP" component={EventsSP} />
      <Stack.Screen name="SetSchedSP" component={SetSchedSP} />
      <Stack.Screen name="GuestSP" component={GuestList} />
    </Stack.Navigator>
  );
};

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SchedSP" component={SchedSp} />
    </Stack.Navigator>
  );
};

// For drawer stack
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileEditSP" component={ProfileEditSP} />
      <Stack.Screen name="ProfileSwitchSP" component={ProfileSwitchSP} />
    </Stack.Navigator>
  );
};

const EventStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsSP" component={EventsSP} />
    </Stack.Navigator>
  );
};

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OptionsSP" component={OptionsSP} /> */}
      {/* <Stack.Screen name="SettingsSP" component={SettingsSP} /> */}
    </Stack.Navigator>
  );
};

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiceSP" component={ServiceSP} />
      <Stack.Screen name="ServiceCardDetails" component={ServiceDetails} />
      <Stack.Screen name="CreateService" component={CreateServiceScreen} />
      <Stack.Screen name="EditService" component={EditServiceScreen} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  ProfileStackNavigator,
  SettingStackNavigator,
  ServiceStackNavigator,
};
