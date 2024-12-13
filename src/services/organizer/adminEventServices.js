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

// function to fetch all the events

const fetchEvents = async () => {
  try {
    const response = await api.get("/admin/events");
    console.log("fetched events: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
const myEvents = async () => {
  try {
    const response = await api.get("/my-events");
    console.log("fetched events: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
// function to fetch all the events based on the date
const fetchEventsByDate1 = async (date) => {
  try {
    const response = await fetch(
      `https://your-api-url.com/api/events?date=${date}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events by date:", error);
    return [];
  }
};

const fetchUserBookingEvents = async (id, userId) => {
  try {
    const response = await api.get(`/admin/events/${id}/user/${userId}`);

    // console.log("this is the response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user booking events:", error);
    throw error;
  }
};
const myBookEvents = async () => {
  try {
    const response = await api.get(`/my-events`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
const fetchUserBookingEvents2 = async (id) => {
  try {
    const response = await api.get(`/admin/events/bookings/${eventId}`);

    // console.log("this is the response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user booking events:", error);
    throw error;
  }
};
const fetchEventPackageDetails = async (id) => {
  try {
    const response = await api.get(`/admin/events/${id}/packages`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching EventPackage details in adminEventServices:" +
        JSON.stringify(error)
    );
  }
};
const fetchEventsByDate = async (date) => {
  try {
    console.log("date", date);
    const response = await api.get(`/admin/events/by-date/${date}`);
    // console.log("fetched events: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const fetchEventsByUserId = async (userId) => {
  try {
    const response = await api.get(`/admin/events/${userId}`); // Ensure endpoint matches
    console.log("Fetched events by user_id: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching events by user_id:",
      error.response?.data || error.message
    );
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
// Function to create a package
const createPackage = async (packageData) => {
  try {
    console.log("Package data:", packageData);

    const packagePhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      packageData.packagePhotoURl;

    // Ensure services are passed as an array
    const servicesArray = Array.isArray(packageData.services)
      ? packageData.services
      : JSON.parse(packageData.services);

    console.log("SERVICES Array Before Sending:", servicesArray);

    const addPackageData = {
      packageName: packageData.packageName,
      packageType: packageData.packageType,
      eventType: packageData.eventType,
      services: servicesArray, // Pass as an array
      totalPrice: packageData.totalPrice,
      pax: packageData.pax,
      coverPhoto: packagePhotoURL, // URL from Supabase Storage
    };

    console.info("Adding package", JSON.stringify(addPackageData));

    const response = await api.post("/admin/packages", addPackageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating package:",
      error.response?.data || error.message
    );
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

//  *!------
const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/admin/events/${id}`);
    console.log("deleted event in eventservice: ", response);
    console.log(response);
  } catch (error) {
    console.error("Delete event error:", error);
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
const formatTimeTo24Hour = (time) => {
  const [hours, minutes] = time.split(":");
  const period = time.slice(-2); // Extract AM/PM
  let formattedHours = parseInt(hours, 10);
  if (period === "PM" && formattedHours !== 12) formattedHours += 12; // Convert PM to 24-hour
  if (period === "AM" && formattedHours === 12) formattedHours = 0; // Convert 12AM to 00:xx
  return `${formattedHours.toString().padStart(2, "0")}:${minutes.slice(0, 2)}`;
};

const createEvent = async (eventData) => {
  try {
    // Convert eventTime to 24-hour format before sending to backend
    const formattedEventTime = formatTimeTo24Hour(eventData.eventTime);
    eventData.eventTime = formattedEventTime; // Update eventData with formatted time

    // reassign eventData to match backend validation

    console.log("Event data submission: ", eventData);
    const response = await api.post("/admin/events", eventData);
    console.log("Created event: ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Create event error:", error.response.data); // Log full error response
    } else {
      console.error("Error without response:", error.message); // For network-related errors
    }
    throw error;
  }
};
const updateEvent = async (id, updateEvent) => {
  try {
    const response = await api.put(`/admin/events/${id}`, updateEvent);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating event:<<:", error);
    throw error;
  }
};

const approveBookingEvent = async (eventid) => {
  try {
    const response = await api.put(`admin/events/bookings/${eventid}`, {
      status: "scheduled",
    });
    console.log("Event approved: ", response);
  } catch (error) {
    console.error("approvidngbooking event error:", error);
    throw error;
  }
};

const sendEventNoticeToAllGuests = async (eventId) => {
  try {
    const response = await api.get(`event/${eventId}/reminder`);
    console.log("Sent event notice to all guests: ", response);
  } catch (error) {
    console.error("Error sending event notice:", error);
  }
};
export {
  updateEvent,
  createEvent,
  fetchMyServices,
  updatePackage,
  createPackage,
  fetchUserBookingEvents,
  deletePackage,
  fetchEventsByDate,
  fetchServices,
  fetchEvents,
  fetchPackages,
  fetchPackageServiceDetails,
  deleteEvent,
  fetchEventPackageDetails,
  fetchEventsByUserId,
  approveBookingEvent,
  sendEventNoticeToAllGuests,
  myEvents,
  myBookEvents,
};
