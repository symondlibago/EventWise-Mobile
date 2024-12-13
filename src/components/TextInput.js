import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormTextField({ label, ...rest }) {
  //{label, value, onChangeText, ...rest}
  return (
    <View>
      {label && (
        <TextInput
          placeholder={label}
          autoCapitalize="none"
          style={styles.textInput}
          {...rest}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 500,
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    height: 40,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
});
