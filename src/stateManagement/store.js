import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccountProfile, getUser } from "../services/authServices";
const useStore = create((set) => ({
  user: null,
  accountProfiles: [],
  activeProfile: null,
  loading: true,
  navigation: null, // Store navigation object here

  // Theme-related state and methods
  theme: "default", // Initial theme state
  setTheme: async (theme) => {
    await AsyncStorage.setItem("Theme", theme); // Persist the theme
    set({ theme });
  },
  initializeTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("Theme");
    if (savedTheme) {
      set({ theme: savedTheme });
    } else {
      set({ theme: "default" });
    }
  },
  // User-related state and methods
  setUser: (user) => set({ user }),
  setAccountProfiles: (profiles) => set({ accountProfiles: profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ loading }),
  setNavigation: (navigation) => set({ navigation }),

  // Fetch and set user and account profiles
  fetchUserAndProfiles: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      set({ user });

      const profileResponse = await getAccountProfile();
      const profiles = profileResponse.data.filter(
        (profile) => profile.user_id === user.id
      );
      set({ accountProfiles: profiles });

      const storedProfile = await AsyncStorage.getItem("activeProfile");
      if (storedProfile) {
        set({ activeProfile: JSON.parse(storedProfile) });
      } else if (profiles.length > 0) {
        set({ activeProfile: profiles[0] });
      }
    } catch (error) {
      console.error("Error fetching user and profiles:", error);
    } finally {
      set({ loading: false });
    }
  },

  switchProfile: async (profile) => {
    try {
      set({ activeProfile: profile });
      await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));

      // Handle token update if necessary
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        await AsyncStorage.setItem(`authToken-${profile.id}`, token);
      }

      // Navigate to the main screen after profile switch
      const { navigation } = get();
      if (navigation) {
        navigation.navigate("CustomerStack", { screen: "TabNav" }); // Adjust the route as needed
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  },
}));

// Helper functions
export const saveString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key, value) =>
  saveString(key, JSON.stringify(value));

export const get = async (key) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default useStore;
