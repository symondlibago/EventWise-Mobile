// StepOne.js
import React from "react";
import { TextInput, Text, View, Modal } from "react-native";
import { Formik } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import DateTimePicker from "@react-native-community/datetimepicker";

const StepTwo = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  nextStep,
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
  showTimePicker,
  setShowTimePicker,
  time,
  setTime,

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
export default StepTwo;

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
