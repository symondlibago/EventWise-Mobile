// src/services/service/serviceServices.js

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
const fetchMyEquipments = async (eventId) => {
  try {
    const response = await api.get(`my-equipment`, {
      params: { event_id: eventId },
    });
    console.log("Fetched my equipment: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching my equipment:", error);
    throw error;
  }
};
const fetchEventsByService = async () => {
  try {
    // Retrieve userId from AsyncStorage
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID is missing.");
    }

    const response = await api.get(`/events-by-service/${userId}`);
    console.log("Fetched events by service:", response.data);
    return response.data; // Returning the fetched events data
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Function to create a new service
const createService = async (serviceData) => {
  try {
    console.log("Service data:", serviceData);
    let servicePhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      serviceData.servicePhotoURL;
    // if (serviceData.servicePhotoURL) {
    //   const fileName = serviceData.serviceImage.split("/").pop();
    //   servicePhotoURL = await uploadImageToSupabase(
    //     serviceData.servicePhotoURL,
    //     fileName
    //   );
    //   console.log("Service Image uploaded to Supabase. URL:", servicePhotoURL);
    // }

    const addServiceData = {
      serviceName: serviceData.serviceName,
      serviceCategory: serviceData.serviceCategory,
      serviceFeatures: serviceData.serviceFeatures,
      basePrice: serviceData.basePrice,
      pax: serviceData.pax,
      requirements: serviceData.requirements,
      servicePhotoURL,
      serviceCreatedDate: new Date().toISOString().split("T")[0],
    };
    console.info("serviceData: ", addServiceData);
    const response = await api.post("/services", addServiceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("createService: ", response);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error, serviceData);
    throw error;
  }
};

// Function to update a service
const updateService = async (id, updatedService) => {
  console.log(id, updatedService);
  try {
    const response = await api.put(`/services/${id}`, updatedService);
    return response.data;
  } catch (error) {
    console.error("Error updating service:<<:", error);
    throw error;
  }
};

// Function to delete a service
const deleteService = async (id) => {
  try {
    const result = await api.delete(`/services/${id}`);
    return result.data; // Check if the response status is 204 No Content
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Function to fetch all services
const fetchServices = async () => {
  try {
    const response = await api.get("/services");
    console.log("fetched services: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
const fetchMyServices = async () => {
  try {
    const response = await api.get(`/services/myservice`);
    console.log("fetched my services: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching my services:", error);
    throw error;
  }
};

export {
  fetchMyServices,
  createService,
  updateService,
  deleteService,
  fetchServices,
  fetchEventsByService,
  fetchMyEquipments,
};
