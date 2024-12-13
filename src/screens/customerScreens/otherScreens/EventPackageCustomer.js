import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../elements/SearchBAr";
import Svg, { LinearGradient, Stop, Rect, Defs } from "react-native-svg";
import Header2 from "../elements/Header2";

const EventPackageCustomer = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleChoosePress = (pkg) => {
    setSelectedPackage(pkg.image);
    setSelectedVenue(pkg.venue);
    setSelectedAddress(pkg.address);
    setDetailVisible(true);
  };

  const handleConfirmPress = () => {
    navigation.navigate("BookingContinuation3", {
      selectedVenueLocation: selectedVenue,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#eeba2b"
              style={{ marginLeft: 20 }} // Increase this value to move it to the right
            />
          </TouchableOpacity>
            <Text style={styles.debutText}>Wedding Package</Text>
            <View style={styles.pack}>
              {packageData.map((item, index) => (
                <TouchableOpacity onPress={() => openModal(item)}>
                  <Image source={item.image} style={styles.packageImage} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>

        {selectedEvent && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={closeModal}
                >
                  <Icon
                    name="close"
                    size={24}
                    color="#000"
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                <View style={styles.eventDateContainer}>
                  <Text style={styles.eventDateLabel}>Package Inclusion</Text>
                </View>

                <Image
                  source={require("../pictures/popupbg.png")}
                  style={styles.backgroundImage}
                />

                <Image
                  source={require("../pictures/epckinc.png")}
                  style={styles.foregroundImage}
                />

                <TouchableOpacity
                  style={styles.viewGuestsButton}
                  onPress={() => {
                    closeModal();
                    navigation.navigate("ProfileOrganizer");
                  }}
                >
                  <Text style={styles.viewGuestsText}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const packageData = [
  {
    venue: "Limketkai Luxe Hotel",
    address: "22-B, W White Road, Lapasan, CDO, 234567",
    image: require("../pictures/epck1.png"),
  },
  {
    venue: "Venue B",
    address: "Address B",
    image: require("../pictures/epck2.png"),
  },
  {
    venue: "Venue C",
    address: "Address C",
    image: require("../pictures/epck1.png"),
  },
  {
    venue: "Venue D",
    address: "Address D",
    image: require("../pictures/epck2.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  debutText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  pack: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  packageImage: {
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 30,
    zIndex: 4,
  },
  closeIcon: {
    zIndex: 5,
  },
  eventDateContainer: {
    zIndex: 6,
    position: "absolute",
    top: 40,
    alignSelf: "center",
  },
  eventDateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
    zIndex: 1,
  },
  foregroundImage: {
    width: 250,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
    zIndex: 3,
    marginTop: 70,
    marginBottom: 100,
  },
  viewGuestsButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    zIndex: 6,
  },
  viewGuestsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EventPackageCustomer;
