import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  approveBookingEvent,
  fetchEventPackageDetails,
  fetchServices,
  fetchPackageServiceDetails,
} from "../../../../services/organizer/adminEventServices";

const EventCardDetails = ({ route, navigation }) => {
  const { eventData, userBookingDetails } = route.params;
  const [packageDetails, setPackageDetails] = useState([]); // Packages
  const [serviceDetails, setServiceDetails] = useState([]); // Services related to the package
  const [isLoading, setIsLoading] = useState(false);

  if (!eventData) {
    return <Text>Loading...</Text>;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (eventData) {
          // Fetch event's package details
          const packageData = await fetchEventPackageDetails(eventData.id);
          console.log("Package Data:", packageData); // Log the data
          setPackageDetails(packageData);

          // If package details exist, fetch related services
          if (packageData.length > 0) {
            const packageId = packageData[0]?.id; // Assuming package ID exists
            const services = await fetchPackageServiceDetails(packageId);
            setServiceDetails(services);
          }
        }
      } catch (error) {
        console.error("Error fetching details: ", error);
        Alert.alert("Error", "Unable to load package or service details.");
      }
    };
    fetchDetails();
  }, [eventData]);

  const handlingApproveButton = async (eventid) => {
    setIsLoading(true);
    try {
      const response = await approveBookingEvent(eventid);
      setIsLoading(false);
      console.log("Approve!!" + response);
      Alert.alert("Success", "Booking approved successfully!");
    } catch (error) {
      console.log("Error approving booking: ", error);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
    {/* Back Navigation */}
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10} />
    </TouchableOpacity>

    {/* Event Details */}
    <View style={styles.card}>
      <Image source={{ uri: eventData?.coverPhoto }} style={styles.coverPhoto} />
      <Text style={styles.title}>{eventData?.name}</Text>
      <Text style={styles.subtitle}>Booked by: {userBookingDetails?.service_provider_name}</Text>
      <Text style={styles.eventType}>Event Type: {eventData?.type}</Text>
      <Text style={styles.totalPrice}>Total Price: N/a</Text>

      <Text style={styles.sectionTitle}>Event Details</Text>
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.eventDetail}>Date: {new Date(eventData?.date).toLocaleString()}</Text>
        <Text style={styles.eventDetail}>Time: {eventData?.time}</Text>
        <Text style={styles.eventDetail}>Location: {eventData?.location}</Text>
        <Text style={styles.eventDetail}>Description: {eventData?.description}</Text>
      </View>

      {/* Package Section */}
      <Text style={styles.sectionTitle}>Package</Text>
      {packageDetails.length > 0 ? (
        packageDetails.map((pkg, index) => (
          <View key={index} style={styles.packageContainer}>
            <Text style={styles.packageName}>{pkg.packageName}</Text>
            <Text>Category: {pkg.eventType}</Text>
            <Text>Price: ₱{pkg.totalPrice}</Text>
            <Text>Pax:{pkg.pax}</Text>
          </View>
        ))
      ) : (
        <Text>No package details available.</Text>
      )}

      {/* Service Details */}
      <Text style={styles.sectionTitle}>Services</Text>
      {serviceDetails.length > 0 ? (
        serviceDetails.map((service, index) => (
          <View key={index} style={styles.serviceContainer}>
            <Image source={{ uri: service?.servicePhotoURL }} style={styles.serviceImage} />
            <Text style={styles.serviceName}>{service.serviceName}</Text>
            <Text>Category: {service.serviceCategory}</Text>
            <Text>Price: ₱{service.basePrice}</Text>
            <Text>Location: {service.location}</Text>
            <Text>Pax: {service.pax}</Text>
            <Text>Requirements: {service.requirements}</Text>
            <Text>Features: {service.serviceFeatures?.join(", ")}</Text>
          </View>
        ))
      ) : (
        <Text>No services available for this package.</Text>
      )}

        <Text style={styles.sectionTitle}>Created At:</Text>
        <Text style={styles.createdAt}>
          {new Date(eventData?.created_at).toLocaleString()}
        </Text>

        <Text style={styles.sectionTitle}>Last Updated:</Text>
        <Text style={styles.updatedAt}>
          {new Date(eventData?.updated_at).toLocaleString()}
        </Text>

        {/* Edit Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditEventScreen", { eventData })
            }
          >
            <Text style={styles.buttonText}>Edit Event</Text>
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  eventDetailsContainer: {
    marginBottom: 20,
  },
  eventDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  eventDetailLabel: {
    fontSize: 16,
    color: "#666",
  },
  eventDetailValue: {
    fontSize: 16,
    color: "#333",
  },
  serviceContainer: {
    marginBottom: 20,
    padding: 10,
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
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666",
  },
  servicePrice: {
    fontSize: 14,
    color: "#666",
  },
  serviceFeatures: {
    fontSize: 14,
    color: "#666",
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
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#ff9900",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventCardDetails;
