import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updatePackage, fetchServices } from "../../../../services/organizer/adminPackageServices";
import axios from 'axios';
import API_URL from '../../../../constants/constant';

const EditPackageScreen = ({ route, navigation }) => {
  const { packageData } = route.params;
  const [packageName, setPackageName] = useState(packageData.packageName);
  const [eventType, setEventType] = useState(packageData.eventType);
  const [pax, setPax] = useState(packageData.pax ? packageData.pax.toString() : "");
  const [totalPrice, setTotalPrice] = useState(packageData.totalPrice.toString());
  const [coverPhoto, setCoverPhoto] = useState(packageData.coverPhoto);
  const [services, setServices] = useState(packageData.services);
  const [allServices, setAllServices] = useState([]); // For storing fetched services
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setAllServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        Alert.alert("Error", "Unable to load services. Please try again.");
      }
    };
    loadServices();
  }, []);

  const handleAddService = (service) => {
    if (!services.some((s) => s.id === service.id)) {
      setServices([...services, service]);
      setTotalPrice((prevPrice) => (parseFloat(prevPrice) + parseFloat(service.basePrice)).toFixed(2).toString()); // Update totalPrice when adding a service
    } else {
      Alert.alert("Info", "This service is already added to the package.");
    }
  };

  const handleRemoveService = (service) => {
    const updatedServices = services.filter((s) => s.id !== service.id);
    setServices(updatedServices);
    setTotalPrice((prevPrice) => (parseFloat(prevPrice) - parseFloat(service.basePrice)).toFixed(2).toString()); // Update totalPrice when removing a service
  };

  const handleUpdatePackage = () => {
    if (!packageName || !eventType) {
      alert("Please fill in all fields and select at least one service.");
      return;
    }
  
    // Prepare the data for the update
    const updatedPackageData = {
      packageName: packageName,  // Use the state variables directly
      eventType: eventType,
      services: services.map((service) => service.id),  // Ensure sending only service IDs
      totalPrice: totalPrice,
      coverPhoto: coverPhoto,
      pax: pax,
    };
  
    // Use axios for making the PUT request
    axios.put(`${API_URL}/api/admin/packages/${packageData.id}`, updatedPackageData)
      .then((response) => {
        console.log('Package updated successfully:', response.data);
        alert('Package updated successfully!');
        navigation.goBack();  // You can navigate back to the previous screen after success
      })
      .catch((error) => {
        console.error('Error updating package:', error.response?.data || error.message);
        const errors = error.response?.data?.errors || {};
        alert(
          `Failed to update package. ${
            Object.keys(errors).length ? Object.values(errors).join(', ') : 'Please try again.'
          }`
        );
      });
  };
  
  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10} />
      </TouchableOpacity>
      <Text style={styles.header}>Edit Package</Text>

      <TextInput
        style={styles.input}
        value={packageName}
        onChangeText={setPackageName}
        placeholder="Package Name"
      />
      <TextInput
        style={styles.input}
        value={eventType}
        onChangeText={setEventType}
        placeholder="Event Type"
      />
      <TextInput
        style={styles.input}
        value={totalPrice}
        onChangeText={setTotalPrice}
        placeholder="Total Price"
        keyboardType="numeric"
        editable={false} // Make totalPrice non-editable
      />
      <TextInput
        style={styles.input}
        value={pax}
        onChangeText={setPax}
        placeholder="Pax"
        keyboardType="numeric"
      />

      <View style={styles.servicesContainer}>
        {services.length > 0 ? (
          services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => handleRemoveService(service)}
            >
              <Ionicons name="close" size={24} color="#FFCE00" />
            </TouchableOpacity>
            <Text style={styles.serviceCategory}>{service.id}</Text>
              <Text style={styles.serviceName}>{service.serviceName}</Text>
              <Text>{`Category: ${service.serviceCategory}`}</Text>
              <Text>{`Features: ${service.serviceFeatures}`}</Text>
              <Text>{`Base Price: ₱${service.basePrice}`}</Text>
            </View>
          ))
        ) : (
          <Text>No services available for this package.</Text>
        )}
      </View>

      <TextInput
        style={styles.input}
        value={coverPhoto}
        onChangeText={setCoverPhoto}
        placeholder="Cover Photo URL"
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Service</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePackage}>
        <Text style={styles.buttonText}>Update Package</Text>
      </TouchableOpacity>

      {/* Modal for Selecting Services */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#FFCE00" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Select a Service</Text>
            <ScrollView>
              {allServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceCard}
                  onPress={() => handleAddService(service)}
                >
                  <Text style={styles.serviceName}>{service.serviceName}</Text>
                  <Text>{`Category: ${service.serviceCategory}`}</Text>
                  <Text>{`Features: ${service.serviceFeatures}`}</Text>
                  <Text>{`Base Price: ₱${service.basePrice}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 90,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#FFCE00", // Add a background color for visibility
    justifyContent: "center", // Center the icon inside the button
    alignItems: "center", // Ensure the icon is centered within the button
},

  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#eeba2b",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 50,
  },
  addButton: {
    backgroundColor: "#eeba2b",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "90%" },
  closeButton: { alignSelf: "flex-end" },
  modalHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
});

export default EditPackageScreen;
