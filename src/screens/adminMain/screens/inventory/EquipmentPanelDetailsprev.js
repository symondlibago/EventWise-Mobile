import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  Text,
} from "react-native";
import { DataTable } from "react-native-paper";
import { fetchEquipment } from "../../../../services/organizer/adminEquipmentServices";

const EquipmentPanelDetails = ({ route }) => {
  const { eventId } = route.params;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 4, 8, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    NumItems: "",
    NumItemsSort: "",
    Status: "",
  });

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        console.log("Event ID:", eventId);
        const response = await fetchEquipment(eventId);
        console.log("Equipment data:", response);
        setItems(response);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };
    fetchEquipmentData();
  }, [eventId]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        key: prevItems.length + 1,
        ...newItem,
        NumItems: parseInt(newItem.NumItems),
        NumItemsSort: parseInt(newItem.NumItemsSort),
        Status: newItem.Status,
      },
    ]);
    setNewItem({ name: "", NumItems: "", NumItemsSort: "", Status: "" });
    setModalVisible(false);
  };

  const handleUpdateItem = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === currentItem.key ? { ...currentItem, ...newItem } : item
      )
    );
    setCurrentItem(null);
    setNewItem({ name: "", NumItems: "", NumItemsSort: "" });
    setModalVisible(false);
  };

  const handleDeleteItem = (key) => {
    setItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const openModal = (item = null) => {
    setCurrentItem(item);
    setNewItem(item || { name: "", NumItems: "", NumItemsSort: "" });
    setModalVisible(true);
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={{ padding: 16 }}>
      {/* Add Button */}
      <Button title="Add Item" onPress={() => openModal()} />
      {/* Modal for Add/Update */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{currentItem ? "Update Item" : "Add Item"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItem.name}
              onChangeText={(text) =>
                setNewItem((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="No. of Items"
              keyboardType="numeric"
              value={newItem.NumItems}
              onChangeText={(text) =>
                setNewItem((prev) => ({ ...prev, NumItems: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="No. of Items Sorted"
              keyboardType="numeric"
              value={newItem.NumItemsSort}
              onChangeText={(text) =>
                setNewItem((prev) => ({ ...prev, NumItemsSort: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              keyboardType="default"
              value={newItem.Status}
              onChangeText={(text) =>
                setNewItem((prev) => ({ ...prev, Status: text }))
              }
            />
            <Button
              title={currentItem ? "Update" : "Add"}
              onPress={currentItem ? handleUpdateItem : handleAddItem}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Data Table */}
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ width: 150 }}>Item</DataTable.Title>
            <DataTable.Title numeric style={{ width: 100 }}>
              No. of Items
            </DataTable.Title>
            <DataTable.Title numeric style={{ width: 150 }}>
              No. of Items Sorted
            </DataTable.Title>
            <DataTable.Title numeric style={{ width: 100 }}>
              Status
            </DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Actions</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell style={{ width: 150 }}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 100 }}>
                {item.NumItems}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 150 }}>
                {item.NumItemsSort}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 100 }}>
                {item.Status}
              </DataTable.Cell>
              <DataTable.Cell style={{ width: "100%" }}>
                <Button title="Edit" onPress={() => openModal(item)} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDeleteItem(item.key)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel="Rows per page"
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default EquipmentPanelDetails;
