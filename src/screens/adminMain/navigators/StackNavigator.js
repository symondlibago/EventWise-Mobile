import React from "react";
import EditPackageScreen from "../screens/package/EditPackageScreen";
import CreatePackageScreen from "../screens/package/CreatePackageScreen";
import FeedbackDetail from "../screens/feedback/FeedbackDetail";
import PackageCardDetails from "../screens/package/PackageCardDetails";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEventScreen from "../screens/event/CreateEventScreen";
//Main Stack Home
import HomeAdmin from "../screens/home/HomeAdmin";
import MessagesAdmin from "../screens/home/MessagesAdmin";
import NotificationAdmin from "../screens/home/NotificationAdmin";
import ScheduleAdmin from "../screens/schedule/ScheduleAdmin";
import FeedbackAdmin from "../screens/feedback/FeedbackAdmin";
import Notifications from "../screens/notification/Notifications";

import AboutAdmin from "../screens/about/AboutAdmin";
// Schedule Stack imports

// event stack imports
import EventAdmin from "../screens/event/EventAdmin";
import ProfileAdmin from "../screens/profile/ProfileAdmin";
import AttendeeAdmin from "../screens/attendee/AttendeeAdmin";
import Attendees from "../screens/attendee/Attendees";
import InventoryAdmin from "../screens/inventory/InventoryAdmin";
import EventFeedbackDetails from "../screens/feedback/EventFeedbackDetails";
import EditProfileAdmin from "../screens/profile/EditProfileAdmin";
import AddAccountScreenAdmin from "../screens/profile/AddAccountScreenAdmin";
import EventBookingDetails from "../screens/event/EventBookingDetails";
import SettingsAdmin from "../screens/settings/SettingsAdmin";
import GroupAdmin from "../screens/group/GroupAdmin";

import GuestListAdmin from "../screens/group/GuestListAdmin";
import EditEventScreen from "../../adminMain/screens/event/EditEventScreen";

import EventDetails from "../screens/event/EventDetails";
import EventPackageDetails from "../screens/event/EventPackageDetails";
import EquipmentPanelDetails from "../screens/inventory/EquipmentPanelDetails";
import EventCardDetails from "../screens/event/EventCardDetails";
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
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />

      <Stack.Screen name="MessagesAdmin" component={MessagesAdmin} />
      <Stack.Screen name="NotificationAdmin" component={Notifications} />
      <Stack.Screen
        name="EventBookingDetails"
        component={EventBookingDetails}
      />
    </Stack.Navigator>
  );
};
const AboutAdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AboutAdminIndex" component={AboutAdmin} />
    </Stack.Navigator>
  );
};

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScheduleAdmin" component={ScheduleAdmin} />
    </Stack.Navigator>
  );
};

// For drawer stack
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />
      {/* <Stack.Screen name="ProfileEditSP" component={ProfileEditSP} />
      <Stack.Screen name="OptionsSP" component={OptionsSP} />
      <Stack.Screen name="ProfileSwitchSP" component={ProfileSwitchSP} /> */}
      <Stack.Screen name="EditProfileAdmin" component={EditProfileAdmin} />
      <Stack.Screen
        name="AddAccountScreenAdmin"
        component={AddAccountScreenAdmin}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

const EventStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventAdmin" component={EventAdmin} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen
        name="EventPackageDetails"
        component={EventPackageDetails}
      />
      <Stack.Screen
        name="CreatePackageScreen"
        component={CreatePackageScreen}
      />
      <Stack.Screen name="EditPackageScreen" component={EditPackageScreen} />
      <Stack.Screen name="PackageCardDetails" component={PackageCardDetails} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="EventCardDetails" component={EventCardDetails} />
      <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
    </Stack.Navigator>
  );
};

const GroupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupAdminIndex" component={GroupAdmin} />
      <Stack.Screen name="GuestListAdmin" component={GuestListAdmin} />
    </Stack.Navigator>
  );
};

const FeedbackStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedbackAdmin" component={FeedbackAdmin} />
      {/* <Stack.Screen
        name="FeedbackEventDetails"
        component={EventFeedbackDetails}
      /> */}
      <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />
    </Stack.Navigator>
  );
};
const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OptionsSP" component={OptionsSP} /> */}
      {/* <Stack.Screen name="SettingsSP" component={SettingsSP} /> */}
      <Stack.Screen name="SettingsAdmin" component={SettingsAdmin} />
    </Stack.Navigator>
  );
};

const AttendeeTrackerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AttendeeTrackerAdmin" component={AttendeeAdmin} />
      <Stack.Screen name="Attendees" component={Attendees} />
    </Stack.Navigator>
  );
};
const InventoryTrackerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InventoryTrackerAdmin" component={InventoryAdmin} />
      <Stack.Screen
        name="EquipmentPanelDetails"
        component={EquipmentPanelDetails}
      />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  ProfileStackNavigator,
  SettingStackNavigator,
  GroupStackNavigator,
  FeedbackStackNavigator,
  AttendeeTrackerStackNavigator,
  AboutAdminStackNavigator,
  InventoryTrackerStackNavigator,
};
