import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from 'axios';
import API_URL from '../../../../constants/constant';
import { useGuestStore } from "../../../../stateManagement/admin/useGuestStore";
import { fetchGuestEventDetails } from "../../../../services/organizer/adminGuestServices";
import { sendEventNoticeToAllGuests } from "../../../../services/organizer/adminEventServices";
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the 3-dot icon
import Modal from 'react-native-modal'; // For showing modal
import Ionicons from "react-native-vector-icons/Ionicons";




const GuestListAdmin = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId, name, pax } = route.params;
  const { guests, setGuests } = useGuestStore();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); // For dropdown visibility
  const [guestForDropdown, setGuestForDropdown] = useState(null); // Track selected guest for the dropdown
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [updatedGuestName, setUpdatedGuestName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For deletion confirmation modal
  const [newGuestFields, setNewGuestFields] = useState([]);
  const [fieldsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfFields, setNumberOfFields] = useState("");
  const [guestsData, setGuestsData] = useState([]);  // Array to hold guest data
  const totalPages = Math.ceil(newGuestFields.length / fieldsPerPage);
  const startIndex = (currentPage - 1) * fieldsPerPage;
  const currentFields = newGuestFields.slice(startIndex, startIndex + fieldsPerPage);
  const [addGuestModalVisible, setAddGuestModalVisible] = useState(false); // Modal for adding a guest

  const refreshGuests = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const updatedGuests = await fetchGuestEventDetails(eventId);
      setGuests(updatedGuests);
    } catch (err) {
      setError("Failed to fetch guest data. Please try again later.");
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [eventId, setGuests]);

  useEffect(() => {
    refreshGuests();
  }, [refreshGuests]);

  const handleSendNotifications = async () => {
    try {
      await sendEventNoticeToAllGuests(eventId);
      console.log("Notifications sent.");
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  const handleAddGuest = async () => {
    // Validate guest data
    const invalidGuest = guestsData.some(
      (guest) =>
        !guest.GuestName || !guest.email || !guest.phone || !guest.role
    );
  
    if (invalidGuest) {
      alert('Please fill out all fields for all guests.');
      return;
    }
  
    // Debug the guestsData
    console.log("Guests Data to send:", guestsData);
  
    try {
      const response = await axios.post(`${API_URL}/api/guest`, {
        guest: guestsData,
        eventId: eventId,
      });
  
      if (response.status === 201) {
        setGuests((prevGuests) => [...prevGuests, ...response.data]);
        setAddGuestModalVisible(false); // Close modal
        setGuestsData([]); // Clear guest data
        setNumberOfFields(''); // Reset field count
      }
      console.log('Payload:', {
        guest: guestsData,
        eventId: eventId,
      });
    } catch (error) {
      if (error.response) {
        console.error('Backend error response:', error.response.data);
      } else {
        console.error('Error adding guests:', error);
      }
    }
  };

  const handleAddFields = () => {
    const numFields = parseInt(numberOfFields, 10);
    console.log("Number of fields:", numFields);  // Debugging line
  
    if (isNaN(numFields) || numFields <= 0) {
      alert("Please enter a valid number greater than 0.");
      return;
    }
  
    const newFields = Array(numFields).fill({
      GuestName: '',
      email: '',
      phone: '',
      role: '',
    });
  
    setNewGuestFields((prevFields) => {
      const updatedFields = [...prevFields, ...newFields];
      setGuestsData(updatedFields);  // Update guestsData as well
      return updatedFields;
    });
  };

  const handleInputChange = (index, field, value) => {
    const globalIndex = startIndex + index;
  
    // Update the specific field in the correct guest object
    setNewGuestFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[globalIndex] = {
        ...updatedFields[globalIndex],
        [field]: value,
      };
      
      // Synchronize newGuestFields with guestsData
      setGuestsData(updatedFields); // This line updates guestsData with the latest values
      
      return updatedFields;
    });
  };

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setUpdatedGuestName(guest.GuestName);
    setUpdatedEmail(guest.email);
    setUpdatedPhone(guest.phone);
    setUpdatedRole(guest.role);
    setModalVisible(true);
    setVisible(false); // Close the dropdown when Edit is clicked
  };
  const handleUpdateGuest = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/guest/${selectedGuest.id}`,
        {
          GuestName: updatedGuestName,
          email: updatedEmail,
          phone: updatedPhone,
          role: updatedRole,
        }
      );

      if (response.status === 200) {
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === selectedGuest.id
              ? { ...guest, GuestName: updatedGuestName, email: updatedEmail, phone: updatedPhone, role: updatedRole }
              : guest
          )
        );
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const handleDelete = (guest) => {
    setSelectedGuest(guest);
    setDeleteModalVisible(true);
    setVisible(false); // Close the dropdown when Delete is clicked
  };
  const handleConfirmDelete = async () => {
    if (selectedGuest && selectedGuest.id) {
      try {
        await axios.delete(`${API_URL}/api/guest/${selectedGuest.id}`);
        setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
        setDeleteModalVisible(false);
        window.alert('Guest deleted successfully!');
      } catch (error) {
        console.error('Error deleting guest:', error);
      }
    }
  };
  const toggleDropdown = (guest) => {
    if (guestForDropdown?.id === guest.id) {
      setVisible(!visible); // Toggle dropdown if clicked on the same guest
    } else {
      setGuestForDropdown(guest); // Set selected guest and open dropdown
      setVisible(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshGuests} />
      }
    ><TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10}/>
            </TouchableOpacity>
    <Modal
  isVisible={modalVisible}
  onBackdropPress={() => setModalVisible(false)}
  animationIn="fadeIn" // Fade-in animation when opening
  animationOut="fadeOut" // Fade-out animation when closing
  backdropOpacity={0.5} // Adjust opacity to make it semi-transparent
  backdropColor="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
>
  <View style={styles.modalContent}>
  <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={styles.closeButton}
    >
      <Icon name="close" size={30} color="red" />
    </TouchableOpacity>
    <Text style={styles.modalTitle}>Edit Guest Details</Text>
    <TextInput
      label="Guest Name"
      value={updatedGuestName}
      onChangeText={setUpdatedGuestName}
      style={styles.input}
    />
    <TextInput
      label="Email"
      value={updatedEmail}
      onChangeText={setUpdatedEmail}
      style={styles.input}
    />
    <TextInput
      label="Phone"
      value={updatedPhone}
      onChangeText={setUpdatedPhone}
      style={styles.input}
    />
    <TextInput
      label="Role"
      value={updatedRole}
      onChangeText={setUpdatedRole}
      style={styles.input}
    />
    <Button
      mode="contained"
      style={styles.updateButton}
      onPress={handleUpdateGuest}
    >
      Update Guest Details
    </Button>
  </View>
</Modal>

<Modal
        isVisible={deleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        animationIn="fadeIn"   // Fade-in animation when opening
        animationOut="fadeOut" // Fade-out animation when closing
        backdropOpacity={0.7}  // Make the background slightly opaque
      >
        <View style={styles.deleteModalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete the following guest?
          </Text>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(false)}
            style={styles.closeButton}
          >
            <Icon name="close" size={30} color="red" />
          </TouchableOpacity>
          <View style={styles.guestContainerWithBorder}>
            <Text style={styles.guestName}>{selectedGuest?.GuestName}</Text>
            <Text style={styles.guestInfo}>Email: {selectedGuest?.email}</Text>
            <Text style={styles.guestInfo}>Phone: {selectedGuest?.phone}</Text>
            <Text style={styles.guestInfo}>Role: {selectedGuest?.role}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.deleteButton}
            onPress={handleConfirmDelete}
          >
            Yes, Remove
          </Button>
          
        </View>
      </Modal>

      {/* MODAL FOR ADDING GUEST  */}
      <Modal
          isVisible={addGuestModalVisible}
          onBackdropPress={() => setAddGuestModalVisible(false)}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.7}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Guest</Text>
            <TouchableOpacity
              onPress={() => setAddGuestModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.addFieldsContainer}>
              <TextInput
                placeholder="Number of Guests"
                value={numberOfFields}
                onChangeText={setNumberOfFields}
                style={styles.numberInput}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={handleAddFields} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Display current page fields */}
            {currentFields.map((field, index) => (
          <View key={startIndex + index} style={styles.fieldContainer}>
            {/* Guest Name */}
            <TextInput
              placeholder="Guest Name"
              value={field.GuestName || ''}
              onChangeText={(value) => handleInputChange(index, 'GuestName', value)}
              style={styles.input}
            />

            {/* Email */}
            <TextInput
              placeholder="Email"
              value={field.email || ''}
              onChangeText={(value) => handleInputChange(index, 'email', value)}
              style={styles.input}
              keyboardType="email-address"
            />

            {/* Phone */}
            <TextInput
              placeholder="Phone"
              value={field.phone || ''}
              onChangeText={(value) => handleInputChange(index, 'phone', value)}
              style={styles.input}
              keyboardType="phone-pad"
            />

            {/* Role */}
            <TextInput
              placeholder="Role"
              value={field.role || ''}
              onChangeText={(value) => handleInputChange(index, 'role', value)}
              style={styles.input}
            />
          </View>
        ))}


            {/* Pagination controls */}
            <View style={styles.pagination}>
          {/* Previous Button */}
          <Button
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            style={styles.pageButton}
          >
            &lt; {/* This is the '<' symbol */}
          </Button>

          {/* Page Number */}
          <Text style={styles.pageText}>
            {currentPage} of {totalPages}
          </Text>

          {/* Next Button */}
          <Button
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            style={styles.pageButton}
          >
            &gt; {/* This is the '>' symbol */}
          </Button>
        </View>


            <Button
              mode="contained"
              style={styles.updateButton}
              onPress={handleAddGuest}
            >
              Submit
            </Button>
          </View>
        </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>
          Guest List for Event <Text style={styles.eventName}>{name}</Text>
        </Text>
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>
          Total Guests listed: {guests.length} / {pax}
        </Text>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendNotifications}>
          <Text style={styles.sendButtonText}>Send Notif. </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {guests.length > 0 ? (
          <FlatList
          data={guests}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => {
            if (!item) {
              console.error('Undefined item in FlatList:', item);
              return null;
            }
            return (
              <View style={styles.listItem}>
                <Menu
                  visible={visible && guestForDropdown?.id === item.id}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={() => toggleDropdown(item)}
                      style={styles.dotsContainer}
                    >
                      <Icon name="more-vert" size={24} color="#333" />
                    </TouchableOpacity>
                  }
                >
                  <View style={styles.menu}>
                    <Menu.Item onPress={() => handleEdit(item)} title="Edit" />
                    <Divider />
                    <Menu.Item onPress={() => handleDelete(item)} title="Delete" />
                  </View>
                </Menu>
        
                <View style={styles.guestContainer}>
                  <Text style={styles.guestName}>{item.GuestName}</Text>
                  <Text style={styles.guestInfo}>Email: {item.email}</Text>
                  <Text style={styles.guestInfo}>Phone: {item.phone}</Text>
                  <Text style={styles.guestInfo}>Role: {item.role}</Text>
                </View>
              </View>
            );
          }}
        />
        
        ) : (
          <Text style={styles.noGuests}>No guests found for this event.</Text>
        )}
        <Button
        mode="contained"
        style={styles.addGuestButton}
        onPress={() => setAddGuestModalVisible(true)}
      >
        Add Guest
      </Button>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  eventName: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between", // Aligns guest details and dots button at opposite ends
    borderColor: "#eeba2b",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  guestContainer: {
    flex: 1, // Ensures the guest info takes up all the space on the left
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  guestInfo: {
    fontSize: 14,
    color: "#495057",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  deleteModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  updateButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#eeba2b',
  },
  dotsContainer: {
    padding: 10,
    justifyContent: "flex-end", // Ensures it's aligned to the right

  },
  moreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#eeba2b",
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: "#eeba2b",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor:"white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',      // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1,       // Shadow opacity
    shadowRadius: 4,          // Shadow blur radius
    elevation: 2,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    width: '100%',
  },
  addFieldsContainer: {
    flexDirection: 'row', // Align text input and button horizontally
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#eeba2b',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  numberInput: {
    flex: 1, // Take up available space
    height: 50,
    borderColor: "#ccc",
    backgroundColor:"white",
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',      // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1,       // Shadow opacity
    shadowRadius: 4,          // Shadow blur radius
    elevation: 2,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  pagination: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  pageText: {
    fontSize: 14,
    color: '#ccc',
    marginHorizontal: 10,
  },
  addGuestButton: {
    margin: 20,
    backgroundColor: '#eeba2b',
  },
});

export default GuestListAdmin;
