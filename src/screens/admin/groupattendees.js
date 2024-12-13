import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

import NavBar from './nav';

const initialGuests = [
  { id: '1', name: 'John eeDoe', role: 'Speaker', mobile: '123-456-7890', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', role: 'Attendee', mobile: '098-765-4321', email: 'jane.smith@example.com' },
  { id: '3', name: 'Emily Johnson', role: 'Organizer', mobile: '111-222-3333', email: 'emily.johnson@example.com' },
  // Add more guest data as needed
];

const GroupAttendees = () => {
  const navigation = useNavigation(); // Hook to use navigation
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditGuestModalVisible, setEditGuestModalVisible] = useState(false);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const handleEditGuest = () => {
    setEditModalVisible(true);
    setEditGuestModalVisible(true);
  };

  const handleDeleteGuest = () => {
    setDeleteModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Logic to save the edited guest data
    setEditGuestModalVisible(false);
    setEditModalVisible(false);
  };

  const handleConfirmDelete = () => {
    setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
    setDeleteModalVisible(false);
    setEditModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedGuest(item);
        setEditModalVisible(true);
      }}
      style={styles.row}
    >
      <Text style={[styles.cell, styles.cellNo]}>{item.id}</Text>
      <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
      <Text style={[styles.cell, styles.cellRole]}>{item.role}</Text>
      <Text style={[styles.cell, styles.cellMobile]}>{item.mobile}</Text>
      <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header section with a back button */}
      <TouchableOpacity onPress={handleBackButtonPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Groups</Text>
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}  // White fading effect
        start={{ x: 0, y: 0.5 }}  // Horizontal gradient
        end={{ x: 1, y: 0.5 }}    // Horizontal gradient
        style={styles.line}
      />
      <Text style={styles.eventTypesText}>People In Event</Text>
      <ScrollView
        contentContainerStyle={styles.tableContainer}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.headerNo]}>No.</Text>
              <Text style={[styles.headerCell, styles.headerName]}>Name</Text>
              <Text style={[styles.headerCell, styles.headerRole]}>Role</Text>
              <Text style={[styles.headerCell, styles.headerMobile]}>Mobile Number</Text>
              <Text style={[styles.headerCell, styles.headerEmail]}>Email</Text>
            </View>
            {guests.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedGuest(item);
                  setEditModalVisible(true);
                }}
                style={styles.row}
              >
                <Text style={[styles.cell, styles.cellNo]}>{item.id}</Text>
                <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
                <Text style={[styles.cell, styles.cellRole]}>{item.role}</Text>
                <Text style={[styles.cell, styles.cellMobile]}>{item.mobile}</Text>
                <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      {/* Edit/Delete Modal */}
      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit or Delete Guest</Text>
            <Button title="Edit Guest" onPress={handleEditGuest} />
            <Button title="Delete Guest" color="red" onPress={handleDeleteGuest} />
            <Button title="Close" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* Edit Guest Modal */}
      <Modal visible={isEditGuestModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Guest</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={selectedGuest?.name}
              onChangeText={(text) => setSelectedGuest({ ...selectedGuest, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={selectedGuest?.role}
              onChangeText={(text) => setSelectedGuest({ ...selectedGuest, role: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={selectedGuest?.mobile}
              onChangeText={(text) => setSelectedGuest({ ...selectedGuest, mobile: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={selectedGuest?.email}
              onChangeText={(text) => setSelectedGuest({ ...selectedGuest, email: text })}
            />
            <Button title="Save" onPress={handleSaveEdit} />
            <Button title="Close" onPress={() => setEditGuestModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to delete this guest?</Text>
            <Button title="Confirm" color="red" onPress={handleConfirmDelete} />
            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Background color of the screen
  },
  backButton: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
  },
  eventTypesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    marginLeft: 10,
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFC42B',
  },
  headerCell: {
    color: '#FFC42B',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: '#666666',
  },
  headerNo: {
    flex: 0.5,
  },
  headerName: {
    flex: 2,
  },
  headerRole: {
    flex: 1.5,
  },
  headerMobile: {
    flex: 2,
  },
  headerEmail: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  cell: {
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    marginLeft: 15,
  },
  cellNo: {
    flex: 0.5,
  },
  cellName: {
    flex: 2,
    marginLeft: 20,
  },
  cellRole: {
    flex: 1.5,
  },
  cellMobile: {
    flex: 2,
  },
  cellEmail: {
    flex: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default GroupAttendees;
