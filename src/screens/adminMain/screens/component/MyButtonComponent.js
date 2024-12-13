import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types"; // Optional: For prop type validation
import { Alert } from "react-native";
const MyButtonComponent = ({
  title,
  icon,
  onPress,
  backgroundColor,
  width = 130,
  height = 50,
  textColor = "white",
  borderRadius = 15,
  iconSize = 23,
  iconColor = "white",
  fontSize = 16,
}) => {
  // Log the onPress prop for debugging

  const memoizedOnPress = useCallback(onPress, [onPress]);

  return (
    <TouchableOpacity onPress={memoizedOnPress} style={styles.buttonContainer}>
      <View
        style={[
          styles.button,
          {
            backgroundColor,
            width,
            height,
            borderRadius,
          },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, { color: textColor, fontSize }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// // Optional: Define prop types for better type checking
// MyButton.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string,
//   onPress: PropTypes.func.isRequired,
//   backgroundColor: PropTypes.string,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   textColor: PropTypes.string,
//   borderRadius: PropTypes.number,
//   iconSize: PropTypes.number,
//   iconColor: PropTypes.string,
//   fontSize: PropTypes.number,
// };

const styles = StyleSheet.create({
  buttonContainer: {
    // Optional: Add margin or other container styles if needed
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Note: `gap` is not widely supported; consider using margin
  },
  icon: {
    // Optional: Adjust icon positioning if needed
  },
  text: {
    // Optional: Add text styles here
  },
});

export default MyButtonComponent;
