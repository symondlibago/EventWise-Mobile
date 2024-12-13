import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const allEventsData = [
  { id: '1', title: 'Diwata Pares', image: require('./assets/event1.png'), provider: 'Boss Kenshin', price: '$500', type: 'Photography' },
  { id: '2', title: 'Diwata Pares', image: require('./assets/event2.png'), provider: 'Boss Kenshin', price: '$2000', type: 'Photography' },
  { id: '3', title: 'Diwata Pares', image: require('./assets/event3.png'), provider: 'Boss Kenshin', price: '$1000', type: 'Photography' },
  { id: '4', title: 'Diwata Pares', image: require('./assets/event1.png'), provider: 'Boss Kenshin', price: '$800', type: 'Food Catering' },
  { id: '5', title: 'Diwata Pares', image: require('./assets/event2.png'), provider: 'Boss Kenshin', price: '$1200', type: 'Photography' },
  { id: '6', title: 'Diwata Pares', image: require('./assets/event3.png'), provider: 'Boss Kenshin', price: '$1500', type: 'Food Catering' },
  { id: '7', title: 'Diwata Pares', image: require('./assets/event1.png'), provider: 'Boss Kenshin', price: '$600', type: 'Video Editing' },
  { id: '8', title: 'Diwata Pares', image: require('./assets/event2.png'), provider: 'Boss Kenshin', price: '$400', type: 'Food Catering' },
];

const eventTypes = ["Food Catering", "Photography", "Video Editing", "Florists"]; // Added eventTypes

const ChooseServiceProv = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState(null); // State to manage selected button
  const [selectedEvent, setSelectedEvent] = useState(null); // State to manage selected event
  const [likedEvents, setLikedEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [addedEvents, setAddedEvents] = useState([]); // New state for added events

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleNext = () => {
    if (selectedEvent) {
      setAddedEvents((prevEvents) => [...prevEvents, selectedEvent]); // Add the event to the list
      handleCloseModal();
    }
  };

  const handleRemoveEvent = (eventId) => {
    setAddedEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId)); // Remove the event from the list
  };

  // Filter events based on the selected type
  const filteredEventsData = selectedType
    ? allEventsData.filter(event => event.type === selectedType)
    : allEventsData;

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleEventClick(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="plus-circle" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.provider}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="cash" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.heartIcon, likedEvents[item.id] ? styles.heartLiked : null]}
        onPress={() => toggleLike(item.id)}
      >
        <MaterialCommunityIcons
          name={likedEvents[item.id] ? 'heart' : 'heart-outline'}
          color={likedEvents[item.id] ? '#FF0000' : '#888'}
          size={20}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']} // Define the gradient colors
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }}   // Bottom
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Header section with a single burger icon, logo, and icons */}
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

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView} // Added style to handle the extra space for buttons
        >
          <View style={styles.content}>
            {/* Centered Create Event Text */}
            <Text style={styles.headerText}>Service Provider</Text>
            {/* Fading Line */}
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}  // White fading effect
              start={{ x: 0, y: 0.5 }}  // Horizontal gradient
              end={{ x: 1, y: 0.5 }}    // Horizontal gradient
              style={styles.line}
            />
            {/* Event Types Section */}
            <Text style={styles.eventTypesText}>Add Service Provider</Text>
            <ScrollView
              horizontal
              contentContainerStyle={styles.scrollViewContentHorizontal}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollViewHorizontal}
            >
              {eventTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.eventTypeButton,
                    { 
                      backgroundColor: selectedType === type ? '#FFC42B' : 'transparent',
                      borderColor: selectedType === type ? '#FFC42B' : '#FFFFFF',
                    }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[
                    styles.eventTypeText,
                    {
                      color: selectedType === type ? '#000000' : '#FFFFFF'
                    }
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Scrollable Events List */}
            <FlatList
              data={filteredEventsData}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
            
            {/* Added Events List */}
            {addedEvents.length > 0 && (
              <View style={styles.addedEventsContainer}>
                <Text style={styles.addedEventsHeader}>Added Events</Text>
                <ScrollView style={styles.addedEventsScrollView}>
                  {addedEvents.map((event) => (
                    <View key={event.id} style={styles.addedEventItem}>
                      <Text style={styles.addedEventText}>{event.title}</Text>
                      <Text style={styles.addedEventText}>{event.type}</Text>
                      <Text style={styles.addedEventText}>{event.price}</Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveEvent(event.id)}
                      >
                        <MaterialCommunityIcons name="delete" size={24} color="#FF4C4C" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={() => { /* Your logic for Add to List */ }}>
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Modal for Event Details */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedEvent && (
                <>
                  <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                  <Text style={styles.modalProvider}>Provider: {selectedEvent.provider}</Text>
                  <Text style={styles.modalPrice}>Price: {selectedEvent.price}</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCloseModal}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                      <Text style={styles.nextButtonText}>Add to List</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

        <NavBar />
      </View>
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
    marginBottom: 20,
  },
  menuButton: {
    marginLeft: 0,
  },
  logo: {
    width: 120,
    height: 40,
    marginLeft: 40,

  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 80,  // Space for the buttons
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC42B',
    textAlign: 'center', // Center align Create Event text
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,  // Space between text and line
  },
  eventTypesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    marginLeft: 10, // Align text to the left
  },
  scrollViewHorizontal: {
    maxHeight: 100, // Set a max height to avoid overflow
  },
  scrollViewContentHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',  // Center the event type buttons horizontally
  },
  scrollViewContent: {
    paddingBottom: 10, // Adjusted padding to avoid overlap with the added events section
  },
  eventTypeButton: {
    borderWidth: 1,
    borderColor: '#FFC42B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  eventTypeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  detailContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartLiked: {
    backgroundColor: '#FFC0CB',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalProvider: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#2A93D5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addedEventsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#2A93D5',
    borderWidth: 1,
    marginTop: 20,  // Added margin to separate from the events list
  },
  addedEventsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A93D5',
    marginBottom: 10,
  },
  addedEventsScrollView: {
    maxHeight: 150,  // Adjust max height to fit the content
  },
  addedEventItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addedEventText: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    padding: 5,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default ChooseServiceProv;
