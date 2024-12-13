import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../constants/constant";
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const sendTokenToBackend = async (expoPushToken, userId) => {
  try {
    console.log("Sending token and userId", expoPushToken, userId);
    const response = await axios.post(`${API_URL}:8000/api/add-expo-token`, {
      token: expoPushToken,
      user_id: userId,
    });
    console.log("Token sent successfully:", response.data);
    // Save token to AsyncStorage
    await AsyncStorage.setItem("pushToken", expoPushToken);
  } catch (error) {
    console.error(
      "Error sending token to backend:",
      error?.response?.data || error.message
    );
  }
};

export { registerForPushNotificationsAsync, sendTokenToBackend };
