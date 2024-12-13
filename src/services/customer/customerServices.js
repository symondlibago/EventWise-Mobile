import axios from "axios";

import API_URL from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: `$API_URL/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

// event section
export const getEventsById = async (id) => {
  try {
    const response = await api.get("/event");
    return response.data;
  } catch (error) {
    console.error("Get events error:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/event", eventData);
    return response.data;
  } catch (error) {
    console.error("Create event error:", error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = api.patch(`/event/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Update event error:", error);
    throw error;
  }
};
export const deleteEvent = async (id) => {
  try {
    await api.delete(`/event/${id}`);
  } catch (error) {
    console.error("Delete event error:", error);
    throw error;
  }
};
export const myBookEvents = async () => {
  try {
    const response = await api.get(`/my-events`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
export const notifyParticipants = async (id) => {
  try {
    const response = await api.post(`/event/${id}/notify`);
    return response.data;
  } catch (error) {
    console.error("Notify participants error:", error);
    throw error;
  }
};
