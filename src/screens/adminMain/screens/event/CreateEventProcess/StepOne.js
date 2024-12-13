// StepOne.js
import React from "react";
import { TextInput, Text, View } from "react-native";
import { Formik } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
const StepOne = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  nextStep,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        onChangeText={handleChange("eventName")}
        onBlur={handleBlur("eventName")}
        value={values.eventName}
      />
      {touched.eventName && errors.eventName && (
        <Text style={styles.errorText}>{errors.eventName}</Text>
      )}
      <RNPickerSelect
        onValueChange={(value) => handleChange("eventType")(value)}
        items={[
          { label: "Wedding", value: "Wedding" },
          { label: "Birthday", value: "Birthday" },
          { label: "Corporate Event", value: "Corporate Event" },
        ]}
        placeholder={{ label: "Select event type", value: null }}
      />
      {touched.eventType && errors.eventType && (
        <Text style={styles.errorText}>{errors.eventType}</Text>
      )}
      <View style={styles.buttonRow}>
        <Button onPress={nextStep} style={styles.button}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepOne;
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
