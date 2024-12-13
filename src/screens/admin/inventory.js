import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the burger icon
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import NavBar from "./nav";

const inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 20, status: "Complete" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 20, status: "Missing" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 20, status: "Broken" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 20, status: "Broken" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 20, status: "Missing" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 20, status: "Complete" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Complete":
      return { color: "green" };
    case "Missing":
      return { color: "orange" };
    case "Broken":
      return { color: "red" };
    default:
      return { color: "white" };
  }
};

const Inventory = () => {
  const navigation = useNavigation(); // Hook to use navigation

  const totalItems = inventoryData.reduce(
    (sum, item) => sum + item.noOfItems,
    0
  );
  const totalBroken = inventoryData.filter(
    (item) => item.status === "Broken"
  ).length;
  const totalMissing = inventoryData.filter(
    (item) => item.status === "Missing"
  ).length;

  return (
    <LinearGradient
      colors={["#2A2600", "#000000"]} // Define the gradient colors for the background
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }} // Bottom
      style={styles.gradientContainer}
    >
      {/* Burger icon to open sidebar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <Ionicons
            name="chatbubble-outline"
            size={30}
            color="white"
            style={styles.icon}
          />
          <Ionicons
            name="notifications-outline"
            size={30}
            color="white"
            style={styles.icon}
          />
        </View>
      </View>
      <NavBar />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>
            <Text style={styles.headerHighlight}>Inventory</Text> Tracker
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF SORT ITEMSs</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
          </View>
          {inventoryData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <Text style={styles.tableRowText}>{item.noOfSortItems}</Text>
              <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>
            Total Items Broken: {totalBroken}
          </Text>
          <Text style={styles.summaryText}>
            Total Items Missing: {totalMissing}
          </Text>
        </View>
      </ScrollView>
      <NavBar />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerHighlight: {
    color: "white",
    paddingHorizontal: 5,
  },
  table: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
  },
  tableHeaderText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  summary: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },

  text: {
    fontSize: 16,
    color: "white",
  },
  menuButton: {
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "transparent",
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Inventory;
