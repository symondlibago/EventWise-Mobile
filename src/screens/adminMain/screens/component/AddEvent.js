import pickerSelectStyles from "./pickerSelectStyles";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import useStore from "../../../../stateManagement/useStore";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import event2 from "../../../../../assets/event2.png";
import selectimage from "../../../../../assets/selectimage.png";

const AddEvent = ({ visible, onClose, type }) => {
  const { addEvent, addEventPackage, eventPackages, servicesList } = useStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [packageEventType, setPackageEventType] = useState("");
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [guests, setGuests] = useState([{ name: "", email: "" }]);

  useEffect(() => {
    if (eventType) {
      const packages = eventPackages.filter(
        (pkg) => pkg.eventType?.toLowerCase() === eventType.toLowerCase()
      );
      setFilteredPackages(packages);
    } else {
      setFilteredPackages([]);
    }
  }, [eventType, eventPackages]);

  const handleAddInclusion = (serviceName) => {
    // Check if the service is already included
    const alreadyIncluded = selectedPackage.services.includes(serviceName);

    // Update the selected package's inclusions
    const updatedServices = alreadyIncluded
      ? selectedPackage.services.filter((service) => service !== serviceName) // Remove if already included
      : [...selectedPackage.services, serviceName]; // Add if not included

    setSelectedPackage((prevState) => ({
      ...prevState,
      services: updatedServices,
    }));

    // Calculate the new total price
    const additionalServices = updatedServices.reduce((acc, service) => {
      const foundService = servicesList.find((s) => s.serviceName === service);
      return acc + (foundService ? foundService.basePrice : 0);
    }, 0);

    // Update the total price
    setTotalPrice(additionalServices);
  };

  const PackageDetails = ({ selectedPackage }) => {
    return (
      <View style={styles.packageDetailsContainer}>
        <Text style={styles.packageName}>Package Details:</Text>
        <Text>
          Package name:{" "}
          <Text style={styles.packageName}>{selectedPackage.packageName}</Text>
        </Text>

        <Text style={styles.packageType}>
          Package type: {selectedPackage.eventType}
        </Text>
        <Text style={styles.packageInclusions}>Package Inclusions:</Text>
        <View style={styles.servicesContainer}>
          {selectedPackage.services.map((service, index) => (
            <Text key={index} style={styles.service}>
              • {service}
            </Text>
          ))}
        </View>
        <Text>
          Package Price:
          <Text style={styles.packagePrice}>
            {totalPrice + (selectedPackage?.basePrice || 0)}
          </Text>
        </Text>

        <Text style={styles.packageDate}>
          {selectedPackage.packageCreatedDate}
        </Text>
      </View>
    );
  };
  const handleCoverPhotoSelection = async () => {
    try {
      // Request permission to access the gallery
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        // console.log("Selected image URI:", selectedUri); // Debugging
        setCoverPhoto(selectedUri); // Update state with selected image URI
      } else {
        // console.log("Image selection was canceled."); // Debugging
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  const handleAddGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  const updateGuest = (index, field, value) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleAdd = () => {
    if (!title || !eventType || !eventDate || !eventTime || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newEvent = {
      eventId: Date.now().toString(),
      eventName: title,
      eventType,
      eventDate: eventDate.toISOString().split("T")[0],
      eventTime: eventTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      eventLocation: location,
      eventDescription: description,
      EventImage: coverPhoto,
      eventPackageName: selectedPackage ? selectedPackage.packageName : null, // Ensure selectedPackage is defined
      // PackageInclusions: selectedPackage ? selectedPackage.inclusions : [], // Ensure inclusions are defined
      packageInclusions: selectedPackage ? selectedPackage.services : [], // Ensure selectedPackage is defined
      guests,
      totalPrice: totalPrice + (selectedPackage?.basePrice || 0), // Default to 0 if no package
    };

    addEvent(newEvent);
    resetFields();
    onClose();
    console.log("New event added addEventorPackage:", newEvent);
  };

  const resetFields = () => {
    setCurrentStep(1);
    setTitle("");
    setEventType("");
    setEventDate(new Date());
    setEventTime(new Date());
    setLocation("");
    setDescription("");
    setCoverPhoto(null);
    setFilteredPackages([]);
    setSelectedPackage(null);
    setSelectedServices({});
    setTotalPrice(0);
    setGuests([{ name: "", email: "" }]);
  };
  const handlePackageSelect = (packageItem) => {
    setSelectedPackage(packageItem);
    const packagePrice = packageItem.basePrice || 0;
    const additionalServices = packageItem.services.reduce((acc, service) => {
      const foundService = servicesList.find((s) => s.serviceName === service);
      return acc + (foundService ? foundService.basePrice : 0);
    }, 0);
    setTotalPrice(packagePrice + additionalServices);
  };
  const handleNext = () => {
    if (
      currentStep === 1 &&
      (!title || !eventType || !eventDate || !location)
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setCurrentStep((prev) => (prev < 5 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <ScrollView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {type === "event" ? "Create Event" : "Add Event Package"}
          </Text>
          <Text style={styles.stepIndicator}>Step {currentStep} of 5</Text>

          {currentStep === 1 && (
            <>
              <TextInput
                placeholder={
                  type === "event" ? "Enter Event Name" : "Enter Package Name"
                }
                value={title}
                onChangeText={setTitle}
                style={styles.inputStyle}
              />
              <RNPickerSelect
                onValueChange={(value) => setEventType(value)}
                placeholder={{ label: "Choose Event Type...", value: null }}
                items={[
                  { label: "Birthday", value: "Birthday" },
                  { label: "Wedding", value: "Wedding" },
                  { label: "Reunion", value: "Reunion" },
                  { label: "Conference", value: "Conference" },
                ]}
                style={pickerSelectStyles}
                value={eventType}
                useNativeAndroidPickerStyle={false}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.datePickerText}>
                  {eventDate ? eventDate.toLocaleDateString() : "Select Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={eventDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setEventDate(selectedDate);
                    }
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.datePickerText}>
                  {eventTime
                    ? eventTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Select Time"}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={eventTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      setEventTime(selectedTime);
                    }
                  }}
                />
              )}
              <TextInput
                placeholder="Enter Event Venue"
                value={location}
                onChangeText={setLocation}
                style={styles.inputStyle}
              />
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.inputStyle, { height: 80 }]}
                multiline
              />
              <TouchableOpacity
                onPress={handleCoverPhotoSelection}
                style={styles.coverPhotoContainer}
              >
                <Image
                  source={coverPhoto ? { uri: coverPhoto } : selectimage}
                  style={styles.coverPhoto}
                />
                <Text style={styles.addPhotoText}>Add Cover Photo</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleNext} />
                <Button title="Close" onPress={onClose} color="#FF3B30" />
              </View>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Choose Event Package or Customize */}
              <Text style={styles.sectionTitle}>Choose an Event Package</Text>

              {filteredPackages.length > 0 ? (
                <FlatList
                  data={filteredPackages}
                  keyExtractor={(item) => item.packageId}
                  renderItem={({ item }) => (
                    // <TouchableOpacity
                    //   style={[
                    //     styles.packageItem,
                    //     selectedPackage?.packageId === item.packageId &&
                    //       styles.packageItemSelected,
                    //   ]}
                    //   onPress={() => setSelectedPackage(item)}
                    // >
                    <TouchableOpacity
                      style={[
                        styles.packageItem,
                        selectedPackage?.packageId === item.packageId &&
                          styles.packageItemSelected,
                      ]}
                      onPress={() => handlePackageSelect(item)}
                    >
                      <Image
                        source={item.packageImage || event2}
                        style={styles.packageImage}
                      />
                      <View style={styles.packageInfo}>
                        <Text style={styles.packageName}>
                          {item.packageName}
                        </Text>
                        {/* <Text style={styles.packagePrice}>
                Base Price: ${item.basePrice}
              </Text> */}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.noPackagesText}>
                  No packages available for the selected event type.
                </Text>
              )}

              {selectedPackage && (
                <TouchableOpacity
                  onPress={() => setCurrentStep(2.5)}
                  style={styles.customizeButton}
                >
                  <Text style={styles.customizeButtonText}>Modify Package</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => setSelectedPackage(null)}
                style={styles.customizeButton}
              >
                <Text style={styles.customizeButtonText}>
                  Customize Your Package
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <Button title="Back" onPress={handleBack} />
                <Button
                  title="Next"
                  onPress={handleNext}
                  disabled={!selectedPackage}
                />
              </View>
            </>
          )}

          {currentStep === 2.5 && (
            <View style={{ height: "60%" }}>
              <Text style={styles.subTitle}>Modify Package</Text>
              <Text style={styles.packageName}>
                {selectedPackage.packageName}
              </Text>

              <Text style={styles.sectionHeader}>Package Inclusions:</Text>
              <View style={styles.servicesContainer}>
                {selectedPackage.services.map((service, index) => (
                  <Text key={index} style={styles.serviceItem}>
                    • {service}
                  </Text>
                ))}
              </View>

              <Text style={styles.sectionHeader}>Available Services:</Text>
              <View style={{ height: "60%" }}>
                <ScrollView>
                  <View style={styles.servicesContainer}>
                    {servicesList.map((service, index) => (
                      // console.log(service),
                      <TouchableOpacity
                        key={index}
                        style={styles.serviceOption}
                        onPress={() => handleAddInclusion(service.serviceName)}
                      >
                        <Text style={styles.serviceName}>
                          {service.serviceName}
                        </Text>
                        <Text style={styles.servicePrice}>
                          ${service.basePrice}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <Text style={styles.totalPriceText}>
                Total Price: ${totalPrice + (selectedPackage?.basePrice || 0)}
              </Text>

              <View style={styles.buttonContainer}>
                <Button
                  title="Back"
                  onPress={() => setCurrentStep(2)}
                  color="#808080"
                />
                <Button
                  title="Confirm"
                  onPress={() => setCurrentStep(3)}
                  color="#1E90FF"
                />
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <>
              <Text style={styles.subTitle}>Add Guests</Text>
              <FlatList
                data={guests}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.guestContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Guest Name"
                      value={item.name}
                      onChangeText={(text) => updateGuest(index, "name", text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Guest Email"
                      value={item.email}
                      onChangeText={(text) => updateGuest(index, "email", text)}
                    />
                  </View>
                )}
              />
              <Button title="Add Guest" onPress={handleAddGuest} />
              <View style={styles.buttonContainer}>
                <Button title="Back" onPress={handleBack} />
                <Button title="Next" onPress={handleNext} />
              </View>
            </>
          )}

          {currentStep === 4 && (
            <>
              <Text style={styles.subTitle}>Review Details</Text>
              <Text>Event Name: {title}</Text>
              <Text>Event Type: {eventType}</Text>
              <Text>Date: {eventDate.toLocaleDateString()}</Text>
              <Text>
                Time:{" "}
                {eventTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text>Venue: {location}</Text>
              <Text>Description: {description}</Text>
              <Text>Guests:</Text>
              {guests.map((guest, index) => (
                <Text key={index}>
                  {guest.name} - {guest.email}
                </Text>
              ))}

              {selectedPackage ? (
                <>
                  {/* <Text>Selected Package: {selectedPackage.packageName}</Text> */}
                  {/* <Text>Base Price: ${selectedPackage.basePrice}</Text> */}
                  {currentStep === 4 && (
                    <PackageDetails selectedPackage={selectedPackage} />
                  )}
                </>
              ) : (
                <>
                  <Text>Custom Package:</Text>
                  {Object.keys(selectedServices).map((category) => (
                    <Text key={category}>
                      {category}: {selectedServices[category].join(", ")}
                    </Text>
                  ))}
                  <Text>Total Price: ${totalPrice}</Text>
                </>
              )}
              <View style={styles.buttonContainer}>
                <Button title="Back" onPress={handleBack} />
                <Button title="Next" onPress={handleNext} />
              </View>
            </>
          )}

          {currentStep === 5 && (
            <>
              <Text style={styles.subTitle}>Finalize Booking</Text>
              <Button title="Book Event" onPress={handleAdd} />
              <Button title="Back" onPress={handleBack} />
            </>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stepIndicator: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  coverPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  addPhotoText: {
    color: "#888",
    fontSize: 14,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  packageItemSelected: {
    borderColor: "#FF9800",
  },
  packageImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packagePrice: {
    fontSize: 14,
    color: "#555",
  },
  packageDescription: {
    fontSize: 12,
    color: "#777",
  },
  noPackagesText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  customizeButton: {
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  customizeButtonText: {
    color: "white",
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
  },
  serviceName: {
    fontSize: 14,
  },
  totalPriceContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  guestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 10,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "500",
  },
  servicesContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  serviceItem: {
    fontSize: 14,
    color: "#333",
    marginVertical: 3,
  },
  serviceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  serviceName: {
    fontSize: 14,
    color: "#1E90FF",
  },
  servicePrice: {
    fontSize: 14,
    color: "#696969",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
