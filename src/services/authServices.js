import axios from "axios";
import {
  registerForPushNotificationsAsync,
  sendTokenToBackend,
} from "./notification/notificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../constants/constant";

const api = axios.create({
  baseURL: `${API_URL}/api`,
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
export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    console.log("this is the response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Signup error response data:", error.response.data);
      console.error("Signup error response status:", error.response.status);
      // console.error("Signup error response headers:", error.response.headers);
    } else {
      console.error("Signup error message:", error.message);
    }
    throw error;
  }
};
export const accountRecovery = async (email) => {
  try {
    const response = await api.post("/auth/password/recovery", email);
    console.log("this is the response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "account recovery error response data:",
        error.response.data
      );
      // console.error("Signup error response headers:", error.response.headers);
    } else {
      console.error(
        "account recovery error response data:",
        error.response.data
      );
    }
    throw error;
  }
};
export const sendVerificationEmail = async (email) => {
  try {
    const response = await api.post("/verify-email", { email });

    if (response.data.message.includes("Email is already in use")) {
      throw new Error("Email is already in use");
    }

    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Email verification error:", error.response.data);
    } else {
      console.error("Email verification error:", error.message);
    }
    throw error;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await api.post(`/verify-email-code`, {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    console.error("Verification error:", error);
    throw new Error("Verification failed");
  }
};
export const login = async (email, password) => {
  try {
      const response = await api.post("/auth/login", {
          email: email.trim(),
          password: password.trim(),
      });

      const { token } = response.data;
      await AsyncStorage.setItem("authToken", token);
      return response.data;
  } catch (error) {
      console.error("Login error:", error);
      throw error;
  }
};


export const updateAccount = async (userData) => {
  try {
    await api.patch("/user/me", userData);
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    if (response.status === 200) {
      await AsyncStorage.removeItem("authToken");
    } else {
      console.error("Logout API call failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/me");
    console.log("Get user response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get user error ngano man auth services.:", error);
    throw error;
  }
};

export const updateUser = async (updatedData) => {
  try {
    const response = await api.put("/auth/update", updatedData); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

export const getParticipants = async () => {
  try {
    const response = await api.get("/user/participants");
    return response.data;
  } catch (error) {
    console.error("Get participants error:", error);
    throw error;
  }
};

export const getAccountProfile = async () => {
  try {
    const response = await api.get("admin/account-management");
    console.log("Account profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get account profile error:", error);
    throw error;
  }
};

export const sendPasswordResetCode = async (email) => {
  try {
    const response = await api.post("/account-recovery", { email });

    return response.data;
  } catch (error) {
    console.error("Error in sendPasswordResetCode:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Error sending reset code");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};

export const verifyPasswordResetCode = async (email, code) => {
  try {
    const trimmedEmail = email.trim();
    const response = await api.post("/verify-password-reset-code", {
      email: trimmedEmail,
      code,
    });

    return response.data;
  } catch (error) {
    console.error("Error verifying reset code:", error.response ? error.response.data : error.message);
    throw new Error("An error occurred while verifying the reset code");
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {
    const trimmedEmail = email.trim();

    // Verify the reset code first
    const verifyResponse = await api.post("/verify-password-reset-code", {
      email: trimmedEmail,
      code,
    });

    if (verifyResponse.data.success) {
      // Update the user's password
      const updateResponse = await api.put("/user/password", {
        email: trimmedEmail,
        password: newPassword,
        password_confirmation: newPassword,
      });

      return updateResponse.data;
    } else {
      throw new Error("Invalid reset code");
    }
  } catch (error) {
    console.error("Error resetting password:", error.response ? error.response.data : error.message);
    throw new Error("An error occurred while resetting the password");
  }
};


// Equipment Services
export const fetchEquipment = async (eventId) => {
  try {
    const response = await api.get(`/equipment/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch equipment error:", error);
    throw error;
  }
};

export const addEquipment = async (equipmentData) => {
  try {
    const response = await api.post(`/equipment`, equipmentData);
    return response.data;
  } catch (error) {
    console.error("Add equipment error:", error);
    throw error;
  }
};


export const updateEquipment = async (item) => {
  try {
    const response = await axios.put(
      `http://192.168.100.8:8000/api/equipment/${item.id}`,  
      item 
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update equipment');
  }
};

export const deleteEquipment = async (id) => {
  try {
    const response = await api.delete(`/equipment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete equipment error:", error);
    throw error;
  }
};

export const fetchAllEquipment = async () => {
  try {
      const response = await api.get('/equipment/all'); 
      return response.data;
  } catch (error) {
      console.error("Error fetching all equipment:", error);
      throw error;
  }
};

