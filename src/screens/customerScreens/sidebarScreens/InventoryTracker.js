import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header2 from "../elements/Header2";
import { fetchEquipment } from "../../../services/authServices";

const InventoryTracker = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params; // Ensure eventId is passed
  const [equipment, setEquipment] = useState([]);
  const [totals, setTotals] = useState({
    totalItems: 0,
    brokenItems: 0,
    missingItems: 0,
  });

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchEquipment(eventId);

        // Calculate totals for the whole inventory
        const totalItems = data.reduce((sum, item) => sum + item.total_items, 0);

        // Calculate broken and missing items
        let brokenItems = 0;
        let missingItems = 0;

        data.forEach((item) => {
          const unsortedItems = item.total_items - (item.sorted_items || 0);

          if (item.status === "Broken") {
            brokenItems += unsortedItems;
          } else if (item.status === "Missing") {
            missingItems += unsortedItems;
          }
        });

        setEquipment(data);
        setTotals({ totalItems, brokenItems, missingItems });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    loadInventory();
  }, [eventId]);

  const renderStatus = (status) => {
    const statusColors = {
      Complete: "#28a745",
      Missing: "#ffc107",
      Broken: "#dc3545",
    };

    return (
      <Text style={{ color: statusColors[status] || "#6c757d", fontWeight: "bold" }}>
        {status || "Unknown"}
      </Text>
    );
  };

  return (
    <>
      <Header2 />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              <Text style={styles.headerHighlight}>Inventory</Text> Tracker
            </Text>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>ITEMS</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>NO. OF ITEMS</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>SORTED ITEMS</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>STATUS</Text>
          </View>

          <FlatList
            data={equipment}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={[styles.rowCell, { flex: 2 }]}>{item.item_name}</Text>
                <Text style={[styles.rowCell, { flex: 1 }]}>{item.total_items}</Text>
                <Text style={[styles.rowCell, { flex: 1 }]}>{item.sorted_items || 0}</Text>
                <View style={{ flex: 1 }}>{renderStatus(item.status)}</View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>No equipment found.</Text>
            }
          />
        </ScrollView>

        {/* Totals at Bottom Left */}
        <View style={styles.totalsContainer}>
          <Text style={styles.totalText}>
            Total Items: <Text style={styles.boldText}>{totals.totalItems}</Text>
          </Text>
          <Text style={styles.totalText}>
            Broken Items: <Text style={styles.boldText}>{totals.brokenItems}</Text>
          </Text>
          <Text style={styles.totalText}>
            Missing Items: <Text style={styles.boldText}>{totals.missingItems}</Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFCE00",
    flex: 1,
    textAlign: "center",
  },
  headerHighlight: {
    color: "#eeba2b",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
  },
  headerCell: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
  },
  rowCell: {
    fontSize: 14,
    color: "#212529",
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  totalsContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  totalText: {
    fontSize: 16,
    marginVertical: 4,
    color: "#212529",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default InventoryTracker;
