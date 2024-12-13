import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import API_URL from '../../../constants/constant';

const InventoryTracker = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch equipment data
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/equipment?event_id=${eventId}`);
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [eventId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Complete":
        return { color: "green" };
      case "Missing":
        return { color: "orange" };
      case "Broken":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  };


  const totalItems = inventoryData.reduce((sum, item) => sum + item.number_of_items, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => navigation.navigate("EventsSP")}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              <Text style={styles.headerHighlight}>Inventory</Text> Tracker
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>ITEMS</Text>
              <Text style={styles.tableHeaderText}>NO. OF ITEMS</Text>
              <Text style={styles.tableHeaderText}>NO. OF SORT ITEMS</Text>
              <Text style={styles.tableHeaderText}>STATUS</Text>
            </View>
            {inventoryData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableRowText}>{item.item}</Text>
                <Text style={styles.tableRowText}>{item.number_of_items}</Text>
                <Text style={styles.tableRowText}>{item.number_of_sort_items}</Text>
                <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
            <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
            <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#eeba2b",
    textAlign: 'center',
    flex: 1,
  },
  headerHighlight: {
    color: "#eeba2b",
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
  },
  tableHeaderText: {
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  summary: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  summaryText: {
    color: "black",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default InventoryTracker;
