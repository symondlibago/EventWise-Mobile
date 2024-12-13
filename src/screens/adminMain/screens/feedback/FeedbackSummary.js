import React from "react";
import { View, Text } from "react-native";
import EventFeedbackSentiment from "./EventFeedbackSentiment"; // Import your original component
import { PieChart } from "react-native-chart-kit"; // Example for sentiment visualization

const FeedbackSummary = ({ eventData, sliceColor }) => {
  // Initialize counters for feedback sentiments
  const sentimentCounts = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  // Iterate over all events to aggregate feedbacks
  eventData.forEach((event) => {
    const feedbacks = event.feedbackData || [];

    // Loop through feedback data and categorize the sentiments
    feedbacks.forEach((feedback) => {
      if (feedback.sentiment === "positive") {
        sentimentCounts.positive += 1;
      } else if (feedback.sentiment === "negative") {
        sentimentCounts.negative += 1;
      } else {
        sentimentCounts.neutral += 1;
      }
    });
  });

  // Total feedback count
  const totalFeedbackCount =
    sentimentCounts.positive +
    sentimentCounts.negative +
    sentimentCounts.neutral;

  // Data for PieChart visualization
  const pieChartData = [
    {
      name: "Positive",
      count: sentimentCounts.positive,
      color: sliceColor.positive || "#4CAF50", // default green for positive
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Negative",
      count: sentimentCounts.negative,
      color: sliceColor.negative || "#F44336", // default red for negative
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Neutral",
      count: sentimentCounts.neutral,
      color: sliceColor.neutral || "#FFC107", // default yellow for neutral
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text>Total Events: {eventData.length}</Text>
      <Text>Total Feedbacks: {totalFeedbackCount}</Text>
      <Text>Positive: {sentimentCounts.positive}</Text>
      <Text>Negative: {sentimentCounts.negative}</Text>
      <Text>Neutral: {sentimentCounts.neutral}</Text>

      {/* PieChart to visualize sentiment distribution */}
      <PieChart
        data={pieChartData}
        width={350} // Adjust this based on screen width
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default FeedbackSummary;
