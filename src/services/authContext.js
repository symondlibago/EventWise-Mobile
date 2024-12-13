import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, login, logout } from "./authServices";
import { activeProfile, setActiveProfile } from "./profileContextcp";

import { ProfileContext } from "./profileContextcp";
import { getAccountProfile } from "./authServices";
import { useContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const userData = await getUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    try {
      await login(email, password); // This will save the token
      const userData = await getUser();
      setUser(userData);
      console.log("User data authcontext:", userData);

      const user = await getUser();
      const response = await getAccountProfile();
      const userProfiles = response.data.filter(
        (profile) => profile.user_id === user.id
      );

      // Set the activeProfile directly after fetching the user profiles
      // setActiveProfile(userProfiles[0]);

      // setProfiles(userProfiles);
      // console.log(" Profile Contexts:", userProfiles);
      // setActiveProfile(userProfiles[0]);
      // console.log("Active profile pcontext:", activeProfile);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
