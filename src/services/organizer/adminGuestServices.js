import axios from "axios";
import API_URL from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToSupabase } from "../organizer/uploadSupabaseService";

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

// Axios interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchGuestEventDetails = async (eventid) => {
  try {
    console.log("eventid", eventid);
    const response = await api.get(`/guest/${eventid}`);
    return response.data;
  } catch (error) {
    console.error("error fetching guest details", error);
    throw error;
  }
};

//  ERROR  error fetching guest details [AxiosError: Request failed with status code 500]
//  ERROR  [AxiosError: Request failed with status code 500]
export { fetchGuestEventDetails };
