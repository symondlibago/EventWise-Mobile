import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_URL from "../../../../constants/constant";
import { useGuestStore } from "../../../../stateManagement/admin/useGuestStore";
import { fetchGuestEventDetails } from "../../../../services/organizer/adminGuestServices";
import { TextInput, Button, Menu, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the 3-dot icon
import Modal from "react-native-modal"; // For showing modal
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";

const Attendees = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId, name, pax } = route.params;

  // Initialize guests with an empty array to prevent errors
  const { guests = [], setGuests } = useGuestStore();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [guestForDropdown, setGuestForDropdown] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [updatedGuestName, setUpdatedGuestName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);

  // Safe handling: If guests is not an array, default to an empty array
  const safeGuests = Array.isArray(guests) ? guests : [];

  // Filtered Guests
  const presentCount = safeGuests.filter((guest) => guest.status === "Present").length;
  const absentCount = safeGuests.filter((guest) => guest.status === "Absent").length;

  const filteredGuests = safeGuests.filter((guest) => {
    const matchesSearch = guest.GuestName?.toLowerCase()?.includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? guest.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Fetch guests
  const refreshGuests = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const updatedGuests = await fetchGuestEventDetails(eventId);
      setGuests(Array.isArray(updatedGuests) ? updatedGuests : []);
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

  // Edit Modal Handlers
  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setUpdatedGuestName(guest.GuestName);
    setUpdatedEmail(guest.email);
    setUpdatedPhone(guest.phone);
    setUpdatedRole(guest.role);
    setUpdatedStatus(guest.status);
    setModalVisible(true);
    setVisible(false);
  };

  const handleUpdateGuest = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/guest/${selectedGuest.id}`, {
        GuestName: updatedGuestName,
        email: updatedEmail,
        phone: updatedPhone,
        role: updatedRole,
        status: updatedStatus,
      });

      if (response.status === 200) {
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === selectedGuest.id
              ? {
                  ...guest,
                  GuestName: updatedGuestName,
                  email: updatedEmail,
                  phone: updatedPhone,
                  role: updatedRole,
                  status: updatedStatus,
                }
              : guest
          )
        );
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  const toggleDropdown = (guest) => {
    if (guestForDropdown?.id === guest.id) {
      setVisible(!visible);
    } else {
      setGuestForDropdown(guest);
      setVisible(true);
    }
  };

  const filteredGuestsForCount = safeGuests.filter(
    (guest) =>
      guest.GuestName && // Exclude if GuestName is null
      guest.email && // Exclude if email is null
      guest.phone && // Exclude if phone is null
      guest.role !== "Service Provider" // Exclude Service Provider
  );
  

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshGuests} />}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Icon name="close" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Guest Details</Text>
          <RNPickerSelect
            onValueChange={(value) => setUpdatedStatus(value)}
            items={[
              { label: "Present", value: "Present" },
              { label: "Absent", value: "Absent" },
            ]}
            value={updatedStatus}
            placeholder={{ label: "Select Status", value: null }}
          />
          <Button mode="contained" style={styles.updateButton} onPress={handleUpdateGuest}>
            Update Guest Details
          </Button>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.title}>
          Attendee List for <Text style={styles.eventName}>{name}</Text>
        </Text>
      </View>

      <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>
  Total Guests listed: {filteredGuestsForCount.length} / {pax}
</Text>

  <TextInput
    style={styles.searchBox}
    placeholder="Search guest by name"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
  <View style={styles.statusButtons}>
    <TouchableOpacity
      style={[styles.filterButton, filterStatus === "Present" && styles.activeFilter]}
      onPress={() => setFilterStatus(filterStatus === "Present" ? null : "Present")}
    >
      <Text style={styles.buttonText}>Present: {presentCount}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.filterButton, filterStatus === "Absent" && styles.activeFilter]}
      onPress={() => setFilterStatus(filterStatus === "Absent" ? null : "Absent")}
    >
      <Text style={styles.buttonText}>Absent: {absentCount}</Text>
    </TouchableOpacity>
  </View>
</View>

      {filteredGuests.length > 0 ? (
        <FlatList
          data={filteredGuests}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Menu
                visible={visible && guestForDropdown?.id === item.id}
                onDismiss={() => setVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => toggleDropdown(item)} style={styles.dotsContainer}>
                    <Icon name="more-vert" size={24} color="#333" />
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => handleEdit(item)} title="Edit" />
                <Divider />
              </Menu>
              <View style={styles.guestContainer}>
                <Text style={styles.guestName}>{item.GuestName}</Text>
                <Text style={styles.guestInfo}>Role: {item.role}</Text>
                <Text style={styles.guestInfo}>
                  Status:{" "}
                  <Text style={item.status === "Present" ? styles.statusPresent : styles.statusAbsent}>
                    {item.status}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noGuests}>No guests found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#white",
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

  subTitleContainer: {
    flexDirection: "column", // Arrange items vertically
    alignItems: "center", // Align items to the start (or center if preferred)
    justifyContent: "center", // Optional for clarity
    marginBottom: 20, // Adds spacing below the container
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

  statusPresent: {
    color: 'green',
    fontSize: 16,
  },
  statusAbsent: {
    color: 'red',
    fontSize: 16,
  },
  
  searchBox: {
    borderColor: "#eeba2b",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 50,
    backgroundColor: "#f8f9fa",
    height: 50,
    marginTop: 10,
  },
  statusButtons: { 
  flexDirection: "row",
   marginTop: 10 },
   
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    borderRadius: 5,
  },
  activeFilter: { backgroundColor: "#FFCE00" },

});
export default Attendees;
