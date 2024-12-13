import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScanMe from "./ScanMe";
import styles from "../../styles/styles";

const AttendeeHeaderCard = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F9EDC6",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 15,

        margin: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          //   height: "150",
          width: "100%",
          //   backgroundColor: "red",
          bottom: 30,
        }}
      >
        <View>
          <Image
            source={require("../../../../../assets/event3.png")}
            style={[{ height: 120, width: 100, borderRadius: 13 }]}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <Text
              style={[styles.title, { flexWrap: "wrap", width: "100%" }]}
              numberOfLines={2} // Allows up to 2 lines before truncating
              ellipsizeMode="tail" // Truncates with ellipsis at the end if the text is too long
            >
              Mr. & Mrs. Malik Wedding
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Text style={[styles.scheduleTime, {}]}>September 2, 2024</Text>
            <Text style={[styles.subtitle, { bottom: 10 }]}>
              8:00 AM - 1:00 PM
            </Text>
            <Text
              style={[{ flexWrap: "wrap", width: "100%" }]}
              numberOfLines={2} // Allows up to 2 lines before truncating
              ellipsizeMode="tail" // Truncates with ellipsis at the end if the text is too long
            >
              Luxe hotel Lapasan Cagayan de oro
              cityadfafasdfadsfadfadfadfadadfadfadaadad
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //   backgroundColor: "white",
          //   height: 50,
          width: "100%",
          bottom: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.label]}>Total Visitor: </Text>
          <Text>4</Text>
        </View>
        <View>
          <ScanMe />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AttendeeHeaderCard;
