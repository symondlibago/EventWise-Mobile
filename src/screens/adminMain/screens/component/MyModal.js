import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const MyModal = ({
  isVisible,
  onClose,
  title,
  message,
  iconName,
  iconSize,
  iconColor,
  buttonLabel,
  buttonStyle,
  textStyle,
  modalStyle,
  linearGradientColors,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ ...styles.modalContainer, ...modalStyle }}>
        <LinearGradient
          colors={linearGradientColors || ["#FFFF", "#FFC42B"]}
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 2.1 }} // Bottom
          style={{
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            width: "80%",
          }}
        >
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={iconSize || 100}
              color={iconColor || "green"}
            />
          )}
          <Text style={[styles.modalText, { fontSize: 15 }]}>{title}</Text>
          <Text style={[styles.modalText, { fontSize: 15 }]}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onClose}
          >
            <Text style={textStyle}>{buttonLabel || "Close"}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default MyModal;
