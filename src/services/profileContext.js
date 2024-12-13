import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../stateManagement/useStore";
import { getAccountProfile, getUser } from "./authServices";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // Pull Zustand store states and actions for profiles and activeProfile
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const loading = useStore((state) => state.loading);
  const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    if (activeProfile) return;

    const loadProfiles = async () => {
      try {
        setLoading(true);
        const user = await getUser();
        const response = await getAccountProfile();
        const userProfiles = response.data.filter(
          (profile) => profile.user_id === user.id
        );
        // setProfiles(userProfiles);
        // console.log(" Profile Contexts:", userProfiles);

        const storedProfile = await AsyncStorage.getItem("activeProfile");
        if (storedProfile) {
          setActiveProfile(JSON.parse(storedProfile));
        } else {
          setActiveProfile(userProfiles[0]); // Default to the first profile
        }
        console.log("Active profile pcontext:", activeProfile);
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [activeProfile, setActiveProfile, setLoading, setProfiles]);

  // const switchProfile = async (index) => {
  //   try {
  //     const profile = profiles[index];
  //     if (profile) {
  //       setActiveProfile(profile);
  //       await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));
  //       console.log("Switched to profile:", profile);
  //       const user = await getUser();
  //       console.log("Profile Contexts:", profile, user);
  //       console.log("activeProfile context:", activeProfile);
  //     } else {
  //       console.error("Invalid profile index");
  //     }
  //   } catch (error) {
  //     console.error("Error switching profile:", error);
  //   }
  // };
  const switchProfile = async (index) => {
    try {
      console.log("Profile index:", index);
      set({ activeProfile: index });
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
