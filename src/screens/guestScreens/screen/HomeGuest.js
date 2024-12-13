import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "../elements/CustomHeader";

const HomeGuest = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToFeedbackScreen = () => {
    navigation.navigate("FeedbackGuest");
  };

  return (
    <ImageBackground
      source={require("../assets/Wallpaper.png")}
      style={styles.background}
    >
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>You're Invited!</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.qrCodeContainer}>
            <QRCode value="https://www.github.com/chelseafarley" size={150} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailText, styles.highlightText]}>
              Event Name
            </Text>
            <View style={styles.eventInfoOuterContainer}>
              <Text style={[styles.detailText, { color: "black" }]}>
                Mr & Mrs Malik's Wedding
              </Text>
            </View>
            <Text style={[styles.detailText, styles.highlightText]}>
              Event Date
            </Text>
            <View style={styles.eventInfoOuterContainer}>
              <Text style={[styles.detailText, { color: "black" }]}>
                12/00/23
              </Text>
            </View>
            <Text style={[styles.detailText, styles.highlightText]}>
              Event Type
            </Text>
            <View style={styles.eventInfoOuterContainer}>
              <Text style={[styles.detailText, { color: "black" }]}>
                Wedding
              </Text>
            </View>
            <Text style={[styles.detailText, styles.highlightText]}>
              Location
            </Text>
            <View style={styles.eventInfoOuterContainer}>
              <Text style={[styles.detailText, { color: "black" }]}>
                Benros Hotel, 976 Tiano Brothers St, Cagayan de Oro, 9000
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </ScrollView>

      {/* Modal for Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Image
              source={require("../assets/Popup.png")}
              style={styles.popupImage}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation Icons */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <View style={styles.navDivider}></View>
          <View style={styles.navIconContainer}>
            <Ionicons name="home" size={24} color="black" />
          </View>
          <Text style={styles.navText}>Event</Text>
        </View>
        <TouchableOpacity
          style={styles.navItem}
          onPress={navigateToFeedbackScreen}
        >
          <Ionicons name="chatbubble" size={24} color="black" />
          <Text style={styles.navText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 120,
    paddingVertical: 0,
  },
  header: {
    marginBottom: 25,
  },
  headerText: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "rgba(128, 128, 128, 0.4)",
    padding: 25,
    borderRadius: 20,
    width: "230%",
    maxWidth: 900,
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 30,
    paddingLeft: 20,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  eventInfoOuterContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
    color: "black",
  },
  highlightText: {
    color: "#FFC42B",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#9F7E1C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#9F7E1C",
    paddingVertical: 10,
    borderRadius: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 90,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "black",
    marginTop: 3,
  },
  navDivider: {
    borderTopColor: "black",
    borderTopWidth: 4,
    borderRadius: 3,
    marginBottom: 7,
    width: 75,
    marginTop: -5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    right: 25,
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

export default HomeGuest;
