import axios from "axios";
import API_URL from "../../../constants/constant";
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

// Function to create a new event
const createEvent = async (eventData) => {
  try {
    const addEventData = {
      eventName: eventData.eventName,
      eventType: eventData.eventType,
      eventDate: eventData.eventDate,
      eventTime: eventData.eventTime,
      eventLocation: eventData.eventLocation,
      description: eventData.description,
      coverPhoto: eventData.coverPhoto,
      package_id: eventData.package_id || null,
      packageName: eventData.packageName || null,
      packageInclusions: eventData.packageInclusions || [],
      guests: eventData.guests || 0,
      totalPrice: eventData.totalPrice || 0,
    };
    console.info("Event Data:", addEventData);
    const response = await api.post("/admin/events", addEventData);
    console.log("Event created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};

// Function to update an event
const updateEvent = async (id, updatedEvent) => {
  try {
    const response = await api.put(`/events/${id}`, updatedEvent, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Event updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.response?.data || error.message);
    throw error;
  }
};

// Function to delete an event
const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    console.log("Event deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch all events
const fetchEvents = async () => {
  try {
    const response = await api.get("/events");
    console.log("Fetched events:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch my events
const fetchMyEvents = async () => {
  try {
    const response = await api.get("/events/myevents");
    console.log("Fetched my events:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching my events:", error.response?.data || error.message);
    throw error;
  }
};

export {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
  fetchMyEvents,
};
