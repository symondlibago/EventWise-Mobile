import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header2 from "../elements/Header2";

const Feedback = () => {
  const [eventFeedback, setEventFeedback] = useState("");
  const [venueFeedback, setVenueFeedback] = useState("");
  const [cateringFeedback, setCateringFeedback] = useState("");
  const [decorationFeedback, setDecorationFeedback] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleFeedbackSubmit = async () => {
    if (
      !eventFeedback.trim() ||
      !venueFeedback.trim() ||
      !cateringFeedback.trim() ||
      !decorationFeedback.trim()
    ) {
      setErrorMessage("All feedback fields must be filled.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.38:5000/submit_feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_feedback: eventFeedback,
          venue_feedback: venueFeedback,
          catering_feedback: cateringFeedback,
          decoration_feedback: decorationFeedback,
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setModalVisible(true); // Show success modal
    } catch (error) {
      setErrorMessage("Couldn't connect to server");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setEventFeedback("");
    setVenueFeedback("");
    setCateringFeedback("");
    setDecorationFeedback("");
    navigation.navigate("FeedbackView");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.textStyle}>We Value Your Feedback</Text>

          <Text>What do you think about the Event?</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            onChangeText={setEventFeedback}
            value={eventFeedback}
          />

          <Text>What do you think about the Venue?</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            onChangeText={setVenueFeedback}
            value={venueFeedback}
          />

          <Text>What do you think about the Food Catering?</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            onChangeText={setCateringFeedback}
            value={cateringFeedback}
          />

          <Text>What do you think about the Decoration?</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            onChangeText={setDecorationFeedback}
            value={decorationFeedback}
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleFeedbackSubmit}
          >
            <Text style={styles.buttonText}>Submit Feedbacks</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <TouchableOpacity
              style={styles.modalBackground}
              onPress={closeModal}
            >
              <View style={styles.modalContent}>
                <Image
                  source={require("../pictures/Popf.png")}
                  style={styles.popupImage}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  textStyle: { fontSize: 26, textAlign: "center", marginBottom: 40 },
  inputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: "#EFBF04",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginHorizontal: 80,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: { color: "red", textAlign: "center", marginTop: 5 },
  modalMessage: { fontSize: 18, textAlign: "center" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    position: "absolute",
    top: 25,
    right: 20,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  popupImage: {
    width: 250,
    height: 250,
  },
});

export default Feedback;
