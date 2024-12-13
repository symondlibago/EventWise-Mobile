import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import EventPackages from "../component/EventPackages";
import EventCalendar from "../component/EventCalendar";
import EventFeedbackSentimentHome from "../feedback/EventFeedbackSentimentHome";
import EventCardBookings from "../EventCardBookings";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import TotalEventFeedback from "../component/TotalEventFeedback";
import EventCardHome from "../event/EventCardHome";
import useStore from "../../../../stateManagement/useStore";
import EventPackagesHome from "../event/EventPackagesHome";

import UpcomingEvents from "../event/UpcomingEvents";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import EventBookings from "../event/EventBookings";
import { fetchEvents } from "../../../../services/organizer/adminEventServices";
import {
  getFeedbacksByEventId,
  getTotalFeedbacks,
  getFeedbackEventSentiments,
} from "../../../../services/feedbackServices";
import { useFeedbackStore } from "../../../../stateManagement/admin/useFeedbackStore";
import HomeTotalFeedback from "../component/HomeTotalFeedback";
const HomeAdmin = () => {
  const { eventData, sliceColor } = useStore(); // Using your state store
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [likedEvents, setlikedEvents] = useState({});
  const [refreshingEvents, setRefreshingEvents] = useState(false);
  const [refreshingPackages, setRefreshingPackages] = useState(false);
  const { currentEvents, setCurrentEvents } = useEventStore();
  const {
    currentFeedbacks,
    setCurrentFeedbacks,
    feedbacksByEvent,
    setFeedbacksByEvent,
  } = useFeedbackStore();

  const navigation = useNavigation();
  useEffect(() => {
    refreshEvents();
  }, []);
  // Handle the pull-to-refresh action
  const refreshEvents = useCallback(async () => {
    setRefreshingEvents(true);
    try {
      const updatedEvents = await fetchEvents();
      setCurrentEvents(updatedEvents);

      const totalFeedbacks = await getTotalFeedbacks();
      setCurrentFeedbacks(totalFeedbacks);
      // const feedbacksByEvent = totalFeedbacks.reduce((acc, feedback) => {
      //   const eventId = feedback.eventId;
      //   if (!acc[eventId]) {
      //     acc[eventId] = [];
      //   }
      //   acc[eventId].push(feedback);
      //   return acc;
      // })
      const feedbacksEvents = await getFeedbackEventSentiments();
      setFeedbacksByEvent(feedbacksEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setRefreshingEvents(false);
    }
  }, [setCurrentEvents]);

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      refreshPackages();
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const handleEditEvent = async (currentEventId, updateEvent) => {
    try {
      await updateEvent(currentEventId, updateEvent);
      refreshEvents(); // Refresh the events list after editing
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };
  const toggleLikeEvent = (currentEventsID) => {
    setlikedEvents((prevLikedPackages) => {
      const newLikedEvents = { ...prevLikedPackages };
      if (newLikedEvents[currentEventsID]) {
        delete newLikedEvents[currentEventsID];
      } else {
        newLikedEvents[currentEventsID] = true;
      }
      return newLikedEvents;
    });
  };

  console.log("Current Events", JSON.stringify(currentEvents, ["status", 2]));
  return (
    <SafeAreaView>
      {/* #TODO uncomment this and this sucessful auth will be go home */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingEvents || refreshingPackages}
            onRefresh={() => {
              refreshEvents();
              // refreshPackages();
            }}
            colors={["#ff9900"]}
            tintColor="#ff9900"
          />
        }
      >
        <UpcomingEvents />
        <View style={[{ padding: 20 }]}>
          <FlatList
            data={currentEvents
              .filter((event) => event.status.toLowerCase() === "scheduled")
              .sort((a, b) => new Date(a.date) - new Date(b.date))} // Sort by closest date}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{ gap: 20 }}
            accessibilityViewIsModal={true}
            accessibilityModalRoot={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <EventCardHome
                currentEvents={item}
                handleDeleteEvent={handleDeleteEvent}
                likedEvent={likedEvents}
                toggleLike={toggleLikeEvent}
                handleEditEvent={handleEditEvent}
              />
            )}
          />
        </View>
        <EventBookings />
        <View style={[{ padding: 20 }]}>
          <FlatList
            data={currentEvents.filter(
              (event) => event.status.toLowerCase() != "scheduled"
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{ gap: 20 }}
            accessibilityViewIsModal={true}
            accessibilityModalRoot={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <EventCardBookings
                currentEvents={item}
                handleDeleteEvent={handleDeleteEvent}
                likedEvent={likedEvents}
                toggleLike={toggleLikeEvent}
                handleEditEvent={handleEditEvent}
              />
            )}
          />
        </View>
        <EventCalendar />
        <EventPackagesHome />
        <HomeTotalFeedback />
        {/* <TotalEventFeedback
          eventFeedback={currentFeedbacks}
          sliceColor={sliceColor}
        /> */}
        <View style={{ height: 1000 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;
