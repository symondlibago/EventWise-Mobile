import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

import React from "react";
import { fetchServices } from "../../../../services/serviceProvider/serviceProviderServices";
import { useEffect, useState } from "react";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";
import { Modal } from "react-native-paper";
const ServiceList = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { services, newService, updateNewService, setServices } =
    useServiceStore();
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceName}>{item.serviceName}</Text>
      <Text style={styles.serviceCategory}>{item.serviceCategory}</Text>
      <Text style={styles.servicePrice}>Price: ₱{item.basePrice}</Text>
      <Text style={styles.servicePax}>Pax: {item.pax}</Text>
      <Text style={styles.serviceDuration}>
        Service Features: {item.serviceFeatures}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleEditService(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteService(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServicesData();
  }, [refresh, setServices]);
  return (
    <SafeAreaView>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Service</Text>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={editingService ? editingService.serviceName : ""}
              onChangeText={(text) =>
                setEditingService({
                  ...editingService,
                  serviceName: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Service Category"
              value={editingService ? editingService.serviceCategory : ""}
              onChangeText={(text) =>
                setEditingService({
                  ...editingService,
                  serviceCategory: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Inclusions (e.g., feature 1, feature 2..)"
              value={editingService ? editingService.serviceFeatures : ""}
              onChangeText={(text) =>
                setEditingService({
                  ...editingService,
                  serviceFeatures: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Base Price"
              value={editingService ? editingService.basePrice : ""}
              onChangeText={(text) =>
                setEditingService({
                  ...editingService,
                  basePrice: text,
                })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Pax"
              value={editingService ? editingService.pax : ""}
              onChangeText={(text) =>
                setEditingService({
                  ...editingService,
                  pax: text,
                })
              }
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleSaveService(editingService)}
            >
              <Text style={styles.createButtonText}>Save Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ServiceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    backgroundColor: "#FFF5F5",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  serviceCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  serviceCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  servicePax: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
