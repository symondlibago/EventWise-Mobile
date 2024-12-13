import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import NavBar from './nav';

let inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 0, status: "" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 0, status: "" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 0, status: "" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 0, status: "" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 0, status: "" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 0, status: "" },
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

const Equipment = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);

  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleAddItem = () => {
    if (newItem && newItemCount) {
      inventoryData.push({ item: newItem, noOfItems: parseInt(newItemCount), noOfSortItems: 0, status: "" });
      setNewItem("");
      setNewItemCount("");
      setModalVisible(false);
    }
  };

  const handleRemoveItem = (index) => {
    inventoryData.splice(index, 1);
    setRemoveMode(false); // Exit remove mode after deletion
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']}  // Define the gradient colors
      start={{ x: 0, y: 0 }}  // Top
      end={{ x: 0, y: 1 }}    // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <Ionicons name="chatbubble-outline" size={30} color="white" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="white" style={styles.icon} />
        </View>
      </View>
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
            <Text style={styles.tableHeaderText}>NO. OF SORT ITEMS</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
          </View>
          {inventoryData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {removeMode && (
                <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                  <Ionicons name="remove-circle-outline" size={24} color="red" style={styles.removeIcon} />
                </TouchableOpacity>
              )}
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <Text style={styles.tableRowText}>{item.noOfSortItems}</Text>
              <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => setRemoveMode(!removeMode)}>
            <Ionicons name="remove-circle-outline" size={24} color="white" />
            <Text style={styles.removeButtonText}>Remove Item</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
          <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
        </View>
      </ScrollView>
      <NavBar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name of Item</Text>
            <TextInput
              style={styles.input}
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Enter item name"
              placeholderTextColor="#999"
            />
            <Text style={styles.modalText}>No. of Items</Text>
            <TextInput
              style={styles.input}
              value={newItemCount}
              onChangeText={setNewItemCount}
              placeholder="Enter number of items"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddItem}>
              <Text style={styles.modalButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 5,
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 40,

  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "transparent",
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
    marginTop: 20,
    padding: 10,
    backgroundColor: "transparent",
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
    alignItems: 'center',
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  removeIcon: {
    marginRight: 10,
  },
  summary: {
    margin: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Equipment;
