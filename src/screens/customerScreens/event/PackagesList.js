// src/components/EventPackages.js

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
// import styles from "../../styles/styles";
import styles from "../../adminMain/styles/styles";
// import useStore from "../../../../stateManagement/useStore";
import useStore from "../../../stateManagement/useStore";
// import EventPackageCard from "./EventPackageCard";
import EventPackageCard from "../../adminMain/screens/component/EventPackageCard";
// import AddPackageG from "./AddPackageGcp";
import AddPackageG from "../../adminMain/screens/component/AddPackageGcp";
// import { testSupabaseConnectivity } from "./testSupabaseConnectivity";
// import ManualTestImage from "./ManualTestImage";
import { TouchableOpacity } from "react-native";
// import EventPackageDetails from "../event/EventPackageDetails";
import { useNavigation } from "@react-navigation/native";
import EventPackageDetails from "../otherScreens/EventPackageDetails";
const PackagesList = () => {
  const {
    likedEvents,
    toggleLike,
    initializeLikedEvents,
    eventPackages,
    fetchEventPackages,
  } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const handleAddPackage = async (newPackage) => {
    try {
      await fetchEventPackages(); // Refresh the list after adding a package
    } catch (error) {
      console.error("Error fetching event packages:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await initializeLikedEvents();
      await fetchEventPackages();
      setIsLoading(false);
    };
    initialize();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Text style={styles.header}>
          <Text style={styles.title}>My Event Packages</Text>
        </Text> */}
        {/* <Button
          title="Add Event Package"
          onPress={() => setIsModalVisible(true)}
        /> */}
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {eventPackages.map((packageItem) => (
          <TouchableOpacity
            key={packageItem.id}
            onPress={() =>
              navigation.navigate("EventPackageDetails", { packageItem })
            }
          >
            <EventPackageCard
              event={{
                id: packageItem.id,
                image: packageItem.coverPhoto
                  ? { uri: packageItem.coverPhoto }
                  : null,
                title: packageItem.packageName,
                date: packageItem.packageCreatedDate,
                location: packageItem.location || "Location not specified",
                price: packageItem.totalPrice,
                type: packageItem.eventType,
                description:
                  packageItem.packageDescription || "No description available.",
              }}
              likedEvents={likedEvents}
              toggleLike={toggleLike}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Modal for adding new event/package */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <AddPackageG
          onClose={() => setIsModalVisible(false)}
          onAddPackage={handleAddPackage}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default PackagesList;


