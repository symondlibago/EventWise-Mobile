import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFeedbackStore } from "../../../../stateManagement/admin/useFeedbackStore";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import { useNavigation } from "@react-navigation/native";

const FeedbackAdmin = () => {
  const {
    currentFeedbacks,
    setCurrentFeedbacks,
    feedbacksByEvent,
    setFeedbacksByEvent,
  } = useFeedbackStore();
  const { currentEvents, setCurrentEvents } = useEventStore();
  const navigation = useNavigation();
  console.log(
    "this is the fedbacks by evnet" + JSON.stringify(feedbacksByEvent)
  );
  console.log("Current Events", JSON.stringify(currentEvents, ["status", 2]));

  const renderFeedbackItem = ({ item }) => {
    const event = currentEvents.find((event) => event.id === item.event_id);
    return (
      <TouchableOpacity
        style={styles.feedbackItem}
        onPress={() =>
          navigation.navigate("FeedbackDetail", {
            event: event,
            feedback: item,
          })
        }
      >
        <Text style={styles.eventName}>{event?.name}</Text>
        <Text style={styles.eventId}>Event ID: {item.event_id}</Text>
        <Text style={styles.feedbackSummary}>
          Positive: {item.positive}, Neutral: {item.neutral}, Negative:{" "}
          {item.negative}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback by Event</Text>
      <FlatList
        data={feedbacksByEvent.events}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.event_id.toString()}
      />
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventId: {
    fontSize: 16,
    marginBottom: 5,
  },
  feedbackSummary: {
    fontSize: 16,
    color: "#666",
  },
});

export default FeedbackAdmin;
