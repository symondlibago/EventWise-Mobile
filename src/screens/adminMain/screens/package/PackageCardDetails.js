import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchPackageServiceDetails } from "../../../../services/organizer/adminPackageServices";

const PackageCardDetails = ({ route, navigation }) => {
  const { packageData } = route.params; // Retrieve the package data passed through navigation
  const [serviceDetails, setServiceDetails] = useState([]);

  console.log("packageData:", packageData);

  // Handle loading state when packageData is not available
  if (!packageData) {
    return <Text>Loading...</Text>;
  }

  // Fetch package service details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (packageData) {
          const details = await fetchPackageServiceDetails(packageData.id);
          setServiceDetails(details);
        }
      } catch (error) {
        console.error("Error fetching package service details: ", error);
      }
    };
    fetchDetails();
  }, [packageData]);

  return (
    <ScrollView style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10} />
            </TouchableOpacity>
      <View style={styles.card}>
        {/* Displaying package cover photo */}
        <Image
          source={{ uri: packageData?.coverPhoto }}
          style={styles.coverPhoto}
        />

        {/* Displaying package details */}
        <Text style={styles.title}>{packageData?.packageName}</Text>
        <Text style={styles.eventType}>
          Event Type: {packageData?.eventType}
        </Text>
        <Text style={styles.totalPrice}>
          Total Price: ₱{packageData?.totalPrice}
        </Text>

        {/* Package Services Section */}
        <Text style={styles.sectionTitle}>Package Services:</Text>
        {serviceDetails.length > 0 ? (
          serviceDetails.map((service, index) => (
            <View key={index} style={styles.serviceContainer}>
              <Image
                source={{ uri: service?.servicePhotoURL }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceName}>{service?.serviceName}</Text>
              <Text style={styles.serviceCategory}>
                Category: {service?.serviceCategory}
              </Text>
              <Text style={styles.servicePrice}>
                Price: ₱{service?.basePrice}
              </Text>
              <Text style={styles.serviceLocation}>
                Location: {service?.location}
              </Text>
              <Text style={styles.serviceRequirements}>
                Requirements: {service?.requirements}
              </Text>
              <Text style={styles.serviceFeatures}>
                Features: {service?.serviceFeatures?.join(", ")}
              </Text>
            </View>
          ))
        ) : (
          <Text>No services available for this package.</Text>
        )}

        {/* Created At and Last Updated */}
        <Text style={styles.sectionTitle}>Created At:</Text>
        <Text style={styles.createdAt}>
          {packageData?.created_at
            ? new Date(packageData?.created_at).toLocaleString()
            : "Not available"}
        </Text>

        <Text style={styles.sectionTitle}>Last Updated:</Text>
        <Text style={styles.updatedAt}>
          {packageData?.updated_at
            ? new Date(packageData?.updated_at).toLocaleString()
            : "Not available"}
        </Text>

        {/* Edit Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditPackageScreen", { packageData })
            }
          >
            <Text style={styles.buttonText}>Edit Package</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 200,
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  eventType: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  updatedAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#eeba2b",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  serviceLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  serviceRequirements: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  serviceFeatures: {
    fontSize: 14,
    color: "#666",
  },
  serviceImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default PackageCardDetails;
