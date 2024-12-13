import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { fetchEquipment, updateEquipment } from "../../../../services/authServices";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";

const EquipmentPanelDetails = ({ route }) => {
  const { eventId } = route.params;
  const [equipment, setEquipment] = useState([]);
  const [totals, setTotals] = useState({ totalItems: 0, brokenItems: 0, missingItems: 0 });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEventEquipment = async () => {
      try {
        const data = await fetchEquipment(eventId);
        const totalItems = data.reduce((sum, item) => sum + item.total_items, 0);

        let brokenItems = 0;
        let missingItems = 0;

        data.forEach(item => {
          const unsortedItems = item.total_items - item.sorted_items;

          if (item.status === "Broken") {
            brokenItems += unsortedItems;
          } else if (item.status === "Missing") {
            missingItems += unsortedItems;
          }
        });

        setEquipment(data);
        setTotals({ totalItems, brokenItems, missingItems });
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventEquipment();
  }, [eventId]);

  const handleEdit = (itemId) => {
    setEditMode(itemId);
    const itemToEdit = equipment.find(item => item.id === itemId);
    setEditedItem({ ...itemToEdit });
  };

  const handleUpdate = async () => {
    if (!editedItem) return;

    try {
      const response = await updateEquipment(editedItem);
      if (response.success) {
        setEquipment((prevEquipment) =>
          prevEquipment.map((item) =>
            item.id === editedItem.id ? { ...editedItem } : item
          )
        );
        setEditMode(null);
        setEditedItem(null);
      }
    } catch (error) {
      console.error("Error updating equipment:", error.response || error.message);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "#28a745"; 
      case "Broken":
        return "#dc3545"; 
      case "Missing":
        return "#ffc107"; 
      default:
        return "#6c757d"; 
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <TextInput
        style={[styles.rowCell, { flex: 2 }]}
        value={editMode === item.id ? editedItem.item_name : item.item_name}
        editable={editMode === item.id}
        onChangeText={(text) => setEditedItem({ ...editedItem, item_name: text })}
      />
      <TextInput
        style={[styles.rowCell, { flex: 1 }]}
        value={editMode === item.id ? String(editedItem.total_items) : String(item.total_items)}
        editable={editMode === item.id}
        keyboardType="numeric"
        onChangeText={(text) => setEditedItem({ ...editedItem, total_items: parseInt(text) })}
      />
      <TextInput
        style={[styles.rowCell, { flex: 1 }]}
        value={editMode === item.id ? String(editedItem.sorted_items || 0) : String(item.sorted_items || 0)}
        editable={editMode === item.id}
        keyboardType="numeric"
        onChangeText={(text) => setEditedItem({ ...editedItem, sorted_items: parseInt(text) || 0 })}
      />
      <TextInput
        style={[styles.rowCell, { flex: 1, color: getStatusColor(editMode === item.id ? editedItem.status : item.status) }]}
        value={editMode === item.id ? editedItem.status : item.status}
        editable={editMode === item.id}
        onChangeText={(text) => setEditedItem({ ...editedItem, status: text })}
      />
      {editMode === item.id ? (
        <TouchableOpacity onPress={handleUpdate} style={styles.editButton}>
          <MaterialIcons name="save" size={24} color="#4CAF50" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="#4CAF50" />
        </TouchableOpacity>
      )}
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#eeba2b" />
        <Text>Loading Equipment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFCE00" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Equipment for Event</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Item Name</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Sorted</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
      </View>

      {/* Equipment List */}
      <FlatList
        data={equipment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No equipment available for this event.</Text>}
      />

      {/* Totals Section */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
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
    textAlign: "center",
    flex: 1,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    padding: 8,
  },
});

export default EquipmentPanelDetails;
