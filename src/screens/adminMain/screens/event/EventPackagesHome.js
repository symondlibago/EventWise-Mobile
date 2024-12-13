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
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventPackageCard from "../component/EventPackageCard";
import AddPackageG from "../component/AddPackageGcp";
import { testSupabaseConnectivity } from "../component/testSupabaseConnectivity";
import ManualTestImage from "../component/ManualTestImage";

const EventPackagesHome = () => {
  const {
    likedEvents,
    toggleLike,
    initializeLikedEvents,
    eventPackages,
    fetchEventPackages,
  } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Text style={styles.header}>
          <Text style={styles.title}>Event Packages Archived</Text>
        </Text>

        {/* test connectivity */}
        {/* <Button title="test" onPress={testSupabaseConnectivity} /> */}
        {/* <ManualTestImage /> */}
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {eventPackages.map((packageItem) => {
          // debugger;
          // console.log("Package ID:", packageItem);
          return (
            <EventPackageCard
              key={packageItem.id}
              event={{
                id: packageItem.id,
                image: packageItem.coverPhoto
                  ? { uri: packageItem.coverPhoto }
                  : require("../../../../../assets/event2.png"),
                title: packageItem.packageName,
                date: packageItem.packageCreatedDate,
                location: packageItem.location || "Location not specified", // Adjust based on your data
                price: packageItem.totalPrice,
                description:
                  packageItem.packageDescription || "No description available.",
              }}
              likedEvents={likedEvents}
              toggleLike={toggleLike}
            />
          );
        })}
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

export default EventPackagesHome;
