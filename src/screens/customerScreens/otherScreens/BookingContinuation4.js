import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Modal, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../elements/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingContinuation4 = () => {
  const [guests, setGuests] = useState([{ name: '', email: '' }]);
  const navigation = useNavigation();
  const route = useRoute();
  const selectedVenueLocation = route.params?.selectedVenueLocation || '';
  const [removeMode, setRemoveMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: '', email: '' });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);
  const [eventData, setEventData] = useState(null); 

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setGuests([...guests, newGuest]);
    setNewGuest({ name: '', email: '' });
    setModalVisible(false);
  };

  const handleGuestChange = (index, field, value) => {
    const newGuests = [...guests];
    newGuests[index][field] = value;
    setGuests(newGuests);
  };

  const handleRemoveGuest = (index) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
  };

const handleSaveEvent = async () => {
  if (guests.some(guest => !guest.name || !guest.email)) {
    Alert.alert('Guest Information Missing', 'Please fill in all guest details.');
    return;
  }

  const eventType = await AsyncStorage.getItem('eventType');

  const newEventData = {
    eventName: await AsyncStorage.setItem('eventName', eventData.eventName),
    guests,
    venue: selectedVenueLocation,
    eventType: await AsyncStorage.getItem('eventType'),
    selectedDate: await AsyncStorage.getItem('selectedDate'),
    selectedPackage: JSON.parse(await AsyncStorage.getItem('selectedPackage')),
    totalPrice: await AsyncStorage.getItem('totalPrice'),
  };

  try {
    const existingEventsJson = await AsyncStorage.getItem('@event_data');
    let events = existingEventsJson ? JSON.parse(existingEventsJson) : [];

    if (!Array.isArray(events)) {
      events = [];
    }

    events.push(newEventData);
    setExistingEvents(events);  
    setEventData(newEventData); 
    await AsyncStorage.setItem('@event_data', JSON.stringify(events));

    setSuccessModalVisible(true); 
  } catch (error) {
    console.error('Error saving event data:', error);
    Alert.alert('Error', 'Failed to save event data.');
  }
};

const handleSuccessModalClose = () => {
  setSuccessModalVisible(false);
  if (eventData) {
    navigation.navigate('EventDetails', { event: eventData }); 
  }
  navigation.navigate('Event', { events: existingEvents });  
};
  
 return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
  <Header />
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Invite Guest</Text>
      </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>NAME</Text>
            <Text style={styles.tableHeaderText}>EMAIL</Text>
          </View>
          {guests.map((guest, index) => (
            <View key={index} style={styles.tableRow}>
              <TextInput
                style={styles.input}
                placeholder="Type guest name"
                value={guest.name}
                onChangeText={(text) => handleGuestChange(index, 'name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Type guest email"
                value={guest.email}
                onChangeText={(text) => handleGuestChange(index, 'email', text)}
              />
              {removeMode && (
                <TouchableOpacity onPress={() => handleRemoveGuest(index)}>
                  <Icon name="trash" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          ))}
           <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Add</Text>
                <Text style={styles.addButtonText}>Guest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => setRemoveMode(!removeMode)}>
                <Text style={styles.removeButtonText}>Remove</Text>
                <Text style={styles.removeButtonText}>Guest</Text>
              </TouchableOpacity>
            </View>
        </View>

        {/* Modal for adding a guest */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Name of Guest</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Guest Name"
                placeholderTextColor="#ddd"
                value={newGuest.name}
                onChangeText={(text) => setNewGuest({ ...newGuest, name: text })}
              />
              <Text style={styles.modalTitle}>Guest Email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Guest Email"
                placeholderTextColor="#ddd"
                value={newGuest.email}
                onChangeText={(text) => setNewGuest({ ...newGuest, email: text })}
              />
              <TouchableOpacity style={styles.addButton2} onPress={handleAddGuest}>
                <Text style={styles.addButtonText2}>Add Guest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleSaveEvent}>
            <Text style={styles.bookButtonText}>Book Event</Text>
          </TouchableOpacity>
          </View>

          <Modal animationType="fade" transparent={true} visible={successModalVisible}>
            <View style={styles.navContainer}>
              <View style={styles.navView}>
                <TouchableOpacity onPress={handleSuccessModalClose} style={styles.closeIcon}>
                  <Icon name="close" size={30} color="#6B6B6B" />
                </TouchableOpacity>
                <Image source={require('../pictures/popupBooked.png')} style={styles.modalImage} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: "Poppins",
  },  
  table: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  tableHeaderText: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
    fontFamily: "Poppins",
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  input: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 20, 
  },  
  addButton: {
    padding: 10,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#f4d274',
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 80,
  },
  addButton2: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: "40%",
    marginTop: 20,
  },
  addButtonText2: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  removeButton: {
    padding: 10,
    backgroundColor: '#f4d274',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 80,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#EEBA2B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Poppins",
    color: "#fff",
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  navigationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: '#FFC42B',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '40%',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  navContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  navView: {
    margin: 20,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1,
  },
});

export default BookingContinuation4;