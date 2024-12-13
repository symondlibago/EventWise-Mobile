import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAspectsWithSentimentEvent } from "../../../../services/feedbackServices";

const FeedbackDetail = ({ route }) => {
  const { event } = route.params;
  const [sentimentData, setSentimentData] = useState(null); // State to store sentiment data
  const [rawFeedbackData, setRawFeedbackData] = useState(null); // State to store raw feedback
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors
  const [expandedAspect, setExpandedAspect] = useState(null); // State to track which aspect is expanded

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await getAspectsWithSentimentEvent(event.id);
        setSentimentData(response.aspects_sentiment_count); // Store sentiment count data
        setRawFeedbackData(response.aspects_raw_feedback); // Store raw feedback data
      } catch (err) {
        setError("Failed to fetch sentiment data"); // Set error state in case of failure
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchSentimentData();
  }, [event.id]);

  const toggleAspect = (aspect) => {
    // Toggle the expanded aspect
    setExpandedAspect(expandedAspect === aspect ? null : aspect);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.eventId}>Event ID: {event.id}</Text>

      <ScrollView style={styles.sentimentDetails}>
        {sentimentData ? (
          Object.keys(sentimentData).map((aspect) => (
            <View key={aspect} style={styles.aspectContainer}>
              <TouchableOpacity
                onPress={() => toggleAspect(aspect)} // Toggle the clicked aspect
                style={styles.aspectHeader}
              >
                <Text style={styles.aspectTitle}>
                  {aspect.replace("_", " ")}
                </Text>
                <Text style={styles.sentimentSummary}>
                  Positive: {sentimentData[aspect].positive} | Neutral:{" "}
                  {sentimentData[aspect].neutral} | Negative:{" "}
                  {sentimentData[aspect].negative}
                </Text>
              </TouchableOpacity>

              {/* Show raw feedback if the aspect is expanded */}
              {expandedAspect === aspect && rawFeedbackData[aspect] && (
                <View style={styles.rawFeedbackContainer}>
                  {rawFeedbackData[aspect].map((feedback, index) => (
                    <View key={index} style={styles.feedbackItem}>
                      <Text style={styles.customerName}>
                        {feedback.customer_name} (ID: {feedback.customer_id}):
                      </Text>
                      <Text style={styles.rawFeedbackText}>
                        - {feedback.feedback_text}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <Text>No sentiment data available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventId: {
    fontSize: 16,
    marginBottom: 5,
  },
  sentimentDetails: {
    marginTop: 20,
  },
  aspectContainer: {
    marginBottom: 10,
  },
  aspectHeader: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  aspectTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  sentimentSummary: {
    fontSize: 14,
    color: "#666",
  },
  rawFeedbackContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  feedbackItem: {
    marginBottom: 5,
  },
  customerName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  rawFeedbackText: {
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default FeedbackDetail;
