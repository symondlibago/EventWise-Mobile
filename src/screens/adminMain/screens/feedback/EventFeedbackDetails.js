import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

const EventFeedbackDetails = ({ route }) => {
  const navigation = useNavigation();
  const { eventData } = useStore();

  // Get the eventId from the route params
  const eventId = route?.params?.eventId;

  // Find the event data based on the eventId
  const event = eventData.find((event) => event.eventId === eventId);

  if (!event) {
    // Handle the case where event data is not found
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Event not found.</Text>
      </SafeAreaView>
    );
  }

  const { eventName, feedbackData } = event;

  // Extract unique aspects from feedback data
  const aspects = [...new Set(feedbackData.map((feedback) => feedback.aspect))];

  // State to manage selected aspect
  const [selectedAspect, setSelectedAspect] = useState(aspects[0]);

  // Function to filter feedback based on selected aspect
  const filteredFeedback = feedbackData.filter(
    (feedback) => feedback.aspect === selectedAspect
  );

  // Count sentiments
  const sentimentCounts = filteredFeedback.reduce(
    (acc, feedback) => {
      if (feedback.sentiment === "positive") acc.positive += 1;
      if (feedback.sentiment === "negative") acc.negative += 1;
      if (feedback.sentiment === "neutral") acc.neutral += 1;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );
  // Calculate total feedbacks for the selected aspect
  const totalFeedbacks =
    sentimentCounts.positive +
    sentimentCounts.negative +
    sentimentCounts.neutral;

  // Calculate percentages
  const sentimentPercentages = {
    positive:
      totalFeedbacks > 0
        ? ((sentimentCounts.positive / totalFeedbacks) * 100).toFixed(1)
        : "0.0",
    negative:
      totalFeedbacks > 0
        ? ((sentimentCounts.negative / totalFeedbacks) * 100).toFixed(1)
        : "0.0",
    neutral:
      totalFeedbacks > 0
        ? ((sentimentCounts.neutral / totalFeedbacks) * 100).toFixed(1)
        : "0.0",
  };

  // Function to navigate to aspect details screen
  const handleNavigateToAspectDetails = () => {
    // navigation.navigate("FeedbackAdmin", {
    //   eventId,
    //   selectedAspect,
    //   sentimentCounts,
    // });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>{eventName}</Text>

        {/* Dropdown for selecting aspect */}
        <RNPickerSelect
          onValueChange={(value) => setSelectedAspect(value)}
          items={aspects.map((aspect) => ({ label: aspect, value: aspect }))}
          value={selectedAspect}
          style={{
            inputAndroid: styles.dropdownInput,
            inputIOS: styles.dropdownInput, // Optional: Style for iOS
          }}
          placeholder={{
            label: "",
            value: <Text style={styles.aspectText}>Selected Aspect: {}</Text>,
          }}
        />

        {/* Display selected aspect */}

        {/* Render sentiment counts and percentages */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.sentimentText}>
            Positive: {sentimentCounts.positive} (
            {sentimentPercentages.positive}%)
          </Text>
          <Text style={styles.sentimentText}>
            Negative: {sentimentCounts.negative} (
            {sentimentPercentages.negative}%)
          </Text>
          <Text style={styles.sentimentText}>
            Neutral: {sentimentCounts.neutral} ({sentimentPercentages.neutral}%)
          </Text>
          <Text style={styles.sentimentText}>
            Total Feedbacks: {totalFeedbacks}
          </Text>
        </View>

        {/* Navigate to aspect details */}
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={handleNavigateToAspectDetails}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EventFeedbackDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  aspectText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 10,
    textAlign: "center",
  },
  sentimentText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    color: "black",
    marginBottom: 15,
  },
  feedbackContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 1, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "100%",
  },
  navigateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
