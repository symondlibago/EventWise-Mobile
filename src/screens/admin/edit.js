import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pic from "./assets/pic.png";
const EditScreen = ({ navigation }) => {
  const [showRemoveGuest, setShowRemoveGuest] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const handlePress = () => {
    setShowRemoveGuest(!showRemoveGuest);
  };

  const handleGenerateInvitation = () => {
    setShowInvitation(true);
  };

  const handleCloseInvitation = () => {
    setShowInvitation(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Burger icon to open sidebar */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.eventContainer}>
          <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
            Event Name
          </Text>
          <View style={[styles.rectangle, styles.eventInfo]}>
            <Text style={styles.eventDescription}>Mr & Mrs Smith Wedding</Text>
          </View>
          <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
            Event Date
          </Text>
          <View style={[styles.rectangle, styles.eventInfo]}>
            <Text style={styles.eventDescription}>Saturday, June 1, 2024</Text>
          </View>
          <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
            Event Type
          </Text>
          <View style={[styles.rectangle, styles.eventInfo]}>
            <Text style={styles.eventDescription}>Wedding Ceremony</Text>
          </View>
          <Text style={[styles.locationNameText, { color: "#FFC42B" }]}>
            Event Location
          </Text>
          <View style={[styles.rectangle, styles.eventInfo]}>
            <Text style={styles.eventDescription}>
              123 Main Street, New York, NY 10001
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require("./assets/pic.png")} style={styles.image} />
          </View>
          <Text style={[styles.invitedTitle, { color: "#FFC42B" }]}>
            People Invited
          </Text>
          <View style={[styles.rectangle, styles.eventInfo]}>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.invitedText}>Name and Email</Text>
            </TouchableOpacity>
            {showRemoveGuest && (
              <View style={styles.removeGuestRectangle}>
                <Text style={styles.removeGuestText}>Remove guest</Text>
              </View>
            )}
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.invitedText}>Name and Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.invitedText}>Name and Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.invitedText}>Name and Email</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleGenerateInvitation}
          >
            <Text style={styles.submitButtonText}>
              SUBMIT AND GENERATE INVITATION
            </Text>
          </TouchableOpacity>
        </View>

        {/* Invitation Modal */}
        <Modal visible={showInvitation} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.invitationBox}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseInvitation}
              >
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
              <Text style={styles.invitationText}>You’re Invited!</Text>
              <View style={styles.invitationImageContainer}>
                <Image
                  source={require("./assets/qr.png")}
                  style={styles.invitationImage}
                />
              </View>
              <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
                Event Name
              </Text>
              <View style={[styles.rectangle, styles.eventInfo]}>
                <Text style={styles.eventDescription}>
                  Mr & Mrs Smith Wedding
                </Text>
              </View>
              <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
                Event Date
              </Text>
              <View style={[styles.rectangle, styles.eventInfo]}>
                <Text style={styles.eventDescription}>
                  Saturday, June 1, 2024
                </Text>
              </View>
              <Text style={[styles.eventNameText, { color: "#FFC42B" }]}>
                Event Type
              </Text>
              <View style={[styles.rectangle, styles.eventInfo]}>
                <Text style={styles.eventDescription}>Wedding Ceremony</Text>
              </View>
              <Text style={[styles.locationNameText, { color: "#FFC42B" }]}>
                Event Location
              </Text>
              <View style={[styles.rectangle, styles.eventInfo]}>
                <Text style={styles.eventDescription}>
                  123 Main Street, New York, NY 10001
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  eventContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  eventNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rectangle: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    maxWidth: "90%",
  },
  eventInfo: {
    backgroundColor: "white",
  },
  eventDescription: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",
  },
  locationNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  invitedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  invitedText: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  removeGuestRectangle: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  removeGuestText: {
    color: "white",
    textAlign: "center",
  },
  invitationBox: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  invitationImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  invitationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  invitationText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFC42B",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default EditScreen;
