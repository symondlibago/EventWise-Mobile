import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

const Step1BasicDetails = ({
  title,
  setTitle,
  eventType,
  setEventType,
  eventDate,
  setEventDate,
  showDatePicker,
  setShowDatePicker,
  onDateChange,
  eventTime,
  setShowTimePicker,
  onTimeChange,
  location,
  setLocation,
  description,
  setDescription,
  coverPhoto,
  handleCoverPhotoSelection,
  styles,
  pickerSelectStyles,
}) => {
  return (
    <>
      {/* Cover Photo Section */}
      <TouchableOpacity
        onPress={handleCoverPhotoSelection}
        style={styles.coverPhotoContainer}
      >
        <Image
          source={
            coverPhoto
              ? { uri: coverPhoto }
              : require("../../../../../../assets/selectimage.png")
          }
          style={styles.coverPhoto}
        />
        <Text style={styles.addPhotoText}>Add Cover Photo</Text>
      </TouchableOpacity>

      {/* Event Name */}
      <TextInput
        placeholder="Enter Event Name"
        value={title}
        onChangeText={setTitle}
        style={styles.inputStyle}
      />

      {/* Choose Event Type Dropdown */}
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

      {/* Date Picker */}
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
          onChange={onDateChange}
        />
      )}

      {/* Time Picker */}
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
          onChange={onTimeChange}
        />
      )}

      {/* Event Venue */}
      <TextInput
        placeholder="Enter Event Venue"
        value={location}
        onChangeText={setLocation}
        style={styles.inputStyle}
      />

      {/* Description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.inputStyle, { height: 80 }]}
        multiline
      />
    </>
  );
};

export default Step1BasicDetails;
