// ServiceManager2.js
import { View, Text } from "react-native";
import React from "react";
import AddService from "./addService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { fetchServices } from "../../../../services/serviceProvider/serviceProviderServices";
const ServiceManager2 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddPackage = async (newPackage) => {
    try {
      await fetchEventPackages(); // Refresh the list after adding a package
    } catch (error) {
      console.error("Error fetching event packages:", error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <AddService
          onClose={() => setIsModalVisible(false)}
          onAddPackage={handleAddPackage}
        />
      </View>
      <Text>Hello world</Text>
    </SafeAreaView>
  );
};

export default ServiceManager2;
