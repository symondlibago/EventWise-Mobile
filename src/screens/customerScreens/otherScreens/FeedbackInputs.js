import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  getServicesInEvent,
  submitFeedback,
} from "../../../services/feedbackServices";
import Header2 from "../elements/Header2";
import useStore from "../../../stateManagement/useStore";
import { useServicesStore } from "../../../stateManagement/admin/useServicesStore";

const FeedbackInputs = ({ navigation, route }) => {
  const activeProfile = useStore((state) => state.activeProfile);
  const user = useStore((state) => state.user);
  const userId = useStore((state) => state.userId);

  // Get eventId from navigation params
  const { eventId } = route.params;

  // State for services and feedbacks
  const [feedbacks, setFeedbacks] = useState([{ service: "", feedback: "" }]);

  const { inEventServices, setInEventServices } = useServicesStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesInEvent(eventId);
        console.log("this is the response: ", response);
        setInEventServices(response.map((service) => service.serviceCategory));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [eventId]);

  console.log("InEventServices:", JSON.stringify(inEventServices, null, 2));
  console.log(activeProfile, "this is the tuser", eventId);

  // Handler to update a specific feedback entry
  const handleFeedbackChange = (index, key, value) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index][key] = value;
    setFeedbacks(updatedFeedbacks);
  };

  // Handler to add a new feedback field
  const handleAddFeedback = () => {
    setFeedbacks([...feedbacks, { service: "", feedback: "" }]);
  };

  // Handler to submit feedback
  const handleSubmit = async () => {
    if (!activeProfile) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    // Prepare the feedback object with service-specific keys
    const feedbackData = {
      event_id: parseInt(eventId),
      customer_name: user,
      customer_id: userId,
    };

    feedbacks.forEach((entry) => {
      const serviceKey = `${entry.service
        .toLowerCase()
        .replace(" ", "_")}_feedback`;
      feedbackData[serviceKey] = entry.feedback;
    });

    console.log("Feedback data to be sent:", feedbackData);

    try {
      const response = await submitFeedback(feedbackData);
      console.log("Feedback submitted successfully:", response);
      Alert.alert("Success", "Feedback submitted successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Submit Feedback</Text>

        {feedbacks.map((entry, index) => (
          <View key={index} style={styles.feedbackBlock}>
            <RNPickerSelect
              onValueChange={(value) =>
                handleFeedbackChange(index, "service", value)
              }
              items={inEventServices.map((service) => ({
                label: service,
                value: service,
              }))}
              placeholder={{ label: "Select Service", value: null }}
              value={entry.service}
            />
            <TextInput
              style={styles.input}
              placeholder="Feedback"
              value={entry.feedback}
              onChangeText={(text) =>
                handleFeedbackChange(index, "feedback", text)
              }
            />
          </View>
        ))}

        <TouchableOpacity onPress={handleAddFeedback} style={styles.addButton}>
          <Text style={styles.addButtonText}>
            Add Feedback for Another Service
          </Text>
        </TouchableOpacity>

        <Button title="Submit Feedback" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  feedbackBlock: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FeedbackInputs;
