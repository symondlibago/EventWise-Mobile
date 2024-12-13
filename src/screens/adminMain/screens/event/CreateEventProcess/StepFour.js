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
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FieldArray } from "formik";

const StepFour = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  nextStep,
  prevStep,
  submitForm,
  currentPackages,
  selected,
  setSelected,
  renderItem,
}) => {
  const packageData = currentPackages || [];
  console.log("currentPackages:", currentPackages);
  return (
    <View style={styles.stepContainer}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={(currentPackages || [])
          .filter(
            (currentPackage) => currentPackage.packageName && currentPackage.id
          )
          .map((currentPackage) => ({
            label: currentPackage.packageName,
            value: currentPackage.id,
            category: currentPackage.eventType,
          }))}
        labelField="label"
        valueField="value"
        placeholder="Select currentPackages"
        value={selected}
        // data={data}
        search
        searchPlaceholder="Search..."
        onChange={(items) => {
          setSelected(items);
          setFieldValue(
            "currentPackages",
            items.map((item) => console.log("hello this is the item", item))
          ); // Update Formik's services field with the selected item values (not the full object)
          console.log("Selected packagesss:", items);
        }}
        renderItem={renderItem}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        value={values.description}
      />
      {touched.description && errors.description && (
        <Text style={styles.errorText}>{errors.description}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Cover Photo URL"
        onChangeText={handleChange("coverPhoto")}
        onBlur={handleBlur("coverPhoto")}
        value={values.coverPhoto}
      />
      {touched.coverPhoto && errors.coverPhoto && (
        <Text style={styles.errorText}>{errors.coverPhoto}</Text>
      )}
      <FieldArray name="guest">
        {({ remove, push }) => (
          <View>
            {values.guest.map((guest, index) => (
              <View key={index} style={styles.guestContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Guest Name"
                  value={guest.GuestName}
                  onChangeText={handleChange(`guest.${index}.GuestName`)} // Dynamically updating guest fields
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={guest.email}
                  onChangeText={handleChange(`guest.${index}.email`)} // Dynamically updating guest fields
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={guest.phone}
                  onChangeText={handleChange(`guest.${index}.phone`)} // Dynamically updating guest fields
                />
                <TouchableOpacity onPress={() => remove(index)}>
                  <Text style={styles.removeGuest}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Button
              onPress={() => push({ GuestName: "", email: "", phone: "" })}
            >
              Add Guest
            </Button>
          </View>
        )}
      </FieldArray>
      <View style={styles.buttonRow}>
        <Button onPress={prevStep} style={styles.button}>
          Back
        </Button>
        <Button onPress={submitForm} style={styles.button}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default StepFour;
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
