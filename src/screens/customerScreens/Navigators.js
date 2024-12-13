import React, { useContext } from "react";
// stacks
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Authentication
import Register from "../screens/authentication/Register";
import Register2 from "../screens/authentication/Register2";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here
// import Index from "../screens/admin/Index";

// Customer Stack here
import TabNav from "../screens/customerScreens/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import NotifView from "../screens/customerScreens/notification/NotifView";
import Notification from "../screens/customerScreens/notification/Notifications";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
import Guest from "../screens/customerScreens/sidebarScreens/Guest";
import EditProfile from "../screens/customerScreens/otherScreens/EditProfile";
import InventoryTracker from "../screens/customerScreens/sidebarScreens/InventoryTracker";
import Schedule from "../screens/customerScreens/sidebarScreens/Schedule";
import Settings from "../screens/customerScreens/sidebarScreens/Settings";
import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
import About from "../screens/customerScreens/sidebarScreens/About";
import Package from "../screens/customerScreens/otherScreens/Package";
import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";
import Venue from "../screens/customerScreens/otherScreens/Venue";
import BookingContinuation2 from "../screens/customerScreens/otherScreens/BookingContinuation2";
import BookingContinuation3 from "../screens/customerScreens/otherScreens/BookingContinuation3";
import BookingContinuation4 from "../screens/customerScreens/otherScreens/BookingContinuation4";
import Attendee from "../screens/customerScreens/otherScreens/Attendee";
import Feedback from "../screens/customerScreens/otherScreens/Feedback";
import Profile from "../screens/customerScreens/screens/Profile";
import EventPackage from "../screens/customerScreens/otherScreens/EventPackage";
import EventPackageDetails from "../adminMain/screens/event/EventPackageDetails";
import GuestList from "../screens/customerScreens/sidebarScreens/Guest";
import FeedbackInputs from "./screens/feedback/FeedbackInputs";

// Guest Stack here

const Stack = createNativeStackNavigator();

const Navigators = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestLanding"
          component={GuestLanding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountRecovery"
          component={AccountRecovery}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Guest"
          component={Guest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InventoryTracker"
          component={InventoryTracker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestList"
          component={GuestList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InboxView"
          component={InboxView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConvoView"
          component={ConvoView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotifView"
          component={NotifView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectContactView"
          component={SelectContactView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAnotherAccount"
          component={CreateAnotherAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileOrganizer"
          component={ProfileOrganizer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Package"
          component={Package}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomizePackage"
          component={CustomizePackage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Venue"
          component={Venue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation2"
          component={BookingContinuation2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation3"
          component={BookingContinuation3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation4"
          component={BookingContinuation4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackInputs"
          component={FeedbackInputs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Attendee"
          component={Attendee}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventPackage"
          component={EventPackage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
