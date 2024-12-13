import React, { useState, useEffect } from "react";
import { Modal, View, Text, Button, ScrollView, Alert } from "react-native";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2SelectPackage from "./Step2SelectPackage";
import Step3CustomizePackage from "./Step3CustomizePackage";
import Step4AddGuests from "./Step4AddGuests";
import styles from "./styles";
import pickerSelectStyles from "./pickerSelectStyles";
import useStore from "../../../../../stateManagement/useStore"; // Assuming you are using Zustand or a similar state management tool

const AddEventOrPackageModalNew = ({ visible, onClose, type }) => {
  const { addEvent, addEventPackage, eventPackages, servicesList } = useStore();

  // State variables for multi-step form
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Details
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Step 2: Choose Package or Customize
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Step 3: Customize Package
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Step 4: adding guests
  const [guests, setGuests] = useState([{ name: "", email: "" }]);

  // Effect to filter packages based on event type
  useEffect(() => {
    if (eventType) {
      const packages = eventPackages.filter(
        (pkg) => pkg.eventType.toLowerCase() === eventType.toLowerCase()
      );
      setFilteredPackages(packages);
    } else {
      setFilteredPackages([]);
    }
  }, [eventType, eventPackages]);

  // Add a guest
  const addGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  // Update Guest Details
  const updateGuest = (index, field, value) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest
      )
    );
  };

  // Handle Add (Final Submission)
  const handleAdd = () => {
    if (!title || !eventType || !eventDate || !eventTime || !eventLocation) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const formattedDate = eventDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = eventTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const servicesPicked = Object.values(selectedServices).flat();
    const newItem = {
      title,
      eventType,
      eventDate: formattedDate,
      eventTime: formattedTime,
      eventLocation,
      description,
      coverPhoto,
      eventPackageSelected: servicesPicked,
      totalPrice: selectedPackage
        ? selectedPackage.basePrice + totalPrice
        : totalPrice,
      guests,
      ...(type === "package" && { price: selectedPackage?.basePrice }),
    };

    if (type === "event") {
      addEvent(newItem);
    } else {
      addEventPackage({
        ...newItem,
        packageType: selectedPackage?.packageName || "Custom",
      });
    }

    resetFields();
    onClose();
  };

  // Reset all form fields
  const resetFields = () => {
    setCurrentStep(1);
    setTitle("");
    setEventType("");
    setEventDate(new Date());
    setEventTime(new Date());
    setEventLocation("");
    setDescription("");
    setCoverPhoto(null);
    setFilteredPackages([]);
    setSelectedPackage(null);
    setSelectedServices({});
    setTotalPrice(0);
    setGuests([{ name: "", email: "" }]);
  };

  // Proceed to Next Step
  const handleNext = () => {
    if (
      currentStep === 1 &&
      (!title || !eventType || !eventDate || !eventTime || !eventLocation)
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setCurrentStep((currentStep) => (currentStep < 4 ? currentStep + 1 : 4));
  };

  // Proceed Back to Previous Step
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
          <Text style={styles.stepIndicator}>Step {currentStep} of 4</Text>

          {currentStep === 1 && (
            <Step1BasicDetails
              title={title}
              setTitle={setTitle}
              eventType={eventType}
              setEventType={setEventType}
              eventDate={eventDate}
              setEventDate={setEventDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              onDateChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setEventDate(selectedDate);
              }}
              eventTime={eventTime}
              setShowTimePicker={setShowTimePicker}
              onTimeChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setEventTime(selectedTime);
              }}
              eventLocation={eventLocation}
              setEventLocation={setEventLocation}
              description={description}
              setDescription={setDescription}
              coverPhoto={coverPhoto}
              handleCoverPhotoSelection={async () => {
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
                    aspect: [4, 3],
                    quality: 1,
                  });
                  if (
                    !result.canceled &&
                    result.assets &&
                    result.assets.length > 0
                  ) {
                    setCoverPhoto(result.assets[0].uri);
                  }
                } catch (error) {
                  console.error("Error selecting cover photo:", error);
                  Alert.alert(
                    "Error",
                    "An error occurred while selecting the cover photo."
                  );
                }
              }}
              styles={styles}
              pickerSelectStyles={pickerSelectStyles}
            />
          )}

          {currentStep === 2 && (
            <Step2SelectPackage
              filteredPackages={filteredPackages}
              selectedPackage={selectedPackage}
              handlePackageSelect={(pkg) => {
                setSelectedPackage(pkg);
                setTotalPrice(0); // Reset additional services price
                const preselectedServices = pkg.servicesPicked.reduce(
                  (acc, service) => {
                    const category = servicesList.find(
                      (s) => s.serviceName === service
                    )?.serviceCategory;
                    if (category) {
                      acc[category] = acc[category]
                        ? [...acc[category], service]
                        : [service];
                    }
                    return acc;
                  },
                  {}
                );
                setSelectedServices(preselectedServices);
                const servicesTotal = pkg.servicesPicked.reduce(
                  (sum, service) => {
                    const serviceObj = servicesList.find(
                      (s) => s.serviceName === service
                    );
                    return sum + (serviceObj ? serviceObj.basePrice : 0);
                  },
                  0
                );
                setTotalPrice(servicesTotal);
              }}
              styles={styles}
            />
          )}

          {currentStep === 3 && (
            <Step3CustomizePackage
              servicesList={servicesList}
              selectedServices={selectedServices}
              handleServiceToggle={(category, service) => {
                setSelectedServices((prev) => {
                  const categoryServices = prev[category] || [];
                  let updatedServices;
                  const servicePrice =
                    servicesList.find((s) => s.serviceName === service)
                      ?.basePrice || 0;

                  if (categoryServices.includes(service)) {
                    updatedServices = categoryServices.filter(
                      (s) => s !== service
                    );
                    setTotalPrice((prevTotal) => prevTotal - servicePrice);
                  } else {
                    updatedServices = [...categoryServices, service];
                    setTotalPrice((prevTotal) => prevTotal + servicePrice);
                  }

                  return { ...prev, [category]: updatedServices };
                });
              }}
              totalPrice={totalPrice}
              styles={styles}
            />
          )}

          {currentStep === 4 && (
            <Step4AddGuests
              guests={guests}
              updateGuest={updateGuest}
              addGuest={addGuest}
              styles={styles}
            />
          )}

          <View style={styles.buttonContainer}>
            {currentStep > 1 && <Button title="Back" onPress={handleBack} />}
            {currentStep < 4 && <Button title="Next" onPress={handleNext} />}
            {currentStep === 4 && (
              <Button title="Book Event" onPress={handleAdd} />
            )}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddEventOrPackageModalNew;
