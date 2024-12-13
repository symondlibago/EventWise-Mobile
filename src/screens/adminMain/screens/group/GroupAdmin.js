import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import GuestList from "./GuestListAdmin";
import { ScrollView } from "react-native-gesture-handler";
import EventGuestListCard from "./GuestListCard";
import useStore from "../../../../stateManagement/useStore";
import TotalGuestsCard from "./TotalGuestsCard";
import { useNavigation } from "@react-navigation/native";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
const GroupAdmin = () => {
  const { eventData } = useStore();
  const { currentEvents } = useEventStore();
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        {currentEvents.map((event, index) => (
          <TotalGuestsCard key={index} event={event} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupAdmin;
