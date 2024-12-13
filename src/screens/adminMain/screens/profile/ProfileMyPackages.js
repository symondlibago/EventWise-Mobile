import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import { useNavigation } from "@react-navigation/native";
import MyButtonComponent from "../component/MyButtonComponent";
import { AntDesign } from "@expo/vector-icons";

const ProfileMyPackages = () => {
  const packageData = useStore((state) => state.eventPackages); // Fetch package data from useStore
  const [selectedPackageType, setSelectedPackageType] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePackageTypePress = (type) => {
    // Filter packages based on the selected type
    const filteredPackages = packageData.filter(
      (packageItem) => packageItem.packageType === type
    );
    setSelectedPackageType(filteredPackages);
    setIsModalVisible(true); // Show the modal
  };

  const packageTypes = [
    { name: "Food", value: "Food" },
    { name: "Photography", value: "Photography" },
    { name: "Videography", value: "Videography" },
    // Add more package types as needed
  ];

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <Text style={styles.header}>
        <Text style={styles.title}>My Event Packages</Text>
      </Text>

      <View
        style={[
          {
            height: 120,
            width: "100%",
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.scrollViewEventPackage]}
        >
          {packageTypes.map((type) => (
            <View
              style={[
                {
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  height: 120,
                  width: "100%",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                key={type.value}
                onPress={() => handlePackageTypePress(type.value)}
              >
                <View
                  style={[
                    styles.EventPackageOrEventCard,
                    { height: "100%", width: 140 },
                  ]}
                >
                  <Text style={styles.monthText}>{type.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Modal to display packages */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: "#ffff", paddingTop: 100 },
          ]}
        >
          <View
            style={[
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bottom: 30,
                left: 240,
                width: 50,
                height: 50,
                borderRadius: 25,
                zIndex: 1,
              }}
            >
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Packages in Category of{" "}
              {selectedPackageType.length > 0
                ? selectedPackageType[0].packageType
                : ""}
            </Text>
          </View>
          <ScrollView>
            {selectedPackageType.length > 0 ? (
              selectedPackageType.map((packageItem) => (
                <TouchableOpacity
                  key={packageItem.packageId}
                  onPress={() => console.log("Package pressed")}
                >
                  <View
                    style={[
                      styles.eventContainer,
                      {
                        marginBottom: 10,
                        width: 370,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Image
                      source={packageItem.packageImage}
                      style={styles.eventImage}
                    />
                    <Text style={styles.eventTitle}>
                      {packageItem.packageName}
                    </Text>
                    <View style={styles.eventPackageDetailRow}>
                      <Text style={styles.subtitle}>
                        {packageItem.packagePrice}
                      </Text>
                      <Text style={styles.subtitle}>
                        {packageItem.packageDescription}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noEventContainer}>
                <Text style={styles.noEventText}>
                  No packages in this category
                </Text>
              </View>
            )}
          </ScrollView>

          <Pressable
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileMyPackages;
