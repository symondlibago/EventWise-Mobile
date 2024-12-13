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

// Function to create a new service
const createService = async (serviceData) => {
  try {
    console.log("Service data:", serviceData);
    let servicePhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      serviceData.servicePhotoURL;

    const addServiceData = {
      serviceName: serviceData.serviceName,
      serviceCategory: serviceData.serviceCategory,
      serviceFeatures: serviceData.serviceFeatures,
      basePrice: serviceData.basePrice,
      pax: serviceData.pax,
      requirements: serviceData.requirements,
      servicePhotoURL,
      // serviceCreatedDate: new Date().toISOString().split("T")[0],
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

// Function to create a package that's predefined
const createPackage = async (packageData) => {
  try {
    console.log("Service data:", packageData);
    let packagePhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      packageData.coverPhotoURL;

    const addPackageData = {
      packageName: packageData.packageName,
      eventType: packageData.eventType,
      services: packageData.services,
      totalPrice: packageData.totalPrice,
      pax: packageData.pax,
      packageType: 1,
      coverPhoto: packagePhotoURL, // URL from Supabase Storage
    };
    console.info("Adding package" + JSON.stringify(addPackageData));

    const response = await api.post("/admin/packages", addPackageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

const updatePackage = async (id, updatedPackage) => {
  try {
    const response = await api.put(`/admin/packages/${id}`, updatedPackage);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating package:<<:", error);
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

// function to delete a package
const deletePackage = async (id) => {
  console.log("deleting package: ", id);
  try {
    const result = await api.delete(`admin/packages/${id}`);
    console.log("deleted package in packageservice: ", result.data);
    return result.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.log(`Package with ID ${id} not found`);
      return null; // or throw a custom error
    } else {
      console.error("Error deleting package:", error);
      throw error;
    }
  }
};

// Fetch all detailed information for each services included in the package

const fetchPackageServiceDetails = async (id) => {
  try {
    const response = await api.get(`/admin/packages/${id}/services`);
    // console.log("fetched package-services details: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching package details:", error);
    throw error;
  }
};
// Function to fetch all packages
const fetchPackages = async () => {
  try {
    const response = await api.get("/admin/packages");
    // console.log("fetched packages inside adminPackageServices:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
// Function to fetch all services
const fetchServices = async () => {
  try {
    const response = await api.get("/services");
    // console.log("fetched services: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching servicesss:", error);
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
  updatePackage,
  createPackage,
  deletePackage,
  fetchServices,
  fetchPackages,
  fetchPackageServiceDetails,
};
