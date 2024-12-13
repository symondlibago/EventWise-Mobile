import { StyleSheet } from "react-native";
// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    width: "100%",
  },
});
export default pickerSelectStyles;
