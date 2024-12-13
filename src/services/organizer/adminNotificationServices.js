import axios from "axios";
import API_URL from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const fetchNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    // console.log("notifications: ", response.data);
    if (response.data.message === "No notifications found") {
      return []; // Return an empty array if no notifications found
    } else {
      const sortedNotifications = response.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return sortedNotifications;
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

const markNotificationAsRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    // console.log("This is the response:", response);
    // console.log(`Notification ${id} marked as read`);
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
  }
};
export { fetchNotifications, markNotificationAsRead };
