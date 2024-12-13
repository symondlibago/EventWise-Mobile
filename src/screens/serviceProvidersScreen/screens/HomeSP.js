import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

const eventsData = [
  {
    id: "1",
    title: "Mr. & Mrs. Malik Wedding",
    image: require("../assets/event1.png"),
    date: "2024-07-01",
    address: "CDO",
    buttons: ["Edit", "Equipment"],
  },
  {
    id: "2",
    title: "Elizabeth Birthday",
    image: require("../assets/event2.png"),
    date: "2024-08-12",
    address: "CDO",
    buttons: ["Attendee", "Feedback", "Inventory"],
  },
  {
    id: "3",
    title: "Class of 1979 Reunion",
    image: require("../assets/event3.png"),
    date: "2024-09-25",
    address: "CDO",
    buttons: ["Edit", "Equipment"],
  },
  // Additional events...
];

const HomeSP = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openEventModal(item)}
      style={styles.eventItem}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#eeba2b" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#eeba2b" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeEventModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Gray Rectangle */}
        <View style={styles.rectangle}>
          <View style={styles.row}>
            <Image
              source={require("../assets/pro_pic.png")}
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.nameText}>Service Provider</Text>
            </View>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={24} color="#eeba2b" />
              <Text style={styles.locationText}>Cagayan de Oro City</Text>
            </View>
          </View>
          <Image
            source={require("../assets/home.png")}
            style={styles.homeImage}
          />
        </View>

        {/* Fading Line */}
        <LinearGradient
          colors={[
            "rgba(255,196,43,0)",
            "rgba(255,196,43,1)",
            "rgba(255,196,43,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fadingLine}
        />

        {/* Popular Event Text */}
        <Text style={styles.popularEventText}>Popular Events</Text>

        {/* Horizontal Scrolling Event List */}
        <FlatList
          data={eventsData}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsListContainer}
        />
      </ScrollView>

      {/* Modal for event details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeEventModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeEventModal}
            >
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {/* Event details */}
            {selectedEvent && (
              <>
                <Image source={selectedEvent.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <View style={styles.modalDetailRow}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={16}
                    color="#eeba2b"
                  />
                  <Text style={styles.modalDetailText}>
                    {selectedEvent.date}
                  </Text>
                </View>
                <View style={styles.modalDetailRow}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    color="#eeba2b"
                  />
                  <Text style={styles.modalDetailText}>
                    {selectedEvent.address}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollViewContainer: {
    paddingBottom: 60,
  },
  rectangle: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 16,
    color: "#777",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
  },
  homeImage: {
    width: screenWidth - 32,
    height: (screenWidth - 32) * 0.5,
    marginTop: 20,
    resizeMode: "contain",
  },
  fadingLine: {
    height: 2,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  popularEventText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: "#eeba2b",
    fontWeight: "bold",
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    color: "black",
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalDetailText: {
    color: "black",
    marginLeft: 5,
  },
});

export default HomeSP;
