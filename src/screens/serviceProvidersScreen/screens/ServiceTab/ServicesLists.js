import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useServiceStore } from "../../../../stateManagement/serviceProvider/useServiceStore";
import {
  createService,
  updateService,
  deleteService,
  fetchServices,
} from "../../../../services/serviceProvider/serviceProviderServices";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const ServicesLists = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { services, setServices } = useServiceStore();

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
  }, [refresh]);

  const handleEditService = (service) => {
    setEditingService(service);
    setModalVisible(true);
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
      setRefresh(!refresh); // Refresh the component
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Render FlatList conditionally based on modal visibility */}
      {!modalVisible && (
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      {/* Modal for editing service */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Edit Service</Text>
          <Formik
            initialValues={{
              serviceName: editingService ? editingService.serviceName : "",
              serviceCategory: editingService
                ? editingService.serviceCategory
                : "",
              basePrice: editingService ? editingService.basePrice : "",
              pax: editingService ? editingService.pax : "",
              serviceFeatures: editingService
                ? editingService.serviceFeatures
                : "",
            }}
            validationSchema={Yup.object({
              serviceName: Yup.string().required("Service name is required"),
              serviceCategory: Yup.string().required("Category is required"),
              basePrice: Yup.number().required("Price is required"),
            })}
            onSubmit={(values) => {
              if (editingService) {
                updateService(editingService.id, values).then(() => {
                  setRefresh(!refresh);
                  setModalVisible(false);
                });
              } else {
                createService(values).then(() => {
                  setRefresh(!refresh);
                  setModalVisible(false);
                });
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <TextInput
                  label="Service Name"
                  value={values.serviceName}
                  onChangeText={handleChange("serviceName")}
                  style={styles.modalInput}
                />
                <TextInput
                  label="Category"
                  value={values.serviceCategory}
                  onChangeText={handleChange("serviceCategory")}
                  style={styles.modalInput}
                />
                <TextInput
                  label="Price"
                  value={values.basePrice}
                  onChangeText={handleChange("basePrice")}
                  keyboardType="numeric"
                  style={styles.modalInput}
                />
                <TextInput
                  label="Pax"
                  value={values.pax}
                  onChangeText={handleChange("pax")}
                  keyboardType="numeric"
                  style={styles.modalInput}
                />
                <TextInput
                  label="Features"
                  value={values.serviceFeatures}
                  onChangeText={handleChange("serviceFeatures")}
                  style={styles.modalInput}
                />
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.modalButton}
                >
                  Save
                </Button>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    elevation: 2,
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
  serviceDuration: {
    fontSize: 16,
    color: "#666",
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
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  modalButton: {
    marginTop: 15,
  },
});

export default ServicesLists;
