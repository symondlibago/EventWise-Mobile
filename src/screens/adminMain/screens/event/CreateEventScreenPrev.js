import React, { useEffect, useState } from "react";
import StepThree from "./CreateEventProcess/StepThree";
import StepFour from "./CreateEventProcess/StepFour";
import StepTwo from "./CreateEventProcess/StepTwo";
import StepOne from "./CreateEventProcess/StepOne";
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
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import RNPickerSelect from "react-native-picker-select";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import selectimage from "../../../../../assets/selectimage.png";
import { useServicesStore } from "../../../../stateManagement/admin/useServicesStore";
import { fetchServices } from "../../../../services/organizer/adminPackageServices";
import {
  createEvent,
  fetchEvents,
} from "../../../../services/organizer/adminEventServices";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { fetchPackages } from "../../../../services/organizer/adminPackageServices";

import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import { fetchEventsByDate } from "../../../../services/organizer/adminEventServices";
const CreateEventScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPackages, setCurrentPackages] = useState([]);
  const { services, setServices } = useServicesStore();

  const [time, setTime] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selected, setSelected] = useState([]);
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
    // coverPhoto: Yup.string()
    //   .url("Must be a valid URL")
    //   .required("Cover photo URL is required"),
    guest: Yup.array().of(
      Yup.object().shape({
        GuestName: Yup.string().required("Guest name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
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
  }, [setCurrentPackages]);
  // console.log("fetched packages: " + JSON.stringify(currentPackages, null, 2));
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

  const handleCreateEvent = async (values, resetForm) => {
    setIsLoading(true);
    try {
      let coverPhotoURL = null;

      // if (values.coverPhoto) {  //#FIX needs to be uncommented
      //   const fileName = `package_cover_${Date.now()}.jpg`;
      //   coverPhotoURL = await testUploadImageToSupabase(
      //     values.coverPhoto,
      //     fileName
      //   );
      // }
      // Fetch existing events for the selected date
      const existingEvents = await fetchEventsByDate(values.eventDate);
      console.log(
        "event date" + values.eventDate + " events: " + existingEvents
      );
      // Check if the number of events for the selected date is less than 3
      if (existingEvents.length >= 3) {
        Alert.alert(
          "Event Limit Reached",
          `You cannot create more than 3 events on ${values.eventDate}.`
        );
        return;
      }
      const newEvent = {
        eventName: values.eventName,
        eventType: values.eventType,
        eventPax: values.eventPax,
        eventStatus: "Tenative",
        packages: selected,
        eventDate: values.eventDate,
        eventTime: values.eventTime,
        eventLocation: values.eventLocation,
        description: values.description,
        guest: values.guest,
        coverPhoto: coverPhotoURL !== null ? coverPhotoURL : null,
      };

      console.log("New event data:", newEvent);
      const result = await createEvent(newEvent);

      Alert.alert("Success", "Event created successfully!");
      resetForm();
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
      {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
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

  const [currentStep, setCurrentStep] = useState(1);

  // const StepOne = ({ values, handleChange, handleBlur, errors, touched }) => (
  //   <>
  //     <TextInput
  //       style={styles.input}
  //       placeholder="Event Name"
  //       onChangeText={handleChange("eventName")}
  //       onBlur={handleBlur("eventName")}
  //       value={values.eventName}
  //     />
  //     {touched.eventName && errors.eventName && (
  //       <Text style={styles.errorText}>{errors.eventName}</Text>
  //     )}
  //     <RNPickerSelect
  //       onValueChange={(value) => handleChange("eventType")(value)}
  //       items={[
  //         { label: "Wedding", value: "Wedding" },
  //         { label: "Birthday", value: "Birthday" },
  //         { label: "Corporate Event", value: "Corporate Event" },
  //       ]}
  //       placeholder={{ label: "Select event type", value: null }}
  //     />
  //     {touched.eventType && errors.eventType && (
  //       <Text style={styles.errorText}>{errors.eventType}</Text>
  //     )}
  //     <View style={styles.buttonRow}>
  //       <Button onPress={prevStep} style={styles.button}>
  //         Back
  //       </Button>
  //       <Button onPress={nextStep} style={styles.button}>
  //         Next
  //       </Button>
  //     </View>
  //   </>
  // );
  const StepTwo = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    nextStep,
    prevStep,
  }) => {
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.title}>Event Details</Text>

        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Text style={styles.datePicker}>
            {selectedDate
              ? `Selected Date: ${selectedDate.toISOString().split("T")[0]}`
              : "Pick an Event Date"}
          </Text>
        </TouchableOpacity>
        {showCalendar && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showCalendar}
            onRequestClose={() => setShowCalendar(false)}
            style={styles.modalContainer}
          >
            <View style={styles.modalContainer}>
              <CalendarPicker
                onDateChange={(date) => {
                  setShowCalendar(false);
                  setSelectedDate(date);
                  setFieldValue("eventDate", date.toISOString().split("T")[0]);
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
            {values.eventTime ? values.eventTime : "Select Event Time"}
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
                const formattedTime = selectedTime.toLocaleTimeString("en-US", {
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
          style={styles.input}
          placeholder="Event Location"
          onChangeText={handleChange("eventLocation")}
          onBlur={handleBlur("eventLocation")}
          value={values.eventLocation}
        />
        {touched.eventLocation && errors.eventLocation && (
          <Text style={styles.errorText}>{errors.eventLocation}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Event Pax"
          keyboardType="numeric"
          onChangeText={handleChange("eventPax")}
          onBlur={handleBlur("eventPax")}
          value={values.eventPax}
        />
        {touched.eventPax && errors.eventPax && (
          <Text style={styles.errorText}>{errors.eventPax}</Text>
        )}
        <View style={styles.buttonRow}>
          <Button onPress={prevStep} style={styles.button}>
            Back
          </Button>
          <Button onPress={nextStep} style={styles.button}>
            Next
          </Button>
        </View>
      </View>
    );
  };

  // const StepThree = ({
  //   values,
  //   handleChange,
  //   handleBlur,
  //   setFieldValue,
  //   errors,
  //   touched,
  //   nextStep,
  //   prevStep,
  //   submitForm,
  // }) => {
  //   return (
  //     <View style={styles.stepContainer}>
  //       <MultiSelect
  //         style={styles.dropdown}
  //         placeholderStyle={styles.placeholderStyle}
  //         selectedTextStyle={styles.selectedTextStyle}
  //         inputSearchStyle={styles.inputSearchStyle}
  //         iconStyle={styles.iconStyle}
  //         data={currentPackages
  //           .filter(
  //             (currentPackage) =>
  //               currentPackage.packageName && currentPackage.id
  //           )
  //           .map((currentPackage) => ({
  //             label: currentPackage.packageName,
  //             value: currentPackage.id,
  //             category: currentPackage.eventType,
  //           }))}
  //         labelField="label"
  //         valueField="value"
  //         placeholder="Select currentPackages"
  //         value={selected}
  //         // data={data}
  //         search
  //         searchPlaceholder="Search..."
  //         onChange={(items) => {
  //           setSelected(items);
  //           setFieldValue(
  //             "currentPackages",
  //             items.map((item) => console.log("hello this is the item", item))
  //           ); // Update Formik's services field with the selected item values (not the full object)
  //           console.log("Selected packagesss:", items);
  //         }}
  //         renderItem={renderItem}
  //         renderLeftIcon={() => (
  //           <AntDesign
  //             style={styles.icon}
  //             color="black"
  //             name="Safety"
  //             size={20}
  //           />
  //         )}
  //         renderSelectedItem={(item, unSelect) => (
  //           <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
  //             <View style={styles.selectedStyle}>
  //               <Text style={styles.textSelectedStyle}>{item.label}</Text>
  //               <AntDesign color="black" name="delete" size={17} />
  //             </View>
  //           </TouchableOpacity>
  //         )}
  //       />
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Description"
  //         multiline
  //         onChangeText={handleChange("description")}
  //         onBlur={handleBlur("description")}
  //         value={values.description}
  //       />
  //       {touched.description && errors.description && (
  //         <Text style={styles.errorText}>{errors.description}</Text>
  //       )}
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Cover Photo URL"
  //         onChangeText={handleChange("coverPhoto")}
  //         onBlur={handleBlur("coverPhoto")}
  //         value={values.coverPhoto}
  //       />
  //       {touched.coverPhoto && errors.coverPhoto && (
  //         <Text style={styles.errorText}>{errors.coverPhoto}</Text>
  //       )}
  //       <FieldArray name="guest">
  //         {({ remove, push }) => (
  //           <View>
  //             {values.guest.map((guest, index) => (
  //               <View key={index} style={styles.guestContainer}>
  //                 <TextInput
  //                   style={styles.input}
  //                   placeholder="Guest Name"
  //                   value={guest.GuestName}
  //                   onChangeText={handleChange(`guest.${index}.GuestName`)} // Dynamically updating guest fields
  //                 />
  //                 <TextInput
  //                   style={styles.input}
  //                   placeholder="Email"
  //                   value={guest.email}
  //                   onChangeText={handleChange(`guest.${index}.email`)} // Dynamically updating guest fields
  //                 />
  //                 <TextInput
  //                   style={styles.input}
  //                   placeholder="Phone"
  //                   value={guest.phone}
  //                   onChangeText={handleChange(`guest.${index}.phone`)} // Dynamically updating guest fields
  //                 />
  //                 <TouchableOpacity onPress={() => remove(index)}>
  //                   <Text style={styles.removeGuest}>Remove</Text>
  //                 </TouchableOpacity>
  //               </View>
  //             ))}
  //             <Button
  //               onPress={() => push({ GuestName: "", email: "", phone: "" })}
  //             >
  //               Add Guest
  //             </Button>
  //           </View>
  //         )}
  //       </FieldArray>
  //       <View style={styles.buttonRow}>
  //         <Button onPress={prevStep} style={styles.button}>
  //           Back
  //         </Button>
  //         <Button onPress={submitForm} style={styles.button}>
  //           Submit
  //         </Button>
  //       </View>
  //     </View>
  //   );
  // };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <View style={[styles.stepContainer]}>
      <ScrollView style={{ width: "100%" }}>
        <Formik
          initialValues={{
            eventName: "",
            eventType: "",
            eventPax: "",
            eventDate: "",
            eventTime: "",
            eventLocation: "",
            currentPackages: [],
            guest: [{ GuestName: "", email: "" }],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleCreateEvent(values, resetForm)
          }
        >
          {({ ...props }) => (
            <ScrollView>
              {currentStep === 1 && <StepOne {...props} nextStep={nextStep} />}
              {/* <StepOne {...props} nextStep={nextStep} prevStep={prevStep} /> */}

              {currentStep === 2 && (
                <StepTwo {...props} nextStep={nextStep} prevStep={prevStep} />
                // <StepTwo {...props} nextStep={nextStep} prevStep={prevStep} />
              )}
              {currentStep === 3 && (
                <StepThree
                  {...props}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  currentPackages={currentPackages}
                  handleSubmit={(values) => handleCreateEvent(values)}
                  submitForm={props.submitForm}
                  selected={selected}
                  setSelected={setSelected}
                  renderItem={renderItem}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  {...props}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  currentPackages={currentPackages}
                  handleSubmit={(values) => handleCreateEvent(values)}
                  submitForm={props.submitForm}
                  selected={selected}
                  setSelected={setSelected}
                  renderItem={renderItem}
                />
                // <StepThree
                //   {...props}
                //   nextStep={nextStep}
                //   prevStep={prevStep}
                //   handleSubmit={(values) => handleCreateEvent(values)}
                //   submitForm={props.submitForm}
                // />
              )}
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: { padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15 },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  label: { fontWeight: "bold", marginTop: 20 },
  guestRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: { marginTop: 20 },
});

export default CreateEventScreen;
