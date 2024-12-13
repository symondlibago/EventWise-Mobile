// SettingsAdmin.js

import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-paper";

const SettingsAdmin = () => {
  // State variables for pickers
  const [language, setLanguage] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [dateFormat, setDateFormat] = useState("");

  // State variables for toggles
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = useState(true);
  const [isDim, setIsDim] = useState(false);
  const [isLightsOut, setIsLightsOut] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <RNPickerSelect
            onValueChange={(value) => setLanguage(value)}
            placeholder={{ label: "Select a language...", value: null }}
            items={[
              { label: "English", value: "en" },
              { label: "Spanish", value: "es" },
              { label: "French", value: "fr" },
              // Add more languages as needed
            ]}
            style={pickerSelectStyles}
            value={language}
          />
        </View>

        {/* Time Zone Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Zone</Text>
          <RNPickerSelect
            onValueChange={(value) => setTimeZone(value)}
            placeholder={{ label: "Select a time zone...", value: null }}
            items={[
              { label: "UTC-12:00", value: "UTC-12:00" },
              { label: "UTC-11:00", value: "UTC-11:00" },
              { label: "UTC-10:00", value: "UTC-10:00" },
              // Add more time zones as needed
              { label: "UTC+00:00", value: "UTC+00:00" },
              { label: "UTC+01:00", value: "UTC+01:00" },
              { label: "UTC+02:00", value: "UTC+02:00" },
              // ...
            ]}
            style={pickerSelectStyles}
            value={timeZone}
          />
        </View>

        {/* Date Format Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date Format</Text>
          <RNPickerSelect
            onValueChange={(value) => setDateFormat(value)}
            placeholder={{ label: "Select a date format...", value: null }}
            items={[
              { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
              { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
              { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
              // Add more date formats as needed
            ]}
            style={pickerSelectStyles}
            value={dateFormat}
          />
        </View>

        {/* Mode Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
            />
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Use Device Settings</Text>
            <Switch
              value={useDeviceSettings}
              onValueChange={(value) => setUseDeviceSettings(value)}
            />
          </View>
        </View>

        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Dim</Text>
            <Switch value={isDim} onValueChange={(value) => setIsDim(value)} />
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Lights Out</Text>
            <Switch
              value={isLightsOut}
              onValueChange={(value) => setIsLightsOut(value)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Change as needed
  },
  scrollContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#555",
  },
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
});
