import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import pro_pic from "../assets/pro_pic.png";
import eventImage from "../assets/event2.png"; // Adjust the path as necessary

const NotificationSP = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisibleAccept, setModalVisibleAccept] = useState(false);
  const [modalVisibleDecline, setModalVisibleDecline] = useState(false);

  const notificationsData = {
    "This Week": [
      {
        id: "1",
        title: "Jane Wedding",
        joined: "Diwata Pares, Heart Catering, and 35 others",
        daysAgo: "1d Ago",
        rightImage: pro_pic,
      },
      {
        id: "2",
        title: "John Birthday",
        joined: "Happy Cakes, DJ Mix, and 20 others",
        daysAgo: "3d Ago",
        rightImage: pro_pic,
      },
    ],
    "Booking Request": [
      {
        id: "1",
        name: "Jane Doe",
        title: "Wedding",
        daysAgo: "2d Ago",
        image: eventImage,
        date: "2024-07-05",
        address: "CDO",
      },
      {
        id: "2",
        name: "John Smith",
        title: "Birthday",
        daysAgo: "4d Ago",
        image: eventImage,
        date: "2024-08-15",
        address: "Davao",
      },
    ],
    All: [
      {
        id: "1",
        title: "Jane Wedding",
        joined: "Diwata Pares, Heart Catering, and 35 others",
        daysAgo: "1d Ago",
        rightImage: pro_pic,
      },
      {
        id: "2",
        name: "Jane Doe",
        title: "Wedding",
        daysAgo: "2d Ago",
      },
      {
        id: "3",
        name: "Emily Johnson",
        service: "Photographer",
        daysAgo: "5d Ago",
      },
    ],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "This Week":
        return notificationsData["This Week"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image source={pro_pic} style={styles.profilePicture} />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationJoined}>
                  {notification.joined}
                </Text>
              </View>
            </View>
            {notification.rightImage && (
              <View style={styles.rightContainer}>
                <Image
                  source={notification.rightImage}
                  style={styles.rightImage}
                />
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            )}
          </View>
        ));
      case "Booking Request":
        return notificationsData["Booking Request"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              <Image
                source={notification.image}
                style={styles.profilePicture}
              />
              <View style={styles.notificationDetails}>
                <Text style={styles.notificationName}>{notification.name}</Text>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => {
                  setSelectedEvent(notification);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => {
                  setSelectedEvent(notification);
                  setModalVisibleAccept(true);
                }}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => {
                  setSelectedEvent(notification);
                  setModalVisibleDecline(true);
                }}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ));
      case "All":
        return notificationsData["All"].map((notification) => (
          <View key={notification.id} style={styles.notificationBox}>
            <View style={styles.leftContainer}>
              {notification.profilePicture ? (
                <Image
                  source={notification.profilePicture}
                  style={styles.profilePicture}
                />
              ) : (
                <Image source={pro_pic} style={styles.profilePicture} />
              )}
              <View style={styles.notificationDetails}>
                {notification.title && (
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                )}
                {notification.name && (
                  <Text style={styles.notificationName}>
                    {notification.name}
                  </Text>
                )}
                {notification.service && (
                  <Text style={styles.notificationService}>
                    {notification.service}
                  </Text>
                )}
                {notification.joined && (
                  <Text style={styles.notificationJoined}>
                    {notification.joined}
                  </Text>
                )}
                <Text style={styles.daysAgo}>{notification.daysAgo}</Text>
              </View>
            </View>
            {notification.rightImage && (
              <View style={styles.rightContainer}>
                <Image
                  source={notification.rightImage}
                  style={styles.rightImage}
                />
              </View>
            )}
          </View>
        ));
      default:
        return null;
    }
  };

  const renderModal = () => (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        {selectedEvent && (
          <View style={styles.modalDetails}>
            <Ionicons
              name="close"
              size={24}
              color="black"
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
            <View style={styles.titleLine} />
            <Text style={styles.modalDate}>
              Event Date: {selectedEvent.date}
            </Text>
            <Image
              source={require("../assets/cover.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalDescription}>
              This event, hosted by {selectedEvent.name}, is expected to be a
              memorable occasion with various activities planned for all
              attendees. Join us for a day filled with joy and celebration.
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );

  const renderModalAccept = () => (
    <Modal
      transparent={true}
      visible={modalVisibleAccept}
      animationType="slide"
      onRequestClose={() => setModalVisibleAccept(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisibleAccept(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        {selectedEvent && (
          <View style={styles.modalDetails}>
            <Ionicons
              name="close"
              size={24}
              color="black"
              style={styles.closeIcon}
              onPress={() => setModalVisibleAccept(false)}
            />
            <Image
              source={require("../assets/popup-accept.png")}
              style={styles.modalImageAccept}
            />
          </View>
        )}
      </View>
    </Modal>
  );

  const renderModalDecline = () => (
    <Modal
      transparent={true}
      visible={modalVisibleDecline}
      animationType="slide"
      onRequestClose={() => setModalVisibleDecline(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisibleDecline(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        {selectedEvent && (
          <View style={styles.modalDetails}>
            <Ionicons
              name="close"
              size={24}
              color="black"
              style={styles.closeIcon}
              onPress={() => setModalVisibleDecline(false)}
            />
            <Image
              source={require("../assets/popup-decline.png")}
              style={styles.modalImageAccept}
            />
          </View>
        )}
      </View>
    </Modal>
  );

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]} // Gradient colors
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.tabsContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {["All", "This Week", "Booking Request"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                {
                  backgroundColor: selectedTab === tab ? "#FFC42B" : "#FFFFFF", // Updated background color
                  borderColor: selectedTab === tab ? "#FFC42B" : "#000000",
                },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedTab === tab ? "#000000" : "#000000",
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {renderModal()}
      {renderModalAccept()}
      {renderModalDecline()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1, // Ensure it is above other elements
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  tabsContainer: {
    flexDirection: "row",
    marginVertical: 8,
    marginLeft: 43,
  },
  tabsContentContainer: {
    flexDirection: "row",
  },
  tabButton: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 16,
  },
  notificationBox: {
    backgroundColor: "#FFFFFF", // Background color for notifications
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  notificationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  notificationJoined: {
    fontSize: 14,
    color: "black",
  },
  notificationService: {
    fontSize: 14,
    color: "black",
  },
  daysAgo: {
    fontSize: 12,
    color: "black",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  viewDetailsButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  declineButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalDetails: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    width: "80%",
    maxHeight: "80%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  modalImage: {
    width: "100%",
    height: "50%",
    borderRadius: 8,
    marginBottom: 16,
  },
  modalImageAccept: {
    width: "100%",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 16,
    color: "black",
    marginBottom: 8,
  },
  modalAddress: {
    fontSize: 16,
    color: "black",
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: "black",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  titleLine: {
    height: 2,
    backgroundColor: "#FFC42B",
    marginVertical: 8,
    width: "100%",
  },
});

export default NotificationSP;
