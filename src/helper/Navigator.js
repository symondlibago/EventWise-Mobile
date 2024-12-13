import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { LogBox } from "react-native";
import { AuthContext } from "../services/authContext";

// stacks
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useStore from "../stateManagement/useStore";

import Registerold from "../screens/authentication/Registerold";
import Register from "../screens/authentication/Register";
import Register2 from "../screens/authentication/Register2";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";
import PasswordResetScreen from "../screens/authentication/PasswordResetScreen";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here
import AdminIndex from "../screens/adminMain/AdminIndex";

// Customer Stack here
import TabNav from "../screens/customerScreens/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import Notification from "../screens/customerScreens/notification/Notifications";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
import ProfileSwitcher from "../screens/customerScreens/screens/ProfileSwitcher";
import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
import Package from "../screens/customerScreens/otherScreens/Package";
import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";
import EventPackageCustomer from "../screens/customerScreens/otherScreens/EventPackageCustomer";
import HomeSP from "../screens/serviceProvidersScreen/screens/HomeSP";

import EventFeedbackDetails from "../screens/adminMain/screens/feedback/EventFeedbackDetails";
import EditProfile from "../screens/customerScreens/otherScreens/EditProfile";
import Profile from "../screens/customerScreens/screens/Profile";
import InventoryTracker from "../screens/customerScreens/sidebarScreens/InventoryTracker";
import Schedule from "../screens/customerScreens/sidebarScreens/Schedule";
import Settings from "../screens/customerScreens/sidebarScreens/Settings";
import NotifView from "../screens/customerScreens/notification/NotifView";
import About from "../screens/customerScreens/sidebarScreens/About";
import BookingContinuation2 from "../screens/customerScreens/otherScreens/BookingContinuation2";
import BookingContinuation3 from "../screens/customerScreens/otherScreens/BookingContinuation3";
import BookingContinuation4 from "../screens/customerScreens/otherScreens/BookingContinuation4";
import Attendee from "../screens/customerScreens/otherScreens/Attendee";
import Feedback from "../screens/customerScreens/otherScreens/Feedback";
import FeedbackInputs from "../screens/customerScreens/otherScreens/FeedbackInputs";
import Attendees from "../screens/adminMain/screens/attendee/Attendees";

// import Feedback from "../screens/customerScreens/otherScreens/Feedback";

// Service Provider Stack here
import ServiceProviderIndex from "../screens/serviceProvidersScreen/ServiceProviderIndex";

// Guest Stack here

// Profile switcher screen
import { ProfileContext } from "../services/profileContextcp";
import Venue from "../screens/customerScreens/otherScreens/Venue";
import GuestIndex from "../screens/guestScreens/GuestIndex";
import { MyReactNativeForm } from "../screens/authentication/MyReactNativeForm";
import ServiceCardDetails from "../screens/serviceProvidersScreen/screens/ServiceTab/ServiceCardDetails";
const Stack = createNativeStackNavigator();
import GuestList from "../screens/customerScreens/sidebarScreens/Guest";
const AuthenticationStack = () => {
  LogBox.ignoreAllLogs();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (loading) {
    return <ActivityIndicator />; // A screen or component to show while loading
  }
  return (
    <Stack.Navigator
      initialRouteName={
        user
          ? user.role_id === 2
            ? "CustomCustomerStack"
            : "CustomAdminStack"
          : "Landing"
      }
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Attendees"
        component={Attendees}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Registerold"
        component={Registerold}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Register"
        component={Registerold}
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
        name="PasswordResetScreen"
        component={PasswordResetScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CustomCustomerStack"
        component={CustomCustomerStack}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CustomCustomerStack"
        component={CustomCustomerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomAdminStack"
        component={CustomAdminStack}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="GuestStack"
        component={GuestIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomServiceProviderStack"
        component={CustomServiceProviderStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// AdminStack
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminStackIndex"
        component={AdminIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FeedbackEventDetails"
        component={EventFeedbackDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Previous state 1:12 nov 3
// const CustomAdminStack = () => {
//   LogBox.ignoreAllLogs();
//   const { profiles, loading, activeProfile } = useContext(ProfileContext);
//   const navigation = useNavigation();

//   useEffect(() => {
//     // console.log("Loading:", loading, "Role ID:", profiles.id);
//     // this results to registering the first profile in account role
//     console.log("active profile nav: ", activeProfile["role_id"]);
//     console.log("profile: nav", profiles[0].role_id);
//     if (!loading) {
//       if ((activeProfile["role_id"] = 1 === 1)) {
//         console.log("Navigating to AdminStack");
//         navigation.navigate("AdminStack");
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "AdminStack" }],
//         });
//       } else {
//         console.log("Navigating to ServiceProviderStack");
//         navigation.navigate("ServiceProviderStack");
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "ServiceProviderStack" }],
//         });
//       }
//     }
//   }, [profiles.id, loading, navigation]);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName={
//         profiles.id === 1 ? "AdminStack" : "ServiceProviderStack"
//       }
//     >
//       <Stack.Screen
//         name="AdminStack"
//         component={AdminStack}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ServiceProviderStack"
//         component={ServiceProviderStack}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

const CustomAdminStack = () => {
  LogBox.ignoreAllLogs();
  // const { profiles, loading, activeProfile } = useContext(ProfileContext);
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const loading = useStore((state) => state.loading);
  const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const setLoading = useStore((state) => state.setLoading);
  const navigation = useNavigation();

  console.log("navigation active: ", activeProfile.role_id, activeProfile);
  useEffect(() => {
    // console.log("Loading:", loading, "Role ID:", profiles.id);

    // console.log("active profile nav: ", activeProfile.role_id);
    // console.log("profile: nav", profiles[0].role_id);
    if (!loading) {
      if (activeProfile === 1) {
        console.log("Navigating to AdminStack");
        navigation.navigate("AdminStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "AdminStack" }],
        });
      } else {
        console.log("Navigating to ServiceProviderStack");
        navigation.navigate("ServiceProviderStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "ServiceProviderStack" }],
        });
      }
    }
  }, [activeProfile, loading, navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        activeProfile.role_id === 1 ? "AdminStack" : "ServiceProviderStack"
      }
    >
      <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const CustomCustomerStack = () => {
  LogBox.ignoreAllLogs();

  // const { profiles, loading, activeProfile } = useContext(ProfileContext);
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const loading = useStore((state) => state.loading);
  const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const setLoading = useStore((state) => state.setLoading);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("Loading:", loading, "Role ID:", profiles.id);

    // console.log("active profile nav: ", activeProfile.role_id);
    // console.log("profile: nav", profiles[0].role_id);
    if (!loading) {
      if (activeProfile === 2) {
        console.log("Navigating to CustomerStack");
        navigation.navigate("CustomerStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "CustomerStack" }],
        });
      } else {
        console.log("Navigating to ServiceProviderStack");
        navigation.navigate("ServiceProviderStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "ServiceProviderStack" }],
        });
      }
    }
  }, [activeProfile, loading, navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        activeProfile === 3 ? "ServiceProviderStack" : "CustomerStack"
      }
    >
      <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const CustomServiceProviderStack = () => {
  LogBox.ignoreAllLogs();

  // const { profiles, loading, activeProfile } = useContext(ProfileContext);
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const loading = useStore((state) => state.loading);
  const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const setLoading = useStore((state) => state.setLoading);
  const navigation = useNavigation();
  useEffect(() => {
    // console.log("Loading:", loading, "Role ID:", profiles.id);

    // console.log("active profile nav: ", activeProfile.role_id);
    // console.log("profile: nav", profiles[0].role_id);
    if (!loading) {
      if (activeProfile === 3) {
        console.log("Navigating to ServiceProviderStack");
        navigation.navigate("ServiceProviderStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "ServiceProviderStack" }],
        });
      } else {
        console.log("Navigating to CustomerStack");
        navigation.navigate("CustomerStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "CustomerStack" }],
        });
      }
    }
  }, [activeProfile, loading, navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        activeProfile === 3 ? "CustomerStack" : "ServiceProviderStack"
      }
    >
      <Stack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// ServiceProvider StacK

function ServiceProviderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceProviderStackIndex"
        component={ServiceProviderIndex}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// CustomerStack
function CustomerStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestLanding"
        component={GuestLanding}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      /> */}
      {/* 
      <Stack.Screen
        name="AccountRecovery"
        component={AccountRecovery}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestList"
        component={GuestList}
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
        name="EventPackageCustomer"
        component={EventPackageCustomer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// function CustomCustomerStack() {
//   LogBox.ignoreAllLogs();
//   const { profiles, activeProfile, switchProfile, loading } =
//     useContext(ProfileContext);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (loading) {
//     return <ActivityIndicator />; // A screen or component to show while loading
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={
//         profiles.id === 5 ? "ServiceProviderStack" : "CustomerStack" //to be change to default ID
//       }
//       // screenOptions={{ headerShown: profiles.id === 3 ? false : true }}
//     >
//       <Stack.Screen
//         name="ServiceProviderStack"
//         component={ServiceProviderStack}
//       />
//       <Stack.Screen name="CustomerStack" component={CustomerStack} />
//     </Stack.Navigator>
//   );
// }
export default function Navigator() {
  return <AuthenticationStack />;
}
// export default Navigator;
