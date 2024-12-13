// src/services/organizer/organizerServices.js

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

// Function to submit a new package
const submitPackage = async (packageData) => {
  try {
    console.log("Submitting Package:", packageData);

    let coverPhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      packageData.coverPhotoUrl;
    if (packageData.coverPhoto) {
      const fileName = packageData.coverPhoto.split("/").pop();
      coverPhotoURL = await uploadImageToSupabase(
        packageData.coverPhoto,
        fileName
      );
      console.log("Image uploaded to Supabase. URL:", coverPhotoURL);
    }

    const formData = {
      packageName: packageData.packageName,
      eventType: packageData.eventType,
      services: packageData.services,
      totalPrice: packageData.totalPrice,
      packageCreatedDate: packageData.packageCreatedDate,
      coverPhoto: coverPhotoURL, // URL from Supabase Storage
    };

    const response = await api.post("/admin/packages", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Package submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting package:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to fetch all packages
const fetchPackages = async () => {
  try {
    const response = await api.get("/admin/packages");
    // console.log("Fetched packages:", response.data);
    return response.data; // Ensure it returns an array of packages
  } catch (error) {
    console.error(
      "Error fetching packages:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// function to submit a new event
const submitEvent = async (eventData) => {
  try {
    const response = await api.post("/admin/events", eventData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(
      "Event data submitted successfully Organizerservices:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting event data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { submitPackage, fetchPackages };
