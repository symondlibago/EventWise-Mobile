import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingSP = () => {
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('GMT');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [darkMode, setDarkMode] = useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Settings</Text>

        {/* Language Picker */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Language</Text>
          <Picker
            selectedValue={language}
            style={styles.picker}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>

        {/* Time Zone Picker */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Time Zone</Text>
          <Picker
            selectedValue={timeZone}
            style={styles.picker}
            onValueChange={(itemValue) => setTimeZone(itemValue)}
          >
            <Picker.Item label="GMT" value="GMT" />
            <Picker.Item label="EST" value="EST" />
            <Picker.Item label="CST" value="CST" />
            <Picker.Item label="PST" value="PST" />
          </Picker>
        </View>

        {/* Date Format Picker */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Date Format</Text>
          <Picker
            selectedValue={dateFormat}
            style={styles.picker}
            onValueChange={(itemValue) => setDateFormat(itemValue)}
          >
            <Picker.Item label="MM/DD/YYYY" value="MM/DD/YYYY" />
            <Picker.Item label="DD/MM/YYYY" value="DD/MM/YYYY" />
            <Picker.Item label="YYYY/MM/DD" value="YYYY/MM/DD" />
          </Picker>
        </View>

        {/* Fading Separation Line */}
        <View style={styles.lineContainer}>
          <View style={styles.separationLine} />
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode((prev) => !prev)}
          />
        </View>

        {/* Use Device Settings Toggle */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Use Device Settings</Text>
          <Switch
            value={useDeviceSettings}
            onValueChange={() => setUseDeviceSettings((prev) => !prev)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eeba2b',
    textAlign: 'center',
    marginBottom: 20,
  },
  settingOption: {
    marginBottom: 30,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C2B067',
    backgroundColor: 'rgba(194, 176, 103, 0.17)', // 17% transparency
    borderRadius: 10,
  },
  lineContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  separationLine: {
    height: 1,
    width: "100%",
    backgroundColor: "black", // Black color for separation line
  },
});

export default SettingSP;
