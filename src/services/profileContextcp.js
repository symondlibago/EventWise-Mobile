import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAccountProfile, getUser } from "./authServices";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadProfiles = async () => {
  //     try {
  //       const user = await getUser();
  //       const response = await getAccountProfile();
  //       const userProfiles = response.data.filter(
  //         (profile) => profile.user_id === user.id
  //       );
  //       setProfiles(userProfiles);
  //       console.log(" Profile Contexts:", userProfiles);
  //       setActiveProfile(userProfiles[0]);
  //       console.log("Active profile pcontext:", activeProfile);
  //       // Load the active profile from AsyncStorage if it exists
  //       //  left off
  //       // const storedProfile = await AsyncStorage.getItem("activeProfile");
  //       // if (storedProfile) {
  //       //   setActiveProfile(JSON.parse(storedProfile));
  //       // } else {
  //       //   setActiveProfile(userProfiles[0]); // Default to the first profile
  //       // }
  //       // console.log("Active profile pcontext:", activeProfile);
  //       // console.log("stored context profile:", storedProfile);
  //     } catch (error) {
  //       console.log(userProfiles);
  //       console.error("Error loading profiles:wW", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadProfiles();
  // }, []);

  useEffect(() => {
    if (activeProfile) return;

    const loadProfiles = async () => {
      try {
        const user = await getUser();
        const response = await getAccountProfile();
        const userProfiles = response.data.filter(
          (profile) => profile.user_id === user.id
        );
        setProfiles(userProfiles);
        console.log(" Profile Contexts:", userProfiles);
        setActiveProfile(userProfiles[0]);
        console.log("Active profile pcontext:", activeProfile);
      } catch (error) {
        console.log(userProfiles);
        console.error("Error loading profiles:wW", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);
  const switchProfile = async (index) => {
    try {
      const profile = profiles[index];
      if (profile) {
        setActiveProfile(profile);
        await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));
        console.log("Switched to profile:", profile);
        const user = await getUser();
        console.log("Profile Contexts:", profile, user);
        // #FIXME this needs immediate update of the active profile, it causes errors
        console.log("activeProfile context:", activeProfile);
      } else {
        console.error("Invalid profile index");
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profiles, activeProfile, switchProfile, loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
