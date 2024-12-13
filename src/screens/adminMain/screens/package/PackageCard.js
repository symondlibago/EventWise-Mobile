import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { fetchPackageServiceDetails } from "../../../../services/organizer/adminPackageServices";
const PackageCard = ({
  currentPackages,
  likedPackages,
  toggleLike,
  handleDeletePackage,
  handleEditService,
}) => {
  console.log("package passed: ", currentPackages);
  const navigation = useNavigation();
  const [serviceDetails, setServiceDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (currentPackages) {
          const details = await fetchPackageServiceDetails(currentPackages.id);

          setServiceDetails(details);
        }
      } catch (error) {
        console.log("Error fetching package service details: ", error);
      }
    };
    fetchDetails();
  }, [currentPackages]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PackageCardDetails", {
            packageData: currentPackages,
          })
        }
      >
        <TouchableOpacity
          onPress={() => toggleLike(currentPackages.id)}
          style={styles.heartIcon}
        >
          <MaterialCommunityIcons
            name={likedPackages[currentPackages.id] ? "heart" : "heart-outline"}
            color={likedPackages[currentPackages.id] ? "#FF0000" : "#888"}
            size={25}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: currentPackages.coverPhoto,
          }}
          style={styles.image}
        />

        <View style={styles.serviceCardHeader}>
          <Text style={styles.serviceName}>{currentPackages.packageName}</Text>
        </View>
        <View style={styles.serviceDetails}>
          <View>
            <Text style={styles.serviceCategory}>
              Package Types: {currentPackages.eventType}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.servicePrice}>
            Price: ₱{currentPackages.totalPrice}
          </Text>
        </View>
        <Text style={styles.serviceFeatures} numberOfLines={2}>
          Inclusions:
          {serviceDetails.map((service, index) => (
            <Text key={index}>
              {"   "}• {service.serviceName}
            </Text>
          ))}
        </Text>
        <Text style={styles.serviceFeaturesDetails} numberOfLines={2}>
          {currentPackages.serviceFeatures}
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.serviceFeatures} numberOfLines={2}>
        {"   "}• {service.serviceFeatures}
      </Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            navigation.navigate("EditPackageScreen", {
              packageData: currentPackages,
            }); // Pass service data to the Edit screen
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePackage(currentPackages.id)} // Now using the prop
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
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff9900",
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
    // top: 50,
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
export default PackageCard;
