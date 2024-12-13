import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create((set) => ({
  user: null,
  accountProfiles: [],
  activeProfile: null,
  loading: true,
  navigation: null, // Store navigation object here

  // Theme-related state and methods
  theme: "default",
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
}));

export default useStore;
