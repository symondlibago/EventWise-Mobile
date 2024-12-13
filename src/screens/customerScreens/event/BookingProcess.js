import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  Platform,
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal"; // If using react-native-modal
import { Button } from "react-native-paper";
import { FaTrashAlt } from "react-icons/fa";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import RNPickerSelect from "react-native-picker-select";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import selectimage from "../pictures/selectimage.png";
import { useServiceStore } from "../../../stateManagement/serviceProvider/useServiceStore";
import { fetchServices } from "../../../services/organizer/adminPackageServices";
import {
  createEvent,
  createPackage,
  fetchEvents,
} from "../../../services/organizer/adminEventServices";
import { testUploadImageToSupabase } from "../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { fetchPackages } from "../../../services/organizer/adminPackageServices";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import { fetchEventsByDate } from "../../../services/organizer/adminEventServices";
import Header from "../elements/Header";

const BookingProcess = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPackages, setCurrentPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [time, setTime] = useState(new Date());
  const selectedPkg = currentPackages.find((pkg) => pkg.id === selectedPackage);
  const openServiceModal = () => setModalVisible(true);
  const closeServiceModal = () => setModalVisible(false);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] =
    useState(false);
  const [selectedServiceToRemove, setSelectedServiceToRemove] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentScreen, setCurrentScreen] = useState(1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5;
  const [focusedInput, setFocusedInput] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]); // For filtered packages
  const [selectedEventType, setSelectedEventType] = useState(null); // For RNPickerSelect
  const [pax, setPax] = useState('');


  
  // Validation schema
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    eventType: Yup.string().required("Event type is required"),
    eventPax: Yup.number()
      .required("Event pax is required")
      .min(1, "Minimum 1 pax is required"),
    eventDate: Yup.date().required("Event date is required"),
    eventTime: Yup.string().required("Event time is required"),
    eventLocation: Yup.string().required("Event location is required"),
    description: Yup.string().required("Description is required"),
    currentPackages: Yup.array(),
    guests: Yup.array().of(
      Yup.object().shape({
        GuestName: Yup.string().nullable(),
        email: Yup.string().email("Invalid email").nullable(),
        phone: Yup.string().nullable(),
        role: Yup.string().nullable(),
      })
    ),
  });
  // Fetch packages on mount
  // console.log("setPackages function:" );

  // Fetch packages on mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const fetchedPackages = await fetchPackages();
        setCurrentPackages(fetchedPackages); // Set the state
      } catch (error) {
        console.error("Error fetching packages:", error);
        Alert.alert("Error", "Unable to load packages. Please try again.");
      }
    };
    loadPackages();
  }, []);
  
  useEffect(() => {
    // Filter packages based on selected event type
    if (selectedEventType) {
      const filtered = currentPackages.filter(
        (pkg) => pkg.eventType === selectedEventType
      );
      setFilteredPackages(filtered);
    } else {
      setFilteredPackages(currentPackages); // Show all packages if no filter
    }
  }, [selectedEventType, currentPackages]); // Re-run when eventType or packages change

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        Alert.alert("Error", "Unable to load services. Please try again.");
      }
    };
    loadServices();
  }, [setServices]);

  useEffect(() => {
    const filtered = currentPackages.filter(pkg => {
      return pkg.pax >= pax;  // Filter packages based on the pax entered
    });
    setFilteredPackages(filtered);
  }, [pax, currentPackages]);


  // CREATE EVENT FUNCTION
  const handleCreateEvent = async (values, resetForm) => {
    setIsLoading(true);
    try {
      let coverPhotoURL = null;
  
      if (values.coverPhoto) {
        const fileName = `package_cover_${Date.now()}.jpg`;
        coverPhotoURL = await testUploadImageToSupabase(values.coverPhoto, fileName);
      }
  
      const existingEvents = await fetchEventsByDate(values.eventDate);
      if (existingEvents.length >= 3) {
        Alert.alert(
          "Event Limit Reached",
          `You cannot create more than 3 events on ${values.eventDate}.`
        );
        return;
      }
  
      const formattedServices = selectedPkg.services
        .filter((service) => !service.removed) // Exclude removed services
        .map((service) => ({
          id: service.id,
          serviceName: service.serviceName,
          serviceCategory: service.serviceCategory,
          basePrice: service.basePrice,
          pax: service.pax,
          requirements: service.requirements,
        }));
  
      const packageData = {
        packageName: selectedPkg.packageName,
        eventType: selectedPkg.eventType,
        services: formattedServices.map((service) => service.id),
        totalPrice: selectedPkg.totalPrice,
        pax: selectedPkg.pax,
        packagePhotoURl: coverPhotoURL || "",
      };
  
      const createdPackage = await createPackage(packageData);
      console.log("Created Package: ", createdPackage);
  
      // Create the event
      const newEvent = {
        eventName: values.eventName,
        eventType: values.eventType,
        eventPax: values.eventPax,
        eventStatus: "Tentative",
        packages: [createdPackage.id],
        totalPrice: selectedPkg.totalPrice,
        eventDate: values.eventDate,
        eventTime: values.eventTime,
        eventLocation: values.eventLocation,
        description: values.description,
        guest: values.guests || [],
        coverPhoto:
          "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
            coverPhotoURL || null,
      };

  

      const result = await createEvent(newEvent);
      console.log("Create event result:", result);
  
      Alert.alert("Success", "Event created successfully!");
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while creating the event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const [datesWithThreeOrMoreEvents, setDatesWithThreeOrMoreEvents] = useState(
    []
  );

  useEffect(() => {
    const fetchDatesWithThreeOrMoreEvents = async () => {
      try {
        const dates = await fetchEvents(); // fetch all events
        console.log("from fetchDatesWithThreeOrMoreEvents", dates);
        if (dates.length === 0) {
          console.log("No events found");
          return;
        }
        const datesWithThreeOrMoreEvents = dates.reduce((acc, event) => {
          const date = event.date;
          if (!acc.includes(date)) {
            const eventsOnDate = dates.filter((e) => e.date === date);
            if (eventsOnDate.length >= 3) {
              acc.push(date);
            }
          }
          return acc;
        }, []);
        setDatesWithThreeOrMoreEvents(datesWithThreeOrMoreEvents);
      } catch (error) {
        console.error("Error fetching dates with three or more events:", error);
      }
    };
    fetchDatesWithThreeOrMoreEvents();
  }, []);

  useEffect(() => {
    console.log("Dates with three or more events:", datesWithThreeOrMoreEvents);
  }, [datesWithThreeOrMoreEvents]);
  const renderItem = (item) => (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    </View>
  );
  const handleImagePicker = async (setFieldValue) => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        const manipulatedResult = await ImageManipulator.manipulateAsync(
          selectedUri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        let uri = manipulatedResult.uri;
        if (Platform.OS === "android" && !uri.startsWith("file://")) {
          uri = `file://${uri}`;
        }

        setFieldValue("coverPhoto", uri);
        setImageUri(uri);
        console.log("my image URI:", imageUri, "MY uri", uri);
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Formik
            initialValues={{
              eventName: "",
              eventType: "",
              eventPax: "",
              currentPackages: [],
              eventDate: "",
              eventTime: "",
              eventLocation: "",
              description: "",
              coverPhoto: null,
              guests: [{ GuestName: "", email: "", phone: "", role: ""}] || [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleCreateEvent(values, resetForm);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
            }) => (
              <View style={[styles.form, { paddingBottom: 100 }]}>
                {/* Event Creation Screen */}
                {currentScreen === 1 && (
                  <>
                  <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 20, top: 20 }}
              >
                <Ionicons name="arrow-back" size={25} color="#eeba2b" />
              </TouchableOpacity>
                    <Text style={styles.title}>Create Event</Text>

                    <View style={styles.servicePhotoContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          try {
                            handleImagePicker(setFieldValue);
                            console.log("Image URI:", imageUri);
                          } catch (error) {}
                        }}
                      >
                        <Image
                          source={
                            values.coverPhoto
                              ? { uri: values.coverPhoto }
                              : selectimage
                          }
                          style={styles.servicePhoto}
                        />
                      </TouchableOpacity>
                      {touched.coverPhoto && errors.coverPhoto && (
                        <Text style={styles.errorText}>
                          {errors.coverPhoto}
                        </Text>
                      )}
                    </View>

                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "eventName" && {
                          borderColor: "#EEBA2B",
                          borderWidth: 2,
                        }, // Apply yellow border when focused
                      ]}
                      placeholder="Event Name"
                      onChangeText={handleChange("eventName")}
                      onBlur={() => {
                        handleBlur("eventName");
                        setFocusedInput(null); // Reset focus state when the input loses focus
                      }}
                      onFocus={() => setFocusedInput("eventName")} // Set focus state when the input is focused
                      value={values.eventName}
                    />
                    {touched.eventName && errors.eventName && (
                      <Text style={styles.errorText}>{errors.eventName}</Text>
                    )}

                    <View
                    style={[
                      styles.input,
                      {
                        height: 50, 
                        justifyContent: "center", 
                      },
                      focusedInput === "eventType" && {
                        borderColor: "#EEBA2B",
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <RNPickerSelect
                  onValueChange={(value) => {
                    setSelectedEventType(value); // Set the selected event type
                    setFieldValue("eventType", value); // Update the form field value
                  }}
                  items={[
                    { label: "Wedding", value: "Wedding" },
                    { label: "Birthday", value: "Birthday" },
                    { label: "Corporate Event", value: "Corporate Event" },
                    { label: "Other", value: "Other" },
                  ]}
                  placeholder={{ label: "Select event type", value: null }}
                  style={{
                    inputAndroid: { color: "black", padding: 10 },
                    inputIOS: { color: "black", padding: 10 },
                  }}
                />

                  </View>
                  {touched.eventType && errors.eventType && (
                    <Text style={styles.errorText}>{errors.eventType}</Text>
                  )}

                    <TouchableOpacity onPress={() => setShowCalendar(true)}>
                      <Text style={styles.datePicker}>
                        {selectedDate
                          ? `Selected Date: ${
                              selectedDate.toISOString().split("T")[0]
                            }`
                          : "Pick an Event Date"}
                      </Text>
                    </TouchableOpacity>
                    {showCalendar && (
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showCalendar}
                        onRequestClose={() => setShowCalendar(false)}
                        style={styles.modalContainerCalendar}
                      >
                        {/* Dark background overlay */}
                        <View style={styles.modalOverlay} />

                        {/* Modal Content */}
                        <View style={styles.modalContainerCal}>
                          <CalendarPicker
                            onDateChange={(date) => {
                              setShowCalendar(false);
                              setSelectedDate(date);
                              setFieldValue(
                                "eventDate",
                                date.toISOString().split("T")[0]
                              );
                            }}
                            disabledDates={datesWithThreeOrMoreEvents}
                            minDate={new Date()}
                            maxDate={
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth() + 6,
                                new Date().getDate()
                              )
                            }
                            selectedDate={selectedDate}
                          />
                          <Button
                            onPress={() => setShowCalendar(false)}
                            mode="contained"
                            style={styles.closeButton}
                            backgroundColor="#EEBA2B"
                          >
                            Close
                          </Button>
                        </View>
                      </Modal>
                    )}

                    {touched.eventDate && errors.eventDate && (
                      <Text style={styles.errorText}>{errors.eventDate}</Text>
                    )}

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                      <Text style={styles.datePicker}>
                        {values.eventTime
                          ? values.eventTime
                          : "Select Event Time"}
                      </Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                          setShowTimePicker(false);
                          if (selectedTime) {
                            setTime(selectedTime);
                            const formattedTime =
                              selectedTime.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            setFieldValue("eventTime", formattedTime);
                          }
                        }}
                      />
                    )}
                    {touched.eventTime && errors.eventTime && (
                      <Text style={styles.errorText}>{errors.eventTime}</Text>
                    )}

                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "eventLocation" && {
                          borderColor: "#EEBA2B",
                          borderWidth: 2,
                        }, // Highlight border on focus
                      ]}
                      placeholder="Event Location"
                      onChangeText={handleChange("eventLocation")}
                      onBlur={() => {
                        handleBlur("eventLocation");
                        setFocusedInput(null);
                      }}
                      onFocus={() => setFocusedInput("eventLocation")}
                      value={values.eventLocation}
                    />
                    {touched.eventLocation && errors.eventLocation && (
                      <Text style={styles.errorText}>
                        {errors.eventLocation}
                      </Text>
                    )}

                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "description" && {
                          borderColor: "#EEBA2B",
                          borderWidth: 2,
                        }, // Highlight border on focus
                      ]}
                      placeholder="Description"
                      multiline
                      onChangeText={handleChange("description")}
                      onBlur={() => {
                        handleBlur("description");
                        setFocusedInput(null); // Reset focus state when the input loses focus
                      }}
                      onFocus={() => setFocusedInput("description")} // Set the focused input to "description" on focus
                      value={values.description}
                    />

                    {touched.description && errors.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}

                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(2)}
                      style={styles.closeButton} // Switch to Packages screen
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Packages Screen */}
                {currentScreen === 2 && (
      <>
        <TouchableOpacity onPress={() => setCurrentScreen(1)}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#eeba2b"
            marginBottom={10}
          />
        </TouchableOpacity>

        <Text style={styles.titlePackage}>Available Packages</Text>

        <TextInput
            style={[
              styles.input,
              focusedInput === "eventPax" && {
                borderColor: "#EEBA2B",
                borderWidth: 2,
              },
            ]}
            placeholder="Event Pax"
            keyboardType="numeric"
            onChangeText={(text) => {
              handleChange("eventPax")(text); // Call handleChange with the text
              setPax(text); // Update pax state
            }}
            onBlur={() => {
              handleBlur("eventPax");
              setFocusedInput(null);
            }}
            onFocus={() => setFocusedInput("eventPax")}
            value={values.eventPax} // Use the correct value from `values`
          />
          {touched.eventPax && errors.eventPax && (
            <Text style={styles.errorText}>{errors.eventPax}</Text>
          )}



        {filteredPackages && filteredPackages.length > 0 ? (
          <ScrollView>
            {filteredPackages.map((pkg, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.packageCard,
                  selectedPackage === pkg.id && styles.selectedPackageCard,
                ]}
                onPress={() => {
                console.log("Package clicked:", pkg.id);
                setSelectedPackage(pkg.id); 
              }}
              >
                <Text style={styles.packageName}>
                  Package Name: {pkg.packageName}
                </Text>
                <Text style={styles.packageType}>
                  Type: {pkg.eventType}
                </Text>
                <Text style={styles.packagePrice}>
                  Price: ₱{pkg.totalPrice}
                </Text>
                <Text style={styles.packagePrice}>
                  Pax: {pkg.pax}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noPackagesText}>
            No packages available for the selected event type.
          </Text>
        )}

        <Button
          mode="contained"
          onPress={() => {
            setCurrentScreen(3);
            console.log("Proceeding with package ID:", selectedPackage);

            const selectedPkgDetails = currentPackages.find(
              (pkg) => pkg.id === selectedPackage
            );
            if (selectedPkgDetails) {
              console.log("Proceeding with package details:");
              console.log("ID:", selectedPkgDetails.id);
              console.log("packageName:", selectedPkgDetails.packageName);
              console.log("eventType:", selectedPkgDetails.eventType);
              console.log("totalPrice:", selectedPkgDetails.totalPrice);
            } else {
              console.log(
                "No package selected or package details not found."
              );
            }
          }}
          style={styles.closeButton}
        >
          Next
        </Button>
      </>
    )}

    {currentScreen === 3 && selectedPackage !== null && (
                  <>
                    <TouchableOpacity onPress={() => setCurrentScreen(2)}>
                      <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#eeba2b"
                        marginBottom={10}
                      />
                    </TouchableOpacity>
                    {/* Display the selected package details */}
                    <Text style={styles.titlePackage}>Selected Package</Text>

                    <View style={styles.packageDetails}>
                      {selectedPkg ? (
                        <>
                          {/* Package Info */}
                          <Text style={styles.packageName}>
                            Name: {selectedPkg.packageName}
                          </Text>
                          <Text style={styles.packageType}>
                            Type: {selectedPkg.eventType}
                          </Text>
                          <Text style={styles.packagePrice}>
                            Price: ₱{selectedPkg.totalPrice}
                          </Text>

                          {/* Log selected package details */}
                          {console.log("Selected Package Details:", {
                            id: selectedPkg.id,
                            name: selectedPkg.packageName,
                            type: selectedPkg.eventType,
                            price: selectedPkg.totalPrice,
                            services: selectedPkg.services,
                          })}

                          {/* Services for the package */}
                          <Text style={styles.serviceInclusions}>
                            Service Inclusions
                          </Text>

                          {selectedPkg.services &&
                          selectedPkg.services.length > 0 ? (
                            selectedPkg.services.map((service, index) => (
                              <View key={index} style={styles.serviceContainer}>
                                <Text style={styles.serviceName}>
                                  Service Name: {service.serviceName}
                                </Text>
                                <Text style={styles.serviceCategory}>
                                  Category: {service.serviceCategory}
                                </Text>
                                <Text style={styles.serviceFeature}>
                                  Feature: {service.serviceFeatures}
                                </Text>

                                {/* Log each service */}
                                {console.log("Service Details:", {
                                  serviceId: service.id,
                                  serviceName: service.serviceName,
                                  category: service.serviceCategory,
                                  feature: service.serviceFeatures,
                                })}

                                {/* Remove Service Button */}
                                <TouchableOpacity
                                  onPress={() => {
                                    setSelectedServiceToRemove(service);
                                    setConfirmRemoveModalVisible(true);
                                  }}
                                  style={styles.removeButton}
                                >
                                  <Text style={styles.removeButtonText}>X</Text>
                                </TouchableOpacity>
                              </View>
                            ))
                          ) : (
                            <Text style={styles.noServicesText}>
                              No services available for this package.
                            </Text>
                          )}
                        </>
                      ) : (
                        <Text>Package not found.</Text>
                      )}
                    </View>

                    {/* Add Service Button */}
                    <Button
                      mode="contained"
                      onPress={openServiceModal}
                      style={styles.closeButton}
                      marginBottom={10}
                    >
                      Add Service
                    </Button>

                    {/* Log service addition */}
                    {modalVisible && (
                      <Modal
                        isVisible={modalVisible}
                        onBackdropPress={closeServiceModal}
                        onBackButtonPress={closeServiceModal}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                      >
                        <View style={styles.modalContainer}>
                          <Text style={styles.modalTitle}>
                            Select a Service
                          </Text>

                          {/* Search Bar */}
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search by Category..."
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)} // Update search query as user types
                          />

                          {/* Filtered List of Services */}
                          {services && services.length > 0 ? (
                            <ScrollView>
                              {services
                                .filter((service) =>
                                  service.serviceCategory
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                )
                                .map((service, index) => (
                                  <TouchableOpacity
  key={index}
  style={[styles.serviceItem, { borderColor: "#eeba2b", borderWidth: 1, borderRadius: 8, marginTop: 10 }]}
  onPress={() => {
    // Ensure selectedPkg is not null
    const updatedServices = selectedPkg ? [...selectedPkg.services, service] : [service];

    // Convert totalPrice and service.basePrice to numbers to avoid string concatenation
    const currentTotalPrice = parseFloat(selectedPkg.totalPrice) || 0;  // Convert totalPrice to a number, default to 0 if invalid
    const serviceBasePrice = parseFloat(service.basePrice) || 0;  // Ensure service.basePrice is a number, default to 0 if invalid

    // Calculate the updated totalPrice
    const updatedTotalPrice = currentTotalPrice + serviceBasePrice;

    // Log for debugging
    console.log("Package updated with new service:", {
      packageId: selectedPkg.id,
      updatedServices: updatedServices,
      updatedTotalPrice: updatedTotalPrice,
    });

    // Clone the currentPackages and update the selected package
    const updatedPackages = currentPackages.map((pkg) =>
      pkg.id === selectedPkg.id
        ? { ...pkg, services: updatedServices, totalPrice: updatedTotalPrice.toFixed(2) }  // Format totalPrice as a string with two decimal places
        : pkg
    );

    // Set the updated packages list
    setCurrentPackages(updatedPackages);

    // Close the modal after selection
    closeServiceModal();
  }}
>
  <Text style={styles.serviceName}>{service.serviceName}</Text>
  <Text style={styles.serviceCategory}>{service.serviceCategory}</Text>
  <Text style={styles.servicePrice}>Price: ₱{service.basePrice}</Text>
</TouchableOpacity>


                                ))}
                            </ScrollView>
                          ) : (
                            <Text>No services available.</Text>
                          )}

                          {/* Close Button */}
                          <Button
                            mode="contained"
                            onPress={closeServiceModal}
                            style={styles.closeButton}
                            marginTop={10}
                          >
                            Close
                          </Button>
                        </View>
                      </Modal>
                    )}

                    {/* Remove Service Confirmation Modal */}
                    {confirmRemoveModalVisible && (
                      <Modal
                        isVisible={confirmRemoveModalVisible}
                        onBackdropPress={() =>
                          setConfirmRemoveModalVisible(false)
                        }
                        onBackButtonPress={() =>
                          setConfirmRemoveModalVisible(false)
                        }
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                      >
                        <View style={styles.modalContainerConfirm}>
                          <Text style={styles.modalTitle}>
                            Are you sure you want to remove this service?
                          </Text>
                          <Text style={styles.serviceName}>
                            {selectedServiceToRemove?.serviceName}
                          </Text>

                          <View style={styles.modalActions}>
                          <Button
                        mode="contained"
                        onPress={() => {
                          // Remove the service from the selected package's services
                          const updatedServices = selectedPkg.services.filter(
                            (service) => service.id !== selectedServiceToRemove.id
                          );

                          // Calculate the new totalPrice
                          const updatedTotalPrice = selectedPkg.totalPrice - selectedServiceToRemove.basePrice;

                          // Update the selected package with the new services list and totalPrice
                          const updatedPackage = { 
                            ...selectedPkg, 
                            services: updatedServices, 
                            totalPrice: updatedTotalPrice 
                          };

                          // Update the currentPackages state
                          const updatedPackages = currentPackages.map((pkg) =>
                            pkg.id === selectedPkg.id
                              ? { ...pkg, services: updatedServices, totalPrice: updatedTotalPrice }
                              : pkg
                          );

                          // Log the updated package details after removal
                          console.log("Package updated after service removal:", {
                            packageId: selectedPkg.id,
                            updatedServices: updatedServices,
                            updatedTotalPrice: updatedTotalPrice,
                          });

                          // Update the state with the new packages list
                          setCurrentPackages(updatedPackages);

                          // Close the modal
                          setConfirmRemoveModalVisible(false);
                        }}
                        style={styles.closeButton}
                        marginRight={10}
                      >
                        Yes, Remove
                      </Button>


                            <Button
                              mode="contained"
                              onPress={() =>
                                setConfirmRemoveModalVisible(false)
                              } // Cancel action
                              style={styles.closeButton}
                            >
                              Cancel
                            </Button>
                          </View>
                        </View>
                      </Modal>
                    )}

                    {/* Navigation Buttons */}

                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(4)}
                      style={styles.closeButton}
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Guests Screen */}
                {currentScreen === 4 && (
                  <>
                    <TouchableOpacity onPress={() => setCurrentScreen(3)}>
                      <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#eeba2b"
                        marginBottom={10}
                      />
                    </TouchableOpacity>
                    <FieldArray name="guests">
                      {({ remove, push }) => {
                        // Pagination calculations
                        const startIndex = (currentPage - 1) * guestsPerPage;
                        const endIndex = startIndex + guestsPerPage;
                        const totalPages = Math.ceil(
                          values.guests.length / guestsPerPage
                        );
                        const currentGuests = values.guests.slice(
                          startIndex,
                          endIndex
                        );

                        return (
                          <View>
                            <Text style={styles.titlePackage}>Guest List</Text>

                            {/* Input for specifying number of guests to add */}
                            <View style={styles.guestNumberContainer}>
                              <TextInput
                                style={styles.numberInput}
                                placeholder="Number of Guests"
                                value={numberOfGuests}
                                onChangeText={(value) =>
                                  setNumberOfGuests(value)
                                }
                                keyboardType="numeric" // Ensures numeric input
                              />
                              <Button
                                onPress={() => {
                                  const count = parseInt(numberOfGuests, 10); // Parse input as integer
                                  if (!isNaN(count) && count > 0) {
                                    for (let i = 0; i < count; i++) {
                                      push({
                                        GuestName: "",
                                        email: "",
                                        phone: "",
                                        role: "",
                                      }); // Adds empty containers
                                    }
                                    setNumberOfGuests(""); // Reset input field
                                  }
                                }}
                                style={styles.addButton}
                                textColor="white"
                              >
                                Add
                              </Button>
                            </View>

                            {/* List of guests for the current page */}
                            {currentGuests.length > 0 ? (
                              currentGuests.map((guest, index) => (
                                <View
                                  key={startIndex + index}
                                  style={styles.guestContainer}
                                >
                                  <TextInput
                                    style={styles.input}
                                    placeholder="Guest Name"
                                    value={guest.GuestName}
                                    onChangeText={handleChange(
                                      `guests[${startIndex + index}].GuestName`
                                    )}
                                  />
                                  <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={guest.email}
                                    onChangeText={handleChange(
                                      `guests[${startIndex + index}].email`
                                    )}
                                  />
                                  <TextInput
                                    style={styles.input}
                                    placeholder="Phone"
                                    value={guest.phone}
                                    onChangeText={handleChange(
                                      `guests[${startIndex + index}].phone`
                                    )}
                                  />
                                  <TextInput
                                    style={styles.input}
                                    placeholder="Role"
                                    value={guest.role}
                                    onChangeText={handleChange(
                                      `guests[${startIndex + index}].role`
                                    )}
                                  />
                                  <TouchableOpacity
                                    onPress={() => remove(startIndex + index)}
                                  >
                                    <Text style={styles.removeGuest}>
                                      Remove
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ))
                            ) : (
                              <Text>No guests to display on this page.</Text>
                            )}

                            {/* Pagination Controls */}
                            <View style={styles.paginationContainer}>
                              <TouchableOpacity
                                onPress={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(1, prev - 1)
                                  )
                                }
                                disabled={currentPage === 1} // Disable when on the first page
                              >
                                <Text
                                  style={[
                                    styles.paginationArrow,
                                    currentPage === 1 && styles.disabledArrow,
                                  ]}
                                >
                                  {"<"}
                                </Text>
                              </TouchableOpacity>
                              <Text style={styles.pageIndicator}>
                                {currentPage}
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1)
                                  )
                                }
                                disabled={currentPage === totalPages} // Disable when on the last page
                              >
                                <Text
                                  style={[
                                    styles.paginationArrow,
                                    currentPage === totalPages &&
                                      styles.disabledArrow,
                                  ]}
                                >
                                  {">"}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            {/* Button to manually add one guest */}
                            <View style={styles.buttonContainer}>
                    
                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(5)}
                      style={styles.addButton1}
                    >
                      Skip
                    </Button>
                    </View>
                          </View>
                        );
                      }}
                    </FieldArray>

                    {/* Submit and Back buttons */}
                    <View style={styles.buttonContainer}>
                    
                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(5)}
                      style={styles.addButton1}
                    >
                      Next
                    </Button>
                    </View>
                  </>
                )}

                {currentScreen === 5 && (
  <>
    <TouchableOpacity onPress={() => setCurrentScreen(4)}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="#eeba2b"
        marginBottom={10}
      />
    </TouchableOpacity>
    
    <View style={styles.reviewContainer}>
      <Text style={styles.title}>Review Details</Text>

      {/* Displaying Cover Photo */}
      <View style={styles.coverPhotoContainer}>
        <Text style={styles.label}>Cover Photo:</Text>
        {values.coverPhoto ? (
          <Image
            source={{ uri: values.coverPhoto }}
            style={styles.coverPhoto}
          />
        ) : (
          <Text style={styles.value}>No cover photo selected</Text>
        )}
      </View>

      {/* Displaying Event Information */}
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.value}>{values.eventName}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Type:</Text>
        <Text style={styles.value}>{values.eventType}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Pax:</Text>
        <Text style={styles.value}>{values.eventPax}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Date:</Text>
        <Text style={styles.value}>{values.eventDate}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Time:</Text>
        <Text style={styles.value}>{values.eventTime}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Event Location:</Text>
        <Text style={styles.value}>{values.eventLocation}</Text>
      </View>
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{values.description}</Text>
      </View>

      {/* Displaying Package Information */}
      <View style={styles.reviewItem}>
        <Text style={styles.label}>Package:</Text>
        {selectedPkg ? (
          <>
            <Text style={styles.value}>
              {selectedPkg.packageName} - ₱{selectedPkg.totalPrice}
            </Text>
          </>
        ) : (
          <Text style={styles.value}>No package selected</Text>
        )}
      </View>

      {/* Buttons for Finalizing */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={styles.addButton1}
        >
          Submit
        </Button>
      </View>
    </View>
  </>
)}




{/* dari raka taman haaaaaaaaaaaaaaaaaaaaaa heheheheh (|================3*/}
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  servicePhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  guestContainer: {
    marginBottom: 16,
  },
  removeGuest: {
    color: "red",
    textAlign: "right",
    marginTop: 8,
  },

  guestNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5, // Adds spacing between buttons
  },

  addButton: {
    backgroundColor: "#EEBA2B",
    padding: 1,
    borderRadius: 20,
    alignItems: "center",
  },
  addButton1: {
    backgroundColor: "#EEBA2B",
    justifyContent: "center",
    padding: 1,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
  },

  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  paginationArrow: {
    fontSize: 20,
    marginHorizontal: 16,
    color: "#EEBA2B", // Arrow color
  },
  disabledArrow: {
    color: "#ccc", // Lighter color for disabled arrows
  },
  pageIndicator: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ccc",
  },

  selectedDateText: {
    marginTop: 20,
    fontSize: 18,
    color: "black",
  },
  closeButton: {
    backgroundColor: "#EEBA2B",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  modalContainerConfirm: {
    backgroundColor: "white", // White background for the modal
    borderRadius: 10, // Optional: adds rounded corners
    padding: 20, // Padding inside the modal
    maxHeight: "20%", // Restricts the height to 80% of the screen height
    justifyContent: "center", // Centers the content vertically
    elevation: 10, // Adds shadow on Android
    shadowColor: "#000", // Shadow color on iOS
    shadowOpacity: 0.1, // Shadow opacity on iOS
    shadowRadius: 5, // Shadow radius on iOS
    position: "absolute", // Make sure it's on top of the screen
    top: "40%", // Adjust the top and bottom position if necessary
    left: "10%", // Center horizontally
    right: "10%",
    bottom: "10%",
    zIndex: 9999, // Ensure the modal is always on top of other content
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "50%",
    width: "100%",
    position: "absolute",
    top: "25%",
    left: "0",
    zIndex: 999,
  },

  modalOverlay: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    right: "10%",
    width: "120%",
    height: "120%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
  },
  modalContainerCal: {
    borderColor: "#eeba2b",
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "50%",
    width: "110%",
    position: "absolute",
    top: "25%",
    right: "-5%",
    zIndex: 999,
  },

  calendarContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
 },
  titlePackage: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    textAlign: "center",
    color: "#888",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },

  servicePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },

  packageCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedPackageCard: {
    borderColor: "#eeba2b", // Highlight color for selected package
    borderWidth: 1,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packageType: {
    fontSize: 14,
    color: "#666",
  },
  packagePrice: {
    fontSize: 14,
    color: "#666",
  },
  noPackagesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  serviceInclusions: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  serviceCard: {
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 14,
  },
  servicePrice: {
    fontSize: 12,
  },
  serviceCategory: {
    fontSize: 12,
    color: "gray",
  },
  serviceFeature: {
    fontSize: 12,
    color: "#666",
  },
  noServicesText: {
    fontSize: 14,
    color: "gray",
  },
  serviceContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    position: "relative", // For positioning the remove button
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent", // No background color
    padding: 5,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  trashIcon: {
    fontSize: 20,
    color: "red",
  },
  packageDetails: { marginBottom: 20 },
  serviceContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    position: "relative",
  },

  confirmRemoveModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  serviceItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginTop: 10,
  },

  reviewContainer: {
    padding: 20,
  },
  
  reviewItem: {
    flexDirection: 'row', // Aligns label and value horizontally
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  
  coverPhotoContainer: {
    alignItems: 'center', // Centers the cover photo and text
    marginBottom: 20,
  },
  
  coverPhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  
  label: {
    fontWeight: 'bold',
    flex: 1, // Ensures proper spacing
  },
  
  value: {
    flex: 2, // Aligns value to the right of the label
  },
  
});

export default BookingProcess;
