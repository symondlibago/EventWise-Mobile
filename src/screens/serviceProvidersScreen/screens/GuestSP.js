import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../../../constants/constant';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the 3-dot icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'; // For showing modal
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const GuestList = () => {
  const route = useRoute();
  const { eventId, eventName } = route.params;
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [updatedGuestName, setUpdatedGuestName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [visible, setVisible] = useState(false); // For dropdown visibility
  const [guestForDropdown, setGuestForDropdown] = useState(null); // Track selected guest for the dropdown
  const [addGuestModalVisible, setAddGuestModalVisible] = useState(false); // Modal for adding a guest
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For deletion confirmation modal
  const navigation = useNavigation(); // Initialize navigation
  const [newGuestFields, setNewGuestFields] = useState([]);
  const [fieldsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfFields, setNumberOfFields] = useState("");
  const [guestsData, setGuestsData] = useState([]);  // Array to hold guest data
  // const [currentFields, setCurrentFields] = useState([]);
 
  console.log('Event ID:', eventId);  // Check if the eventId and eventName are available
  console.log('Event Name:', eventName);


  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/guest/${eventId}`);
        setGuests(response.data);
        console.log('Guests:', response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [eventId]);
  
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

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setUpdatedGuestName(guest.GuestName);
    setUpdatedEmail(guest.email);
    setUpdatedPhone(guest.phone);
    setUpdatedRole(guest.role);
    setModalVisible(true);
    setVisible(false); // Close the dropdown when Edit is clicked
  };

  const handleDelete = (guest) => {
    setSelectedGuest(guest);
    setDeleteModalVisible(true);
    setVisible(false); // Close the dropdown when Delete is clicked
  };

  const toggleDropdown = (guest) => {
    if (guestForDropdown?.id === guest.id) {
      setVisible(!visible); // Toggle dropdown if clicked on the same guest
    } else {
      setGuestForDropdown(guest); // Set selected guest and open dropdown
      setVisible(true);
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
  
  
  

  // Pagination calculations
  const totalPages = Math.ceil(newGuestFields.length / fieldsPerPage);
  const startIndex = (currentPage - 1) * fieldsPerPage;
  const currentFields = newGuestFields.slice(startIndex, startIndex + fieldsPerPage);

  return (
    <>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
    </TouchableOpacity>
        <Text style={styles.header}>Guest List for {eventName}</Text>
        {guests.length > 0 ? (
          <FlatList
            data={guests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
            

                <View style={styles.guestContainer}>
                  <Text style={styles.guestName}>{item.GuestName}</Text>
                  <Text style={styles.guestInfo}>Role: {item.role}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noGuests}>No guests found for this event.</Text>
        )}
      </View>

      {/* Modal for editing guest details */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeIn"   // Fade-in animation when opening
        animationOut="fadeOut" // Fade-out animation when closing
        backdropOpacity={0.7}  // Make the background slightly opaque
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Guest Details</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          
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

      {/* Delete Confirmation Modal */}
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
            <Icon name="close" size={24} color="#333" />
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
      
 <Button
        mode="contained"
        style={styles.addGuestButton}
        onPress={() => setAddGuestModalVisible(true)}
      >
        Add Guest
      </Button>


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



    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#eeba2b',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#f8f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  guestContainer: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedGuestContainer: {
    borderColor: '#ffcc00',
    borderWidth: 2,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  guestInfo: {
    fontSize: 14,
    color: '#777',
  },
  menu: {
    minWidth: 150,
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
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  updateButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#eeba2b',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    width: '100%',
  },
  noGuests: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
  addGuestButton: {
    margin: 20,
    backgroundColor: '#eeba2b',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  addFieldsContainer: {
    flexDirection: 'row', // Align text input and button horizontally
    alignItems: 'center',
    marginBottom: 20,
  },
  numberInput: {
    flex: 1, // Take up available space
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
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

});

export default GuestList; 
