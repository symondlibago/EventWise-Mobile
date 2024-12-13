import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_FLASK from "../constants/constantFlask";
import API_URL from "../constants/constant";
const api = axios.create({
  baseURL: `${API_URL_FLASK}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API1 for laravel endpoints
const api1 = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api1.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const submitFeedback = async (feedback) => {
  try {
    const response = await api.post("/submit_feedback", feedback);
    console.log("Feedback submittedss: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting feedback:",
      error.response || error.message
    );
    throw error;
  }
};

const getAspectsWithSentimentEvent = async (event_id) => {
  try {
    const response = await api.get(
      `/get_aspects_with_sentiments?event_id=${event_id}`
    );
    console.log("Feedback resultseventsSentment: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting resultseventsSentment:",
      error.response || error.message
    );
    throw error;
  }
};

const getFeedbackEventSentiments = async () => {
  try {
    const response = await api.get("/get_events_with_sentiment_counts");
    console.log("Feedback resultseventsSentment: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting resultseventsSentment:",
      error.response || error.message
    );
    throw error;
  }
};
const getFeedback = async () => {
  try {
    const response = await api.get("/get_feedback");
    console.log("Feedback results getFeedback: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedbacks:", error.response || error.message);
    throw error;
  }
};
const getTotalFeedbacks = async () => {
  try {
    const response = await api.get("/count_feedback?count=true");
    console.log("Feedback results: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedbacks:", error.response || error.message);
    throw error;
  }
};
const getFeedbacksByEventId = async (eventId) => {
  try {
    const response = await api.get(
      `/count_feedback?event_id=${eventId}&count=true`
    );
    console.log("Feedback results: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedbacks:", error.response || error.message);
    throw error;
  }
};
const getServicesInEvent = async (eventId) => {
  try {
    const response = await api1.get(`events/${eventId}/services`);
    // console.log("This is the services in event: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedbacks:", error.response || error.message);
    throw error;
  }
};

const getFeedbackCount = async (eventId) => {
  try {
    const response = await api.get(
      `/get_feedback?event_id=${eventId}&count=true`
    );
    console.log("Feedback count:", response.data.count);
    return response.data.count;
  } catch (error) {
    console.error(
      "Error getting feedback count:",
      error.response || error.message
    );
    throw error;
  }
};

export {
  submitFeedback,
  getFeedback,
  getFeedbackCount,
  getServicesInEvent,
  getFeedbacksByEventId,
  getTotalFeedbacks,
  getFeedbackEventSentiments,
  getAspectsWithSentimentEvent,
};
