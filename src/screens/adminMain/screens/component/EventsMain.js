import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventMainCard from "./EventMainCard";
import event2 from "../../../../../assets/event2.png"; // Ensure you have the right path for the image

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import AddEventModal from "./AddEventModal";
import AddEvent from "./AddEvent";

const EventsMain = () => {
  const navigation = useNavigation();
  const eventData = useStore((state) => state.eventData); // Fetch event data from Zustand store
  const likedEvents = useStore((state) => state.likedEvents);
  const toggleLike = useStore((state) => state.toggleLike);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const initializeLikedEvents = useStore(
    (state) => state.initializeLikedEvents
  );
  // console.log(eventData);
  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, [initializeLikedEvents]);

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.title}>My Events</Text>
        </Text>
        <Button title="Add Event" onPress={() => setIsModalVisible(true)} />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {eventData.map((event) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EventDetails", { event });
            }}
          >
            <EventMainCard
              key={event.eventId} // Assuming each event has a unique eventId
              event={{
                id: event.eventId,
                image: event.eventImage || event2, // Default to event2 if no image in data
                title: event.eventName,
                date: event.eventDate,
                location: event.eventLocation,
              }}
              likedEvents={likedEvents}
              toggleLike={toggleLike}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <AddEventModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      /> */}
      <AddEvent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        type="event" // Set type to "package"
      />
    </SafeAreaView>
  );
};

export default EventsMain;
