import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ScanMe = () => {
  return (
    <View
      style={[
        {
          backgroundColor: "gold",
          borderRadius: "15",
          width: 130,
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 15,
          borderRadius: 15,
        },
      ]}
    >
      <MaterialCommunityIcons name="qrcode-scan" size={23} color="black" />
      <Text>SCAN ME!</Text>
    </View>
  );
};

export default ScanMe;
