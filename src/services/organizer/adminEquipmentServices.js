// src/services/service/serviceServices.js

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

const fetchAllEquipment = async () => {
  try {
    const response = await api.get("/event/equipment");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAllEvent = async () => {
  try {
    const response = await api.get("/event");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const fetchEquipment = async (eventId) => {
  try {
    const response = await api.get(`/event/${eventId}/equipment`);
    console.log("fetched equipment by eventss", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment data:", error);
    throw error;
  }
};
export { fetchEquipment };
