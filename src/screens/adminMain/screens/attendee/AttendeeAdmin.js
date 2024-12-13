import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../../../stateManagement/useStore";
import AttendeeList from "./AttendeeList";
import { useNavigation } from "@react-navigation/native";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";

const AttendeeAdmin = () => {
  const { eventData } = useStore();
  const { currentEvents } = useEventStore();
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Inline style applied to center the text and change its size and color */}
        <Text
          style={{
            fontSize: 30, // Make the text much larger
            fontWeight: "bold",
            color: "#eeba2b", // Set the text color to #eeba2b
            textAlign: "center", // Center the text horizontally
            marginVertical: 20, // Add some margin around the text for spacing
          }}
        >
          Attendee Tracker
        </Text>

        {currentEvents.map((event, index) => (
          <AttendeeList key={index} event={event} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendeeAdmin;
