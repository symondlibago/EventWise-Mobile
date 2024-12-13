import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingProcess from "../event/BookingProcess";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../elements/Header";
import API_URL from "../../../constants/constant";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Imported event images
import event1 from "../pictures/event1.png";
import event2 from "../pictures/event2.png";
import event3 from "../pictures/event3.png";
import event4 from "../pictures/event4.png";
import event5 from "../pictures/event5.png";

// Mapping images to event IDs
const eventImages = {
  1: event1,
  2: event2,
  3: event3,
  4: event4,
  5: event5,
};

const Book = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState("packages");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [eventPackages, setEventPackages] = useState([]);

  useEffect(() => {
    const fetchEventPackages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/packages`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const packagesWithImages = data.map((pkg) => ({
          ...pkg,
          coverPhoto: eventImages[pkg.id] || null,
          services: pkg.services || [],
        }));
        setEventPackages(packagesWithImages);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventPackages();
  }, []);

  const handlePackageClick = (packageItem) => {
    setSelectedPackage(packageItem);
    setCurrentStep("details");
  };

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {currentStep === "packages" ? (
            <View>
            <View style={styles.eventSection}>
          <Text style={styles.eventTitle}>Event</Text>
          <TouchableOpacity
            style={styles.addEventButton}
            onPress={() => {
              try {
                navigation.navigate("BookingProcess");
              } catch (error) {
                console.error("Navigation error:", error);
              }
            }}
          >
            {/* Plus icon and text */}
            <Icon name="add" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Add Events</Text>
          </TouchableOpacity>
        </View>

              
              <View style={styles.packagesSection}>
                <Text style={styles.packagesTitle}>Packages</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollView}
                >
                  {eventPackages.map((packageItem) => (
                    <TouchableOpacity
                      key={packageItem.id}
                      style={styles.card}
                      onPress={() => handlePackageClick(packageItem)}
                    >
                      {packageItem.coverPhoto && (
                        <Image source={packageItem.coverPhoto} style={styles.coverPhoto} />
                      )}
                      <Text style={styles.packageName}>{packageItem.packageName}</Text>
                      <Text style={styles.totalPrice}>{`Price: ${packageItem.totalPrice}`}</Text>
                      <Text style={styles.eventType}>{packageItem.eventType}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View style={styles.packageDetails}>
              <TouchableOpacity onPress={() => setCurrentStep("packages")}>
              <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
              </TouchableOpacity>
              <Text style={styles.packageName1}>{selectedPackage.packageName}</Text>
              {selectedPackage.coverPhoto && (
                <Image source={selectedPackage.coverPhoto} style={styles.coverPhoto} />
              )}
              <Text style={styles.eventType}>{selectedPackage.eventType}</Text>
              <Text style={styles.totalPrice}>{`Price: ${selectedPackage.totalPrice}`}</Text>
              <View style={styles.servicesSection}>
                <Text style={styles.servicesTitle}>Services</Text>
                {selectedPackage.services.length > 0 ? (
                  selectedPackage.services.map((service) => (
                    <View key={service.id} style={styles.serviceCard}>
                      <Text style={styles.serviceName}>{service.serviceName}</Text>
                      <Text>{`Category: ${service.serviceCategory}`}</Text>
                      <Text>{`Features: ${service.serviceFeatures}`}</Text>
                      <Text>{`Base Price: ${service.basePrice}`}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No services available for this package.</Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  eventSection: {
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  addEventButton: {
    backgroundColor: "#eeba2b",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  packagesSection: {
    marginTop: 20,
    height: 400,
  },
  packagesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    width: 200,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    alignItems: "center",
    height: 250,
  },
  coverPhoto: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  packageName: {
    fontSize: 14,
    paddingBottom: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  packageName1: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",  
  },
  totalPrice: {
    fontSize: 14,
    color: "#eeba2b",
    marginTop: 5,
    textAlign: "center",
  },
  eventType: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    textAlign: "center",
  },
  packageDetails: {
    padding: 20,
    // alignItems: "center",
  },
  servicesSection: {
    marginTop: 20,
    width: "100%",
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceCard: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eeba2b",
  },
});

export default Book;
