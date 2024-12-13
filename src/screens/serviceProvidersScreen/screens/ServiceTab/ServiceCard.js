// src/components/ServiceCard.js

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { deleteService } from "../../../../services/serviceProvider/serviceProviderServices";

const ServiceCard = ({
  service,
  likedServices,
  toggleLike,
  handleDeleteService,
  handleEditService,
}) => {
  // console.log("service pasesed: ", service);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ServiceCardDetails", { service: service })
        }
      >
        <Image
          source={{
            uri: service.servicePhotoURL,
          }}
          style={styles.image}
        />

        <View style={styles.serviceCardHeader}>
          <Text style={styles.serviceName}>{service.serviceName}</Text>
          <TouchableOpacity
            onPress={() => toggleLike(service.id)}
            style={styles.heartIcon}
          >
            <MaterialCommunityIcons
              name={likedServices[service.id] ? "heart" : "heart-outline"}
              color={likedServices[service.id] ? "#FF0000" : "#888"}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.serviceDetails}>
          <View>
            <Text style={styles.serviceCategory}>
              Category: {service.serviceCategory}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.servicePrice}>Price: ₱{service.basePrice}</Text>
        </View>
        <Text style={styles.serviceFeatures} numberOfLines={2}>
          Features:
        </Text>
        <Text style={styles.serviceFeaturesDetails} numberOfLines={2}>
          {service.serviceFeatures}
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.serviceFeatures} numberOfLines={2}>
        {"   "}• {service.serviceFeatures}
      </Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            navigation.navigate("EditService", { service: service }); // Pass service data to the Edit screen
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteService(service.id)} // Now using the prop
        >
          <Text style={styles.buttonText}>Disable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = {
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    width: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eeba2b",
  },
  serviceCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  heartIcon: {
    // position: "absolute",
    // top: 220,
    // right: 30,
    // top: 10,
    // right: 10,
    // backgroundColor: "red",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 10,
    marginTop: 10,
  },
  serviceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 14,
    color: "#eeba2b",
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceFeatures: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  serviceFeaturesDetails: {
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#eeba2b",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
};
export default ServiceCard;
