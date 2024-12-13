import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutAnA from "./AboutAnA";
import styles from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
const AboutAdmin = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AboutAnA />
    </SafeAreaView>
  );
};

export default AboutAdmin;
