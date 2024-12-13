import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../constants/constant";
import useStore from "../stateManagement/store";
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const activeProfile = await AsyncStorage.getItem("activeProfile");
  const profile = JSON.parse(activeProfile);
  const token = await AsyncStorage.getItem(`authToken-${profile.id}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// save current profile
export const saveCurrentProfile = async (profile) => {
  try {
    await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving current profile:", error);
  }
};
