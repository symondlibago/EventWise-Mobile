import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import EventFeedbackSentiment from "../component/EventFeedbackSentiment";
import styles from "../../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const EventFeedbackSentimentHome = () => {
  const navigation = useNavigation();
  handleButtonNavigate = () => {
    // console.log("hello");
    navigation.navigate("Feedback");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {}]}>
        <Text style={styles.title}>Feedback Analysis</Text>
        <TouchableOpacity onPress={handleButtonNavigate}>
          <Text style={styles.subtitle}>Go to</Text>
        </TouchableOpacity>
      </View>
      {/* Components */}
      <EventFeedbackSentiment />
    </SafeAreaView>
  );
};

export default EventFeedbackSentimentHome;
