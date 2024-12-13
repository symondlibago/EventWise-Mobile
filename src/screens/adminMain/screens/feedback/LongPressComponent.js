import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

const LongPressComponent = ({ aspect, info, positive, negative, neutral }) => {
  const [bgColor, setBgColor] = useState("#ffb300"); // Default color
  const [showInfo, setShowInfo] = useState(false); // State to show/hide information

  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => {
          setBgColor("#ff3c00"); // Change color on long press
          setShowInfo(true); // Show the small information box
        }}
        onPressOut={() => {
          setBgColor("#ffb300"); // Revert color when press is released
          setShowInfo(false); // Hide the information box
        }}
        style={[styles.button, { backgroundColor: bgColor }]}
      >
        <Text style={styles.buttonText}>{aspect}</Text>
      </Pressable>

      {/* Show additional information when long-pressed */}
      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{info}</Text>
          <Text style={styles.infoText}>positive: {positive}</Text>
          <Text style={styles.infoText}>negative: {negative}</Text>
          <Text style={styles.infoText}>neutral: {neutral}</Text>
        </View>
      )}
    </View>
  );
};

export default LongPressComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    position: "absolute",
    // bottom: 10, // Position below the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
});
