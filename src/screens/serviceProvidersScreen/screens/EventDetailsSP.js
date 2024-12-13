import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../../../constants/constant';
import { fetchEventPackageDetails } from "../../../services/organizer/adminEventServices";

const EventDetailsSP = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetch event data
        const eventResponse = await axios.get(`${API_URL}/api/admin/events/${eventId}`);
        const eventDetails = eventResponse.data;

        // Fetch package details
        const packageDetails = await fetchEventPackageDetails(eventId);

        // Combine event and package details
        setEventData({ ...eventDetails, packages: packageDetails });
      } catch (error) {
        console.error("Error fetching event or package data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#eeba2b" />;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Details</Text>
        </View>

        {/* Event Details */}
        <View style={styles.coverPhotoContainer}>
          {eventData.coverPhoto ? (
            <Image
          source={{
    uri: eventData?.coverPhoto || "defaultImageURL",
  }}
  style={styles.eventImage}
  resizeMode="cover"
/>

          ) : (
            <Text style={styles.value}>No cover photo selected</Text>
          )}
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel1}></Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue1}>{eventData.name}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Type: </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.type}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={[styles.detailLabel, { color: "#eeba2b" }]}>Total Price: </Text>
          <View style={styles.detailContainer}>
            <Text style={[styles.detailValue, { color: "#eeba2b" }]}>{eventData.totalPrice}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Date: </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.date}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Location: </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.location}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Guests: </Text>
          <View style={styles.detailContainer}>
            {eventData.guest && eventData.guest.length > 0 ? (
              eventData.guest.map((guest, index) => (
                <Text key={index} style={styles.detailValue}>
                  {guest.GuestName} - {guest.email}
                </Text>
              ))
            ) : (
              <Text style={styles.detailValue}>No guests available.</Text>
            )}
          </View>
        </View>

        {/* Packages */}
        <Text style={styles.packageHeader}>Packages</Text>

        <View style={styles.packageContainer}>
  {Array.isArray(eventData.packages) && eventData.packages.length > 0 ? (
    eventData.packages.map((packageItem, index) => (
      <View key={index} style={styles.packageItem}>
        <Text style={styles.packageHeader}>{packageItem.packageName}</Text>
        <View style={styles.packageDetailGroup}>
          <Text style={styles.packageDetailLabel}>Category: </Text>
          <Text style={styles.packageDetailValue}>{packageItem.eventType}</Text>
        </View>
        <View style={styles.packageDetailGroup}>
          <Text style={styles.packageDetailLabel}>Price: ₱</Text>
          <Text style={styles.packagePrice}>{packageItem.totalPrice}</Text>
        </View>
      </View>
    ))
  ) : (
    <Text style={styles.packageText}>No packages available.</Text>
  )}
</View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e6b800',
  },
  detailGroup: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 18,
    color: "#333",
  },
  detailValue1: {
    fontSize: 25,
    color: "#333",
    fontWeight: 'bold',
  },
  packageContainer: {
    marginBottom: 80,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  packageItem: {
    marginBottom: 10,
    flexDirection: "column", // Arrange items in a column
  },
  packageHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  packageDetailGroup: {
    flexDirection: "row",
    marginBottom: 5,
  },
  packageDetailLabel: {
    fontSize: 15, // Smaller font size for labels
    fontWeight: "bold",
    color: "#555",
  },
  packageDetailValue: {
    fontSize: 15, // Smaller font size for values
    color: "#666",
  },
  packagePrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#eeba2b", // Highlight the price
  },
  packageText: {
    fontSize: 15,
    color: "#555",
  },
  eventImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: "#eeba2b",
    borderWidth: 2,
  },
});

export default EventDetailsSP;
