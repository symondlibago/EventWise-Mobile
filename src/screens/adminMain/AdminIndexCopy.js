import React, { useEffect, useRef } from "react";
import DrawerNavigator from "./navigators/DrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications"; // Import Expo notifications
import FlashMessage, { showMessage } from "react-native-flash-message";

const AdminIndex = () => {
  const notificationListener = useRef(null); // Track listener

  useEffect(() => {
    // Check if a listener has already been added, and only add one if not
    if (!notificationListener.current) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          const { title, body } = notification.request.content;
          console.log("Foreground notification:", title, body);

          showMessage({
            message: title,
            description: body,
            type: "info",
          });
        });
    }

    // Cleanup listener when component unmounts or when effect runs again
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
        notificationListener.current = null; // Clear the ref
      }
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlashMessage position="top" />
      <DrawerNavigator />
    </SafeAreaView>
  );
};

export default AdminIndex;
