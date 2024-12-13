// ThemeContext.js

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDim, setIsDim] = useState(false);
  const [isLightsOut, setIsLightsOut] = useState(false);

  useEffect(() => {
    // Load settings from AsyncStorage on mount
    const loadSettings = async () => {
      try {
        const darkModeValue = await AsyncStorage.getItem("isDarkMode");
        const dimValue = await AsyncStorage.getItem("isDim");
        const lightsOutValue = await AsyncStorage.getItem("isLightsOut");

        if (darkModeValue !== null) setIsDarkMode(JSON.parse(darkModeValue));
        if (dimValue !== null) setIsDim(JSON.parse(dimValue));
        if (lightsOutValue !== null) setIsLightsOut(JSON.parse(lightsOutValue));
      } catch (e) {
        console.error("Failed to load settings.", e);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // Save settings to AsyncStorage whenever they change
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
        await AsyncStorage.setItem("isDim", JSON.stringify(isDim));
        await AsyncStorage.setItem("isLightsOut", JSON.stringify(isLightsOut));
      } catch (e) {
        console.error("Failed to save settings.", e);
      }
    };

    saveSettings();
  }, [isDarkMode, isDim, isLightsOut]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleDim = () => setIsDim((prev) => !prev);
  const toggleLightsOut = () => setIsLightsOut((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        isDim,
        toggleDim,
        isLightsOut,
        toggleLightsOut,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
