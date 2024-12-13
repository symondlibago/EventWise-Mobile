import React, { useState } from "react";
import ManualTestImage from "../../adminMain/screens/component/ManualTestImage";
import { testSupabaseConnectivity } from "../../adminMain/screens/component/testSupabaseConnectivity";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { useServiceStore } from "../../../stateManagement/serviceProvider/useServiceStore";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import ServiceManager from "./ServiceTab/ServiceManager";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import ServiceCard from "./ServiceTab/ServiceCard";
import { useEffect } from "react";
import {
  updateService,
  deleteService,
  fetchMyServices,
} from "../../../services/serviceProvider/serviceProviderServices";

const ServiceSP = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { services, setServices } = useServiceStore();

  const [likedServices, setLikedServices] = useState({});
  // Use useFocusEffect to call refreshServices when this screen is focused
  const refreshServices = useCallback(async () => {
    setRefreshing(true); // Start refreshing
    try {
      const updatedServices = await fetchMyServices();
      setServices(updatedServices); // Update services in store
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  }, [setServices]);
  const toggleLike = (serviceId) => {
    setLikedServices((prevLikedServices) => {
      const newLikedServices = { ...prevLikedServices };
      if (newLikedServices[serviceId]) {
        delete newLikedServices[serviceId];
      } else {
        newLikedServices[serviceId] = true;
      }
      return newLikedServices;
    });
  };
  const handleEditService = async (serviceId, updatedData) => {
    try {
      await updateService(serviceId, updatedData); // Perform the update action
      refreshServices(); // Refresh the services list
    } catch (error) {
      console.error("Failed to update service", error);
    }
  };

  // Modify the deleteService to call refreshServices after deleting
  const handleDeleteService = async (id) => {
    try {
      await deleteService(id); // Assuming deleteService is a valid function
      refreshServices(); // Refresh the service list after deletion
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshServices} // Trigger refresh on pull-to-refresh
            colors={["#ff9900"]} // Customize color for the refresh indicator
            tintColor="#ff9900" // Customize the spinner color
          />
        }
      >
        <ServiceManager />
        <View style={[]}>
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{ gap: 20 }}
            accessibilityViewIsModal={true}
            accessibilityModalRoot={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ServiceCard
                service={item}
                likedServices={likedServices}
                toggleLike={toggleLike}
                handleDeleteService={handleDeleteService}
                handleEditService={handleEditService}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
    // margin: 5,
    marginBottom: 50,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  brokenBox: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 80,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF5F5",
  },
  brokenBoxText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default ServiceSP;
