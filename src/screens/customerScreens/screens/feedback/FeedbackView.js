import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import Header2 from "../elements/Header2";
import { AntDesign } from "@expo/vector-icons";
const FeedbackView = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const navigation = useNavigation();

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://192.168.1.38:5000/get_feedback");
        const result = await response.json();

        // Ensure feedback has valid timestamps and sort by descending order
        const sortedFeedback = result
          .filter(
            (item) =>
              item.timestamp && !isNaN(new Date(item.timestamp).getTime())
          ) // Filter valid timestamps
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by latest

        setFeedbackData(sortedFeedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Aggregate feedback data into percentage format
  const aggregateFeedback = () => {
    let positive = 0,
      neutral = 0,
      negative = 0;

    feedbackData.forEach((item) => {
      // Ensure the sentiment data is not null or undefined before adding
      if (item.event_sentiment) {
        positive += item.event_sentiment.pos || 0;
        neutral += item.event_sentiment.neu || 0;
        negative += item.event_sentiment.neg || 0;
      }
      if (item.venue_sentiment) {
        positive += item.venue_sentiment.pos || 0;
        neutral += item.venue_sentiment.neu || 0;
        negative += item.venue_sentiment.neg || 0;
      }
      if (item.catering_sentiment) {
        positive += item.catering_sentiment.pos || 0;
        neutral += item.catering_sentiment.neu || 0;
        negative += item.catering_sentiment.neg || 0;
      }
      if (item.decoration_sentiment) {
        positive += item.decoration_sentiment.pos || 0;
        neutral += item.decoration_sentiment.neu || 0;
        negative += item.decoration_sentiment.neg || 0;
      }
    });

    const total = positive + neutral + negative;

    if (total === 0) return []; // Handle edge case for no feedback

    const positivePercentage = ((positive / total) * 100).toFixed(2);
    const neutralPercentage = ((neutral / total) * 100).toFixed(2);
    const negativePercentage = ((negative / total) * 100).toFixed(2);

    return [
      {
        name: "Positive",
        percentage: `${positivePercentage}%`,
        population: parseFloat(positivePercentage),
        color: "#00FF00",
      },
      {
        name: "Neutral",
        percentage: `${neutralPercentage}%`,
        population: parseFloat(neutralPercentage),
        color: "#FFFF00",
      },
      {
        name: "Negative",
        percentage: `${negativePercentage}%`,
        population: parseFloat(negativePercentage),
        color: "#FF0000",
      },
    ];
  };

  const feedbackAggregatedData = aggregateFeedback();

  return (
    <View style={styles.container}>
      <Header2 />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.feedbackSection}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FeedbackDetailView", { feedbackData })
            }
          >
            <Text style={styles.eventTitle}>Mr. & Mrs. Malik Wedding</Text>

            <Text style={styles.feedbackCount}>
              Total Feedback Submitted: {feedbackData.length}
            </Text>

            <PieChart
              data={feedbackAggregatedData}
              width={Dimensions.get("window").width - 30}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </TouchableOpacity>
        </View>

        {/* Display Feedbacks */}
        <View style={styles.feedbackList}>
          <Text style={styles.feedbackListTitle}>Submitted Feedbacks:</Text>
          {feedbackData.map((feedback, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Text style={styles.feedbackDate}>
                {new Date(feedback.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.feedbackText}>
                Event: {feedback.event_feedback}
              </Text>
              <Text style={styles.feedbackText}>
                Venue: {feedback.venue_feedback}
              </Text>
              <Text style={styles.feedbackText}>
                Catering: {feedback.catering_feedback}
              </Text>
              <Text style={styles.feedbackText}>
                Decoration: {feedback.decoration_feedback}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  feedbackSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#FFFAE5",
    borderRadius: 30,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  feedbackCount: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  feedbackList: { marginTop: 20, padding: 20 },
  feedbackListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackItem: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedbackDate: { fontSize: 12, color: "#555", marginBottom: 5 },
  feedbackText: { fontSize: 14, marginBottom: 5 },
});

export default FeedbackView;
