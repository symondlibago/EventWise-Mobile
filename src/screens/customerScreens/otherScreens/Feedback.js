import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
} from "react-native";
import Header2 from "../elements/Header2";

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("event");
  const [feedbackData, setFeedbackData] = useState({
    overallExperience: "",
    eventExpectations: "",
    expectationsDetails: "",
    venueRating: "",
    recommendationLikelihood: "",
    suggestions: "",
    serviceFeedback: "", // New field to store service feedback
  });
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // Modal for the image popup
  const [selectedService, setSelectedService] = useState(null); // To track selected service for feedback

  // List of services
  const services = [
    { name: "Food Catering", category: "Food Catering" },
    { name: "Photography", category: "Photography" },
  ];

  const handleInputChange = (field, value) => {
    setFeedbackData({ ...feedbackData, [field]: value });
  };

  const handleSubmitServiceFeedback = () => {
    console.log("Service Feedback Submitted:", feedbackData.serviceFeedback);
    setShowModal(false); // Close service feedback modal
    setShowImageModal(true); // Show the image modal after submitting feedback
  };

  const handleSubmit = () => {
    setShowImageModal(true); // Show the service feedback modal
    console.log("Feedback Data:", feedbackData);
    // Reset the feedback form
    setFeedbackData({
      overallExperience: "",
      eventExpectations: "",
      expectationsDetails: "",
      venueRating: "",
      recommendationLikelihood: "",
      suggestions: "",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "event" && styles.activeTab]}
            onPress={() => setActiveTab("event")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "event" && styles.activeTabText,
              ]}
            >
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "serviceProvider" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("serviceProvider")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "serviceProvider" && styles.activeTabText,
              ]}
            >
              Service Provider
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        <View style={styles.contentContainer}>
          {activeTab === "event" ? (
            <View>
              {/* Feedback Questions */}
              <Text style={styles.question}>
                How would you rate your overall experience at the event?
              </Text>
              {/* Options */}
              <View style={styles.optionsContainer}>
                {["Excellent", "Good", "Fair", "Poor"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      feedbackData.overallExperience === option &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      handleInputChange("overallExperience", option)
                    }
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.question}>
                Did the event meet your expectations?
              </Text>
              <View style={styles.optionsContainer}>
                {["Yes", "No"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      feedbackData.eventExpectations === option &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      handleInputChange("eventExpectations", option)
                    }
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {feedbackData.eventExpectations === "No" && (
                <TextInput
                  style={styles.input}
                  placeholder="Please provide details"
                  placeholderTextColor="#888"
                  value={feedbackData.expectationsDetails}
                  onChangeText={(text) =>
                    handleInputChange("expectationsDetails", text)
                  }
                />
              )}

              <Text style={styles.question}>
                How would you rate the venue/location of the event?
              </Text>
              <View style={styles.optionsContainer}>
                {["Excellent", "Good", "Fair", "Poor"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      feedbackData.venueRating === option &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleInputChange("venueRating", option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.question}>
                How likely are you to recommend this event to others?
              </Text>
              <View style={styles.optionsContainer}>
                {["Very likely", "Somewhat likely", "Not likely"].map(
                  (option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionButton,
                        feedbackData.recommendationLikelihood === option &&
                          styles.selectedOption,
                      ]}
                      onPress={() =>
                        handleInputChange("recommendationLikelihood", option)
                      }
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <Text style={styles.question}>
                How was the event overall? Any suggestions for improvement?
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Your suggestions..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={5}
                value={feedbackData.suggestions}
                onChangeText={(text) => handleInputChange("suggestions", text)}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* Service Provider Feedback Section */}
              <Text style={styles.sectionTitle}>Please rate our services</Text>
              {services.map((service) => (
                <TouchableOpacity
                  key={service.name}
                  style={styles.serviceContainer}
                  onPress={() => {
                    setSelectedService(service);
                    setShowModal(true); // Show service feedback modal
                  }}
                >
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceCategory}>{service.category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal for Service Feedback */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {selectedService && (
              <View>
                <Text style={styles.modalTitle}>
                  How do you like the {selectedService.name} service?
                </Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Your feedback..."
                  placeholderTextColor="#888"
                  multiline
                  numberOfLines={5}
                  value={feedbackData.serviceFeedback}
                  onChangeText={(text) =>
                    handleInputChange("serviceFeedback", text)
                  }
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitServiceFeedback}
                >
                  <Text style={styles.submitButtonText}>Submit Feedback</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for Pop-Up Image */}
      <Modal visible={showImageModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowImageModal(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              source={require("../pictures/Popf.png")}
              style={styles.modalImage}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#9F7E1C",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "#9F7E1C",
  },
  optionText: {
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#9F7E1C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  serviceCategory: {
    fontSize: 14,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#9F7E1C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Feedback;
