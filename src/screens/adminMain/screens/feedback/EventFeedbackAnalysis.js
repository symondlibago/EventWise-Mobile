import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const feedbackData = [
  {
    id: "1",
    feedback: "The event was well organized, but the food was disappointing.",
    overallSentiment: "Neutral",
    aspects: {
      organization: "Positive",
      food: "Negative",
    },
  },
  {
    id: "2",
    feedback: "Amazing venue and great service, but the schedule was off.",
    overallSentiment: "Neutral",
    aspects: {
      venue: "Positive",
      service: "Positive",
      schedule: "Negative",
    },
  },
];

const sentimentColors = {
  Positive: "#4CAF50",
  Negative: "#F44336",
  Neutral: "#FFC107",
};

const EventFeedbackWithCharts = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFeedbacks(feedbackData); // Simulate API data
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderFeedbackItem = ({ item }) => {
    const overallSentimentData = [
      {
        name: "Positive",
        count: item.overallSentiment === "Positive" ? 1 : 0,
        color: sentimentColors.Positive,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Negative",
        count: item.overallSentiment === "Negative" ? 1 : 0,
        color: sentimentColors.Negative,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Neutral",
        count: item.overallSentiment === "Neutral" ? 1 : 0,
        color: sentimentColors.Neutral,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    const aspectSentimentData = Object.entries(item.aspects).map(
      ([aspect, sentiment]) => ({
        name: aspect.charAt(0).toUpperCase() + aspect.slice(1),
        count: 1, // Each aspect counts as one entry
        color: sentimentColors[sentiment],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      })
    );

    return (
      <View style={styles.feedbackItem}>
        <Text style={styles.feedbackText}>{item.feedback}</Text>

        <Text style={styles.sentiment}>Overall Sentiment:</Text>
        <PieChart
          data={overallSentimentData}
          width={Dimensions.get("window").width - 40}
          height={150}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <Text style={styles.sentiment}>Aspect-Based Sentiment:</Text>
        <PieChart
          data={aspectSentimentData}
          width={Dimensions.get("window").width - 40}
          height={150}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };

  return (
    <FlatList
      data={feedbacks}
      keyExtractor={(item) => item.id}
      renderItem={renderFeedbackItem}
      contentContainerStyle={styles.list}
    />
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  feedbackItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  sentiment: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
});

export default EventFeedbackWithCharts;
